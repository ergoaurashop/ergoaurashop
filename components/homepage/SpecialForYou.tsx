import { Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/ProductCard";

interface SpecialForYouProps {
  products: Product[];
}

export function SpecialForYou({ products }: SpecialForYouProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-16 bg-ergo-surface border-b border-ergo-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-6 md:mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-ergo-navy-deep flex items-center justify-center gap-2">
            <span>🎯</span> Special Offers For You
          </h2>
          <p className="text-sm text-ergo-muted mt-2 font-medium">Handpicked deals just for you</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              {/* Large floating % badge could be added here if not enough in ProductCard */}
              <div className="absolute -top-3 -right-3 bg-ergo-orange text-white font-black w-12 h-12 rounded-full flex items-center justify-center z-10 shadow-lg border-2 border-white transform rotate-12 group-hover:scale-110 transition-transform">
                %
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
