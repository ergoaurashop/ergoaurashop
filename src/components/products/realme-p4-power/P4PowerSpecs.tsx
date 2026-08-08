"use client";

import { motion } from "framer-motion";
import { P4POWER_PRODUCT } from "@/lib/realme-p4-power-data";

const BOX_CONTENTS = [
  "realme P4 Power",
  "80W SUPERVOOC Power Adapter",
  "Type-C Cable",
  "Clear Case (included)",
  "Pre-applied Screen Protector",
  "Documentation",
];

export default function P4PowerSpecs() {
  const specs = P4POWER_PRODUCT.specifications;

  return (
    <section className="p4power-section p4power-section-dark">
      <div className="p4power-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="p4power-section-label">
            Technical Specifications
          </span>
          <h2 className="p4power-section-title">Everything You Need to Know</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-[var(--p4power-radius-xl)] overflow-hidden border border-[var(--p4power-border)]">
              <table className="p4power-spec-table">
                <tbody>
                  {Object.entries(specs).map(([key, value], i) => (
                    <tr key={i} className="p4power-spec-row">
                      <td className="p4power-spec-label">{key}</td>
                      <td className="p4power-spec-value">{value}</td>
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
            <div className="rounded-[var(--p4power-radius-xl)] overflow-hidden border border-[var(--p4power-border)] p-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--p4power-text-primary)]">
                What's in the Box
              </h3>
              <ul className="space-y-3">
                {BOX_CONTENTS.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--p4power-text-tertiary)]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--p4power-accent-bg)] border border-[var(--p4power-accent-border)] flex items-center justify-center shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3 h-3 text-[var(--p4power-accent-text)]"
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
