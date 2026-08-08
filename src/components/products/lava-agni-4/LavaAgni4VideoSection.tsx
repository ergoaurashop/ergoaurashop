"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LAVA_AGNI_4_FOLDER } from "@/lib/lava-agni-4-data";

export default function LavaAgni4VideoSection() {
  return (
    <section className="lavaagni4-video-section">
      <Image
        src={`/images/products/${LAVA_AGNI_4_FOLDER}/lavaagni44-1762770368.jpeg`}
        alt="Lava Agni 4 design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="lavaagni4-video-overlay">
        <motion.h2
          className="lavaagni4-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Charge in minutes. Live all day.
          <br />
          <span
            style={{
              color: "var(--lavaagni4-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            66W Fast Charging. 5000mAh battery. Dimensity 7300.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
