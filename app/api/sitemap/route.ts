import { getSitemapData } from "@/lib/shopify";

export async function GET() {
  try {
    const { products, collections } = await getSitemapData();
    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://ergoaurashop.com";

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${collections
    .map(
      (collection) => `
  <url>
    <loc>${baseUrl}/collections/${collection.handle}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join("")}
  ${products
    .map(
      (product) => `
  <url>
    <loc>${baseUrl}/products/${product.handle}</loc>
    <lastmod>${new Date(product.updatedAt).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
    .join("")}
</urlset>`;

    return new Response(xml, {
      headers: {
        "Content-Type": "application/xml",
      },
    });
  } catch (error) {
    console.error("Sitemap error:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
}
