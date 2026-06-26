// ────────────────────────────────────────────────────────────────
// Meta Commerce Manager — Dynamic XML Product Feed
//
// Returns a Google Merchant Center–compatible XML product feed
// for Meta Commerce Manager. Enables Dynamic Product Ads (DPA).
//
// Feed URL (set in Meta Commerce Manager):
//   https://ergoaurashop.com/api/meta-catalog
//
// Meta fetches this feed every hour via Scheduled Feed.
// ────────────────────────────────────────────────────────────────

import { NextResponse } from "next/server";
import { LOCAL_PRODUCTS } from "@/lib/products-data";
import { SLUG_TO_FOLDER, SLUG_TO_IMAGES } from "@/lib/products-data";

// ── Configuration ────────────────────────────────────────────────
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ergoaurashop.com";
const BRAND_NAME = "ErgoAura";
const CONDITION = "new";

/**
 * Google Product Category IDs:
 *   436  → Health & Beauty
 *   222  → Electronics
 *   165  → Clothing & Accessories
 *
 * Map our internal categories to Google taxonomy IDs.
 */
const CATEGORY_MAP = {
  wellness: "436",
  "personal-care": "436",
  electronics: "222",
  clothing: "165",
  sports: "1299",
  home: "220",
  accessories: "165",
};

// ── Helper: encode a file-system path segment by segment ────────
function encodePath(path) {
  return path.split("/").map(encodeURIComponent).join("/");
}

// ── Helper: escape XML special characters ────────────────────────
function escapeXml(str) {
  if (typeof str !== "string") return "";
  // Must replace & first to avoid double-escaping
  var amp = "&" + "amp;";
  var lt = "&" + "lt;";
  var gt = "&" + "gt;";
  var quot = "&" + "quot;";
  var apos = "&" + "apos;";
  return str
    .replace(/&/g, amp)
    .replace(/</g, lt)
    .replace(/>/g, gt)
    .replace(/\x22/g, quot)
    .replace(/\x27/g, apos);
}

// ── Helper: build product URL ────────────────────────────────────
function productUrl(slug) {
  return SITE_URL + "/products/" + slug;
}

// ── Helper: build primary image URL ──────────────────────────────
function primaryImageUrl(slug) {
  const images = SLUG_TO_IMAGES[slug];
  if (images && images.length > 0) {
    const folder = SLUG_TO_FOLDER[slug] || slug;
    return (
      SITE_URL +
      "/images/products/" +
      encodePath(folder) +
      "/" +
      encodeURIComponent(images[0])
    );
  }
  return SITE_URL + "/images/products/" + slug + "/placeholder.jpg";
}

// ── Helper: build additional image URLs ──────────────────────────
function additionalImageUrls(slug) {
  const images = SLUG_TO_IMAGES[slug];
  if (!images || images.length <= 1) return "";
  const folder = SLUG_TO_FOLDER[slug] || slug;
  return images
    .slice(1)
    .map(function (img) {
      var url =
        SITE_URL +
        "/images/products/" +
        encodePath(folder) +
        "/" +
        encodeURIComponent(img);
      return (
        "      <g:additional_image_link>" +
        escapeXml(url) +
        "</g:additional_image_link>"
      );
    })
    .join("\n");
}

// ── Helper: determine availability ──────────────────────────────
function availability(product) {
  if (product.stock > 0) return "in stock";
  return "out of stock";
}

// ── Helper: get Google product category from internal category ──
function googleCategory(category) {
  return CATEGORY_MAP[category] || "436";
}

// ── Helper: build custom label for campaign segmentation ────────
function customLabel(product) {
  var labels = [];

  if (product.discount_percentage >= 40) {
    labels.push("high_discount");
  } else if (product.discount_percentage >= 20) {
    labels.push("mid_discount");
  }

  if (product.category) {
    labels.push(product.category);
  }

  return labels.join(", ");
}

// ── Generate XML feed ────────────────────────────────────────────
function generateXmlFeed() {
  var items = LOCAL_PRODUCTS.filter(function (p) {
    return p.is_active;
  })
    .map(function (product) {
      var price = product.original_price + " INR";
      var salePrice = product.price + " INR";
      var primaryImg = primaryImageUrl(product.slug);
      var additionalImgs = additionalImageUrls(product.slug);
      var avail = availability(product);
      var googleCat = googleCategory(product.category);
      var label = customLabel(product);

      var additionalXml = "";
      if (additionalImgs) {
        additionalXml = "\n" + additionalImgs;
      }

      return (
        "    <item>\n" +
        "      <g:id>" +
        escapeXml(product.id) +
        "</g:id>\n" +
        "      <g:title>" +
        escapeXml(product.name) +
        "</g:title>\n" +
        "      <g:description>" +
        escapeXml(product.description) +
        "</g:description>\n" +
        "      <g:link>" +
        escapeXml(productUrl(product.slug)) +
        "</g:link>\n" +
        "      <g:image_link>" +
        escapeXml(primaryImg) +
        "</g:image_link>\n" +
        additionalXml +
        "      <g:availability>" +
        avail +
        "</g:availability>\n" +
        "      <g:price>" +
        escapeXml(price) +
        "</g:price>\n" +
        "      <g:sale_price>" +
        escapeXml(salePrice) +
        "</g:sale_price>\n" +
        "      <g:brand>" +
        BRAND_NAME +
        "</g:brand>\n" +
        "      <g:condition>" +
        CONDITION +
        "</g:condition>\n" +
        "      <g:google_product_category>" +
        googleCat +
        "</g:google_product_category>\n" +
        "      <g:custom_label_0>" +
        escapeXml(label) +
        "</g:custom_label_0>\n" +
        "    </item>"
      );
    })
    .join("\n");

  return (
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">\n' +
    "  <channel>\n" +
    "    <title>ErgoAura Products</title>\n" +
    "    <link>" +
    SITE_URL +
    "</link>\n" +
    "    <description>ErgoAura Product Catalogue for Meta Commerce Manager</description>\n" +
    "\n" +
    items +
    "\n" +
    "  </channel>\n" +
    "</rss>"
  );
}

// ── GET handler ──────────────────────────────────────────────────
export async function GET() {
  // ── Feature flag ──────────────────────────────────────────────
  if (process.env.META_CATALOG_ENABLED !== "true") {
    return NextResponse.json(
      {
        error: "Meta catalog is disabled (META_CATALOG_ENABLED != true)",
      },
      { status: 503 },
    );
  }

  try {
    var xml = generateXmlFeed();

    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        // Cache for 1 hour (matching Meta's fetch frequency)
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (err) {
    console.error("[Meta Catalog] Error generating XML feed:", err.message);
    return NextResponse.json(
      { error: "Failed to generate product feed" },
      { status: 500 },
    );
  }
}
