"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export interface SocialProduct {
  id: string;
  handle: string;
  title: string;
  featuredImage: {
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
}

const LOCATIONS = [
  "Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", 
  "Fujairah", "Riyadh", "Jeddah", "Dammam", "Mecca", "Medina",
  "Khobar", "Muscat", "Salalah", "Kuwait City", "Doha", "Manama"
];

interface SocialProofProps {
  products: SocialProduct[];
}

export default function SocialProof({ products }: SocialProofProps) {
  const pathname = usePathname();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [displayLocation, setDisplayLocation] = useState("");

  // Stable random location — picked once per product, not on every render
  useEffect(() => {
    setDisplayLocation(LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)]);
  }, [currentIndex]);

  useEffect(() => {
    // Check session storage
    if (typeof window !== "undefined") {
      const dismissed = sessionStorage.getItem("ergo_social_proof_dismissed");
      if (dismissed === "true") {
        setIsDismissed(true);
      }
    }
  }, []);

  useEffect(() => {
    if (isDismissed || products.length === 0) return;
    if (pathname.startsWith("/checkout") || pathname === "/cart") {
      setIsVisible(false);
      return;
    }

    // Initial show after 8s
    const initialShowTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    // Rotation every 60s
    const rotationInterval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % products.length);
        setIsVisible(true);
      }, 1000); // 1s gap between rotation
    }, 60000);

    return () => {
      clearTimeout(initialShowTimeout);
      clearInterval(rotationInterval);
    };
  }, [isDismissed, pathname, products.length]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("ergo_social_proof_dismissed", "true");
    }
  };

  if (isDismissed || products.length === 0) return null;
  if (pathname.startsWith("/checkout") || pathname === "/cart") return null;

  const currentProduct = products[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 100 }}
          className="fixed z-50 bottom-24 left-4 md:bottom-8 md:left-8 w-[280px] bg-white rounded-xl shadow-2xl border border-ergo-border p-3 pointer-events-auto"
        >
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden bg-ergo-surface">
              {currentProduct.featuredImage?.url && (
                <Image
                  src={currentProduct.featuredImage.url}
                  alt={currentProduct.featuredImage.altText || currentProduct.title}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-grow min-w-0">
              <p className="text-[10px] text-ergo-muted uppercase tracking-wider font-semibold">
                Someone in {displayLocation || "your city"} just bought
              </p>
              <Link 
                href={`/products/${currentProduct.handle}`}
                className="block text-xs font-bold text-ergo-text truncate hover:text-ergo-navy transition-colors"
              >
                {currentProduct.title}
              </Link>
              <p className="text-xs font-black text-ergo-navy">
                {currentProduct.priceRange.minVariantPrice.currencyCode} {parseFloat(currentProduct.priceRange.minVariantPrice.amount).toFixed(2)}
              </p>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 text-ergo-muted hover:text-ergo-text transition-colors"
              aria-label="Dismiss"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
