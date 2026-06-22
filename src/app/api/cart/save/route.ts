import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { email, name, items, total } = await request.json();

    if (!email || !items || !items.length) {
      return NextResponse.json(
        { error: "email and items are required" },
        { status: 400 },
      );
    }

    const cartToken = crypto.randomUUID();

    const { error } = await supabaseAdmin.from("carts").upsert(
      {
        customer_email: email,
        customer_name: name || "Valued Customer",
        items,
        cart_total: total || 0,
        cart_token: cartToken,
        last_activity: new Date().toISOString(),
      },
      { onConflict: "customer_email" },
    );

    if (error) {
      console.error("[CartSave] Error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, cartToken });
  } catch (err) {
    console.error(
      "[CartSave] Error:",
      err instanceof Error ? err.message : err,
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
