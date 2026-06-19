"use client";

import dynamic from "next/dynamic";
import Image from "next/image";

import { trackViewItem } from "@/lib/analytics/events";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Product, ProductReviewDetail } from "@/lib/types";
import { formatPrice, getProductImageUrl, getProductImages } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { useCartStore } from "@/store/cartStore";
import { getProductContent } from "@/lib/product-content";

/* Lazy-load S23 section — only loaded when slug matches */
const S23SamsungGalaxySection = dynamic(
  () => import("@/components/products/s23/S23SamsungGalaxySection"),
  { ssr: false },
);

/* Lazy-load iPhone 15 Pro Max section — only loaded when slug matches */
const IPhone15ProMaxSection = dynamic(
  () => import("@/components/products/iphone-15-pro-max/IPhone15ProMaxSection"),
  { ssr: false },
);

/* Lazy-load WorldCup 2026 section — only loaded when slug matches */
const WorldCup2026Section = dynamic(
  () => import("@/components/products/worldcup2026/WorldCup2026Section"),
  { ssr: false },
);
import { LOCAL_PRODUCTS } from "@/lib/products-data";
import { useProductReviews, type SortOption } from "@/hooks/useProductReviews";
import StickyCartPanel from "@/components/products/StickyCartPanel";
import PetalsBackground from "@/components/products/PetalsBackground";

