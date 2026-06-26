"use client";

import { getClientData } from "./cookies";

// ────────────────────────────────────────────────────────────────
// Client-Side Event Helper
//
// Single function the entire codebase calls for every Meta event.
// Never fire pixel events ad-hoc — always go through trackEvent().
//
// Architecture:
//   1. Generates event_id (uuid v4) — same ID sent to both pixel + CAPI
//   2. Fires browser fbq() call
//   3. Simultaneously POSTs to /api/meta-capi
//   4. Never throws — wraps everything in try/catch
// ────────────────────────────────────────────────────────────────

/**
 * Generate a UUID v4 using the Web Crypto API.
 * Falls back to a simple random approach if crypto is unavailable.
 *
 * @returns {string}
 */
function generateEventId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for older browsers
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * Track a Meta event via both browser pixel and server CAPI.
 *
 * @param {string} eventName - Meta event name (e.g. 'Purchase', 'ViewContent')
 * @param {object} [customData={}] - Event-specific custom data
 * @param {object} [userData={}] - Customer PII data for CAPI matching
 */
export async function trackEvent(eventName, customData = {}, userData = {}) {
  // Silent exit if pixel ID is not configured
  if (!process.env.NEXT_PUBLIC_META_PIXEL_ID) {
    return;
  }

  try {
    const eventId = generateEventId();
    const { fbp, fbc } = getClientData();

    // 1. Fire browser pixel (client-side)
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", eventName, customData, { eventID: eventId });
    }

    // 2. Fire server CAPI (simultaneous — fire-and-forget)
    try {
      await fetch("/api/meta-capi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventName,
          eventId,
          customData,
          userData: { ...userData, fbp, fbc },
          eventSourceUrl: window.location.href,
        }),
      });
    } catch (err) {
      // Silent fail — never break the customer's journey
      console.error("[Meta Pixel] CAPI post failed:", err.message);
    }
  } catch (err) {
    // Absolute last-resort catch — never throw
    console.error("[Meta Pixel] trackEvent error:", err.message);
  }
}

/**
 * Track a Meta event synchronously (fire-and-forget, no await).
 * Useful for event handlers where you don't want to await.
 *
 * @param {string} eventName
 * @param {object} [customData={}]
 * @param {object} [userData={}]
 */
export function trackEventSync(eventName, customData = {}, userData = {}) {
  trackEvent(eventName, customData, userData).catch(() => {});
}
