# S23 Banner — Implementation Plan

## Overview

Create a new `S23Banner` component (mirror of `IPhoneBanner`) with green+black color scheme, place it below the iPhone banner on the home page, and above "The Story" on the S23 product page.

---

## 1. Create `S23Banner` Component

**File:** `src/components/products/s23/S23Banner.tsx` (new)

**Based on:** `src/components/products/iphone-15-pro-max/IPhoneBanner.tsx`

### Same Structure (preserved exactly):

- 3-column layout: left text | center SVG phone | right stats/pricing
- Background: dot grid pattern, radial spotlight blobs (2), concentric circles (2), vertical hairline dividers (2)
- Image slideshow: right 50%, auto-rotates every 4s with 2s opacity transition
- Badge pill, title/subtitle, storage pills, Buy Now button
- Right column: price card (strikethrough + current price), stats row (3 items), star rating
- Click-to-navigate, add-to-cart + checkout functionality

### What Changes:

| Element                  | iPhone (original)                        | Samsung (new)                                     |
| ------------------------ | ---------------------------------------- | ------------------------------------------------- |
| **Background**           | `#000`                                   | `#0a0a0a` (matches S23 page)                      |
| **Spotlight blobs**      | `rgba(255,255,255,...)`                  | `rgba(74,93,35,...)` — green glow                 |
| **Circles border**       | `rgba(255,255,255,0.12)`                 | `rgba(74,93,35,0.2)` — green tint                 |
| **Dividers**             | `rgba(255,255,255,0.06)`                 | `rgba(74,93,35,0.15)`                             |
| **Chip/badge bg**        | `rgba(255,255,255,0.08)`                 | `rgba(74,93,35,0.15)`                             |
| **Chip/badge border**    | `rgba(255,255,255,0.18)`                 | `rgba(74,93,35,0.25)`                             |
| **Chip dot color**       | `#fff`                                   | `#728541` (--s23-accent-text)                     |
| **Title color split**    | White / `rgba(255,255,255,0.35)`         | White / `#728541` (accent green)                  |
| **Subtitle text**        | "512GB · Black Titanium..."              | "512GB · Graphite / 200MP cam · S Pen · 8K video" |
| **Storage pills bg**     | `rgba(255,255,255,0.07)`                 | `rgba(74,93,35,0.12)`                             |
| **Storage pills active** | `rgba(255,255,255,0.15)`                 | `rgba(74,93,35,0.25)`                             |
| **Buy Now hover**        | `#e5e5e5` bg → `#000` text               | `#5c7530` bg → `#fff` text (--s23-accent-light)   |
| **Price card bg**        | `rgba(255,255,255,0.05)`                 | `rgba(74,93,35,0.08)`                             |
| **Price card border**    | `rgba(255,255,255,0.1)`                  | `rgba(74,93,35,0.15)`                             |
| **Stats row divider**    | `rgba(255,255,255,0.08)`                 | `rgba(74,93,35,0.15)`                             |
| **Navigate to**          | `/products/iphone-15-pro-max-512gb`      | `/products/samsung-galaxy-s23-ultra`              |
| **Product data**         | `IPHONE_PRODUCT`                         | `S23_PRODUCT`                                     |
| **Image folder**         | `IPHONE_FOLDER`                          | `S23_FOLDER`                                      |
| **Badge text**           | "Brand New · 2024"                       | "Brand New · 2023"                                |
| **Phone SVG**            | iPhone with Dynamic Island               | Samsung-style with punch-hole camera              |
| **Stats**                | 48MP Camera / A17 Pro chip / 29h Battery | 200MP Camera / S Pen / 5000mAh                    |
| **Star rating**          | 4.9 · 158+ reviews                       | 4.8 · 17 reviews                                  |

### Samsung Phone SVG Changes (vs iPhone SVG):

- Remove Dynamic Island (`rect` at x=27, y=18, width=36, height=10)
- Add punch-hole camera: small circle at top center (e.g., cx=45, cy=20, r=3)
- Adjust screen content lines slightly to match Samsung UI feel
- Outer shell color: `#111` → keep similar but adjust stroke to green (`rgba(74,93,35,0.2)`)

### Banner Slide Images (from S23 folder):

```js
const BANNER_SLIDE_IMAGES = [
  "galaxy-s23-ultra-highlights-kv-1.jpg",
  "galaxy-s23-ultra-highlights-camera-1.jpg",
  "galaxy-s23-ultra-highlights-display-1.jpg",
  "galaxy-s23-ultra-highlights-nightography-1.jpg",
  "galaxy-s23-ultra-highlights-spen-more-1.jpg",
];
```

---

## 2. Update Home Page

**File:** `src/app/page.tsx`

**Change:** Add `S23Banner` import and component below `IPhoneBanner`.

```tsx
// Add import
import S23Banner from "@/components/products/s23/S23Banner";

// In JSX, after the iPhone banner div (line ~69):
{
  /* ============================== */
}
{
  /* Samsung Galaxy S23 Ultra Banner */
}
{
  /* ============================== */
}
<div className="section-container py-6">
  <S23Banner />
</div>;
```

---

## 3. Update S23 Product Page

**File:** `src/components/products/s23/S23SamsungGalaxySection.tsx`

**Change:** Import `S23Banner` and insert it between `S23FullWidthImage` and `S23Story`.

```tsx
// Add import
import S23Banner from "./S23Banner";

// In the JSX (after line 32, before S23Story):
{
  /* 3b. Promo Banner — below full-width image, above story */
}
<S23Banner />;
```

This places the banner above "The Story" section as requested.

---

## Implementation Order

1. Create `S23Banner.tsx` component
2. Update `src/app/page.tsx` to import and render S23Banner
3. Update `src/components/products/s23/S23SamsungGalaxySection.tsx` to import and render S23Banner
