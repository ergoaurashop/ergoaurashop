"use client";

import { motion } from "framer-motion";
import { VIVO_V70_ELITE_STORY, VIVO_V70_ELITE_PRODUCT } from "@/lib/vivo-v70-elite-data";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function VivoV70EliteStory() {
  return (
    <section className="vivov70elite-section">
      <div className="vivov70elite-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="vivov70elite-section-label">The Story</span>
          <h2 className="vivov70elite-section-title">{VIVO_V70_ELITE_STORY.title}</h2>
          <p className="vivov70elite-section-subtitle mx-auto mb-12">
            {VIVO_V70_ELITE_STORY.subtitle}
          </p>
          <div className="max-w-4xl mx-auto text-left space-y-6">
            {VIVO_V70_ELITE_STORY.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-[var(--vivov70elite-text-tertiary)] leading-relaxed text-[0.95rem]"
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
            <span className="vivov70elite-price-badge text-base px-5 py-2">
              From{" "}
              <span className="text-[var(--vivov70elite-text-primary)] font-bold">
                {formatPrice(VIVO_V70_ELITE_PRODUCT.price)}
              </span>
              <span className="vivov70elite-price-original !ml-2">
                {formatPrice(VIVO_V70_ELITE_PRODUCT.original_price)}
              </span>
              <span className="text-[var(--vivov70elite-accent-light)] font-bold">
                Save{" "}
                {formatPrice(
                  VIVO_V70_ELITE_PRODUCT.original_price - VIVO_V70_ELITE_PRODUCT.price,
                )}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
