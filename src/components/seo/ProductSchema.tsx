// =====================================================================
// Product + Offer + AggregateRating + Review Structured Data
// THE single most important structured data for e-commerce SEO and
// AI search citation. Renders Product schema with full offer details,
// aggregate rating, and individual reviews.
// =====================================================================

import type { Product } from "@/lib/types";
import { SITE_METADATA } from "@/lib/constants";
import { SLUG_TO_IMAGES, SLUG_TO_FOLDER } from "@/lib/products-data";
import { buildOffer } from "@/lib/seo/json-ld";
import JsonLd from "./JsonLd";

type ReviewInput = {
  name: string;
  rating: number;
  text: string;
  date?: string;
};

type Props = {
  product: Product;
  reviews?: ReviewInput[];
  aggregateRating?: {
    ratingValue: number;
    reviewCount: number;
  };
};

export default function ProductSchema({
  product,
  reviews = [],
  aggregateRating,
}: Props) {
  const folder = SLUG_TO_FOLDER[product.slug] || product.slug;
  const images = SLUG_TO_IMAGES[product.slug] || [];
  const imageUrl =
    images.length > 0
      ? `${SITE_METADATA.url}/images/products/${encodeURIComponent(folder)}/${encodeURIComponent(images[0])}`
      : `${SITE_METADATA.url}${SITE_METADATA.logo}`;

  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: "ErgoAura",
    },
    image: imageUrl,
    offers: buildOffer(
      `${SITE_METADATA.url}/products/${product.slug}`,
      product.price,
      "INR",
      product.stock,
    ),
  };

  // Add aggregate rating if available
  if (aggregateRating && aggregateRating.reviewCount > 0) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: aggregateRating.ratingValue.toFixed(1),
      reviewCount: aggregateRating.reviewCount,
      bestRating: "5",
      worstRating: "1",
    };
  }

  // Add individual reviews if available
  if (reviews.length > 0) {
    schema.review = reviews.map((review) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating.toString(),
        bestRating: "5",
      },
      author: {
        "@type": "Person",
        name: review.name,
      },
      reviewBody: review.text,
      ...(review.date ? { datePublished: review.date } : {}),
    }));
  }

  return <JsonLd schema={schema} id={`product-schema-${product.slug}`} />;
}
