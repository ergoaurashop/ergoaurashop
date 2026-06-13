// =====================================================================
// Blog Listing Page — /blog
// Displays all blog posts with SEO metadata for search engine indexing.
// =====================================================================

import type { Metadata } from "next";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/constants";
import BlogListingJsonLd from "./BlogListingJsonLd";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Blog — Wellness Tips, Guides & Lifestyle | ErgoAura Shop",
  description:
    "Discover expert wellness tips, product guides, and lifestyle advice from ErgoAura. Learn about posture correction, period pain relief, foot care, travel essentials, and more.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: "ErgoAura Blog — Wellness Tips & Product Guides",
    description:
      "Expert advice on posture, sleep, foot care, travel essentials, and home wellness. Read the latest from ErgoAura.",
    url: `${SITE_URL}/blog`,
    siteName: "ErgoAura Shop",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/images/logo/ergoauralogo.webp`,
        width: 1200,
        height: 630,
        alt: "ErgoAura Shop Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ErgoAura Blog — Wellness Tips & Product Guides",
    description:
      "Expert advice on posture, sleep, foot care, travel essentials, and home wellness.",
    images: [`${SITE_URL}/images/logo/ergoauralogo.webp`],
  },
  robots: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
  },
};

/** Format a date string to a human-readable format */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const breadcrumbItems = [
  { name: "Home", url: SITE_URL },
  { name: "Blog", url: `${SITE_URL}/blog` },
];

export default function BlogPage() {
  return (
    <>
      <BlogListingJsonLd />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-36 md:pb-16 bg-[#1A1614] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#C9A962]/10 to-transparent pointer-events-none" />
        <div className="section-container relative z-10">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-[#D8CFBF]/60 mb-4">
            <Link href="/" className="hover:text-[#C9A962] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#C9A962]">Blog</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-[#F5F1EB] mb-4">
            ErgoAura Blog
          </h1>
          <p className="text-lg md:text-xl text-[#D8CFBF] max-w-2xl">
            Expert wellness tips, product guides, and lifestyle advice to help
            you live more comfortably every day.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="bg-[#F5F1EB] min-h-screen py-12 md:py-16">
        <div className="section-container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-base hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Featured Image */}
                <div className="relative aspect-[16/9] overflow-hidden bg-[#EAE3D5]">
                  <img
                    src={post.image}
                    alt={post.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 bg-[#1A1614]/80 text-[#C9A962] text-xs font-medium rounded-full backdrop-blur-sm">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-[#86868B] mb-2">
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                    <span>·</span>
                    <span>{post.readTime} min read</span>
                  </div>
                  <h2 className="text-lg font-semibold text-[#1A1614] group-hover:text-[#C9A962] transition-colors duration-200 line-clamp-2 mb-2">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#86868B] line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-block px-2 py-0.5 bg-[#F5F1EB] text-[#86868B] text-[10px] font-medium rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 3 && (
                      <span className="inline-block px-2 py-0.5 text-[#86868B] text-[10px] font-medium">
                        +{post.tags.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
