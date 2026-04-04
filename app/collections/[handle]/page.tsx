import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { shopifyFetch, GET_COLLECTION_BY_HANDLE } from "@/lib/shopify";
import { Collection, Product } from "@/lib/shopify/types";
import { ProductCard } from "@/components/product/ProductCard";
import Image from "next/image";

// ISR revalidation
export const revalidate = 3600;

export async function generateStaticParams() {
  const data = await shopifyFetch<{ collections: { edges: { node: { handle: string } }[] } }>({
    query: `
      query {
        collections(first: 100) {
          edges { node { handle } }
        }
      }
    `
  });
  return data.collections?.edges.map(e => ({ handle: e.node.handle })) || [];
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  const data = await shopifyFetch<{ collection: Collection | null }>({
    query: GET_COLLECTION_BY_HANDLE,
    variables: { handle },
  });

  const collection = data.collection;
  if (!collection) return {};

  return {
    title: `${collection.title} | ErgoAura`,
    description: collection.description || `Shop ${collection.title} at ErgoAura.`,
    openGraph: {
      title: `${collection.title} | ErgoAura`,
      description: collection.description || `Browse the best ergonomic ${collection.title.toLowerCase()}.`,
      type: "website",
      images: collection.image?.url ? [{ url: collection.image.url }] : [],
    },
    alternates: {
      canonical: `/collections/${collection.handle}`
    }
  };
}

export default async function CollectionPage({ params, searchParams }: { params: Promise<{ handle: string }>, searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const { handle } = await params;
  const search = await searchParams;
  
  // Note: For a fully dynamic sorting solution we would use the getSortedCollection action with client components.
  // This initial server render gives fast LCP for the default view.
  const data = await shopifyFetch<{ collection: Collection | null }>({
    query: GET_COLLECTION_BY_HANDLE,
    variables: { handle },
  });

  const collection = data.collection;
  if (!collection) {
    notFound();
  }

  const products = collection.products.edges.map(e => e.node);

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      {/* Collection Header */}
      <div className="relative w-full h-64 md:h-80 bg-ergo-navy-deep overflow-hidden">
        {collection.image && (
          <Image
            src={collection.image.url}
            alt={collection.image.altText || collection.title}
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
        )}
        <div className="absolute inset-0 flex flex-col justify-center items-center px-4 text-center z-10">
          <nav className="text-[10px] font-black text-white/70 mb-4 uppercase tracking-widest flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="text-white/30">/</span>
            <Link href="/collections" className="hover:text-white transition-colors">Collections</Link>
            <span className="text-white/30">/</span>
            <span className="text-white truncate">{collection.title}</span>
          </nav>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            {collection.title}
          </h1>
          {collection.description && (
            <p className="text-white/80 max-w-2xl text-sm md:text-base font-medium">
              {collection.description}
            </p>
          )}
        </div>
      </div>

      {/* Product Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 w-full">
        {/* Controls Bar */}
        <div className="flex justify-between items-center mb-8 border-b border-ergo-border pb-4">
          <p className="text-sm font-bold text-ergo-navy-deep">{products.length} Products</p>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-ergo-muted uppercase tracking-wider">Sort By</span>
            <select className="text-sm font-bold bg-ergo-surface border border-ergo-border rounded-full px-4 py-2 text-ergo-navy-deep outline-none focus:border-ergo-navy">
              <option value="featured">Featured</option>
              <option value="best-selling">Best Selling</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        {products.length > 0 ? (
          <ul className="product-grid">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 bg-ergo-surface rounded-3xl border border-ergo-border border-dashed text-center">
            <h2 className="text-xl font-black text-ergo-navy-deep tracking-tight mb-2">No products found</h2>
            <p className="text-sm text-ergo-muted font-medium mb-6">This collection is currently empty.</p>
            <Link href="/" className="bg-ergo-navy text-white px-6 py-2 rounded-full font-bold text-xs hover:bg-ergo-navy-deep transition-colors">
              Return Home
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
