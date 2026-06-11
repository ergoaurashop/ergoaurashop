"use client";

/**
 * ProductCardSkeleton — Shimmer loading placeholder matching the ProductCard layout.
 *
 * Structure:
 * ┌──────────────────────────────────┐
 * │  ┌──────────────────────────┐    │
 * │  │   Shimmer rect (4:3)     │    │
 * │  └──────────────────────────┘    │
 * │  ┌──────────────────────────┐    │
 * │  │  Shimmer line (75% w)    │    │
 * │  │  Shimmer line (50% w)    │    │
 * │  │  Shimmer line (33% w)    │    │
 * │  │  ┌──────┐ ┌─────────┐   │    │
 * │  │  │pill  │ │pill     │   │    │
 * │  │  └──────┘ └─────────┘   │    │
 * │  └──────────────────────────┘    │
 * └──────────────────────────────────┘
 */
export default function ProductCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-white shadow-base">
      {/* Image skeleton */}
      <div className="relative aspect-[4/3] overflow-hidden shimmer" />

      {/* Content skeleton */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title line */}
        <div className="h-5 shimmer rounded w-3/4" />
        {/* Second title line */}
        <div className="h-5 shimmer rounded w-1/2" />

        {/* Rating line */}
        <div className="h-3 shimmer rounded w-1/4" />

        {/* Price line */}
        <div className="flex items-center gap-2">
          <div className="h-6 shimmer rounded w-1/3" />
          <div className="h-4 shimmer rounded w-1/5" />
        </div>

        {/* Pill badges */}
        <div className="flex gap-2 mt-1">
          <div className="h-6 w-16 shimmer rounded-full" />
          <div className="h-6 w-14 shimmer rounded-full" />
        </div>

        {/* Mobile quick view button */}
        <div className="h-10 shimmer rounded-full w-full mt-1 md:hidden" />
      </div>
    </div>
  );
}
