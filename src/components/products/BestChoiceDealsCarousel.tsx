"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { LOCAL_PRODUCTS } from "@/lib/products-data";
import ProductCard from "./ProductCard";

interface BestChoiceDealsCarouselProps {
  /**
   * Product category slug to filter LOCAL_PRODUCTS by (e.g. "phones").
   * Designed to be future-proof — switching this section to a new category
   * in the future only requires changing this one prop.
   */
  category: string;
  /** Section heading text */
  heading: string;
  /** Optional subheading shown under the heading */
  subheading?: string;
}

/**
 * BestChoiceDealsCarousel — horizontal sliding product grid.
 * Renders a scrollable row of ProductCards for a given category with
 * prev/next arrow buttons and snap scrolling. The category is a prop so
 * the section can be repurposed for any category later.
 */
export default function BestChoiceDealsCarousel({
  category,
  heading,
  subheading,
}: BestChoiceDealsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const products: Product[] = LOCAL_PRODUCTS.filter(
    (p) => p.category === category && p.is_active,
  );

  const scrollAmount = () => {
    const el = trackRef.current;
    if (!el) return 320;
    return el.clientWidth * 0.8;
  };

  const scrollLeft = () => {
    trackRef.current?.scrollBy({ left: -scrollAmount(), behavior: "smooth" });
  };

  const scrollRight = () => {
    trackRef.current?.scrollBy({ left: scrollAmount(), behavior: "smooth" });
  };

  if (products.length === 0) return null;

  return (
    <section className="bg-[#F5F1EB] py-12 sm:py-16 overflow-hidden">
      <div className="section-container">
        {/* ===== Header ===== */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between gap-4 mb-8 flex-wrap"
        >
          <div>
            <p className="text-[#C9A962] font-semibold tracking-[0.2em] uppercase text-xs mb-2">
              {category}
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1614]">
              {heading}
            </h2>
            {subheading && (
              <p className="mt-2 text-[#86868B] text-sm sm:text-base max-w-xl">
                {subheading}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={scrollLeft}
              aria-label="Scroll deals left"
              className="w-10 h-10 rounded-full border border-[#D8CFBF] bg-white text-[#1A1614] flex items-center justify-center hover:bg-[#1A1614] hover:text-white hover:border-[#1A1614] transition-colors cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={scrollRight}
              aria-label="Scroll deals right"
              className="w-10 h-10 rounded-full border border-[#D8CFBF] bg-white text-[#1A1614] flex items-center justify-center hover:bg-[#1A1614] hover:text-white hover:border-[#1A1614] transition-colors cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
            <Link
              href={`/products?category=${encodeURIComponent(category)}`}
              className="ml-1 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1A1614] hover:text-[#C9A962] transition-colors"
            >
              View all
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </motion.div>

        {/* ===== Sliding Track ===== */}
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-1 px-1 [scrollbar-width:thin]"
          role="region"
          aria-label={heading}
        >
          {products.map((product, i) => (
            <div
              key={product.slug}
              className="snap-start shrink-0 w-[260px] sm:w-[280px]"
            >
              <ProductCard product={product} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
