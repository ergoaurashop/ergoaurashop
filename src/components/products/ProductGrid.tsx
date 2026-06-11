"use client";

import { useState, useEffect } from "react";
import type { Product } from "@/lib/types";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  emptyMessage?: string;
  /** Enable load more pagination */
  hasMore?: boolean;
  /** Called when "Load More" is clicked */
  onLoadMore?: () => void;
  /** Whether a load more operation is in progress */
  isLoadingMore?: boolean;
  /** Called to clear all active filters (empty state CTA) */
  onClearFilters?: () => void;
  /** Items per page for "Showing X products" text */
  pageSize?: number;
}

/**
 * ProductGrid â€” Responsive product grid with:
 * - 1â†’2â†’3â†’4 column responsive grid
 * - Shimmer skeleton cards during filter loading
 * - Opacity transition during loading
 * - Empty state with Package icon + "Clear all filters" CTA
 * - Load More pagination with spinner
 * - "You&apos;ve seen all products" end-of-results message
 * - Accessibility attributes (aria-busy, aria-live)
 */
export default function ProductGrid({
  products,
  loading = false,
  emptyMessage = "No products match your current filters.",
  hasMore = false,
  onLoadMore,
  isLoadingMore = false,
  onClearFilters,
  pageSize = 12,
}: ProductGridProps) {
  // ===== Loading State (Filter Transition) =====
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        aria-busy="true"
        aria-live="polite"
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <ProductCardSkeleton key={`sk-${i}`} />
        ))}
      </div>
    );
  }

  // ===== Empty State =====
  if (products.length === 0) {
    return (
      <div
        className="col-span-full flex flex-col items-center justify-center py-24 text-center gap-5"
        aria-live="polite"
      >
        {/* Package icon */}
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D4D4D8"
          strokeWidth="1.5"
        >
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 002 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
          <line x1="12" y1="22.08" x2="12" y2="12" />
        </svg>

        <div>
          <h4 className="type-h4 text-[#1A1614]">No products found</h4>
          <p className="text-sm text-[#86868B] mt-1">{emptyMessage}</p>
        </div>

        {onClearFilters && (
          <button onClick={onClearFilters} className="btn-secondary btn-sm">
            Clear all filters
          </button>
        )}
      </div>
    );
  }

  // ===== Product Grid =====
  return (
    <div aria-live="polite">
      <div
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5",
          "transition-opacity duration-300",
          isLoadingMore && "opacity-60 pointer-events-none",
        )}
        aria-busy={isLoadingMore}
      >
        {products.map((product, index) => (
          <ProductCard key={product.id} product={product} index={index} />
        ))}
      </div>

      {/* ===== Load More Pagination ===== */}
      <div className="flex flex-col items-center gap-3 mt-10 mb-4">
        {/* Showing count */}
        <p className="text-sm text-[#86868B]">
          Showing {products.length} products
        </p>

        {/* Load More button */}
        {hasMore && (
          <button
            onClick={onLoadMore}
            disabled={isLoadingMore}
            className="btn-secondary min-w-[180px]"
          >
            {isLoadingMore ? (
              <>
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Loading&hellip;
              </>
            ) : (
              "Load More"
            )}
          </button>
        )}

        {/* End of results */}
        {!hasMore && products.length > pageSize && (
          <p className="text-xs text-[#A1A1AA]">
            You&apos;ve seen all products
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Conditional class name helper (inline to avoid circular dep with lib/utils).
 * Merges multiple class names, filtering out falsy values.
 */
function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
