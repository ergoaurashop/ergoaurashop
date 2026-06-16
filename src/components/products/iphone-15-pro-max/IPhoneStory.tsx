"use client";

import { motion } from "framer-motion";
import { IPHONE_STORY, IPHONE_PRODUCT } from "@/lib/iphone-15-pro-max-data";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function IPhoneStory() {
  return (
    <section className="iphone-section">
      <div className="iphone-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="iphone-section-label">The Story</span>
          <h2 className="iphone-section-title">{IPHONE_STORY.title}</h2>
          <p className="iphone-section-subtitle mx-auto mb-12">
            {IPHONE_STORY.subtitle}
          </p>
          <div className="max-w-4xl mx-auto text-left space-y-6">
            {IPHONE_STORY.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-[var(--iphone-text-tertiary)] leading-relaxed text-[0.95rem]"
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
            <span className="iphone-price-badge text-base px-5 py-2">
              From{" "}
              <span className="text-[var(--iphone-text-primary)] font-bold">
                {formatPrice(IPHONE_PRODUCT.price)}
              </span>
              <span className="iphone-price-original !ml-2">
                {formatPrice(IPHONE_PRODUCT.original_price)}
              </span>
              <span className="text-[var(--iphone-accent-light)] font-bold">
                Save{" "}
                {formatPrice(
                  IPHONE_PRODUCT.original_price - IPHONE_PRODUCT.price,
                )}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
