import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/masteradminmyo/", "/signin/", "/signup/"],
    },
    sitemap: "https://ergoaurashop.com/sitemap.xml",
  };
}
