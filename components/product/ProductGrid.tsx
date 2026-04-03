"use client";

import type { Product } from "@/lib/shopify/types";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products?: Product[];
}

export function ProductGrid({ products = [] }: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-gray-500 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mb-3 text-gray-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
        <p className="font-medium text-sm">No products found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5 w-full">
      {products.map((product, idx) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          priority={idx < 4} 
        />
      ))}
    </div>
  );
}
