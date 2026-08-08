"use client";

import { motion } from "framer-motion";
import { IQOO_Z11X_STORY, IQOO_Z11X_PRODUCT } from "@/lib/iqoo-z11x-data";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function IqooZ11xStory() {
  return (
    <section className="iqooz11x-section">
      <div className="iqooz11x-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="iqooz11x-section-label">The Story</span>
          <h2 className="iqooz11x-section-title">{IQOO_Z11X_STORY.title}</h2>
          <p className="iqooz11x-section-subtitle mx-auto mb-12">
            {IQOO_Z11X_STORY.subtitle}
          </p>
          <div className="max-w-4xl mx-auto text-left space-y-6">
            {IQOO_Z11X_STORY.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-[var(--iqooz11x-text-tertiary)] leading-relaxed text-[0.95rem]"
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
            <span className="iqooz11x-price-badge text-base px-5 py-2">
              From{" "}
              <span className="text-[var(--iqooz11x-text-primary)] font-bold">
                {formatPrice(IQOO_Z11X_PRODUCT.price)}
              </span>
              <span className="iqooz11x-price-original !ml-2">
                {formatPrice(IQOO_Z11X_PRODUCT.original_price)}
              </span>
              <span className="text-[var(--iqooz11x-accent-light)] font-bold">
                Save{" "}
                {formatPrice(
                  IQOO_Z11X_PRODUCT.original_price - IQOO_Z11X_PRODUCT.price,
                )}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
