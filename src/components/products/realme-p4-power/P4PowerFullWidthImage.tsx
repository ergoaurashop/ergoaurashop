"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { P4POWER_FOLDER } from "@/lib/realme-p4-power-data";

export default function P4PowerFullWidthImage() {
  return (
    <section className="p4power-fullwidth-section">
      <Image
        src={`/images/products/${P4POWER_FOLDER}/41ouGJSztZL.jpg`}
        alt="realme P4 Power Design"
        fill
        className="p4power-hero-fallback"
        priority
      />
      <div className="p4power-fullwidth-overlay">
        <motion.p
          className="p4power-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          144Hz AMOLED display. 10001mAh battery. Dimensity 7400 Ultra. 80W
          SuperVOOC charging. Power, perfected.
        </motion.p>
      </div>
    </section>
  );
}
