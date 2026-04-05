"use client";

import { useState, useMemo } from "react";
import { Product, ProductVariant } from "@/lib/shopify/types";
import { formatPrice, getDiscountPercent } from "@/lib/formatters";
import { useCart } from "@/lib/cart/useCart";

interface ProductActionsProps {
  product: Product;
}

export function ProductActions({ product }: ProductActionsProps) {
  const { addItem, openCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
const [isBuying, setIsBuying] = useState(false);

  const variants = product.variants.edges.map(e => e.node);
  
  // Aggregate available options from variants
  const options = useMemo(() => {
    const map = new Map<string, Set<string>>();
    variants.forEach(v => {
      v.selectedOptions.forEach(opt => {
        if (!map.has(opt.name)) map.set(opt.name, new Set());
        map.get(opt.name)!.add(opt.value);
      });
    });
    return Array.from(map.entries())
      .map(([name, values]) => ({ name, values: Array.from(values) }))
      // Exclude Shopify default option
      .filter(opt => opt.name !== "Title" || opt.values[0] !== "Default Title");
  }, [variants]);

  // Initial selected options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const firstAvail = variants.find(v => v.availableForSale) || variants[0];
    const initial: Record<string, string> = {};
    if (firstAvail) {
      firstAvail.selectedOptions.forEach(opt => {
        initial[opt.name] = opt.value;
      });
    }
    return initial;
  });

  const handleOptionChange = (optionName: string, value: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionName]: value }));
    setQuantity(1); // Reset quantity on variant switch
  };

  // Find the exact variant based on selected options
  const matchedVariant = variants.find(v => {
    return v.selectedOptions.every(opt => selectedOptions[opt.name] === opt.value);
  });

  // Derived state
  const isAvailable = matchedVariant?.availableForSale;
  const priceVal = matchedVariant?.price ? parseFloat(matchedVariant.price.amount) : 0;
  const compVal = matchedVariant?.compareAtPrice ? parseFloat(matchedVariant.compareAtPrice.amount) : 0;
  const isOnSale = compVal > priceVal;
  const discount = getDiscountPercent(matchedVariant?.compareAtPrice ?? null, matchedVariant?.price ?? { amount: "0", currencyCode: "USD" });

  const handleAddToCart = async () => {
    if (!matchedVariant || !isAvailable) return;
    setIsAdding(true);
    await addItem(matchedVariant.id, quantity);
    setIsAdding(false);
  };

  // ✅ REPLACE WITH — always forces correct domain
