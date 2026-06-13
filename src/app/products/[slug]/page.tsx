import type { Metadata } from "next";
import {
  LOCAL_PRODUCTS,
  SLUG_TO_IMAGES,
  SLUG_TO_FOLDER,
} from "@/lib/products-data";
import { SITE_METADATA, SITE_URL } from "@/lib/constants";
import { PRODUCT_RICH_CONTENT } from "@/lib/product-content";
import { PRODUCT_REVIEW_SUMMARIES, PRODUCT_REVIEWS } from "@/lib/reviews-data";
import ProductDetailClient from "./ProductDetailClient";
import ProductSchema from "@/components/seo/ProductSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";
import FaqSchema from "@/components/seo/FaqSchema";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * Dynamically generates metadata (including Open Graph image) for each
 * product page so that social shares show the correct product image.
 * Includes canonical URL for SEO deduplication.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const product = LOCAL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return { title: "Product Not Found" };
  }

  // Build the absolute URL to the primary product image
  const images = SLUG_TO_IMAGES[slug];
  const folder = SLUG_TO_FOLDER[slug] || slug;
  const imageUrl =
    images && images.length > 0
      ? `/images/products/${encodeURIComponent(folder)}/${encodeURIComponent(images[0])}`
      : SITE_METADATA.logo;

  const title = `${product.name} | ${SITE_METADATA.title}`;
  const description = product.description;

  return {
    title: product.name,
    description,
    alternates: {
      canonical: `${SITE_URL}/products/${product.slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}/products/${product.slug}`,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
  };
}

/**
 * Product detail page — server component wrapper that provides
 * metadata / OG tags, structured data (Product, Breadcrumb, FAQ),
 * then delegates the interactive UI to the client component.
 */
export default async function Page({ params }: Props) {
  const { slug } = await params;

  const product = LOCAL_PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return <ProductDetailClient />;
  }

  const content = PRODUCT_RICH_CONTENT[slug];
  const reviewSummary = PRODUCT_REVIEW_SUMMARIES[slug];
  const reviews = PRODUCT_REVIEWS[slug] || [];

  // Build breadcrumb items: Home > Products > Product Name
  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Products", url: `${SITE_URL}/products` },
    { name: product.name, url: `${SITE_URL}/products/${product.slug}` },
  ];

  return (
    <>
      {/* JSON-LD Structured Data for this product */}
      <ProductSchema
        product={product}
        aggregateRating={
          reviewSummary
            ? {
                ratingValue: reviewSummary.averageRating,
                reviewCount: reviewSummary.totalReviews,
              }
            : undefined
        }
        reviews={reviews.slice(0, 10).map((r) => ({
          name: r.name,
          rating: r.rating,
          text: r.text,
          date: r.date,
        }))}
      />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* FAQ Schema from rich content — enables FAQ rich results in SERP */}
      {content?.faqs && content.faqs.length > 0 && (
        <FaqSchema faqs={content.faqs} />
      )}

      <ProductDetailClient />
    </>
  );
}
