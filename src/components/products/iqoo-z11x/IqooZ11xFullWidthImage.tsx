"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IQOO_Z11X_FOLDER } from "@/lib/iqoo-z11x-data";

export default function IqooZ11xFullWidthImage() {
  return (
    <section className="iqooz11x-fullwidth-section">
      <Image
        src={`/images/products/${IQOO_Z11X_FOLDER}/iqoo-z11x-sale-india-1773631047.webp`}
        alt="iQOO Z11x Design"
        fill
        className="iqooz11x-hero-fallback"
        priority
      />
      <div className="iqooz11x-fullwidth-overlay">
        <motion.p
          className="iqooz11x-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          120Hz FHD+ display. 6000mAh battery. Snapdragon 6 Gen 1. 44W
          FlashCharge charging. Gaming, redefined.
        </motion.p>
      </div>
    </section>
  );
}
