# Plan: Add Two New Categories with Dynamic Home Page Section

## Overview

Add "Electronics & Gadgets" and "Fifa Worldcup 2026" categories to the site, with:

- OG images from category products
- Dynamic home page category section showing product image sliders
- Fully dynamic so any new categories auto-appear

---

## Step 1 — Add categories to [`src/lib/constants.ts`](../src/lib/constants.ts:48-53)

Add two entries to the `CATEGORIES` array:

```typescript
{ slug: "electronics", name: "Electronics & Gadgets" },
{ slug: "worldcup-2026", name: "Fifa Worldcup 2026" },
```

**Why these slugs?**

- `"electronics"` — matches existing products: [`Samsung Galaxy S23 Ultra`](../src/lib/products-data.ts:524) (`category: "electronics"`) and [`iPhone 15 Pro Max`](../src/lib/iphone-15-pro-max-data.ts:58) (`category: "electronics"`)
- `"worldcup-2026"` — clean kebab-case URL slug. The existing jersey product uses `category: "Worldcup 2026"` but it's NOT in [`LOCAL_PRODUCTS`](../src/lib/products-data.ts:184) (it's in [`worldcup-2026-data.ts`](../src/lib/worldcup-2026-data.ts)), so the slug mismatch won't break anything. If the jersey is later added to LOCAL_PRODUCTS, its category value should be updated to `"worldcup-2026"`.

---

## Step 2 — Update [`src/app/sitemap.ts`](../src/app/sitemap.ts:55-60)

The sitemap has a **hardcoded duplicate** of the `CATEGORIES` array. Change it to import and use the `CATEGORIES` constant:

**Import** (add to existing imports):

```typescript
import { CATEGORIES } from "@/lib/constants";
```

**Replace the hardcoded `categories` variable** (lines 55-60):

```typescript
const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
  url: `${baseUrl}/categories/${cat.slug}`,
  lastModified: new Date(),
  changeFrequency: "weekly",
  priority: 0.7,
}));
```

This makes the sitemap always reflect the exact CATEGORIES array.

---

## Step 3 — Add OG images to [`src/app/categories/[slug]/page.tsx`](../src/app/categories/[slug]/page.tsx:17-36)

In the `generateMetadata` function, add `openGraph.images` using the first product image from the category's products:

**Import `getProductImages`** at the top:

```typescript
import { getProductImages } from "@/lib/utils";
```

**Inside `generateMetadata`**, after computing `count`:

```typescript
const categoryProducts = LOCAL_PRODUCTS.filter((p) => p.category === slug);
const ogImage =
  categoryProducts.length > 0
    ? getProductImages(categoryProducts[0].slug)?.[0]
    : undefined;
```

Then add to the `openGraph` block:

```typescript
openGraph: {
  title: `${category.name} | ${SITE_METADATA.title}`,
  description: `...`,
  url: `${SITE_URL}/categories/${slug}`,
  ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 900 }] }),
},
```

Also update the `CategoryPage` component to pass `getProductImages` for use in any future meta tags.

---

## Step 4 — Refactor home page categories section in [`src/app/page.tsx`](../src/app/page.tsx:253-566)

This is the most substantial change. Replace the **hardcoded category array with SVG animations** with a **dynamic iteration over `CATEGORIES`** showing **product image sliders**.

### What changes:

#### 4a — Add imports

```typescript
import { CATEGORIES } from "@/lib/constants";
// getProductImages and getProductImageUrl are already imported via utils
```

#### 4b — Replace the hardcoded category map (lines 262-563)

**Current code** — a hardcoded array with per-slug SVG animations.

**Replace with** — dynamic iteration over `CATEGORIES`:

