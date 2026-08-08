"use client";

import { motion } from "framer-motion";
import { OPPO_K13_TURBO_5G_STORY, OPPO_K13_TURBO_5G_PRODUCT } from "@/lib/oppo-k13-turbo-5g-data";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function OppoK13Turbo5gStory() {
  return (
    <section className="oppok13turbo5g-section">
      <div className="oppok13turbo5g-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="oppok13turbo5g-section-label">The Story</span>
          <h2 className="oppok13turbo5g-section-title">{OPPO_K13_TURBO_5G_STORY.title}</h2>
          <p className="oppok13turbo5g-section-subtitle mx-auto mb-12">
            {OPPO_K13_TURBO_5G_STORY.subtitle}
          </p>
          <div className="max-w-4xl mx-auto text-left space-y-6">
            {OPPO_K13_TURBO_5G_STORY.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-[var(--oppok13turbo5g-text-tertiary)] leading-relaxed text-[0.95rem]"
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
            <span className="oppok13turbo5g-price-badge text-base px-5 py-2">
              From{" "}
              <span className="text-[var(--oppok13turbo5g-text-primary)] font-bold">
                {formatPrice(OPPO_K13_TURBO_5G_PRODUCT.price)}
              </span>
              <span className="oppok13turbo5g-price-original !ml-2">
                {formatPrice(OPPO_K13_TURBO_5G_PRODUCT.original_price)}
              </span>
              <span className="text-[var(--oppok13turbo5g-accent-light)] font-bold">
                Save{" "}
                {formatPrice(
                  OPPO_K13_TURBO_5G_PRODUCT.original_price - OPPO_K13_TURBO_5G_PRODUCT.price,
                )}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
