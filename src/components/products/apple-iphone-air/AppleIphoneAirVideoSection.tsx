"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { APPLE_IPHONE_AIR_FOLDER } from "@/lib/apple-iphone-air-data";

export default function AppleIphoneAirVideoSection() {
  return (
    <section className="appleiphoneair-video-section">
      <Image
        src={`/images/products/${APPLE_IPHONE_AIR_FOLDER}/camera__gl56mvovq6qi_large_2x.jpg`}
        alt="Apple iPhone Air camera"
        fill
        style={{ objectFit: "cover" }}
        priority
      />
      <div className="appleiphoneair-video-overlay">
        <motion.h2
          className="appleiphoneair-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Featherlight. Full flagship.
          <br />
          <span
            style={{
              color: "var(--appleiphoneair-text-tertiary)",
              fontSize: "0.7em",
              display: "block",
              marginTop: "0.5rem",
            }}
          >
            6.6-inch OLED. A19. 48MP Fusion camera. Ultra-thin design.
          </span>
        </motion.h2>
      </div>
    </section>
  );
}
