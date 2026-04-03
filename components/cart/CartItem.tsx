"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { CartLine } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/formatters";
import { useCart } from "@/lib/cart/useCart";

export function CartItem({ line }: { line: CartLine }) {
  const { updateQuantity, removeItem } = useCart();
  const [isUpdating, setIsUpdating] = useState(false);

  const merchandise = line.merchandise;
  const product = merchandise.product;
  const image = product.images?.edges[0]?.node;

  const handleUpdateQuantity = async (newQuantity: number) => {
    setIsUpdating(true);
    if (newQuantity === 0) {
      await removeItem(line.id);
    } else {
      await updateQuantity(line.id, newQuantity);
    }
    setIsUpdating(false);
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    await removeItem(line.id);
    setIsUpdating(false);
  };

  // If the variant isn't default, show variant title (e.g. Size, Color)
  const variantTitle = merchandise.title !== "Default Title" ? merchandise.title : null;

  return (
    <div className={`flex gap-4 py-4 border-b border-ergo-border transition-opacity ${isUpdating ? 'opacity-40 pointer-events-none' : ''}`}>
      {/* Image */}
      <Link href={`/products/${product.handle}`} className="relative w-[76px] h-[76px] bg-gray-50 rounded-md overflow-hidden flex-shrink-0 border border-gray-100 mt-1">
        {image ? (
          <Image
            src={image.url}
            alt={image.altText || product.title}
            fill
            sizes="80px"
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </Link>

      {/* Details */}
      <div className="flex flex-col flex-1 justify-between">
        <div className="flex justify-between items-start gap-2">
          <Link href={`/products/${product.handle}`} className="text-sm font-semibold text-ergo-text line-clamp-2 hover:text-ergo-navy transition-colors">
            {product.title}
          </Link>
          <span className="text-sm font-bold text-ergo-navy shrink-0">
            {formatPrice(line.cost.totalAmount)}
          </span>
        </div>
        
        {variantTitle && (
          <p className="text-xs text-gray-500 mt-1">{variantTitle}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          {/* Quantity Controls */}
          <div className="flex items-center border border-gray-200 rounded-md text-sm w-[90px] h-8 bg-white shadow-sm overflow-hidden">
            <button 
              onClick={() => handleUpdateQuantity(line.quantity - 1)}
              className="flex-1 flex justify-center items-center text-gray-500 hover:text-ergo-navy hover:bg-gray-50 transition-colors h-full"
              aria-label="Decrease quantity"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20 12H4" />
              </svg>
            </button>
            <span className="w-8 flex justify-center items-center text-xs font-semibold text-ergo-text border-x border-gray-100 h-full bg-gray-50/50">
              {line.quantity}
            </span>
            <button 
              onClick={() => handleUpdateQuantity(line.quantity + 1)}
              className="flex-1 flex justify-center items-center text-gray-500 hover:text-ergo-navy hover:bg-gray-50 transition-colors h-full"
              aria-label="Increase quantity"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Remove Button */}
          <button 
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 transition-colors p-1"
            aria-label="Remove item"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-[18px] h-[18px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
