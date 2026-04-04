"use client";

import React, { useRef } from "react";

const CATEGORIES = [
  "All Deals",
  "Flash Sale",
  "Electronics",
  "Clothing",
  "Home & Living",
  "Fitness",
  "Clearance",
];

interface FilterPillsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

export function FilterPills({ activeCategory, onCategoryChange }: FilterPillsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section className="bg-white py-6 md:py-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div 
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto no-scrollbar pb-2 mask-linear-gradient"
        >
          {CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                whitespace-nowrap px-6 py-2.5 rounded-full text-xs md:text-sm font-black transition-all duration-300 border-2
                ${
                  activeCategory === category
                    ? "bg-[#0a0f1e] border-[#0a0f1e] text-white shadow-xl shadow-[#0a0f1e]/20"
                    : "bg-white border-[#f0f0f0] text-gray-400 hover:border-[#0a0f1e]/30 hover:text-ergo-navy"
                }
              `}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
