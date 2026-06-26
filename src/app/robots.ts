import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ergoaurashop.com";

  return {
    rules: [
      // ── GOOGLE BOTS ──
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin/",
          "/private/",
          "/checkout/",
          "/cart/",
          "/account/",
          "/wishlist/",
          "/compare/",
          "/order-confirmation/",
          "/search",
          "/search/",
          "/*?sort=",
          "/*?filter=",
          "/*?color=",
          "/*?size=",
          "/*?price=",
          "/*?page=",
          "/*?ref=",
          "/*?sid=",
          "/*?utm_",
          "/*?session=",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/*.jpg$", "/*.png$", "/*.webp$", "/*.avif$"],
        disallow: ["/images/private/"],
      },
      {
        userAgent: "Googlebot-Video",
        allow: ["/*.mp4$", "/*.webm$"],
      },
      // ── BING / MICROSOFT ──
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/private/", "/api/", "/masteradminmyo/"],
        crawlDelay: 2,
      },
      // ── AI TRAINING BOTS — BLOCK ALL ──
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/private/", "/api/", "/masteradminmyo/"],
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "FacebookBot",
        disallow: "/",
      },
      {
        userAgent: "ImagesiftBot",
        disallow: "/",
      },
      {
        userAgent: "Diffbot",
        disallow: "/",
      },
      // ── SEO / RESEARCH BOTS ──
      {
        userAgent: "AhrefsBot",
        crawlDelay: 5,
        disallow: ["/admin/", "/private/", "/api/", "/masteradminmyo/"],
      },
      {
        userAgent: "SemrushBot",
        crawlDelay: 5,
        disallow: ["/admin/", "/private/", "/api/", "/masteradminmyo/"],
      },
      // ── MALICIOUS / SPAM BOTS ──
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },
      {
        userAgent: "SemrushBot-SA",
        disallow: "/",
      },
      {
        userAgent: "DotBot",
        disallow: "/",
      },
      // ── CATCH-ALL (all other bots) ──
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/masteradminmyo/",
          "/signin/",
          "/signup/",
          "/account/",
          "/cart/",
          "/checkout/",
          "/order/success/",
          "/search",
          "/search/",
          "/wishlist/",
          "/compare/",
          "/tmp/",
          "/*?sort=",
          "/*?filter=",
          "/*?ref=",
          "/*?sid=",
          "/*?utm_",
          "/*?session=",
        ],
        crawlDelay: 3,
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap-images.xml`],
  };
}
