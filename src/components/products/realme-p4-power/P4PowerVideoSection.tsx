"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { P4POWER_FOLDER } from "@/lib/realme-p4-power-data";

export default function P4PowerVideoSection() {
  return (
    <section className="p4power-video-section">
      <Image
        src={`/images/products/${P4POWER_FOLDER}/s-l1600 (1).webp`}
        alt="realme P4 Power design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="p4power-video-overlay">
        <motion.h2
          className="p4power-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Charge in minutes. Live all day.
          <br />
          <span
            style={{
              color: "var(--p4power-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            80W SuperVOOC. 10001mAh battery. Dimensity 7400 Ultra.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
