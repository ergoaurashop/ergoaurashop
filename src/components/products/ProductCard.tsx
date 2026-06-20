"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import {
  getProductImageUrl,
  getProductImages,
  isB2G1Eligible,
} from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import ProductImage from "./ProductImage";
import ProductPrice from "./ProductPrice";
import StarRating from "./StarRating";
import QuickViewModal from "./QuickViewModal";
import { useCartStore } from "@/store/cartStore";
import { getProductReviewSummary } from "@/lib/reviews-data";
import { trackSelectItem, trackAddToCart } from "@/lib/analytics/events";

interface ProductCardProps {
  product: Product;
  index?: number;
}

/**
 * ProductCard — Rich product card with the full Desert Luxury anatomy:
 *
 * ┌─────────────────────────────────────────────┐
 * │  Top-Left Badges     │  Top-Right Badges      │
 * │  [🏛️ DED Licensed]  │  [⭐ ErgoAura's Choice] │
 * │  [🇦🇪 Made in UAE]   │  [🔥 Super Deal]       │
 * │                                               │
 * │  ┌─── Product Image (4:3) ─────────────────┐ │
 * │  │  [image stacking + hover crossfade]      │ │
 * │  │  ╔══ Bottom-Left ╗                      │ │
 * │  │  ║   -35% OFF    ║                      │ │
 * │  ├── [👁 Quick View] (slide-up on hover) ──┤ │
 * │  └──────────────────────────────────────────┘ │
 * │                                               │
 * │  Product Title (2-line clamp, gold on hover)  │
 * │  ★★★★☆  (12 reviews)                         │
 * │  AED 4,500   ~~AED 6,900~~                    │
 * │                                               │
 * │  [🔧 Free Install] [🛡️ 5-Year] [☀️ Dubai]    │
 * │                                               │
 * │  [👁 Quick View]  ← Mobile only              │
 * └─────────────────────────────────────────────┘
 */
export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const images = getProductImages(product.slug);
  const isOutOfStock = product.stock <= 0;
  const hasDiscount = product.discount_percentage > 0;

  // Build image URLs for ProductImage
  const imageUrls =
    images.length > 0
      ? images
      : product.images.length > 0
        ? product.images
        : [getProductImageUrl(product.slug)];

  // Track select_item on title/link click
  const handleProductClick = useCallback(() => {
    trackSelectItem(product, "products", "Products", index);
  }, [product, index]);

  // Track add_to_cart
  const handleAddToCart = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      addItem(product);
      trackAddToCart(product, 1);
    },
    [product, addItem],
  );

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex flex-col rounded-2xl overflow-hidden bg-white
                   shadow-base hover:shadow-xl
                   transition-all duration-300 ease-out
                   hover:-translate-y-1"
      >
        {/* ===== Image Section ===== */}
        <div className="relative">
          <Link
            href={`/products/${product.slug}`}
            className="block"
            aria-label={`View ${product.name}`}
            onClick={handleProductClick}
          >
            <ProductImage
              images={imageUrls}
              slug={product.slug}
              productName={product.name}
              priority={index < 4}
              isHovered={isHovered}
            />
          </Link>

          {/* ===== Badges — Top-Left ===== */}
          <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
            <Badge variant="ded_licensed" size="sm">
              Original
            </Badge>
          </div>

          {/* ===== Badges — Top-Right ===== */}
          <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">
            <Badge variant="wasleen_choice" size="sm">
              ErgoAura&apos;s Choice
            </Badge>
            {hasDiscount && product.discount_percentage >= 40 && (
              <Badge variant="super_deal" size="sm">
                Super Deal
              </Badge>
            )}
          </div>

          {/* ===== Badges — Bottom-Left (Discount) ===== */}
          {hasDiscount && (
            <div className="absolute bottom-3 left-3 z-10">
              <Badge variant="discount" size="md">
                -{product.discount_percentage}%
              </Badge>
            </div>
          )}

          {/* ===== Desktop Quick View Overlay ===== */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setQuickViewOpen(true);
            }}
            className="absolute inset-x-0 bottom-0 z-20
                       hidden md:flex items-center justify-center gap-2
                       py-3 bg-[#1A1614]/80 backdrop-blur-sm text-white text-sm font-medium
                       translate-y-full group-hover:translate-y-0
                       opacity-0 group-hover:opacity-100
                       transition-all duration-300 ease-out cursor-pointer"
            aria-label={`Quick view ${product.name}`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Quick View
          </button>

          {/* ===== Out of Stock Overlay ===== */}
          {isOutOfStock && (
            <div className="absolute inset-0 bg-[#1A1614]/60 flex items-center justify-center z-10">
              <span className="bg-[#1A1614]/90 text-[#F5F1EB] text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full">
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* ===== Content Section ===== */}
        <div className="flex flex-col flex-1 p-4 gap-2.5">
          {/* Title */}
          <Link href={`/products/${product.slug}`} onClick={handleProductClick}>
            <h3
              className="font-sans text-lg font-semibold leading-snug line-clamp-2
                         text-[#1A1614] group-hover:text-[#C9A962]
                         transition-colors duration-200"
            >
              {product.name}
            </h3>
          </Link>

          {/* Star Rating */}
          <StarRating
            rating={getProductReviewSummary(product.slug)?.averageRating ?? 4.5}
            count={getProductReviewSummary(product.slug)?.totalReviews ?? 12}
            size="sm"
          />

          {/* Price */}
          <ProductPrice
            price={product.price}
            originalPrice={
              product.original_price > product.price
                ? product.original_price
                : undefined
            }
            size="sm"
          />

          {/* Feature Badges Strip */}
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {isB2G1Eligible(product) && (
              <Badge variant="b2g1" size="sm">
                Buy 2 Get 1 Free
              </Badge>
            )}
            {product.category === "kitchen" && (
              <Badge variant="installation_included" size="sm">
                Easy to use
              </Badge>
            )}
          </div>

          {/* ===== Cart & Buy Now Buttons ===== */}
          <div className="flex items-center gap-2 mt-1">
            <button
              onClick={handleAddToCart}
              className="btn-gradient-animated flex-1 !py-2 !px-3 !text-xs !rounded-full"
              aria-label={`Add ${product.name} to cart`}
            >
              Add to Cart
            </button>
            <Link
              href={`/products/${product.slug}`}
              className="flex-1 py-2 px-3 text-xs font-medium rounded-full text-center
                         border border-[#C9A962] text-[#C9A962]
                         hover:bg-[#C9A962] hover:text-[#1A1614]
                         transition-all duration-200"
            >
              Buy Now
            </Link>
          </div>

          {/* ===== Mobile Quick View Button ===== */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setQuickViewOpen(true);
            }}
            className="w-full py-2.5 rounded-full text-sm font-medium
                       border border-[#D8CFBF] text-[#86868B]
                       hover:border-[#C9A962] hover:text-[#C9A962]
                       transition-colors duration-200 md:hidden mt-1 cursor-pointer"
            aria-label={`Quick view ${product.name}`}
          >
            👁 Quick View
          </button>
        </div>
      </motion.article>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <QuickViewModal
          product={product}
          onClose={() => setQuickViewOpen(false)}
        />
      )}
    </>
  );
}
