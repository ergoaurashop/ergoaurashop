# Fixes & Updates Plan

## Overview

Seven targeted fixes and enhancements across the application, based on user feedback.

---

## 1. HeroProductShowcase — Desktop Speed to 3 Seconds

**File:** [`src/components/products/HeroProductShowcase.tsx`](src/components/products/HeroProductShowcase.tsx)

**Current config (lines 14-18):**

```ts
const PRODUCTS_PER_SET = 4;
const PRODUCTS_TO_FETCH = 12;
const TRANSITION_DURATION = 0.35; // seconds
const GAP_MS = 1000; // 1-second visible gap
const CYCLE_MS = GAP_MS + TRANSITION_DURATION * 1000; // ~1350ms
```

**Issue:** Both desktop and mobile use the same `CYCLE_MS = 1350ms`. Need desktop at ~3000ms (3-second visible gap + 350ms transition = 3350ms total).

**Solution:**

- Add a `useMediaQuery`-style check or `useEffect` + `useState` to detect `lg` breakpoint (`1024px`)
- Define `DESKTOP_GAP_MS = 2650` so desktop total = 3000ms
- Derive `CYCLE_MS` dynamically based on viewport
- Alternatively: use CSS `@media` and separate interval logic

**Implementation:**

1. Remove the static `GAP_MS` / `CYCLE_MS` constants
2. Add state: `const [isDesktop, setIsDesktop] = useState(false);`
3. Add `useEffect` with resize listener checking `window.innerWidth >= 1024`
4. Compute `gapMs = isDesktop ? 2650 : 1000`
5. Compute `cycleMs = gapMs + TRANSITION_DURATION * 1000`
6. Reference `cycleMs` in the `setInterval` call (line ~106)

---

## 2. HeroProductShowcase — Static Container Height

**File:** [`src/components/products/HeroProductShowcase.tsx`](src/components/products/HeroProductShowcase.tsx)

**Issue:** The section height changes between product sets because cards have different content heights, causing page layout shifts (CLS).

**Solution:**

- Wrap the desktop product grid in a fixed-height container
- Use `overflow-hidden` and `min-h-[400px] md:min-h-[480px] lg:min-h-[420px]`
- The mobile single-card view already has `max-w-sm mx-auto` but the overall section padding also varies

**Implementation:**

- On the outer `<section>` element (line ~153), replace dynamic padding with fixed `py-12 sm:py-16` (consistent padding)
- Add `min-h-[500px] md:min-h-[560px]` on the section to prevent height shifts
- Remove `lg:py-20` to keep padding consistent
- The mobile product container already uses fixed layout; add `min-h-[380px]` to the mobile product wrapper div

---

## 3. "Premium Wellness Collection" Hero — Animated Gradient Background

**File:** [`src/app/page.tsx`](src/app/page.tsx), lines 66-102

**Issue:** Hero section has static `bg-[#1A1614]` dark background — needs light-coloured animated gradient background.

**Solution:**

- Replace `bg-[#1A1614]` with a light sand-to-gold gradient that animates using `background-size` + `background-position`
- Use an existing gradient keyframe (`gradient-shift` already defined in globals.css at line 350) or add a new `hero-gradient` keyframe

**Implementation:**

- Change the section's `className` from `bg-[#1A1614]` to:
  ```
  bg-gradient-to-br from-[#F5F1EB] via-[#FAF7F2] to-[#F0E8D8] animate-gradient-drift
  ```
  with `background-size: 200% 200%` (inline style)
- Update text colours: the "Premium Wellness Collection" label from `text-[#C9A962]` to `text-[#1A1614]` or keep gold on light bg
- Update `<h1>` text from `text-[#F5F1EB]` to `text-[#1A1614]`
- Update `<p>` from `text-[#D8CFBF]` to `text-[#6B6560]`
- Update Button `variant="ghost-light"` to `variant="ghost"` (since bg is now light)

**New CSS Animation** (add to globals.css):

```css
@keyframes hero-gradient-shift {
  0% {
    background-position: 0% 50%;
  }
  25% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 100% 100%;
  }
  75% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 0% 50%;
  }
}
.animate-hero-gradient {
  background-size: 300% 300%;
  animation: hero-gradient-shift 12s ease infinite;
}
```

---

## 4. Quick View Modal — Missing Product Images on Mobile

**File:** [`src/components/products/QuickViewModal.tsx`](src/components/products/QuickViewModal.tsx)

**Issue:** The Quick View modal's image section shows the fallback logo placeholder instead of actual product images on mobile.

**Root Cause Analysis:**
The image source logic (lines 47-52) is:

