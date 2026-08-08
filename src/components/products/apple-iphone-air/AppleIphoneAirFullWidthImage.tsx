"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { APPLE_IPHONE_AIR_FOLDER } from "@/lib/apple-iphone-air-data";

export default function AppleIphoneAirFullWidthImage() {
  return (
    <section className="appleiphoneair-fullwidth-section">
      <Image
        src={`/images/products/${APPLE_IPHONE_AIR_FOLDER}/iPhone_Air_Sky_Blue_PDP_Image_Position_3__en-AE.webp`}
        alt="Apple iPhone Air Design"
        fill
        className="appleiphoneair-hero-fallback"
        priority
      />
      <div className="appleiphoneair-fullwidth-overlay">
        <motion.p
          className="appleiphoneair-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          6.6-inch Super Retina XDR OLED display. A19. 48MP Fusion camera.
          Ultra-thin design. Premium, redefined.
        </motion.p>
      </div>
    </section>
  );
}
