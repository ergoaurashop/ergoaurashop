// =====================================================================
// Blog Post Detail Page — /blog/[slug]
// Full blog post with Article schema, breadcrumbs, and related products.
// =====================================================================

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPost, BLOG_POSTS } from "@/lib/blog-data";
import { LOCAL_PRODUCTS } from "@/lib/products-data";
import { SITE_URL } from "@/lib/constants";
import BlogArticleSchema from "@/components/seo/BlogArticleSchema";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

type Props = {
  params: { slug: string };
};

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return { title: "Post Not Found" };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: `${post.title} | ErgoAura Blog`,
    description: post.excerpt,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author],
      tags: post.tags,
      siteName: "ErgoAura Shop",
      images: [
        {
          url: post.image.startsWith("http")
            ? post.image
            : `${SITE_URL}${post.image}`,
          width: 1200,
          height: 630,
          alt: post.imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [
        post.image.startsWith("http") ? post.image : `${SITE_URL}${post.image}`,
      ],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

/** Format a date string to a human-readable format */
function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/** Render simple markdown-like content as HTML paragraphs */
function renderContent(content: string): string {
  return content
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";

      // Headings
      if (trimmed.startsWith("### ")) {
        return `<h3 class="text-xl font-semibold text-[#1A1614] mt-8 mb-3">${trimmed.slice(4)}</h3>`;
      }
      if (trimmed.startsWith("## ")) {
        return `<h2 class="text-2xl font-bold text-[#1A1614] mt-10 mb-4">${trimmed.slice(3)}</h2>`;
      }

      // Unordered list
      if (trimmed.startsWith("- ")) {
        const items = trimmed
          .split("\n")
          .filter((line) => line.startsWith("- "))
          .map(
            (line) =>
              `<li class="text-[#4A4A4A] leading-relaxed">${line.slice(2)}</li>`,
          )
          .join("");
        return `<ul class="list-disc pl-6 space-y-1.5 my-4">${items}</ul>`;
      }

      // Bold segments (wrapped in **)
      const withBold = trimmed.replace(
        /\*\*(.+?)\*\*/g,
        '<strong class="font-semibold text-[#1A1614]">$1</strong>',
      );

      // Paragraph
      return `<p class="text-[#4A4A4A] leading-relaxed mb-4">${withBold}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const baseUrl = SITE_URL;
  const relatedProducts = LOCAL_PRODUCTS.filter((p) =>
    post.relatedProducts.includes(p.slug),
  );

  const breadcrumbItems = [
    { name: "Home", url: baseUrl },
    { name: "Blog", url: `${baseUrl}/blog` },
    { name: post.title, url: `${baseUrl}/blog/${post.slug}` },
  ];

  return (
    <>
      <BlogArticleSchema post={post} baseUrl={baseUrl} />
      <BreadcrumbSchema items={breadcrumbItems} />

      {/* Breadcrumb Bar */}
      <div className="bg-[#1A1614] pt-28 pb-4">
        <div className="section-container">
          <nav className="flex items-center gap-2 text-xs text-[#D8CFBF]/60">
            <Link href="/" className="hover:text-[#C9A962] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link
              href="/blog"
              className="hover:text-[#C9A962] transition-colors"
            >
              Blog
            </Link>
            <span>/</span>
            <span className="text-[#C9A962] truncate max-w-[200px]">
              {post.title}
            </span>
          </nav>
        </div>
      </div>

      {/* Article Header */}
      <section className="bg-[#1A1614] pb-12">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-block px-3 py-1 bg-[#C9A962]/20 text-[#C9A962] text-xs font-medium rounded-full">
                {post.category}
              </span>
              <span className="text-[#D8CFBF]/60 text-sm">·</span>
              <time
                dateTime={post.publishedAt}
                className="text-[#D8CFBF]/60 text-sm"
              >
                {formatDate(post.publishedAt)}
              </time>
              <span className="text-[#D8CFBF]/60 text-sm">·</span>
              <span className="text-[#D8CFBF]/60 text-sm">
                {post.readTime} min read
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#F5F1EB] leading-tight mb-4">
              {post.title}
            </h1>

            <p className="text-lg text-[#D8CFBF] leading-relaxed">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-3 mt-6 text-sm text-[#D8CFBF]/60">
              <span>By {post.author}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {post.image && (
        <div className="bg-[#F5F1EB]">
          <div className="section-container py-8">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-[#EAE3D5] relative">
                <Image
                  src={post.image}
                  alt={post.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Article Content */}
      <article className="bg-[#F5F1EB] py-8 md:py-12">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{
                __html: renderContent(post.content),
              }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-[#D8CFBF]/40">
              <h3 className="text-sm font-semibold text-[#86868B] uppercase tracking-wider mb-3">
                Tags
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block px-3 py-1.5 bg-white text-[#4A4A4A] text-xs font-medium rounded-full border border-[#D8CFBF]/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-white py-12 md:py-16">
          <div className="section-container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold text-[#1A1614] mb-6">
                Recommended Products
              </h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {relatedProducts.map((product) => (
                  <Link
                    key={product.slug}
                    href={`/products/${product.slug}`}
                    className="group flex items-center gap-4 p-4 bg-[#F5F1EB] rounded-xl hover:bg-[#EAE3D5] transition-colors duration-200"
                  >
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-[#EAE3D5] shrink-0 relative">
                      <Image
                        src={`/images/products/${product.slug}/${product.images?.[0] || ""}`}
                        alt={product.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[#1A1614] group-hover:text-[#C9A962] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-sm text-[#C9A962] font-medium mt-0.5">
                        AED {product.price.toLocaleString()}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="bg-white pb-12">
        <div className="section-container">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#C9A962] hover:text-[#B8944F] transition-colors"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
