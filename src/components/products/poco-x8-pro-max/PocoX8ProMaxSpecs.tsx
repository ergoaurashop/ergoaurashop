"use client";

import { motion } from "framer-motion";
import { POCO_X8_PRO_MAX_PRODUCT } from "@/lib/poco-x8-pro-max-data";

const BOX_CONTENTS = [
  "POCO X8 Pro Max",
  "100W Charger",
  "Type-C Cable",
  "Protective Case (included)",
  "Pre-applied Screen Protector",
  "Documentation",
];

export default function PocoX8ProMaxSpecs() {
  const specs = POCO_X8_PRO_MAX_PRODUCT.specifications;

  return (
    <section className="pocox8promax-section pocox8promax-section-dark">
      <div className="pocox8promax-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="pocox8promax-section-label">
            Technical Specifications
          </span>
          <h2 className="pocox8promax-section-title">Everything You Need to Know</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-[var(--pocox8promax-radius-xl)] overflow-hidden border border-[var(--pocox8promax-border)]">
              <table className="pocox8promax-spec-table">
                <tbody>
                  {Object.entries(specs).map(([key, value], i) => (
                    <tr key={i} className="pocox8promax-spec-row">
                      <td className="pocox8promax-spec-label">{key}</td>
                      <td className="pocox8promax-spec-value">{value}</td>
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
            <div className="rounded-[var(--pocox8promax-radius-xl)] overflow-hidden border border-[var(--pocox8promax-border)] p-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--pocox8promax-text-primary)]">
                What's in the Box
              </h3>
              <ul className="space-y-3">
                {BOX_CONTENTS.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--pocox8promax-text-tertiary)]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--pocox8promax-accent-bg)] border border-[var(--pocox8promax-accent-border)] flex items-center justify-center shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3 h-3 text-[var(--pocox8promax-accent-text)]"
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
