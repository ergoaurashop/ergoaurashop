"use client";

/**
 * lib/cart/CartContext.tsx
 *
 * React context that owns ALL cart state for the ErgoAura storefront.
 *
 * Design decisions:
 * - Optimistic UI: state updates immediately, then syncs with Shopify.
 *   If the server action fails, the cart is re-fetched to restore truth.
 * - cartId is persisted to localStorage ("ergoaura_cart_id").
 * - On mount, we attempt to rehydrate from an existing Shopify cart.
 * - isLoading covers async operations so the UI can show spinners.
 */

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  useRef,
} from "react";
import type { Cart } from "@/lib/shopify/types";
import {
  createCart,
  addToCart,
  removeFromCart,
  updateCartLine,
  getCart,
} from "./actions";

// ─── Constants ────────────────────────────────────────────────────────────────

const CART_ID_KEY = "ergoaura_cart_id";

// ─── State & Actions ─────────────────────────────────────────────────────────

interface CartState {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  cart: null,
  isOpen: false,
  isLoading: false,
  error: null,
};

type Action =
  | { type: "SET_CART"; payload: Cart | null }
  | { type: "SET_OPEN"; payload: boolean }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case "SET_CART":
      return { ...state, cart: action.payload, error: null };
    case "SET_OPEN":
      return { ...state, isOpen: action.payload };
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
  }
}

// ─── Context Shape ────────────────────────────────────────────────────────────

export interface CartContextValue {
  cart: Cart | null;
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  totalQuantity: number;
  /** Add a variant to the cart. Opens the drawer on success by default. Returns the updated Cart. */
  addItem: (variantId: string, quantity?: number, openDrawerOnSuccess?: boolean) => Promise<Cart | void>;
  /** Remove a cart line by its line ID. */
  removeItem: (lineId: string) => Promise<void>;
  /** Update the quantity of a cart line. Pass 0 to remove. */
  updateQuantity: (lineId: string, quantity: number) => Promise<void>;
  openCart: () => void;
  closeCart: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Track mounted state to avoid setState after unmount
  const isMounted = useRef(true);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // ─── Rehydrate cart on mount ─────────────────────────────────────────────

