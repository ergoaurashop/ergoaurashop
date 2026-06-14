"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { S23_PRODUCT } from "@/lib/s23-ultra-data";
import { formatPrice } from "@/lib/utils";

interface S23PricingProps {
  id?: string;
}

export default function S23Pricing({ id }: S23PricingProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleBuyNow = () => {
    router.push("/checkout");
  };

  const savings = S23_PRODUCT.original_price - S23_PRODUCT.price;

  return (
    <section className="s23-section s23-section-dark" id={id}>
      <div className="s23-section-container">
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="s23-section-label">Limited Time Offer</span>
          <h2 className="s23-section-title">Grab Yours Before It's Gone</h2>
          <p className="s23-section-subtitle mx-auto mb-8">
            Only {S23_PRODUCT.stock} units remaining at this price. Once they're
            sold, this deal is gone forever.
          </p>

          {/* Price display */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <span className="s23-price-original">
              {formatPrice(S23_PRODUCT.original_price)}
            </span>
            <span className="s23-price-current">
              {formatPrice(S23_PRODUCT.price)}
            </span>
            <span className="s23-price-badge">
              {S23_PRODUCT.discount_percentage}% OFF
            </span>
          </div>

          <p className="s23-savings mb-8">You save {formatPrice(savings)}!</p>

          {/* Countdown timer */}
          <div className="s23-urgency-timer justify-center mb-8">
            {/* Clock SVG icon */}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Offer ends in:</span>
            <span className="s23-urgency-numbers">
              {String(timeLeft.hours).padStart(2, "0")}:
              {String(timeLeft.minutes).padStart(2, "0")}:
              {String(timeLeft.seconds).padStart(2, "0")}
            </span>
          </div>

          {/* Buy button — direct checkout */}
          <motion.button
            onClick={handleBuyNow}
            className="s23-btn-primary text-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Shopping cart SVG */}
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
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            Buy Now &mdash; {formatPrice(S23_PRODUCT.price)}
          </motion.button>

          {/* Stock indicator */}
          <div className="mt-8 max-w-md mx-auto">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-[var(--s23-text-secondary)]">
                Only {S23_PRODUCT.stock} left in stock
              </span>
              <span className="text-[var(--s23-text-tertiary)]">
                Selling fast
              </span>
            </div>
            <div className="s23-stock-bar">
              <div className="s23-stock-fill" style={{ width: "15%" }} />
            </div>
          </div>

          {/* EMI / Payment info */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-[var(--s23-text-tertiary)]">
            {/* Shield SVG */}
            <span className="inline-flex items-center gap-1.5">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              Secure Checkout
            </span>
            <span className="inline-flex items-center gap-1.5">
              {/* Credit card SVG */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="4" width="22" height="16" rx="2" />
                <line x1="1" y1="10" x2="23" y2="10" />
              </svg>
              EMI Available
            </span>
            <span className="inline-flex items-center gap-1.5">
              {/* Truck SVG */}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="1" y="3" width="15" height="13" />
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                <circle cx="5.5" cy="18.5" r="2.5" />
                <circle cx="18.5" cy="18.5" r="2.5" />
              </svg>
              Fast Delivery
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
