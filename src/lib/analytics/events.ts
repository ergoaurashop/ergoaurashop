// ────────────────────────────────────────────────────────────────
// GA4 Enhanced E‑commerce Events
// Every function pushes a standard dataLayer event that GTM will
// forward to Google Analytics 4 as a GA4 Event tag.
// ────────────────────────────────────────────────────────────────

import {
  pushEcommerceEvent,
  pushToDataLayer,
  buildProduct,
  type Ga4Item,
} from "./gtm";

// ── Event name constants (match GTM trigger names) ──────────
export const GA4_EVENTS = {
  VIEW_ITEM_LIST: "view_item_list",
  SELECT_ITEM: "select_item",
  VIEW_ITEM: "view_item",
  ADD_TO_CART: "add_to_cart",
  REMOVE_FROM_CART: "remove_from_cart",
  VIEW_CART: "view_cart",
  BEGIN_CHECKOUT: "begin_checkout",
  ADD_SHIPPING_INFO: "add_shipping_info",
  ADD_PAYMENT_INFO: "add_payment_info",
  PURCHASE: "purchase",
  SEARCH: "search",
  SIGN_UP: "sign_up",
  LOGIN: "login",
  GENERATE_LEAD: "generate_lead",
  ADD_TO_WISHLIST: "add_to_wishlist",
  VIEW_PROMOTION: "view_promotion",
  SELECT_PROMOTION: "select_promotion",
  REFUND: "refund",
} as const;

// ── Typed helpers ────────────────────────────────────────────

// Product-like shape accepted by all track* functions.
// Extra properties on the passed object are allowed via structural
// typing — no index signature needed.
export type ProductLike = {
  id: string;
  name: string;
  category?: string;
  price: number;
  original_price?: number;
  slug: string;
};

// ──────────────────────────────────────────────────────────────
// 1.  view_item_list  —  Product list / category pages
// ──────────────────────────────────────────────────────────────
export function trackViewItemList(
  items: ProductLike[],
  itemListId = "products",
  itemListName = "Products",
): void {
  pushEcommerceEvent(GA4_EVENTS.VIEW_ITEM_LIST, {
    item_list_id: itemListId,
    item_list_name: itemListName,
    items: items.map((p, i) => buildProduct(p, { index: i })),
  });
}

// ──────────────────────────────────────────────────────────────
// 2.  select_item  —  Click a product card
// ──────────────────────────────────────────────────────────────
export function trackSelectItem(
  item: ProductLike,
  itemListId = "products",
  itemListName = "Products",
  index = 0,
): void {
  pushEcommerceEvent(GA4_EVENTS.SELECT_ITEM, {
    item_list_id: itemListId,
    item_list_name: itemListName,
    items: [buildProduct(item, { index })],
  });
}

// ──────────────────────────────────────────────────────────────
// 3.  view_item  —  Product detail page
// ──────────────────────────────────────────────────────────────
export function trackViewItem(product: ProductLike): void {
  pushEcommerceEvent(GA4_EVENTS.VIEW_ITEM, {
    currency: "INR",
    value: product.price,
    items: [buildProduct(product)],
  });
}

// ──────────────────────────────────────────────────────────────
// 4.  add_to_cart  —  "Add to Cart" button
// ──────────────────────────────────────────────────────────────
export function trackAddToCart(product: ProductLike, quantity = 1): void {
  const price = product.price;
  pushEcommerceEvent(GA4_EVENTS.ADD_TO_CART, {
    currency: "INR",
    value: price * quantity,
    items: [buildProduct(product, { quantity })],
  });
}

// ──────────────────────────────────────────────────────────────
// 5.  remove_from_cart  —  Remove item from sidebar cart
// ──────────────────────────────────────────────────────────────
export function trackRemoveFromCart(product: ProductLike, quantity = 1): void {
  const price = product.price;
  pushEcommerceEvent(GA4_EVENTS.REMOVE_FROM_CART, {
    currency: "INR",
    value: price * quantity,
    items: [buildProduct(product, { quantity })],
  });
}

// ──────────────────────────────────────────────────────────────
// 6.  view_cart  —  Open cart sidebar
// ──────────────────────────────────────────────────────────────
export function trackViewCart(
  items: { product: ProductLike; quantity: number }[],
): void {
  const ga4Items: Ga4Item[] = items.map(({ product, quantity }) =>
    buildProduct(product, { quantity }),
  );
  const value = ga4Items.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0,
  );

  pushEcommerceEvent(GA4_EVENTS.VIEW_CART, {
    currency: "INR",
    value,
    items: ga4Items,
  });
}

