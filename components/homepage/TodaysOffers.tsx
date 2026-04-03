import Link from "next/link";
import { Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/ProductCard";

interface TodaysOffersProps {
  products: Product[];
}

export function TodaysOffers({ products }: TodaysOffersProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-ergo-navy-deep flex items-center gap-2">
            <span>🔥</span> Today's Offers
          </h2>
          <Link 
            href="/collections/todays-offers"
            className="text-sm font-semibold text-ergo-navy hover:text-ergo-orange transition-colors flex items-center"
          >
            See All <span className="ml-1">→</span>
          </Link>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 pb-4 snap-x snap-mandatory">
          {products.map((product) => (
            <div key={product.id} className="min-w-[280px] w-[280px] md:min-w-[320px] md:w-[320px] snap-start mb-2">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
