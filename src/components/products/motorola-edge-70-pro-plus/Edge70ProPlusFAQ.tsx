"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { EDGE_70_PRO_PLUS_FAQS } from "@/lib/motorola-edge-70-pro-plus-data";

export default function Edge70ProPlusFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="edge70proplus-section">
      <div className="edge70proplus-section-container">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="edge70proplus-section-label">FAQ</span>
            <h2 className="edge70proplus-section-title">
              Frequently Asked Questions
            </h2>
            <p className="edge70proplus-section-subtitle mx-auto">
              Everything you need to know before buying the Motorola Edge 70 Pro+ 5G at this
              incredible price.
            </p>
          </div>

          <div>
            {EDGE_70_PRO_PLUS_FAQS.map((faq, i) => (
              <div
                key={i}
                className={`edge70proplus-faq-item ${openIndex === i ? "open" : ""}`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="edge70proplus-faq-question"
                  aria-expanded={openIndex === i}
                >
                  <span>{faq.question}</span>
                  <span className="edge70proplus-faq-icon">
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
                      <div className="edge70proplus-faq-answer">{faq.answer}</div>
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
