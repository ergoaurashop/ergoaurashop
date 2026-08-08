"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EDGE_70_FUSION_FOLDER } from "@/lib/motorola-edge-70-fusion-data";

export default function Edge70FusionVideoSection() {
  return (
    <section className="edge70fusion-video-section">
      <Image
        src={`/images/products/${EDGE_70_FUSION_FOLDER}/455113-687780.avif`}
        alt="Motorola Edge 70 Fusion design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="edge70fusion-video-overlay">
        <motion.h2
          className="edge70fusion-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Power that never quits.
          <br />
          <span
            style={{
              color: "var(--edge70fusion-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            7000mAh battery. Snapdragon 7s Gen 3. Built for all day, every day.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
