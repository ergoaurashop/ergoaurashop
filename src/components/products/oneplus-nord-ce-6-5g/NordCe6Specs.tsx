"use client";

import { motion } from "framer-motion";
import { NORD_CE6_PRODUCT } from "@/lib/oneplus-nord-ce-6-5g-data";

const BOX_CONTENTS = [
  "OnePlus Nord CE 6 5G",
  "80W SUPERVOOC Power Adapter",
  "Type-C Cable",
  "Clear Case (included)",
  "Pre-applied Screen Protector",
  "Documentation",
];

export default function NordCe6Specs() {
  const specs = NORD_CE6_PRODUCT.specifications;

  return (
    <section className="nordce6-section nordce6-section-dark">
      <div className="nordce6-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="nordce6-section-label">
            Technical Specifications
          </span>
          <h2 className="nordce6-section-title">Everything You Need to Know</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-[var(--nordce6-radius-xl)] overflow-hidden border border-[var(--nordce6-border)]">
              <table className="nordce6-spec-table">
                <tbody>
                  {Object.entries(specs).map(([key, value], i) => (
                    <tr key={i} className="nordce6-spec-row">
                      <td className="nordce6-spec-label">{key}</td>
                      <td className="nordce6-spec-value">{value}</td>
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
            <div className="rounded-[var(--nordce6-radius-xl)] overflow-hidden border border-[var(--nordce6-border)] p-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--nordce6-text-primary)]">
                What's in the Box
              </h3>
              <ul className="space-y-3">
                {BOX_CONTENTS.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--nordce6-text-tertiary)]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--nordce6-accent-bg)] border border-[var(--nordce6-accent-border)] flex items-center justify-center shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3 h-3 text-[var(--nordce6-accent-text)]"
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
