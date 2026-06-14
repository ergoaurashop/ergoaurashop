"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { S23_PRODUCT_IMAGES, S23_FOLDER } from "@/lib/s23-ultra-data";

function getImagePath(filename: string): string {
  return `/images/products/${S23_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function S23VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const fallbackImage = getImagePath(
    S23_PRODUCT_IMAGES[0] || "galaxy-s23-ultra-highlights-kv-1.jpg",
  );

  return (
    <section className="s23-video-section">
      {!videoError ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="w-full h-full object-cover"
          onError={() => setVideoError(true)}
        >
          <source src="/videos/s23-ultra-promo.mp4" type="video/mp4" />
          {/* Fallback text if video doesn't load */}
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={fallbackImage}
          alt="Samsung Galaxy S23 Ultra"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Dark overlay for smooth transition */}
      <div className="s23-video-overlay">
        <motion.p
          className="s23-video-text"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        >
          Experience the Future of Mobile Innovation
        </motion.p>
      </div>
    </section>
  );
}
