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

        <ul className="product-grid">
          {products.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
