import React from "react";
import { Product } from "@/lib/shopify/types";
import { DealCard } from "./DealCard";

interface FeaturedDealsProps {
  products: Product[];
}

export function FeaturedDeals({ products }: FeaturedDealsProps) {
  if (!products || products.length === 0) return null;

  // Take the first 3 products for the featured section
  const tallProduct = products[0];
  const stackedProducts = products.slice(1, 3);

  return (
    <section className="bg-white py-12 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 min-h-[600px] md:min-h-[700px]">
          
          {/* LEFT: Tall Featured Card */}
          <div className="flex-1 lg:flex-[2]">
            <div className="h-full">
              <DealCard 
                product={tallProduct} 
                isFeatured={true} 
                priority={true}
              />
            </div>
          </div>

          {/* RIGHT: Stacked Cards */}
          <div className="flex-1 flex flex-col gap-6 md:gap-8">
            {stackedProducts.map((product, idx) => (
              <div key={product.id} className="flex-1">
                <DealCard 
                  product={product} 
                />
              </div>
            ))}
            
            {/* If there's only 1 stacked product, fill the space with a promo card */}
            {stackedProducts.length < 2 && (
              <div className="flex-1 bg-[#0a0f1e] rounded-2xl p-8 flex flex-col justify-center gap-4 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff4d00]/20 blur-3xl" />
                <h3 className="text-2xl font-black text-white leading-tight">
                  MORE SAVINGS <br /> <span className="text-[#ff4d00]">AWAITING</span>
                </h3>
                <p className="text-white/40 text-sm font-medium tracking-tight uppercase">
                  Discover daily drops across all premium categories.
                </p>
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white group-hover:bg-[#ff4d00] group-hover:border-[#ff4d00] transition-colors duration-500">
                   →
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
