"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import ProductGrid from "@/components/products/ProductGrid";
import { cn } from "@/lib/utils";
import { LOCAL_PRODUCTS } from "@/lib/products-data";

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

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
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

        setProducts(result);
      } catch {
        // Fall back to local products on error
        let local = LOCAL_PRODUCTS;
        if (activeCategory !== "all") {
          local = local.filter((p) => p.category === activeCategory);
        }
        setProducts(local);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [activeCategory, sortBy]);

  return (
    <div className="pt-24 sm:pt-28">
      <div className="section-container">
        {/* Header */}
        <div className="mb-8">
          <h1 className="heading-lg mb-2">All Products</h1>
          <p className="text-apple-text-secondary">
            Discover premium wellness products for your everyday comfort
          </p>
        </div>

        {/* Filters bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-apple-border/50">
          {/* Category pills */}
          <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  activeCategory === cat.value
                    ? "bg-apple-black text-apple-white"
                    : "bg-apple-white border border-apple-border text-apple-text-secondary hover:border-apple-text-secondary",
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-apple w-full sm:w-auto text-sm"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Product grid */}
        <ProductGrid
          products={products}
          loading={loading}
          emptyMessage="No products found in this category."
        />
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-24 sm:pt-28">
          <div className="section-container">
            <div className="mb-8">
              <h1 className="heading-lg mb-2">All Products</h1>
              <p className="text-apple-text-secondary">Loading products...</p>
            </div>
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}
