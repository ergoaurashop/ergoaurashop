"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NORD_6_FOLDER } from "@/lib/oneplus-nord-6-data";

export default function Nord6FullWidthImage() {
  return (
    <section className="nord6-fullwidth-section">
      <Image
        src={`/images/products/${NORD_6_FOLDER}/s-l1600 (4).webp`}
        alt="OnePlus Nord 6 Design"
        fill
        className="nord6-hero-fallback"
        priority
      />
      <div className="nord6-fullwidth-overlay">
        <motion.p
          className="nord6-fullwidth-text"
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
