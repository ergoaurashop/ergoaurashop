"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EDGE_70_FOLDER } from "@/lib/motorola-edge-70-data";

export default function Edge70VideoSection() {
  return (
    <section className="edge70-video-section">
      <Image
        src={`/images/products/${EDGE_70_FOLDER}/s-l1600 (1).webp`}
        alt="Motorola Edge 70 design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="edge70-video-overlay">
        <motion.h2
          className="edge70-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Charge in minutes. Live all day.
          <br />
          <span
            style={{
              color: "var(--edge70-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            125W TurboPower. 5000mAh battery. Snapdragon 7 Gen 3.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
