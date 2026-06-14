"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatPrice } from "@/lib/utils";

interface S23PricingProps {
  id?: string;
}

export default function S23Pricing({ id }: S23PricingProps) {
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
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNum = (n: number) => String(n).padStart(2, "0");

  return (
    <section className="s23-section s23-section-dark" id={id}>
      <div className="s23-section-container">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="s23-section-label">Ultra Mega Deal</span>
          <h2 className="s23-section-title">
            Own the Flagship at{" "}
            <span style={{ color: "var(--s23-accent-text)" }}>88% Off</span>
          </h2>
          <p className="s23-section-subtitle mx-auto mb-8">
            This is not a refurbished unit. This is a brand new, factory-sealed
            Samsung Galaxy S23 Ultra at a clearance price that won't last.
          </p>

          {/* Pricing block */}
          <div className="bg-[var(--s23-bg-card)] border border-[var(--s23-border)] rounded-[var(--s23-radius-xl)] p-8 md:p-10 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-4">
              <span className="s23-price-original">{formatPrice(124999)}</span>
              <span className="s23-price-current">{formatPrice(14990)}</span>
              <span className="s23-price-badge text-base px-4 py-1.5">
                88% OFF
              </span>
            </div>

            <p className="s23-savings text-lg mb-6">
              You save ₹1,10,009 — that's like getting 11 free phones!
            </p>

            {/* Urgency timer */}
            <div className="s23-urgency-timer justify-center mb-6 text-base">
              <span>⏰ Deal ends in</span>
              <span className="s23-urgency-numbers">
                {formatNum(timeLeft.hours)}:{formatNum(timeLeft.minutes)}:
                {formatNum(timeLeft.seconds)}
              </span>
            </div>

            {/* Stock indicator */}
            <div className="max-w-xs mx-auto mb-6">
              <div className="flex justify-between text-sm mb-1">
                <span style={{ color: "var(--s23-text-secondary)" }}>
                  Only 15 units left
                </span>
                <span
                  style={{ color: "var(--s23-accent-text)", fontWeight: 700 }}
                >
                  Selling fast
                </span>
              </div>
              <div className="s23-stock-bar">
                <div className="s23-stock-fill" style={{ width: "15%" }} />
              </div>
            </div>

            <button className="s23-btn-primary text-xl py-4 px-10 w-full sm:w-auto">
              🛒 Buy The Mega Deal — {formatPrice(14990)}
            </button>

            <p
              className="text-sm mt-4"
              style={{ color: "var(--s23-text-tertiary)" }}
            >
              ✓ Secure checkout via Razorpay • ✓ 7-day replacement guarantee • ✓
              EMI from ₹1,250/mo
            </p>
          </div>

          {/* Price comparison */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {[
              {
                label: "Original MRP",
                value: formatPrice(124999),
                color: "var(--s23-text-tertiary)",
                cross: true,
              },
              {
                label: "Your Mega Deal Price",
                value: formatPrice(14990),
                color: "var(--s23-accent-text)",
                cross: false,
              },
              {
                label: "You Save",
                value: `₹1,10,009`,
                color: "#22c55e",
                cross: false,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[var(--s23-bg-card)] border border-[var(--s23-border)] rounded-[var(--s23-radius)] p-4"
              >
                <p
                  className="text-xs mb-1"
                  style={{ color: "var(--s23-text-tertiary)" }}
                >
                  {item.label}
                </p>
                <p
                  className="text-xl font-bold"
                  style={{
                    color: item.color,
                    textDecoration: item.cross ? "line-through" : "none",
                  }}
                >
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
