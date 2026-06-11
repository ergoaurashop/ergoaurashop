"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { formatPrice, getProductImageUrl, getProductImages } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { useCartStore } from "@/store/cartStore";
import { getProductContent } from "@/lib/product-content";
import { LOCAL_PRODUCTS } from "@/lib/products-data";

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
export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  /* Try Supabase first, fall back to local data */
  useEffect(() => {
    async function fetchProduct() {
      try {
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

  /* Rich content from our prep files */
  const content = getProductContent(slug);

  const images = product?.images?.length
    ? product.images
    : getProductImages(slug).length > 0
      ? getProductImages(slug)
      : [getProductImageUrl(slug)];

  const handleAddToCart = () => {
    if (!product) return;
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="pt-24 sm:pt-28 section-container">
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
      <div className="pt-24 sm:pt-28 section-container text-center py-20">
        <p className="text-apple-text-secondary">Product not found.</p>
      </div>
    );
  }

  /* ────────────────────────────────────────────────────────────────
     Render
     ──────────────────────────────────────────────────────────────── */
  return (
    <div className="pt-24 sm:pt-28 pb-16">
      <div className="section-container">
        {/* ==========================================================
            HERO — Image Gallery + Product Info
            ========================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* ── Image Gallery ── */}
          <div className="space-y-4">
            <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-apple-sm overflow-hidden border-2 shrink-0 transition-colors ${
                      i === selectedImage
                        ? "border-apple-black"
                        : "border-transparent hover:border-apple-border"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
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

            {/* Add to Cart */}
            <div className="pt-4">
              <Button
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </Button>
            </div>

            {/* Trust badges (static) */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Free Delivery", sub: "Above ₹299" },
                { label: "Easy Returns", sub: "7-Day Policy" },
                { label: "Secure Checkout", sub: "Razorpay" },
                { label: "Support", sub: "24/7 Available" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-apple-bg rounded-apple-sm p-3 text-center"
                >
                  <p className="text-sm font-medium text-apple-text-primary">
                    {item.label}
                  </p>
                  <p className="text-xs text-apple-text-secondary">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
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
            PAIN vs SOLUTION
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Pain */}
                <Card className="!bg-red-50 !border-red-100">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">❌</span>
                    <h3 className="text-lg font-semibold text-red-800">
                      Without It
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {content.painPoints.map((p, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-red-700"
                      >
                        <span className="mt-0.5 shrink-0">✕</span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </Card>

                {/* Solution */}
                <Card className="!bg-green-50 !border-green-100">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-2xl">✅</span>
                    <h3 className="text-lg font-semibold text-green-800">
                      With It
                    </h3>
                  </div>
                  <ul className="space-y-3">
                    {content.solutionPoints.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 text-sm text-green-700"
                      >
                        <span className="mt-0.5 shrink-0">✓</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            </section>
          )}

        {/* ==========================================================
            BULLET BENEFITS (5 persuasive bullets)
            ========================================================== */}
        {content?.bulletBenefits && content.bulletBenefits.length > 0 && (
          <section className="mb-16">
            <SectionHeader
              title="Why You'll Love It"
              subtitle="5 reasons this product makes your life better"
            />
            <div className="space-y-4 max-w-3xl mx-auto">
              {content.bulletBenefits.map((b, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 bg-apple-bg rounded-apple-sm p-5"
                >
                  <span className="w-8 h-8 rounded-full bg-apple-black text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-apple-text-primary leading-relaxed">{b}</p>
                </div>
              ))}
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
            <div className="max-w-3xl mx-auto">
              <Card className="!bg-apple-bg !border-apple-border">
                <p className="text-apple-text-primary leading-relaxed text-lg italic">
                  &ldquo;{content.problemHook}&rdquo;
                </p>
              </Card>

              {content.solutionBody && (
                <>
                  <h3 className="text-xl font-semibold text-apple-text-primary mt-8 mb-4 text-center">
                    The Solution
                  </h3>
                  <Card>
                    <p className="text-apple-text-primary leading-relaxed">
                      {content.solutionBody}
                    </p>
                  </Card>
                </>
              )}
            </div>
          </section>
        )}

        {/* ==========================================================
            WHAT'S IN THE BOX + SPECS
            ========================================================== */}
        {content?.whatsInTheBox &&
          Object.keys(content.whatsInTheBox).length > 0 && (
            <section className="mb-16">
              <SectionHeader
                title="What's in the Box"
                subtitle="Everything you get with your order"
              />
              <div className="max-w-2xl mx-auto">
                <div className="divide-y divide-apple-border border border-apple-border rounded-apple-sm overflow-hidden">
                  {Object.entries(content.whatsInTheBox).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-start justify-between gap-4 px-5 py-3 text-sm"
                    >
                      <span className="font-medium text-apple-text-primary whitespace-nowrap">
                        {key}
                      </span>
                      <span className="text-apple-text-secondary text-right">
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

        {/* ==========================================================
            WHO THIS IS PERFECT FOR
            ========================================================== */}
        {content?.perfectFor && content.perfectFor.length > 0 && (
          <section className="mb-16">
            <SectionHeader
              title="Who This Is Perfect For"
              subtitle="This product was made for people like you"
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {content.perfectFor.map((item, i) => (
                <Card key={i}>
                  <h4 className="font-semibold text-apple-text-primary mb-1">
                    {item.audience}
                  </h4>
                  <p className="text-sm text-apple-text-secondary">
                    {item.reason}
                  </p>
                </Card>
              ))}
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
            REVIEWS
            ========================================================== */}
        {content?.reviews && content.reviews.length > 0 && (
          <section className="mb-16">
            <SectionHeader
              title="What Our Customers Say"
              subtitle="Real reviews from verified buyers"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.reviews.map((review, i) => (
                <Card key={i}>
                  <StarRating rating={review.rating} />
                  <p className="mt-3 text-sm text-apple-text-primary leading-relaxed">
                    &ldquo;{review.text}&rdquo;
                  </p>
                  <div className="mt-4 flex items-center gap-2 text-xs text-apple-text-secondary">
                    <span className="font-medium text-apple-text-primary">
                      {review.name}
                    </span>
                    <span>·</span>
                    <span>{review.city}</span>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* ==========================================================
            TRUST BAR + PRICING SUMMARY
            ========================================================== */}
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
                    { icon: "🚚", text: "Free delivery above ₹299" },
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
                <div className="pt-3">
                  <Button
                    size="lg"
                    fullWidth
                    onClick={handleAddToCart}
                    disabled={added}
                  >
                    {added ? "✓ Added to Cart" : "Add to Cart"}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
