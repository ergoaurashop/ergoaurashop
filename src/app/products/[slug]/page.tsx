import type { Metadata } from "next";
import {
  LOCAL_PRODUCTS,
  SLUG_TO_IMAGES,
  SLUG_TO_FOLDER,
} from "@/lib/products-data";
import { SITE_METADATA } from "@/lib/constants";
import ProductDetailClient from "./ProductDetailClient";

type Props = {
  params: Promise<{ slug: string }>;
};

/**
 * Dynamically generates metadata (including Open Graph image) for each
 * product page so that social shares show the correct product image.
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
    openGraph: {
      title,
      description,
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
 * metadata / OG tags, then delegates the interactive UI to the
 * client component.
 */
export default function Page({ params }: Props) {
  return <ProductDetailClient />;
}
