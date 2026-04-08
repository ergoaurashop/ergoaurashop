import Link from "next/link";
import type { ReactNode } from "react";
import { Collection } from "@/lib/shopify/types";

interface DepartmentGridProps {
  title: ReactNode;
  collections: Collection[];
  linkHref: string;
  linkText?: string;
  icon?: ReactNode;
}

export function DepartmentGrid({ title, collections, linkHref, linkText = "Explore", icon }: DepartmentGridProps) {
  // Map strictly to specific handles
  const targetHandles = ["for-men", "for-women", "electronics", "home-living", "home", "home-and-living"];
  const displayCollections = targetHandles
    .map(handle => collections.find(c => c.handle === handle))
    .filter(Boolean) as Collection[];

  // Fallback to top 4 if those specific handles don't exist in dev store
  const items = displayCollections.length > 0 ? displayCollections.slice(0, 4) : collections.slice(0, 4);

  if (!items || items.length === 0) return null;

  return (
    <section className="w-full py-6">
      <div className="flex items-end justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-black text-ergo-navy-deep flex items-center gap-2">
          {icon && <span>{icon}</span>}
          {title}
        </h2>
        <Link 
          href={linkHref}
          className="text-sm font-bold text-ergo-navy hover:text-ergo-orange transition-colors flex items-center group"
        >
          {linkText} <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((collection) => {
          // Rule 1: Use the first product image from that collection as the background placeholder if no explicit image
          const imageUrl = collection.image?.url || collection.products?.edges?.[0]?.node?.images?.edges?.[0]?.node?.url;
          
          return (
            <Link
              key={collection.id}
              href={`/collections/${collection.handle}`}
              className="flex flex-col bg-white border border-ergo-border rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 group aspect-[4/5]"
            >
              <div className="w-full h-[70%] bg-white overflow-hidden relative">
                {imageUrl ? (
                  <img 
                    src={imageUrl} 
                    alt={collection.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                  />
                ) : (
                  <div className="w-full h-full bg-ergo-surface flex items-center justify-center text-gray-400 text-xs">
                     {collection.title}
                  </div>
                )}
              </div>
              <div className="h-[30%] flex items-center justify-center p-3">
                <span className="text-sm font-bold text-ergo-text text-center group-hover:text-ergo-navy transition-colors line-clamp-2 leading-tight">
                  {collection.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
