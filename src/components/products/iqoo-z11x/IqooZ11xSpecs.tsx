"use client";

import { motion } from "framer-motion";
import { IQOO_Z11X_PRODUCT } from "@/lib/iqoo-z11x-data";

const BOX_CONTENTS = [
  "iQOO Z11x",
  "44W FlashCharge Adapter",
  "Type-C Cable",
  "Clear Case (included)",
  "Pre-applied Screen Protector",
  "Documentation",
];

export default function IqooZ11xSpecs() {
  const specs = IQOO_Z11X_PRODUCT.specifications;

  return (
    <section className="iqooz11x-section iqooz11x-section-dark">
      <div className="iqooz11x-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <span className="iqooz11x-section-label">
            Technical Specifications
          </span>
          <h2 className="iqooz11x-section-title">
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
            <div className="rounded-[var(--iqooz11x-radius-xl)] overflow-hidden border border-[var(--iqooz11x-border)]">
              <table className="iqooz11x-spec-table">
                <tbody>
                  {Object.entries(specs).map(([key, value], i) => (
                    <tr key={i} className="iqooz11x-spec-row">
                      <td className="iqooz11x-spec-label">{key}</td>
                      <td className="iqooz11x-spec-value">{value}</td>
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
            <div className="rounded-[var(--iqooz11x-radius-xl)] overflow-hidden border border-[var(--iqooz11x-border)] p-6">
              <h3 className="text-lg font-semibold mb-4 text-[var(--iqooz11x-text-primary)]">
                What's in the Box
              </h3>
              <ul className="space-y-3">
                {BOX_CONTENTS.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-sm text-[var(--iqooz11x-text-tertiary)]"
                  >
                    <span className="w-6 h-6 rounded-full bg-[var(--iqooz11x-accent-bg)] border border-[var(--iqooz11x-accent-border)] flex items-center justify-center shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className="w-3 h-3 text-[var(--iqooz11x-accent-text)]"
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
