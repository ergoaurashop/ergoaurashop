# Mega Deals Branding — Text Rewrite Plan

## Objective

Replace all user-facing "wellness" text across the entire site with "Mega Deals" messaging to communicate massive savings and value. Only text is changed — no code, styles, structures, or URL slugs are modified.

## Scope

- **URL slugs** are preserved (e.g., `/products?category=wellness` remains) — safe for SEO
- **Product category values** (`category: "wellness"` in data) are NOT changed
- **Only visible text, meta descriptions, titles, JSON-LD descriptions, and breadcrumb labels** are updated

---

## Files to Modify (8 files total)

### 1. [`src/app/page.tsx`](src/app/page.tsx) — Homepage Hero + Sections

| Location                                  | Current Text                                                                                                 | New Text                                                                                             |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| **Hero Overline** (line 100-101)          | `Premium Wellness Collection`                                                                                | `🔥 Mega Deals Collection`                                                                           |
| **Hero H1** (lines 103-107)               | `Premium Wellness for\nEveryday Comfort`                                                                     | `Hand Picked Mega Deals\nUp to 50% Off`                                                              |
| **Hero Subtitle** (lines 108-111)         | `Discover thoughtfully designed products that make your daily life more comfortable, healthier, and better.` | `Score massive savings on premium hand-picked products — curated just for you at unbeatable prices.` |
| **Featured Products subtitle** (line 226) | `Our most popular wellness essentials`                                                                       | `Our bestselling mega deals — hand-picked for you`                                                   |
| **Category name** (line 264)              | `Wellness`                                                                                                   | `Mega Deals`                                                                                         |

> **Note:** The `category.slug` stays `"wellness"` — only the displayed `category.name` changes.

---

### 2. [`src/app/layout.tsx`](src/app/layout.tsx) — Global Metadata

| Location                | Current                | New                      |
| ----------------------- | ---------------------- | ------------------------ |
| **Line 86: `category`** | `category: "wellness"` | `category: "mega-deals"` |

> This is a metadata hint for search engines, not a URL slug.

---

### 3. [`src/lib/constants.ts`](src/lib/constants.ts) — Site-Wide Constants

| Location                                 | Current                                                  | New                                                                                                   |
| ---------------------------------------- | -------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Line 41: `SITE_METADATA.description`** | `"Premium wellness products for your everyday comfort."` | `"Unbeatable mega deals on premium hand-picked products — quality you love at prices you will love."` |
| **Line 48: `CATEGORIES[0].name`**        | `"Wellness"`                                             | `"Mega Deals"`                                                                                        |

---

### 4. [`src/app/products/page.tsx`](src/app/products/page.tsx) — Products Listing

| Location                           | Current                                                                                | New                                                                                               |
| ---------------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Line 20: Category filter label** | `{ label: "Wellness", value: "wellness" }`                                             | `{ label: "Mega Deals", value: "wellness" }`                                                      |
| **Lines 179-181: Hero subtitle**   | `Discover premium wellness products designed for your everyday comfort and well-being` | `Discover unbeatable mega deals on premium products — hand-picked and priced for maximum savings` |

---

### 5. [`src/components/layout/Footer.tsx`](src/components/layout/Footer.tsx) — Footer

| Location                           | Current                                                                        | New                                                                                                    |
| ---------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| **Lines 33-34: Brand description** | `Premium wellness products designed for your everyday comfort and well-being.` | `Premium products at unbeatable mega deal prices — hand-picked for your everyday comfort and savings.` |

---

### 6. [`src/app/categories/page.tsx`](src/app/categories/page.tsx) — Categories Page

| Location                         | Current                                                                                                                            | New                                                                                                                             |
| -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| **Lines 54-55: Hero subtitle**   | `Explore our curated collection of wellness, kitchen, accessories, and personal care products designed for your everyday comfort.` | `Explore our curated collection of mega deals across kitchen, accessories, personal care, and more — all at unbeatable prices.` |
| **Lines 9-10: Meta description** | `"Browse all product categories at ErgoAura Shop — Wellness, Home & Kitchen, Accessories, and Personal Care."`                     | `"Browse all product categories at ErgoAura Shop — Mega Deals, Home & Kitchen, Accessories, and Personal Care."`                |
| **Lines 16-17: OG description**  | Same as above                                                                                                                      | Same update                                                                                                                     |

---

### 7. [`src/app/blog/page.tsx`](src/app/blog/page.tsx) — Blog Page

