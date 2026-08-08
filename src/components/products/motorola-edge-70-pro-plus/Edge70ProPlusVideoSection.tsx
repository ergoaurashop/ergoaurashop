"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EDGE_70_PRO_PLUS_FOLDER } from "@/lib/motorola-edge-70-pro-plus-data";

export default function Edge70ProPlusVideoSection() {
  return (
    <section className="edge70proplus-video-section">
      <Image
        src={`/images/products/${EDGE_70_PRO_PLUS_FOLDER}/s-l1600 (6).webp`}
        alt="Motorola Edge 70 Pro+ 5G design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="edge70proplus-video-overlay">
        <motion.h2
          className="edge70proplus-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Charge in minutes. Live all day.
          <br />
          <span
            style={{
              color: "var(--edge70proplus-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            125W TurboPower. 5000mAh battery. Snapdragon 8s Gen 4.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
