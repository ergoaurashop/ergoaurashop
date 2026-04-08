import { NextRequest, NextResponse } from "next/server";
import { getTrackingInfo } from "@/lib/aftership/actions";

/**
 * GET /api/track?number=EA123456789AE
 *
 * Server-side proxy for AfterShip tracking so the API key never
 * reaches the browser bundle.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const trackingNumber = searchParams.get("number");

  if (!trackingNumber || !trackingNumber.trim()) {
    return NextResponse.json({ error: "Missing tracking number" }, { status: 400 });
  }

  try {
    const data = await getTrackingInfo(trackingNumber.trim());
    if (!data) {
      return NextResponse.json({ data: null });
    }
    return NextResponse.json({ data });
  } catch (err) {
    console.error("[api/track] error:", err);
    return NextResponse.json({ error: "Failed to fetch tracking info" }, { status: 500 });
  }
}
