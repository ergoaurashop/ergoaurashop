"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { S23_PRODUCT_IMAGES, S23_FOLDER } from "@/lib/s23-ultra-data";

function getImagePath(filename: string): string {
  return `/images/products/${S23_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function S23FullWidthImage() {
  // Use a real hero shot from the product images list
  const imageFile =
    S23_PRODUCT_IMAGES[0] || "galaxy-s23-ultra-highlights-kv-1.jpg";

  // Secondary fallback if first image fails
  const fallbackImage =
    S23_PRODUCT_IMAGES.length > 1
      ? getImagePath(S23_PRODUCT_IMAGES[1])
      : getImagePath("galaxy-s23-ultra-highlights-camera-1.jpg");

  return (
    <section className="s23-fullwidth-section">
      <Image
        src={getImagePath(imageFile)}
        alt="Samsung Galaxy S23 Ultra — Premium flagship experience"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          if (target && fallbackImage) {
            target.src = fallbackImage;
          }
        }}
      />
      <div className="s23-fullwidth-overlay">
        <motion.p
          className="s23-fullwidth-text"
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
