"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface WCFaqProps {
  faqs: FAQItem[];
}

/**
 * WCFaq — Amazon-style FAQ accordion section.
 * Displays questions that expand to show answers on click.
 */
export default function WCFaq({ faqs }: WCFaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!faqs || faqs.length === 0) return null;

  return (
    <section className="wc2026-faq">
      <h2 className="wc2026-faq-title">Frequently asked questions</h2>
      {faqs.map((faq, i) => (
        <div key={i} className="wc2026-faq-item">
          <button
            className={`wc2026-faq-question ${openIndex === i ? "open" : ""}`}
            onClick={() => handleToggle(i)}
            aria-expanded={openIndex === i}
          >
            <span>{faq.question}</span>
            <span className="wc2026-faq-arrow">▼</span>
          </button>
          {openIndex === i && (
            <div className="wc2026-faq-answer">{faq.answer}</div>
          )}
        </div>
      ))}
    </section>
  );
}
