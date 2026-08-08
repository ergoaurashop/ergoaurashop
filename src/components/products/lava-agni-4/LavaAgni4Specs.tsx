"use client";

import { motion } from "framer-motion";
import { LAVA_AGNI_4_PRODUCT } from "@/lib/lava-agni-4-data";

const BOX_CONTENTS = [
  "Lava Agni 4",
  "66W Flash Charge Adapter",
  "Type-C Cable",
  "Clear Case (included)",
  "Pre-applied Screen Protector",
  "Documentation",
];

export default function LavaAgni4Specs() {
  const specs = LAVA_AGNI_4_PRODUCT.specifications;

  return (
    <section className="lavaagni4-section lavaagni4-section-dark">
      <div className="lavaagni4-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="lavaagni4-section-label">
            Technical Specifications
          </span>
          <h2 className="lavaagni4-section-title">
            Everything You Need to Know
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-[var(--lavaagni4-radius-xl)] overflow-hidden border border-[var(--lavaagni4-border)]">
              <table className="lavaagni4-spec-table">
                <tbody>
                  {Object.entries(specs).map(([key, value], i) => (
                    <tr key={i} className="lavaagni4-spec-row">
                      <td className="lavaagni4-spec-label">{key}</td>
                      <td className="lavaagni4-spec-value">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="rounded-[var(--lavaagni4-radius-xl)] overflow-hidden border border-[var(--lavaagni4-border)] p-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--lavaagni4-text-primary)]">
                What's in the Box
              </h3>
              <ul className="space-y-3">
                {BOX_CONTENTS.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--lavaagni4-text-tertiary)]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--lavaagni4-accent-bg)] border border-[var(--lavaagni4-accent-border)] flex items-center justify-center shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3 h-3 text-[var(--lavaagni4-accent-text)]"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
