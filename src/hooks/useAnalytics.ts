"use client";

// ────────────────────────────────────────────────────────────────
// useAnalytics  —  Convenience React hook that exposes all GA4
// tracking functions for use in client components.
//
// Usage:
//   const analytics = useAnalytics();
//   analytics.trackViewItem(product);
// ────────────────────────────────────────────────────────────────

import { useCallback } from "react";
import {
  trackViewItemList,
  trackSelectItem,
  trackViewItem,
  trackAddToCart,
  trackRemoveFromCart,
  trackViewCart,
  trackBeginCheckout,
  trackPurchase,
  trackSearch,
  trackSignUp,
  trackLogin,
  trackRefund,
  trackAddToWishlist,
  type ProductLike,
  type PurchaseParams,
} from "@/lib/analytics/events";
import {
  trackScrollDepth,
  trackOutboundClick,
  trackFormStart,
  trackFormSubmit,
  trackVideoStart,
  trackVideoProgress,
  trackVideoComplete,
  trackClick,
  setUserId,
  clearUserId,
} from "@/lib/analytics/engagement";

export function useAnalytics() {
  const viewItemList = useCallback(
    (items: ProductLike[], listId?: string, listName?: string) => {
      trackViewItemList(items, listId, listName);
    },
    [],
  );

  const selectItem = useCallback(
    (item: ProductLike, listId?: string, listName?: string, index?: number) => {
      trackSelectItem(item, listId, listName, index);
    },
    [],
  );

  const viewItem = useCallback((product: ProductLike) => {
    trackViewItem(product);
  }, []);

  const addToCart = useCallback((product: ProductLike, quantity?: number) => {
    trackAddToCart(product, quantity);
  }, []);

  const removeFromCart = useCallback(
    (product: ProductLike, quantity?: number) => {
      trackRemoveFromCart(product, quantity);
    },
    [],
  );

  const viewCart = useCallback(
    (items: { product: ProductLike; quantity: number }[]) => {
      trackViewCart(items);
    },
    [],
  );

  const beginCheckout = useCallback(
    (items: { product: ProductLike; quantity: number }[], coupon?: string) => {
      trackBeginCheckout(items, coupon);
    },
    [],
  );

  const purchase = useCallback((params: PurchaseParams) => {
    trackPurchase(params);
  }, []);

  const search = useCallback((term: string, results?: ProductLike[]) => {
    trackSearch(term, results);
  }, []);

  const signUp = useCallback((method?: "email" | "google" | "github") => {
    trackSignUp(method);
  }, []);

  const login = useCallback((method?: "email" | "google" | "github") => {
    trackLogin(method);
  }, []);

  const refund = useCallback(
    (
      transactionId: string,
      value?: number,
      items?: { product: ProductLike; quantity: number }[],
    ) => {
      trackRefund(transactionId, value, items);
    },
    [],
  );

  const addToWishlist = useCallback((product: ProductLike) => {
    trackAddToWishlist(product);
  }, []);

  // ── Engagement tracking ──────────────────────────────────

  const outboundClick = useCallback(
    (
      url: string,
      text?: string,
      type?: "cta" | "social" | "affiliate" | "external",
    ) => {
      trackOutboundClick(url, text, type);
    },
    [],
  );

  const formStart = useCallback((name: string) => {
    trackFormStart(name);
  }, []);

  const formSubmit = useCallback(
    (name: string, success?: boolean, errorMessage?: string) => {
      trackFormSubmit(name, success, errorMessage);
    },
    [],
  );

  const videoStart = useCallback((title: string, url?: string) => {
    trackVideoStart(title, url);
  }, []);

  const videoProgress = useCallback((title: string, percent: number) => {
    trackVideoProgress(title, percent);
  }, []);

  const videoComplete = useCallback((title: string) => {
    trackVideoComplete(title);
  }, []);

  const click = useCallback((name: string, type: string, id?: string) => {
    trackClick(name, type, id);
  }, []);

  const identify = useCallback((userId: string) => {
    setUserId(userId);
  }, []);

  const logout = useCallback(() => {
    clearUserId();
  }, []);

  return {
    // Ecommerce
    viewItemList,
    selectItem,
    viewItem,
    addToCart,
    removeFromCart,
    viewCart,
    beginCheckout,
    purchase,
    search,
    signUp,
    login,
    refund,
    addToWishlist,
    // Engagement
    scrollDepth: trackScrollDepth,
    outboundClick,
    formStart,
    formSubmit,
    videoStart,
    videoProgress,
    videoComplete,
    click,
    // Identity
    identify,
    logout,
  };
}
