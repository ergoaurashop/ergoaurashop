"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  POCO_X8_PRO_MAX_FOLDER,
  POCO_X8_PRO_MAX_PRODUCT,
  POCO_X8_PRO_MAX_HERO_IMAGES,
} from "@/lib/poco-x8-pro-max-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${POCO_X8_PRO_MAX_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function PocoX8ProMaxHero() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % POCO_X8_PRO_MAX_HERO_IMAGES.length);
  }, []);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  const handleBuyNow = () => {
    useCartStore.getState().addItem(POCO_X8_PRO_MAX_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <section className="pocox8promax-hero" id="pocox8promax-hero">
      {/* Image slideshow background */}
      <div
        className="pocox8promax-hero-slideshow"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="pocox8promax-hero-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          >
            <Image
              src={getImagePath(POCO_X8_PRO_MAX_HERO_IMAGES[currentIndex])}
              alt={`POCO X8 Pro Max — ${currentIndex === 0 ? "Hero" : "Design"}`}
              fill
              priority
              unoptimized
              sizes="100vw"
              className="pocox8promax-hero-slide-img"
            />
          </motion.div>
        </AnimatePresence>

        {/* Slide indicators */}
        <div className="pocox8promax-hero-indicators">
          {POCO_X8_PRO_MAX_HERO_IMAGES.map((_, i) => (
            <button
              key={i}
              className={`pocox8promax-hero-dot${i === currentIndex ? " active" : ""}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Gradient overlay */}
      <div className="pocox8promax-hero-overlay" />

      {/* Content overlay */}
      <div className="pocox8promax-hero-content">
        {/* Mega Deal Badge */}
        <motion.div
          className="pocox8promax-hero-badge"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* SVG fire/flame icon */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
          <span>
            Mega Deal &mdash; Hurry! Only{" "}
            <b className="pocox8promax-badge-stock">{POCO_X8_PRO_MAX_PRODUCT.stock}</b>{" "}
            Units Left
          </span>
          {/* Second flame */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
          </svg>
        </motion.div>

        <motion.h1
          className="pocox8promax-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          POCO X8 Pro Max
        </motion.h1>

        <motion.p
          className="pocox8promax-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          Dimensity 9500s &middot; 120Hz 1.5K AMOLED &middot; 9000mAh Battery
          &middot; 100W Charge &middot; 50MP Camera
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="pocox8promax-price-original">
            {formatPrice(POCO_X8_PRO_MAX_PRODUCT.original_price)}
          </span>
          <span className="pocox8promax-price-current">
            {formatPrice(POCO_X8_PRO_MAX_PRODUCT.price)}
          </span>
          <span className="pocox8promax-price-badge">
            {POCO_X8_PRO_MAX_PRODUCT.discount_percentage}% OFF
          </span>
        </motion.div>

        <motion.p
          className="pocox8promax-savings mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          You save ₹
          {(
            POCO_X8_PRO_MAX_PRODUCT.original_price - POCO_X8_PRO_MAX_PRODUCT.price
          ).toLocaleString("en-IN")}
          !
        </motion.p>

        <motion.button
          onClick={handleBuyNow}
          className="pocox8promax-btn-primary text-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Shopping bag SVG icon */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Buy The Mega Deal
          <span className="text-sm opacity-80">
            &mdash; {formatPrice(POCO_X8_PRO_MAX_PRODUCT.price)}
          </span>
        </motion.button>
      </div>

      {/* Digital Round Seal — Stock Clearance Sale */}
      <motion.div
        className="pocox8promax-seal"
        initial={{ opacity: 0, scale: 0.3 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 1.5,
          type: "spring",
          stiffness: 120,
        }}
      >
        <svg viewBox="0 0 100 100" fill="none">
          <defs>
            <radialGradient id="pocox8promax-seal-grad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </radialGradient>
          </defs>
          {/* Outer ring */}
          <circle
            cx="50"
            cy="50"
            r="47"
            stroke="#0066cc"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#003d99"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
          {/* Inner fill */}
          <circle cx="50" cy="50" r="38" fill="url(#pocox8promax-seal-grad)" />
          {/* Top stars */}
          <text
            x="50"
            y="24"
            textAnchor="middle"
            fontSize="7"
            fill="#0066cc"
            fontWeight="bold"
          >
            ✦ ✦ ✦
          </text>
          {/* Main text */}
          <text
            x="50"
            y="38"
            textAnchor="middle"
            fontSize="6.5"
            fontWeight="bold"
            fill="#0066cc"
            fontFamily="Arial,sans-serif"
          >
            STOCK
          </text>
          <text
            x="50"
            y="48"
            textAnchor="middle"
            fontSize="6.5"
            fontWeight="bold"
            fill="#0066cc"
            fontFamily="Arial,sans-serif"
          >
            CLEARANCE
          </text>
          <text
            x="50"
            y="58"
            textAnchor="middle"
            fontSize="6"
            fontWeight="bold"
            fill="#003d99"
            fontFamily="Arial,sans-serif"
          >
            SALE
          </text>
          {/* Divider line */}
          <line
            x1="30"
            y1="64"
            x2="70"
            y2="64"
            stroke="#0066cc"
            strokeWidth="0.5"
            opacity="0.6"
          />
          {/* Bottom text */}
          <text
            x="50"
            y="74"
            textAnchor="middle"
            fontSize="4"
            fill="#0066cc"
            opacity="0.85"
            fontFamily="Arial,sans-serif"
          >
            MEGA DEALS
          </text>
          {/* Bottom stars */}
          <text x="50" y="84" textAnchor="middle" fontSize="6" fill="#0066cc">
            ✦ ✦ ✦
          </text>
        </svg>
      </motion.div>
    </section>
  );
}
