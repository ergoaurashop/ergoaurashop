import { Metadata } from "next";
import { shopifyFetch, GET_SEARCH_RESULTS } from "@/lib/shopify";
import { Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/ProductCard";
import { Suspense } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Search Results | ErgoAura",
  description: "Search for premium ergonomic products.",
};

// Use dynamic rendering since search relies on URL params
export const dynamic = "force-dynamic";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  const query = q || "";

  let products: Product[] = [];
  
  if (query) {
    try {
      const data = await shopifyFetch<{ search: { edges: { node: Product }[] } }>({
        query: GET_SEARCH_RESULTS,
        variables: { query, first: 24 },
      });
      products = data.search?.edges.map(e => e.node) || [];
    } catch (e) {
      console.error("Search failed:", e);
    }
  }

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      <div className="bg-ergo-surface py-12 md:py-16 border-b border-ergo-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-ergo-navy-deep tracking-tighter mb-4">
            {query ? `Results for "${query}"` : "Search"}
          </h1>
          <p className="text-ergo-muted font-bold text-sm md:text-base">
            {query ? `Found ${products.length} products` : "Enter a term to browse our catalog."}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 w-full">
        <Suspense fallback={<div className="h-64 w-full flex justify-center items-center font-bold text-ergo-muted animate-pulse">Searching...</div>}>
          {query ? (
            products.length > 0 ? (
              <ul className="product-grid">
                {products.map((product) => (
                  <li key={product.id}>
                    <ProductCard product={product} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-ergo-surface flex items-center justify-center mb-6">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-ergo-muted">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-black text-ergo-navy-deep mb-2">No results found</h2>
                <p className="text-ergo-text mb-6">Try checking your spelling or using more general terms.</p>
                <Link href="/collections" className="bg-ergo-navy text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-ergo-navy-deep transition-colors">
                  Browse All Collections
                </Link>
              </div>
            )
          ) : (
            <div className="h-64 flex items-center justify-center text-ergo-muted font-bold">
              Use the search bar in the header to find products.
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}
