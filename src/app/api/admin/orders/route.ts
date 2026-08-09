import { NextRequest, NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  ADMIN_SESSION_COOKIE,
  verifyAdminSession,
} from "@/lib/admin-session";

/**
 * POST /api/admin/orders
 *
 * Fetch orders from Supabase using the service-role key (server-side only).
 * Authorization is the httpOnly `admin_session` cookie — the client never
 * sends the admin password to this endpoint.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { searchField, searchValue } = body;

    // ── Verify admin session cookie ────────────────────────────────
    const sessionToken = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!verifyAdminSession(sessionToken)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
