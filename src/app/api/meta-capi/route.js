import { NextResponse } from "next/server";
import { buildUserData, buildPayload, sendWithRetry } from "@/lib/meta/capi";

// ────────────────────────────────────────────────────────────────
// POST /api/meta-capi
//
// Receives event data from the frontend (client-side pixel.js),
// builds the full CAPI payload with all 12 user_data fields,
// and sends to Meta's Conversions API.
//
// Returns 200 immediately — never make the customer wait for Meta.
// ────────────────────────────────────────────────────────────────

export async function POST(request) {
  try {
    // ── Parse request body ──
    const body = await request.json();
    const {
      eventName,
      eventId,
      customData = {},
      userData = {},
      eventSourceUrl,
    } = body;

    // ── Validate required fields ──
    if (!eventName || !eventId) {
      return NextResponse.json(
        { error: "Missing required fields: eventName, eventId" },
        { status: 400 },
      );
    }

    // ── Log only non-PII data ──
    console.log(
      `[Meta CAPI] Processing event: ${eventName}, eventId: ${eventId}`,
    );

    // ── Extract network data from request headers ──
    const headers = {
      "x-forwarded-for": request.headers.get("x-forwarded-for") || undefined,
      "user-agent": request.headers.get("user-agent") || undefined,
    };

    // ── Build user_data with hashing ──
    const builtUserData = buildUserData(userData, headers);

    // ── Build full payload ──
    const payload = buildPayload({
      eventName,
      eventId,
      eventSourceUrl,
      userData: builtUserData,
      customData,
    });

    // ── Check feature flag ──
    if (process.env.META_CAPI_ENABLED !== "true") {
      console.log(
        `[Meta CAPI] ⚠️ Feature flag META_CAPI_ENABLED is not 'true'. Event ${eventId} skipped.`,
      );
      return NextResponse.json({ status: "skipped" });
    }

    // ── Send to Meta (fire-and-forget from client's perspective) ──
    // We don't await the result — Meta takes 200-500ms and we must not
    // block the customer's request. sendWithRetry handles retries + queuing.
    sendWithRetry(payload).catch((err) => {
      console.error(
        `[Meta CAPI] sendWithRetry error for ${eventId}:`,
        err.message,
      );
    });

    // ── Return immediately ──
    return NextResponse.json({ status: "ok", eventId });
  } catch (error) {
    console.error("[Meta CAPI] Route error:", error.message);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
