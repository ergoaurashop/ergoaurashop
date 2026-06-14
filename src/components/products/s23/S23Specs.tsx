"use client";

import { motion } from "framer-motion";
import { S23_PRODUCT } from "@/lib/s23-ultra-data";

const BOX_CONTENTS = [
  "Samsung Galaxy S23 Ultra handset",
  "S Pen (built-in)",
  "USB-C to USB-C data cable",
  "SIM ejector tool",
  "Quick start guide & Samsung literature",
  "Free UK-to-Indian plug adapter",
];

export default function S23Specs() {
  const specs = S23_PRODUCT.specifications;

  return (
    <section className="s23-section">
      <div className="s23-section-container">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="s23-section-label">Specifications</span>
            <h2 className="s23-section-title">
              Built to the Highest Standards
            </h2>
            <p className="s23-section-subtitle mx-auto">
              Every specification of the Galaxy S23 Ultra is world-class.
            </p>
          </div>

          {/* Specs table */}
          <div className="rounded-[var(--s23-radius-xl)] overflow-hidden border border-[var(--s23-border)] mb-8">
            <table className="s23-spec-table">
              <tbody>
                {Object.entries(specs).map(([key, value], i) => (
                  <tr key={i} className="s23-spec-row">
                    <td className="s23-spec-label">{key}</td>
                    <td className="s23-spec-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Box contents */}
          <div className="bg-[var(--s23-bg-card)] border border-[var(--s23-border)] rounded-[var(--s23-radius-xl)] p-6 md:p-8">
            <h3 className="text-lg font-bold mb-4">What's in the Box</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BOX_CONTENTS.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: "var(--s23-accent-bg)",
                      color: "var(--s23-accent)",
                    }}
                  >
                    ✓
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--s23-text-secondary)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
