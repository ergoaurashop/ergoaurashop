"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NORD_6_FOLDER } from "@/lib/oneplus-nord-6-data";

export default function Nord6VideoSection() {
  return (
    <section className="nord6-video-section">
      <Image
        src={`/images/products/${NORD_6_FOLDER}/s-l1600 (6).webp`}
        alt="OnePlus Nord 6 design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="nord6-video-overlay">
        <motion.h2
          className="nord6-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Charge in minutes. Live all day.
          <br />
          <span
            style={{
              color: "var(--nord6-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            100W Super Flash Charge. 7600mAh battery. Snapdragon 8 Gen 5.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
