"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  OPPO_K13_TURBO_5G_KEY_FEATURES,
  OPPO_K13_TURBO_5G_FOLDER,
  OPPO_K13_TURBO_5G_PRODUCT_IMAGES,
} from "@/lib/oppo-k13-turbo-5g-data";

const FEATURE_SVGS: Record<string, React.ReactNode> = {
  "Fluid Visuals": (
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
  "Marathon Battery": (
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
  "SUPERVOOC Speed": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="24"
      height="24"
    >
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  ),
  "OxygenOS Purity": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="24"
      height="24"
    >
      <path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z" />
    </svg>
  ),
  "Crisp Camera": (
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
  "Sleek Profile": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="24"
      height="24"
    >
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
      <line x1="16" y1="8" x2="2" y2="22" />
      <line x1="17.5" y1="15" x2="9" y2="15" />
    </svg>
  ),
};

export default function OppoK13Turbo5gFeatures() {
  const features = OPPO_K13_TURBO_5G_KEY_FEATURES;

  const getFeatureImage = (index: number): string => {
    const imageIndex = [1, 3, 4, 5, 6, 0];
    return `/images/products/${OPPO_K13_TURBO_5G_FOLDER}/${OPPO_K13_TURBO_5G_PRODUCT_IMAGES[imageIndex[index]]}`;
  };

  const breakImage = `/images/products/${OPPO_K13_TURBO_5G_FOLDER}/${OPPO_K13_TURBO_5G_PRODUCT_IMAGES[2]}`;

  return (
    <section
      className="oppok13turbo5g-section oppok13turbo5g-section-dark"
      id="oppok13turbo5g-features"
    >
      <div className="oppok13turbo5g-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="oppok13turbo5g-section-label">Key Features</span>
          <h2 className="oppok13turbo5g-section-title">
            What Makes It Extraordinary
          </h2>
          <p className="oppok13turbo5g-section-subtitle mx-auto">
            A colossal 7000mAh battery, turbo-charged Dimensity 8450 processing,
            and a crisp 120Hz AMOLED display — the OPPO K13 Turbo 5G redefines
            endurance.
          </p>
        </motion.div>

        <div className="oppok13turbo5g-alternating-section">
          {features.map((feature, i) => (
            <div key={feature.title}>
              <div
                className={`oppok13turbo5g-alternating-row ${i % 2 === 1 ? "reverse" : ""}`}
              >
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <div className="oppok13turbo5g-alternating-icon">
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
                  <h3 className="oppok13turbo5g-alternating-title">
                    {feature.title}
                  </h3>
                  <p className="oppok13turbo5g-alternating-desc">
                    {feature.description}
                  </p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="oppok13turbo5g-alternating-image">
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
                <div className="oppok13turbo5g-fullwidth-break my-12">
                  <Image
                    src={breakImage}
                    alt="OPPO K13 Turbo 5G showcase"
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
