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

  const handleBuyNow = async () => {
    if (!matchedVariant || !isAvailable) return;
    setIsAdding(true);
    await addItem(matchedVariant.id, quantity);
    setIsAdding(false);
    openCart();
    // In a real flow with checkout redirect, you'd typically extract checkoutUrl from cart and window.location.href = checkoutUrl
  };

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
        <div className="flex flex-col gap-3 mt-2">
          <button
            onClick={handleAddToCart}
            disabled={!isAvailable || isAdding}
            className="w-full h-14 bg-ergo-navy text-white rounded-xl font-bold text-lg hover:bg-ergo-navy-deep transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center shadow-md shadow-ergo-navy/20"
          >
            {isAdding ? <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : "ADD TO CART"}
          </button>
          <button
            onClick={handleBuyNow}
            disabled={!isAvailable || isAdding}
            className="w-full h-14 border-2 border-ergo-navy text-ergo-navy bg-white rounded-xl font-bold text-lg hover:bg-ergo-surface transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
          >
            BUY IT NOW
          </button>
        </div>
      </div>
    </div>
  );
}
