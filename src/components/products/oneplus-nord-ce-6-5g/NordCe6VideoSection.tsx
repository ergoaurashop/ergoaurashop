"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NORD_CE6_FOLDER } from "@/lib/oneplus-nord-ce-6-5g-data";

export default function NordCe6VideoSection() {
  return (
    <section className="nordce6-video-section">
      <Image
        src={`/images/products/${NORD_CE6_FOLDER}/s-l1600 (1).webp`}
        alt="OnePlus Nord CE 6 5G design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="nordce6-video-overlay">
        <motion.h2
          className="nordce6-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Charge in minutes. Live all day.
          <br />
          <span
            style={{
              color: "var(--nordce6-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            80W SUPERVOOC. 5500mAh battery. Snapdragon 7 Gen 3.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
