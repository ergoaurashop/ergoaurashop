"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { POCO_X8_PRO_MAX_FOLDER } from "@/lib/poco-x8-pro-max-data";

export default function PocoX8ProMaxVideoSection() {
  return (
    <section className="pocox8promax-video-section">
      <Image
        src={`/images/products/${POCO_X8_PRO_MAX_FOLDER}/2a46c91b2268f3f89375129bc7009d20.webp`}
        alt="POCO X8 Pro Max design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="pocox8promax-video-overlay">
        <motion.h2
          className="pocox8promax-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Power that never quits.
          <br />
          <span
            style={{
              color: "var(--pocox8promax-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            9000mAh battery. 100W charging. Dimensity 9500s.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
