import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { RAZORPAY_KEY_SECRET } from "@/lib/constants";
import type { OrderAddress, OrderProduct } from "@/lib/types";
import { sendEmail } from "@/lib/email/send";
import { orderConfirmationEmail } from "@/lib/email/templates/order-confirmation";

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
    }

    // ── Insert order using service role (bypasses RLS) ────────────
    const { data, error } = await supabaseAdmin
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
      })
      .select()
      .single();

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

    return NextResponse.json({ order: data }, { status: 201 });
  } catch (error) {
    console.error("Order create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
