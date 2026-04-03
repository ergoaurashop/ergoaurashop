"use client";

import React from "react";

interface CarouselArrowProps {
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
}

export function CarouselArrows({ onPrev, onNext, canPrev, canNext }: CarouselArrowProps) {
  return (
    <>
      {/* Left Arrow */}
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-white/90 shadow-lg border border-ergo-border text-ergo-navy hover:bg-ergo-white hover:text-ergo-orange transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed group active:scale-95"
        aria-label="Previous slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:-translate-x-0.5 transition-transform"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={onNext}
        disabled={!canNext}
        className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 w-10 h-10 items-center justify-center rounded-full bg-white/90 shadow-lg border border-ergo-border text-ergo-navy hover:bg-ergo-white hover:text-ergo-orange transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed group active:scale-95"
        aria-label="Next slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="group-hover:translate-x-0.5 transition-transform"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
    </>
  );
}
