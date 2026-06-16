# iPhone 15 Pro Max 512GB Product Page — Visual & Content Updates

## Overview

Update the `/products/iphone-15-pro-max-512gb` page with 4 groups of changes. All changes are scoped to the iPhone 15 Pro Max components and CSS only — no global styles or other product pages affected.

## Files to Modify

| #   | File                                                             | Purpose                                                   |
| --- | ---------------------------------------------------------------- | --------------------------------------------------------- |
| 1   | `src/components/products/iphone-15-pro-max/IPhoneHero.tsx`       | Replace video with image slideshow                        |
| 2   | `src/components/products/iphone-15-pro-max/IPhonePricing.tsx`    | Colour swatches redesign + timer color/fix                |
| 3   | `src/components/products/iphone-15-pro-max/IPhoneReviews.tsx`    | Heading color to light green                              |
| 4   | `src/components/products/iphone-15-pro-max/IPhoneDealBanner.tsx` | Update "15 Units Left" text                               |
| 5   | `src/lib/iphone-15-pro-max-data.ts`                              | Change `stock: 15` to `stock: 9`, update story & FAQ text |
| 6   | `src/styles/iphone-15-pro-max.css`                               | All CSS additions/changes                                 |

---

## Task 1: Replace Hero Banner Video with Image Slideshow

### Component: [`IPhoneHero.tsx`](src/components/products/iphone-15-pro-max/IPhoneHero.tsx)

**Current behavior:** Shows a `<video>` element with autoplay/muted/loop as the hero background. Falls back to a single poster image if video fails.

