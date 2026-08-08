"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { POCO_X8_PRO_MAX_FOLDER } from "@/lib/poco-x8-pro-max-data";

export default function PocoX8ProMaxFullWidthImage() {
  return (
    <section className="pocox8promax-fullwidth-section">
      <Image
        src={`/images/products/${POCO_X8_PRO_MAX_FOLDER}/5aabcec3d67a9c31f4e9d10c3442fbb5.webp`}
        alt="POCO X8 Pro Max Design"
        fill
        className="pocox8promax-hero-fallback"
        priority
      />
      <div className="pocox8promax-fullwidth-overlay">
        <motion.p
          className="pocox8promax-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          6.83-inch 120Hz 1.5K AMOLED display. 9000mAh battery. Dimensity 9500s.
          100W charging. Endurance, redefined.
        </motion.p>
      </div>
    </section>
  );
}
