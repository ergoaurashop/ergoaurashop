"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Collection } from "@/lib/shopify/types";

interface CategorySliderProps {
  collections: Omit<Collection, "products">[];
}

export function CategorySlider({ collections }: CategorySliderProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  if (!collections || collections.length === 0) return null;

  return (
    <div className="relative bg-white border-b border-gray-200 overflow-hidden">
      <div className="max-w-7xl mx-auto relative group">
        {/* Left Arrow (Desktop only, shows on exact hover) */}
        <button
          onClick={scrollLeft}
          className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center bg-white/95 rounded-full shadow-md border border-gray-100 text-gray-700 hover:text-ergo-navy hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Scroll left"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex items-start gap-4 md:gap-8 px-5 md:px-8 py-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-smooth snap-x snap-mandatory after:content-[''] after:w-1 after:flex-shrink-0"
        >
          {collections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="flex flex-col items-center gap-2 min-w-[72px] sm:min-w-[80px] snap-start group/item"
              prefetch={false}
            >
              <div className="w-16 h-16 rounded-full overflow-hidden bg-ergo-surface border border-transparent flex-shrink-0 group-hover/item:border-ergo-navy transition-colors relative shadow-sm">
                {collection.image ? (
                  <Image
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100 border border-gray-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                    </svg>
                  </div>
                )}
              </div>
              <span className="text-[11px] sm:text-xs text-center font-medium text-ergo-text leading-tight line-clamp-2 max-w-full">
                {collection.title}
              </span>
            </Link>
          ))}
        </div>

        {/* Right Arrow (Desktop only, shows on exact hover) */}
        <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 items-center justify-center bg-white/95 rounded-full shadow-md border border-gray-100 text-gray-700 hover:text-ergo-navy hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
          aria-label="Scroll right"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
