// ────────────────────────────────────────────────────────────────
// Measurement Protocol  (GA4 — server-side)
// Use this for events that MUST be reliable even if the user has
// left the page (e.g. refunds, webhook-triggered conversions).
//
// IMPORTANT:
//   This module is designed to run on the server only.
//   It uses fetch() so it works in Next.js API routes / server
//   actions / route handlers. Never import in client components.
// ────────────────────────────────────────────────────────────────

const GA4_MEASUREMENT_ID = "G-N6JQH432PP";
const GA4_API_SECRET = process.env.GA4_MEASUREMENT_PROTOCOL_SECRET || "";
const GA4_API_URL = "https://www.google-analytics.com/mp/collect";

// ── Shared helpers ────────────────────────────────────────────

interface MpItem {
  item_id: string;
  item_name: string;
  item_category?: string;
  price?: number;
  quantity?: number;
  item_brand?: string;
  currency?: string;
  [key: string]: unknown;
}

function buildMpPayload(
  eventName: string,
  params: Record<string, unknown>,
  clientId: string,
  userId?: string,
) {
  const payload: Record<string, unknown> = {
    client_id: clientId,
    events: [
      {
        name: eventName,
        params,
      },
    ],
  };

  if (userId) {
    payload.user_id = userId;
  }

  return payload;
}

// ──────────────────────────────────────────────────────────────
// sendEvent  —  Core function that POSTs to GA4 MP endpoint
// ──────────────────────────────────────────────────────────────
async function sendEvent(
  eventName: string,
  params: Record<string, unknown>,
  clientId: string,
  userId?: string,
): Promise<Response> {
  const url = `${GA4_API_URL}?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${GA4_API_SECRET}`;

  const body = buildMpPayload(eventName, params, clientId, userId);

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    // MP returns 204 on success, so any non-2xx is an error
    const text = await response.text();
    console.error(
      `[GA4 MP] Failed to send ${eventName}: ${response.status} ${text}`,
    );
  }

  return response;
}

// ──────────────────────────────────────────────────────────────
// refund  —  Called from a webhook or admin dashboard
// All GA4 refunds must include transaction_id for deduplication.
// ──────────────────────────────────────────────────────────────
export async function sendRefund(
  transactionId: string,
  clientId: string,
  options?: {
    value?: number;
    userId?: string;
    items?: {
      item_id: string;
      item_name: string;
      price: number;
      quantity: number;
    }[];
  },
): Promise<Response> {
  const params: Record<string, unknown> = {
    transaction_id: transactionId,
    currency: "INR",
  };

  if (options?.value !== undefined) {
    params.value = options.value;
  }

  if (options?.items) {
    params.items = options.items.map((item) => ({
      item_id: item.item_id,
      item_name: item.item_name,
      price: item.price,
      quantity: item.quantity,
      currency: "INR",
    }));
  }

  return sendEvent("refund", params, clientId, options?.userId);
}

// ──────────────────────────────────────────────────────────────
// purchase (server-side)  —  Optional double‑check / backup
// Prefer client-side purchase via dataLayer. Use this only if
// the client-side event might not fire.
// ──────────────────────────────────────────────────────────────
export async function sendPurchase(
  transactionId: string,
  value: number,
  clientId: string,
  options?: {
    shipping?: number;
    userId?: string;
    items?: {
      item_id: string;
      item_name: string;
      price: number;
      quantity: number;
      item_category?: string;
    }[];
  },
): Promise<Response> {
  const params: Record<string, unknown> = {
    transaction_id: transactionId,
    value,
    currency: "INR",
  };

  if (options?.shipping !== undefined) {
    params.shipping = options.shipping;
  }

  if (options?.items) {
    params.items = options.items.map((item) => ({
      item_id: item.item_id,
      item_name: item.item_name,
      item_category: item.item_category || "(not set)",
      price: item.price,
      quantity: item.quantity,
      currency: "INR",
    }));
  }

  return sendEvent("purchase", params, clientId, options?.userId);
}

// ──────────────────────────────────────────────────────────────
// sendCustomEvent  —  Generic server-side GA4 event
// ──────────────────────────────────────────────────────────────
export async function sendCustomEvent(
  eventName: string,
  params: Record<string, unknown>,
  clientId: string,
  userId?: string,
): Promise<Response> {
  return sendEvent(eventName, params, clientId, userId);
}
