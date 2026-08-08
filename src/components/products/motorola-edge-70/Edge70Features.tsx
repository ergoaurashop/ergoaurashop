"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  EDGE_70_KEY_FEATURES,
  EDGE_70_FOLDER,
  EDGE_70_PRODUCT_IMAGES,
} from "@/lib/motorola-edge-70-data";

const FEATURE_SVGS: Record<string, React.ReactNode> = {
  "Silky Smooth Display": (
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
  "Lightning Charging": (
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
  "Vegan Leather Back": (
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
  "Sharp Photography": (
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
  "All-Weather Ready": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="24"
      height="24"
    >
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  "Immersive Audio": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="24"
      height="24"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
    </svg>
  ),
};

export default function Edge70Features() {
  const features = EDGE_70_KEY_FEATURES;

  const getFeatureImage = (index: number): string => {
    const imageIndex = [1, 3, 4, 5, 6, 0];
    return `/images/products/${EDGE_70_FOLDER}/${EDGE_70_PRODUCT_IMAGES[imageIndex[index]]}`;
  };

  const breakImage = `/images/products/${EDGE_70_FOLDER}/${EDGE_70_PRODUCT_IMAGES[2]}`;

  return (
    <section
      className="edge70-section edge70-section-dark"
      id="edge70-features"
    >
      <div className="edge70-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="edge70-section-label">Key Features</span>
          <h2 className="edge70-section-title">What Makes It Extraordinary</h2>
          <p className="edge70-section-subtitle mx-auto">
            Flagship-tier aesthetics redefined — the Motorola Edge 70 combines a
            144Hz pOLED display, 125W TurboPower charging, and a premium vegan
            leather design.
          </p>
        </motion.div>

        <div className="edge70-alternating-section">
          {features.map((feature, i) => (
            <div key={feature.title}>
              <div
                className={`edge70-alternating-row ${i % 2 === 1 ? "reverse" : ""}`}
              >
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <div className="edge70-alternating-icon">
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
                  <h3 className="edge70-alternating-title">{feature.title}</h3>
                  <p className="edge70-alternating-desc">
                    {feature.description}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="edge70-alternating-image">
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
                <div className="edge70-fullwidth-break my-12">
                  <Image
                    src={breakImage}
                    alt="Motorola Edge 70 showcase"
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
