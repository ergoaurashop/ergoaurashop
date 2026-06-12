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

    // ── Build the query ─────────────────────────────────────────────
    let query = supabaseAdmin
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    // Apply search filter if provided
    const trimmed = (searchValue || "").trim();
    if (trimmed) {
      if (searchField === "order_id" || searchField === "track_id") {
        // Exact match for IDs
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        query = (query as any).eq(searchField, trimmed);
      } else if (
        searchField === "customer_name" ||
        searchField === "customer_email" ||
        searchField === "customer_phone"
      ) {
        // Partial / ILIKE match for text fields
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        query = (query as any).ilike(searchField, `%${trimmed}%`);
      }
    }

    const { data, error } = await query;

    if (error) {
      console.error("[Admin API] Fetch error:", error);
      return NextResponse.json(
        { error: "Failed to fetch orders" },
        { status: 500 },
      );
    }

    return NextResponse.json({ orders: data || [] });
  } catch (err) {
    console.error("[Admin API] Unexpected error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
