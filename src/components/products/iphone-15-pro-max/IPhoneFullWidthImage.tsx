"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IPHONE_FOLDER } from "@/lib/iphone-15-pro-max-data";

export default function IPhoneFullWidthImage() {
  return (
    <section className="iphone-fullwidth-section">
      <Image
        src={`/images/products/${IPHONE_FOLDER}/Apple-iPhone-15-Pro-lineup-design-230912_big.jpg.large_2x.jpg`}
        alt="iPhone 15 Pro Max Titanium Design"
        fill
        className="iphone-hero-fallback"
        priority
      />
      <div className="iphone-fullwidth-overlay">
        <motion.p
          className="iphone-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          Aerospace-grade titanium. A17 Pro chip. Pro camera system with 5x
          optical zoom. The ultimate iPhone experience.
        </motion.p>
      </div>
    </section>
  );
}
