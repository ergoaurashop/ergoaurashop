import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import { shopifyFetch, GET_PRODUCT_BY_HANDLE, GET_COLLECTION_BY_HANDLE } from "@/lib/shopify";
import { Product, Collection } from "@/lib/shopify/types";
import { getProductReviews, calculateReviewStats } from "@/lib/judgeme/api";

import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductActions } from "@/components/product/ProductActions";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductShelf } from "@/components/home/ProductShelf";
import { ProductBento } from "@/components/product/ProductBento";
import { StickyBuyBar } from "@/components/product/StickyBuyBar";

// ISR revalidate
export const revalidate = 3600;

export async function generateStaticParams() {
  try {
    const data = await shopifyFetch<{ products: { edges: { node: { handle: string } }[] } }>({
      query: `
        query {
          products(first: 200, sortKey: CREATED_AT, reverse: true) {
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
  
  if (!handle) notFound();

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

  // Fetch Judge.me reviews and related products concurrently
  const [reviewsData, relatedProductsData] = await Promise.all([
    getProductReviews(handle),
    (async () => {
      const primaryCollection = product.collections?.edges?.[0]?.node?.handle;
      try {
        const relatedData = await shopifyFetch<{ collection: Collection | null }>({
          query: GET_COLLECTION_BY_HANDLE,
          variables: { handle: primaryCollection || "new-arrivals" }
        });
        return relatedData?.collection?.products?.edges.map(e => e.node) || [];
      } catch (e) {
        return [];
      }
    })(),
  ]);

  let { reviews, stats } = reviewsData;

  // Fallback rating calculation for the top of the page (matches ProductReviews logic)
  if (reviews.length === 0 && product.reviews?.value) {
    try {
      const parsedReviews = JSON.parse(product.reviews.value);
      if (Array.isArray(parsedReviews) && parsedReviews.length > 0) {
        stats = calculateReviewStats(parsedReviews as any);
      }
    } catch {
      // Ignore parse errors here
    }
  }

  const relatedProducts = relatedProductsData
    .filter(p => p.handle !== product!.handle)
    .slice(0, 4);

  const isAvailable = product.variants.edges.some(v => v.node.availableForSale);

  return (
    <div className="flex flex-col w-full bg-white font-sans overflow-x-hidden selection:bg-ergo-navy selection:text-white">
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

      {/* Sticky Buy Bar for Conversion */}
      <StickyBuyBar product={product} />

      {/* Main Layout: Mobile full width, Desktop max-w split */}
      <div className="md:max-w-7xl md:mx-auto md:px-8 md:py-12 w-full flex flex-col md:flex-row md:gap-16">
        {/* Left Column: Image Gallery */}
        <div className="w-full md:w-1/2 lg:w-[55%]">
          <ProductGallery 
            images={product.images.edges.map(e => e.node)} 
            videoUrl={product.video_url?.value} 
            productTitle={product.title} 
          />
        </div>

        {/* Right Column: Information & Actions */}
        <div className="w-full md:w-1/2 lg:w-[45%] px-4 md:px-0 py-6 md:py-0 flex flex-col">
          {/* Breadcrumb */}
          <nav className="text-[10px] font-black text-ergo-muted mb-6 uppercase tracking-widest flex items-center gap-2">
            <Link href="/" className="hover:text-ergo-navy transition-colors">Home</Link>
            <span className="text-gray-300">/</span>
            <span className="text-ergo-text truncate">{product.title}</span>
          </nav>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-ergo-navy-deep leading-[1.1] tracking-tighter mb-4">
            {product.title}
          </h1>

          <div className="flex items-center gap-4 mb-8">
            {stats.total_reviews > 0 ? (
              <a href="#reviews" className="inline-flex items-center gap-1 text-yellow-400 text-sm hover:opacity-80 transition-opacity">
                {Array.from({ length: 5 }).map((_, i) => <span key={i}>{i < Math.floor(stats.average_rating) ? "★" : "☆"}</span>)}
                <span className="text-ergo-navy-deep font-black ml-2 hover:underline">{stats.average_rating}</span>
                <span className="text-ergo-muted text-xs font-semibold ml-1">({stats.total_reviews})</span>
              </a>
            ) : (
              <a href="#reviews" className="inline-flex items-center gap-1 text-ergo-muted text-sm hover:text-ergo-navy transition-colors">
                {Array.from({ length: 5 }).map((_, i) => <span key={i}>☆</span>)}
                <span className="font-bold ml-1 text-xs underline underline-offset-4">Write a review</span>
              </a>
            )}
            <div className="h-4 w-px bg-ergo-border" />
            <span className="text-[10px] font-black text-ergo-green bg-ergo-green/5 px-2 py-1 rounded-full uppercase tracking-widest">
              Verified Ergonomics
            </span>
          </div>

          {/* Interactive Variant Picker & Pricing & Cart */}
          <div className="p-6 md:p-8 bg-ergo-surface rounded-3xl border border-ergo-border">
            <ProductActions product={product} />
          </div>

          {/* Description & Technical Specs Base */}
          <ProductSpecs product={product} />
        </div>
      </div>

      {/* The Bento Highlight Engine */}
      <Suspense fallback={<div className="h-96 w-full animate-pulse bg-ergo-surface rounded-3xl" />}>
        <ProductBento highlightsRaw={product.highlights?.value} />
      </Suspense>

      {/* Full-width Advanced Reviews Dashboard */}
      <ProductReviews 
        title={product.title} 
        reviewsRaw={product.reviews?.value} 
        judgemeReviews={reviews}
        judgemeStats={stats}
      />

      {/* Related Products Shelf */}
      {relatedProducts.length > 0 && (
        <div className="bg-white py-12 md:py-20">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <ProductShelf 
              collection={{
                title: "Complete Your Setup",
                handle: "all",
                products: {
                  edges: relatedProducts.map(p => ({ node: p }))
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
