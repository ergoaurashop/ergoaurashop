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
import {
  IPHONE_PRODUCT,
  IPHONE_REVIEWS,
  IPHONE_REVIEW_SUMMARY,
  IPHONE_FAQS,
  IPHONE_FOLDER,
} from "@/lib/iphone-15-pro-max-data";
import {
  WC2026_PRODUCT,
  WC2026_PRODUCT_IMAGES,
  WC2026_REVIEWS,
  WC2026_REVIEW_SUMMARY,
  WC2026_FAQS,
  WC2026_FOLDER,
} from "@/lib/worldcup-2026-data";
import {
  ERGO_TEST_PRODUCT,
  ERGO_TEST_REVIEWS,
  ERGO_TEST_REVIEW_SUMMARY,
  ERGO_TEST_FAQS,
} from "@/lib/ergoslug-test-data";
import { SITE_METADATA, SITE_URL } from "@/lib/constants";
import { PRODUCT_RICH_CONTENT } from "@/lib/product-content";
import { PRODUCT_REVIEW_SUMMARIES, PRODUCT_REVIEWS } from "@/lib/reviews-data";
import { formatPrice } from "@/lib/utils";
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

/**
 * Pre-render ALL product pages as static HTML at build time.
 * This ensures Googlebot receives fully rendered content,
 * not client-side loading skeletons.
 * Any new product added to LOCAL_PRODUCTS is automatically included.
 */
