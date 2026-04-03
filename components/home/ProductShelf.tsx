import Link from "next/link";
import { ProductCard } from "@/components/product/ProductCard";

interface ProductShelfProps {
  collection: any;
}

export function ProductShelf({ collection }: ProductShelfProps) {
  // Step 2: Unwrap products natively from the collection.edges node
  const products = collection.products?.edges?.map((edge: any) => edge.node) || [];

  if (products.length === 0) return null;

  return (
    <section className="w-full py-6">
      <div className="flex items-end justify-between mb-4 md:mb-5">
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

      <div className="flex overflow-x-auto no-scrollbar gap-2 md:gap-4 pb-4 snap-x snap-mandatory">
        {products.map((product: any) => (
          <div key={product.id} className="min-w-[160px] w-[160px] md:min-w-[220px] md:w-[220px] snap-start mb-2 relative">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
