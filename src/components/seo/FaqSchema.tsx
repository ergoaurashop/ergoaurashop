// =====================================================================
// FAQPage Structured Data
// Enables expandable FAQ rich results in Google SERP. Highly valued
// by AI search engines (SGE, ChatGPT, Perplexity) for direct answers.
// =====================================================================

import JsonLd from "./JsonLd";

type FAQItem = {
  question: string;
  answer: string;
};

type Props = {
  faqs: FAQItem[];
};

export default function FaqSchema({ faqs }: Props) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return <JsonLd schema={schema} id="faq-schema" />;
}
