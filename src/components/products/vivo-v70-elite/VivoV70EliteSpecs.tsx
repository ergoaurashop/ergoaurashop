"use client";

import { motion } from "framer-motion";
import { VIVO_V70_ELITE_PRODUCT } from "@/lib/vivo-v70-elite-data";

const BOX_CONTENTS = [
  "vivo V70 Elite",
  "80W FlashCharge Adapter",
  "Type-C Cable",
  "Transparent Case (included)",
  "Pre-applied Screen Protector",
  "Documentation",
];

export default function VivoV70EliteSpecs() {
  const specs = VIVO_V70_ELITE_PRODUCT.specifications;

  return (
    <section className="vivov70elite-section vivov70elite-section-dark">
      <div className="vivov70elite-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="vivov70elite-section-label">
            Technical Specifications
          </span>
          <h2 className="vivov70elite-section-title">Everything You Need to Know</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-[var(--vivov70elite-radius-xl)] overflow-hidden border border-[var(--vivov70elite-border)]">
              <table className="vivov70elite-spec-table">
                <tbody>
                  {Object.entries(specs).map(([key, value], i) => (
                    <tr key={i} className="vivov70elite-spec-row">
                      <td className="vivov70elite-spec-label">{key}</td>
                      <td className="vivov70elite-spec-value">{value}</td>
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
            <div className="rounded-[var(--vivov70elite-radius-xl)] overflow-hidden border border-[var(--vivov70elite-border)] p-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--vivov70elite-text-primary)]">
                What's in the Box
              </h3>
              <ul className="space-y-3">
                {BOX_CONTENTS.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--vivov70elite-text-tertiary)]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--vivov70elite-accent-bg)] border border-[var(--vivov70elite-accent-border)] flex items-center justify-center shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3 h-3 text-[var(--vivov70elite-accent-text)]"
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
