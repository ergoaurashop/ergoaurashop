import { Metadata } from "next";
import Link from "next/link";
import { shopifyFetch, GET_ALL_COLLECTIONS } from "@/lib/shopify";
import { Collection } from "@/lib/shopify/types";
import Image from "next/image";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "All Collections | ErgoAura",
  description: "Browse our premium selection of ergonomic furniture and smart wellness devices.",
};

export default async function CollectionsIndexPage() {
  let collections: Collection[] = [];
  try {
    const data = await shopifyFetch<{ collections: { edges: { node: Collection }[] } }>({
      query: GET_ALL_COLLECTIONS,
    });
    collections = data.collections?.edges.map(e => e.node) || [];
  } catch (err) {
    console.error("[CollectionsPage] Failed to fetch collections:", err);
  }

  return (
    <div className="w-full bg-white min-h-screen py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-black text-ergo-navy-deep tracking-tighter mb-4">Shop by Category</h1>
          <p className="text-ergo-muted text-lg font-medium">Find exactly what you need to build the perfect ergonomic workspace or living space.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map(collection => (
            <Link 
              key={collection.id} 
              href={`/collections/${collection.handle}`}
              className="group flex flex-col items-start"
            >
              <div className="w-full aspect-[4/3] bg-ergo-surface rounded-3xl overflow-hidden mb-6 relative">
                {collection.image ? (
                  <Image 
                    src={collection.image.url}
                    alt={collection.image.altText || collection.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-ergo-navy/5 text-ergo-navy-deep">
                    <span className="font-black tracking-widest uppercase opacity-20 text-2xl">ErgoAura</span>
                  </div>
                )}
              </div>
              <h2 className="text-xl md:text-2xl font-black text-ergo-navy-deep tracking-tight group-hover:text-ergo-navy transition-colors">{collection.title}</h2>
              <p className="text-sm font-bold text-ergo-muted mt-2">{collection.products.edges.length} Products</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
