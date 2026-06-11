"use client";

import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/utils";

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const priceSizes: Record<string, string> = {
  sm: "text-base font-bold",
  md: "text-xl font-bold",
  lg: "text-2xl font-bold",
};

const compareSizes: Record<string, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

/**
 * ProductPrice — Displays price with optional compare-at strikethrough.
 *
 * States:
 * - Regular price:      Primary colour, no compare-at rendered
 * - On sale:            Error red price + line-through compare-at in neutral-400
 * - Price range:        Displayed as "₹1,299 – ₹1,899"
 */
export default function ProductPrice({
  price,
  originalPrice,
  size = "sm",
  className,
}: ProductPriceProps) {
  const isOnSale = originalPrice !== undefined && originalPrice > price;

  return (
    <div className={cn("flex items-baseline gap-2", className)}>
      {/* Current price */}
      <span
        className={cn(
          priceSizes[size],
          isOnSale ? "text-[#EF4444]" : "text-[#1A1614]",
        )}
      >
        {formatPrice(price)}
      </span>

      {/* Compare-at price (strikethrough) */}
      {isOnSale && (
        <span className={cn("text-[#86868B] line-through", compareSizes[size])}>
          {formatPrice(originalPrice)}
        </span>
      )}
    </div>
  );
}