**New behavior:** Remove the `<video>` element entirely. Replace with an auto-cycling image slideshow using these 5 unique images (deduplicated from the user's list):

1. `iphone-15-pro-max-issues-scaled.webp`
2. `Apple-iPhone-15-Pro-lineup-camera-system-230912_big.jpg.large_2x.jpg`
3. `Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.xlarge_2x.jpg`
4. `81YSmKnlijL._AC_SL1500_.jpg`
5. `718qqVErHNL._AC_SL1500_.jpg`

**Technical approach:**

- Add a new constant `IPHONE_HERO_SLIDESHOW_IMAGES` in `iphone-15-pro-max-data.ts` (or define inline in the component) with the 5 image filenames.
- In `IPhoneHero.tsx`, replace the video block with a state-managed image slideshow:
  - `useState` for `currentImageIndex`
  - `useEffect` with `setInterval` (e.g., 5 seconds per image) to cycle through
  - Use `<Image>` from Next.js with `fill` and `objectFit: "cover"`
  - Use `framer-motion` `AnimatePresence` for fade transitions between images
- Remove the `videoRef` and `videoError` state (no longer needed)
- Keep all other content (overlay, badge, title, prices, CTA, seal) unchanged

### CSS: [`iphone-15-pro-max.css`](src/styles/iphone-15-pro-max.css)

- Add `.iphone-hero-slideshow` class for the absolute-positioned image container
- Ensure images have `object-fit: cover` and fill the 100vh hero area
- Keep existing `.iphone-hero-overlay` and `.iphone-hero-content` as-is

---

## Task 2: Customer Reviews — Heading Color to Light Green

### Component: [`IPhoneReviews.tsx`](src/components/products/iphone-15-pro-max/IPhoneReviews.tsx)

**Current:** Line 454 — `<h2 className="iphone-section-title" style={{ color: "#1d1d1f" }}>`

**Change:**

- Remove the inline `style` prop
- Add a new CSS class or modify `.iphone-reviews-section .iphone-section-title`

### CSS: [`iphone-15-pro-max.css`](src/styles/iphone-15-pro-max.css)

**Current context:** The reviews section has a white background (`#ffffff`). The heading needs a light green that passes WCAG AA contrast ratio on white.

**Calculation:** For `#ffffff` background, minimum contrast ratio 4.5:1 for normal text.

- Target green: `#2E7D32` (dark green) → contrast 5.6:1 on white ✅ WCAG AA
- Or a lighter green: `#388E3C` → contrast 4.8:1 on white ✅ WCAG AA
- Or `#4CAF50` → contrast 3.4:1 ❌ fails AA

**Recommended:** Use `#2E7D32` (Material Design Dark Green) which provides 5.6:1 contrast on white — good readability while being visibly green.

Add CSS:

```css
.iphone-reviews-section .iphone-section-title {
  color: #2e7d32;
}
```

---

## Task 3: Limited Time Offer — Colour Swatches Redesign

### Component: [`IPhonePricing.tsx`](src/components/products/iphone-15-pro-max/IPhonePricing.tsx)

**Current colour options from data:**

- Natural Titanium — `#878684` (grey)
- Blue Titanium — `#2F3640` (dark navy)
- White Titanium — `#F2F1ED` (off-white)

**Changes needed:**

1. The colour options section needs a "beautiful and minimal" redesign
2. Each colour circle should be filled with its respective colour
3. Labels should be clean and minimal

The current code already has colour circles with `backgroundColor` — the issue is styling quality. We need to enhance the CSS to make it more polished.

### CSS additions:

1. Improve `.iphone-colour-selector` layout (already `display: flex; justify-content: center; gap: 1rem`)
2. The selector is currently scoped under `.iphone-colour-selector` which is used as a class. But looking at the JSX, the component uses:
   - `className="iphone-colour-selector"` — outer div
   - `className="iphone-colour-options"` — inner div wrapping buttons
   - `className="iphone-colour-swatch"` — button for each colour
   - `className="iphone-colour-circle"` — the coloured circle span
   - `className="iphone-colour-name"` — the text label

Wait, let me re-check the JSX in IPhonePricing.tsx:

```tsx
<div className="iphone-colour-selector mb-8">
  <p className="iphone-colour-label">Choose your colour:</p>
  <div className="iphone-colour-options">
    {IPHONE_COLOUR_OPTIONS.map((colour, i) => (
      <button
        key={colour.name}
        onClick={() => setSelectedColour(selectedColour === i ? null : i)}
        className={`iphone-colour-swatch ${selectedColour === i ? "active" : ""}`}
        aria-label={`Select ${colour.name}`}
        title={colour.name}
      >
        <span
          className="iphone-colour-circle"
          style={{ backgroundColor: colour.hex }}
        />
        <span className="iphone-colour-name">{colour.name}</span>
      </button>
    ))}
  </div>
</div>
```

So the CSS classes used are: `.iphone-colour-selector`, `.iphone-colour-label`, `.iphone-colour-options`, `.iphone-colour-swatch`, `.iphone-colour-circle`, `.iphone-colour-name`.

But the existing CSS defines different class names! The CSS has:

- `.iphone-colour-selector` (line 1790)
- `.iphone-colour-option` (line 1797) — but component uses `.iphone-colour-swatch`!
- `.iphone-colour-swatch` (line 1810)
- `.iphone-colour-name` (line 1832)

So there's a mismatch: the CSS defines `.iphone-colour-option` but the component uses `.iphone-colour-swatch` for the button.

Since the existing CSS might not be fully applied due to class name mismatch, we need to either:
a) Update the CSS to match the component's actual class names, OR
b) Update the component to match the CSS class names

Since the user said "do not change anything other", I'll update the CSS to match what the component actually uses.

**CSS changes:**
Add/update:

- `.iphone-colour-selector` - container, already exists but update styling
- `.iphone-colour-label` - the "Choose your colour:" text
- `.iphone-colour-options` - flex container for swatches
- `.iphone-colour-swatch` (already exists but needs enhancement) - button wrapper
- `.iphone-colour-circle` - the colored circle
- `.iphone-colour-name` - text label

---

## Task 4: Countdown Timer — Color & Alignment

### Component: [`IPhonePricing.tsx`](src/components/products/iphone-15-pro-max/IPhonePricing.tsx)

No component changes needed — the timer structure is already good. All changes are CSS-only.

### CSS: [`iphone-15-pro-max.css`](src/styles/iphone-15-pro-max.css)

**Current timer styling issues:**

