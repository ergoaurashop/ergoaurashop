"use server";

/**
 * lib/cart/actions.ts
 *
 * Next.js Server Actions for Shopify Cart API.
 * All functions call the Shopify Storefront GraphQL API directly
 * from the server — credentials never reach the browser.
 */

import { shopifyFetch } from "@/lib/shopify/client";
import {
  CREATE_CART,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  GET_CART,
} from "@/lib/shopify/queries";
import type { Cart } from "@/lib/shopify/types";

// ─── Response shapes ─────────────────────────────────────────────────────────

interface CartCreateResponse {
  cartCreate: {
    cart: Cart;
    userErrors: { field: string[]; message: string }[];
  };
}

interface CartLinesAddResponse {
  cartLinesAdd: {
    cart: Cart;
    userErrors: { field: string[]; message: string }[];
  };
}

interface CartLinesRemoveResponse {
  cartLinesRemove: {
    cart: Cart;
    userErrors: { field: string[]; message: string }[];
  };
}

interface CartLinesUpdateResponse {
  cartLinesUpdate: {
    cart: Cart;
    userErrors: { field: string[]; message: string }[];
  };
}

interface CartQueryResponse {
  cart: Cart | null;
}

// ─── Helper ───────────────────────────────────────────────────────────────────

function assertNoUserErrors(
  userErrors: { field: string[]; message: string }[]
): void {
  if (userErrors.length > 0) {
    throw new Error(
      `Shopify cart error: ${userErrors.map((e) => e.message).join(", ")}`
    );
  }
}

// ─── Actions ─────────────────────────────────────────────────────────────────

/**
 * Creates a new Shopify cart, optionally with an initial line item.
 * Returns the full Cart object.
 */
export async function createCart(
  variantId?: string,
  quantity = 1
): Promise<Cart> {
  const lines =
    variantId ? [{ merchandiseId: variantId, quantity }] : [];

  const data = await shopifyFetch<CartCreateResponse>({
    query: CREATE_CART,
    variables: { lines },
    cache: "no-store",
  });

  assertNoUserErrors(data.cartCreate.userErrors);
  return data.cartCreate.cart;
}

/**
 * Adds a variant to an existing cart.
 * Returns the updated Cart object.
 */
export async function addToCart(
  cartId: string,
  variantId: string,
  quantity = 1
): Promise<Cart> {
  const data = await shopifyFetch<CartLinesAddResponse>({
    query: ADD_TO_CART,
    variables: {
      cartId,
      lines: [{ merchandiseId: variantId, quantity }],
    },
    cache: "no-store",
  });

  assertNoUserErrors(data.cartLinesAdd.userErrors);
  return data.cartLinesAdd.cart;
}

/**
 * Removes a line from the cart by its line ID.
 * Returns the updated Cart object.
 */
export async function removeFromCart(
  cartId: string,
  lineId: string
): Promise<Cart> {
  const data = await shopifyFetch<CartLinesRemoveResponse>({
    query: REMOVE_FROM_CART,
    variables: {
      cartId,
      lineIds: [lineId],
    },
    cache: "no-store",
  });

  assertNoUserErrors(data.cartLinesRemove.userErrors);
  return data.cartLinesRemove.cart;
}

/**
 * Updates the quantity of an existing cart line.
 * Returns the updated Cart object.
 */
export async function updateCartLine(
  cartId: string,
  lineId: string,
  quantity: number
): Promise<Cart> {
  const data = await shopifyFetch<CartLinesUpdateResponse>({
    query: UPDATE_CART,
    variables: {
      cartId,
      lines: [{ id: lineId, quantity }],
    },
    cache: "no-store",
  });

  assertNoUserErrors(data.cartLinesUpdate.userErrors);
  return data.cartLinesUpdate.cart;
}

/**
 * Fetches a cart by its ID.
 * Returns the Cart object, or null if expired / not found.
 */
export async function getCart(cartId: string): Promise<Cart | null> {
  try {
    const data = await shopifyFetch<CartQueryResponse>({
      query: GET_CART,
      variables: { cartId },
      cache: "no-store",
    });
    return data.cart;
  } catch {
    // Cart may have expired — return null so the context creates a new one
    return null;
  }
}
