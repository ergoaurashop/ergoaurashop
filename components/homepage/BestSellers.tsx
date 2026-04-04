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
