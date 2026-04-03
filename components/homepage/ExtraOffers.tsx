import { Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/ProductCard";

interface ExtraOffersProps {
  products: Product[];
}

export function ExtraOffers({ products }: ExtraOffersProps) {
  if (!products || products.length === 0) return null;

  return (
    <section className="w-full py-10 md:py-16 bg-white border-b border-ergo-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-6 md:mb-8">
          <h2 className="text-2xl md:text-3xl font-black text-ergo-navy-deep flex items-center gap-2">
            <span>💥</span> Extra Offers
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {products.slice(0, 4).map((product) => (
            <div key={product.id} className="relative group">
              <ProductCard product={product} />
              {/* Extra large badge */}
              <div className="absolute top-2 left-2 bg-black text-white font-black px-3 py-1 rounded-md z-10 shadow-md">
                EXTRA
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
