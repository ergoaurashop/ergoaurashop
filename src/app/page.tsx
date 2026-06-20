"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import ProductGrid from "@/components/products/ProductGrid";
import HeroProductShowcase from "@/components/products/HeroProductShowcase";
import IPhoneBanner from "@/components/products/iphone-15-pro-max/IPhoneBanner";
import S23Banner from "@/components/products/s23/S23Banner";
import Button from "@/components/ui/Button";
import { CATEGORIES } from "@/lib/constants";
import { LOCAL_PRODUCTS } from "@/lib/products-data";
import { getProductImages } from "@/lib/utils";
import { trackViewItemList } from "@/lib/analytics/events";
import { useScrollDepth } from "@/hooks/useScrollDepth";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const hasTracked = useRef(false);

  // Track scroll depth on homepage
  useScrollDepth();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const supabase = getSupabaseClient();
        const { data } = await supabase.from("products").select("*").limit(8);
        if (data && data.length > 0) {
          setFeaturedProducts(data.slice(0, 8));
        } else {
          // Fall back to local products
          setFeaturedProducts(LOCAL_PRODUCTS.slice(0, 8));
        }
      } catch {
        // Fall back to local products on error
        setFeaturedProducts(LOCAL_PRODUCTS.slice(0, 8));
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  // Track view_item_list once products are loaded
  useEffect(() => {
    if (!loading && featuredProducts.length > 0 && !hasTracked.current) {
      hasTracked.current = true;
      trackViewItemList(
        featuredProducts,
        "homepage-featured",
        "Featured Products",
      );
    }
  }, [loading, featuredProducts]);

  return (
    <div>
      {/* ============================== */}
      {/* Hero Product Showcase (NEW) */}
      {/* ============================== */}
      <HeroProductShowcase />

      {/* ============================== */}
      {/* iPhone 15 Pro Max Promo Banner */}
      {/* ============================== */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>

      {/* ============================== */}
      {/* Samsung Galaxy S23 Ultra Banner */}
      {/* ============================== */}
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* ============================== */}
      {/* Hero Section */}
      {/* ============================== */}
      <section
        className="relative min-h-[80vh] flex items-center justify-center overflow-hidden animate-hero-gradient"
        style={{
          background:
            "linear-gradient(135deg, #F5F1EB 0%, #FAF7F2 25%, #F0E8D8 50%, #FAF7F2 75%, #F5F1EB 100%)",
        }}
      >
        {/* Decorative gold accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-[#C9A962]/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-[#C9A962]/15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#C9A962]/[0.06] blur-3xl pointer-events-none" />

        <div className="section-container relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="type-overline-gold text-[#C9A962] tracking-[0.15em] uppercase">
              🔥 Mega Deals Collection
            </span>
            <h1 className="type-h1 text-[#1A1614] mt-4 mb-4 text-balance max-w-3xl mx-auto">
              Hand Picked Mega Deals
              <br />
              <span className="text-[#C9A962]">Up to 50% Off</span>
            </h1>
            <p className="type-body-lg text-[#6B6560] max-w-2xl mx-auto mb-10 text-balance">
              Score massive savings on premium hand-picked products — curated
              just for you at unbeatable prices.
            </p>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              <Link href="/products">
                <Button size="lg">Shop All Products</Button>
              </Link>
              <Link href="/products">
                <Button variant="ghost" size="lg">
                  Explore Categories
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================== */}
      {/* Benefits Strip */}
      {/* ============================== */}
      <section className="bg-white border-y border-[#EAE3D5]/50">
        <div className="section-container py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                ),
                label: "100% Original Products",
              },
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                ),
                label: "Fast Delivery",
              },
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9 12l2 2 4-4" />
                  </svg>
                ),
                label: "7-Day Easy Return",
              },
              {
                icon: (
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0110 0v4" />
                  </svg>
                ),
                label: "Secure Checkout",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="text-[#C9A962] shrink-0">{item.icon}</div>
                <span className="text-sm font-medium text-[#1A1614]">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================== */}
      {/* Featured Products */}
      {/* ============================== */}
      <section className="bg-[#F5F1EB] section-container py-16 sm:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="type-overline-gold text-[#C9A962] tracking-[0.15em] uppercase">
              Featured
            </span>
            <h2 className="type-h2 text-[#1A1614] mt-1 mb-2">
              Featured Products
            </h2>
            <p className="type-body-lg text-[#86868B]">
              Our bestselling mega deals — hand-picked for you
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex text-sm font-medium text-[#C9A962] hover:text-[#A88A42] transition-colors duration-200"
          >
            View All &rarr;
          </Link>
        </div>

        <ProductGrid
          products={featuredProducts}
          loading={loading}
          emptyMessage="Products coming soon. Check back shortly!"
        />

        <div className="mt-8 text-center sm:hidden">
          <Link href="/products">
            <Button variant="outline">View All Products</Button>
          </Link>
        </div>
      </section>

      {/* ============================== */}
      {/* Categories Section */}
      {/* ============================== */}
      <section className="bg-white py-16 sm:py-20">
        <div className="section-container">
          <div className="text-center mb-12">
            <span className="type-overline-gold text-[#C9A962] tracking-[0.15em] uppercase">
              Categories
            </span>
            <h2 className="type-h2 text-[#1A1614] mt-1">Shop by Category</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {CATEGORIES.map((category) => {
              // Collect up to 3 product images from this category
              const catProducts = LOCAL_PRODUCTS.filter(
                (p) => p.category === category.slug,
              );
              const catImages: string[] = [];
              for (const product of catProducts) {
                const imgs = getProductImages(product.slug);
                if (imgs.length > 0) {
                  catImages.push(imgs[0]);
                }
                if (catImages.length >= 3) break;
              }

              return (
                <CategoryCard
                  key={category.slug}
                  category={category}
                  images={catImages}
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

/**
 * CategoryCard — Renders a category card with a product image slider.
 * Auto-rotates through up to 3 product images with a crossfade effect.
 * Falls back to a placeholder icon when no product images are available.
 */
function CategoryCard({
  category,
  images,
}: {
  category: { slug: string; name: string };
  images: string[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasImages = images.length > 0;

  // Auto-rotate images every 3.5 seconds
  useEffect(() => {
    if (!hasImages || images.length <= 1) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(interval);
  }, [hasImages, images.length]);

  return (
    <Link
      href={`/products?category=${category.slug}`}
      className="group rounded-2xl overflow-hidden bg-white shadow-base hover:shadow-xl
                 transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-[4/3] bg-[#F5F1EB] overflow-hidden relative flex items-center justify-center">
        {hasImages ? (
          /* Image slider */
          <>
            {images.map((img, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-700 ease-in-out"
                style={{ opacity: i === activeIndex ? 1 : 0 }}
              >
                <Image
                  src={img}
                  alt={`${category.name} product ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
            ))}
            {/* Dot indicators */}
            {images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {images.map((_, i) => (
                  <span
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex ? "bg-white w-3" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            )}
          </>
        ) : (
          /* Fallback placeholder icon */
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#EAE3D5] flex items-center justify-center">
            <svg
              viewBox="0 0 24 24"
              className="w-10 h-10 text-[#C9A962]"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold text-[#1A1614] group-hover:text-[#C9A962] transition-colors duration-200">
          {category.name}
        </h3>
        <p className="text-sm text-[#86868B] mt-0.5">
          Shop {category.name.toLowerCase()} &rarr;
        </p>
      </div>
    </Link>
  );
}
