"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import ProductGrid from "@/components/products/ProductGrid";
import Button from "@/components/ui/Button";
import { LOCAL_PRODUCTS } from "@/lib/products-data";

export default function HomePage() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
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

  return (
    <div>
      {/* ============================== */}
      {/* Hero Section */}
      {/* ============================== */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-apple-bg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-apple-bg via-apple-bg to-apple-white" />
        <div className="section-container relative z-10 text-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="heading-xl mb-4 text-balance">
              Premium Wellness for
              <br />
              <span className="text-apple-text-secondary">
                Everyday Comfort
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-apple-text-secondary max-w-2xl mx-auto mb-8 text-balance">
              Discover thoughtfully designed products that make your daily life
              more comfortable, healthier, and better.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Link href="/products">
                <Button size="lg">Shop All Products</Button>
              </Link>
              <Link href="/products">
                <Button variant="outline" size="lg">
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
      <section className="bg-apple-white border-y border-apple-border/50">
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
                label: "Free Delivery Above ₹299",
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
                <div className="text-apple-text-primary shrink-0">
                  {item.icon}
                </div>
                <span className="text-sm font-medium text-apple-text-primary">
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
      <section className="section-container py-16 sm:py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="heading-lg mb-2">Featured Products</h2>
            <p className="text-apple-text-secondary">
              Our most popular wellness essentials
            </p>
          </div>
          <Link
            href="/products"
            className="hidden sm:inline-flex text-sm font-medium text-apple-accent hover:underline"
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
      <section className="bg-apple-white py-16 sm:py-20">
        <div className="section-container">
          <h2 className="heading-lg mb-10 text-center">Shop by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                name: "Wellness",
                slug: "wellness",
                image: "/images/logo/ergoauralogo.webp",
              },
              {
                name: "Home & Kitchen",
                slug: "kitchen",
                image: "/images/logo/ergoauralogo.webp",
              },
              {
                name: "Accessories",
                slug: "accessories",
                image: "/images/logo/ergoauralogo.webp",
              },
              {
                name: "Personal Care",
                slug: "personal-care",
                image: "/images/logo/ergoauralogo.webp",
              },
            ].map((category) => (
              <Link
                key={category.slug}
                href={`/products?category=${category.slug}`}
                className="card-apple-hover overflow-hidden group"
              >
                <div className="aspect-[4/3] bg-apple-bg overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-base font-medium text-apple-text-primary">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
