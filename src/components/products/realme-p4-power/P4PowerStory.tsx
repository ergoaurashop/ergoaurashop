"use client";

import { motion } from "framer-motion";
import { P4POWER_STORY, P4POWER_PRODUCT } from "@/lib/realme-p4-power-data";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function P4PowerStory() {
  return (
    <section className="p4power-section">
      <div className="p4power-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="p4power-section-label">The Story</span>
          <h2 className="p4power-section-title">{P4POWER_STORY.title}</h2>
          <p className="p4power-section-subtitle mx-auto mb-12">
            {P4POWER_STORY.subtitle}
          </p>
          <div className="max-w-4xl mx-auto text-left space-y-6">
            {P4POWER_STORY.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-[var(--p4power-text-tertiary)] leading-relaxed text-[0.95rem]"
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
            <span className="p4power-price-badge text-base px-5 py-2">
              From{" "}
              <span className="text-[var(--p4power-text-primary)] font-bold">
                {formatPrice(P4POWER_PRODUCT.price)}
              </span>
              <span className="p4power-price-original !ml-2">
                {formatPrice(P4POWER_PRODUCT.original_price)}
              </span>
              <span className="text-[var(--p4power-accent-light)] font-bold">
                Save{" "}
                {formatPrice(
                  P4POWER_PRODUCT.original_price - P4POWER_PRODUCT.price,
                )}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
