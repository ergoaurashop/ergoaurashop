"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { S24_PRODUCT_IMAGES, S24_FOLDER } from "@/lib/s24-ultra-data";

function getImagePath(filename: string): string {
  return `/images/products/${S24_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function S24FullWidthImage() {
  // Use a real hero shot from the product images list
  const imageFile =
    S24_PRODUCT_IMAGES[0] || "galaxy-s24-ultra-highlights-kv.jpg";

  // Secondary fallback if first image fails
  const fallbackImage =
    S24_PRODUCT_IMAGES.length > 1
      ? getImagePath(S24_PRODUCT_IMAGES[1])
      : getImagePath("galaxy-s24-ultra-highlights-high-resolution.jpg");

  return (
    <section className="s24-fullwidth-section">
      <Image
        src={getImagePath(imageFile)}
        alt="Samsung Galaxy S24 Ultra — Premium flagship experience"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (target && fallbackImage) {
            target.src = fallbackImage;
          }
        }}
      />
      <div className="s24-fullwidth-overlay">
        <motion.p
          className="s24-fullwidth-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          The smartphone that redefined what a flagship can be — now within
          everyone's reach
        </motion.p>
      </div>
    </section>
  );
}
