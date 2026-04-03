import { Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/ProductCard";

interface NewArrivalsProps {
  products: Product[];
}

export function NewArrivals({ products }: NewArrivalsProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-16 bg-ergo-surface overflow-hidden border-b border-ergo-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-ergo-navy-deep flex items-center gap-2">
            <span>✨</span> New Arrivals
          </h2>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 pb-4 snap-x snap-mandatory">
          {products.map((product) => (
            <div key={product.id} className="min-w-[200px] w-[200px] md:min-w-[280px] md:w-[280px] snap-start mb-2">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
