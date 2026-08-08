"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { VIVO_V70_ELITE_FOLDER } from "@/lib/vivo-v70-elite-data";

export default function VivoV70EliteFullWidthImage() {
  return (
    <section className="vivov70elite-fullwidth-section">
      <Image
        src={`/images/products/${VIVO_V70_ELITE_FOLDER}/s-l1600 (4).webp`}
        alt="vivo V70 Elite Design"
        fill
        className="vivov70elite-hero-fallback"
        priority
      />
      <div className="vivov70elite-fullwidth-overlay">
        <motion.p
          className="vivov70elite-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          6.78-inch 120Hz 1.5K Curved AMOLED display. 5500mAh battery. Dimensity
          8300. 80W FlashCharge. Portraiture, redefined.
        </motion.p>
      </div>
    </section>
  );
}
