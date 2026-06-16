# iPhone Banner — Image Slideshow Update Plan

## Summary

Add a cross-fading image slideshow occupying the **right 50%** of the banner, positioned **behind** the existing content text/roundels but **in front of** the decorative background layers.

---

## Architecture

### Z-Index Stack (Updated)

| Layer               | Z-Index | Description                                                        |
| ------------------- | ------- | ------------------------------------------------------------------ |
| Decorative BG       | `0`     | Dot grid, radial spotlights, concentric rings, hairline dividers   |
| **Image Slideshow** | **`5`** | **NEW — right 50% canvas, cross-fade cycling**                     |
| Content             | `10`    | Left column text, center SVG iPhone, right column text/stats/price |

### Image Slideshow Div

- **Position:** `absolute`, `top: 0`, `right: 0`, `width: 50%`, `height: 100%`
- **Overflow:** hidden (already on parent)
- **Pointer events:** `pointer-events-none` so clicks pass through to content
- **Clip:** Images use `object-fit: cover` to fill without overflowing

### Image Sequence (5 items, 1 duplicated = 4 unique)

```ts
const BANNER_SLIDE_IMAGES = [
  "iphone-15-pro-max-issues-scaled.webp",
  "718qqVErHNL._AC_SL1500_.jpg",
  "Apple-iPhone-15-Pro-lineup-design-230912_big.jpg.large_2x.jpg",
  "718qqVErHNL._AC_SL1500_.jpg", // repeated as user specified
  "H6c195da845164cdaada13760b9748329C.avif",
];
```

### Cross-Fade Mechanism

- State: `currentSlide: number` (0–4), updated via `useEffect` + `setInterval`
- Interval: **every 4 seconds** (2s transition + 2s display)
- **Only the active image** has `opacity: 1`; all others `opacity: 0`
- Transition: `opacity 2s ease-in-out`
- Use `<img>` tags (not Next `<Image>`) since these are decorative/background — simpler, no layout shift issues

### Image Path Helper

```
`/images/products/Part-2/iPhone-15-Pro-Max-512GB-Smart-Phone-Mega-Deal-Offer/${filename}`
```

---

## Changes to [`src/components/products/iphone-15-pro-max/IPhoneBanner.tsx`](src/components/products/iphone-15-pro-max/IPhoneBanner.tsx)

### 1. Add imports

```tsx
import { useState, useEffect } from "react"; // add useEffect
```

### 2. Add slide images constant (before component)

```tsx
const BANNER_SLIDE_IMAGES = [
  "iphone-15-pro-max-issues-scaled.webp",
  "718qqVErHNL._AC_SL1500_.jpg",
  "Apple-iPhone-15-Pro-lineup-design-230912_big.jpg.large_2x.jpg",
  "718qqVErHNL._AC_SL1500_.jpg",
  "H6c195da845164cdaada13760b9748329C.avif",
];
```

### 3. Add state + effect inside component

```tsx
const [currentSlide, setCurrentSlide] = useState(0);

useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % BANNER_SLIDE_IMAGES.length);
  }, 4000); // 2s transition + 2s display = 4s interval
  return () => clearInterval(interval);
}, []);
```

### 4. Insert slideshow div between decorative and content layers

```tsx
{
  /* ── Image slideshow (z-index: 5) ── */
}
<div
  className="absolute top-0 right-0 h-full pointer-events-none"
  style={{ width: "50%", zIndex: 5 }}
>
  {BANNER_SLIDE_IMAGES.map((filename, i) => (
    <img
      key={filename + i}
      src={`/images/products/${IPHONE_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`}
      alt=""
      className="absolute inset-0 w-full h-full object-cover"
      style={{
        opacity: currentSlide === i ? 1 : 0,
        transition: "opacity 2s ease-in-out",
      }}
    />
  ))}
</div>;
```

Note: `IPHONE_FOLDER` is already imported from `@/lib/iphone-15-pro-max-data` on line 5.

---

## No Changes Needed

- [`src/app/page.tsx`](src/app/page.tsx) — already imports and renders `<IPhoneBanner />`
- No new dependencies
- No CSS changes (all inline styles or Tailwind existing classes)

---

## Visual Result

```
| ← left 50% → | ← right 50% (image slideshow) → |
|                                             |
|  [Badge]                                     |
|  iPhone 15 / Pro Max        [fading images]  |
|  512GB subtitle                                |
|  [256GB] [512GB] [1TB]       behind content  |
|  [BUY NOW →]                                  |
|                 [SVG iPhone]  [Price]          |
|                               [Stats]         |
|                               [★★★★★]        |
```

Images sit behind the text/stats/price on the right half, with a 2-second cross-fade cycling every 4 seconds.
