import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { RAZORPAY_KEY_SECRET } from "@/lib/constants";
import type { OrderAddress, OrderProduct } from "@/lib/types";
import { sendEmail } from "@/lib/email/send";
import { orderConfirmationEmail } from "@/lib/email/templates/order-confirmation";
import { sendCAPIEvent } from "@/lib/meta/capi";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      user_id,
      customer_name,
      customer_email,
      customer_phone,
      address,
      products,
      subtotal,
      discount,
      shipping,
      total,
      payment_id,
      razorpay_order_id,
      razorpay_signature,
      payment_status,
      notes,
      // Meta CAPI fields for Purchase deduplication
      capi_event_id,
      fbp,
      fbc,
    } = body;

    // ── Validation ────────────────────────────────────────────────
    if (!customer_name || !customer_email || !customer_phone) {
      return NextResponse.json(
        { error: "Missing required customer fields" },
        { status: 400 },
      );
    }

    if (
      !address?.line1 ||
      !address?.city ||
      !address?.state ||
      !address?.pincode
    ) {
      return NextResponse.json(
        { error: "Missing required address fields" },
        { status: 400 },
      );
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
      return NextResponse.json(
        { error: "At least one product is required" },
        { status: 400 },
      );
    }

    if (!total || total <= 0) {
      return NextResponse.json(
        { error: "Invalid total amount" },
        { status: 400 },
      );
    }

    // ── Verify Razorpay payment signature ─────────────────────────
    // This prevents fake orders where the caller fabricates a payment_id.
    // NOTE: order creation stays TOLERANT (a real customer is never blocked);
    // the signature result only gates the Meta Purchase event below.
    let signatureVerified = false;
    if (payment_id && razorpay_order_id && razorpay_signature) {
      const expectedSignature = crypto
        .createHmac("sha256", RAZORPAY_KEY_SECRET)
        .update(`${razorpay_order_id}|${payment_id}`)
        .digest("hex");

      if (expectedSignature !== razorpay_signature) {
        console.error("[Order Create] Payment signature mismatch");
        return NextResponse.json(
          { error: "Payment verification failed" },
          { status: 403 },
        );
      }
      signatureVerified = true;
    }

    // ── Insert order using service role (bypasses RLS) ────────────
    let { data, error } = await supabaseAdmin
      .from("orders")
      .insert({
        user_id: user_id || null,
        customer_name,
        customer_email,
        customer_phone,
        address: address as OrderAddress,
        products: products as OrderProduct[],
        subtotal: subtotal || 0,
        discount: discount || 0,
        shipping: shipping || 0,
        total,
        payment_id: payment_id || null,
        payment_status: payment_status || "pending",
        order_status: "placed",
        notes: notes || null,
        capi_event_id: capi_event_id || null,
        fbp: fbp || null,
        fbc: fbc || null,
      })
      .select()
      .single();

    // Duplicate payment_id (browser handler racing the webhook) — return the
    // existing order instead of failing, so the customer flow is never broken.
    if (error && error.code === "23505" && payment_id) {
      console.warn(
        `[Order Create] Duplicate payment_id ${payment_id}, fetching existing order`,
      );
      const { data: existing } = await supabaseAdmin
        .from("orders")
        .select("*")
        .eq("payment_id", payment_id)
        .maybeSingle();
      if (existing) {
        data = existing;
        error = null;
      }
    }

    if (error) {
      console.error("Order insert error:", error);
      return NextResponse.json(
        { error: "Failed to create order" },
        { status: 500 },
      );
    }

    // ── Fire-and-forget: send order-confirmation email ─────────────
    // This NEVER blocks the response or breaks the primary flow.
    (async () => {
      try {
        const html = orderConfirmationEmail({
          customerName: data.customer_name,
          orderId: data.order_id,
          trackId: data.track_id,
          products: data.products,
          subtotal: data.subtotal,
          discount: data.discount,
          shipping: data.shipping,
          total: data.total,
          address: data.address,
        });

        const result = await sendEmail({
          to: data.customer_email,
          subject: `Order Confirmed — ${data.order_id}`,
          html,
        });

        if (result.success) {
          console.log(
            `[OrderCreate] ✅ Order confirmation email sent to ${data.customer_email} (id: ${result.id})`,
          );
        } else {
          console.error(
            `[OrderCreate] ❌ Failed to send confirmation email: ${result.error}`,
          );
        }
      } catch (err) {
        console.error(
          "[OrderCreate] Email send error:",
          err instanceof Error ? err.message : err,
        );
      }
    })();

    // ── Fire Meta CAPI Purchase event (fire-and-forget) ────────────
    // Only fire for a server-verified, actually-paid payment. This prevents
    // fake/unverifiable calls from minting a Meta Purchase. If the send is
    // skipped here (e.g. signature missing), the webhook payment.captured
    // path re-fires it idempotently as a safety net.
    const purchaseEligible =
      signatureVerified &&
      payment_status === "paid" &&
      capi_event_id &&
      process.env.META_CAPI_ENABLED === "true";

    if (purchaseEligible) {
      (async () => {
        try {
          const result = await sendCAPIEvent({
            eventName: "Purchase",
            eventId: capi_event_id,
            userData: {
              email: customer_email,
              phone: customer_phone,
              firstName: customer_name?.split(" ")[0] || "",
              lastName: customer_name?.split(" ").slice(1).join(" ") || "",
              city: address?.city,
              state: address?.state,
              pincode: address?.pincode,
              fbp: fbp || undefined,
              fbc: fbc || undefined,
            },
            customData: {
              value: total,
              currency: "INR",
              content_ids: (products as OrderProduct[]).map(
                (p) => p.product_id,
              ),
              content_type: "product",
              num_items: (products as OrderProduct[]).reduce(
                (sum, p) => sum + p.quantity,
                0,
              ),
            },
            eventSourceUrl: "https://ergoaurashop.com/checkout",
          });
          if (result) {
            // Record that a Purchase was fired so the failure handler can
            // send a corrective Refund event later (and to avoid duplicates).
            const { error: flagError } = await supabaseAdmin
              .from("orders")
              .update({ meta_purchase_fired_at: new Date().toISOString() })
              .eq("id", data.id);
            if (flagError) {
              console.error(
                `[OrderCreate] Failed to mark meta_purchase_fired_at: ${flagError.message}`,
              );
            }
          }
          console.log(
            `[OrderCreate] ✅ Meta Purchase event sent for order ${data.order_id}`,
          );
        } catch (err) {
          console.error(
            "[OrderCreate] Meta Purchase event error:",
            err instanceof Error ? err.message : err,
          );
        }
      })();
    }

    return NextResponse.json({ order: data }, { status: 201 });
  } catch (error) {
    console.error("Order create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
