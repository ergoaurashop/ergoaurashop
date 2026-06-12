import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "@/lib/constants";

/**
 * POST /api/admin/orders
 *
 * Securely fetch orders from Supabase using the service-role key (server-side only).
 * The client must provide admin credentials in the request body for authorization.
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password, searchField, searchValue } = body;

    // ── Validate admin credentials against server-side env vars ────
    if (!username || !password) {
      return NextResponse.json(
        { error: "Admin credentials are required" },
        { status: 401 },
      );
    }

    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return NextResponse.json(
        { error: "Invalid admin credentials" },
        { status: 401 },
      );
    }

    // ── Fetch all orders (server-side, service role bypasses RLS) ──
    const { data, error } = await supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[Admin API] Fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch orders" },
        { status: 500 },
      );
    }

    // ── Apply search filter in-memory ─────────────────────────────
    const trimmed = (searchValue || "").trim();
    let orders = data || [];

    if (trimmed && searchField) {
      const lower = trimmed.toLowerCase();
      orders = orders.filter((o: Record<string, unknown>) => {
        const val = String(o[searchField] ?? "").toLowerCase();
        if (searchField === "order_id" || searchField === "track_id") {
          return val === lower; // exact match for IDs
        }
        return val.includes(lower); // partial match for text fields
      });
    }

    return NextResponse.json({ orders });
  } catch (err) {
    console.error("[Admin API] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
