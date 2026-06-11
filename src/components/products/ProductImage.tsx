"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface ProductImageProps {
  images: string[];
  slug: string;
  productName: string;
  priority?: boolean;
  /** Manual hover state override (controlled by parent card) */
  isHovered?: boolean;
}

/**
 * ProductImage — Handles image stacking, hover crossfade, mobile auto-rotation,
 * dot indicators, and placeholder fallback.
 *
 * - Desktop: Hover over the card → crossfades from image 1 → image 2 (500ms)
 * - Mobile:  Auto-rotates through all images every 3 seconds
 * - Up to 5 images stacked with CSS opacity transitions
 */
export default function ProductImage({
  images,
  slug,
  productName,
  priority = false,
  isHovered = false,
}: ProductImageProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const hoverIndexRef = useRef(0);

  // Detect mobile on mount + resize
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Mobile auto-rotation
  useEffect(() => {
    if (!isMobile || images.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.min(images.length, 5));
    }, 3000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isMobile, images.length]);

  // Desktop hover crossfade
  useEffect(() => {
    if (isMobile) return;

    if (isHovered && images.length > 1) {
      // Show second image on hover
      hoverIndexRef.current = 1;
      setActiveIndex(1);
    } else {
      // Reset to first image
      hoverIndexRef.current = 0;
      setActiveIndex(0);
    }
  }, [isHovered, isMobile, images.length]);

  const maxImages = Math.min(images.length, 5);
  const hasImages = images.length > 0;

  // Build sizes attribute for responsive images
  const sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw";

  if (!hasImages) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-[#EAE3D5] flex items-center justify-center">
        <svg
          width="48"
          height="48"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#D8CFBF"
          strokeWidth="1.5"
          className="opacity-60"
        >
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <path d="M21 15l-5-5L5 21" />
        </svg>
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-[#F5F1EB]">
      {/* Stacked images */}
      {Array.from({ length: maxImages }).map((_, i) => (
        <img
          key={i}
          src={images[i]}
          alt={`${productName} - Image ${i + 1}`}
          loading={priority && i === 0 ? "eager" : "lazy"}
          className={cn(
            "absolute inset-0 w-full h-full object-cover",
            "transition-opacity duration-500 ease-in-out",
            i === activeIndex ? "opacity-100" : "opacity-0",
          )}
          sizes={sizes}
        />
      ))}

      {/* Mobile dot indicators */}
      {maxImages > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 md:hidden">
          {Array.from({ length: maxImages }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "w-1.5 h-1.5 rounded-full transition-all duration-300",
                i === activeIndex ? "bg-white w-3" : "bg-white/40",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