```ts
const images =
  product.images.length > 0
    ? product.images
    : getProductImages(product.slug).length > 0
      ? getProductImages(product.slug)
      : [getProductImageUrl(product.slug)];
```

If `product.images` is undefined (not just empty), this throws a TypeError and the component crashes silently. However, if `product.images` is an empty array, it falls through correctly.

The most likely issue is that the `<img>` tag at line 196 has no `onError` handler, so if the URL is correct but the image file doesn't load (e.g., incorrect path, 404), it just shows a broken image or nothing — not the logo fallback. The logo fallback (`/images/logo/ergoauralogo.webp`) ONLY shows if `images[0]` is `undefined`.

**Potential actual issue:** The `images` array being empty because `product.images` exists but is `[]`, AND `getProductImages(product.slug)` returns `[]` because the slug isn't in `SLUG_TO_IMAGES` mapping, AND `getProductImageUrl` returns `/images/products/${slug}/placeholder.jpg` which is a valid path that loads but shows nothing useful.

**Solution:**

1. Add null-safety to the image logic: `product.images?.length > 0`
2. Add `onError` handler on the `<img>` tag to fallback to the logo placeholder
3. Add `key` attribute to force re-render when product changes

**Implementation:**

```tsx
const [imgError, setImgError] = useState(false);

// In image logic:
const images = React.useMemo(() => {
  try {
    if (product.images?.length > 0) return product.images;
    const fallbackImages = getProductImages(product.slug);
    if (fallbackImages.length > 0) return fallbackImages;
    return [getProductImageUrl(product.slug)];
  } catch {
    return ["/images/logo/ergoauralogo.webp"];
  }
}, [product]);

// Reset error when product changes
useEffect(() => setImgError(false), [product.slug]);

// In JSX:
<img
  src={imgError ? "/images/logo/ergoauralogo.webp" : images[0]}
  alt={product.name}
  className="w-full h-full object-cover"
  onError={() => setImgError(true)}
/>;
```

---

## 5. Checkout Desktop — Product Images Missing in Order Summary

**File:** [`src/app/checkout/page.tsx`](src/app/checkout/page.tsx), lines 410-526

**Issue:** The product image in the Order Summary section doesn't display on desktop view.

**Root Cause Analysis:**
The image container uses legacy Apple theme classes:

- `rounded-apple-sm` — not defined in Desert Luxury CSS
- `bg-apple-bg` — not defined in Desert Luxury CSS

While these classes being undefined shouldn't prevent the image from rendering, the actual issue could be:

1. **Old theme CSS classes are completely missing** — if the container's `bg-apple-bg` doesn't resolve, there's no background color, but the `<img>` tag should still render
2. **Image URL path mismatch** — `getProductImageUrl()` might return a path that doesn't match the actual file structure
3. **Cart store data shape** — if the cart stores products differently than expected

The safest fix: Replace all legacy `apple-*` classes with Desert Luxury equivalents AND ensure image paths resolve correctly.

**Solution:**
Replace old Apple theme classes throughout the Order Summary section:
| Old Class | New Class |
|-----------|-----------|
| `rounded-apple-sm` | `rounded-lg` |
| `bg-apple-bg` | `bg-[#F5F1EB]` |
| `text-apple-text-primary` | `text-[#1A1614]` |
| `text-apple-text-secondary` | `text-[#6B6560]` or `text-[#86868B]` |
| `border-apple-border/50` | `border-[#EAE3D5]/50` |
| `rounded-apple` | `rounded-lg` or `rounded-xl` |
| `text-apple-accent` | `text-[#C9A962]` |
| `bg-green-50` | Already Tailwind — keep |
| `rounded-apple-sm` | `rounded-lg` |

Also add an `onError` handler to the `<img>` tag to fallback if the image URL fails.

---

## 6. Checkout Mobile — Free Shipping + Desktop Alignment

**File:** [`src/app/checkout/page.tsx`](src/app/checkout/page.tsx)

**Issue 6a — Shipping should be free everywhere:**
Line 87: `const shipping = discountedSubtotal >= 299 ? 0 : 49;`
Change to: `const shipping = 0;`

Also remove the ₹49 conditional display (lines 482-486) — always show "Free".

**Issue 6b — Mobile order summary alignment with desktop:**
The checkout page currently uses:

- `lg:col-span-3` for form
- `lg:col-span-2` for summary
- Both inside a `grid-cols-1 lg:grid-cols-5` grid

On mobile, these stack naturally (single column). However, the user wants the mobile order summary to look exactly like desktop. This means:

- Same card styling with bordered sections
- Same typography classes
- Same spacing and layout

