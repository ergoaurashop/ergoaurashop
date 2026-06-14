"use client";

import { motion } from "framer-motion";
import { S23_STORY } from "@/lib/s23-ultra-data";

export default function S23Story() {
  return (
    <section className="s23-section">
      <div className="s23-section-container">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="s23-section-label">The Story</span>
            <h2 className="s23-section-title">{S23_STORY.title}</h2>
            <p className="s23-section-subtitle mx-auto">{S23_STORY.subtitle}</p>
          </div>

          <div className="space-y-5">
            {S23_STORY.paragraphs.map((para, i) => (
              <motion.p
                key={i}
                className="text-base leading-relaxed"
                style={{ color: "var(--s23-text-secondary)" }}
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
