"use client";

import { motion } from "framer-motion";
import { NORD_6_STORY, NORD_6_PRODUCT } from "@/lib/oneplus-nord-6-data";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Nord6Story() {
  return (
    <section className="nord6-section">
      <div className="nord6-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="nord6-section-label">The Story</span>
          <h2 className="nord6-section-title">{NORD_6_STORY.title}</h2>
          <p className="nord6-section-subtitle mx-auto mb-12">
            {NORD_6_STORY.subtitle}
          </p>
          <div className="max-w-4xl mx-auto text-left space-y-6">
            {NORD_6_STORY.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-[var(--nord6-text-tertiary)] leading-relaxed text-[0.95rem]"
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
            <span className="nord6-price-badge text-base px-5 py-2">
              From{" "}
              <span className="text-[var(--nord6-text-primary)] font-bold">
                {formatPrice(NORD_6_PRODUCT.price)}
              </span>
              <span className="nord6-price-original !ml-2">
                {formatPrice(NORD_6_PRODUCT.original_price)}
              </span>
              <span className="text-[var(--nord6-accent-light)] font-bold">
                Save{" "}
                {formatPrice(
                  NORD_6_PRODUCT.original_price - NORD_6_PRODUCT.price,
                )}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