```tsx
{
  CATEGORIES.map((category) => {
    // Find products in this category from LOCAL_PRODUCTS
    const catProducts = LOCAL_PRODUCTS.filter(
      (p) => p.category === category.slug,
    );
    // Collect up to 3 product images
    const catImages: string[] = [];
    for (const product of catProducts) {
      const imgs = getProductImages(product.slug);
      if (imgs.length > 0) {
        catImages.push(imgs[0]); // first image of each product
      }
      if (catImages.length >= 3) break; // max 3 images
    }

    return (
      <Link
        key={category.slug}
        href={`/products?category=${category.slug}`}
        className="group rounded-2xl overflow-hidden bg-white shadow-base hover:shadow-xl
                 transition-all duration-300 hover:-translate-y-1"
      >
        <div className="aspect-[4/3] bg-[#F5F1EB] overflow-hidden flex items-center justify-center relative">
          {catImages.length > 0 ? (
            /* Image slider */
            <div className="relative w-full h-full flex">
              {catImages.map((img, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-opacity duration-700"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    animation:
                      i > 0 ? `fadeInOut 9s infinite ${i * 3}s` : "none",
                  }}
                >
                  <Image
                    src={img}
                    alt={`${category.name} product ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
              ))}
            </div>
          ) : (
            /* Fallback: placeholder icon for categories with no local products */
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#EAE3D5] flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                className="w-10 h-10 text-[#C9A962]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" />
              </svg>
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-base font-semibold text-[#1A1614] group-hover:text-[#C9A962] transition-colors duration-200">
            {category.name}
          </h3>
          <p className="text-sm text-[#86868B] mt-0.5">
            Shop {category.name.toLowerCase()} &rarr;
          </p>
        </div>
      </Link>
    );
  });
}
```

#### 4c — Add CSS keyframes for the image fade slider

Add to the component or a global CSS file:

```css
@keyframes fadeInOut {
  0%,
  100% {
    opacity: 0;
  }
  10%,
  30% {
    opacity: 1;
  }
  40%,
  100% {
    opacity: 0;
  }
}
```

This can be added as a `<style>` tag in the component or via Tailwind's arbitrary animation support. Using Tailwind, we can define custom keyframes in the tailwind config or use inline styles.

Simpler approach: use a client-side effect to cycle images, similar to what [`ProductImage.tsx`](../src/components/products/ProductImage.tsx) already does.

**Recommended approach:** Create a small inline client component or use the existing `ProductImage` component pattern with `useEffect` + `setInterval` for auto-rotation.

---

## Files to modify (summary)

| #   | File                                                                                | Change                                                                                   |
| --- | ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1   | [`src/lib/constants.ts`](../src/lib/constants.ts:48-53)                             | Add 2 entries to `CATEGORIES` array                                                      |
| 2   | [`src/app/sitemap.ts`](../src/app/sitemap.ts:55-60)                                 | Import `CATEGORIES`, remove hardcoded array                                              |
| 3   | [`src/app/categories/[slug]/page.tsx`](../src/app/categories/[slug]/page.tsx:17-36) | Add `og:image` in `generateMetadata` using first product image                           |
| 4   | [`src/app/page.tsx`](../src/app/page.tsx:253-566)                                   | Replace hardcoded categories section with dynamic CATEGORIES loop + product image slider |

## Files NOT modified

- [`src/lib/products-data.ts`](../src/lib/products-data.ts) — product data stays as-is
- [`src/lib/types.ts`](../src/lib/types.ts) — no type changes needed
- [`src/lib/utils.ts`](../src/lib/utils.ts) — `getProductImages()` already handles all slugs correctly
- [`src/app/categories/page.tsx`](../src/app/categories/page.tsx) — already uses `CATEGORIES` + `LOCAL_PRODUCTS` dynamically ✓
- Any product-specific data files (`s23-ultra-data.ts`, `iphone-15-pro-max-data.ts`, `worldcup-2026-data.ts`)
- Any component files (Footer, Header, ProductCard, etc.)

---

## Edge cases & notes

1. **Category with no local products** (e.g., `worldcup-2026` currently has 0 products in LOCAL_PRODUCTS) — shows a fallback placeholder icon instead of breaking.

2. **Category with 1 product** — shows that single product's image (no slider animation).

3. **Category with 2-3 products** — shows up to 3 product images with auto-fade slider.

4. **Existing 4 categories** — will now show product images instead of SVG animations. This is a visual change but preserves all card structure, links, and styling.

5. **Future categories** — adding entries to `CATEGORIES` in constants.ts will automatically make them appear on the home page, sitemap, and categories page.

6. **Image slider animation** — uses a simple opacity crossfade via CSS keyframes or a `useEffect` interval, consistent with the existing `ProductImage` component pattern.
