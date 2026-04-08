"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/shopify/types";
import { useCart } from "@/lib/cart/useCart";
import { MouseEvent } from "react";

// components/product/ProductCard.tsx

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

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  
  const price       = product.priceRange?.minVariantPrice?.amount || "0";
  const compareAt   = product.compareAtPriceRange?.minVariantPrice?.amount;
  const currency    = product.priceRange?.minVariantPrice?.currencyCode || "USD";
  const discount    = calcDiscount(compareAt, price);
  const extraBadge  = product.extraBadge?.value;
  const promoLabel  = product.promoLabel?.value;
  const featuredImg = product.featuredImage || product.images?.edges[0]?.node;

  // Get the first available variant ID dynamically
  const variantId = product.variants?.edges?.[0]?.node?.id;

  const handleAddToCart = async (e: MouseEvent) => {
    e.preventDefault(); // Stop Link navigation
    e.stopPropagation(); // Stop event bubbling
    if (variantId) {
      await addItem(variantId, 1);
    }
  };

  return (
    <Link href={`/products/${product.handle}`} className="product-card group/card relative">

      {/* IMAGE */}
      <div className="product-card__img-wrap">
        {featuredImg && (
          <Image
            src={featuredImg.url}
            alt={featuredImg.altText || product.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
          />
        )}

        {/* TOP LEFT — Flash Sale / New / Hot ribbon */}
        {promoLabel && (
          <span className="product-card__badge product-card__badge--promo">
            {promoLabel}
          </span>
        )}

        {/* TOP RIGHT — Discount % */}
        {discount && (
          <span className="product-card__badge product-card__badge--discount">
            {discount}% OFF
          </span>
        )}

        {/* QUICK ADD BUTTON — inside img-wrap so it's contained */}
        <button
          onClick={handleAddToCart}
          className="product-card__add-btn"
          aria-label="Add to cart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>

      {/* INFO */}
      <div className="product-card__info">

        {/* Brand */}
        <p className="product-card__vendor">{product.vendor}</p>

        {/* Title — max 2 lines */}
        <h3 className="product-card__title">{product.title}</h3>

        {/* Price block */}
        <div className="product-card__price-block">
          <span className="product-card__price-now">
            {formatPrice(price, currency)}
          </span>
          {compareAt && parseFloat(compareAt) > parseFloat(price) && (
            <span className="product-card__price-was">
              {formatPrice(compareAt, currency)}
            </span>
          )}
        </div>

        {/* Extra badge — "Extra 25% off" */}
        {extraBadge && (
          <span className="product-card__extra-badge">{extraBadge}</span>
        )}

      </div>
    </Link>
  );
}
