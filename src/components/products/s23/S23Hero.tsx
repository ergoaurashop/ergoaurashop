"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { S23_FOLDER, S23_PRODUCT } from "@/lib/s23-ultra-data";
import { formatPrice } from "@/lib/utils";

function getImagePath(filename: string): string {
  return `/images/products/${S23_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function S23Hero() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  const handleBuyNow = () => {
    router.push("/checkout");
  };

  return (
    <section className="s23-hero" id="s23-hero">
      {/* Video background */}
      {!videoError ? (
        <div className="s23-hero-video">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onError={() => setVideoError(true)}
            className="w-full h-full object-cover"
          >
            <source
              src={`/images/products/${S23_FOLDER.split("/").map(encodeURIComponent).join("/")}/WhatsApp%20Video%202026-06-14%20at%201.59.31%20PM.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        /* Fallback image if video fails */
        <Image
          src={getImagePath("galaxy-s23-ultra-highlights-kv-1.jpg")}
          alt="Samsung Galaxy S23 Ultra"
          fill
          priority
          sizes="100vw"
          className="s23-hero-fallback"
        />
      )}

      {/* Gradient overlay */}
      <div className="s23-hero-overlay" />

      {/* Content overlay */}
      <div className="s23-hero-content">
        {/* Mega Deal Badge (SVG, no emoji) */}
        <motion.div
          className="s23-hero-badge"
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
          <span>Mega Deal — Hurry! Only {S23_PRODUCT.stock} Units Left</span>
        </motion.div>

        <motion.h1
          className="s23-hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Samsung Galaxy S23 Ultra
        </motion.h1>

        <motion.p
          className="s23-hero-subtitle"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          200MP Camera &middot; S Pen &middot; Snapdragon 8 Gen 2 &middot; 12GB
          RAM &middot; 512GB Storage
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <span className="s23-price-original">
            {formatPrice(S23_PRODUCT.original_price)}
          </span>
          <span className="s23-price-current">
            {formatPrice(S23_PRODUCT.price)}
          </span>
          <span className="s23-price-badge">
            {S23_PRODUCT.discount_percentage}% OFF
          </span>
        </motion.div>

        <motion.p
          className="s23-savings mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.0 }}
        >
          You save ₹
          {(S23_PRODUCT.original_price - S23_PRODUCT.price).toLocaleString(
            "en-IN",
          )}
          !
        </motion.p>

        <motion.button
          onClick={handleBuyNow}
          className="s23-btn-primary text-lg"
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
            &mdash; {formatPrice(S23_PRODUCT.price)}
          </span>
        </motion.button>
      </div>
    </section>
  );
}
