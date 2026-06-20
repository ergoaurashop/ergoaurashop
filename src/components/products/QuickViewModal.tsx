"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/lib/types";
import {
  cn,
  getProductImageUrl,
  getProductImages,
  isB2G1Eligible,
} from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import ProductPrice from "./ProductPrice";
import StarRating from "./StarRating";
import { useCartStore } from "@/store/cartStore";

interface QuickViewModalProps {
  product: Product;
  onClose: () => void;
}

/**
 * QuickViewModal â€” Full-screen product preview with focus trap.
 *
 * Desktop:
 *   Centered panel (max-w-[800px], max-h-[90dvh])
 *   Two-column: 45% image / 55% info
 *   Scales in + fades
 *
 * Mobile:
 *   Bottom sheet (h-[95dvh], rounded-t-3xl)
 *   Stacked layout
 *   Drag handle at top
 *   Sticky CTAs at bottom
 *
 * Features: focus trap, ESC close, body scroll lock,
 * return focus on close, backdrop blur, Add to Cart toast
 */
export default function QuickViewModal({
  product,
  onClose,
}: QuickViewModalProps) {
  const addItem = useCartStore((state) => state.addItem);
  const [mounted, setMounted] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [imgError, setImgError] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const isOutOfStock = product.stock <= 0;

  // Reset image error when product changes
  useEffect(() => {
    setImgError(false);
  }, [product.slug]);

  const images = useMemo(() => {
    try {
      if (product.images?.length > 0) return product.images;
      const fallbackImages = getProductImages(product.slug);
      if (fallbackImages.length > 0) return fallbackImages;
      return [getProductImageUrl(product.slug)];
    } catch {
      return ["/images/logo/ergoauralogo.webp"];
    }
  }, [product]);

  const handleAddToCart = useCallback(() => {
    if (isOutOfStock) return;
    addItem(product, 1);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  }, [addItem, product, isOutOfStock]);

  // ===== Mount / Body Scroll Lock =====
  useEffect(() => {
    setMounted(true);
    previousFocusRef.current = document.activeElement as HTMLElement;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
      previousFocusRef.current?.focus();
    };
  }, []);

  // ===== ESC Key Close =====
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  // ===== Focus Trap =====
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    function handleTab(e: KeyboardEvent) {
      if (e.key !== "Tab") return;
      if (!panel) return;
      const focusableElements =
        panel.querySelectorAll<HTMLElement>(focusableSelector);
      if (focusableElements.length === 0) return;

      const first = focusableElements[0];
      const last = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    window.addEventListener("keydown", handleTab);
    // Auto-focus first focusable element
    requestAnimationFrame(() => {
      const firstFocusable =
        panel.querySelector<HTMLElement>(focusableSelector);
      firstFocusable?.focus();
    });

    return () => window.removeEventListener("keydown", handleTab);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-50 bg-[#1A1614]/60 backdrop-blur-sm flex items-end md:items-center justify-center"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
        aria-label={`Quick view: ${product.name}`}
      >
        {/* ===== Panel ===== */}
        <motion.div
          ref={panelRef}
          initial={{ opacity: 0, y: 100, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className={cn(
            "relative w-full bg-white shadow-xl overflow-y-auto",
            "md:max-w-[800px] md:max-h-[90dvh] md:rounded-2xl",
            "h-[95dvh] rounded-t-3xl md:h-auto",
          )}
        >
          {/* ===== Mobile Drag Handle ===== */}
          <div className="md:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-[#D8CFBF]" />
          </div>

          {/* ===== Close Button ===== */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full
                       bg-white/90 backdrop-blur-sm shadow-md
                       flex items-center justify-center
                       text-[#1A1614] hover:text-[#C9A962]
                       transition-colors duration-200"
            aria-label="Close quick view"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* ===== Desktop: Two-Column Layout ===== */}
          <div className="flex flex-col md:flex-row h-full">
            {/* ===== Left: Image ===== */}
            <div
              className={cn(
                "relative overflow-hidden bg-[#F5F1EB] shrink-0",
                "md:w-[45%] md:h-auto",
                "h-[40vh] md:h-auto",
              )}
            >
              <Image
                key={product.slug}
                src={
                  imgError || !images[0]
                    ? "/images/logo/ergoauralogo.webp"
                    : images[0]
                }
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover"
                onError={() => setImgError(true)}
              />

              {/* Badges overlay */}
              <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
                <Badge variant="ded_licensed" size="sm">
                  Original
                </Badge>
              </div>

              {/* Discount badge */}
              {product.discount_percentage > 0 && (
                <div className="absolute bottom-3 left-3 z-10">
                  <Badge variant="discount" size="md">
                    -{product.discount_percentage}%
                  </Badge>
                </div>
              )}

              {/* Out of Stock badge */}
              {isOutOfStock && (
                <div className="absolute inset-0 bg-[#1A1614]/60 flex items-center justify-center z-10">
                  <span className="bg-[#1A1614]/90 text-[#F5F1EB] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
                    Out of Stock
                  </span>
                </div>
              )}
            </div>

            {/* ===== Right: Product Info ===== */}
            <div className="flex-1 flex flex-col p-5 md:p-6 md:overflow-y-auto gap-4">
              {/* Trust badge strip — only for eligible categories */}
              {isB2G1Eligible(product) && (
                <div className="flex flex-wrap gap-1.5">
                  <Badge variant="b2g1" size="sm">
                    Buy 2 Get 1 Free
                  </Badge>
                </div>
              )}

              {/* Title + Vendor */}
              <div>
                <h3 className="font-serif text-[clamp(1.25rem,2vw,1.75rem)] font-semibold text-[#1A1614] leading-snug">
                  {product.name}
                </h3>
                <p className="text-sm text-[#86868B] mt-0.5">ErgoAura</p>
              </div>

              {/* Star Rating */}
              <StarRating rating={4.5} count={12} size="sm" />

              {/* Price */}
              <ProductPrice
                price={product.price}
                originalPrice={
                  product.original_price > product.price
                    ? product.original_price
                    : undefined
                }
                size="md"
              />

              {/* Short Description (3-line clamp) */}
              <p className="text-sm text-[#52525B] leading-relaxed line-clamp-3">
                {product.description}
              </p>

              {/* Key Features (bulleted) */}
              {product.features && product.features.length > 0 && (
                <ul className="space-y-2">
                  {product.features.slice(0, 5).map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-[#52525B]"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#C9A962"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="shrink-0 mt-0.5"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              )}

              {/* Out of Stock Notice */}
              {isOutOfStock && (
                <div className="bg-[#FEF2F2] border border-[#FECACA] rounded-lg px-4 py-3 text-sm text-[#991B1B]">
                  This product is currently out of stock. Sign up to be notified
                  when it&apos;s back.
                </div>
              )}

              {/* CTA Buttons â€” Desktop (inline) */}
              <div className="hidden md:flex items-center gap-3 mt-auto pt-2">
                <button
                  onClick={handleAddToCart}
                  disabled={isOutOfStock}
                  className="btn-gradient-animated btn-md flex-1"
                >
                  {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </button>
                <Link
                  href={`/products/${product.slug}`}
                  onClick={onClose}
                  className="btn-ghost btn-md"
                >
                  Full Details
                </Link>
              </div>
            </div>
          </div>

          {/* ===== Mobile: Sticky CTAs ===== */}
          <div className="md:hidden sticky bottom-0 bg-white border-t border-[#EAE3D5] px-5 py-4 flex items-center gap-3">
            <button
              onClick={handleAddToCart}
              disabled={isOutOfStock}
              className="btn-gradient-animated btn-md flex-1"
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
            <Link
              href={`/products/${product.slug}`}
              onClick={onClose}
              className="btn-ghost btn-md"
            >
              Full Details
            </Link>
          </div>

          {/* ===== Toast Notification ===== */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="fixed top-4 left-1/2 -translate-x-1/2 z-[60]
                           bg-[#1A1614] text-[#F5F1EB] text-sm font-medium
                           px-5 py-3 rounded-full shadow-lg
                           flex items-center gap-2"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#C9A962"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Item added to cart
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