/* ────────────────────────────────────────────────────────────────
   Star Rating Component
   ──────────────────────────────────────────────────────────────── */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${
            star <= rating ? "text-yellow-400" : "text-gray-300"
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Review Card — Amazon-style individual review
   ──────────────────────────────────────────────────────────────── */
function ReviewCard({ review }: { review: ProductReviewDetail }) {
  return (
    <div className="bg-white border border-sand-darker/40 rounded-apple p-5 transition-shadow hover:shadow-sm">
      {/* Top row: Stars + date */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-0.5">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${
                star <= review.rating ? "text-yellow-400" : "text-gray-300"
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
        <span className="text-xs text-apple-text-secondary">
          {new Date(review.date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      </div>

      {/* Review title */}
      <h4 className="text-sm font-semibold text-apple-text-primary mb-1">
        {review.title}
      </h4>

      {/* Review text */}
      <p className="text-sm text-apple-text-primary leading-relaxed mb-3">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Bottom: Name + City + Verified Badge + Helpful */}
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-apple-text-secondary">
        <span className="font-medium text-apple-text-primary">
          {review.name}
        </span>
        <span className="hidden sm:inline">·</span>
        <span>{review.city}</span>
        {review.isVerified && (
          <>
            <span>·</span>
            <span className="inline-flex items-center gap-1 text-[#059669] font-medium">
              <svg
                className="w-3.5 h-3.5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              Verified Purchase
            </span>
          </>
        )}
      </div>

      {/* Helpful count */}
      {review.helpfulCount > 0 && (
        <div className="mt-3 flex items-center gap-3 text-xs text-apple-text-secondary">
          <button
            className="inline-flex items-center gap-1 hover:text-[#C9A962] transition-colors"
            aria-label="Mark as helpful"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            Helpful ({review.helpfulCount})
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Icon helper for What's in the Box items ── */
function getBoxIcon(name: string): string {
  const lower = name.toLowerCase();
  if (lower.includes("brace") || lower.includes("strap")) return "🔄";
  if (lower.includes("massage") || lower.includes("roller")) return "🔵";
  if (lower.includes("mask") || lower.includes("eye")) return "👁️";
  if (lower.includes("cable") || lower.includes("usb")) return "🔌";
  if (lower.includes("pad") || lower.includes("heat")) return "🌡️";
  if (lower.includes("pouch") || lower.includes("phone")) return "📱";
  if (lower.includes("cover") || lower.includes("shoe")) return "👟";
  if (lower.includes("guard") || lower.includes("splatter")) return "🛡️";
  if (lower.includes("tool") || lower.includes("vacuum")) return "🛠️";
  if (lower.includes("catcher") || lower.includes("drain")) return "🚿";
  if (lower.includes("belt") || lower.includes("corrector")) return "🎽";
  return "📦";
}

/* ────────────────────────────────────────────────────────────────
   Section Header
   ──────────────────────────────────────────────────────────────── */
function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="text-center mb-8 lg:mb-10">
      <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-apple-text-primary">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-apple-text-secondary max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* ────────────────────────────────────────────────────────────────
   Product Detail Page
   ──────────────────────────────────────────────────────────────── */
export default function ProductDetailClient() {
  const params = useParams();
  const slug = params.slug as string;

  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const hasTrackedView = useRef(false);

  /* Try Supabase first, fall back to local data */
  useEffect(() => {
    async function fetchProduct() {
      try {
        const supabase = getSupabaseClient();
        const { data } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug)
          .single();
        if (data) {
          setProduct(data as Product);
        } else {
          /* fallback to local */
          const local = LOCAL_PRODUCTS.find((p) => p.slug === slug);
          if (local) setProduct(local);
        }
      } catch {
        const local = LOCAL_PRODUCTS.find((p) => p.slug === slug);
        if (local) setProduct(local);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchProduct();
  }, [slug]);

  // Track view_item once product is loaded
  useEffect(() => {
    if (!loading && product && !hasTrackedView.current) {
      hasTrackedView.current = true;
      trackViewItem(product);
    }
  }, [loading, product]);

  /* Rich content from our prep files */
  const content = getProductContent(slug);

  /* Review data */
  const {
    summary: reviewSummary,
    displayed: displayedReviews,
    hasMore,
    totalFiltered,
    sortBy,
    changeSort,
    filterRating,
    changeFilterRating,
    loadMore,
    distribution,
  } = useProductReviews(slug);

  const localImageUrls = getProductImages(slug);
  const images =
    localImageUrls.length > 0
      ? localImageUrls
      : product?.images?.length
        ? product.images
        : [getProductImageUrl(slug)];

  /* ── iPhone 15 Pro Max 512GB — fully self-contained page ── */
  if (slug === "iphone-15-pro-max-512gb") {
    return <IPhone15ProMaxSection />;
  }

  /* ── S23 Ultra — fully self-contained page (hooks above are called unconditionally) ── */
  if (slug === "samsung-galaxy-s23-ultra") {
    return <S23SamsungGalaxySection />;
  }

  /* ── WorldCup 2026 — fully self-contained page ── */
  if (slug === "messi-argentina-2026-jersey") {
    return <WorldCup2026Section />;
  }

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="pt-28 sm:pt-32 section-container">
        <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-square bg-apple-bg rounded-apple" />
          <div className="space-y-4">
            <div className="h-8 bg-apple-bg rounded w-3/4" />
            <div className="h-6 bg-apple-bg rounded w-1/3" />
            <div className="h-20 bg-apple-bg rounded" />
          </div>
        </div>
      </div>
    );
  }

  /* ── Not found ── */
  if (!product) {
    return (
      <div className="pt-28 sm:pt-32 section-container text-center py-20">
        <p className="text-apple-text-secondary">Product not found.</p>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
     Render
     ──────────────────────────────────────────────────────────────── */
  return (
    <div className="pt-28 sm:pt-32 pb-16 lg:pb-24">
      <div className="section-container">
        {/* ==========================================================
            HERO — Image Gallery + Product Info + Sticky Panel
            ========================================================== */}
        <div
          ref={heroRef}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mb-16"
        >
          {/* ── Image Gallery (lg: col-span-2) ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Main image with arrows & swipe */}
            <div className="relative group aspect-square bg-apple-bg rounded-apple overflow-hidden">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-4 select-none"
                draggable={false}
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0].clientX;
                }}
                onTouchMove={(e) => {
                  touchEndX.current = e.touches[0].clientX;
                }}
                onTouchEnd={() => {
                  const diff = touchStartX.current - touchEndX.current;
                  if (Math.abs(diff) > 50) {
                    if (diff > 0) {
                      setSelectedImage((prev) => (prev + 1) % images.length);
                    } else {
                      setSelectedImage(
                        (prev) => (prev - 1 + images.length) % images.length,
                      );
                    }
                  }
                }}
              />

              {/* Desktop: Previous arrow */}
              <button
                onClick={() =>
                  setSelectedImage(
                    (prev) => (prev - 1 + images.length) % images.length,
                  )
                }
                className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-200 cursor-pointer"
                aria-label="Previous image"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              {/* Desktop: Next arrow */}
              <button
                onClick={() =>
                  setSelectedImage((prev) => (prev + 1) % images.length)
                }
                className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm shadow-md opacity-0 group-hover:opacity-100 hover:bg-white transition-all duration-200 cursor-pointer"
                aria-label="Next image"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            {/* Thumbnail strip */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-apple-sm overflow-hidden border-2 shrink-0 relative transition-colors ${
                      i === selectedImage
                        ? "border-apple-black"
                        : "border-transparent hover:border-apple-border"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div className="space-y-6">
            {/* Page Title (SEO-optimised) */}
            {content?.pageTitle && (
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                {content.pageTitle}
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
                  <Badge variant="discount">
                    -{product.discount_percentage}%
                  </Badge>
                </>
              )}
            </div>

            {/* Stock warning */}
            {content?.stockWarning && (
              <p className="text-sm font-medium text-red-500">
                ⚡ {content.stockWarning}
              </p>
            )}

            {/* Short description (from product data) */}
            <p className="text-apple-text-secondary leading-relaxed">
              {product.description}
            </p>

            {/* Features (from product data) */}
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

          {/* ── Sticky Cart Panel (desktop sidebar + mobile bottom bar) ── */}
          <div className="hidden lg:block">
            <StickyCartPanel product={product} heroRef={heroRef} />
          </div>
        </div>

        {/* Mobile sticky bar — rendered outside grid for full-width positioning */}
        <div className="lg:hidden">
          <StickyCartPanel product={product} heroRef={heroRef} />
        </div>

        {/* ==========================================================
            BENEFITS STRIP
            ========================================================== */}
        {content?.benefits && content.benefits.length > 0 && (
          <section className="mb-16">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {content.benefits.map((b, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-3 bg-apple-bg rounded-apple-sm p-5 text-center"
                >
                  <i className={`${b.icon} text-2xl text-apple-text-primary`} />
                  <span className="text-sm font-medium text-apple-text-primary">
                    {b.label}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ==========================================================
            PAIN vs SOLUTION — Redesigned
            ========================================================== */}
        {content?.painPoints &&
          content.painPoints.length > 0 &&
          content.solutionPoints &&
          content.solutionPoints.length > 0 && (
            <section className="mb-16">
              <SectionHeader
                title="Before & After"
                subtitle="See the difference this product makes"
              />
              <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* ── "VS" divider badge ── */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <span className="w-10 h-10 rounded-full bg-gold text-primary text-sm font-bold flex items-center justify-center shadow-gold">
                    VS
                  </span>
                </div>

                {/* Pain — Dark & Moody (improved readability) */}
                <div className="relative overflow-hidden rounded-2xl bg-[#2A2522] border border-[#3D3733] p-6 sm:p-8">
                  {/* Subtle diamond pattern overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.04]"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 25px 25px, #C9A962 1px, transparent 1px)",
                      backgroundSize: "50px 50px",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-10 h-10 rounded-full bg-red-400/20 flex items-center justify-center text-lg">
                        ❌
                      </span>
                      <h3 className="text-xl font-bold text-white">
                        Without It
                      </h3>
                    </div>
                    <ul className="space-y-3.5">
                      {content.painPoints.map((p, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-gray-100"
                        >
                          <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-white/15 flex items-center justify-center text-red-300 text-xs font-bold">
                            ✕
                          </span>
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Solution — Light & Premium */}
                <div className="relative rounded-2xl bg-white border border-gold/20 border-l-4 border-l-gold p-6 sm:p-8 shadow-gold">
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-lg">
                        ✅
                      </span>
                      <h3 className="text-xl font-bold text-apple-text-primary">
                        With It
                      </h3>
                    </div>
                    <ul className="space-y-3.5">
                      {content.solutionPoints.map((s, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-sm text-apple-text-primary"
                        >
                          <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs font-bold">
                            ✓
                          </span>
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          )}

        {/* ==========================================================
            BULLET BENEFITS (5 persuasive bullets)
            ========================================================== */}
        {content?.bulletBenefits && content.bulletBenefits.length > 0 && (
          <section className="mb-16 relative overflow-hidden">
            {/* Floating petals background */}
            <PetalsBackground />
            <SectionHeader
              title="Why You'll Love It"
              subtitle="5 reasons this product makes your life better"
            />
            <div className="relative z-10 space-y-4 max-w-3xl mx-auto">
              {content.bulletBenefits.map((b, i) => {
                const gradients = [
                  "from-purple-50 via-pink-50 to-rose-50",
                  "from-sky-50 via-cyan-50 to-blue-50",
                  "from-amber-50 via-orange-50 to-yellow-50",
                  "from-emerald-50 via-teal-50 to-green-50",
                  "from-violet-50 via-fuchsia-50 to-pink-50",
                ];
                const g = gradients[i % gradients.length];
                return (
                  <div
                    key={i}
                    className={`flex items-start gap-4 rounded-apple-sm p-5 bg-gradient-to-r ${g} animate-gradient-drift bg-[length:200%_100%] border border-white/60 shadow-sm transition-shadow duration-300 hover:shadow-md`}
                  >
                    <span className="w-8 h-8 rounded-full bg-apple-black text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      {i + 1}
                    </span>
                    <p className="text-apple-text-primary leading-relaxed">
                      {b}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ==========================================================
            THE PROBLEM + SOLUTION (empathy hook + reveal)
            ========================================================== */}
        {content?.problemHook && (
          <section className="mb-16">
            <SectionHeader
              title="The Problem"
              subtitle="We understand — we've been there too"
            />
            <div className="max-w-3xl mx-auto space-y-6">
              {/* Problem Box — light amber with hashed pattern */}
              <div className="relative overflow-hidden rounded-2xl border-l-4 border-l-amber-400 bg-hash-pattern">
                <div className="relative z-10 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl">😟</span>
                    <h3 className="text-xl font-bold text-apple-text-primary">
                      The Problem
                    </h3>
                  </div>
                  <p className="text-apple-text-primary leading-relaxed text-lg italic">
                    &ldquo;{content.problemHook}&rdquo;
                  </p>
                </div>
              </div>

              {content.solutionBody && (
                <>
                  <h3 className="text-xl font-semibold text-apple-text-primary text-center">
                    The Solution
                  </h3>

                  {/* Solution Box — light gradient */}
                  <div className="relative overflow-hidden rounded-2xl border-l-4 border-l-emerald-400 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
                    <div className="relative z-10 p-6 sm:p-8">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-2xl">💡</span>
                        <h3 className="text-xl font-bold text-apple-text-primary">
                          The Solution
                        </h3>
                      </div>
                      <p className="text-apple-text-primary leading-relaxed">
                        {content.solutionBody}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </section>
        )}

        {/* ==========================================================
            WHAT'S IN THE BOX — Visual Grid of Cards
            ========================================================== */}
        {content?.whatsInTheBox &&
          Object.keys(content.whatsInTheBox).length > 0 && (
            <section className="mb-16">
              <SectionHeader
                title="What's in the Box"
                subtitle="Everything you get with your order"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(content.whatsInTheBox).map(
                  ([key, value], i) => {
                    const cardColours = [
                      {
                        bg: "bg-rose-50",
                        border: "border-l-rose-300",
                        icon: "bg-rose-100",
                      },
                      {
                        bg: "bg-sky-50",
                        border: "border-l-sky-300",
                        icon: "bg-sky-100",
                      },
                      {
                        bg: "bg-amber-50",
                        border: "border-l-amber-300",
                        icon: "bg-amber-100",
                      },
                      {
                        bg: "bg-emerald-50",
                        border: "border-l-emerald-300",
                        icon: "bg-emerald-100",
                      },
                      {
                        bg: "bg-violet-50",
                        border: "border-l-violet-300",
                        icon: "bg-violet-100",
                      },
                      {
                        bg: "bg-teal-50",
                        border: "border-l-teal-300",
                        icon: "bg-teal-100",
                      },
                      {
                        bg: "bg-pink-50",
                        border: "border-l-pink-300",
                        icon: "bg-pink-100",
                      },
                      {
                        bg: "bg-lime-50",
                        border: "border-l-lime-300",
                        icon: "bg-lime-100",
                      },
                    ];
                    const c = cardColours[i % cardColours.length];
                    return (
                      <div
                        key={key}
                        className={`flex flex-col items-center text-center gap-3 ${c.bg} rounded-apple p-5 border border-l-4 ${c.border} border-apple-border/20 hover:-translate-y-1 hover:shadow-md transition-all duration-200`}
                      >
                        <span
                          className={`w-12 h-12 rounded-full ${c.icon} flex items-center justify-center text-2xl shadow-sm`}
                        >
                          {getBoxIcon(key)}
                        </span>
                        <div>
                          <h4 className="font-semibold text-apple-text-primary text-sm">
                            {key}
                          </h4>
                          <p className="text-xs text-apple-text-secondary mt-1 leading-relaxed">
                            {value}
                          </p>
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </section>
          )}

        {/* ==========================================================
            WHO THIS IS PERFECT FOR — Animated Gradient Cards
            ========================================================== */}
        {content?.perfectFor && content.perfectFor.length > 0 && (
          <section className="mb-16">
            <SectionHeader
              title="Who This Is Perfect For"
              subtitle="This product was made for people like you"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {content.perfectFor.map((item, i) => {
                const gradients = [
                  "from-rose-100 via-pink-50 to-purple-100",
                  "from-sky-100 via-cyan-50 to-blue-100",
                  "from-amber-100 via-yellow-50 to-orange-100",
                  "from-emerald-100 via-teal-50 to-green-100",
                  "from-violet-100 via-fuchsia-50 to-pink-100",
                  "from-teal-100 via-cyan-50 to-sky-100",
                  "from-orange-100 via-amber-50 to-yellow-100",
                  "from-indigo-100 via-purple-50 to-violet-100",
                ];
                const g = gradients[i % gradients.length];
                return (
                  <div
                    key={i}
                    className={`rounded-apple p-5 bg-gradient-to-br ${g} animate-gradient-shift bg-[length:200%_200%] border border-white/60 shadow-sm`}
                  >
                    <h4 className="font-semibold text-apple-text-primary mb-1">
                      {item.audience}
                    </h4>
                    <p className="text-sm text-apple-text-secondary">
                      {item.reason}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ==========================================================
            FAQ
            ========================================================== */}
        {content?.faqs && content.faqs.length > 0 && (
          <section className="mb-16">
            <SectionHeader
              title="Frequently Asked Questions"
              subtitle="Everything you need to know before buying"
            />
            <div className="max-w-3xl mx-auto space-y-4">
              {content.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group border border-apple-border rounded-apple-sm overflow-hidden"
                >
                  <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer text-apple-text-primary font-medium text-sm hover:bg-apple-bg transition-colors list-none">
                    {faq.question}
                    <svg
                      className="w-4 h-4 shrink-0 text-apple-text-secondary group-open:rotate-180 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-5 pb-4 text-sm text-apple-text-secondary leading-relaxed">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ==========================================================
            AMAZON-STYLE REVIEWS
            ========================================================== */}
        {reviewSummary && (
          <section className="mb-16 scroll-mt-24" id="reviews">
            {/* ---- Summary Header ---- */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8 pb-6 border-b border-sand-darker/40">
              {/* Left: Big average */}
              <div className="flex flex-col items-center min-w-[120px]">
                <span className="text-5xl font-bold text-apple-text-primary">
                  {reviewSummary.averageRating.toFixed(1)}
                </span>
                <div className="flex items-center gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => {
                    const fill = Math.min(
                      1,
                      Math.max(0, reviewSummary.averageRating - star + 1),
                    );
                    return (
                      <svg
                        key={star}
                        className="w-5 h-5"
                        viewBox="0 0 20 20"
                        fill="none"
                      >
                        <path
                          d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z"
                          fill={
                            fill >= 1
                              ? "#C9A962"
                              : fill > 0
                                ? "url(#half)"
                                : "#E5E2DD"
                          }
                        />
                        {fill > 0 && fill < 1 && (
                          <clipPath id={`half-${star}`}>
                            <rect
                              x="0"
                              y="0"
                              width={`${fill * 100}%`}
                              height="100%"
                            />
                          </clipPath>
                        )}
                        {fill > 0 && fill < 1 && (
                          <path
                            d="M10 1l2.39 4.84 5.34.78-3.87 3.77.91 5.32L10 13.27l-4.77 2.51.91-5.32L2.27 6.62l5.34-.78L10 1z"
                            fill="#C9A962"
                            clipPath={`url(#half-${star})`}
                          />
                        )}
                      </svg>
                    );
                  })}
                </div>
                <span className="text-sm text-apple-text-secondary mt-1">
                  {reviewSummary.totalReviews.toLocaleString("en-IN")} global
                  ratings
                </span>
              </div>

              {/* Right: Distribution bar chart */}
              <div className="flex-1 w-full space-y-1.5 max-w-md">
                {([5, 4, 3, 2, 1] as const).map((star) => {
                  const count = distribution[star] ?? 0;
                  const pct =
                    reviewSummary.totalReviews > 0
                      ? (count / reviewSummary.totalReviews) * 100
                      : 0;
                  return (
                    <button
                      key={star}
                      onClick={() =>
                        changeFilterRating(filterRating === star ? null : star)
                      }
                      className={`flex items-center gap-2 w-full text-left group transition-opacity ${
                        filterRating !== null && filterRating !== star
                          ? "opacity-40"
                          : ""
                      }`}
                      aria-label={`Filter by ${star} star`}
                    >
                      <span className="text-xs text-apple-text-secondary w-6 text-right font-medium">
                        {star}★
                      </span>
                      <div className="flex-1 h-[10px] bg-sand-darker/30 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-[#C9A962] to-[#DFC48A]"
                          style={{ width: `${Math.max(pct, 2)}%` }}
                        />
                      </div>
                      <span className="text-xs text-apple-text-secondary w-12 text-right">
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ---- Sort Controls ---- */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-lg font-semibold text-apple-text-primary">
                {totalFiltered > 0
                  ? `${totalFiltered.toLocaleString("en-IN")} review${totalFiltered !== 1 ? "s" : ""}`
                  : "Reviews"}
                {filterRating !== null && (
                  <span className="text-sm font-normal text-apple-text-secondary ml-2">
                    (filtered by {filterRating}★)
                  </span>
                )}
              </h3>
              <div className="flex items-center gap-2">
                <span className="text-xs text-apple-text-secondary">
                  Sort by:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => changeSort(e.target.value as SortOption)}
                  className="text-sm border border-sand-darker rounded-apple-sm px-3 py-1.5 bg-white text-apple-text-primary focus:outline-none focus:ring-2 focus:ring-[#C9A962]/40"
                >
                  <option value="most_recent">Most Recent</option>
                  <option value="top">Top Reviews</option>
                  <option value="lowest">Lowest Rated</option>
                </select>
              </div>
            </div>

            {/* ---- Review List ---- */}
            {displayedReviews.length > 0 ? (
              <div className="space-y-5">
                {displayedReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-apple-text-secondary">
                <p className="text-lg">No reviews match this filter.</p>
                <button
                  onClick={() => changeFilterRating(null)}
                  className="mt-2 text-sm text-[#C9A962] hover:underline"
                >
                  Clear filter
                </button>
              </div>
            )}

            {/* ---- Load More ---- */}
            {hasMore && (
              <div className="text-center mt-8">
                <button
                  onClick={loadMore}
                  className="inline-flex items-center gap-2 px-8 py-3 border-2 border-[#C9A962] text-[#C9A962] rounded-full text-sm font-semibold hover:bg-[#C9A962] hover:text-[#1A1614] transition-all duration-200"
                >
                  Load More Reviews
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </section>
        )}

        {/* ==========================================================
            TRUST BAR + PRICING SUMMARY
            ========================================================== */}
        {/* ── ReviewCard sub-component ── */}
        {/* defined after the main component below */}

        <section>
          <SectionHeader
            title="Why Shop With Us"
            subtitle="We've got you covered"
          />
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              {(content?.trustItems?.length
                ? content.trustItems
                : [
                    { icon: "✅", text: "100% original product" },
                    { icon: "🚚", text: "Free delivery on all purchase" },
                    { icon: "🔄", text: "7-day easy return" },
                    { icon: "🔒", text: "Secure checkout" },
                  ]
              ).map((item, i) => (
                <div
                  key={i}
                  className="bg-apple-bg rounded-apple-sm p-4 text-center"
                >
                  <span className="text-2xl block mb-1">{item.icon}</span>
                  <span className="text-xs text-apple-text-primary font-medium">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Pricing Summary */}
            <Card className="!border-apple-border !bg-apple-bg">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-apple-text-secondary">
                    Selling Price
                  </span>
                  <span className="font-semibold text-apple-text-primary">
                    {formatPrice(product.price)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-apple-text-secondary">MRP</span>
                  <span className="line-through text-apple-text-secondary">
                    {formatPrice(product.original_price)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-apple-text-secondary">Discount</span>
                  <span className="text-apple-success font-medium">
                    -{product.discount_percentage}% off
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-apple-text-secondary">You Save</span>
                  <span className="text-apple-success font-medium">
                    {formatPrice(product.original_price - product.price)}
                  </span>
                </div>
                {content?.pricingNote && (
                  <div className="flex justify-between">
                    <span className="text-apple-text-secondary">Note</span>
                    <span className="text-apple-text-primary">
                      {content.pricingNote}
                    </span>
                  </div>
                )}
                <hr className="border-apple-border my-2" />
                <div className="flex justify-between text-base">
                  <span className="font-semibold text-apple-text-primary">
                    Total
                  </span>
                  <span className="font-bold text-apple-text-primary">
                    {formatPrice(product.price)}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
