"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/shopify/types";
import { useCart } from "@/lib/cart/useCart";
import { MouseEvent } from "react";

const formatPrice = (amount: string, currency = 'USD') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
  }).format(parseFloat(amount));

const calcDiscount = (compareAt?: string, current?: string) => {
  if (!compareAt || !current || parseFloat(compareAt) <= parseFloat(current)) return null;
  return Math.round(((parseFloat(compareAt) - parseFloat(current)) / parseFloat(compareAt)) * 100);
};

interface DealCardProps {
  product: Product;
  isFeatured?: boolean;
  priority?: boolean;
}

export function DealCard({ product, isFeatured = false, priority = false }: DealCardProps) {
  const { addItem } = useCart();
  
  const price       = product.priceRange?.minVariantPrice?.amount || "0";
  const compareAt   = product.compareAtPriceRange?.minVariantPrice?.amount;
  const currency    = product.priceRange?.minVariantPrice?.currencyCode || "USD";
  const discount    = calcDiscount(compareAt, price);
  const extraBadge  = product.extraBadge?.value;
  const featuredImg = product.featuredImage || product.images?.edges[0]?.node;

  // Get the first available variant ID dynamically
  const variantId = product.variants?.edges?.[0]?.node?.id;

  const handleAddToCart = async (e: MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    if (variantId) {
      await addItem(variantId, 1);
    }
  };

  // Mocked stock progress for "Featured" items
  // Since Storefront API doesn't always expose raw inventory qty easily, 
  // we use a stable pseudo-random value based on product ID for visual consistency
  const stockSeed = parseInt(product.id.split('/').pop() || '50') % 30 + 70; // 70-99%
  const stockLabel = stockSeed > 85 ? "ALMOST SOLD OUT" : `${stockSeed}% CLAIMED`;

  return (
    <Link 
      href={`/products/${product.handle}`} 
      className={`group bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col transition-all duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 ${isFeatured ? 'h-full shadow-lg border-white/50' : 'h-full'}`}
    >
      {/* IMAGE WRAPPER */}
      <div className={`relative overflow-hidden bg-gray-50 flex items-center justify-center ${isFeatured ? 'aspect-[2/3]' : 'aspect-square'}`}>
        {featuredImg && (
          <Image
            src={featuredImg.url}
            alt={featuredImg.altText || product.title}
            fill
            priority={priority}
            sizes={isFeatured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
            className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
          />
        )}

        {/* TOP LEFT — "HOT" for featured or Flash Sale label */}
        {isFeatured && (
          <span className="absolute top-4 left-4 bg-[#0a0f1e] text-white py-1 px-3 rounded-full text-[10px] font-black tracking-widest shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            HOT DEAL
          </span>
        )}

        {/* TOP RIGHT — Discount % */}
        {discount && (
          <span className="absolute top-4 right-4 bg-[#ff4d00] text-white py-1 px-3 rounded-full text-xs font-black shadow-lg transform -rotate-3 group-hover:rotate-0 transition-all duration-300">
            {discount}% OFF
          </span>
        )}

        {/* QUICK ADD ACTION (HOVER) */}
        <button
          onClick={handleAddToCart}
          className="absolute bottom-4 right-4 w-10 h-10 bg-[#0a0f1e] text-white rounded-full flex items-center justify-center shadow-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#ff4d00] z-10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-4 md:p-6 flex flex-col flex-1 gap-2 md:gap-3">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] uppercase font-black text-gray-400 tracking-widest">
            {product.vendor}
          </span>
          <h3 className="text-sm md:text-base font-bold text-[#0a0f1e] line-clamp-2 min-h-[2.8rem] leading-snug">
            {product.title}
          </h3>
        </div>

        {/* Price & Badge */}
        <div className="flex flex-col gap-2 mt-auto">
          <div className="flex items-baseline gap-2">
            <span className="text-lg md:text-xl font-black text-[#0a0f1e]">
              {formatPrice(price, currency)}
            </span>
            {compareAt && parseFloat(compareAt) > parseFloat(price) && (
              <span className="text-xs md:text-sm text-gray-400 line-through font-medium">
                {formatPrice(compareAt, currency)}
              </span>
            )}
          </div>

          {/* Extra Metafield Badge */}
          {extraBadge && (
            <div className="inline-flex items-center gap-1.5 bg-[#e8f5e9] text-[#2e7d32] border border-[#a5d6a7] py-1 px-3 rounded-md text-[10px] md:text-xs font-bold w-fit">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
              </svg>
              {extraBadge}
            </div>
          )}

          {/* Featured Specifics: Stock Progress */}
          {isFeatured && (
            <div className="flex flex-col gap-1.5 pt-2">
              <div className="flex justify-between items-center text-[10px] font-black">
                <span className={stockSeed > 85 ? "text-[#ff4d00]" : "text-gray-500"}>
                  {stockLabel}
                </span>
                <span className="text-gray-400">ONLY FEW LEFT</span>
              </div>
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${stockSeed > 85 ? 'bg-[#ff4d00]' : 'bg-[#0a0f1e]'}`}
                  style={{ width: `${stockSeed}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
