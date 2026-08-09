import { NextResponse } from "next/server";
import crypto from "crypto";
import Razorpay from "razorpay";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  RAZORPAY_KEY_ID,
  RAZORPAY_KEY_SECRET,
  RAZORPAY_WEBHOOK_SECRET,
} from "@/lib/constants";
import type { DbOrderStatus } from "@/lib/types";
import { sendEmail } from "@/lib/email/send";
import {
  paymentFailedEmail,
  buildPaymentFailedData,
} from "@/lib/email/templates/payment-failed";
import { paymentCapturedEmail } from "@/lib/email/templates/payment-captured";
import { refundProcessedEmail } from "@/lib/email/templates/refund-processed";
import { sendCAPIEvent } from "@/lib/meta/capi";

// Initialize Razorpay SDK so we can fetch order details (with notes)
// when auto-creating missing orders from webhook events.
const razorpay = new Razorpay({
  key_id: RAZORPAY_KEY_ID,
  key_secret: RAZORPAY_KEY_SECRET,
});

// ── Helper: create a Supabase order from Razorpay order notes ──────────────
// When the webhook receives a payment.captured or payment.failed event but no
// order exists in our DB (browser failed to redirect), we fetch the Razorpay
// order to retrieve the notes that were stored at order-creation time and
// reconstruct the order record.
async function createOrderFromRazorpayNotes(
  razorpayOrderId: string,
  paymentId: string,
  paymentStatus: DbOrderStatus | "paid" | "failed",
) {
  try {
    const razorpayOrder = await razorpay.orders.fetch(razorpayOrderId);
    const notes = (razorpayOrder.notes as Record<string, string>) || {};

    const orderData: Record<string, unknown> = {
      customer_name: notes.customer_name || "Unknown",
      customer_email: notes.customer_email || "unknown@email.com",
      customer_phone: notes.customer_phone || "0000000000",
      address: notes.address
        ? JSON.parse(notes.address)
        : { line1: "N/A", city: "N/A", state: "N/A", pincode: "000000" },
      products: notes.products ? JSON.parse(notes.products) : [],
      subtotal: notes.subtotal ? parseInt(notes.subtotal, 10) : 0,
      discount: notes.discount ? parseInt(notes.discount, 10) : 0,
      shipping: notes.shipping ? parseInt(notes.shipping, 10) : 0,
      total: notes.total
        ? parseInt(notes.total, 10)
        : Math.round((razorpayOrder.amount_paid || 0) / 100),
      payment_id: paymentId,
      payment_status: paymentStatus,
      order_status: "placed" as DbOrderStatus,
      // Meta CAPI fields extracted from Razorpay notes
      capi_event_id: notes.capi_event_id || null,
      fbp: notes.fbp || null,
      fbc: notes.fbc || null,
    };

    const { data, error } = await supabaseAdmin
      .from("orders")
      .insert(orderData)
      .select()
      .single();

    if (error) {
      // Duplicate payment_id (browser handler may have raced us) — fetch the
      // existing order and return it instead of failing.
      if (error.code === "23505") {
        const { data: existing } = await supabaseAdmin
          .from("orders")
          .select("*")
          .eq("payment_id", paymentId)
          .maybeSingle();
        if (existing) {
          console.log(
            `[Webhook] Payment ${paymentId} already exists — returning existing order`,
          );
          return existing;
        }
      }
      console.error(
        `[Webhook] Failed to create order from Razorpay notes: ${error.message}`,
      );
      return null;
    }

    console.log(
      `[Webhook] ✅ Auto-created order ${data.order_id} (track: ${data.track_id}) from razorpay_order ${razorpayOrderId}`,
    );
    return data;
  } catch (err) {
    console.error(
      `[Webhook] Error fetching Razorpay order ${razorpayOrderId} or creating from notes:`,
      err,
    );
    return null;
  }
}

// Fields the Meta helpers need from an order row
type MetaOrder = {
  id: string;
  capi_event_id?: string | null;
  meta_purchase_fired_at?: string | null;
  meta_refund_fired_at?: string | null;
  customer_name?: string;
  customer_email?: string;
  customer_phone?: string;
  address?: { city?: string; state?: string; pincode?: string };
  products?: { product_id: string }[] | null;
  total?: number;
  fbp?: string | null;
  fbc?: string | null;
};

