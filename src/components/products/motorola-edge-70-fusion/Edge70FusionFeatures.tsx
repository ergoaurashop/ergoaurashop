"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  EDGE_70_FUSION_KEY_FEATURES,
  EDGE_70_FUSION_FOLDER,
  EDGE_70_FUSION_PRODUCT_IMAGES,
} from "@/lib/motorola-edge-70-fusion-data";

const FEATURE_SVGS: Record<string, React.ReactNode> = {
  "Snapdragon 7s Gen 3": (
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
  "50MP Sony LYTIA 710": (
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
  '6.78" 144Hz Extreme AMOLED': (
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
  "Military-Grade Toughness": (
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
  "Monumental 7000mAh Battery": (
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
  "256GB + 8GB RAM": (
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

export default function Edge70FusionFeatures() {
  const features = EDGE_70_FUSION_KEY_FEATURES;

  const getFeatureImage = (index: number): string => {
    const imageIndex = [1, 3, 4, 5, 6, 0];
    return `/images/products/${EDGE_70_FUSION_FOLDER}/${EDGE_70_FUSION_PRODUCT_IMAGES[imageIndex[index]]}`;
  };

  const breakImage = `/images/products/${EDGE_70_FUSION_FOLDER}/${EDGE_70_FUSION_PRODUCT_IMAGES[2]}`;

  return (
    <section
      className="edge70fusion-section edge70fusion-section-dark"
      id="edge70fusion-features"
    >
      <div className="edge70fusion-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="edge70fusion-section-label">Key Features</span>
          <h2 className="edge70fusion-section-title">
            What Makes It Extraordinary
          </h2>
          <p className="edge70fusion-section-subtitle mx-auto">
            Built to endure, powered to impress — the Motorola Edge 70 Fusion
            combines a 7000mAh battery, 144Hz AMOLED and Snapdragon muscle.
          </p>
        </motion.div>

        <div className="edge70fusion-alternating-section">
          {features.map((feature, i) => (
            <div key={feature.title}>
              <div
                className={`edge70fusion-alternating-row ${i % 2 === 1 ? "reverse" : ""}`}
              >
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <div className="edge70fusion-alternating-icon">
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
                  <h3 className="edge70fusion-alternating-title">
                    {feature.title}
                  </h3>
                  <p className="edge70fusion-alternating-desc">
                    {feature.description}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="edge70fusion-alternating-image">
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
                <div className="edge70fusion-fullwidth-break my-12">
                  <Image
                    src={breakImage}
                    alt="Motorola Edge 70 Fusion showcase"
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
