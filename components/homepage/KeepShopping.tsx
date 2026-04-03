export function KeepShopping() {
  return (
    <section className="w-full bg-ergo-navy py-4 overflow-hidden border-y border-ergo-navy-deep">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* We duplicate the content a few times so the marquee is continuous */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center text-white/90 font-black text-lg md:text-xl uppercase tracking-widest px-8">
            <span className="mx-4 text-ergo-orange">✦</span>
            KEEP SHOPPING
            <span className="mx-4 text-ergo-green">✦</span>
            MORE DEALS ADDED DAILY
            <span className="mx-4 text-ergo-orange">✦</span>
            PREMIUM QUALITY
            <span className="mx-4 text-ergo-green">✦</span>
            FREE DELIVERY
          </div>
        ))}
      </div>
    </section>
  );
}
