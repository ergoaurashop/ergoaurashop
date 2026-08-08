"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EDGE_70_PRO_PLUS_FOLDER } from "@/lib/motorola-edge-70-pro-plus-data";

export default function Edge70ProPlusFullWidthImage() {
  return (
    <section className="edge70proplus-fullwidth-section">
      <Image
        src={`/images/products/${EDGE_70_PRO_PLUS_FOLDER}/s-l1600 (3).webp`}
        alt="Motorola Edge 70 Pro+ 5G Design"
        fill
        className="edge70proplus-hero-fallback"
        priority
      />
      <div className="edge70proplus-fullwidth-overlay">
        <motion.p
          className="edge70proplus-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          6.7-inch 165Hz pOLED display. 5000mAh battery. Snapdragon 8s Gen
          4. 125W charging. Premium, redefined.
        </motion.p>
      </div>
    </section>
  );
}
