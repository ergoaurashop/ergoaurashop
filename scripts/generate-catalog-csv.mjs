/**
 * generate-catalog-csv.mjs
 * =====================================================================
 * Generates the Meta/Facebook product catalog CSV at
 *   D:\ergoaurashop.com\catalog_products.csv
 *
 * This script writes all 14 live products from ergoaurashop.com into
 * the Meta Ads catalog format (30 columns), preserving the existing
 * comment header rows.
 *
 * Run: node scripts/generate-catalog-csv.mjs
 * =====================================================================
 */

import fs from "node:fs";
import path from "node:path";

// ─────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────
const SITE_URL = "https://ergoaurashop.com";
const CSV_PATH = "D:\\ergoaurashop.com\\catalog_products.csv";

// ─────────────────────────────────────────────────────────────────────
// Helper: URI-encode a path segment by segment (handles nested folders)
// ─────────────────────────────────────────────────────────────────────
function encodePath(segment) {
  return segment
    .split("/")
    .map((s) => encodeURIComponent(s))
    .join("/");
}

// ─────────────────────────────────────────────────────────────────────
// Helper: Build the absolute image URL from folder + filename
// ─────────────────────────────────────────────────────────────────────
function buildImageUrl(folder, filename) {
  return `${SITE_URL}/images/products/${encodePath(folder)}/${encodeURIComponent(filename)}`;
}

