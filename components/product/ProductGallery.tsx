"use client";

import { useState } from "react";
import Image from "next/image";
import { ShopifyImage } from "@/lib/shopify/types";

interface ProductGalleryProps {
  images: ShopifyImage[];
  videoUrl?: string;
  productTitle: string;
}

export function ProductGallery({ images, videoUrl, productTitle }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="w-full aspect-square bg-gray-100 flex items-center justify-center">
        <span className="text-gray-400">No Image Available</span>
      </div>
    );
  }

  return (
    <div className="w-full relative flex flex-col">
      {/* Mobile Swipeable Carousel Area (and Desktop Main Image) */}
      <div 
        className="relative w-full aspect-square md:aspect-[4/5] bg-gray-50 overflow-hidden cursor-zoom-in"
        onClick={() => setIsZoomed(!isZoomed)}
      >
        {isZoomed ? (
          <div className="fixed inset-0 z-50 bg-black flex items-center justify-center cursor-zoom-out" onClick={() => setIsZoomed(false)}>
            <img 
              src={images[currentIndex].url} 
              alt={`${productTitle} - Zoomed`}
              className="w-full h-auto max-h-screen object-contain"
            />
            <button className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2" onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <>
            <Image
              src={images[currentIndex].url}
              alt={images[currentIndex].altText || productTitle}
              fill
              priority
              className="object-cover transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            
            {/* Video Play Button Overlay if first image and video exists */}
            {currentIndex === 0 && videoUrl && (
              <a 
                href={videoUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="absolute inset-0 flex items-center justify-center group"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="w-16 h-16 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-ergo-navy-deep ml-1">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                  </svg>
                </div>
              </a>
            )}
          </>
        )}
      </div>

      {/* Dots Indicator (Mobile) */}
      <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setCurrentIndex(i); }}
            className={`w-2.5 h-2.5 rounded-full ${i === currentIndex ? 'bg-ergo-navy-deep' : 'bg-gray-300'} transition-colors`}
          />
        ))}
      </div>

      {/* Thumbnail Strip (Desktop) */}
      <div className="hidden md:flex gap-3 mt-4 overflow-x-auto scrollbar-hide py-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden border-2 transition-colors ${i === currentIndex ? 'border-ergo-navy-deep' : 'border-transparent hover:border-gray-200'}`}
          >
            <Image src={img.url} alt={img.altText || `Thumbnail ${i}`} fill className="object-cover" sizes="80px" />
            {i === 0 && videoUrl && (
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-6 h-6 text-white">
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
