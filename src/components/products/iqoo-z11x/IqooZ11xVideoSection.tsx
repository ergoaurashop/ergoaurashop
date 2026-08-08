"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IQOO_Z11X_FOLDER } from "@/lib/iqoo-z11x-data";

export default function IqooZ11xVideoSection() {
  return (
    <section className="iqooz11x-video-section">
      <Image
        src={`/images/products/${IQOO_Z11X_FOLDER}/s-l1600 (1).webp`}
        alt="iQOO Z11x design"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="iqooz11x-video-overlay">
        <motion.h2
          className="iqooz11x-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Charge in minutes. Live all day.
          <br />
          <span
            style={{
              color: "var(--iqooz11x-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            44W FlashCharge. 6000mAh battery. Snapdragon 6 Gen 1.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
