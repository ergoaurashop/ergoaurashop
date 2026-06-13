"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { LOCAL_PRODUCTS } from "@/lib/products-data";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Button from "@/components/ui/Button";

/* ─── Configuration ─────────────────────────────────────────────── */
const PRODUCTS_PER_SET = 4; // desktop cards per set
const PRODUCTS_TO_FETCH = 12; // 12 products = 3 sets of 4
const TRANSITION_DURATION = 0.35; // seconds
const GAP_MS = 1000; // 1-second visible gap between transitions
const CYCLE_MS = GAP_MS + TRANSITION_DURATION * 1000; // ~1350ms per cycle

/* ─── Animation helper ──────────────────────────────────────────── */
/**
 * Returns Framer Motion props per card index.
 * Cards in the left half → exit/enter from/to the left.
 * Cards in the right half → exit/enter from/to the right.
 */
function cardSlideProps(index: number, totalInSet: number) {
  const isLeft = index < Math.ceil(totalInSet / 2);
  const offset = isLeft ? -260 : 260;
  return {
    initial: { x: offset, opacity: 0, scale: 0.96 },
    animate: { x: 0, opacity: 1, scale: 1 },
    exit: { x: offset, opacity: 0, scale: 0.96 },
    transition: {
      duration: TRANSITION_DURATION,
      ease: [0.4, 0, 0.2, 1] as [number, number, number, number],
    },
  };
}

