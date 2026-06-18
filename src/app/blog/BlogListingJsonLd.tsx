// =====================================================================
// BlogListingJsonLd — JSON-LD structured data for the blog listing page
// Provides CollectionPage + Blog schema for AI search engines.
// =====================================================================

"use client";

import JsonLd from "@/components/seo/JsonLd";
import { BLOG_POSTS } from "@/lib/blog-data";
import { SITE_URL } from "@/lib/constants";

export default function BlogListingJsonLd() {
  const baseUrl = SITE_URL;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "ErgoAura Blog — Wellness Tips & Product Guides",
    description:
      "Expert buying guides, mega deal tips, and product advice from ErgoAura.",
    url: `${baseUrl}/blog`,
    isPartOf: {
      "@type": "WebSite",
      name: "ErgoAura Shop",
      url: baseUrl,
    },
    about: {
      "@type": "Thing",
      name: "Wellness and Lifestyle",
    },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: BLOG_POSTS.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${baseUrl}/blog/${post.slug}`,
        item: {
          "@type": "Article",
          headline: post.title,
          description: post.excerpt,
          datePublished: post.publishedAt,
          author: {
            "@type": "Person",
            name: post.author,
          },
        },
      })),
    },
  };

  return <JsonLd schema={schema} />;
}
