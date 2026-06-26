// Server-side only — never import into client components
import { saveToQueue } from "./queue";
import {
  hashEmail,
  hashPhone,
  hashName,
  hashExternalId,
  hashCity,
  hashState,
  hashPincode,
  hashCountry,
} from "./hash";

// ────────────────────────────────────────────────────────────────
// Configuration
// ────────────────────────────────────────────────────────────────

const META_API_VERSION = "v19.0";
const MAX_RETRIES = 3;
const TIMEOUT_MS = 8000;

/**
 * Get the Meta CAPI endpoint URL.
 * @returns {string}
 */
function getEndpoint() {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) {
    console.error("[Meta CAPI] Missing META_PIXEL_ID or META_CAPI_TOKEN");
    return null;
  }
  return `https://graph.facebook.com/${META_API_VERSION}/${pixelId}/events?access_token=${token}`;
}

// ────────────────────────────────────────────────────────────────
// Helpers
// ────────────────────────────────────────────────────────────────

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Build the user_data object for the CAPI payload.
 *
 * CRITICAL:
 * - fbp and fbc are passed RAW — NEVER hashed
 * - All PII fields are SHA256 hashed and wrapped in arrays
 *
 * @param {object} userData - Raw user data from the frontend
 * @param {object} headers - Request headers (x-forwarded-for, user-agent)
 * @returns {object} user_data payload
 */
export function buildUserData(userData, headers) {
  return {
    // Layer 1 — Browser (raw, never hashed)
    fbp: userData.fbp || undefined,
    fbc: userData.fbc || undefined,

    // Layer 2 — Network (from request headers)
    client_ip_address: headers?.["x-forwarded-for"]
      ? headers["x-forwarded-for"].split(",")[0].trim()
      : undefined,
    client_user_agent: headers?.["user-agent"] || undefined,

    // Layer 3 — Customer (ALL SHA256 hashed — wrapped in arrays)
    em: userData.email ? [hashEmail(userData.email)] : undefined,
    ph: userData.phone ? [hashPhone(userData.phone)] : undefined,
    fn: userData.firstName ? [hashName(userData.firstName)] : undefined,
    ln: userData.lastName ? [hashName(userData.lastName)] : undefined,
    external_id: userData.customerId
      ? [hashExternalId(userData.customerId)]
      : undefined,

    // Layer 4 — Location (ALL SHA256 hashed — wrapped in arrays)
    ct: userData.city ? [hashCity(userData.city)] : undefined,
    st: userData.state ? [hashState(userData.state)] : undefined,
    zp: userData.pincode ? [hashPincode(userData.pincode)] : undefined,
    country: [hashCountry()], // always "in"
  };
}

/**
 * Build the full CAPI request payload.
 *
 * @param {object} params
 * @param {string} params.eventName
 * @param {string} params.eventId
 * @param {number} [params.eventTime] - Unix timestamp (seconds). Defaults to now.
 * @param {string} params.eventSourceUrl
 * @param {object} params.userData - Pre-built user_data object
 * @param {object} [params.customData] - Event-specific custom data
 * @returns {object} Full payload ready to send
 */
export function buildPayload({
  eventName,
  eventId,
  eventTime,
  eventSourceUrl,
  userData,
  customData = {},
}) {
  const payload = {
    data: [
      {
        event_name: eventName,
        event_time: eventTime || Math.floor(Date.now() / 1000),
        event_id: eventId,
        event_source_url: eventSourceUrl || "https://ergoaurashop.com",
        action_source: "website",
        user_data: userData,
        custom_data: customData,
      },
    ],
  };

  // Include test_event_code ONLY in non-production environments
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.META_TEST_EVENT_CODE
  ) {
    payload.test_event_code = process.env.META_TEST_EVENT_CODE;
  }

  return payload;
}

// ────────────────────────────────────────────────────────────────
// Retry Logic
// ────────────────────────────────────────────────────────────────

/**
 * Send a CAPI event to Meta with retry logic.
 *
 * Retry strategy:
 *   - 429 (Rate limited): exponential backoff with longer wait
 *   - 5xx (Server error): exponential backoff
 *   - 4xx (Client error): don't retry — bad payload
 *   - Network error: retry, then queue on final failure
 *
 * @param {object} payload - The full CAPI payload
 * @param {number} [maxRetries=3] - Maximum number of retry attempts
 * @returns {Promise<object|null>} Meta response or null on failure
 */
export async function sendWithRetry(payload, maxRetries = MAX_RETRIES) {
  const endpoint = getEndpoint();
  if (!endpoint) {
    console.error("[Meta CAPI] Cannot send: endpoint not configured");
    return null;
  }

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = await res.json();
        console.log(
          `[Meta CAPI] ✅ Event sent successfully (attempt ${attempt})`,
        );
        return json;
      }

      const errorBody = await res.json().catch(() => ({}));
      const eventId =
        payload.data?.[0]?.event_id || payload.event_id || "unknown";

      if (res.status === 429) {
        // Rate limited — exponential backoff with longer wait
        const waitMs = attempt * 2000;
        console.warn(
          `[Meta CAPI] Rate limited (429). Retrying in ${waitMs}ms. Event: ${eventId}`,
        );
        await sleep(waitMs);
        continue;
      }

      if (res.status >= 500) {
        // Server error — retry with backoff
        const waitMs = attempt * 1000;
        console.warn(
          `[Meta CAPI] Server error (${res.status}). Retrying in ${waitMs}ms. Event: ${eventId}`,
        );
        await sleep(waitMs);
        continue;
      }

      // 4xx client error — don't retry (bad payload), log and return
      console.error(
        `[Meta CAPI] Client error (${res.status}) for event ${eventId}:`,
        errorBody,
      );
      return null;
    } catch (err) {
      const eventId =
        payload.data?.[0]?.event_id || payload.event_id || "unknown";

      if (err.name === "AbortError") {
        console.warn(
          `[Meta CAPI] Timeout after ${TIMEOUT_MS}ms (attempt ${attempt}). Event: ${eventId}`,
        );
      } else {
        console.error(
          `[Meta CAPI] Network error (attempt ${attempt}):`,
          err.message,
        );
      }

      if (attempt === maxRetries) {
        // Final failure — queue for cron retry
        try {
          await saveToQueue(payload);
          console.log(`[Meta CAPI] 📋 Event queued for retry: ${eventId}`);
        } catch (queueErr) {
          console.error(
            `[Meta CAPI] Failed to queue event ${eventId}:`,
            queueErr.message,
          );
        }
        return null;
      }

      const waitMs = attempt * 1000;
      await sleep(waitMs);
    }
  }

  return null;
}

/**
 * Convenience function: build payload + send in one call.
 * Used by the razorpay webhook for server-to-server events.
 *
 * @param {object} params
 * @param {string} params.eventName
 * @param {string} params.eventId
 * @param {number} [params.eventTime]
 * @param {string} [params.eventSourceUrl]
 * @param {object} params.userData
 * @param {object} [params.customData]
 * @returns {Promise<object|null>}
 */
export async function sendCAPIEvent({
  eventName,
  eventId,
  eventTime,
  eventSourceUrl,
  userData,
  customData = {},
}) {
  // Build user_data from raw data (this path is server-side, so no headers needed)
  const builtUserData = buildUserData(userData);

  const payload = buildPayload({
    eventName,
    eventId,
    eventTime,
    eventSourceUrl,
    userData: builtUserData,
    customData,
  });

  return sendWithRetry(payload);
}
