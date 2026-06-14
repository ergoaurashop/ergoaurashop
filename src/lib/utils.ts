import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { SLUG_TO_FOLDER, SLUG_TO_IMAGES } from "@/lib/products-data";

/**
 * Encode a file-system path safely, segment by segment.
 * Handles nested paths like "Part-2/Samsung Galaxy S23 Ultra..."
 * where each segment needs individual encodeURIComponent treatment.
 */
function encodePath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

/** Merge Tailwind classes with conflict resolution */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format price in INR */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

/** Generate a random 12-char alphanumeric Track ID */
export function generateTrackId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < 12; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/** Generate a readable Order ID */
export function generateOrderId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `ORD-${timestamp}${random}`;
}

/** Calculate original price from discounted price */
export function calculateOriginalPrice(
  price: number,
  discountPercentage: number,
): number {
  return Math.round(price / (1 - discountPercentage / 100));
}

/** Calculate order status based on days since placement */
export function getOrderStatusByDays(placedAt: string): {
  status: "placed" | "shipped" | "out_for_delivery" | "delivered";
  daysSince: number;
} {
  const placed = new Date(placedAt);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - placed.getTime());
  const daysSince = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (daysSince <= 3) return { status: "placed", daysSince };
  if (daysSince <= 20) return { status: "shipped", daysSince };
  if (daysSince <= 35) return { status: "out_for_delivery", daysSince };
  return { status: "delivered", daysSince };
}

/** Truncate text to a max length */
export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + "...";
}

/** Get the primary (first) product image URL */
export function getProductImageUrl(slug: string, image?: string): string {
  if (image) return image;
  const images = SLUG_TO_IMAGES[slug];
  if (images && images.length > 0) {
    const folder = SLUG_TO_FOLDER[slug] || slug;
    return `/images/products/${encodePath(folder)}/${encodeURIComponent(images[0])}`;
  }
  return `/images/products/${slug}/placeholder.jpg`;
}

/** Get all image URLs for a product */
export function getProductImages(slug: string): string[] {
  const images = SLUG_TO_IMAGES[slug];
  if (!images || images.length === 0) return [];
  const folder = SLUG_TO_FOLDER[slug] || slug;
  return images.map(
    (img) =>
      `/images/products/${encodePath(folder)}/${encodeURIComponent(img)}`,
  );
}
