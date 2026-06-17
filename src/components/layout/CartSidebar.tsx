"use client";

import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { cn, formatPrice, getProductImageUrl } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { trackViewCart, trackRemoveFromCart } from "@/lib/analytics/events";

export default function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity } =
    useCartStore();

  // Track view_cart once when sidebar opens
  const hasTracked = useRef(false);
  useEffect(() => {
    if (isOpen && items.length > 0 && !hasTracked.current) {
      trackViewCart(items);
      hasTracked.current = true;
    }
    if (!isOpen) {
      hasTracked.current = false;
    }
  }, [isOpen, items]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  /* ── Buy 2 Get 1 Free discount ── */
  const b2g1Discount = items.reduce((discount, item) => {
    if (item.quantity >= 3) {
      const freeItems = Math.floor(item.quantity / 3);
      return discount + item.product.price * freeItems;
    }
    return discount;
  }, 0);

  const discountedSubtotal = Math.max(0, subtotal - b2g1Discount);
  const youSave = b2g1Discount;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md z-50 shadow-2xl flex flex-col bg-gradient-to-br from-[#1A1614] via-[#2E2825] to-[#3D352F] bg-[length:400%_400%] animate-gradient-shift"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <div>
                <h2 className="text-lg font-semibold text-white">Cart</h2>
                <p className="text-sm text-white/60">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={closeCart}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                aria-label="Close cart"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C9A962"
                    strokeWidth="1.5"
                    className="mb-4"
                  >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                  </svg>
                  <p className="text-white/60">Your cart is empty</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-4"
                    onClick={closeCart}
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex gap-4 py-4 border-b border-white/10 last:border-0"
                    >
                      {/* Image */}
                      <Link
                        href={`/products/${item.product.slug}`}
                        onClick={closeCart}
                        className="w-20 h-20 rounded-apple-sm bg-white/10 overflow-hidden flex-shrink-0 group block"
                      >
                        <img
                          src={getProductImageUrl(item.product.slug)}
                          alt={item.product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-white truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-sm mt-0.5 flex items-center gap-2 flex-wrap">
                          {/* Current price (red if on sale) */}
                          <span
                            className={cn(
                              "font-semibold",
                              item.product.original_price >
                                item.product.price && "text-[#EF4444]",
                            )}
                          >
                            {formatPrice(item.product.price)}
                          </span>
                          {/* Original price strikethrough */}
                          {item.product.original_price > item.product.price && (
                            <span className="text-xs text-white/50 line-through">
                              {formatPrice(item.product.original_price)}
                            </span>
                          )}
                          {/* Buy 2 Get 1 badge — always visible */}
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold text-white bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 bg-[length:200%_100%] animate-gradient-shift px-2 py-0.5 rounded-full whitespace-nowrap shadow-sm">
                            🎁 Buy 2 Get 1
                          </span>
                        </p>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-3 mt-2">
                          <div className="flex items-center border border-white/20 rounded-md">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity - 1,
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                            >
                              −
                            </button>
                            <span className="w-7 text-center text-sm font-medium text-white">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  item.quantity + 1,
                                )
                              }
                              className="w-7 h-7 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                            >
                              +
                            </button>
                          </div>
                          <button
                            onClick={() => {
                              trackRemoveFromCart(item.product, item.quantity);
                              removeItem(item.product.id);
                            }}
                            className="text-xs text-white/60 hover:text-red-400 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* B2G1 promo banner (shown when no items qualify yet) */}
              {items.length > 0 && b2g1Discount === 0 && (
                <div className="mx-6 py-3 px-3 bg-gradient-to-r from-amber-200 via-gold-light to-amber-100 bg-[length:200%_100%] animate-gradient-shift border border-gold/30 rounded-apple-sm flex items-center gap-2 shadow-gold/20">
                  <span className="text-lg shrink-0">🎁</span>
                  <p className="text-xs text-amber-900 font-medium leading-snug">
                    Add 3 of the same product to get 1 <strong>free</strong>!
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5 space-y-4">
                {/* Subtotal */}
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">Subtotal</span>
                  <span className="text-white font-semibold text-lg">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                {/* B2G1 Discount */}
                {b2g1Discount > 0 && (
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 text-sm">
                      <span className="text-[10px] font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 px-1.5 py-0.5 rounded-full">
                        B2G1
                      </span>
                      <span className="text-gold font-semibold">Discount</span>
                    </span>
                    <span className="text-sm text-white/80 font-medium">
                      -{formatPrice(b2g1Discount)}
                    </span>
                  </div>
                )}

                {/* You Save */}
                {youSave > 0 && (
                  <div className="flex items-center justify-between bg-emerald-900/60 backdrop-blur-sm rounded-apple-sm px-3 py-2 -mx-3 border border-emerald-700/30">
                    <span className="text-sm font-semibold text-emerald-300">
                      You Save
                    </span>
                    <span className="text-sm font-bold text-emerald-200">
                      {formatPrice(youSave)}
                    </span>
                  </div>
                )}

                {/* Total (after discount) */}
                <div className="flex items-center justify-between pt-1">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-white font-bold text-lg">
                    {formatPrice(discountedSubtotal)}
                  </span>
                </div>

                <p className="text-xs text-white/70 font-medium flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h9m-9 0V7a1 1 0 0 1 1-1h10l2 4v7h-2m0 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" />
                    <path d="M9 17V9h6" />
                    <path d="M9 13h5" />
                  </svg>
                  Free Delivery
                </p>
                <Link href="/checkout" onClick={closeCart}>
                  <Button variant="animated" fullWidth size="lg">
                    Checkout
                  </Button>
                </Link>
                <button
                  onClick={closeCart}
                  className="w-full text-center text-sm text-white/60 hover:text-white transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
