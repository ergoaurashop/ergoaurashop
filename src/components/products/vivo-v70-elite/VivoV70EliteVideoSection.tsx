"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { VIVO_V70_ELITE_FOLDER } from "@/lib/vivo-v70-elite-data";

export default function VivoV70EliteVideoSection() {
  return (
    <section className="vivov70elite-video-section">
      <Image
        src={`/images/products/${VIVO_V70_ELITE_FOLDER}/s-l1600 (6).webp`}
        alt="vivo V70 Elite design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="vivov70elite-video-overlay">
        <motion.h2
          className="vivov70elite-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Charge in minutes. Live all day.
          <br />
          <span
            style={{
              color: "var(--vivov70elite-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            80W FlashCharge. 5500mAh battery. Dimensity 8300.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