// ─────────────────────────────────────────────────────────────────────
// Helper: CSV-escape a single value (RFC 4180 compliant)
// ─────────────────────────────────────────────────────────────────────
function esc(val) {
  if (val == null || val === "") return "";
  const s = String(val);
  // If the value contains commas, double-quotes, or newlines, wrap in quotes
  if (
    s.includes(",") ||
    s.includes('"') ||
    s.includes("\n") ||
    s.includes("\r")
  ) {
    return '"' + s.replace(/"/g, '""') + '"';
  }
  return s;
}

// ─────────────────────────────────────────────────────────────────────
// Helper: Build a CSV row from an array of values
// ─────────────────────────────────────────────────────────────────────
function row(values) {
  return values.map(esc).join(",");
}

// ─────────────────────────────────────────────────────────────────────
// Product Definitions
// ─────────────────────────────────────────────────────────────────────

/** Map internal category → Google Product Category */
const GOOGLE_CAT = {
  wellness: "Health & Beauty > Health Care > Sleep & Snoring",
  "personal-care":
    "Health & Beauty > Personal Care > Skin Care > Pore Cleansers",
  kitchen: "Home & Garden > Kitchen & Dining > Kitchen Tools & Gadgets",
  accessories: "Electronics > Accessories > Cables",
  electronics: "Electronics > Communications > Telephony > Mobile Phones",
  "worldcup-2026": "Apparel & Accessories > Clothing > Activewear",
};

/** Map internal category → Facebook Product Category */
const FB_CAT = {
  wellness: "Health & Beauty > Health > Sleep Aids",
  "personal-care": "Health & Beauty > Beauty > Skin Care",
  kitchen: "Home & Garden > Kitchen & Dining > Kitchen Tools",
  accessories: "Electronics > Accessories > Cables & Adapters",
  electronics: "Electronics > Communications > Mobile Phones",
  "worldcup-2026": "Clothing & Accessories > Clothing > Activewear",
};

/** Brand override map — products not listed use "ErgoAura" */
const BRAND_MAP = {
  "samsung-galaxy-s23-ultra": "Samsung",
  "iphone-15-pro-max-512gb": "Apple",
  "messi-argentina-2026-jersey": "ADIDAS",
};

/**
 * All 14 live products.
 * Data sourced from:
 *   - src/lib/products-data.ts (LOCAL_PRODUCTS)
 *   - src/lib/s23-ultra-data.ts (S23_PRODUCT)
 *   - src/lib/iphone-15-pro-max-data.ts (IPHONE_PRODUCT)
 *   - src/lib/worldcup-2026-data.ts (WC2026_PRODUCT)
 *
 * Images from SLUG_TO_IMAGES (products-data.ts) + standalone image arrays.
 */
const PRODUCTS = [
  // ── 1. Anti-Snoring Chin Strap ──
  {
    id: "anti-snoring-chin-strap",
    title: "Anti-Snoring Chin Strap",
    description:
      "Gently supports your jaw to keep airways open while you sleep — most users see reduced snoring from the very first night. Made from ultra-soft, breathable, skin-friendly stretch fabric with adjustable velcro straps.",
    price: 99,
    originalPrice: 198,
    stock: 50,
    category: "wellness",
    folder: "Anti-snoring chin strap",
    firstImage: "713s6nBocOL._AC_SX679_.jpg",
    material: "Soft breathable stretch fabric",
    color: "Black / Dark grey",
    weight: "50 g",
    tags: ["Wellness", "ErgoAura"],
  },

  // ── 2. Blackhead Remover Vacuum Tool ──
  {
    id: "blackhead-remover-vacuum-tool",
    title: "Blackhead Remover Vacuum Tool",
    description:
      "Safely clear blackheads and unclog pores with gentle suction. Features 5 interchangeable suction heads, USB rechargeable battery, and adjustable suction levels for all skin types.",
    price: 199,
    originalPrice: 355,
    stock: 40,
    category: "personal-care",
    folder: "Blackhead remover vacuum tool",
    firstImage: "71UD1hZ6dEL._SL1500_.jpg",
    material: "ABS + Silicone",
    color: "",
    weight: "150 g",
    tags: ["Personal Care", "ErgoAura"],
  },

  // ── 3. Eye Massager Sleep Mask ──
  {
    id: "eye-massager-sleep-mask",
    title: "Eye Massager Sleep Mask",
    description:
      "Relieve tired eyes with soothing heat and vibration massage. Features 5 massage modes, built-in Bluetooth music, foldable design, and rechargeable battery for relaxation anywhere.",
    price: 799,
    originalPrice: 1332,
    stock: 25,
    category: "wellness",
    folder: "Eye massager sleep mask",
    firstImage: "71buUGZPyGL._SL1500_.jpg",
    material: "Breathable memory foam + PU leather",
    color: "",
    weight: "210 g",
    tags: ["Wellness", "ErgoAura"],
  },

  // ── 4. Foot Massage Roller (Spiked) ──
  {
    id: "foot-massage-roller-spiked",
    title: "Foot Massage Roller (Spiked)",
    description:
      "Relax tired feet instantly with acupressure spikes that stimulate pressure points. Ideal for heel pain, plantar fasciitis relief, and improving blood circulation after long days.",
    price: 269,
    originalPrice: 498,
    stock: 35,
    category: "wellness",
    folder: "Foot massage roller",
    firstImage: "71C6y5PaQcL._SL1024_.jpg",
    material: "ABS plastic with acupressure spikes",
    color: "",
    weight: "250 g",
    tags: ["Wellness", "ErgoAura"],
  },

  // ── 5. Kitchen Sink Drain Hair Catcher ──
  {
    id: "kitchen-sink-drain-hair-catcher",
    title: "Kitchen Sink Drain Hair Catcher",
    description:
      "Stop clogged drains with this adhesive mesh roll. Simply stick it over your drain — it catches hair, food debris, and gunk while letting water flow through freely. Each application lasts up to 6 weeks.",
    price: 189,
    originalPrice: 291,
    stock: 60,
    category: "kitchen",
    folder: "Kitchen sink drain hair catcher",
    firstImage: "81K4FfOClhL._SL1500_.jpg",
    material: "Adhesive mesh film",
    color: "Transparent",
    weight: "50 g",
    tags: ["Home & Kitchen", "ErgoAura"],
  },

  // ── 6. Magnetic USB Cable 3-in-1 ──
  {
    id: "magnetic-usb-cable-3-in-1",
    title: "Magnetic USB Cable 3-in-1",
    description:
      "Charge your smartwatch, phone, and earbuds with one magnetic cable. Features 3 interchangeable tips (Apple Watch, Micro USB, USB-C) and fast charging support. 1 meter length.",
    price: 145,
    originalPrice: 250,
    stock: 55,
    category: "accessories",
    folder: "Magnetic USB cable",
    firstImage: "71K28ltxwML._SL1000_.jpg",
    material: "Braided nylon",
    color: "",
    weight: "50 g",
    tags: ["Accessories", "ErgoAura"],
  },

  // ── 7. Menstrual Heating Pad (USB) ──
  {
    id: "menstrual-heating-pad-usb",
    title: "Menstrual Heating Pad (USB)",
    description:
      "Ease period pain naturally with this USB heating and massage pad. Features 3 heat levels and 3 vibration modes, cordless rechargeable battery, and a soft flexible design that stays in place.",
    price: 399,
    originalPrice: 767,
    stock: 30,
    category: "wellness",
    folder: "Menstrual heating pad (USB)",
    firstImage: "4c1fa16d-e3f6-47e2-bc36-ddb1ad6125ab.avif",
    material: "Soft polyester + carbon fiber heating element",
    color: "",
    weight: "200 g",
    tags: ["Wellness", "ErgoAura"],
  },

  // ── 8. Posture Corrector Belt ──
  {
    id: "posture-corrector-belt",
    title: "Posture Corrector Belt",
    description:
      "Fix your posture naturally with this breathable back support belt. Adjustable straps gently pull shoulders back, align your spine, and relieve back pain from poor posture. Comfortable for all-day wear.",
    price: 279,
    originalPrice: 507,
    stock: 45,
    category: "wellness",
    folder: "Posture corrector belt",
    firstImage:
      "na-posture-corrector-magnetic-back-support-belt-shoulder-for-original-imah9chaghghhran.webp",
    material: "Breathable neoprene + elastic straps",
    color: "",
    weight: "150 g",
    tags: ["Wellness", "ErgoAura"],
  },

  // ── 9. Silicone Oil Splatter Guard ──
  {
    id: "silicone-oil-splatter-guard",
    title: "Silicone Oil Splatter Guard",
    description:
      "Stop oil splatters while frying! This flexible silicone mesh guard fits all pans and kadais. Food-grade silicone with fine mesh that lets steam escape while blocking oil splatters. Dishwasher safe.",
    price: 179,
    originalPrice: 298,
    stock: 50,
    category: "kitchen",
    folder: "Silicone oil splatter guard",
    firstImage: "81He5w+zsBL._AC_SX679_.jpg",
    material: "Food-grade silicone (BPA-free)",
    color: "Red / Grey",
    weight: "100 g",
    tags: ["Home & Kitchen", "ErgoAura"],
  },

  // ── 10. Waterproof Phone Pouch (Pack of 2) ──
  {
    id: "waterproof-phone-pouch",
    title: "Waterproof Phone Pouch (Pack of 2)",
    description:
      "Keep your phone dry underwater, at the beach, or in the rain. This pack of 2 pouches fits all phones up to 7 inches, with a secure triple-lock seal and detachable lanyard for hands-free carrying.",
    price: 129,
    originalPrice: 287,
    stock: 70,
    category: "accessories",
    folder: "Waterproof Phone Pouch",
    firstImage: "81AKrS3Nf8L._AC_SL1500_.jpg",
    material: "Clear TPU + PVC",
    color: "Clear",
    weight: "100 g",
    tags: ["Accessories", "ErgoAura"],
  },

  // ── 11. Waterproof Shoe Covers ──
  {
    id: "waterproof-shoe-covers",
    title: "Waterproof Shoe Covers",
    description:
      "Keep your shoes dry in rain and mud. These reusable waterproof shoe covers feature anti-slip rubber soles, elastic cuffs, and a lightweight design that folds into your bag. One size fits most adults.",
    price: 99,
    originalPrice: 198,
    stock: 65,
    category: "accessories",
    folder: "Waterproof shoe covers",
    firstImage: "51iqWsou8wL.jpg",
    material: "Waterproof polyester + rubber sole",
    color: "",
    weight: "120 g",
    tags: ["Accessories", "ErgoAura"],
  },

  // ── 12. Samsung Galaxy S23 Ultra ──
  {
    id: "samsung-galaxy-s23-ultra",
    title: "Samsung Galaxy S23 Ultra",
    description:
      "Samsung Galaxy S23 Ultra — 200MP camera, S Pen, Snapdragon 8 Gen 2 for Galaxy, 12GB RAM, 512GB Storage, 5000mAh battery, Dynamic AMOLED 2X 120Hz display. International Version with dual SIM support. Graphite colour.",
    price: 24990,
    originalPrice: 124999,
    stock: 15,
    category: "electronics",
    folder:
      "Part-2/Samsung Galaxy S23 Ultra Dual SIM Smartphone 12GB RAM 512GB Storage - Internationa Version",
    firstImage: "galaxy-s23-ultra-highlights-kv-1.jpg",
    material: "Glass front & back, aluminum frame",
    color: "Graphite",
    weight: "234 g",
    tags: ["Electronics & Gadgets", "Samsung"],
  },

  // ── 13. Apple iPhone 15 Pro Max 512GB ──
  {
    id: "iphone-15-pro-max-512gb",
    title: "Apple iPhone 15 Pro Max 512GB",
    description:
      'Apple iPhone 15 Pro Max 512GB — A17 Pro chip, 48MP Pro camera system, 6.7" Super Retina XDR display with ProMotion, titanium design, USB-C, Action button, and all-day battery life. International Version.',
    price: 46990,
    originalPrice: 94994,
    stock: 9,
    category: "electronics",
    folder: "Part-2/iPhone-15-Pro-Max-512GB-Smart-Phone-Mega-Deal-Offer",
    firstImage:
      "Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.xlarge_2x.jpg",
    material: "Titanium, glass back",
    color: "Natural Titanium",
    weight: "221 g",
    tags: ["Electronics & Gadgets", "Apple"],
  },

  // ── 14. Messi Argentina 2026 Men's Local Jersey ──
  {
    id: "messi-argentina-2026-jersey",
    title: "Messi Argentina 2026 Men's Local Jersey",
    description:
      "Dress like a champion with Messi's exact replica jersey for Argentina. ADIDAS original replica with premium detailing. Breathable, lightweight fabric with authentic Argentina team colours and Messi's number 10. Available in S-XXL.",
    price: 499,
    originalPrice: 999,
    stock: 100,
    category: "worldcup-2026",
    folder: "Part-2/Messi 10 Jersy Argentina world cup 2026",
    firstImage: "Home/71DbIUtPvCL._AC_SX569_.jpg",
    material: "High-quality breathable fabric",
    color: "Argentina team colours",
    weight: "222 g",
    tags: ["Fifa Worldcup 2026", "ADIDAS"],
  },
];

// ─────────────────────────────────────────────────────────────────────
// CSV Header Comments (preserved from original file)
// ─────────────────────────────────────────────────────────────────────
const HEADER_COMMENTS = [
  "# Required | A unique content ID for the item. Use the item's SKU if you can. Each content ID must appear only once in your catalog. To run dynamic ads this ID must exactly match the content ID for the same item in your Meta Pixel code. Character limit: 100,# Required | A specific and relevant title for the item. See title specifications: https://www.facebook.com/business/help/2104231189874655 Character limit: 200,# Required | A short and relevant description of the item. Include specific or unique product features like material or color. Use plain text and don't enter text in all capital letters. See description specifications: https://www.facebook.com/business/help/2302017289821154 Character limit: 9999,# Required | The current availability of the item. | Supported values: in stock; out of stock,# Required | The current condition of the item. | Supported values: new; used,# Required | The price of the item. Format the price as a number followed by the 3-letter currency code (ISO 4217 standards). Use a period (.) as the decimal point; don't use a comma.,# Required | The URL of the specific product page where people can buy the item.,# Required | The URL for the main image of your item. Images must be in a supported format (JPG/GIF/PNG) and at least 500 x 500 pixels.,# Required | The brand name of the item. Character limit: 100.,# Optional | The Google product category for the item. Learn more about product categories: https://www.facebook.com/business/help/526764014610932.,# Optional | The Facebook product category for the item. Learn more about product categories: https://www.facebook.com/business/help/526764014610932.,# Optional | The quantity of this item you have to sell on Facebook and Instagram with checkout. Must be 1 or higher or the item won't be buyable,# Optional | The discounted price of the item if it's on sale. Format the price as a number followed by the 3-letter currency code (ISO 4217 standards). Use a period (.) as the decimal point; don't use...",
];

// ─────────────────────────────────────────────────────────────────────
// Column Headers
// ─────────────────────────────────────────────────────────────────────
const COLUMN_HEADERS = [
  "id",
  "title",
  "description",
  "availability",
  "condition",
  "price",
  "link",
  "image_link",
  "brand",
  "google_product_category",
  "fb_product_category",
  "quantity_to_sell_on_facebook",
  "sale_price",
  "sale_price_effective_date",
  "item_group_id",
  "gender",
  "color",
  "size",
  "age_group",
  "material",
  "pattern",
  "shipping",
  "shipping_weight",
  "offer_disclaimer",
  "offer_disclaimer_url",
  "video[0].url",
  "video[0].tag[0]",
  "gtin",
  "product_tags[0]",
  "product_tags[1]",
  "style[0]",
];

// ─────────────────────────────────────────────────────────────────────
// Build CSV Content
// ─────────────────────────────────────────────────────────────────────
function formatPrice(amount) {
  return `${amount.toFixed(2)} INR`;
}

function generateProductRow(p) {
  const brand = BRAND_MAP[p.id] || "ErgoAura";
  const googleCat = GOOGLE_CAT[p.category] || "";
  const fbCat = FB_CAT[p.category] || "";
  const pageUrl = `${SITE_URL}/products/${p.id}`;
  const imageUrl = buildImageUrl(p.folder, p.firstImage);

  // Sale effective date (ongoing — leave empty, no fixed end)
  const saleEffectiveDate = "";

  // Shipping — free standard shipping within India
  const shipping = "IN:Standard:0.00 INR";

  // Shipping weight with unit
  const shippingWeight = p.weight || "";

  // Disclaimer only for electronics (stock clearance note)
  let disclaimer = "";
  let disclaimerUrl = "";
  if (p.category === "electronics") {
    disclaimer =
      "Limited stock clearance. International version. 7-day replacement guarantee.";
    disclaimerUrl = `${SITE_URL}/terms`;
  }

  // Size — only for jersey
  let size = "";
  if (p.id === "messi-argentina-2026-jersey") {
    size = "S, M, L, XL, XXL";
  }

  // Gender — unisex for jersey
  let gender = "";
  if (p.id === "messi-argentina-2026-jersey") {
    gender = "unisex";
  }

  return row([
    p.id,
    p.title,
    p.description,
    "in stock",
    "new",
    formatPrice(p.originalPrice),
    pageUrl,
    imageUrl,
    brand,
    googleCat,
    fbCat,
    String(p.stock),
    formatPrice(p.price),
    saleEffectiveDate,
    "", // item_group_id
    gender,
    p.color,
    size,
    "adult",
    p.material,
    "", // pattern
    shipping,
    shippingWeight,
    disclaimer,
    disclaimerUrl,
    "", // video[0].url
    "", // video[0].tag[0]
    "", // gtin
    p.tags[0] || "",
    p.tags[1] || "",
    "", // style[0]
  ]);
}

// ─────────────────────────────────────────────────────────────────────
// Assemble and write the CSV
// ─────────────────────────────────────────────────────────────────────
function main() {
  const lines = [];

  // 1. Header comments (first row)
  lines.push(...HEADER_COMMENTS);

  // 2. Column headers (second row)
  lines.push(row(COLUMN_HEADERS));

  // 3. Product data rows
  for (const p of PRODUCTS) {
    lines.push(generateProductRow(p));
  }

  const csvContent = lines.join("\r\n") + "\r\n";

  // Ensure output directory exists
  const dir = path.dirname(CSV_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Try writing to the target path. If the file is locked (e.g. open in Excel),
  // fall back to a temp file so the user can copy it manually.
  const tempPath = CSV_PATH.replace(/\.csv$/i, ".tmp.csv");

  try {
    fs.writeFileSync(CSV_PATH, csvContent, "utf-8");
    console.log(`✓ Catalog CSV written to: ${CSV_PATH}`);
  } catch (err) {
    if (err.code === "EBUSY") {
      fs.writeFileSync(tempPath, csvContent, "utf-8");
      console.log(
        `✓ Target file is locked (open in another program). Written to: ${tempPath}`,
      );
      console.log(`  → Close the original file, then run:`);
      console.log(`  → copy /y "${tempPath}" "${CSV_PATH}"`);
    } else {
      throw err;
    }
  }

  console.log(`  • ${PRODUCTS.length} products written`);
  console.log(
    `  • File size: ${(Buffer.byteLength(csvContent) / 1024).toFixed(1)} KB`,
  );
}

main();
