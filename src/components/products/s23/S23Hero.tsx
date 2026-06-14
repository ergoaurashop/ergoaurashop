"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { S23_HERO_IMAGES, S23_FOLDER } from "@/lib/s23-ultra-data";
import { formatPrice } from "@/lib/utils";

const SLIDE_INTERVAL = 5000;

function getImagePath(filename: string): string {
  return `/images/products/${S23_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

interface S23HeroProps {
  scrollToPricing: () => void;
}

export default function S23Hero({ scrollToPricing }: S23HeroProps) {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % S23_HERO_IMAGES.length);
    }, SLIDE_INTERVAL);
  }, []);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index);
      startInterval();
    },
    [startInterval],
  );

  return (
    <section className="s23-hero" id="s23-hero">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          className="s23-hero-slide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <Image
            src={getImagePath(S23_HERO_IMAGES[current])}
            alt={`Samsung Galaxy S23 Ultra - ${S23_HERO_IMAGES[current].replace(/\.(jpg|webp)$/, "").replace(/-/g, " ")}`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient overlay */}
      <div className="s23-hero-overlay" />

      {/* Content overlay */}
      <div className="s23-hero-content">
        <div className="s23-hero-badge">
          <span>🔥</span>
          <span>Limited Stock — Only 15 Units Left</span>
        </div>

        <h1 className="s23-hero-title">Samsung Galaxy S23 Ultra</h1>

        <p className="s23-hero-subtitle">
          200MP Camera • S Pen • Snapdragon 8 Gen 2 • 12GB RAM • 512GB Storage
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <span className="s23-price-original">{formatPrice(124999)}</span>
          <span className="s23-price-current">{formatPrice(14990)}</span>
          <span className="s23-price-badge">88% OFF</span>
        </div>

        <p className="s23-savings mb-6">You save ₹1,10,009!</p>

        <button onClick={scrollToPricing} className="s23-btn-primary text-lg">
          🛒 Buy The Mega Deal
          <span className="text-sm opacity-80">— ₹14,990</span>
        </button>
      </div>

      {/* Indicator dots */}
      <div className="s23-hero-dots">
        {S23_HERO_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`s23-hero-dot ${i === current ? "active" : ""}`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
