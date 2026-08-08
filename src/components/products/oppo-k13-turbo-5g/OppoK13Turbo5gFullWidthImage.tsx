"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { OPPO_K13_TURBO_5G_FOLDER } from "@/lib/oppo-k13-turbo-5g-data";

export default function OppoK13Turbo5gFullWidthImage() {
  return (
    <section className="oppok13turbo5g-fullwidth-section">
      <Image
        src={`/images/products/${OPPO_K13_TURBO_5G_FOLDER}/s-l1600 (5).webp`}
        alt="OPPO K13 Turbo 5G Design"
        fill
        className="oppok13turbo5g-hero-fallback"
        priority
      />
      <div className="oppok13turbo5g-fullwidth-overlay">
        <motion.p
          className="oppok13turbo5g-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          6.8-inch 120Hz AMOLED display. 7000mAh battery. Dimensity 8450. 80W
          charging. Endurance, redefined.
        </motion.p>
      </div>
    </section>
  );
}
