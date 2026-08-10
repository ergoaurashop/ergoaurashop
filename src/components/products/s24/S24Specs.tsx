"use client";

import { motion } from "framer-motion";
import { S24_PRODUCT } from "@/lib/s24-ultra-data";

const BOX_CONTENTS = [
  "Samsung Galaxy S24 Ultra handset",
  "S Pen (built-in)",
  "USB-C to USB-C data cable",
  "SIM ejector tool",
  "Quick start guide & Samsung literature",
  "Free UK-to-Indian plug adapter",
];

export default function S24Specs() {
  const specs = S24_PRODUCT.specifications;

  return (
    <section className="s24-section">
      <div className="s24-section-container">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <span className="s24-section-label">Specifications</span>
            <h2 className="s24-section-title">
              Built to the Highest Standards
            </h2>
            <p className="s24-section-subtitle mx-auto">
              Every specification of the Galaxy S24 Ultra is world-class.
            </p>
          </div>

          {/* Specs table */}
          <div className="rounded-[var(--s24-radius-xl)] overflow-hidden border border-[var(--s24-border)] mb-8">
            <table className="s24-spec-table">
              <tbody>
                {Object.entries(specs).map(([key, value], i) => (
                  <tr key={i} className="s24-spec-row">
                    <td className="s24-spec-label">{key}</td>
                    <td className="s24-spec-value">{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Box contents */}
          <div className="bg-[var(--s24-bg-card)] border border-[var(--s24-border)] rounded-[var(--s24-radius-xl)] p-6 md:p-8">
            <h3 className="text-lg font-bold mb-4">What's in the Box</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {BOX_CONTENTS.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: "var(--s24-accent-bg)",
                      color: "var(--s24-accent-text)",
                    }}
                  >
                    ✓
                  </span>
                  <span
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--s24-text-secondary)" }}
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
