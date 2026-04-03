"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const SLIDES = [
  {
    id: 1,
    headline: "Live Aligned.",
    subtitle: "Discover products designed for pure comfort and modern aesthetics.",
    cta: "Shop Now",
    gradient: "from-ergo-navy-deep to-ergo-navy",
    link: "/collections/new-arrivals"
  },
  {
    id: 2,
    headline: "Premium Quality.",
    subtitle: "Built to last. Experience the best in contemporary design.",
    cta: "Explore Highlights",
    gradient: "from-ergo-navy to-ergo-navy-deep",
    link: "/collections/best-sellers"
  },
  {
    id: 3,
    headline: "Limited Edition.",
    subtitle: "Get exclusive access to our newest drops before they sell out.",
    cta: "View Offers",
    gradient: "from-ergo-navy-deep via-ergo-navy to-ergo-navy-deep",
    link: "/collections/special-offers"
  }
];

export function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
      {/* Slides Container */}
      <div 
        className="flex w-full h-full transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {SLIDES.map((slide) => (
          <div 
            key={slide.id}
            className={`w-full h-full flex-shrink-0 flex items-center justify-center bg-gradient-to-br ${slide.gradient} px-6 text-center`}
          >
            <div className="max-w-2xl text-white space-y-4 md:space-y-6">
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                {slide.headline}
              </h1>
              <p className="text-lg md:text-xl font-medium text-white/90 max-w-xl mx-auto">
                {slide.subtitle}
              </p>
              <div className="pt-4 md:pt-6">
                <Link 
                  href={slide.link}
                  className="inline-block bg-ergo-orange hover:bg-orange-500 text-white font-bold text-lg px-8 py-3.5 rounded-xl transition-all hover:scale-105 shadow-lg"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2.5 z-10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-white w-8" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
