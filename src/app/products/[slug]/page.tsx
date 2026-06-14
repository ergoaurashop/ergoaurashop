import type { Metadata } from "next";
import {
  LOCAL_PRODUCTS,
  SLUG_TO_IMAGES,
  SLUG_TO_FOLDER,
} from "@/lib/products-data";
import {
  S23_PRODUCT,
  S23_REVIEWS,
  S23_REVIEW_SUMMARY,
  S23_FAQS,
  S23_FOLDER,
} from "@/lib/s23-ultra-data";
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
/**
 * Encode a file-system path safely, segment by segment.
 * Handles nested paths like "Part-2/Samsung Galaxy S23 Ultra..."
 */
function encodePath(path: string): string {
  return path.split("/").map(encodeURIComponent).join("/");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  /* ── S23 Ultra — custom metadata ── */
  if (slug === "samsung-galaxy-s23-ultra") {
    const imageUrl = `/images/products/${encodePath(S23_FOLDER)}/${encodeURIComponent("galaxy-s23-ultra-highlights-kv-1.jpg")}`;
    const title = `Samsung Galaxy S23 Ultra at ₹14,990 | 88% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      "Samsung Galaxy S23 Ultra — 200MP Camera, S Pen, Snapdragon 8 Gen 2, 12GB RAM, 512GB Storage. International Version. Get it at 88% OFF — ₹14,990 only! Limited stock clearance.";
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/samsung-galaxy-s23-ultra`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/samsung-galaxy-s23-ultra`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "Samsung Galaxy S23 Ultra",
          },
        ],
      },
    };
  }

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

  /* ── S23 Ultra — standalone page with JSON-LD ── */
  if (slug === "samsung-galaxy-s23-ultra") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Samsung Galaxy S23 Ultra",
        url: `${SITE_URL}/products/samsung-galaxy-s23-ultra`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={S23_PRODUCT}
          aggregateRating={{
            ratingValue: S23_REVIEW_SUMMARY.averageRating,
            reviewCount: S23_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={S23_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {S23_FAQS.length > 0 && <FaqSchema faqs={S23_FAQS} />}
        <ProductDetailClient />
      </>
    );
  }

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
