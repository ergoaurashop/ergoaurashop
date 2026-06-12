"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import type { Product } from "@/lib/types";
import { useRouter } from "next/navigation";

/* ────────────────────────────────────────────────────────────────
   Props
   ──────────────────────────────────────────────────────────────── */
interface StickyCartPanelProps {
  product: Product;
  /** Ref to the hero section — used to determine when to show mobile bar */
  heroRef: React.RefObject<HTMLDivElement | null>;
}

/* ────────────────────────────────────────────────────────────────
   StickyCartPanel
   ──────────────────────────────────────────────────────────────── */
export default function StickyCartPanel({
  product,
  heroRef,
}: StickyCartPanelProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [showMobileBar, setShowMobileBar] = useState(false);

  /* ── IntersectionObserver: show mobile bar when hero is out of view ── */
  useEffect(() => {
    const el = heroRef?.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When hero is NOT intersecting (scrolled past), show the bar
        setShowMobileBar(!entry.isIntersecting);
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [heroRef]);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setQuantity(1);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    router.push("/checkout");
  };

  const increment = () => setQuantity((q) => Math.min(q + 1, 99));
  const decrement = () => setQuantity((q) => Math.max(q - 1, 1));

  /* ── Qty Selector ── */
  const QtySelector = () => (
    <div className="flex items-center border border-apple-border rounded-apple-sm">
      <button
        onClick={decrement}
        disabled={quantity <= 1}
        className="w-8 h-9 flex items-center justify-center text-apple-text-secondary hover:text-apple-text-primary transition-colors disabled:opacity-30"
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="w-8 text-center text-sm font-medium text-apple-text-primary">
        {quantity}
      </span>
      <button
        onClick={increment}
        disabled={quantity >= 99}
        className="w-8 h-9 flex items-center justify-center text-apple-text-secondary hover:text-apple-text-primary transition-colors disabled:opacity-30"
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );

  /* ── Price Display ── */
  const PriceDisplay = () => (
    <div className="flex items-baseline gap-2">
      <span className="text-xl font-bold text-apple-text-primary">
        {formatPrice(product.price * quantity)}
      </span>
      {product.original_price > product.price && (
        <span className="text-sm text-apple-text-secondary line-through">
          {formatPrice(product.original_price * quantity)}
        </span>
      )}
    </div>
  );

  /* ── Trust Badges ── */
  const TrustBadges = () => (
    <div className="grid grid-cols-2 gap-2">
      {[
        { label: "Free Delivery", sub: "All purchase" },
        { label: "Easy Returns", sub: "7-Day Policy" },
      ].map((item) => (
        <div
          key={item.label}
          className="bg-apple-bg rounded-apple-sm p-2 text-center"
        >
          <p className="text-xs font-medium text-apple-text-primary">
            {item.label}
          </p>
          <p className="text-[10px] text-apple-text-secondary">{item.sub}</p>
        </div>
      ))}
    </div>
  );

  return (
    <>
      {/* ==========================================================
          DESKTOP: Sticky Sidebar (visible lg+)
          ========================================================== */}
      <div className="hidden lg:block">
        <div className="sticky top-28 space-y-5">
          {/* Price */}
          <PriceDisplay />

          {/* Savings chip */}
          {product.discount_percentage > 0 && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
              <svg
                className="w-3.5 h-3.5 text-green-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M12 6v12M6 12h12" />
              </svg>
              <span className="text-xs font-semibold text-green-700">
                Save {formatPrice(product.original_price - product.price)}
              </span>
            </div>
          )}

          {/* B2G1 promo callout */}
          <div className="flex items-center gap-2 px-3 py-2.5 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-apple-sm">
            <span className="text-lg shrink-0">🎁</span>
            <p className="text-xs text-amber-800 font-medium leading-snug">
              Buy 2 Get 1 Free! Add 3 of this item, get 1 <strong>free</strong>.
            </p>
          </div>

          {/* Qty selector */}
          <div>
            <label className="block text-xs font-medium text-apple-text-secondary mb-1.5">
              Quantity
            </label>
            <QtySelector />
          </div>

          {/* Add to Cart */}
          <Button
            variant="animated"
            size="lg"
            fullWidth
            onClick={handleAddToCart}
            disabled={added}
          >
            {added ? "✓ Added to Cart" : "Add to Cart"}
          </Button>

          {/* Buy Now */}
          <Button
            variant="outline"
            size="lg"
            fullWidth
            onClick={handleBuyNow}
            className="!border-gold !text-gold hover:!bg-gold hover:!text-white transition-all duration-200"
          >
            Buy Now
          </Button>

          {/* Trust badges */}
          <TrustBadges />
        </div>
      </div>

      {/* ==========================================================
          MOBILE: Sticky Bottom Bar (shown after hero scrolled past)
          ========================================================== */}
      <AnimatePresence>
        {showMobileBar && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-white/95 backdrop-blur-lg border-t border-apple-border shadow-xl"
          >
            <div className="flex items-center gap-3 px-4 py-3 max-w-lg mx-auto">
              {/* Price + savings */}
              <div className="flex-shrink-0 min-w-0">
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-bold text-apple-text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.original_price > product.price && (
                    <span className="text-xs text-apple-text-secondary line-through">
                      {formatPrice(product.original_price)}
                    </span>
                  )}
                </div>
                {product.discount_percentage > 0 && (
                  <span className="text-[11px] font-medium text-green-600">
                    Save {product.discount_percentage}% —{" "}
                    {formatPrice(product.original_price - product.price)}
                  </span>
                )}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={handleAddToCart}
                  disabled={added}
                  className="px-4 py-2.5 bg-apple-black text-white text-sm font-semibold rounded-apple-sm hover:bg-primary-light transition-colors disabled:bg-green-700 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {added ? "✓ Added" : "Add to Cart"}
                </button>
                <button
                  onClick={handleBuyNow}
                  className="px-4 py-2.5 border-2 border-gold text-gold text-sm font-semibold rounded-apple-sm hover:bg-gold hover:text-white transition-all duration-200 whitespace-nowrap"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
