"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { OPPO_K13_TURBO_5G_FOLDER } from "@/lib/oppo-k13-turbo-5g-data";

export default function OppoK13Turbo5gVideoSection() {
  return (
    <section className="oppok13turbo5g-video-section">
      <Image
        src={`/images/products/${OPPO_K13_TURBO_5G_FOLDER}/s-l1600 (6).webp`}
        alt="OPPO K13 Turbo 5G design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="oppok13turbo5g-video-overlay">
        <motion.h2
          className="oppok13turbo5g-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Charge in minutes. Live all day.
          <br />
          <span
            style={{
              color: "var(--oppok13turbo5g-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            80W Super Flash Charge. 7000mAh battery. Dimensity 8450.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