  useEffect(() => {
    const storedId = localStorage.getItem(CART_ID_KEY);
    if (!storedId) return;

    dispatch({ type: "SET_LOADING", payload: true });

    getCart(storedId)
      .then((cart) => {
        if (!isMounted.current) return;
        if (cart) {
          setCart(cart);
        } else {
          // Cart expired on Shopify — clear stale ID
          localStorage.removeItem(CART_ID_KEY);
        }
      })
      .catch(() => {
        if (isMounted.current) {
          localStorage.removeItem(CART_ID_KEY);
        }
      })
      .finally(() => {
        if (isMounted.current) {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      });
  }, []);

  // ─── Helpers ─────────────────────────────────────────────────────────────

  /** Returns the current cartId from localStorage or state */
  function getStoredCartId(): string | null {
    return localStorage.getItem(CART_ID_KEY);
  }

  /** 
   * Ensures the checkoutUrl is absolute. 
   * Shopify Storefront API sometimes returns relative URLs (e.g. /cart/c/...)
   * which must be prefixed with the store domain to avoid 404s on the frontend.
   */
  // ✅ REPLACE your existing processCart with this:
// ✅ Simple version — let Shopify return its URL
// Next.js proxy will handle the routing
function processCart(cart: Cart | null): Cart | null {
  if (!cart) return null
  if (cart.checkoutUrl) {
    cart.checkoutUrl = cart.checkoutUrl
      .replace(
        'hqdyqf-9e.myshopify.com',
        process.env.NEXT_PUBLIC_CHECKOUT_DOMAIN || 
        'checkout.ergoaurashop.com'
      )
  }
  return cart
}

  /** Persists a cart to state + localStorage */
  function setCart(cart: Cart) {
    const processedCart = processCart(cart);
    if (processedCart) {
      localStorage.setItem(CART_ID_KEY, processedCart.id);
      dispatch({ type: "SET_CART", payload: processedCart });
    }
  }

  /**
   * Wraps a server action call with:
   * - loading state management
   * - error capture
   * - optional optimistic state (applied before the async call)
   */
  async function runCartAction(
    action: () => Promise<Cart>,
    optimisticCart?: Cart | null
  ): Promise<Cart | void> {
    dispatch({ type: "SET_LOADING", payload: true });
    dispatch({ type: "SET_ERROR", payload: null });

    // Apply optimistic state immediately
    if (optimisticCart !== undefined && optimisticCart !== null) {
      const processedOptimistic = processCart(optimisticCart);
      dispatch({ type: "SET_CART", payload: processedOptimistic });
    } else if (optimisticCart === null) {
      dispatch({ type: "SET_CART", payload: null });
    }

    try {
      const cart = await action();
      if (isMounted.current) setCart(cart);
      return cart;
    } catch (err) {
      console.error("Cart Action Error:", err);
      if (isMounted.current) {
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        dispatch({ type: "SET_ERROR", payload: message });

        // Revert optimistic state by re-fetching
        const cartId = getStoredCartId();
        if (cartId) {
          const freshCart = await getCart(cartId).catch(() => null);
          if (isMounted.current) {
            dispatch({ type: "SET_CART", payload: freshCart });
          }
        }
      }
    } finally {
      if (isMounted.current) {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    }
  }

  // ─── Public Actions ───────────────────────────────────────────────────────

  const addItem = useCallback(
    async (variantId: string, quantity = 1, openDrawerOnSuccess = true): Promise<Cart | void> => {
      const cartId = getStoredCartId();
      let newCart: Cart | void;

      if (cartId) {
        // Optimistic: bump totalQuantity immediately
        const optimistic: Cart | null = state.cart
          ? {
              ...state.cart,
              totalQuantity: state.cart.totalQuantity + quantity,
              // Keep existing cost if available to prevent "undefined" errors
              cost: state.cart.cost || {
                totalAmount: { amount: "0", currencyCode: "USD" },
                subtotalAmount: { amount: "0", currencyCode: "USD" },
                totalTaxAmount: { amount: "0", currencyCode: "USD" },
              }
            }
          : null;

        newCart = await runCartAction(
          () => addToCart(cartId, variantId, quantity),
          optimistic
        );
      } else {
        // No cart yet — create one
        newCart = await runCartAction(() => createCart(variantId, quantity));
      }

      if (isMounted.current && openDrawerOnSuccess) {
        dispatch({ type: "SET_OPEN", payload: true });
      }

      return newCart;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.cart]
  );

  const removeItem = useCallback(
    async (lineId: string): Promise<void> => {
      const cartId = getStoredCartId();
      if (!cartId) return;

      // Optimistic: remove the line from local state immediately
      const optimistic: Cart | null = state.cart
        ? {
            ...state.cart,
            lines: {
              edges: state.cart.lines.edges.filter(
                (e) => e.node.id !== lineId
              ),
            },
            totalQuantity: Math.max(
              0,
              state.cart.totalQuantity -
                (state.cart.lines.edges.find((e) => e.node.id === lineId)?.node
                  .quantity ?? 0)
            ),
          }
        : null;

      await runCartAction(
        () => removeFromCart(cartId, lineId),
        optimistic
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.cart]
  );

  const updateQuantity = useCallback(
    async (lineId: string, quantity: number): Promise<void> => {
      const cartId = getStoredCartId();
      if (!cartId) return;

      if (quantity <= 0) {
        await removeItem(lineId);
        return;
      }

      // Optimistic: update the quantity in local state immediately
      const optimistic: Cart | null = state.cart
        ? {
            ...state.cart,
            lines: {
              edges: state.cart.lines.edges.map((e) =>
                e.node.id === lineId
                  ? { node: { ...e.node, quantity } }
                  : e
              ),
            },
          }
        : null;

      await runCartAction(
        () => updateCartLine(cartId, lineId, quantity),
        optimistic
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.cart, removeItem]
  );

  const openCart = useCallback(
    () => dispatch({ type: "SET_OPEN", payload: true }),
    []
  );

  const closeCart = useCallback(
    () => dispatch({ type: "SET_OPEN", payload: false }),
    []
  );

  // ─── Context value ────────────────────────────────────────────────────────

  const value: CartContextValue = {
    cart: state.cart,
    isOpen: state.isOpen,
    isLoading: state.isLoading,
    error: state.error,
    totalQuantity: state.cart?.totalQuantity ?? 0,
    addItem,
    removeItem,
    updateQuantity,
    openCart,
    closeCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error(
      "useCart() must be called inside a <CartProvider>. " +
        "Make sure CartProvider wraps your app in layout.tsx."
    );
  }
  return ctx;
}
