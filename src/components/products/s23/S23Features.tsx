"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  S23_KEY_FEATURES,
  S23_FOLDER,
  S23_PRODUCT_IMAGES,
} from "@/lib/s23-ultra-data";

function getImagePath(filename: string): string {
  return `/images/products/${S23_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

// SVG icons replacing emoji icons for each feature
const FEATURE_SVGS: Record<string, React.ReactNode> = {
  "200MP Camera": (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
      <circle cx="12" cy="13" r="4" />
    </svg>
  ),
  "S Pen Included": (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  ),
  "Snapdragon 8 Gen 2": (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3" />
      <path d="M15 1v3" />
      <path d="M9 20v3" />
      <path d="M15 20v3" />
      <path d="M20 9h3" />
      <path d="M1 9h3" />
      <path d="M20 14h3" />
      <path d="M1 14h3" />
    </svg>
  ),
  '6.8" 120Hz Display': (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  ),
  "5000mAh Battery": (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="6" width="18" height="12" rx="2" />
      <line x1="6" y1="10" x2="6" y2="14" />
      <line x1="10" y1="8" x2="10" y2="16" />
      <line x1="14" y1="10" x2="14" y2="14" />
      <line x1="22" y1="9" x2="22" y2="15" />
    </svg>
  ),
  "Galaxy AI": (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a10 10 0 0 1 10 10c0 2.5-1 5-2.5 6.5" />
      <path d="M2 12a10 10 0 0 1 10-10" />
      <path d="M12 22a10 10 0 0 1-10-10" />
      <path d="M12 2v20" />
      <path d="M2 12h20" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
};

export default function S23Features() {
  const features = S23_KEY_FEATURES;

  // Pick alternating images for feature rows
  const getFeatureImage = (index: number): string => {
    // Cycle through product images for variety
    const images = [
      "galaxy-s23-ultra-highlights-camera-1.jpg",
      "galaxy-s23-ultra-highlights-display-1.jpg",
      "galaxy-s23-ultra-highlights-nightography-1.jpg",
      "galaxy-s23-ultra-highlights-spec-camera-1.jpg",
      "galaxy-s23-ultra-highlights-spen-more-1.jpg",
      "galaxy-s23-ultra-highlights-accessories-1.jpg",
    ];
    return images[index % images.length];
  };

  // Full-width break image
  const breakImage =
    S23_PRODUCT_IMAGES.find((img) => img.includes("detail-press")) ||
    S23_PRODUCT_IMAGES[10];

  return (
    <section className="s23-section" id="s23-features">
      <div className="s23-section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="s23-section-label">Key Features</span>
          <h2 className="s23-section-title">
            Why the S23 Ultra Still Dominates
          </h2>
          <p className="s23-section-subtitle mx-auto">
            Six flagship features that make this phone a beast even in 2026
          </p>
        </motion.div>

        <div className="s23-alternating-section">
          {features.map((feature, i) => (
            <div key={feature.title}>
              <motion.div
                className={`s23-alternating-row ${i % 2 === 1 ? "reverse" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {/* Image side */}
                <div className="s23-alternating-image">
                  <Image
                    src={getImagePath(getFeatureImage(i))}
                    alt={feature.title}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Text side */}
                <div>
                  <div className="s23-alternating-icon">
                    {FEATURE_SVGS[feature.title] || (
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12.01" y2="8" />
                      </svg>
                    )}
                  </div>
                  <h3 className="s23-alternating-title">{feature.title}</h3>
                  <p className="s23-alternating-desc">{feature.description}</p>
                </div>
              </motion.div>

              {/* Full-width image break after feature 2 (index 1) */}
              {i === 1 && breakImage && (
                <motion.div
                  className="s23-fullwidth-break my-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src={getImagePath(breakImage)}
                    alt="Samsung Galaxy S23 Ultra detail"
                    fill
                    unoptimized
                    sizes="100vw"
                    className="object-cover"
                  />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