- `.iphone-timer-digit` (line 1670) has `display: flex; flex-direction: column; align-items: center;` — but the actual digit div doesn't have visible background/border styling
- The `.iphone-timer-number` class (line 1676) has proper styling but isn't being used by the component
- The timer digits on the dark blue/black pricing background need better contrast

**Changes:**

1. Add visible styling to `.iphone-timer-digit` to give it a distinct visual container:
   - Background with good contrast on the dark pricing section background
   - High-contrast text color
   - Border, border-radius, padding

2. The `.iphone-timer-label` already has `color: var(--iphone-text-tertiary)` (#86868b) — this is fine on dark backgrounds.

3. For "single-line format" — the timer is already displayed in one horizontal row. We need to make it more visually cohesive by potentially adjusting the layout of TimerDigit to place label beside the number or making the overall design more compact and eye-catching.

4. For the separator (`iphone-timer-separator`) — add styling to make it prominent.

5. For the timer header "Offer ends in:" — ensure the clock icon and text have good visual hierarchy.

**Recommended colors for contrast on the dark pricing background (#000000 to #0d2440):**

- Timer digit background: `#ffffff` with text `#1d1d1f` (dark text on white = 15.3:1 ✅)
- Or timer digit background: `rgba(255,255,255,0.12)` with text `#ffffff` (21:1 ✅)
- Or use the accent blue: background `#0066cc` with white text (5.3:1 ✅)
- Best option for eye-catching: White background (`#ffffff`) with dark text (`#1d1d1f`) and a blue accent border/glow

---

## Task 5: Change "15" Units to "9" Units (Entire Page)

### Data file: [`src/lib/iphone-15-pro-max-data.ts`](src/lib/iphone-15-pro-max-data.ts)

Change these values:

1. **Line 60:** `stock: 15` → `stock: 9`

2. **Line 462 (FAQ):**
   - Current: `"Our limited stock of 15 units reflects genuine clearance pricing..."`
   - New: `"Our limited stock of 9 units reflects genuine clearance pricing..."`

3. **Line 581 (Story):**
   - Current: `"Our stock is limited to just 15 units at this price."`
   - New: `"Our stock is limited to just 9 units at this price."`

4. **Line 583 (Story):**
   - Current: `"Our stock is limited to just 15 units at this price. As a premium flagship nearing the end of its production cycle, availability is dwindling."`
   - Wait, let me re-check. The story paragraphs array has at line 581: `"Our stock is limited to just 15 units at this price. As a premium flagship nearing the end of its production cycle, availability is dwindling. If you've been waiting for the right moment to experience Apple's finest engineering without the flagship price tag — this is it."`
   - Change `15 units` to `9 units`

### Component: [`IPhoneDealBanner.tsx`](src/components/products/iphone-15-pro-max/IPhoneDealBanner.tsx)

**Line 33:** `<span>Only 15 Units Left</span>` → `<span>Only 9 Units Left</span>`

Note: The `IPHONE_PRODUCT.stock` value is already used dynamically in:

- `IPhoneHero.tsx` line 89: `{IPHONE_PRODUCT.stock}` — will auto-update when data changes
- `IPhonePricing.tsx` line 125: `Only {IPHONE_PRODUCT.stock} units remaining` — will auto-update
- `IPhonePricing.tsx` line 250: `{IPHONE_PRODUCT.stock}` — will auto-update

So changing `stock: 15` to `stock: 9` in the data file will automatically update these dynamic references.

---

## Summary of All Changes

| Change                                  | Files                                                                  | Type                   |
| --------------------------------------- | ---------------------------------------------------------------------- | ---------------------- |
| Replace hero video with image slideshow | `IPhoneHero.tsx`, `iphone-15-pro-max.css`, `iphone-15-pro-max-data.ts` | Component + CSS + Data |
| Reviews heading → light green           | `IPhoneReviews.tsx`, `iphone-15-pro-max.css`                           | Component + CSS        |
| Colour swatches redesign                | `iphone-15-pro-max.css`                                                | CSS only               |
| Timer contrast + alignment              | `iphone-15-pro-max.css`                                                | CSS only               |
| Units 15→9                              | `iphone-15-pro-max-data.ts`, `IPhoneDealBanner.tsx`                    | Data + Component       |
