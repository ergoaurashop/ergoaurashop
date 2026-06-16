"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  IPHONE_KEY_FEATURES,
  IPHONE_FOLDER,
  IPHONE_PRODUCT_IMAGES,
} from "@/lib/iphone-15-pro-max-data";

const FEATURE_SVGS: Record<string, React.ReactNode> = {
  "A17 Pro Chip": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="24"
      height="24"
    >
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M9 6h6M9 10h6M9 14h4" />
      <circle cx="16" cy="16" r="2" />
    </svg>
  ),
  "48MP Pro Camera": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="24"
      height="24"
    >
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  '6.7" ProMotion Display': (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="24"
      height="24"
    >
      <rect x="2" y="3" width="20" height="18" rx="2" />
      <path d="M12 7v10M8 9l4-4 4 4M8 15l4 4 4-4" />
    </svg>
  ),
  "Titanium Design": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="24"
      height="24"
    >
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5" />
      <path d="M2 12l10 5 10-5" />
    </svg>
  ),
  "All-Day Battery": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="24"
      height="24"
    >
      <rect x="1" y="6" width="18" height="12" rx="2" />
      <path d="M23 10v4" />
      <path d="M7 10l3 3-3 3" />
    </svg>
  ),
  "Action Button": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="24"
      height="24"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
};

export default function IPhoneFeatures() {
  const features = IPHONE_KEY_FEATURES;

  const getFeatureImage = (index: number): string => {
    const imageIndex = [4, 5, 6, 7, 8, 9];
    return `/images/products/${IPHONE_FOLDER}/${IPHONE_PRODUCT_IMAGES[imageIndex[index]]}`;
  };

  const breakImage = `/images/products/${IPHONE_FOLDER}/${IPHONE_PRODUCT_IMAGES[10]}`;

  return (
    <section
      className="iphone-section iphone-section-dark"
      id="iphone-features"
    >
      <div className="iphone-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="iphone-section-label">Key Features</span>
          <h2 className="iphone-section-title">What Makes It Extraordinary</h2>
          <p className="iphone-section-subtitle mx-auto">
            Every detail of the iPhone 15 Pro Max has been meticulously
            engineered to deliver an uncompromising experience.
          </p>
        </motion.div>

        <div className="iphone-alternating-section">
          {features.map((feature, i) => (
            <div key={feature.title}>
              <div
                className={`iphone-alternating-row ${i % 2 === 1 ? "reverse" : ""}`}
              >
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <div className="iphone-alternating-icon">
                    {FEATURE_SVGS[feature.title] || (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        width="24"
                        height="24"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 16v-4M12 8h.01" />
                      </svg>
                    )}
                  </div>
                  <h3 className="iphone-alternating-title">{feature.title}</h3>
                  <p className="iphone-alternating-desc">
                    {feature.description}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="iphone-alternating-image">
                    <Image
                      src={getFeatureImage(i)}
                      alt={feature.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </motion.div>
              </div>
              {i === 1 && breakImage && (
                <div className="iphone-fullwidth-break my-12">
                  <Image
                    src={breakImage}
                    alt="iPhone 15 Pro Max showcase"
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
