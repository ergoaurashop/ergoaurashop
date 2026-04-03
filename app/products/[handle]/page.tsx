import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { shopifyFetch, GET_PRODUCT_BY_HANDLE, GET_COLLECTION_BY_HANDLE } from "@/lib/shopify";
import { Product, Collection } from "@/lib/shopify/types";

import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductShelf } from "@/components/home/ProductShelf";
import { HighlightsGrid } from "@/components/product/HighlightsGrid";

// ISR revalidate
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const data = await shopifyFetch<{ products: { edges: { node: { handle: string } }[] } }>({
      query: `
        query {
          products(first: 200, sortKey: PUBLISHED_AT, reverse: true) {
            edges { node { handle } }
          }
        }
      `
    });
    return data.products.edges.map(e => ({ handle: e.node.handle }));
  } catch (e) {
    console.error("Error generating static params for products:", e);
    return [];
  }
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params;
  try {
    const data = await shopifyFetch<{ product: Product | null }>({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
    });
    const product = data.product;
    if (!product) return {};

    return {
      title: product.title,
      description: product.description,
      openGraph: {
        title: `${product.title} | ErgoAura`,
        description: product.description,
        images: product.images.edges[0]?.node.url ? [{ url: product.images.edges[0].node.url }] : [],
        type: "website",
      },
      alternates: {
        canonical: `/products/${product.handle}`,
      }
    };
  } catch {
    return {};
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  
  let product: Product | null = null;
  try {
    const data = await shopifyFetch<{ product: Product | null }>({
      query: GET_PRODUCT_BY_HANDLE,
      variables: { handle },
    });
    product = data.product;
  } catch (err) {
    console.error(err);
  }

  if (!product) {
    notFound();
  }

  // Related products fallback (fetch new-arrivals as a proxy for 'same collection')
  let relatedProducts: Product[] = [];
  try {
    const relatedData = await shopifyFetch<{ collection: Collection | null }>({
      query: GET_COLLECTION_BY_HANDLE,
      variables: { handle: "new-arrivals" }
    });
    if (relatedData?.collection?.products?.edges) {
      relatedProducts = relatedData.collection.products.edges
        .map(e => e.node)
        .filter(p => p.handle !== product!.handle)
        .slice(0, 4);
    }
  } catch (e) {
    // Ignore related fetch errors
  }

  const isAvailable = product.variants.edges.some(v => v.node.availableForSale);

  return (
    <div className="flex flex-col w-full bg-white font-sans overflow-x-hidden">
      {/* Product Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.title,
            description: product.description,
            image: product.images.edges[0]?.node.url,
            brand: { "@type": "Brand", name: "ErgoAura" },
            offers: {
              "@type": "Offer",
              price: product.priceRange.minVariantPrice.amount,
              priceCurrency: product.priceRange.minVariantPrice.currencyCode,
              availability: isAvailable ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
              url: `https://ergoaurashop.com/products/${product.handle}`
            }
          })
        }}
      />

      {/* Main Layout: Mobile full width, Desktop max-w split */}
      <div className="md:max-w-7xl md:mx-auto md:px-8 md:py-8 w-full flex flex-col md:flex-row md:gap-12">
        {/* Left Column: Image Gallery (Takes full width on mobile with no padding) */}
        <div className="w-full md:w-1/2">
          <ProductGallery 
            images={product.images.edges.map(e => e.node)} 
            videoUrl={product.video_url?.value} 
            productTitle={product.title} 
          />
        </div>

        {/* Right Column: Information & Actions */}
        <div className="w-full md:w-1/2 px-4 md:px-0 py-6 md:py-0 flex flex-col">
          {/* Breadcrumb */}
          <nav className="text-[11px] md:text-xs font-black text-ergo-muted mb-4 uppercase tracking-wider flex items-center gap-2">
            <Link href="/" className="hover:text-ergo-navy transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-ergo-text truncate">{product.title}</span>
          </nav>

          <h1 className="text-2xl md:text-3xl lg:text-4xl font-black text-ergo-navy-deep leading-tight md:leading-snug mb-3">
            {product.title}
          </h1>

          <a href="#reviews" className="inline-flex items-center gap-1.5 text-yellow-400 text-sm mb-6 hover:opacity-80 transition-opacity">
            <span>★★★★<span className="relative">★<span className="absolute inset-0 text-gray-300 overflow-hidden" style={{ width: '20%' }}>★</span></span></span>
            <span className="text-ergo-navy-deep font-bold ml-1 hover:underline">4.8 <span className="text-ergo-muted">(124 reviews)</span></span>
          </a>

          {/* Interactive Variant Picker & Pricing & Cart */}
          <ProductActions product={product} />

          {/* Highlights Grid */}
          <HighlightsGrid highlightsRaw={product.highlights?.value} />

          {/* Description, Specs Base */}
          <ProductSpecs product={product} />
        </div>
      </div>

      {/* Full-width Reviews Block */}
      <ProductReviews title={product.title} />

      {/* Related Products Shelf */}
      {relatedProducts.length > 0 && (
        <div className="bg-white">
          <ProductShelf 
            collection={{
              title: "You May Also Like",
              handle: "all",
              products: {
                edges: relatedProducts.map(p => ({ node: p }))
              }
            }}
          />
        </div>
      )}
    </div>
  );
}
