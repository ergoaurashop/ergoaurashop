"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/shopify/types";
import { formatPrice, getDiscountPercent } from "@/lib/formatters";
import { useCart } from "@/lib/cart/useCart";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addItem } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const firstImage = product.images?.edges?.[0]?.node;
  const firstVariant = product.variants?.edges?.[0]?.node;

  // Modern Node Pathing precisely mirroring requested layout maps
  const price = product.priceRange?.minVariantPrice;
  const compareAtPrice = (parseFloat(product.compareAtPriceRange?.maxVariantPrice?.amount || "0") > parseFloat(product.priceRange?.minVariantPrice?.amount || "0")) ? product.compareAtPriceRange?.maxVariantPrice : null;
  const priceVal = price ? parseFloat(price.amount) : 0;
  const compareVal = compareAtPrice ? parseFloat(compareAtPrice.amount) : 0;
  const isOnSale = compareVal > priceVal;
  const discount = getDiscountPercent(compareAtPrice ?? null, price ?? { amount: "0", currencyCode: "USD" });

  const createdDaysAgo = (Date.now() - new Date(product.createdAt).getTime()) / (1000 * 3600 * 24);
  const isNew = createdDaysAgo <= 14;

  const isHot = product.tags?.some((tag) => tag.toLowerCase() === "bestseller" || tag.toLowerCase() === "hot");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("ergoaura_wishlist");
      if (stored) {
        const wishlist: string[] = JSON.parse(stored);
        if (wishlist.includes(product.handle)) {
          setIsWishlisted(true);
        }
      }
    } catch {
      // Ignored
    }
  }, [product.handle]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const stored = localStorage.getItem("ergoaura_wishlist");
      let wishlist: string[] = stored ? JSON.parse(stored) : [];
      if (isWishlisted) {
        wishlist = wishlist.filter((h) => h !== product.handle);
      } else {
        wishlist.push(product.handle);
      }
      localStorage.setItem("ergoaura_wishlist", JSON.stringify(wishlist));
      setIsWishlisted(!isWishlisted);
    } catch {
      // Ignored
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!firstVariant) return;

    setIsAdding(true);
    await addItem(firstVariant.id, 1);
    setIsAdding(false);
  };

  return (
    <Link
      href={`/products/${product.handle}`}
      className="group relative flex flex-col w-full h-[320px] md:h-[380px] bg-white rounded-none border border-ergo-border overflow-hidden hover:shadow-lg transition-shadow duration-300"
      prefetch={false}
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[3/4] bg-gray-50 flex-shrink-0">
        {firstImage ? (
          <Image
            src={firstImage.url}
            alt={firstImage.altText || product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-contain p-2 group-hover:scale-[1.03] transition-transform duration-500 ease-out"
            priority={priority}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5z" />
            </svg>
          </div>
        )}

        {/* Badges Stack (Top Left) */}
        <div className="absolute top-2 left-2 flex flex-col gap-1.5 items-start">
          <span className="bg-yellow-400 text-black text-[10px] uppercase font-bold px-1.5 py-0.5 rounded shadow-sm">
            EXPRESS
          </span>
          {isOnSale && discount && (
            <span className="bg-ergo-orange text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded shadow-sm">
              -{discount}%
            </span>
          )}
          {isNew && !isOnSale && (
            <span className="bg-ergo-green text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md shadow-sm">
              NEW
            </span>
          )}
          {isHot && !isOnSale && !isNew && (
            <span className="bg-ergo-navy text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded-md shadow-sm">
              HOT
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm border border-gray-100 flex items-center justify-center text-gray-400 hover:text-red-500 hover:scale-[1.05] transition-all shadow-sm z-10"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill={isWishlisted ? "#ef4444" : "none"}
            stroke={isWishlisted ? "#ef4444" : "currentColor"}
            strokeWidth={1.5}
            className="w-4 h-4 transition-colors"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
        </button>

        {/* The Noon "+" Quick Add Button (Bottom Right) */}
        <button
          onClick={handleAddToCart}
          disabled={!firstVariant?.availableForSale || isAdding}
          className="absolute bottom-2 right-2 w-9 h-9 bg-white border border-gray-100 rounded-lg shadow-md flex items-center justify-center z-10 text-xl font-bold text-black border-opacity-100 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          aria-label="Add to cart"
        >
          {isAdding ? (
            <div className="w-3 h-3 border-[2px] border-gray-200 border-t-gray-600 rounded-full animate-spin" />
          ) : (
            <span>+</span>
          )}
        </button>
      </div>

      {/* Content Body */}
      <div className="flex flex-col flex-1 p-3">
        <h3 className="text-sm font-semibold text-ergo-text line-clamp-2 leading-tight mb-1">
          {product.title}
        </h3>
        {product.ad_hook?.value && (
          <p className="text-xs text-ergo-muted mb-2 line-clamp-1 italic">
            {product.ad_hook.value}
          </p>
        )}

        {/* Price Row */}
        {/* We provide bottom margin on mobile so the persistent add to cart button doesn't cover the price */}
        <div className="flex flex-wrap items-baseline gap-1.5 mt-auto pb-1 mb-10 md:mb-0">
          {isOnSale && price ? (
            <>
              <span className="text-ergo-orange font-black text-base md:text-lg">
                {formatPrice(price)!}
              </span>
              {compareAtPrice && (
                <span className="text-gray-400 text-xs line-through decoration-gray-400">
                  {formatPrice(compareAtPrice)}
                </span>
              )}
            </>
          ) : price ? (
            <span className="text-ergo-navy font-black text-base md:text-lg">
              {formatPrice(price)}
            </span>
          ) : (
            <span className="text-gray-500 text-sm font-medium">Unavailable</span>
          )}
        </div>
      </div>
    </Link>
  );
}