/* ─── Component ─────────────────────────────────────────────────── */
export default function HeroProductShowcase() {
  /* ── Data ──────────────────────────────────────────────────── */
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  /* ── Carousel state ────────────────────────────────────────── */
  const [currentSet, setCurrentSet] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* ── Fetch products (same pattern as page.tsx) ─────────────── */
  useEffect(() => {
    let cancelled = false;
    async function fetch() {
      try {
        const supabase = getSupabaseClient();
        const { data } = await supabase
          .from("products")
          .select("*")
          .limit(PRODUCTS_TO_FETCH);
        if (!cancelled) {
          if (data && data.length > 0) {
            setProducts(data.slice(0, PRODUCTS_TO_FETCH));
          } else {
            setProducts(LOCAL_PRODUCTS.slice(0, PRODUCTS_TO_FETCH));
          }
        }
      } catch {
        if (!cancelled) {
          setProducts(LOCAL_PRODUCTS.slice(0, PRODUCTS_TO_FETCH));
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetch();
    return () => {
      cancelled = true;
    };
  }, []);

  const totalSets = Math.ceil(products.length / PRODUCTS_PER_SET);

  /* ── Derive current visible items ──────────────────────────── */
  const startIdx = currentSet * PRODUCTS_PER_SET;
  const currentProducts = products.slice(startIdx, startIdx + PRODUCTS_PER_SET);

  // For mobile we cycle through individual products
  const mobileIdx = currentSet % Math.max(products.length, 1);
  const currentMobileProduct = products[mobileIdx];

  /* ── Direction toggles each step for alternating mobile slide ─ */
  const directionRef = useRef(1);

  /* ── Advance to next set ───────────────────────────────────── */
  const advance = useCallback(() => {
    setCurrentSet((prev) => (prev + 1) % Math.max(totalSets, 1));
    directionRef.current *= -1;
  }, [totalSets]);

  /* ── Auto-rotation interval ────────────────────────────────── */
  const startInterval = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (loading || products.length === 0 || totalSets <= 1) return;
    intervalRef.current = setInterval(advance, CYCLE_MS);
  }, [loading, products.length, totalSets, advance]);

  useEffect(() => {
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startInterval]);

  /* ── Pause / resume on hover ───────────────────────────────── */
  const handleMouseEnter = useCallback(() => {
    setIsPaused(true);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    if (!loading && products.length > 0 && totalSets > 1) {
      intervalRef.current = setInterval(advance, CYCLE_MS);
    }
  }, [loading, products.length, totalSets, advance]);

  /* ── Manual dot navigation ─────────────────────────────────── */
  const goToSet = useCallback(
    (setIndex: number) => {
      setCurrentSet(setIndex);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      if (!isPaused && !loading && products.length > 0 && totalSets > 1) {
        intervalRef.current = setInterval(advance, CYCLE_MS);
      }
    },
    [isPaused, loading, products.length, totalSets, advance],
  );

  /* ═════════════════════════════════════════════════════════════ */
  /*  RENDER                                                      */
  /* ═════════════════════════════════════════════════════════════ */

  /* ── Loading state ─────────────────────────────────────────── */
  if (loading) {
    return (
      <section className="bg-white border-b border-[#EAE3D5]/50 py-12 sm:py-16 lg:py-20">
        <div className="section-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={`hero-sk-${i}`} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* ── Empty / error state — graceful degradation ────────────── */
  if (products.length === 0) return null;

  /* ── Main render ───────────────────────────────────────────── */
  return (
    <section
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative bg-gradient-to-b from-[#F5F1EB] to-white border-b border-[#EAE3D5]/50 py-12 sm:py-16 lg:py-20 overflow-hidden select-none"
    >
      <div className="section-container">
        {/* ─── Mobile Layout (< lg) ──────────────────────────── */}
        <div className="lg:hidden">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="type-overline-gold text-[#C9A962] tracking-[0.15em] uppercase">
              Best Sellers
            </span>
            <h2 className="type-h2 text-[#1A1614] mt-1 mb-3">
              Top-Rated Wellness Picks
            </h2>
            <p className="type-body-lg text-[#86868B] max-w-xl mx-auto">
              Handpicked products our customers love most
            </p>
          </div>

          {/* Single product card — centered, with alternating slide */}
          <div className="relative max-w-sm mx-auto">
            <AnimatePresence mode="popLayout">
              {currentMobileProduct && (
                <motion.div
                  key={currentMobileProduct.id}
                  layout
                  initial={{
                    x: directionRef.current > 0 ? 200 : -200,
                    opacity: 0,
                  }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{
                    x: directionRef.current > 0 ? -200 : 200,
                    opacity: 0,
                  }}
                  transition={{
                    duration: TRANSITION_DURATION,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                >
                  <ProductCard product={currentMobileProduct} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Dots indicator */}
          {totalSets > 1 && (
            <div className="flex items-center justify-center gap-2 mt-6">
              {Array.from({ length: totalSets }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSet(i)}
                  aria-label={`Show product set ${i + 1}`}
                  className={
                    i === currentSet
                      ? "w-6 h-2 rounded-full bg-[#C9A962] transition-all duration-300"
                      : "w-2 h-2 rounded-full bg-[#D8CFBF] hover:bg-[#C9A962]/50 transition-all duration-200 cursor-pointer"
                  }
                />
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="text-center mt-8">
            <Link href="/products">
              <Button size="lg">Shop All Products</Button>
            </Link>
          </div>
        </div>

        {/* ─── Desktop Layout (lg+) ──────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-[35%_65%] gap-8 items-center">
          {/* ══ Left: Value Proposition ══ */}
          <div>
            <span className="type-overline-gold text-[#C9A962] tracking-[0.15em] uppercase">
              Best Sellers
            </span>
            <h2 className="type-h2 text-[#1A1614] mt-1 mb-3">
              Top-Rated
              <br />
              Wellness Picks
            </h2>
            <p className="type-body-lg text-[#86868B] mb-8">
              Handpicked products our
              <br />
              customers love most
            </p>
            <Link href="/products">
              <Button size="lg">Shop All Products</Button>
            </Link>
          </div>

          {/* ══ Right: Product Grid with Split Animation ══ */}
          <div className="relative">
            <div className="grid grid-cols-4 gap-3">
              <AnimatePresence mode="popLayout">
                {currentProducts.map((product, idx) => {
                  const anim = cardSlideProps(idx, currentProducts.length);
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={anim.initial}
                      animate={anim.animate}
                      exit={anim.exit}
                      transition={anim.transition}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Dots indicator */}
            {totalSets > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: totalSets }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSet(i)}
                    aria-label={`Show product set ${i + 1}`}
                    className={
                      i === currentSet
                        ? "w-6 h-2 rounded-full bg-[#C9A962] transition-all duration-300"
                        : "w-2 h-2 rounded-full bg-[#D8CFBF] hover:bg-[#C9A962]/50 transition-all duration-200 cursor-pointer"
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
