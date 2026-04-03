import Link from "next/link";

export function PromoBanner() {
  return (
    <section className="w-full bg-ergo-navy-deep py-12 md:py-16 px-4 md:px-8 text-center border-y-4 border-ergo-orange">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
        <h2 className="text-2xl md:text-4xl font-black text-white leading-tight">
          🌍 Fast Delivery Across UAE · Saudi Arabia · Worldwide
        </h2>
        <p className="text-ergo-surface/80 md:text-lg font-medium max-w-2xl">
          Upgrade your daily life with our curated selection of premium tools and accessories. Quality guaranteed.
        </p>
        <Link 
          href="/collections/new-arrivals"
          className="mt-2 bg-ergo-green hover:bg-green-600 text-white font-bold text-lg px-8 py-3.5 rounded-xl transition-all hover:scale-105 shadow-[0_0_20px_rgba(58,125,68,0.4)]"
        >
          Shop Now
        </Link>
      </div>
    </section>
  );
}
