import Link from "next/link";
import { Collection } from "@/lib/shopify/types";

// Helper map to assign an emoji based on handle keywords if image doesn't exist
const CATEGORY_EMOJIS: Record<string, string> = {
  "flash-sale": "⚡",
  "todays-offers": "🔥",
  "new-arrivals": "✨",
  "best-sellers": "⭐",
  "electronics": "🔌",
  "home": "🏠",
  "kitchen": "🍳",
  "beauty": "💄",
  "fitness": "🏋️",
  "gadgets": "📱",
};

interface CategoryScrollProps {
  collections: Omit<Collection, "products">[];
}

export function CategoryScroll({ collections }: CategoryScrollProps) {
  // Filter out any hidden or utility collections if needed
  const displayCollections = collections.filter(c => c.handle !== "all");

  return (
    <section className="w-full bg-white py-6 border-b border-ergo-border">
      <div className="flex overflow-x-auto scrollbar-hide px-4 md:px-6 lg:px-8 gap-4 md:gap-8 snap-x snap-mandatory pb-2">
        {displayCollections.map((collection) => {
          // Fallback emoji logic if no image is desired or provided
          let emoji = "🛍️";
          for (const [key, val] of Object.entries(CATEGORY_EMOJIS)) {
             if (collection.handle.includes(key)) {
               emoji = val; break;
             }
          }

          return (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="flex flex-col items-center gap-3 min-w-[72px] md:min-w-[84px] snap-start group"
              prefetch={false}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-ergo-surface border border-ergo-border flex items-center justify-center text-2xl md:text-3xl shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all duration-300">
                {collection.image ? (
                  <img src={collection.image.url} alt={collection.title} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span>{emoji}</span>
                )}
              </div>
              <span className="text-[11px] md:text-xs font-semibold text-ergo-text text-center px-1 leading-tight group-hover:text-ergo-navy transition-colors">
                {collection.title}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
