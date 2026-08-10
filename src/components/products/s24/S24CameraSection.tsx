"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  S24_CAMERA_CONTENT,
  S24_FOLDER,
  S24_PRODUCT_IMAGES,
} from "@/lib/s24-ultra-data";

function getImagePath(filename: string): string {
  return `/images/products/${S24_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

// SVG icons for camera lenses
const CAMERA_SVGS: Record<string, React.ReactNode> = {
  "200MP Wide": (
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
      <line x1="12" y1="9" x2="12" y2="17" />
      <line x1="8" y1="13" x2="16" y2="13" />
    </svg>
  ),
  "50MP Periscope": (
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
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  ),
  "10MP Telephoto": (
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
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  "50MP Ultrawide": (
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
      <path d="M17.5 6.5L21 3" />
      <path d="M17.5 17.5L21 21" />
      <path d="M6.5 6.5L3 3" />
      <path d="M6.5 17.5L3 21" />
      <circle cx="12" cy="12" r="8" />
    </svg>
  ),
};

export default function S24CameraSection() {
  const { title, subtitle, highlights } = S24_CAMERA_CONTENT;

  // Images for alternating camera features
  const getCameraImage = (index: number): string => {
    const images = [
      "galaxy-s24-ultra-highlights-high-resolution.jpg",
      "galaxy-s24-ultra-highlights-high-resolution-zoom.jpg",
      "2143977_main.avif",
      "galaxy-s24-ultra-highlights-kv.jpg",
    ];
    return images[index % images.length];
  };

  // Full-width break image for camera section (fallback to valid S24 index)
  const breakImage =
    S24_PRODUCT_IMAGES.find((img) => img.includes("c2a21ece")) ||
    S24_PRODUCT_IMAGES[9];

  return (
    <section className="s24-section s24-section-dark" id="s24-camera">
      <div className="s24-section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="s24-section-label">Camera System</span>
          <h2 className="s24-section-title">{title}</h2>
          <p className="s24-section-subtitle mx-auto">{subtitle}</p>
        </motion.div>

        <div className="s24-alternating-section">
          {highlights.map((lens, i) => (
            <div key={lens.label}>
              <motion.div
                className={`s24-alternating-row ${i % 2 === 1 ? "reverse" : ""}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                {/* Image side */}
                <div className="s24-alternating-image">
                  <Image
                    src={getImagePath(getCameraImage(i))}
                    alt={lens.label}
                    fill
                    unoptimized
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                  />
                </div>

                {/* Text side */}
                <div>
                  <div className="s24-alternating-icon">
                    {CAMERA_SVGS[lens.label] || (
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
                    )}
                  </div>
                  <h3 className="s24-alternating-title">{lens.label}</h3>
                  <p className="s24-alternating-desc">{lens.detail}</p>
                </div>
              </motion.div>

              {/* Full-width image break after highlight 2 (index 1) */}
              {i === 1 && breakImage && (
                <motion.div
                  className="s24-fullwidth-break my-12"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                >
                  <Image
                    src={getImagePath(breakImage)}
                    alt="Samsung Galaxy S24 Ultra camera detail"
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
