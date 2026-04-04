import type { Money } from "@/lib/shopify/types";

/**
 * Formats a Money object into a localised currency string.
 * Enforces AED (UAE Dirham) display based on prompt requirements.
 */
export function formatPrice(money: Money | string | number): string {
  let amount = 0;
  let currencyCode = "AED";

  if (typeof money === "object" && money !== null && "amount" in money) {
    amount = parseFloat(money.amount);
    if ("currencyCode" in money) {
      currencyCode = money.currencyCode as string;
    }
  } else if (typeof money === "string") {
    amount = parseFloat(money);
  } else if (typeof money === "number") {
    amount = money;
  }

  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

/**
 * Calculates the discount percentage between original and sale price.
 */
export function getDiscountPercent(
  compareAtPrice: Money | null,
  price: Money
): number | null {
  if (!compareAtPrice) return null;
  const original = parseFloat(compareAtPrice.amount);
  const sale = parseFloat(price.amount);
  if (original <= 0 || sale >= original) return null;
  return Math.round(((original - sale) / original) * 100);
}
