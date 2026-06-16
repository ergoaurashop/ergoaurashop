"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { IPHONE_FOLDER } from "@/lib/iphone-15-pro-max-data";

export default function IPhoneVideoSection() {
  const [videoError, setVideoError] = useState(false);

  return (
    <section className="iphone-video-section">
      {!videoError ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          onError={() => setVideoError(true)}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        >
          <source
            src={`/images/products/${IPHONE_FOLDER}/large_2x.webm`}
            type="video/webm"
          />
        </video>
      ) : (
        <Image
          src={`/images/products/${IPHONE_FOLDER}/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.xlarge_2x.jpg`}
          alt="iPhone 15 Pro Max"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      )}
      <div className="iphone-video-overlay">
        <motion.h2
          className="iphone-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Experience the power of A17 Pro.
          <br />
          <span
            style={{
              color: "var(--iphone-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            Desktop-class gaming. Pro-level creativity. All-day intelligence.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
