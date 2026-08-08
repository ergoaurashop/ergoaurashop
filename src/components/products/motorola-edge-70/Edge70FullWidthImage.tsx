"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EDGE_70_FOLDER } from "@/lib/motorola-edge-70-data";

export default function Edge70FullWidthImage() {
  return (
    <section className="edge70-fullwidth-section">
      <Image
        src={`/images/products/${EDGE_70_FOLDER}/s-l1600.webp`}
        alt="Motorola Edge 70 Design"
        fill
        className="edge70-hero-fallback"
        priority
      />
      <div className="edge70-fullwidth-overlay">
        <motion.p
          className="edge70-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          144Hz 1.5K pOLED display. 125W TurboPower charging. 50MP OIS camera.
          Vegan leather & IP68. Premium, redefined.
        </motion.p>
      </div>
    </section>
  );
}