Since both views already share the same JSX structure (responsive via Tailwind breakpoints), the main difference is the CSS classes. Replacing the old Apple classes (as described in issue #5) will automatically fix mobile alignment too.

**Additional changes:**

- Update `total` calculation: `const total = discountedSubtotal + shipping;` — shipping is now 0, so total = discountedSubtotal
- The "Shipping" line should always show "Free" (green badge)
- Ensure the "You Save" section still shows correctly

---

## 7. Header — Instagram and Facebook Social Icons

**File:** [`src/components/layout/Header.tsx`](src/components/layout/Header.tsx)

**Social links** (already defined in [`src/lib/constants.ts`](src/lib/constants.ts), lines 33-36):

```ts
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/shopergoaura/",
  facebook: "https://www.facebook.com/profile.php?id=61590640415430",
};
```

**Placement options:**

1. **Desktop nav area** — After the "Sign In" link in the `<nav>` element (after line 118), add social icons as a decorative separator
2. **Right side** — Between cart and hamburger menu (lines 122-175), add social icon links
3. **Mobile nav** — Below the nav links in the mobile menu

**Recommended placement:**

- **Desktop:** In the nav area, after "Sign In", as a vertical separator `|` followed by Instagram and Facebook icons
- **Mobile:** Below all nav links in the mobile dropdown, with a separator line

**Implementation — Desktop:**
After the "Sign In" `<Link>` (line 118), before the closing `</nav>` (line 119):

```tsx
<span className={cn(
  "w-px h-5",
  scrolled ? "bg-[#C9A962]/30" : "bg-[#1A1614]/20"
)} />
<a
  href={SOCIAL_LINKS.instagram}
  target="_blank"
  rel="noopener noreferrer"
  className={cn(
    "transition-colors",
    scrolled ? "text-[#C9A962] hover:text-[#DFC48A]" : "text-[#1A1614] hover:text-[#1A1614]/70"
  )}
  aria-label="Instagram"
>
  {/* Instagram SVG icon */}
</a>
<a
  href={SOCIAL_LINKS.facebook}
  target="_blank"
  rel="noopener noreferrer"
  className={cn(
    "transition-colors",
    scrolled ? "text-[#C9A962] hover:text-[#DFC48A]" : "text-[#1A1614] hover:text-[#1A1614]/70"
  )}
  aria-label="Facebook"
>
  {/* Facebook SVG icon */}
</a>
```

**Implementation — Mobile:**
After the "Sign In" link (line 217), before closing `</div>`:

```tsx
<div className="border-t border-[#C9A962]/20 pt-4 mt-4 flex items-center gap-4">
  <a
    href={SOCIAL_LINKS.instagram}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#C9A962] hover:text-[#DFC48A] transition-colors"
    aria-label="Instagram"
  >
    {/* Instagram SVG */}
  </a>
  <a
    href={SOCIAL_LINKS.facebook}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[#C9A962] hover:text-[#DFC48A] transition-colors"
    aria-label="Facebook"
  >
    {/* Facebook SVG */}
  </a>
</div>
```

**SVG Icons:**
Use simple, clean 20x20 SVG icons that match the Desert Luxury aesthetic.

Instagram icon (simple camera outline):

```svg
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
  <rect x="2" y="2" width="20" height="20" rx="5" />
  <circle cx="12" cy="12" r="5" />
  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
</svg>
```

Facebook icon (simple 'f' circle):

```svg
<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
  <circle cx="12" cy="12" r="10" />
  <path d="M16 8h-2a3 3 0 0 0-3 3v11" stroke="currentColor" />
  <path d="M9 14h6" stroke="currentColor" />
</svg>
```

---

## Execution Order

Each item is independent and can be implemented in any order. Recommended sequence:

1. **HeroProductShowcase** (items 1+2) — both in same file
2. **Hero section animated bg** (item 3) — page.tsx + globals.css
3. **QuickViewModal image fix** (item 4) — isolated component fix
4. **Checkout page** (items 5+6) — both in checkout/page.tsx
5. **Header social icons** (item 7) — Header.tsx

## Files Modified

| File                                              | Changes                             |
| ------------------------------------------------- | ----------------------------------- |
| `src/components/products/HeroProductShowcase.tsx` | Desktop speed, static height        |
| `src/app/globals.css`                             | New `hero-gradient-shift` keyframe  |
| `src/app/page.tsx`                                | Hero section bg, text colours       |
| `src/components/products/QuickViewModal.tsx`      | Image error handling                |
| `src/app/checkout/page.tsx`                       | Apple→Desert classes, free shipping |
| `src/components/layout/Header.tsx`                | Social icons in nav + mobile menu   |
