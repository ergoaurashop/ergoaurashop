import { getCustomerProfile } from "@/lib/shopify/customer";
import { NextResponse } from "next/server";

/**
 * API route to return the current customer profile.
 * Used by the CustomerProvider (client-side) to populate the auth state.
 */
export async function GET() {
  try {
    const profile = await getCustomerProfile();
    return NextResponse.json({ profile });
  } catch (err) {
    console.error("Profile API failure:", err);
    return NextResponse.json({ profile: null }, { status: 500 });
  }
}
