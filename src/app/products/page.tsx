"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import ProductGrid from "@/components/products/ProductGrid";
import { cn } from "@/lib/utils";
import { LOCAL_PRODUCTS } from "@/lib/products-data";

const PAGE_SIZE = 12;

const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Wellness", value: "wellness" },
  { label: "Home & Kitchen", value: "kitchen" },
  { label: "Accessories", value: "accessories" },
  { label: "Personal Care", value: "personal-care" },
];

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A-Z", value: "name-asc" },
];

function ProductsContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("newest");

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = getSupabaseClient();
      let query = supabase.from("products").select("*");

      if (activeCategory !== "all") {
        query = query.eq("category", activeCategory);
      }

      const { data } = await query;
      let result = data && data.length > 0 ? data : [];

      // Fall back to local products if Supabase returned nothing
      if (result.length === 0) {
        let local = LOCAL_PRODUCTS;
        if (activeCategory !== "all") {
          local = local.filter((p) => p.category === activeCategory);
        }
        result = local;
      }

      // Sort
      switch (sortBy) {
        case "price-asc":
          result.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          result.sort((a, b) => b.price - a.price);
          break;
        case "name-asc":
          result.sort((a, b) => a.name.localeCompare(b.name));
          break;
        default:
          result.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime(),
          );
      }

      setAllProducts(result);
      setDisplayCount(PAGE_SIZE);
    } catch {
      // Fall back to local products on error
      let local = LOCAL_PRODUCTS;
      if (activeCategory !== "all") {
        local = local.filter((p) => p.category === activeCategory);
      }
      setAllProducts(local);
      setDisplayCount(PAGE_SIZE);
    } finally {
      setLoading(false);
    }
  }, [activeCategory, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    // Simulate network delay for smoother UX
    setTimeout(() => {
      setDisplayCount((prev) => prev + PAGE_SIZE);
      setIsLoadingMore(false);
    }, 400);
  }, []);

  const handleClearFilters = useCallback(() => {
    setActiveCategory("all");
    setSortBy("newest");
  }, []);

  const displayedProducts = allProducts.slice(0, displayCount);
  const hasMore = displayCount < allProducts.length;

  return (
    <div className="bg-[#F5F1EB] min-h-screen">
      {/* ===== Collection Header ===== */}
      <section className="relative pt-32 pb-12 md:pt-36 md:pb-16 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1614] via-[#1A1614] to-[#F5F1EB]" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
          <svg viewBox="0 0 200 200" fill="#C9A962" className="w-full h-full">
            <circle cx="100" cy="100" r="80" />
          </svg>
        </div>

        <div className="section-container relative z-10 text-center">
          <span className="type-overline-gold text-[#C9A962] tracking-[0.15em] uppercase">
            ErgoAura Collection
          </span>
          <h1 className="type-h1 text-[#F5F1EB] mt-2 mb-3">All Products</h1>
          <p className="type-body-lg text-[#D8CFBF] max-w-xl mx-auto">
            Discover premium wellness products designed for your everyday
            comfort and well-being
          </p>
        </div>
      </section>

      <div className="section-container pb-16">
        {/* ===== Filters Bar ===== */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#D8CFBF]/50">
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  activeCategory === cat.value
                    ? "bg-[#1A1614] text-[#F5F1EB] shadow-gold"
                    : "bg-white border border-[#D8CFBF] text-[#52525B] hover:border-[#C9A962] hover:text-[#C9A962]",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label
              htmlFor="sort-select"
              className="text-sm text-[#86868B] sr-only"
            >
              Sort by
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto text-sm bg-white border border-[#D8CFBF] rounded-xl px-4 py-2
                         text-[#1A1614] focus:outline-none focus:ring-2 focus:ring-[#C9A962]/40
                         focus:border-[#C9A962] transition-colors duration-200"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ===== Product Count ===== */}
        {!loading && allProducts.length > 0 && (
          <p className="text-sm text-[#86868B] mb-4">
            {allProducts.length}{" "}
            {allProducts.length === 1 ? "product" : "products"}
            {activeCategory !== "all" &&
              ` in ${CATEGORIES.find((c) => c.value === activeCategory)?.label}`}
          </p>
        )}

        {/* ===== Product Grid ===== */}
        <ProductGrid
          products={displayedProducts}
          loading={loading}
          hasMore={hasMore}
          onLoadMore={handleLoadMore}
          isLoadingMore={isLoadingMore}
          onClearFilters={handleClearFilters}
          pageSize={PAGE_SIZE}
          emptyMessage={`No products found in ${activeCategory !== "all" ? "this category" : "our collection"}.\nTry adjusting your filters.`}
        />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="bg-[#F5F1EB] min-h-screen pt-32 sm:pt-36">
          <div className="section-container">
            <div className="text-center mb-8">
              <span className="type-overline-gold text-[#C9A962] tracking-[0.15em] uppercase">
                ErgoAura Collection
              </span>
              <h1 className="type-h1 text-[#1A1614] mt-2 mb-3">All Products</h1>
              <p className="type-body-lg text-[#86868B]">Loading products...</p>
            </div>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
