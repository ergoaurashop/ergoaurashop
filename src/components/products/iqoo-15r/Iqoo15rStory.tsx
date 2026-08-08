"use client";

import { motion } from "framer-motion";
import { IQOO_15R_STORY, IQOO_15R_PRODUCT } from "@/lib/iqoo-15r-data";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Iqoo15rStory() {
  return (
    <section className="iqoo15r-section">
      <div className="iqoo15r-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="iqoo15r-section-label">The Story</span>
          <h2 className="iqoo15r-section-title">{IQOO_15R_STORY.title}</h2>
          <p className="iqoo15r-section-subtitle mx-auto mb-12">
            {IQOO_15R_STORY.subtitle}
          </p>
          <div className="max-w-4xl mx-auto text-left space-y-6">
            {IQOO_15R_STORY.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-[var(--iqoo15r-text-tertiary)] leading-relaxed text-[0.95rem]"
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
            <span className="iqoo15r-price-badge text-base px-5 py-2">
              From{" "}
              <span className="text-[var(--iqoo15r-text-primary)] font-bold">
                {formatPrice(IQOO_15R_PRODUCT.price)}
              </span>
              <span className="iqoo15r-price-original !ml-2">
                {formatPrice(IQOO_15R_PRODUCT.original_price)}
              </span>
              <span className="text-[var(--iqoo15r-accent-light)] font-bold">
                Save{" "}
                {formatPrice(
                  IQOO_15R_PRODUCT.original_price - IQOO_15R_PRODUCT.price,
                )}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
