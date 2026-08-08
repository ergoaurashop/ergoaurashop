"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IQOO_15R_FOLDER } from "@/lib/iqoo-15r-data";

export default function Iqoo15rFullWidthImage() {
  return (
    <section className="iqoo15r-fullwidth-section">
      <Image
        src={`/images/products/${IQOO_15R_FOLDER}/s-l1600 (4).webp`}
        alt="iQOO 15R Design"
        fill
        className="iqoo15r-hero-fallback"
        priority
      />
      <div className="iqoo15r-fullwidth-overlay">
        <motion.p
          className="iqoo15r-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          6.59-inch 144Hz 1.5K AMOLED display. 7600mAh battery. Snapdragon 8 Gen
          5. 100W charging. Endurance, redefined.
        </motion.p>
      </div>
    </section>
  );
}
