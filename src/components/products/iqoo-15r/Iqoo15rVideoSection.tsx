"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IQOO_15R_FOLDER } from "@/lib/iqoo-15r-data";

export default function Iqoo15rVideoSection() {
  return (
    <section className="iqoo15r-video-section">
      <Image
        src={`/images/products/${IQOO_15R_FOLDER}/s-l1600 (6).webp`}
        alt="iQOO 15R design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="iqoo15r-video-overlay">
        <motion.h2
          className="iqoo15r-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Charge in minutes. Live all day.
          <br />
          <span
            style={{
              color: "var(--iqoo15r-text-tertiary)",
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
