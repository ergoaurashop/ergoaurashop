# Plan: Add "Phones" Category to All Products Page

## Objective

Add a new **"Phones"** category filter to the All Products page that shows both Samsung Galaxy S23 Ultra and iPhone 15 Pro Max. The category filter bar should dynamically show ALL existing categories from the central constant rather than a hardcoded list.

---

## Files to Modify

### 1. `src/lib/constants.ts` — Add "Phones" to central CATEGORIES

**Change:** Insert a new `{ slug: "phones", name: "Phones" }` entry in the `CATEGORIES` array.

```ts
export const CATEGORIES = [
  { slug: "wellness", name: "Mega Deals" },
  { slug: "kitchen", name: "Home & Kitchen" },
  { slug: "accessories", name: "Accessories" },
  { slug: "personal-care", name: "Personal Care" },
  { slug: "phones", name: "Phones" }, // ← NEW
  { slug: "electronics", name: "Electronics & Gadgets" },
  { slug: "worldcup-2026", name: "Fifa Worldcup 2026" },
] as const;
```

**Why:** The sitemap, categories page, and category detail pages already iterate `CATEGORIES` dynamically. Adding "Phones" here auto-propagates to all those pages without manual updates.

---

### 2. `src/lib/products-data.ts` — Add iPhone to LOCAL_PRODUCTS, set both to "phones"

**Changes:**

(a) **Import** `IPHONE_PRODUCT` from `@/lib/iphone-15-pro-max-data.ts`:

```ts
import { IPHONE_PRODUCT } from "@/lib/iphone-15-pro-max-data";
```

(b) **Change Samsung's category** from `"electronics"` to `"phones"` (line 524):

```ts
// Before:
category: "electronics",
// After:
category: "phones",
```

(c) **Add iPhone product** to `LOCAL_PRODUCTS` array (after the Samsung entry), with `category: "phones"`:

```ts
{
  ...IPHONE_PRODUCT,
  id: "prod-apple-iphone-15-pro-max-512gb",
  name: "Apple iPhone 15 Pro Max 512GB",
  slug: "iphone-15-pro-max-512gb",
  category: "phones",           // override from "electronics"
  // ...all other fields from IPHONE_PRODUCT
}
```

**Why:**

- Both phones need `category: "phones"` so the exact-match filter `eq("category", "phones")` finds them
- iPhone is not currently in `LOCAL_PRODUCTS` (it's only in the separate iphone data file), so it won't appear in fallback listings without this addition
- Using spread `...IPHONE_PRODUCT` preserves all existing data and only overrides `category`

---

### 3. `src/app/products/page.tsx` — Dynamically render all categories

**Changes:**

(a) **Import** `CATEGORIES` from constants (renamed to avoid conflict):

```ts
import { CATEGORIES as CATEGORIES_CONST } from "@/lib/constants";
```

(b) **Remove** the hardcoded `CATEGORIES` array (lines 18-24):

```ts
// DELETE this block:
const CATEGORIES = [
  { label: "All", value: "all" },
  { label: "Mega Deals", value: "wellness" },
  { label: "Home & Kitchen", value: "kitchen" },
  { label: "Accessories", value: "accessories" },
  { label: "Personal Care", value: "personal-care" },
];
```

(c) **Build filter categories dynamically** after the imports:

```ts
const FILTER_CATEGORIES = [
  { label: "All", value: "all" },
  ...CATEGORIES_CONST.map((c) => ({ label: c.name, value: c.slug })),
];
```

(d) **Update all references** from `CATEGORIES` to `FILTER_CATEGORIES`:

- Line 191: `CATEGORIES.map((cat)` → `FILTER_CATEGORIES.map((cat)`
- Line 237-238: `CATEGORIES.find((c) => c.value === activeCategory)` → `FILTER_CATEGORIES.find((c) => c.value === activeCategory)`

**Why:** This makes the filter bar automatically include every category from the central constant, including the new "Phones" category, "Electronics & Gadgets", and "Fifa Worldcup 2026" without requiring manual updates to the products page.

---

## What Gets Added Automatically

| Page                   | Before                                                  | After                                                                                                                                |
| ---------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `/products` filter bar | 5 hardcoded categories (missing electronics & worldcup) | All 7 categories: All, Mega Deals, Home & Kitchen, Accessories, Personal Care, **Phones**, Electronics & Gadgets, Fifa Worldcup 2026 |
| `/categories` listing  | Shows all 6 existing categories                         | Shows all 7 categories including **Phones**                                                                                          |
| `/categories/phones`   | Would 404 (no route for "phones")                       | Works — shows Samsung + iPhone                                                                                                       |
| `/sitemap.xml`         | Has `/categories/electronics` etc.                      | Adds `/categories/phones` automatically                                                                                              |

## What Does NOT Change

- No CSS/style changes
- No theme changes
- No function logic changes (filtering still uses exact match on `category` field)
- No layout restructuring
- No B2G1 exclusion logic (phones are NOT in excluded categories, which is fine)
- No other pages modified

---

## Filtering Flow

```
User clicks "Phones" filter
  → activeCategory = "phones"
  → Supabase query: .eq("category", "phones")
  → If Supabase has data → returns phone products
  → If Supabase empty/error → falls back to LOCAL_PRODUCTS filtered by "phones"
  → Both Samsung and iPhone appear
```
