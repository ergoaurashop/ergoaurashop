"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EDGE_70_FUSION_FOLDER } from "@/lib/motorola-edge-70-fusion-data";

export default function Edge70FusionFullWidthImage() {
  return (
    <section className="edge70fusion-fullwidth-section">
      <Image
        src={`/images/products/${EDGE_70_FUSION_FOLDER}/455116-687786.avif`}
        alt="Motorola Edge 70 Fusion Design"
        fill
        className="edge70fusion-hero-fallback"
        priority
      />
      <div className="edge70fusion-fullwidth-overlay">
        <motion.p
          className="edge70fusion-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          7000mAh silicon-carbon battery. 144Hz Extreme AMOLED display.
          Snapdragon 7s Gen 3. Military-grade toughness. The ultimate endurance
          phone.
        </motion.p>
      </div>
    </section>
  );
}
