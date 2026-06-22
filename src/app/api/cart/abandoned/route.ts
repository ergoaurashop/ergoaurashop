import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { sendEmail } from "@/lib/email/send";
import { abandonedCartEmail } from "@/lib/email/templates/abandoned-cart";

export async function GET(request: Request) {
  try {
    // Protection: require a cron secret
    const authHeader = request.headers.get("authorization");
    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Find carts abandoned >1 hour ago that haven't been notified
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

    const { data: carts, error } = await supabaseAdmin
      .from("carts")
      .select("*")
      .is("abandoned_at", null)
      .lt("last_activity", oneHourAgo);

    if (error) {
      console.error("[Abandoned] Query error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    let sent = 0;

    for (const cart of carts || []) {
      // Mark as abandoned
      await supabaseAdmin
        .from("carts")
        .update({ abandoned_at: new Date().toISOString() })
        .eq("id", cart.id);

      // Send email
      const html = abandonedCartEmail({
        customerName: cart.customer_name,
        customerEmail: cart.customer_email,
        items: cart.items,
        cartTotal: cart.cart_total,
        checkoutUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?cart=${cart.cart_token}`,
      });

      const result = await sendEmail({
        to: cart.customer_email,
        subject:
          "You Left Something Behind! Complete Your Order at ErgoAura 🛒",
        html,
      });

      if (result.success) {
        await supabaseAdmin
          .from("carts")
          .update({ reminder_sent_at: new Date().toISOString() })
          .eq("id", cart.id);
        sent++;
        console.log(
          `[Abandoned] ✅ Reminder sent to ${cart.customer_email} (id: ${result.id})`,
        );
      }

      // Small delay to avoid rate limits
      await new Promise((r) => setTimeout(r, 500));
    }

    return NextResponse.json({ processed: carts?.length || 0, sent });
  } catch (err) {
    console.error(
      "[Abandoned] Error:",
      err instanceof Error ? err.message : err,
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
