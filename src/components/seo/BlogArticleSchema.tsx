// =====================================================================
// BlogArticleSchema — JSON-LD Article & BlogPosting structured data
// Provides AI search engines (Google SGE, ChatGPT, Perplexity)
// with rich metadata for blog content.
// =====================================================================

import JsonLd from "./JsonLd";
import type { BlogPost } from "@/lib/blog-data";

interface Props {
  post: BlogPost;
  baseUrl: string;
}

export default function BlogArticleSchema({ post, baseUrl }: Props) {
  const url = `${baseUrl}/blog/${post.slug}`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "ErgoAura Shop",
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/images/logo/ergoauralogo.webp`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    image: post.image.startsWith("http")
      ? post.image
      : `${baseUrl}${post.image}`,
    url,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: post.tags.join(", "),
    articleSection: post.category,
    wordCount: post.content.split(/\s+/).length,
    timeRequired: `PT${post.readTime}M`,
  };

  return <JsonLd schema={schema} />;
}
