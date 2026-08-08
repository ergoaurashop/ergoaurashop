"use client";

import { motion } from "framer-motion";
import { LAVA_AGNI_4_STORY, LAVA_AGNI_4_PRODUCT } from "@/lib/lava-agni-4-data";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function LavaAgni4Story() {
  return (
    <section className="lavaagni4-section">
      <div className="lavaagni4-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="lavaagni4-section-label">The Story</span>
          <h2 className="lavaagni4-section-title">{LAVA_AGNI_4_STORY.title}</h2>
          <p className="lavaagni4-section-subtitle mx-auto mb-12">
            {LAVA_AGNI_4_STORY.subtitle}
          </p>
          <div className="max-w-4xl mx-auto text-left space-y-6">
            {LAVA_AGNI_4_STORY.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-[var(--lavaagni4-text-tertiary)] leading-relaxed text-[0.95rem]"
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
            <span className="lavaagni4-price-badge text-base px-5 py-2">
              From{" "}
              <span className="text-[var(--lavaagni4-text-primary)] font-bold">
                {formatPrice(LAVA_AGNI_4_PRODUCT.price)}
              </span>
              <span className="lavaagni4-price-original !ml-2">
                {formatPrice(LAVA_AGNI_4_PRODUCT.original_price)}
              </span>
              <span className="text-[var(--lavaagni4-accent-light)] font-bold">
                Save{" "}
                {formatPrice(
                  LAVA_AGNI_4_PRODUCT.original_price - LAVA_AGNI_4_PRODUCT.price,
                )}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
