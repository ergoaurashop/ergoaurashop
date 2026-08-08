"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  APPLE_IPHONE_17_PRO_CAMERA_CONTENT,
  APPLE_IPHONE_17_PRO_FOLDER,
  APPLE_IPHONE_17_PRO_PRODUCT_IMAGES,
} from "@/lib/apple-iphone-17-pro-data";

const CAMERA_SVGS: Record<string, React.ReactNode> = {
  "50MP Main": (
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
      <path d="M12 10v6M9 13h6" />
    </svg>
  ),
  "4K Video": (
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
      <path d="M17 17l4 4" />
    </svg>
  ),
  "8MP Ultrawide": (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="24"
      height="24"
    >
      <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2z" />
      <path d="M8 12h8M12 8v8" />
    </svg>
  ),
  "16MP Selfie": (
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
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  ),
  "32MP Selfie": (
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
      <circle cx="12" cy="12" r="3" fill="currentColor" />
    </svg>
  ),
};

export default function AppleIphone17ProCameraSection() {
  const { highlights, features } = APPLE_IPHONE_17_PRO_CAMERA_CONTENT;

  const getCameraImage = (index: number): string => {
    const imageIndex = [2, 3, 4, 5];
    return `/images/products/${APPLE_IPHONE_17_PRO_FOLDER}/${APPLE_IPHONE_17_PRO_PRODUCT_IMAGES[imageIndex[index]]}`;
  };

  const breakImage = `/images/products/${APPLE_IPHONE_17_PRO_FOLDER}/${APPLE_IPHONE_17_PRO_PRODUCT_IMAGES[6]}`;

  return (
    <section className="appleiphone17pro-section" id="appleiphone17pro-camera">
      <div className="appleiphone17pro-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="appleiphone17pro-section-label">Camera System</span>
          <h2 className="appleiphone17pro-section-title">
            {APPLE_IPHONE_17_PRO_CAMERA_CONTENT.title}
          </h2>
          <p className="appleiphone17pro-section-subtitle mx-auto">
            {APPLE_IPHONE_17_PRO_CAMERA_CONTENT.subtitle}
          </p>
        </motion.div>

        <div className="appleiphone17pro-alternating-section">
          {highlights.map((lens, i) => (
            <div key={lens.label}>
              <div
                className={`appleiphone17pro-alternating-row ${i % 2 === 1 ? "reverse" : ""}`}
              >
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.1 }}
                >
                  <div className="appleiphone17pro-alternating-icon">
                    {CAMERA_SVGS[lens.label] || (
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
                    )}
                  </div>
                  <h3 className="appleiphone17pro-alternating-title">{lens.label}</h3>
                  <p className="appleiphone17pro-alternating-desc">{lens.detail}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="appleiphone17pro-alternating-image">
                    <Image
                      src={getCameraImage(i)}
                      alt={lens.label}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                </motion.div>
              </div>
              {i === 1 && breakImage && (
                <div className="appleiphone17pro-fullwidth-break my-12">
                  <Image
                    src={breakImage}
                    alt="Apple iPhone 17 Pro camera system"
                    fill
                    sizes="100vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16"
        >
          <div className="appleiphone17pro-glass-card max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-[var(--appleiphone17pro-text-primary)]">
              Camera Features
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[var(--appleiphone17pro-text-tertiary)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4 mt-0.5 shrink-0 text-[var(--appleiphone17pro-accent-text)]"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
