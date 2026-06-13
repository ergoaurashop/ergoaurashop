// ────────────────────────────────────────────────────────────────
// Google Tag Manager — Core dataLayer helpers
// ────────────────────────────────────────────────────────────────

declare global {
  interface Window {
    dataLayer: unknown[];
  }
}

/**
 * Push a generic event to the GTM dataLayer.
 * Safe to call on the server (no-op).
 */
export function pushToDataLayer(event: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

/**
 * Push an enhanced e-commerce event to the dataLayer (GA4 format).
 *
 * @param eventName  The custom event name GTM listens for (e.g. "add_to_cart")
 * @param ecommerce  The GA4 ecommerce payload object
 */
export function pushEcommerceEvent(
  eventName: string,
  ecommerce: Record<string, unknown>,
): void {
  pushToDataLayer({
    event: eventName,
    ecommerce,
  });
}

// ── Product Helpers ────────────────────────────────────────────

/** Shape expected by GA4 for item objects inside ecommerce events */
export interface Ga4Item {
  item_id: string;
  item_name: string;
  item_category: string;
  price: number;
  discount?: number;
  item_brand?: string;
  item_variant?: string;
  quantity?: number;
  currency?: string;
  index?: number;
  [key: string]: unknown;
}

/**
 * Build a standard GA4 item object from the application's product shape.
 * Overrides can supply quantity, index, or any extra fields.
 */
export function buildProduct<
  T extends {
    id: string;
    name: string;
    category?: string;
    price: number;
    original_price?: number;
    slug: string;
  },
>(product: T, overrides: Partial<Ga4Item> = {}): Ga4Item {
  return {
    item_id: product.id,
    item_name: product.name,
    item_category: product.category || "(not set)",
    price: product.price,
    discount: product.original_price
      ? product.original_price - product.price
      : 0,
    currency: "INR",
    item_brand: "ErgoAura",
    ...overrides,
  };
}
