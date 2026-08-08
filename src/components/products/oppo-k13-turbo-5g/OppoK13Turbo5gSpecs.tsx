"use client";

import { motion } from "framer-motion";
import { OPPO_K13_TURBO_5G_PRODUCT } from "@/lib/oppo-k13-turbo-5g-data";

const BOX_CONTENTS = [
  "OPPO K13 Turbo 5G",
  "80W Super Flash Charger",
  "Type-C Cable",
  "Protective Case (included)",
  "Pre-applied Screen Protector",
  "Documentation",
];

export default function OppoK13Turbo5gSpecs() {
  const specs = OPPO_K13_TURBO_5G_PRODUCT.specifications;

  return (
    <section className="oppok13turbo5g-section oppok13turbo5g-section-dark">
      <div className="oppok13turbo5g-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="oppok13turbo5g-section-label">
            Technical Specifications
          </span>
          <h2 className="oppok13turbo5g-section-title">
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
            <div className="rounded-[var(--oppok13turbo5g-radius-xl)] overflow-hidden border border-[var(--oppok13turbo5g-border)]">
              <table className="oppok13turbo5g-spec-table">
                <tbody>
                  {Object.entries(specs).map(([key, value], i) => (
                    <tr key={i} className="oppok13turbo5g-spec-row">
                      <td className="oppok13turbo5g-spec-label">{key}</td>
                      <td className="oppok13turbo5g-spec-value">{value}</td>
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
            <div className="rounded-[var(--oppok13turbo5g-radius-xl)] overflow-hidden border border-[var(--oppok13turbo5g-border)] p-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--oppok13turbo5g-text-primary)]">
                What's in the Box
              </h3>
              <ul className="space-y-3">
                {BOX_CONTENTS.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--oppok13turbo5g-text-tertiary)]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--oppok13turbo5g-accent-bg)] border border-[var(--oppok13turbo5g-accent-border)] flex items-center justify-center shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3 h-3 text-[var(--oppok13turbo5g-accent-text)]"
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
