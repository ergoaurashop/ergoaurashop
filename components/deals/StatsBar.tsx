import React from "react";

export function StatsBar() {
  return (
    <section className="bg-[#ff4d00] py-3 md:py-4 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-wrap md:flex-nowrap items-center justify-center gap-4 md:gap-0">
        <StatItem text="200+ DEALS LIVE" />
        <Divider />
        <StatItem text="UP TO 60% OFF TODAY" />
        <Divider />
        <StatItem text="FREE DELIVERY ON DEALS" />
      </div>
    </section>
  );
}

function StatItem({ text }: { text: string }) {
  return (
    <div className="flex-1 min-w-[140px] text-center">
      <span className="text-white text-[10px] md:text-sm font-black tracking-[0.1em] uppercase">
        {text}
      </span>
    </div>
  );
}

function Divider() {
  return (
    <div className="hidden md:block w-px h-6 bg-white/30 mx-8 flex-shrink-0" />
  );
}
