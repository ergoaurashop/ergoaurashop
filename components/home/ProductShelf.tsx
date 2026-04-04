import Link from "next/link";
import type { Collection } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductShelfProps {
  collection: Partial<Collection> & { title: string; handle: string; products: { edges: { node: import("@/lib/shopify/types").Product }[] } };
}

export function ProductShelf({ collection }: ProductShelfProps) {
  // Step 2: Unwrap products natively from the collection.edges node
  const products = collection.products?.edges?.map((edge: any) => edge.node) || [];

  if (products.length === 0) return null;

  return (
    <section className="w-full py-2">
      <div className="flex items-end justify-between mb-2 md:mb-3">
        <h2 className="text-lg md:text-xl font-bold text-ergo-navy-deep flex items-center gap-2">
          {collection.title}
        </h2>
        <Link 
          href={`/collections/${collection.handle}`}
          className="text-sm font-bold text-ergo-navy hover:text-ergo-orange transition-colors flex items-center group whitespace-nowrap"
        >
          View All <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <ul className="product-grid">
        {products.map((product: any) => (
          <li key={product.id}>
            <ProductCard product={product} />
          </li>
        ))}
      </ul>
    </section>
  );
}