// ✅ Simple — just use checkoutUrl directly
const handleBuyNow = async () => {
  if (!matchedVariant || !isAvailable) return
  setIsBuying(true)
  const updatedCart = await addItem(
    matchedVariant.id, quantity, false
  )
  setIsBuying(false)

  // TEMPORARY DEBUG — shows exact URL Shopify returns
  alert(`
    checkoutUrl: ${updatedCart?.checkoutUrl}
    cartId: ${updatedCart?.id}
  `)
}

  return (
    <div className="flex flex-col mt-4">
      {/* Price Section */}
      <div className="mb-6 flex items-baseline gap-3">
        {isOnSale && matchedVariant?.price ? (
          <>
            <span className="text-3xl font-black text-ergo-orange">{formatPrice(matchedVariant.price)}</span>
            <span className="text-lg font-medium text-ergo-muted line-through decoration-ergo-muted">{formatPrice(matchedVariant.compareAtPrice!)}</span>
            <span className="ml-2 bg-ergo-orange text-white text-xs font-bold px-2 py-1 rounded-md uppercase">
              Save {discount}%
            </span>
          </>
        ) : matchedVariant?.price ? (
          <span className="text-3xl font-black text-ergo-navy-deep">{formatPrice(matchedVariant.price)}</span>
        ) : null}
      </div>

      {/* Variant Picker */}
      {options.length > 0 && (
        <div className="space-y-5 mb-8">
          {options.map(option => (
            <div key={option.name}>
              <h3 className="text-sm font-bold text-ergo-text mb-3">Select {option.name}:</h3>
              <div className="flex flex-wrap gap-2.5">
                {option.values.map(val => {
                  const isSelected = selectedOptions[option.name] === val;
                  // Look ahead to check if this specific value combined with OTHER selected options is available
                  const lookupOptions = { ...selectedOptions, [option.name]: val };
                  const targetVariant = variants.find(v => v.selectedOptions.every(o => lookupOptions[o.name] === o.value));
                  const available = targetVariant?.availableForSale;

                  return (
                    <button
                      key={val}
                      onClick={() => handleOptionChange(option.name, val)}
                      className={`
                        px-4 py-2 border rounded-lg text-sm font-semibold transition-all duration-200
                        ${isSelected ? 'bg-ergo-navy text-white shadow-md border-ergo-navy' : 'bg-white text-ergo-text border-ergo-border hover:border-gray-400'}
                        ${!available && !isSelected ? 'opacity-40 cursor-not-allowed line-through' : ''}
                      `}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Quantity & Actions Layout */}
      <div className="flex flex-col gap-4">
        {/* Quantity Row */}
        <div className="flex items-center">
          <div className="flex items-center border-2 border-ergo-border rounded-xl bg-white w-32 h-[52px]">
            <button 
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="flex-1 flex justify-center items-center h-full text-ergo-muted hover:text-ergo-navy-deep transition-colors"
              disabled={quantity <= 1}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>
            </button>
            <span className="flex-1 text-center font-bold text-lg">{quantity}</span>
            <button 
              onClick={() => setQuantity(quantity + 1)}
              className="flex-1 flex justify-center items-center h-full text-ergo-muted hover:text-ergo-navy-deep transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
            </button>
          </div>
          <span className="text-sm font-medium text-ergo-muted ml-4">
             {isAvailable ? 'In Stock' : 'Out of Stock / Unavailable combination'}
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 mt-2">
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable || isAdding}
            className={`
              w-full h-14 bg-ergo-navy text-white rounded-full font-black text-lg 
              hover:bg-ergo-navy-deep transition-all duration-300 disabled:opacity-50 
              disabled:cursor-not-allowed flex justify-center items-center shadow-lg 
              shadow-ergo-navy/20 active:scale-[0.98]
            `}
          >
            {isAdding ? (
              <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "ADD TO CART"
            )}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!isAvailable || isBuying}
            className={`
              w-full h-14 border-2 border-ergo-navy text-ergo-navy bg-white 
              rounded-full font-black text-lg hover:bg-ergo-surface transition-all 
              duration-300 disabled:opacity-50 disabled:cursor-not-allowed 
              flex justify-center items-center active:scale-[0.98]
            `}
          >
            {isBuying ? (
  <div className="w-6 h-6 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
) : (
  "BUY IT NOW"
)}
          </button>

          {/* Trust Badge Stack */}
          <div className="grid grid-cols-3 gap-2 mt-4 pt-6 border-t border-ergo-border">
            <div className="flex flex-col items-center gap-1.5 text-center">
              <div className="w-10 h-10 rounded-full bg-ergo-surface flex items-center justify-center text-ergo-green">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.129-1.125V11.25c0-.442-.256-.837-.639-1.03l-3.338-1.711a.75.75 0 00-.51-.061l-1.047.252a1.125 1.125 0 00-.814.733l-1.203 3.61a.75.75 0 00.321.842l2.128 1.419c.14.094.226.251.226.419v1.611c0 .621.504 1.125 1.125 1.125h1.125z" />
                </svg>
              </div>
              <span className="text-[10px] font-black uppercase text-ergo-navy-deep leading-tight">Free<br/>Shipping</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center border-x border-ergo-border">
              <div className="w-10 h-10 rounded-full bg-ergo-surface flex items-center justify-center text-ergo-green">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.724 10.339 8.75 11.758 5.026-1.42 8.75-6.166 8.75-11.758 0-1.282-.25-2.525-.702-3.66z" />
                </svg>
              </div>
              <span className="text-[10px] font-black uppercase text-ergo-navy-deep leading-tight">2-Year<br/>Warranty</span>
            </div>
            <div className="flex flex-col items-center gap-1.5 text-center">
              <div className="w-10 h-10 rounded-full bg-ergo-surface flex items-center justify-center text-ergo-green">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                </svg>
              </div>
              <span className="text-[10px] font-black uppercase text-ergo-navy-deep leading-tight">30-Day<br/>Trial</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
