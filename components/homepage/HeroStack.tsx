export function HeroStack() {
  return (
    <div className="w-full">
      {/* Desktop Layout -> hidden md:grid */}
      <div className="hidden md:grid grid-cols-3 gap-4 w-full h-[380px] lg:h-[450px]">
        {/* Left Side -> span 2 */}
        <div className="col-span-2 bg-ergo-navy rounded-none flex items-center justify-center text-white/50 text-2xl font-bold bg-gradient-to-br from-ergo-navy-deep to-ergo-navy tracking-widest relative overflow-hidden group hover:brightness-110 transition-all duration-300 cursor-pointer">
          MAIN BANNER
        </div>
        
        {/* Right Side -> span 1, stacked blocks */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="flex-1 bg-ergo-orange rounded-none flex items-center justify-center text-white/50 text-xl font-bold bg-gradient-to-br from-orange-600 to-ergo-orange tracking-widest relative overflow-hidden group hover:brightness-110 transition-all duration-300 cursor-pointer">
            PROMO 1
          </div>
          <div className="flex-1 bg-ergo-green rounded-none flex items-center justify-center text-white/50 text-xl font-bold tracking-widest relative overflow-hidden group hover:brightness-110 transition-all duration-300 cursor-pointer">
            PROMO 2
          </div>
        </div>
      </div>

      {/* Mobile Layout -> flex md:hidden */}
      <div className="flex md:hidden w-full h-[250px] overflow-x-auto snap-x scrollbar-hide">
        <div className="min-w-full h-full bg-ergo-navy rounded-none flex items-center justify-center text-white/50 text-xl font-bold snap-start bg-gradient-to-br from-ergo-navy-deep to-ergo-navy hover:brightness-110 transition-all duration-300 cursor-pointer">
          MAIN BANNER 
        </div>
      </div>
    </div>
  );
}
