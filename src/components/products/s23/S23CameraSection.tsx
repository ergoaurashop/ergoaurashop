"use client";

import { motion } from "framer-motion";
import { S23_CAMERA_CONTENT } from "@/lib/s23-ultra-data";

export default function S23CameraSection() {
  return (
    <section className="s23-section s23-section-dark">
      <div className="s23-section-container">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="s23-section-label">Camera</span>
            <h2 className="s23-section-title">{S23_CAMERA_CONTENT.title}</h2>
            <p className="s23-section-subtitle mx-auto">
              {S23_CAMERA_CONTENT.subtitle}
            </p>
          </div>

          {/* Camera lenses grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {S23_CAMERA_CONTENT.highlights.map((lens, i) => (
              <motion.div
                key={i}
                className="s23-feature-card text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <div
                  className="text-3xl mb-3 mx-auto w-14 h-14 flex items-center justify-center rounded-full"
                  style={{
                    background: "var(--s23-accent-bg)",
                    border: "1px solid var(--s23-accent-border)",
                  }}
                >
                  📷
                </div>
                <h3 className="text-sm font-bold mb-1">{lens.label}</h3>
                <p
                  className="text-xs leading-relaxed"
                  style={{ color: "var(--s23-text-secondary)" }}
                >
                  {lens.detail}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Camera features */}
          <div className="bg-[var(--s23-bg-card)] border border-[var(--s23-border)] rounded-[var(--s23-radius-xl)] p-6 md:p-8">
            <h3 className="text-lg font-bold mb-4">
              Pro-Grade Camera Features
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {S23_CAMERA_CONTENT.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: "var(--s23-accent-bg)",
                      color: "var(--s23-accent)",
                    }}
                  >
                    ✓
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--s23-text-secondary)" }}
                  >
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
