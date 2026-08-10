"use client";

import { motion } from "framer-motion";
import { S24_STORY } from "@/lib/s24-ultra-data";

export default function S24Story() {
  return (
    <section className="s24-section">
      <div className="s24-section-container">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="s24-section-label">The Story</span>
            <h2 className="s24-section-title">{S24_STORY.title}</h2>
            <p className="s24-section-subtitle mx-auto">{S24_STORY.subtitle}</p>
          </div>

          <div className="space-y-5">
            {S24_STORY.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className="text-base leading-relaxed"
                style={{ color: "var(--s24-text-secondary)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                {para}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
