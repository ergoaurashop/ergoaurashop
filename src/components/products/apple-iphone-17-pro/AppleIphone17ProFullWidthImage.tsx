"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { APPLE_IPHONE_17_PRO_FOLDER } from "@/lib/apple-iphone-17-pro-data";

export default function AppleIphone17ProFullWidthImage() {
  return (
    <section className="appleiphone17pro-fullwidth-section">
      <Image
        src={`/images/products/${APPLE_IPHONE_17_PRO_FOLDER}/iphone-17-pro-finish-select-202509-6-3inch-cosmicorange.webp`}
        alt="Apple iPhone 17 Pro Design"
        fill
        className="appleiphone17pro-hero-fallback"
        priority
      />
      <div className="appleiphone17pro-fullwidth-overlay">
        <motion.p
          className="appleiphone17pro-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          6.3-inch 120Hz ProMotion OLED display. A19 Pro. Triple 48MP camera.
          Titanium build. Premium, redefined.
        </motion.p>
      </div>
    </section>
  );
}
