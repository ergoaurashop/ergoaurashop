"use client";

import { motion } from "framer-motion";
import { APPLE_IPHONE_AIR_STORY, APPLE_IPHONE_AIR_PRODUCT } from "@/lib/apple-iphone-air-data";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function AppleIphoneAirStory() {
  return (
    <section className="appleiphoneair-section">
      <div className="appleiphoneair-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="appleiphoneair-section-label">The Story</span>
          <h2 className="appleiphoneair-section-title">{APPLE_IPHONE_AIR_STORY.title}</h2>
          <p className="appleiphoneair-section-subtitle mx-auto mb-12">
            {APPLE_IPHONE_AIR_STORY.subtitle}
          </p>
          <div className="max-w-4xl mx-auto text-left space-y-6">
            {APPLE_IPHONE_AIR_STORY.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-[var(--appleiphoneair-text-tertiary)] leading-relaxed text-[0.95rem]"
              >
                {para}
              </motion.p>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-8 inline-block"
          >
            <span className="appleiphoneair-price-badge text-base px-5 py-2">
              From{" "}
              <span className="text-[var(--appleiphoneair-text-primary)] font-bold">
                {formatPrice(APPLE_IPHONE_AIR_PRODUCT.price)}
              </span>
              <span className="appleiphoneair-price-original !ml-2">
                {formatPrice(APPLE_IPHONE_AIR_PRODUCT.original_price)}
              </span>
              <span className="text-[var(--appleiphoneair-accent-light)] font-bold">
                Save{" "}
                {formatPrice(
                  APPLE_IPHONE_AIR_PRODUCT.original_price - APPLE_IPHONE_AIR_PRODUCT.price,
                )}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
