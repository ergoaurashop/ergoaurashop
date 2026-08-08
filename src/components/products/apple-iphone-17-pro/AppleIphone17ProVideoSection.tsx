"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { APPLE_IPHONE_17_PRO_FOLDER } from "@/lib/apple-iphone-17-pro-data";

export default function AppleIphone17ProVideoSection() {
  return (
    <section className="appleiphone17pro-video-section">
      <Image
        src={`/images/products/${APPLE_IPHONE_17_PRO_FOLDER}/Screenshot-2025-09-24-at-12.20.51---PM-1.png`}
        alt="Apple iPhone 17 Pro design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="appleiphone17pro-video-overlay">
        <motion.h2
          className="appleiphone17pro-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Shoot in ProRes. Edit in a heartbeat.
          <br />
          <span
            style={{
              color: "var(--appleiphone17pro-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            A19 Pro. Triple 48MP camera. Apple Intelligence.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
