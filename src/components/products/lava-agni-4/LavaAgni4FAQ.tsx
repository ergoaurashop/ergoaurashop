"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LAVA_AGNI_4_FAQS } from "@/lib/lava-agni-4-data";

export default function LavaAgni4FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="lavaagni4-section">
      <div className="lavaagni4-section-container">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="lavaagni4-section-label">FAQ</span>
            <h2 className="lavaagni4-section-title">
              Frequently Asked Questions
            </h2>
            <p className="lavaagni4-section-subtitle mx-auto">
              Everything you need to know before buying the Lava Agni 4 at this
              incredible price.
            </p>
          </div>

          <div>
            {LAVA_AGNI_4_FAQS.map((faq, i) => (
              <div
                key={i}
                className={`lavaagni4-faq-item ${openIndex === i ? "open" : ""}`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="lavaagni4-faq-question"
                  aria-expanded={openIndex === i}
                >
                  <span>{faq.question}</span>
                  <span className="lavaagni4-faq-icon">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>
                <AnimatePresence>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="lavaagni4-faq-answer">{faq.answer}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
