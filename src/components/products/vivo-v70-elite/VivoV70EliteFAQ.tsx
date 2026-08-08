"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VIVO_V70_ELITE_FAQS } from "@/lib/vivo-v70-elite-data";

export default function VivoV70EliteFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="vivov70elite-section">
      <div className="vivov70elite-section-container">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="vivov70elite-section-label">FAQ</span>
            <h2 className="vivov70elite-section-title">
              Frequently Asked Questions
            </h2>
            <p className="vivov70elite-section-subtitle mx-auto">
              Everything you need to know before buying the vivo V70 Elite at this
              incredible price.
            </p>
          </div>

          <div>
            {VIVO_V70_ELITE_FAQS.map((faq, i) => (
              <div
                key={i}
                className={`vivov70elite-faq-item ${openIndex === i ? "open" : ""}`}
              >
                <button
                  onClick={() => toggle(i)}
                  className="vivov70elite-faq-question"
                  aria-expanded={openIndex === i}
                >
                  <span>{faq.question}</span>
                  <span className="vivov70elite-faq-icon">
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
                      <div className="vivov70elite-faq-answer">{faq.answer}</div>
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
