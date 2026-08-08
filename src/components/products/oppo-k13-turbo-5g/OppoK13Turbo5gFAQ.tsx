"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { OPPO_K13_TURBO_5G_FAQS } from "@/lib/oppo-k13-turbo-5g-data";

export default function OppoK13Turbo5gFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="oppok13turbo5g-section">
      <div className="oppok13turbo5g-section-container">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="oppok13turbo5g-section-label">FAQ</span>
            <h2 className="oppok13turbo5g-section-title">
              Frequently Asked Questions
            </h2>
            <p className="oppok13turbo5g-section-subtitle mx-auto">
              Everything you need to know before buying the OPPO K13 Turbo 5G at
              this incredible price.
            </p>
          </div>

          <div>
            {OPPO_K13_TURBO_5G_FAQS.map((faq, i) => (
              <div
                key={i}
                className={`oppok13turbo5g-faq-item ${openIndex === i ? "open" : ""}`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="oppok13turbo5g-faq-question"
                  aria-expanded={openIndex === i}
                >
                  <span>{faq.question}</span>
                  <span className="oppok13turbo5g-faq-icon">
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
                      <div className="oppok13turbo5g-faq-answer">
                        {faq.answer}
                      </div>
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
