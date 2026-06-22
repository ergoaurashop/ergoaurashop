import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send";
import { orderStatusUpdateEmail } from "@/lib/email/templates/order-status-update";

// Simple status label map for customer-facing display
const STATUS_LABELS: Record<string, string> = {
  placed: "Order Placed",
  confirmed: "Confirmed",
  shipped: "Shipped",
  out_for_delivery: "Out for Delivery",
  delivered: "Delivered",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export async function POST(request: Request) {
  try {
    const { orderId, newStatus } = await request.json();

    if (!orderId || !newStatus) {
      return NextResponse.json(
        { error: "orderId and newStatus are required" },
        { status: 400 },
      );
    }

    // Fetch current order
    const { data: order, error: fetchError } = await supabaseAdmin
      .from("orders")
      .select("*")
      .eq("order_id", orderId)
      .single();

    if (fetchError || !order) {
      console.error(
        `[UpdateStatus] Order not found: ${orderId}`,
        fetchError?.message,
      );
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const oldStatus = order.order_status;

    // Update the order status
    const { error: updateError } = await supabaseAdmin
      .from("orders")
      .update({ order_status: newStatus })
      .eq("order_id", orderId);

    if (updateError) {
      console.error(
        `[UpdateStatus] Failed to update order ${orderId}: ${updateError.message}`,
      );
      return NextResponse.json(
        { error: "Failed to update order status" },
        { status: 500 },
      );
    }

    // ── Fire-and-forget: send status update email ──
    (async () => {
      try {
        const html = orderStatusUpdateEmail({
          customerName: order.customer_name,
          orderId: order.order_id,
          trackId: order.track_id,
          oldStatus,
          newStatus,
          newStatusLabel: STATUS_LABELS[newStatus] || newStatus,
        });
        const result = await sendEmail({
          to: order.customer_email,
          subject: `Order ${STATUS_LABELS[newStatus] || newStatus} — ${order.order_id} at ErgoAura`,
          html,
        });
        if (result.success) {
          console.log(
            `[UpdateStatus] ✅ Status update email sent to ${order.customer_email} (id: ${result.id})`,
          );
        } else {
          console.error(
            `[UpdateStatus] ❌ Failed to send status email: ${result.error}`,
          );
        }
      } catch (err) {
        console.error(
          "[UpdateStatus] Email error:",
          err instanceof Error ? err.message : err,
        );
      }
    })();

    return NextResponse.json({
      success: true,
      oldStatus,
      newStatus,
    });
  } catch (err) {
    console.error(
      "[UpdateStatus] Error:",
      err instanceof Error ? err.message : err,
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
