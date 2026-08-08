"use client";

import { motion } from "framer-motion";
import { APPLE_IPHONE_17_PRO_PRODUCT } from "@/lib/apple-iphone-17-pro-data";

const BOX_CONTENTS = [
  "Apple iPhone 17 Pro",
  "USB-C to USB-C Cable",
  "SIM Ejector Tool",
  "Documentation",
];

export default function AppleIphone17ProSpecs() {
  const specs = APPLE_IPHONE_17_PRO_PRODUCT.specifications;

  return (
    <section className="appleiphone17pro-section appleiphone17pro-section-dark">
      <div className="appleiphone17pro-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="appleiphone17pro-section-label">
            Technical Specifications
          </span>
          <h2 className="appleiphone17pro-section-title">Everything You Need to Know</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="rounded-[var(--appleiphone17pro-radius-xl)] overflow-hidden border border-[var(--appleiphone17pro-border)]">
              <table className="appleiphone17pro-spec-table">
                <tbody>
                  {Object.entries(specs).map(([key, value], i) => (
                    <tr key={i} className="appleiphone17pro-spec-row">
                      <td className="appleiphone17pro-spec-label">{key}</td>
                      <td className="appleiphone17pro-spec-value">{value}</td>
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
            <div className="rounded-[var(--appleiphone17pro-radius-xl)] overflow-hidden border border-[var(--appleiphone17pro-border)] p-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--appleiphone17pro-text-primary)]">
                What's in the Box
              </h3>
              <ul className="space-y-3">
                {BOX_CONTENTS.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--appleiphone17pro-text-tertiary)]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--appleiphone17pro-accent-bg)] border border-[var(--appleiphone17pro-accent-border)] flex items-center justify-center shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3 h-3 text-[var(--appleiphone17pro-accent-text)]"
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
