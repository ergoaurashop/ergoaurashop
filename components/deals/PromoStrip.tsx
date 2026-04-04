import Link from "next/link";
import React from "react";

export function PromoStrip() {
  return (
    <section className="bg-[#0a0f1e] py-8 md:py-12 border-y border-white/5 overflow-hidden group">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
            <span className="w-1.5 h-1.5 bg-[#ff4d00] rounded-full animate-pulse" />
            <span className="text-[#ff4d00] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
              LIMITED TIME
            </span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black text-white">
            Clearance <span className="text-[#ff4d00]">Sale</span>
          </h2>
          <p className="text-white/40 text-sm md:text-base font-medium max-w-md tracking-tight uppercase">
            Up to 60% off today — while stocks last. Final drop. ⚡️
          </p>
        </div>

        <Link 
          href="/collections/clearance"
          className="group relative flex items-center justify-center h-14 px-12 bg-[#ff4d00] text-white rounded-full font-black text-sm md:text-base shadow-xl shadow-[#ff4d00]/20 hover:bg-white hover:text-[#0a0f1e] transition-all duration-500 overflow-hidden active:scale-95"
        >
          <span className="relative z-10">SHOP CLEARANCE</span>
          <div className="absolute inset-x-0 bottom-0 h-0 group-hover:h-full bg-white transition-all duration-500" />
        </Link>
      </div>
    </section>
  );
}