| Location                            | Current                                                                                                   | New                                                                                                                        |
| ----------------------------------- | --------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| **Line 14: Title**                  | `Blog — Wellness Tips, Guides & Lifestyle \| ErgoAura Shop`                                               | `Blog — Mega Deals, Tips & Buying Guides \| ErgoAura Shop`                                                                 |
| **Line 15-16: Meta description**    | `Discover expert wellness tips, product guides, and lifestyle advice from ErgoAura...`                    | `Discover expert buying guides, mega deal tips, and product advice from ErgoAura. Find the best value for every purchase.` |
| **Line 21-22: OG title**            | `ErgoAura Blog — Wellness Tips & Product Guides`                                                          | `ErgoAura Blog — Mega Deals & Buying Guides`                                                                               |
| **Line 23: OG description**         | `Expert advice on posture, sleep, foot care, travel essentials, and home wellness...`                     | `Expert advice on finding the best deals, product comparisons, and smart shopping tips. Read the latest from ErgoAura.`    |
| **Line 39-40: Twitter description** | `Expert advice on posture, sleep, foot care, travel essentials, and home wellness.`                       | `Smart shopping tips, product comparisons, and mega deal advice. Read the latest from ErgoAura.`                           |
| **Lines 88-89: Hero subtitle**      | `Expert wellness tips, product guides, and lifestyle advice to help you live more comfortably every day.` | `Expert buying guides, mega deal tips, and product advice to help you shop smarter and save more every day.`               |

---

### 8. [`src/app/blog/BlogListingJsonLd.tsx`](src/app/blog/BlogListingJsonLd.tsx) — Blog JSON-LD

| Location                 | Current                                                                       | New                                                                         |
| ------------------------ | ----------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| **Line 20: Description** | `"Expert wellness tips, product guides, and lifestyle advice from ErgoAura."` | `"Expert buying guides, mega deal tips, and product advice from ErgoAura."` |

---

### 9. [`src/app/sitemap.ts`](src/app/sitemap.ts) — Sitemap

| Location                   | Current                                  | New                                        |
| -------------------------- | ---------------------------------------- | ------------------------------------------ |
| **Line 56: Category name** | `{ slug: "wellness", name: "Wellness" }` | `{ slug: "wellness", name: "Mega Deals" }` |

> Slug stays `"wellness"` — only the display `name` changes.

---

## Technical SEO Changes Summary

| Type                    | Files Changed                                                                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Meta title              | [`blog/page.tsx`](src/app/blog/page.tsx)                                                                                               |
| Meta description        | [`constants.ts`](src/lib/constants.ts), [`blog/page.tsx`](src/app/blog/page.tsx), [`categories/page.tsx`](src/app/categories/page.tsx) |
| Open Graph tags         | [`blog/page.tsx`](src/app/blog/page.tsx), [`categories/page.tsx`](src/app/categories/page.tsx)                                         |
| Twitter card            | [`blog/page.tsx`](src/app/blog/page.tsx)                                                                                               |
| JSON-LD structured data | [`blog/BlogListingJsonLd.tsx`](src/app/blog/BlogListingJsonLd.tsx)                                                                     |
| Site category metadata  | [`layout.tsx`](src/app/layout.tsx)                                                                                                     |
| Sitemap display names   | [`sitemap.ts`](src/app/sitemap.ts)                                                                                                     |

## What is NOT Changed

- **URL slugs** — all `wellness` in URLs stay as-is
- **Product category values** — `category: "wellness"` in data remains
- **CSS, styles, animations** — untouched
- **Component structure, layouts** — untouched
- **Database queries** — still filter by `category = "wellness"`
- **Product data files** — [`products-data.ts`](src/lib/products-data.ts) category field stays
- **Blog data** — [`blog-data.ts`](src/lib/blog-data.ts) tags stay

## Implementation Order

1. **`src/lib/constants.ts`** — Update `SITE_METADATA.description` and `CATEGORIES[0].name` first (foundation)
2. **`src/app/layout.tsx`** — Update `category: "wellness"` → `category: "mega-deals"`
3. **`src/app/page.tsx`** — Rewrite hero text, featured products subtitle, category name
4. **`src/app/products/page.tsx`** — Update filter label and hero subtitle
5. **`src/components/layout/Footer.tsx`** — Update brand description
6. **`src/app/categories/page.tsx`** — Update meta desc, OG desc, hero subtitle
7. **`src/app/blog/page.tsx`** — Update all metadata and hero text
8. **`src/app/blog/BlogListingJsonLd.tsx`** — Update JSON-LD description
9. **`src/app/sitemap.ts`** — Update category display name
