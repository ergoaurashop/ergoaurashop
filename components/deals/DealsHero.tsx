import React from "react";
import { CountdownTimer } from "./CountdownTimer";

export function DealsHero() {
  return (
    <section className="bg-[#0a0f1e] pt-12 pb-16 md:pt-20 md:pb-24 px-4 overflow-hidden relative">
      {/* Background decoration elements */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ff4d00]/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-[#ff4d00]/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center gap-6 md:gap-8 relative z-10">
        
        {/* Animated Badge */}
        <div className="flex items-center gap-2 bg-[#ff4d00]/10 border border-[#ff4d00]/20 py-1.5 px-4 rounded-full shadow-[0_0_20px_rgba(255,77,0,0.1)]">
          <span className="w-2 h-2 bg-[#ff4d00] rounded-full animate-pulse shadow-[0_0_8px_#ff4d00]" />
          <span className="text-[#ff4d00] text-[10px] md:text-xs font-black tracking-[0.2em] uppercase">
            LIVE DEALS
          </span>
        </div>

        {/* Headlines */}
        <div className="flex flex-col gap-3 md:gap-4">
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Today's Best <span className="text-[#ff4d00]">Deals</span>
          </h1>
          <p className="text-white/60 text-sm md:text-xl font-medium max-w-xl mx-auto">
            Handpicked savings — updated daily. <br className="hidden md:block" /> Experience high-performance lifestyle, for less.
          </p>
        </div>

        {/* Timer Wrapper */}
        <div className="flex flex-col items-center gap-4 py-4 md:py-6 relative">
          <div className="absolute -inset-8 bg-[#ff4d00]/5 blur-3xl rounded-full" />
          <span className="text-[10px] md:text-xs font-bold text-white/40 tracking-[0.3em] uppercase relative z-10 mb-2">
            OFFER ENDS IN:
          </span>
          <div className="relative z-10">
            <CountdownTimer />
          </div>
        </div>
      </div>
    </section>
  );
}
