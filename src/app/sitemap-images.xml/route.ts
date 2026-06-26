import { NextResponse } from "next/server";
import {
  LOCAL_PRODUCTS,
  SLUG_TO_IMAGES,
  SLUG_TO_FOLDER,
} from "@/lib/products-data";

/**
 * Image Sitemap — serves at /sitemap-images.xml
 *
 * Helps Google Image Search index all product images.
 * Follows Google's Image Sitemap specification:
 * https://developers.google.com/search/docs/crawling-indexing/sitemaps/image-sitemaps
 */
export async function GET() {
  const baseUrl = "https://ergoaurashop.com";

  let urls = "";

  for (const product of LOCAL_PRODUCTS) {
    const imageFilenames = SLUG_TO_IMAGES[product.slug];
    const folderName = SLUG_TO_FOLDER[product.slug];

    if (!imageFilenames || !folderName) continue;

    const encodedFolder = encodeURIComponent(folderName);

    const imageTags = imageFilenames
      .map(
        (filename) =>
          `    <image:image>\n` +
          `      <image:loc>${baseUrl}/images/products/${encodedFolder}/${encodeURIComponent(filename)}</image:loc>\n` +
          `    </image:image>`,
      )
      .join("\n");

    urls +=
      `  <url>\n` +
      `    <loc>${baseUrl}/products/${product.slug}</loc>\n` +
      imageTags +
      "\n" +
      `  </url>\n`;
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
>
${urls}</urlset>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