// ── Helper: fire Meta CAPI Purchase for an order (idempotent) ──────────────
// Used by the webhook as the authoritative source: it fires exactly once per
// order (guarded by meta_purchase_fired_at). The browser handler may also fire
// the same event (same event_id) — Meta dedups identical event_ids.
async function fireMetaPurchaseForOrder(
  order: MetaOrder,
  source = "webhook",
) {
  if (
    !order?.capi_event_id ||
    process.env.META_CAPI_ENABLED !== "true" ||
    order.meta_purchase_fired_at
  ) {
    return null;
  }
  try {
    const address = order.address || {};
    const result = await sendCAPIEvent({
      eventName: "Purchase",
      eventId: order.capi_event_id,
      userData: {
        email: order.customer_email,
        phone: order.customer_phone,
        firstName: order.customer_name?.split(" ")[0] || "",
        lastName: order.customer_name?.split(" ").slice(1).join(" ") || "",
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        fbp: order.fbp || undefined,
        fbc: order.fbc || undefined,
      },
      customData: {
        value: order.total || 0,
        currency: "INR",
        content_ids: ((order.products || []) as { product_id: string }[]).map(
          (p) => p.product_id,
        ),
        content_type: "product",
      },
      eventSourceUrl: "https://ergoaurashop.com/checkout",
    });

    if (result) {
      const { error: flagError } = await supabaseAdmin
        .from("orders")
        .update({ meta_purchase_fired_at: new Date().toISOString() })
        .eq("id", order.id);
      if (flagError) {
        console.error(
          `[Webhook] Failed to mark meta_purchase_fired_at for order ${order.id}: ${flagError.message}`,
        );
      }
      console.log(
        `[Webhook] ✅ Meta Purchase event sent (${source}) for order ${order.id}`,
      );
    }
    return result;
  } catch (err) {
    console.error(
      "[Webhook] Meta Purchase event error:",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

// ── Helper: fire corrective Meta Refund for a previously-purchased order ───
// When a captured payment is later reversed/failed (UPI bank reversal) or
// refunded, Meta is told via a Refund event so its revenue data reconciles
// with our order DB. Uses a NEW event_id (never the Purchase event_id, which
// Meta would dedup away).
async function fireMetaRefundForOrder(order: MetaOrder, source = "webhook") {
  if (
    !order?.capi_event_id ||
    !order.meta_purchase_fired_at ||
    order.meta_refund_fired_at ||
    process.env.META_CAPI_ENABLED !== "true"
  ) {
    return null;
  }
  try {
    const address = order.address || {};
    const result = await sendCAPIEvent({
      eventName: "Refund",
      eventId: `${order.capi_event_id}:refund`,
      userData: {
        email: order.customer_email,
        phone: order.customer_phone,
        firstName: order.customer_name?.split(" ")[0] || "",
        lastName: order.customer_name?.split(" ").slice(1).join(" ") || "",
        city: address.city,
        state: address.state,
        pincode: address.pincode,
        fbp: order.fbp || undefined,
        fbc: order.fbc || undefined,
      },
      customData: {
        value: order.total || 0,
        currency: "INR",
        content_ids: ((order.products || []) as { product_id: string }[]).map(
          (p) => p.product_id,
        ),
        content_type: "product",
      },
      eventSourceUrl: "https://ergoaurashop.com/track-order",
    });

    if (result) {
      const { error: flagError } = await supabaseAdmin
        .from("orders")
        .update({ meta_refund_fired_at: new Date().toISOString() })
        .eq("id", order.id);
      if (flagError) {
        console.error(
          `[Webhook] Failed to mark meta_refund_fired_at for order ${order.id}: ${flagError.message}`,
        );
      }
      console.log(
        `[Webhook] ✅ Meta Refund event sent (${source}) for order ${order.id}`,
      );
    }
    return result;
  } catch (err) {
    console.error(
      "[Webhook] Meta Refund event error:",
      err instanceof Error ? err.message : err,
    );
    return null;
  }
}

/**
 * POST /api/razorpay/webhook
 *
 * Called by Razorpay on payment events (payment.captured, payment.failed, etc.).
 * This is the **only** guaranteed delivery mechanism — it fires even if the
 * customer closes their browser before the success redirect.
 *
 * How to configure in Razorpay Dashboard:
 *   Settings → Webhooks → Add Webhook
 *   URL: https://ergoaurashop.com/api/razorpay/webhook
 *   Events: payment.captured, payment.failed
 */
export async function POST(request: Request) {
  try {
    // ── Read raw body (text) so we can verify the HMAC signature ──
    const body = await request.text();
    const signature = request.headers.get("x-razorpay-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "Missing x-razorpay-signature header" },
        { status: 401 },
      );
    }

    // ── Verify webhook signature ─────────────────────────────────
    const expectedSignature = crypto
      .createHmac("sha256", RAZORPAY_WEBHOOK_SECRET)
      .update(body)
      .digest("hex");

    if (signature !== expectedSignature) {
      console.error("[Webhook] Invalid signature — possible tampering");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // ── Parse event ──────────────────────────────────────────────
    const event = JSON.parse(body);
    const eventName = event.event;

    console.log(`[Webhook] Received event: ${eventName}`);

    // ── Handle specific events ───────────────────────────────────
    switch (eventName) {
      case "payment.captured": {
        const payment = event.payload.payment.entity;
        const razorpayOrderId = payment.order_id;
        const razorpayPaymentId = payment.id;

        // Check if an order with this payment_id already exists
        const { data: existingOrder } = await supabaseAdmin
          .from("orders")
          .select(
            "id, order_status, payment_status, capi_event_id, meta_purchase_fired_at, meta_refund_fired_at, customer_name, customer_email, customer_phone, address, products, total, fbp, fbc",
          )
          .eq("payment_id", razorpayPaymentId)
          .maybeSingle();

        if (existingOrder) {
          console.log(
            `[Webhook] Order already exists for payment ${razorpayPaymentId}, status: ${existingOrder.order_status}`,
          );
          // Reconcile: the browser handler usually creates the order as "paid",
          // but ensure it is marked paid here too (belt-and-braces), then fire
          // the idempotent Purchase event as a safety net (the helper is
          // guarded by meta_purchase_fired_at, so it fires at most once).
          if (existingOrder.payment_status !== "paid") {
            await supabaseAdmin
              .from("orders")
              .update({ payment_status: "paid" })
              .eq("payment_id", razorpayPaymentId);
            console.log(
              `[Webhook] Reconciled order ${existingOrder.id} payment_status to paid`,
            );
          }
          fireMetaPurchaseForOrder(existingOrder, "webhook-existing");
          return NextResponse.json({ status: "already_exists" });
        }

        // Order doesn't exist — the customer's browser likely failed to
        // redirect after payment. Try to auto-create the order from the
        // Razorpay order notes (stored at order-creation time).
        const newOrder = await createOrderFromRazorpayNotes(
          razorpayOrderId,
          razorpayPaymentId,
          "paid",
        );

        if (newOrder) {
          // ── Fire-and-forget: send payment-captured confirmation email ──
          (async () => {
            try {
              const html = paymentCapturedEmail({
                customerName: newOrder.customer_name,
                orderId: newOrder.order_id,
                trackId: newOrder.track_id,
                products: newOrder.products || [],
                total: newOrder.total || 0,
              });
              const result = await sendEmail({
                to: newOrder.customer_email,
                subject: `Payment Received — Order ${newOrder.order_id} at ErgoAura`,
                html,
              });
              if (result.success) {
                console.log(
                  `[Webhook] ✅ Payment-captured email sent to ${newOrder.customer_email} (id: ${result.id})`,
                );
              } else {
                console.error(
                  `[Webhook] ❌ Failed to send payment-captured email: ${result.error}`,
                );
              }
            } catch (err) {
              console.error(
                "[Webhook] Payment-captured email error:",
                err instanceof Error ? err.message : err,
              );
            }
          })();

          // ── Fire-and-forget: send Meta CAPI Purchase event ──
          // Uses the shared idempotent helper (guarded by meta_purchase_fired_at).
          fireMetaPurchaseForOrder(newOrder, "webhook-new");

          return NextResponse.json({
            status: "created",
            order_id: newOrder.order_id,
            track_id: newOrder.track_id,
          });
        }

        // If we get here, notes were missing (e.g. old checkout page that
        // didn't send them) or the Razorpay API call failed. Log for review.
        console.warn(
          `[Webhook] ⚠️ Payment captured but could not auto-create order. Payment: ${razorpayPaymentId}, Razorpay Order: ${razorpayOrderId}`,
        );

        return NextResponse.json({ status: "logged" });
      }

      case "payment.failed": {
        const payment = event.payload.payment.entity;
        const razorpayPaymentId = payment.id;
        const razorpayOrderId = payment.order_id;

        console.error(
          `[Webhook] Payment failed: ${razorpayPaymentId}, order: ${razorpayOrderId}, error: ${payment.error_description}`,
        );

        // Try to update existing order's payment_status to "failed"
        const { data: existingOrder } = await supabaseAdmin
          .from("orders")
          .select(
            "id, capi_event_id, meta_purchase_fired_at, meta_refund_fired_at, customer_name, customer_email, customer_phone, address, products, total, fbp, fbc",
          )
          .eq("payment_id", razorpayPaymentId)
          .maybeSingle();

        if (existingOrder) {
          await supabaseAdmin
            .from("orders")
            .update({ payment_status: "failed" })
            .eq("payment_id", razorpayPaymentId);
          console.log(
            `[Webhook] Updated order ${existingOrder.id} payment_status to failed`,
          );

          // If a Purchase was already reported to Meta for this order (e.g. the
          // payment was captured then later reversed — the UPI bank-reversal
          // case), send a corrective Meta Refund event so Meta's revenue data
          // reconciles with our DB.
          fireMetaRefundForOrder(existingOrder, "payment-failed");

          // ── Fire-and-forget: send payment-failed recovery email ──
          (async () => {
            try {
              const { data: order, error: fetchError } = await supabaseAdmin
                .from("orders")
                .select("*")
                .eq("payment_id", razorpayPaymentId)
                .single();

              if (fetchError || !order) {
                console.error(
                  `[Webhook] Failed to fetch order for email: ${fetchError?.message}`,
                );
                return;
              }

              const emailData = buildPaymentFailedData(order, {
                failureReason: payment.error_description,
              });
              const html = paymentFailedEmail(emailData);
              const result = await sendEmail({
                to: order.customer_email,
                subject: `Complete Your Purchase — ${emailData.product.name} at ErgoAura`,
                html,
              });

              if (result.success) {
                console.log(
                  `[Webhook] ✅ Payment-failed email sent to ${order.customer_email} (id: ${result.id})`,
                );
              } else {
                console.error(
                  `[Webhook] ❌ Failed to send payment-failed email: ${result.error}`,
                );
              }
            } catch (err) {
              console.error(
                "[Webhook] Email send error:",
                err instanceof Error ? err.message : err,
              );
            }
          })();

          return NextResponse.json({ status: "updated" });
        }

        // No existing order — try to create a failed order record from notes
        // so we have visibility into the failed transaction.
        if (razorpayOrderId) {
          const failedOrder = await createOrderFromRazorpayNotes(
            razorpayOrderId,
            razorpayPaymentId,
            "failed",
          );
          if (failedOrder) {
            // ── Fire-and-forget: send payment-failed recovery email ──
            const emailData = buildPaymentFailedData(failedOrder, {
              failureReason: payment.error_description,
            });
            const html = paymentFailedEmail(emailData);
            sendEmail({
              to: failedOrder.customer_email,
              subject: `Complete Your Purchase — ${emailData.product.name} at ErgoAura`,
              html,
            }).then((result) => {
              if (result.success) {
                console.log(
                  `[Webhook] ✅ Payment-failed email sent to ${failedOrder.customer_email} (id: ${result.id})`,
                );
              } else {
                console.error(
                  `[Webhook] ❌ Failed to send payment-failed email: ${result.error}`,
                );
              }
            });

            return NextResponse.json({
              status: "created_failed",
              order_id: failedOrder.order_id,
              track_id: failedOrder.track_id,
            });
          }
        }

        // Could not create a record — log for manual review
        console.warn(
          `[Webhook] ⚠️ Payment failed but no order found/created. Payment: ${razorpayPaymentId}`,
        );
        return NextResponse.json({ status: "logged" });
      }

      case "refund.processed": {
        const refund = event.payload.refund.entity;
        const payment = event.payload.payment.entity;
        const razorpayPaymentId = payment.id;

        // Fetch the order associated with this payment
        const { data: order } = await supabaseAdmin
          .from("orders")
          .select("*")
          .eq("payment_id", razorpayPaymentId)
          .single();

        if (!order) {
          console.warn(
            `[Webhook] ⚠️ Refund processed but no order found for payment ${razorpayPaymentId}`,
          );
          return NextResponse.json({ status: "order_not_found" });
        }

        // Update order status to "refunded"
        await supabaseAdmin
          .from("orders")
          .update({ order_status: "refunded", payment_status: "refunded" })
          .eq("payment_id", razorpayPaymentId);

        // ── Fire-and-forget: send refund notification email ──
        (async () => {
          try {
            const html = refundProcessedEmail({
              customerName: order.customer_name,
              orderId: order.order_id,
              refundAmount: refund.amount
                ? Math.round(refund.amount / 100)
                : order.total,
              refundReason: refund.notes?.reason || undefined,
            });
            const result = await sendEmail({
              to: order.customer_email,
              subject: `Refund Processed — Order ${order.order_id} at ErgoAura`,
              html,
            });
            if (result.success) {
              console.log(
                `[Webhook] ✅ Refund email sent to ${order.customer_email} (id: ${result.id})`,
              );
            } else {
              console.error(
                `[Webhook] ❌ Failed to send refund email: ${result.error}`,
              );
            }
          } catch (err) {
            console.error(
              "[Webhook] Refund email error:",
              err instanceof Error ? err.message : err,
            );
          }
        })();

        // Fire corrective Meta Refund event so Meta reconciles with our DB.
        fireMetaRefundForOrder(order, "refund-processed");

        return NextResponse.json({ status: "refunded" });
      }

      default:
        // Acknowledge other events (order.paid, etc.) without processing
        console.log(`[Webhook] Unhandled event type: ${eventName}`);
        return NextResponse.json({ status: "ignored" });
    }
  } catch (error) {
    console.error("[Webhook] Error processing webhook:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