export async function generateStaticParams() {
  const regularSlugs = LOCAL_PRODUCTS.map((p) => p.slug);
  const specialSlugs = [
    "samsung-galaxy-s23-ultra",
    "iphone-15-pro-max-512gb",
    "messi-argentina-2026-jersey",
  ];
  // ergoslug-test-test is excluded — it has noindex

  const seen = new Set<string>();
  const allSlugs: string[] = [];
  for (const slug of [...regularSlugs, ...specialSlugs]) {
    if (!seen.has(slug)) {
      seen.add(slug);
      allSlugs.push(slug);
    }
  }
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  /* ── S23 Ultra — custom metadata ── */
  if (slug === "samsung-galaxy-s23-ultra") {
    const imageUrl = `/images/products/${encodePath(S23_FOLDER)}/${encodeURIComponent("galaxy-s23-ultra-highlights-kv-1.jpg")}`;
    const title = `Samsung Galaxy S23 Ultra at ₹24,990/- | 80% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      "Samsung Galaxy S23 Ultra — 200MP Camera, S Pen, Snapdragon 8 Gen 2, 12GB RAM, 512GB Storage. International Version. Get it at 80% OFF — ₹24,990/- only! Limited stock clearance.";
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

  /* ── iPhone 15 Pro Max 512GB — custom metadata ── */
  if (slug === "iphone-15-pro-max-512gb") {
    const imageUrl = `/images/products/${encodePath(IPHONE_FOLDER)}/${encodeURIComponent("Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.xlarge_2x.jpg")}`;
    const title = `iPhone 15 Pro Max 512GB at ₹46,990 | 51% OFF Mega Deal | ${SITE_METADATA.title}`;
    const description =
      "iPhone 15 Pro Max 512GB — A17 Pro Chip, 48MP Camera System, Titanium Design, 8GB RAM. International Version. Get it at 51% OFF — ₹46,990 only! Limited stock clearance.";
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/iphone-15-pro-max-512gb`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/iphone-15-pro-max-512gb`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "iPhone 15 Pro Max 512GB",
          },
        ],
      },
    };
  }

  /* ── ErgoSlug Test — payment check page (noindex, nofollow) ── */
  if (slug === "ergoslug-test-test") {
    return {
      title: "Payment Check — Test Product",
      description: "Internal payment testing page. Not for public use.",
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
      alternates: {
        canonical: `${SITE_URL}/products/ergoslug-test-test`,
      },
    };
  }

  /* ── Messi Argentina 2026 Jersey — custom metadata ── */
  if (slug === "messi-argentina-2026-jersey") {
    const imageUrl = `/images/products/${encodePath(WC2026_FOLDER)}/${encodeURIComponent("Home/71DbIUtPvCL._AC_SX569_.jpg")}`;
    const title = `Messi Argentina 2026 World Cup Jersey at ₹499 | 50% OFF | ${SITE_METADATA.title}`;
    const description =
      "Dress like a champion with Messi's exact replica jersey for Argentina. ADIDAS original replica, breathable fabric, available in S-XXL. Buy 3 Get 1 Free! Limited stock.";
    return {
      title,
      description,
      alternates: {
        canonical: `${SITE_URL}/products/messi-argentina-2026-jersey`,
      },
      openGraph: {
        title,
        description,
        url: `${SITE_URL}/products/messi-argentina-2026-jersey`,
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 1200,
            alt: "Messi Argentina 2026 World Cup Jersey",
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
        {/* Server-rendered content for Googlebot — visible until JS hydrates */}
        <div id="ssr-product-root" data-slug="samsung-galaxy-s23-ultra">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden flex items-center justify-center p-4">
                    <span className="text-apple-text-secondary">
                      Samsung Galaxy S23 Ultra
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {S23_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(S23_PRODUCT.price)}
                    </span>
                    {S23_PRODUCT.original_price > S23_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(S23_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{S23_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {S23_PRODUCT.description}
                  </p>
                  {S23_PRODUCT.features && S23_PRODUCT.features.length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                        Key Features
                      </h3>
                      <ul className="space-y-2">
                        {S23_PRODUCT.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-3 text-sm text-apple-text-primary"
                          >
                            <svg
                              className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                            >
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── iPhone 15 Pro Max 512GB — standalone page with JSON-LD ── */
  if (slug === "iphone-15-pro-max-512gb") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "iPhone 15 Pro Max 512GB",
        url: `${SITE_URL}/products/iphone-15-pro-max-512gb`,
      },
    ];

    return (
      <>
        <ProductSchema
          product={IPHONE_PRODUCT}
          aggregateRating={{
            ratingValue: IPHONE_REVIEW_SUMMARY.averageRating,
            reviewCount: IPHONE_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={IPHONE_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {IPHONE_FAQS.length > 0 && <FaqSchema faqs={IPHONE_FAQS} />}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="iphone-15-pro-max-512gb">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden flex items-center justify-center p-4">
                    <span className="text-apple-text-secondary">
                      iPhone 15 Pro Max 512GB
                    </span>
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {IPHONE_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(IPHONE_PRODUCT.price)}
                    </span>
                    {IPHONE_PRODUCT.original_price > IPHONE_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(IPHONE_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{IPHONE_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {IPHONE_PRODUCT.description}
                  </p>
                  {IPHONE_PRODUCT.features &&
                    IPHONE_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {IPHONE_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductDetailClient />
      </>
    );
  }

  /* ── ErgoSlug Test — payment check page (no JSON-LD, no indexing) ── */
  if (slug === "ergoslug-test-test") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Payment Check — Test Product",
        url: `${SITE_URL}/products/ergoslug-test-test`,
      },
    ];

    return (
      <>
        <BreadcrumbSchema items={breadcrumbItems} />
        <ProductDetailClient />
      </>
    );
  }

  /* ── Messi Argentina 2026 Jersey — standalone page with JSON-LD ── */
  if (slug === "messi-argentina-2026-jersey") {
    const breadcrumbItems = [
      { name: "Home", url: SITE_URL },
      { name: "Products", url: `${SITE_URL}/products` },
      {
        name: "Messi Argentina 2026 Jersey",
        url: `${SITE_URL}/products/messi-argentina-2026-jersey`,
      },
    ];

    const heroImageUrl = `/images/products/${WC2026_FOLDER.split("/").map(encodeURIComponent).join("/")}/${WC2026_PRODUCT_IMAGES[0].split("/").map(encodeURIComponent).join("/")}`;

    return (
      <>
        <ProductSchema
          product={WC2026_PRODUCT}
          aggregateRating={{
            ratingValue: WC2026_REVIEW_SUMMARY.averageRating,
            reviewCount: WC2026_REVIEW_SUMMARY.totalReviews,
          }}
          reviews={WC2026_REVIEWS.slice(0, 10).map((r) => ({
            name: r.name,
            rating: r.rating,
            text: r.text,
            date: r.date,
          }))}
        />
        <BreadcrumbSchema items={breadcrumbItems} />
        {WC2026_FAQS.length > 0 && <FaqSchema faqs={WC2026_FAQS} />}
        {/* Server-rendered content for Googlebot */}
        <div id="ssr-product-root" data-slug="messi-argentina-2026-jersey">
          <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
            <div className="section-container">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
                <div className="lg:col-span-2 space-y-4">
                  <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden flex items-center justify-center">
                    <img
                      src={heroImageUrl}
                      alt="Messi Argentina 2026 Jersey"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {WC2026_PRODUCT.name}
                  </h1>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-semibold text-apple-text-primary">
                      {formatPrice(WC2026_PRODUCT.price)}
                    </span>
                    {WC2026_PRODUCT.original_price > WC2026_PRODUCT.price && (
                      <>
                        <span className="text-lg text-apple-text-secondary line-through">
                          {formatPrice(WC2026_PRODUCT.original_price)}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                          -{WC2026_PRODUCT.discount_percentage}%
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-apple-text-secondary leading-relaxed">
                    {WC2026_PRODUCT.description}
                  </p>
                  {WC2026_PRODUCT.features &&
                    WC2026_PRODUCT.features.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                          Key Features
                        </h3>
                        <ul className="space-y-2">
                          {WC2026_PRODUCT.features.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-sm text-apple-text-primary"
                            >
                              <svg
                                className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                              >
                                <path d="M20 6L9 17l-5-5" />
                              </svg>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
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

  const localImageUrls = SLUG_TO_IMAGES[slug] || [];

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

      {/* Server-rendered product content for Googlebot */}
      <div id="ssr-product-root" data-slug={product.slug}>
        <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
          <div className="section-container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16">
              {/* Image placeholder */}
              <div className="lg:col-span-2 space-y-4">
                <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden flex items-center justify-center p-4">
                  {localImageUrls.length > 0 ? (
                    <span className="text-apple-text-secondary text-sm">
                      {product.name}
                    </span>
                  ) : (
                    <span className="text-apple-text-secondary">
                      {product.name}
                    </span>
                  )}
                </div>
              </div>

              {/* Product info */}
              <div className="space-y-6">
                {/* Page Title (SEO-optimised) */}
                {content?.pageTitle ? (
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {content.pageTitle}
                  </h1>
                ) : (
                  <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                    {product.name}
                  </h1>
                )}

                {/* Tagline */}
                {content?.tagline && (
                  <p className="text-lg text-apple-text-secondary leading-relaxed italic">
                    {content.tagline}
                  </p>
                )}

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-semibold text-apple-text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.original_price > product.price && (
                    <>
                      <span className="text-lg text-apple-text-secondary line-through">
                        {formatPrice(product.original_price)}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        -{product.discount_percentage}%
                      </span>
                    </>
                  )}
                </div>

                {/* Stock warning */}
                {content?.stockWarning && (
                  <p className="text-sm font-medium text-red-500">
                    ⚡ {content.stockWarning}
                  </p>
                )}

                {/* Description */}
                <p className="text-apple-text-secondary leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                      Key Features
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-apple-text-primary"
                        >
                          <svg
                            className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
                            <path d="M20 6L9 17l-5-5" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Specifications */}
                {product.specifications &&
                  Object.keys(product.specifications).length > 0 && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                        Specifications
                      </h3>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        {Object.entries(product.specifications).map(
                          ([key, value]) => (
                            <div key={key} className="contents">
                              <span className="text-apple-text-secondary">
                                {key}
                              </span>
                              <span className="text-apple-text-primary">
                                {value}
                              </span>
                            </div>
                          ),
                        )}
                      </div>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductDetailClient />
    </>
  );
}
