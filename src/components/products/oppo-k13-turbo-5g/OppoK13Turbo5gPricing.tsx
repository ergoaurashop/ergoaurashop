"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  OPPO_K13_TURBO_5G_PRODUCT,
  OPPO_K13_TURBO_5G_COLOUR_OPTIONS,
} from "@/lib/oppo-k13-turbo-5g-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

interface OppoK13Turbo5gPricingProps {
  id?: string;
}

function TimerDigit({ value, label }: { value: number; label: string }) {
  const prevValue = useRef(value);
  const [ticking, setTicking] = useState(false);

  useEffect(() => {
    if (prevValue.current !== value) {
      setTicking(true);
      prevValue.current = value;
      const timer = setTimeout(() => setTicking(false), 150);
      return () => clearTimeout(timer);
    }
  }, [value]);

  return (
    <div className="oppok13turbo5g-timer-unit">
      <div
        className={`oppok13turbo5g-timer-digit${ticking ? " ticking" : ""}`}
        key={value}
      >
        {String(value).padStart(2, "0")}
      </div>
      <span className="oppok13turbo5g-timer-label">{label}</span>
    </div>
  );
}

export default function OppoK13Turbo5gPricing({ id }: OppoK13Turbo5gPricingProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 59,
    seconds: 59,
  });
  const [selectedColour, setSelectedColour] = useState<number | null>(null);

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
    useCartStore.getState().addItem(OPPO_K13_TURBO_5G_PRODUCT, 1);
    router.push("/checkout");
  };

  const savings = OPPO_K13_TURBO_5G_PRODUCT.original_price - OPPO_K13_TURBO_5G_PRODUCT.price;

  // Split title into words for individual animation
  const titleWords = "Grab Yours Before It's Gone".split(" ");

  return (
    <section className="oppok13turbo5g-pricing-section" id={id}>
      {/* Sparkle particles */}
      <div className="oppok13turbo5g-pricing-sparkles">
        <div className="oppok13turbo5g-sparkle" />
        <div className="oppok13turbo5g-sparkle" />
        <div className="oppok13turbo5g-sparkle" />
        <div className="oppok13turbo5g-sparkle" />
        <div className="oppok13turbo5g-sparkle" />
        <div className="oppok13turbo5g-sparkle" />
        <div className="oppok13turbo5g-sparkle" />
        <div className="oppok13turbo5g-sparkle" />
      </div>

      <div
        className="oppok13turbo5g-section-container"
        style={{ position: "relative", zIndex: 1 }}
      >
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Animated label */}
          <span className="oppok13turbo5g-pricing-label">Limited Time Offer</span>

          {/* Title with word-by-word highlight effects */}
          <h2 className="oppok13turbo5g-pricing-title">
            {titleWords.map((word, i) => (
              <motion.span
                key={i}
                className={
                  word === "Yours" || word === "Gone" ? "highlight" : ""
                }
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.5 }}
              >
                {word}{" "}
              </motion.span>
            ))}
          </h2>

          <p className="oppok13turbo5g-section-subtitle mx-auto mb-8">
            Only {OPPO_K13_TURBO_5G_PRODUCT.stock} units remaining at this price. Once
            they're sold, this deal is gone forever.
          </p>

          {/* Price display with glow and ring effects */}
          <div className="oppok13turbo5g-pricing-prices">
            <span className="oppok13turbo5g-price-original">
              {formatPrice(OPPO_K13_TURBO_5G_PRODUCT.original_price)}
            </span>

            <span className="oppok13turbo5g-price-current-glow">
              <span className="oppok13turbo5g-price-current">
                {formatPrice(OPPO_K13_TURBO_5G_PRODUCT.price)}
              </span>
              <div className="oppok13turbo5g-price-glow-ring" />
            </span>

            <span className="oppok13turbo5g-price-badge-ring">
              <span className="oppok13turbo5g-price-badge">
                {OPPO_K13_TURBO_5G_PRODUCT.discount_percentage}% OFF
              </span>
              <div className="ring-animation" />
            </span>
          </div>

          {/* Savings */}
          <p className="oppok13turbo5g-pricing-savings mb-8">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
              <polyline points="17 6 23 6 23 12" />
            </svg>
            You save {formatPrice(savings)}!
          </p>

          {/* Colour selector */}
          {OPPO_K13_TURBO_5G_COLOUR_OPTIONS.length > 0 && (
            <div className="oppok13turbo5g-colour-selector mb-8">
              <p className="oppok13turbo5g-colour-label">Choose your colour:</p>
              <div className="oppok13turbo5g-colour-options">
                {OPPO_K13_TURBO_5G_COLOUR_OPTIONS.map((colour, i) => (
                  <button
                    key={colour.name}
                    onClick={() =>
                      setSelectedColour(selectedColour === i ? null : i)
                    }
                    className={`oppok13turbo5g-colour-swatch ${
                      selectedColour === i ? "active" : ""
                    }`}
                    aria-label={`Select ${colour.name}`}
                    title={colour.name}
                  >
                    <span
                      className="oppok13turbo5g-colour-circle"
                      style={{ backgroundColor: colour.hex }}
                    />
                    <span className="oppok13turbo5g-colour-name">{colour.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced flip-card countdown timer */}
          <div className="oppok13turbo5g-pricing-timer">
            <div className="oppok13turbo5g-pricing-timer-header">
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
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              <span>Offer ends in:</span>
            </div>
            <div className="oppok13turbo5g-timer-units">
              <TimerDigit value={timeLeft.hours} label="Hours" />
              <span className="oppok13turbo5g-timer-separator">:</span>
              <TimerDigit value={timeLeft.minutes} label="Mins" />
              <span className="oppok13turbo5g-timer-separator">:</span>
              <TimerDigit value={timeLeft.seconds} label="Secs" />
            </div>
          </div>

          {/* Animated gradient CTA button */}
          <motion.button
            onClick={handleBuyNow}
            className="oppok13turbo5g-pricing-cta"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
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
            Buy Now &mdash; {formatPrice(OPPO_K13_TURBO_5G_PRODUCT.price)}
          </motion.button>

          {/* Stock indicator */}
          <div className="oppok13turbo5g-pricing-stock">
            <div className="stock-header">
              <span className="stock-count">
                Only{" "}
                <span className="count-number">{OPPO_K13_TURBO_5G_PRODUCT.stock}</span>{" "}
                left in stock
              </span>
              <span className="stock-status">
                Selling fast<span className="dots">...</span>
              </span>
            </div>
            <div className="oppok13turbo5g-stock-bar">
              <div className="oppok13turbo5g-stock-fill" style={{ width: "30%" }} />
            </div>
          </div>

          {/* Trust badges */}
          <div className="oppok13turbo5g-pricing-trust">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <svg
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
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <svg
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
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <svg
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
            </motion.span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
