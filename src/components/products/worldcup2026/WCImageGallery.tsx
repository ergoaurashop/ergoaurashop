"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface WCImageGalleryProps {
  images: string[];
  folder: string;
  productName: string;
}

/**
 * WCImageGallery — Amazon-style image gallery with thumbnails.
 * Displays a main image with clickable thumbnail strip.
 */
export default function WCImageGallery({
  images,
  folder,
  productName,
}: WCImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const thumbnailsRef = useRef<HTMLDivElement>(null);

  const buildImageUrl = useCallback(
    (img: string) =>
      `/images/products/${folder.split("/").map(encodeURIComponent).join("/")}/${img.split("/").map(encodeURIComponent).join("/")}`,
    [folder],
  );

  const handleThumbnailClick = (index: number) => {
    setSelectedIndex(index);
    // Scroll thumbnail into view
    if (thumbnailsRef.current) {
      const thumb = thumbnailsRef.current.children[index] as HTMLElement;
      if (thumb) {
        thumb.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  };

  const handlePrevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  if (!images || images.length === 0) {
    return (
      <div className="wc2026-gallery">
        <div className="wc2026-main-image">
          <div style={{ color: "#999", fontSize: 14 }}>No image available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="wc2026-gallery">
      {/* Main image */}
      <div className="wc2026-main-image">
        <img
          key={selectedIndex}
          src={buildImageUrl(images[selectedIndex])}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          draggable={false}
        />

        {/* Navigation arrows on desktop */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrevImage}
              style={{
                position: "absolute",
                left: 8,
                top: "50%",
                transform: "translateY(-50%)",
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid #ddd",
                background: "rgba(255,255,255,0.9)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                color: "#333",
                opacity: 0,
                transition: "opacity 0.2s",
              }}
              className="gallery-nav gallery-nav-prev"
              aria-label="Previous image"
              onMouseEnter={(e) => {
                const parent = (e.target as HTMLElement).closest(
                  ".wc2026-main-image",
                );
                if (parent) {
                  parent.querySelectorAll(".gallery-nav").forEach((el) => {
                    (el as HTMLElement).style.opacity = "1";
                  });
                }
              }}
            >
              ‹
            </button>
            <button
              onClick={handleNextImage}
              style={{
                position: "absolute",
                right: 8,
                top: "50%",
                transform: "translateY(-50%)",
                width: 36,
                height: 36,
                borderRadius: "50%",
                border: "1px solid #ddd",
                background: "rgba(255,255,255,0.9)",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 18,
                color: "#333",
                opacity: 0,
                transition: "opacity 0.2s",
              }}
              className="gallery-nav gallery-nav-next"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="wc2026-thumbnails" ref={thumbnailsRef}>
          {images.map((img, i) => (
            <button
              key={i}
              className={`wc2026-thumb ${i === selectedIndex ? "active" : ""}`}
              onClick={() => handleThumbnailClick(i)}
              aria-label={`View image ${i + 1}`}
            >
              <img
                src={buildImageUrl(img)}
                alt={`${productName} thumbnail ${i + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
