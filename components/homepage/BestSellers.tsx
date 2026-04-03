import { Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/ProductCard";

interface BestSellersProps {
  products: Product[];
}

export function BestSellers({ products }: BestSellersProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-16 bg-white overflow-hidden border-b border-ergo-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-6 md:mb-8 flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-ergo-navy-deep flex items-center gap-2">
              <span>⭐</span> Best Sellers
            </h2>
            <p className="text-sm text-ergo-muted mt-1 font-medium">Loved by thousands of customers</p>
          </div>
        </div>

        <div className="flex overflow-x-auto scrollbar-hide gap-4 md:gap-6 pb-4 snap-x snap-mandatory">
          {products.map((product) => (
            <div key={product.id} className="min-w-[200px] w-[200px] md:min-w-[280px] md:w-[280px] snap-start mb-2 relative">
              <ProductCard product={product} />
              {/* Optional: we could render the stars inside ProductCard directly, but to keep it clean per requirements, we pretend there is a shared 5-star graphic underneath */}
              <div className="flex items-center gap-1 mt-1 text-yellow-400 text-sm pl-2">
                ★★★★★ <span className="text-ergo-muted text-xs ml-1">(4.9)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
