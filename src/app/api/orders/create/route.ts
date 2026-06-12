import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import type { OrderAddress, OrderProduct } from "@/lib/types";

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

    return NextResponse.json({ order: data }, { status: 201 });
  } catch (error) {
    console.error("Order create error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
