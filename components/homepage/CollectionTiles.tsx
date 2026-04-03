import Link from "next/link";
import { Collection } from "@/lib/shopify/types";

interface CollectionTilesProps {
  collections: Omit<Collection, "products">[];
}

export function CollectionTiles({ collections }: CollectionTilesProps) {
  // Filter for featured/main collections to show as large tiles (up to 4 or 6)
  const displayCollections = collections.filter(c => c.handle !== "all").slice(0, 4);

  if (!displayCollections.length) return null;

  return (
    <section className="w-full py-12 md:py-16 bg-white border-b border-ergo-border">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="mb-8 md:mb-10 text-center">
          <h2 className="text-2xl md:text-3xl font-black text-ergo-navy-deep">
            Shop by Category
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {displayCollections.map((collection) => (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="group relative h-[250px] md:h-[300px] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute inset-0 bg-ergo-surface">
                {collection.image ? (
                  <img 
                    src={collection.image.url} 
                    alt={collection.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                    No Image
                  </div>
                )}
              </div>
              
              {/* Gradient overlay from bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-ergo-navy-deep via-ergo-navy-deep/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 flex items-end justify-between">
                <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                  {collection.title}
                </h3>
                <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-ergo-orange transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
