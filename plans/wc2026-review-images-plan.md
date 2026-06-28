# Plan: Add Review Images to Messi Argentina 2026 Jersey Page

## Goal

Add one review image each to the first 4 reviews on the `/messi-argentina-2026-jersey` product page, following the same pattern used for the Samsung Galaxy S23 Ultra page.

## Changes Required

### 1. [`src/lib/worldcup-2026-data.ts`](src/lib/worldcup-2026-data.ts) — Add review images data

Add a `WC2026_REVIEW_IMAGES` constant (matching the `S23_REVIEW_IMAGES` pattern) after the `WC2026_REVIEWS` array. This maps review IDs to arrays of image filenames relative to the product folder.

```typescript
// After WC2026_REVIEWS array (line ~229) and before WC2026_REVIEW_SUMMARY (line ~234)
export const WC2026_REVIEW_IMAGES: Record<string, string[]> = {
  "wc2026-r1": ["reviews-images/IMG-20260628-WA0037.webp"],
  "wc2026-r2": ["reviews-images/IMG-20260628-WA0038.webp"],
  "wc2026-r3": ["reviews-images/IMG-20260628-WA0039.webp"],
  "wc2026-r4": ["reviews-images/IMG-20260628-WA0040.jpg"],
};
```

### 2. [`src/components/products/worldcup2026/WCReviews.tsx`](src/components/products/worldcup2026/WCReviews.tsx) — Add image rendering

#### 2a. Update imports

- Add `import Image from "next/image";`
- Add `import { WC2026_REVIEW_IMAGES, WC2026_FOLDER } from "@/lib/worldcup-2026-data";`

#### 2b. Add helper function (after imports, before `StarDisplay`)

```typescript
function getReviewImagePath(filename: string): string {
  const folder = WC2026_FOLDER;
  return `/images/products/${folder.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}
```

#### 2c. Inside the review card loop, add image display

After the `<p className="wc2026-review-text">{review.text}</p>` line (line ~142), add:

```tsx
{
  /* ── Review image (only for reviews with images) ── */
}
{
  (WC2026_REVIEW_IMAGES[review.id] ?? []).length > 0 && (
    <div className="wc2026-review-images">
      {WC2026_REVIEW_IMAGES[review.id].map((filename, i) => (
        <div key={filename} className="wc2026-review-image-wrapper">
          <Image
            src={getReviewImagePath(filename)}
            alt={`${review.name} review photo ${i + 1}`}
            width={120}
            height={120}
            style={{ height: "120px", width: "auto", objectFit: "cover" }}
            unoptimized
          />
        </div>
      ))}
    </div>
  );
}
```

### 3. [`src/styles/worldcup2026.css`](src/styles/worldcup2026.css) — Add review image styles

Add after the `.wc2026-review-helpful-btn:hover` rule (around line ~804) and before `.wc2026-review-verified`:

```css
/* ── Review Images ── */
.wc2026-review-images {
  display: flex;
  gap: 8px;
  margin-top: 8px;
  flex-wrap: wrap;
}

.wc2026-review-image-wrapper {
  width: 120px;
  height: 120px;
  border: 1px solid var(--wc-border-light);
  border-radius: var(--wc-radius-sm);
  overflow: hidden;
  cursor: pointer;
  transition: border-color 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}

.wc2026-review-image-wrapper:hover {
  border-color: var(--wc-text-link);
}

.wc2026-review-image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

## What Will NOT Change

- No changes to the page structure, layout, or theme
- No changes to other product pages
- No changes to the `ProductReviewDetail` type
- No changes to the review summary or FAQ sections
- No changes to the WorldCup2026Section orchestrator component
- The existing WC2026_REVIEWS array data stays intact (no `images` property added to individual review objects — using the separate `Record<string, string[]>` pattern like S23)

## Image Mapping

| Review ID                     | Image File                                |
| ----------------------------- | ----------------------------------------- |
| `wc2026-r1` (Neha Maheshwari) | `reviews-images/IMG-20260628-WA0037.webp` |
| `wc2026-r2` (Sana Khan)       | `reviews-images/IMG-20260628-WA0038.webp` |
| `wc2026-r3` (Rohan Joseph)    | `reviews-images/IMG-20260628-WA0039.webp` |
| `wc2026-r4` (Rahul Deshmukh)  | `reviews-images/IMG-20260628-WA0040.jpg`  |

## Execution Order

1. Add `WC2026_REVIEW_IMAGES` data to `src/lib/worldcup-2026-data.ts`
2. Update `WCReviews.tsx` with imports, helper function, and image rendering
3. Add CSS styles to `src/styles/worldcup2026.css`
4. Verify no other files are modified