// ──────────────────────────────────────────────────────────────
// 7.  begin_checkout  —  Visit /checkout page
// ──────────────────────────────────────────────────────────────
export function trackBeginCheckout(
  items: { product: ProductLike; quantity: number }[],
  coupon?: string,
): void {
  const ga4Items: Ga4Item[] = items.map(({ product, quantity }) =>
    buildProduct(product, { quantity }),
  );
  const value = ga4Items.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0,
  );

  pushEcommerceEvent(GA4_EVENTS.BEGIN_CHECKOUT, {
    currency: "INR",
    value,
    coupon,
    items: ga4Items,
  });
}

// ──────────────────────────────────────────────────────────────
// 8.  purchase  —  Successful order (call AFTER Razorpay success)
// ──────────────────────────────────────────────────────────────
export interface PurchaseParams {
  transactionId: string; // Razorpay payment ID — dedup key
  value: number; // total paid
  shipping?: number;
  coupon?: string;
  tax?: number;
  items: { product: ProductLike; quantity: number }[];
  /** Optional user identifier for cross-device measurement */
  userId?: string;
}

export function trackPurchase(params: PurchaseParams): void {
  const ga4Items: Ga4Item[] = params.items.map(({ product, quantity }) =>
    buildProduct(product, { quantity }),
  );

  pushEcommerceEvent(GA4_EVENTS.PURCHASE, {
    transaction_id: params.transactionId,
    value: params.value,
    currency: "INR",
    shipping: params.shipping,
    coupon: params.coupon,
    tax: params.tax,
    items: ga4Items,
    user_id: params.userId,
  });
}

// ──────────────────────────────────────────────────────────────
// 9.  search  —  Site search
// ──────────────────────────────────────────────────────────────
export function trackSearch(
  searchTerm: string,
  searchResults?: ProductLike[],
): void {
  pushEcommerceEvent(GA4_EVENTS.SEARCH, {
    search_term: searchTerm,
    ...(searchResults
      ? {
          items: searchResults.map((p, i) => buildProduct(p, { index: i })),
        }
      : {}),
  });
}

// ──────────────────────────────────────────────────────────────
// 10.  sign_up  —  Registration complete
// ──────────────────────────────────────────────────────────────
export function trackSignUp(
  method: "email" | "google" | "github" = "email",
): void {
  pushToDataLayer({
    event: GA4_EVENTS.SIGN_UP,
    method,
  });
}

// ──────────────────────────────────────────────────────────────
// 11.  login  —  User signs in
// ──────────────────────────────────────────────────────────────
export function trackLogin(
  method: "email" | "google" | "github" = "email",
): void {
  pushToDataLayer({
    event: GA4_EVENTS.LOGIN,
    method,
  });
}

// ──────────────────────────────────────────────────────────────
// 12.  generate_lead  —  Contact / quote form submission
// ──────────────────────────────────────────────────────────────
export function trackGenerateLead(value?: number, currency = "INR"): void {
  pushToDataLayer({
    event: GA4_EVENTS.GENERATE_LEAD,
    value,
    currency,
  });
}

// ──────────────────────────────────────────────────────────────
// 13.  add_to_wishlist  —  Wishlist / save-for-later
// ──────────────────────────────────────────────────────────────
export function trackAddToWishlist(product: ProductLike): void {
  pushEcommerceEvent(GA4_EVENTS.ADD_TO_WISHLIST, {
    currency: "INR",
    value: product.price,
    items: [buildProduct(product)],
  });
}

// ──────────────────────────────────────────────────────────────
// 14.  refund  —  Partial or full refund (client-side)
//      (For server-side refund use measurement-protocol.ts)
// ──────────────────────────────────────────────────────────────
export function trackRefund(
  transactionId: string,
  value?: number,
  items?: { product: ProductLike; quantity: number }[],
): void {
  pushEcommerceEvent(GA4_EVENTS.REFUND, {
    transaction_id: transactionId,
    ...(value !== undefined && { value }),
    currency: "INR",
    ...(items && {
      items: items.map(({ product, quantity }) =>
        buildProduct(product, { quantity }),
      ),
    }),
  });
}
