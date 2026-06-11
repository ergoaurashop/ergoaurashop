"use client";

import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // 0-5 (supports half stars)
  count: number; // Number of reviews
  size?: "sm" | "md";
  showCount?: boolean;
  className?: string;
}

/**
 * StarRating — Judge.me-style star rating display.
 *
 * - Filled stars in gold, empty stars in neutral-200
 * - Shows "(count)" text beside stars
 * - Only renders when `count > 0`
 * - Supports half-star ratings
 */
export default function StarRating({
  rating,
  count,
  size = "sm",
  showCount = true,
  className,
}: StarRatingProps) {
  if (count <= 0) return null;

  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const textSize = size === "sm" ? "text-xs" : "text-sm";

  const stars = Array.from({ length: 5 }).map((_, i) => {
    const fillLevel = Math.min(Math.max(rating - i, 0), 1);
    return { index: i, fillLevel };
  });

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5">
        {stars.map(({ index, fillLevel }) => (
          <svg
            key={index}
            className={cn(starSize, "shrink-0")}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background (empty) star */}
            <path
              d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z"
              fill="#E4E4E7"
            />
            {/* Filled portion using clip mask */}
            {fillLevel > 0 && (
              <path
                d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z"
                fill="#C9A962"
                clipPath={
                  fillLevel < 1
                    ? `inset(0 ${100 - fillLevel * 100}% 0 0)`
                    : undefined
                }
              />
            )}
            {/* For half-stars, use a clipping approach */}
            {fillLevel > 0 && fillLevel < 1 && (
              <clipPath id={`half-clip-${index}`}>
                <rect x="0" y="0" width={`${fillLevel * 100}%`} height="100%" />
              </clipPath>
            )}
          </svg>
        ))}
      </div>
      {showCount && (
        <span className={cn(textSize, "text-[#86868B]")}>({count})</span>
      )}
    </div>
  );
}
