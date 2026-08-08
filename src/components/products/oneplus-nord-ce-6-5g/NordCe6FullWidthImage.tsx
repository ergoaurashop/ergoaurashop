"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { NORD_CE6_FOLDER } from "@/lib/oneplus-nord-ce-6-5g-data";

export default function NordCe6FullWidthImage() {
  return (
    <section className="nordce6-fullwidth-section">
      <Image
        src={`/images/products/${NORD_CE6_FOLDER}/s-l1600.webp`}
        alt="OnePlus Nord CE 6 5G Design"
        fill
        className="nordce6-hero-fallback"
        priority
      />
      <div className="nordce6-fullwidth-overlay">
        <motion.p
          className="nordce6-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          120Hz Fluid AMOLED display. 80W SUPERVOOC charging. 50MP OIS camera.
          5500mAh battery. Core, perfected.
        </motion.p>
      </div>
    </section>
  );
}
