"use client";

import { motion } from "framer-motion";
import { EDGE_70_FUSION_STORY, EDGE_70_FUSION_PRODUCT } from "@/lib/motorola-edge-70-fusion-data";

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(price);
}

export default function Edge70FusionStory() {
  return (
    <section className="edge70fusion-section">
      <div className="edge70fusion-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="edge70fusion-section-label">The Story</span>
          <h2 className="edge70fusion-section-title">{EDGE_70_FUSION_STORY.title}</h2>
          <p className="edge70fusion-section-subtitle mx-auto mb-12">
            {EDGE_70_FUSION_STORY.subtitle}
          </p>
          <div className="max-w-4xl mx-auto text-left space-y-6">
            {EDGE_70_FUSION_STORY.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                className="text-[var(--edge70fusion-text-tertiary)] leading-relaxed text-[0.95rem]"
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
            <span className="edge70fusion-price-badge text-base px-5 py-2">
              From{" "}
              <span className="text-[var(--edge70fusion-text-primary)] font-bold">
                {formatPrice(EDGE_70_FUSION_PRODUCT.price)}
              </span>
              <span className="edge70fusion-price-original !ml-2">
                {formatPrice(EDGE_70_FUSION_PRODUCT.original_price)}
              </span>
              <span className="text-[var(--edge70fusion-accent-light)] font-bold">
                Save{" "}
                {formatPrice(
                  EDGE_70_FUSION_PRODUCT.original_price - EDGE_70_FUSION_PRODUCT.price,
                )}
              </span>
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
