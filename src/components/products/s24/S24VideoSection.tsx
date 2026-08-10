"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { S24_PRODUCT_IMAGES, S24_FOLDER } from "@/lib/s24-ultra-data";

function getImagePath(filename: string): string {
  return `/images/products/${S24_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function S24VideoSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const fallbackImage = getImagePath(
    "galaxy-s24-ultra-highlights-high-resolution.jpg",
  );
  const videoSource = getImagePath(
    "galaxy-s24-ultra-highlights-form-factor.webm",
  );

  return (
    <section className="s24-video-section">
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
          <source src={videoSource} type="video/webm" />
          {/* Fallback text if video doesn't load */}
          Your browser does not support the video tag.
        </video>
      ) : (
        <Image
          src={fallbackImage}
          alt="Samsung Galaxy S24 Ultra"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover"
        />
      )}

      {/* Dark overlay for smooth transition */}
      <div className="s24-video-overlay">
        <motion.p
          className="s24-video-text"
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
