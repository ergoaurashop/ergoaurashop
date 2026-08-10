"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  S24_FOLDER,
  S24_HERO_IMAGES,
  S24_PRODUCT,
} from "@/lib/s24-ultra-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${S24_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function S24Hero() {
  const router = useRouter();

  const handleBuyNow = () => {
    useCartStore.getState().addItem(S24_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <section className="s24-hero" id="s24-hero">
      {/* Hero background image (primary hero visual from data file) */}
      <Image
        src={getImagePath(S24_HERO_IMAGES[0])}
        alt="Samsung Galaxy S24 Ultra"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="s24-hero-fallback"
      />

      {/* Gradient overlay */}
      <div className="s24-hero-overlay" />

      {/* Content overlay */}
      <div className="s24-hero-content">
        {/* Mega Deal Badge (SVG, no emoji) */}
        <motion.div
          className="s24-hero-badge"
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
            Mega Deal — Hurry! Only{" "}
            <b className="s24-badge-stock">{S24_PRODUCT.stock}</b> Units Left
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
          className="s24-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Samsung Galaxy S24 Ultra
        </motion.h1>

        <motion.p
          className="s24-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          200MP Camera &middot; S Pen &middot; Snapdragon 8 Gen 3 &middot; 12GB
          RAM &middot; 512GB Storage
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="s24-price-original">
            {formatPrice(S24_PRODUCT.original_price)}
          </span>
          <span className="s24-price-current">
            {formatPrice(S24_PRODUCT.price)}
          </span>
          <span className="s24-price-badge">
            {S24_PRODUCT.discount_percentage}% OFF
          </span>
        </motion.div>

        <motion.p
          className="s24-savings mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          You save ₹
          {(S24_PRODUCT.original_price - S24_PRODUCT.price).toLocaleString(
            "en-IN",
          )}
          !
        </motion.p>

        <motion.button
          onClick={handleBuyNow}
          className="s24-btn-primary text-lg"
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
            &mdash; {formatPrice(S24_PRODUCT.price)}
          </span>
        </motion.button>
      </div>

      {/* Digital Round Seal — Stock Clearance Sale */}
      <motion.div
        className="s24-seal"
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
            <radialGradient id="s24-seal-grad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1a1a2e" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </radialGradient>
          </defs>
          {/* Outer ring */}
          <circle
            cx="50"
            cy="50"
            r="47"
            stroke="#ffd700"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            stroke="#ff8c00"
            strokeWidth="1.5"
            fill="none"
            opacity="0.5"
          />
          {/* Inner fill */}
          <circle cx="50" cy="50" r="38" fill="url(#s24-seal-grad)" />
          {/* Top stars */}
          <text
            x="50"
            y="24"
            textAnchor="middle"
            fontSize="7"
            fill="#ffd700"
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
            fill="#ffd700"
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
            fill="#ffd700"
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
            fill="#ff8c00"
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
            stroke="#ffd700"
            strokeWidth="0.5"
            opacity="0.6"
          />
          {/* Bottom text */}
          <text
            x="50"
            y="74"
            textAnchor="middle"
            fontSize="4"
            fill="#ffd700"
            opacity="0.85"
            fontFamily="Arial,sans-serif"
          >
            MEGA DEALS
          </text>
          {/* Bottom stars */}
          <text x="50" y="84" textAnchor="middle" fontSize="6" fill="#ffd700">
            ✦ ✦ ✦
          </text>
        </svg>
      </motion.div>
    </section>
  );
}
