"use client";

import { motion } from "framer-motion";
import { IPHONE_PRODUCT } from "@/lib/iphone-15-pro-max-data";

const BOX_CONTENTS = [
  "iPhone 15 Pro Max 512GB",
  "USB-C Braided Charging Cable (1m)",
  "SIM Ejector Tool",
  "Apple Sticker Sheet",
  "Documentation",
  "Free Screen Protector (included)",
];

export default function IPhoneSpecs() {
  const specs = IPHONE_PRODUCT.specifications;

  return (
    <section className="iphone-section iphone-section-dark">
      <div className="iphone-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="iphone-section-label">Technical Specifications</span>
          <h2 className="iphone-section-title">Everything You Need to Know</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-[var(--iphone-radius-xl)] overflow-hidden border border-[var(--iphone-border)]">
              <table className="iphone-spec-table">
                <tbody>
                  {Object.entries(specs).map(([key, value], i) => (
                    <tr key={i} className="iphone-spec-row">
                      <td className="iphone-spec-label">{key}</td>
                      <td className="iphone-spec-value">{value}</td>
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
            <div className="rounded-[var(--iphone-radius-xl)] overflow-hidden border border-[var(--iphone-border)] p-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--iphone-text-primary)]">
                What's in the Box
              </h3>
              <ul className="space-y-3">
                {BOX_CONTENTS.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--iphone-text-tertiary)]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--iphone-accent-bg)] border border-[var(--iphone-accent-border)] flex items-center justify-center shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3 h-3 text-[var(--iphone-accent-text)]"
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
