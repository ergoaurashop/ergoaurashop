"use client";

import React, { useState, useMemo } from "react";
import { Product, Collection } from "@/lib/shopify/types";
import { DealsHero } from "./DealsHero";
import { StatsBar } from "./StatsBar";
import { FilterPills } from "./FilterPills";
import { FeaturedDeals } from "./FeaturedDeals";
import { PromoStrip } from "./PromoStrip";
import { DealCard } from "./DealCard";

interface DealsPageClientProps {
  initialCollection: Collection;
}

export function DealsPageClient({ initialCollection }: DealsPageClientProps) {
  const [activeCategory, setActiveCategory] = useState("All Deals");
  const [products, setProducts] = useState<Product[]>(
    initialCollection.products.edges.map((e) => e.node)
  );
  const [pageInfo, setPageInfo] = useState(initialCollection.products.pageInfo);
  const [isLoading, setIsLoading] = useState(false);

  // Sorting: By discount percentage highest first
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      const aPrice = parseFloat(a.priceRange.minVariantPrice.amount);
      const aCompare = parseFloat(a.compareAtPriceRange?.minVariantPrice.amount || "0");
      const aDiscount = aCompare > aPrice ? (aCompare - aPrice) / aCompare : 0;

      const bPrice = parseFloat(b.priceRange.minVariantPrice.amount);
      const bCompare = parseFloat(b.compareAtPriceRange?.minVariantPrice.amount || "0");
      const bDiscount = bCompare > bPrice ? (bCompare - bPrice) / bCompare : 0;

      return bDiscount - aDiscount;
    });
  }, [products]);

  // Filtering: Based on product type / tags
  const filteredProducts = useMemo(() => {
    if (activeCategory === "All Deals") return sortedProducts;

    const categoryMap: Record<string, string> = {
      "Flash Sale": "Flash Sale",
      "Electronics": "Electronics",
      "Clothing": "Clothing",
      "Home & Living": "Home & Living",
      "Fitness": "Fitness",
      "Clearance": "Clearance",
    };

    const targetType = categoryMap[activeCategory];
    return sortedProducts.filter((p) => {
      return p.productType === targetType || p.tags.includes(targetType);
    });
  }, [sortedProducts, activeCategory]);

  // ─── Load More — calls our server-side API route (not server function directly) ─
  const handleLoadMore = async () => {
    if (!pageInfo.hasNextPage || isLoading) return;
    setIsLoading(true);

    try {
      const params = new URLSearchParams({
        handle: "deals",
        ...(pageInfo.endCursor ? { cursor: pageInfo.endCursor } : {}),
      });
      const res = await fetch(`/api/collections?${params.toString()}`);
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const { collection } = await res.json();
      if (collection) {
        const newProducts: Product[] = collection.products.edges.map(
          (e: { node: Product }) => e.node
        );
        setProducts((prev) => [...prev, ...newProducts]);
        setPageInfo(collection.products.pageInfo);
      }
    } catch (error) {
      console.error("[DealsPageClient] Failed to load more:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen">
      <DealsHero />
      <StatsBar />
      <FilterPills
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      {/* Featured Section — top 3 when on "All Deals" */}
      {activeCategory === "All Deals" && products.length >= 3 && (
        <FeaturedDeals products={products.slice(0, 3)} />
      )}

      {/* Main Grid */}
      <section className="py-12 md:py-20 bg-[#f8f8f8]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-xl md:text-3xl font-black text-[#0a0f1e] uppercase tracking-tight">
              {activeCategory}{" "}
              <span className="text-[#ff4d00]/40 text-sm ml-2 font-bold tracking-widest">
                {filteredProducts.length} ITEMS
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id}>
                <DealCard product={product} />
              </div>
            ))}
          </div>

          {/* Load More */}
          {pageInfo.hasNextPage && (
            <div className="mt-12 md:mt-16 flex justify-center">
              <button
                onClick={handleLoadMore}
                disabled={isLoading}
                className="group relative flex items-center justify-center h-14 px-12 border-2 border-[#0a0f1e] text-[#0a0f1e] rounded-full font-black text-sm uppercase tracking-widest hover:bg-[#0a0f1e] hover:text-white transition-all duration-300 active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-[#0a0f1e] border-t-transparent rounded-full animate-spin group-hover:border-white group-hover:border-t-transparent" />
                ) : (
                  "LOAD MORE DEALS"
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      <PromoStrip />
    </div>
  );
}
