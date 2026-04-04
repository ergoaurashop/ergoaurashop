"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/lib/shopify/types";
import { formatPrice } from "@/lib/formatters";
import { useCart } from "@/lib/cart/useCart";
import Image from "next/image";

interface StickyBuyBarProps {
  product: Product;
}

export function StickyBuyBar({ product }: StickyBuyBarProps) {
  const { addItem } = useCart();
  const [isVisible, setIsVisible] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // Get first available variant
  const variant = product.variants.edges.find(v => v.node.availableForSale)?.node || product.variants.edges[0]?.node;
  const isAvailable = variant?.availableForSale;

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past 600px
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAddToCart = async () => {
    if (!variant || !isAvailable) return;
    setIsAdding(true);
    await addItem(variant.id, 1);
    setIsAdding(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
        >
          <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-full p-2 md:p-3 pointer-events-auto flex items-center justify-between gap-4">
            {/* Left: Product Info */}
            <div className="flex items-center gap-3 pl-2 md:pl-4 overflow-hidden">
              <div className="relative w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden flex-shrink-0 bg-ergo-surface">
                {product.images.edges[0] && (
                  <Image
                    src={product.images.edges[0].node.url}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col overflow-hidden">
                <h4 className="text-xs md:text-sm font-black text-ergo-navy-deep truncate max-w-[120px] md:max-w-[200px]">
                  {product.title}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] md:text-xs font-bold text-ergo-green uppercase tracking-wider">In Stock</span>
                  <span className="text-xs md:text-sm font-black text-ergo-navy-deep">
                    {variant ? formatPrice(variant.price) : "---"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Action */}
            <button
              onClick={handleAddToCart}
              disabled={!isAvailable || isAdding}
              className="bg-ergo-navy text-white h-10 md:h-12 px-6 md:px-10 rounded-full font-black text-xs md:text-sm hover:bg-ergo-navy-deep transition-all duration-300 shadow-lg shadow-ergo-navy/20 active:scale-95 disabled:opacity-50 flex items-center justify-center flex-shrink-0"
            >
              {isAdding ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "ADD TO CART"
              )}
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
