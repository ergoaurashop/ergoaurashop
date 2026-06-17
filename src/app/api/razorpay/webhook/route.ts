import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { RAZORPAY_WEBHOOK_SECRET } from "@/lib/constants";

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
          .select("id, order_status")
          .eq("payment_id", razorpayPaymentId)
          .maybeSingle();

        if (existingOrder) {
          console.log(
            `[Webhook] Order already exists for payment ${razorpayPaymentId}, status: ${existingOrder.order_status}`,
          );
          return NextResponse.json({ status: "already_exists" });
        }

        // Order doesn't exist yet — this means the customer's browser
        // failed to redirect after payment. We try to find the order
        // by razorpay_order_id stored in notes or find via Razorpay API.
        // For now, log it — manual reconciliation needed.
        console.warn(
          `[Webhook] ⚠️ Payment captured but no order found in DB. Payment: ${razorpayPaymentId}, Razorpay Order: ${razorpayOrderId}`,
        );

        return NextResponse.json({ status: "logged" });
      }

      case "payment.failed": {
        const payment = event.payload.payment.entity;
        console.error(
          `[Webhook] Payment failed: ${payment.id}, error: ${payment.error_description}`,
        );

        // Update the order's payment_status to "failed" if we have a record
        if (payment.order_id) {
          await supabaseAdmin
            .from("orders")
            .update({ payment_status: "failed" })
            .eq("payment_id", payment.id);
        }

        return NextResponse.json({ status: "logged" });
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
