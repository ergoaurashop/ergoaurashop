"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/ProductCard";

interface FlashSaleProps {
  products: Product[];
}

export function FlashSale({ products }: FlashSaleProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: "00", minutes: "00", seconds: "00" });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateCountdown = () => {
      // UAE Time (UTC+4)
      const now = new Date();
      // Use localized formatter to get UAE midnight 
      const uaeTimeString = new Date().toLocaleString("en-US", { timeZone: "Asia/Dubai" });
      const uaeTime = new Date(uaeTimeString);
      
      const nextMidnight = new Date(uaeTime);
      nextMidnight.setHours(24, 0, 0, 0);

      const diff = nextMidnight.getTime() - uaeTime.getTime();

      if (diff > 0) {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        setTimeLeft({
          hours: hours.toString().padStart(2, "0"),
          minutes: minutes.toString().padStart(2, "0"),
          seconds: seconds.toString().padStart(2, "0"),
        });
      }
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!products || products.length === 0) return null;

  return (
    <section className="w-full bg-ergo-surface py-8 md:py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        {/* Flash Sale Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-gradient-to-r from-ergo-orange to-ergo-navy rounded-xl p-4 md:p-6 mb-6 md:mb-8 text-white shadow-md">
          <div className="flex items-center gap-3 mb-3 md:mb-0">
            <span className="text-3xl">⚡</span>
            <div>
              <h2 className="text-2xl font-black uppercase tracking-wider">Flash Sale</h2>
              <p className="text-white/80 text-sm font-medium">Limited quantities available. Ends tonight.</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-lg p-3">
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black w-10 text-center font-mono">{mounted ? timeLeft.hours : "00"}</span>
              <span className="text-[10px] uppercase font-bold text-white/70">HOURS</span>
            </div>
            <span className="text-xl font-bold mb-3">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black w-10 text-center font-mono">{mounted ? timeLeft.minutes : "00"}</span>
              <span className="text-[10px] uppercase font-bold text-white/70">MINS</span>
            </div>
            <span className="text-xl font-bold mb-3">:</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-black w-10 text-center font-mono text-ergo-orange">{mounted ? timeLeft.seconds : "00"}</span>
              <span className="text-[10px] uppercase font-bold text-white/70">SECS</span>
            </div>
          </div>
        </div>

        {/* Products Grid (matching requirements) */}
        <ul className="product-grid">
          {products.slice(0, 4).map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
