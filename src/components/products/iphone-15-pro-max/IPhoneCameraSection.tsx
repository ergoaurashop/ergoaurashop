"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  IPHONE_CAMERA_CONTENT,
  IPHONE_FOLDER,
  IPHONE_PRODUCT_IMAGES,
} from "@/lib/iphone-15-pro-max-data";

const CAMERA_SVGS: Record<string, React.ReactNode> = {
  "48MP Main": (
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
  "12MP Telephoto 5x": (
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
  "12MP Ultrawide": (
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
  "LiDAR Scanner": (
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

export default function IPhoneCameraSection() {
  const { highlights, features } = IPHONE_CAMERA_CONTENT;

  const getCameraImage = (index: number): string => {
    const imageIndex = [11, 12, 13, 14];
    return `/images/products/${IPHONE_FOLDER}/${IPHONE_PRODUCT_IMAGES[imageIndex[index]]}`;
  };

  const breakImage = `/images/products/${IPHONE_FOLDER}/${IPHONE_PRODUCT_IMAGES[10]}`;

  return (
    <section className="iphone-section" id="iphone-camera">
      <div className="iphone-section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="iphone-section-label">Camera System</span>
          <h2 className="iphone-section-title">
            {IPHONE_CAMERA_CONTENT.title}
          </h2>
          <p className="iphone-section-subtitle mx-auto">
            {IPHONE_CAMERA_CONTENT.subtitle}
          </p>
        </motion.div>

        <div className="iphone-alternating-section">
          {highlights.map((lens, i) => (
            <div key={lens.label}>
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
                  <h3 className="iphone-alternating-title">{lens.label}</h3>
                  <p className="iphone-alternating-desc">{lens.detail}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: i % 2 === 0 ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.7, delay: 0.2 }}
                >
                  <div className="iphone-alternating-image">
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
                <div className="iphone-fullwidth-break my-12">
                  <Image
                    src={breakImage}
                    alt="iPhone 15 Pro Max camera system"
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
          <div className="iphone-glass-card max-w-3xl mx-auto">
            <h3 className="text-lg font-semibold mb-4 text-[var(--iphone-text-primary)]">
              Camera Features
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2 text-sm text-[var(--iphone-text-tertiary)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4 mt-0.5 shrink-0 text-[var(--iphone-accent-text)]"
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
