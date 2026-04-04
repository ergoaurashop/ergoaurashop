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
