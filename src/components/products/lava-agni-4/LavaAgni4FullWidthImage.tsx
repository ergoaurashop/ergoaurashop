"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LAVA_AGNI_4_FOLDER } from "@/lib/lava-agni-4-data";

export default function LavaAgni4FullWidthImage() {
  return (
    <section className="lavaagni4-fullwidth-section">
      <Image
        src={`/images/products/${LAVA_AGNI_4_FOLDER}/lava-agni4-5.jpg`}
        alt="Lava Agni 4 Design"
        fill
        className="lavaagni4-hero-fallback"
        priority
      />
      <div className="lavaagni4-fullwidth-overlay">
        <motion.p
          className="lavaagni4-fullwidth-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          6.78-inch 120Hz curved AMOLED display. 5000mAh battery. Dimensity
          7300. 66W charging. Flagship, redefined.
        </motion.p>
      </div>
    </section>
  );
}
