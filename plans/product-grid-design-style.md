# Product Grid Design System — Wasleen Pergolas

> A **responsive product grid** with rich card interactions, layered badge system, image hover effects, and Quick View modal — built with Next.js, React, and Tailwind CSS v4.

---

## Table of Contents

1. [Grid Layout](#1-grid-layout)
2. [Product Card Anatomy](#2-product-card-anatomy)
3. [Image Behaviour](#3-image-behaviour)
4. [Badge System](#4-badge-system)
5. [Quick View Modal](#5-quick-view-modal)
6. [Prices & Discounts](#6-prices--discounts)
7. [Loading States (Skeleton)](#7-loading-states-skeleton)
8. [Empty State](#8-empty-state)
9. [Load More Pagination](#9-load-more-pagination)
10. [Collection Page Layout](#10-collection-page-layout)
11. [Homepage Carousel Variation](#11-homepage-carousel-variation)
12. [Design Tokens](#12-design-tokens)
13. [Implementation Files](#13-implementation-files)

---

## 1. Grid Layout

The primary product grid uses a **responsive CSS Grid** with four breakpoints:

| Breakpoint             | Columns       | CSS              | Container Width           |
| ---------------------- | ------------- | ---------------- | ------------------------- |
| Mobile (<640px)        | **1** column  | `grid-cols-1`    | Full width (24px padding) |
| Tablet Small (≥640px)  | **2** columns | `sm:grid-cols-2` | Full width                |
| Desktop (≥1024px)      | **3** columns | `lg:grid-cols-3` | 1280px max                |
| Wide Desktop (≥1280px) | **4** columns | `xl:grid-cols-4` | 1280px max                |

**Grid container styles:**

```css
grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5
```

- **Gap**: `20px` (`gap-5`) between all cards
- **Transition**: `300ms` opacity fade during filter loading — grid becomes `opacity-40 pointer-events-none`
- **`aria-busy`** / **`aria-live="polite"`**: Accessibility support during loading

---

## 2. Product Card Anatomy

Each card is a semantic `<article>` element with a **white background**, **rounded corners** (`16px`), and **hover lift** effect.

```
┌──────────────────────────────────────────────────┐
│  ╔═══ Top-Left Badges ╗    ╔═══ Top-Right Badges ╗ │
│  ║ [DED Licensed 🏛️] ║    ║ [Wasleen's Choice ⭐]║ │
│  ║ [Made in UAE 🇦🇪]  ║    ║ [Super Deal 🔥]    ║ │
│  ╚════════════════════╝    ╚══════════════════════╝ │
│                                                    │
│       ┌──────────────────────────────────┐          │
│       │     Product Image (4:3)          │          │
│       │                                  │          │
│       │      ╔═══ Bottom-Left ╗          │          │
│       │      ║   -35% OFF     ║          │          │
│       │      ╚════════════════╝          │          │
│       ├── Quick View (slide-up on hover)──┤          │
│       └──────────────────────────────────┘          │
│                                                    │
│  ┌────────────────────────────────────────────────┐ │
│  │  Product Title (2-line clamp, gold on hover)   │ │
│  │  ★★★★☆  (12 reviews)                          │ │
│  │  AED 4,500   ← AED 6,900                       │ │
│  │                                                │ │
│  │  [🔧 Free Install] [🛡️ 5-Year] [☀️ Dubai Climate]│ │
│  └────────────────────────────────────────────────┘ │
│                                                    │
│  ┌── Mobile: ── [👁️ Quick View] ────────────────┐ │
│  └──────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────┘
```

### 2.1 Card Container

```css
.group relative flex flex-col rounded-2xl overflow-hidden bg-white
shadow-base hover:shadow-xl
transition-all duration-300 ease-out
hover:-translate-y-1
```

| Property         | Value                                                                               |
| ---------------- | ----------------------------------------------------------------------------------- |
| Border radius    | `rounded-2xl` (16px)                                                                |
| Background       | `bg-white`                                                                          |
| Shadow (rest)    | `shadow-base` — `0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)`     |
| Shadow (hover)   | `shadow-xl` — `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` |
| Hover lift       | `-translate-y-1` (4px upward)                                                       |
| Hover transition | `300ms` ease-out                                                                    |
| Out of stock     | `opacity-80`                                                                        |

### 2.2 Image Section

```
aspect-[4/3] overflow-hidden bg-sand
```

- Fixed **4:3 aspect ratio**
- Background colour: Sand (`#F5F1EB`) as fallback while images load

### 2.3 Content Section

```css
flex flex-col flex-1 p-4 gap-2.5
```

- Padding: `16px` all sides
- Gap between content items: `10px`

### 2.4 Title

```css
type-body-lg font-semibold leading-snug line-clamp-2
text-primary group-hover:text-gold transition-colors duration-200
```

- Font: Inter (body), `1.125rem`, semibold
- **Clamped to 2 lines** (`line-clamp-2`)
- Colour: Primary (`#1A1614`) → **Gold** (`#C9A962`) on card hover

### 2.5 Star Rating (Judge.me)

Appears only when `rating.count > 0` and is passed in. Renders filled gold stars + review count text.

### 2.6 Mobile Quick View Button

```css
w-full py-2.5 rounded-full text-sm font-medium
border border-neutral-200 text-neutral-600
hover:border-gold hover:text-gold
```

- Visible only on mobile/touch devices (`md:hidden`)
- Rounded pill shape with subtle border
- Turns gold on hover

### 2.7 Out of Stock Overlay

```css
absolute inset-0 bg-primary/60 flex items-center justify-center z-10
```

- Semi-transparent dark overlay (`#1A1614` at 60%)
- Centered pill badge: `bg-primary/90 text-sand text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full`
- Text: **"Out of Stock"**

---

## 3. Image Behaviour

The [`ProductImage`](src/components/product/ProductImage.tsx) component handles all product imagery.

### 3.1 Image Stacking

- Up to **5 images** are stacked with CSS opacity transitions
- Uses `next/image` with `fill` + `object-cover`
- Each image layer fades in/out with `transition-opacity duration-500 ease-in-out`

### 3.2 Image Preview on Hover

| Device      | Behaviour                                                                     |
| ----------- | ----------------------------------------------------------------------------- |
| **Desktop** | Hover over the card → crossfades from image 1 → image 2 (500ms)               |
| **Mobile**  | No hover action; instead, auto-rotates through all images every **3 seconds** |

### 3.3 Mobile Image Dots Indicator

```
absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 md:hidden
```

- Hidden on desktop (`md:hidden`)
- Shows small dot indicators at bottom of image
- Active dot: `bg-white` (solid white)
- Inactive dots: `bg-white/40` (40% opacity white)
- 5 dots maximum

### 3.4 Priority Loading

```jsx
priority={priority && index === 0}
```

- First **4 cards** on a page (above-the-fold) get `priority` loading
- Only the **first image slot** gets priority; subsequent images use `loading="lazy"`

### 3.5 Sizes Attribute

```css
(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw
```

### 3.6 Placeholder (No Image)

When no images exist, renders a centred SVG camera icon on `bg-sand-dark` background.

---

## 4. Badge System

The badge system supports **7 distinct badge types** across **3 card positions** and **3 sizes**.

### 4.1 Badge Types & Styles

| Badge Type              | Icon | Background                               | Text Colour                    | Position on Card |
| ----------------------- | ---- | ---------------------------------------- | ------------------------------ | ---------------- |
| `ded_licensed`          | 🏛️   | Gold gradient (`--gradient-gold`)        | Primary (`#1A1614`)            | Top-left         |
| `made_in_uae`           | 🇦🇪   | Emerald (`#059669`)                      | White                          | Top-left         |
| `wasleen_choice`        | ⭐   | Black (`#000`)                           | Gold (`#C9A962`) + gold border | Top-right        |
| `super_deal`            | 🔥   | Red gradient (`from-red-600 to-red-500`) | White                          | Top-right        |
| `discount`              | —    | Red (`bg-error` / `#EF4444`)             | White                          | Bottom-left      |
| `installation_included` | 🔧   | Amber (`#D97706`)                        | White                          | Below title      |
| `warranty_5year`        | 🛡️   | Blue (`#1E40AF`)                         | White                          | Below title      |
| `dubai_climate`         | ☀️   | Sand (`#E4C89E`)                         | Primary (`#1A1614`)            | Below title      |

### 4.2 Badge Sizes

| Size | Padding       | Font Size          | Border Radius      |
| ---- | ------------- | ------------------ | ------------------ |
| `sm` | `px-2 py-1`   | `text-xs` (12px)   | `rounded-sm` (2px) |
| `md` | `px-3 py-1.5` | `text-sm` (14px)   | `rounded-md` (6px) |
| `lg` | `px-4 py-2`   | `text-base` (16px) | `rounded-lg` (8px) |

### 4.3 Badge Hover Effect

All badges have:

```css
transition-transform duration-200 hover:-translate-y-[2px] hover:shadow-md
```

### 4.4 Discount Badge (Special)

- Calculated from `compareAtPriceRange` vs `priceRange`
- Only shows when discount > 0%
- Display: `-{pct}%` with `tabular-nums` for consistent digit widths
- Positioned bottom-left over the image

### 4.5 Super Deal Animation

```css
animate-pulse
```

The "Super Deal" badge has a continuous pulse animation to draw attention.

---

## 5. Quick View Modal

### 5.1 Desktop Trigger

```
absolute inset-x-0 bottom-0 z-20
hidden md:flex items-center justify-center gap-2
py-3 bg-primary/80 backdrop-blur-sm text-white text-sm font-medium
translate-y-full group-hover:translate-y-0
opacity-0 group-hover:opacity-100
```

- **Slides up** from the bottom of the image on card hover
- Semi-transparent dark background with `backdrop-blur-sm`
- Eye icon + "Quick View" label
- Hidden on mobile

### 5.2 Modal Structure

| Aspect          | Mobile                                      | Desktop                                           |
| --------------- | ------------------------------------------- | ------------------------------------------------- |
| **Position**    | Bottom sheet (`h-[95dvh]`, `rounded-t-3xl`) | Centered panel (`max-w-[800px]`, `max-h-[90dvh]`) |
| **Animation**   | Slides up + fades                           | Scales in + fades                                 |
| **Layout**      | Stacked (image top, info bottom)            | Two-column (45% image / 55% info)                 |
| **CTAs**        | Sticky at bottom of sheet                   | Inline within scrollable content                  |
| **Drag handle** | Visible at top                              | Hidden                                            |

### 5.3 Modal Content (Right Column)

1. **Trust badge strip** (top badges inline)
2. **Product title** (`type-h3`) + vendor name
3. **Star rating** (if available)
4. **Price** with compare-at strikethrough
5. **Short description** (clamped to 3 lines)
6. **Key features** (bulleted list from metafields)
7. **Out of stock notice** (if unavailable)
8. **CTA buttons**: "Add to Cart" (primary) + "Full Details" (ghost link)

### 5.4 Modal Features

- **Focus trap**: Tab/Shift+Tab cycles within modal elements
- **ESC key**: Closes modal
- **Body scroll lock**: Prevents background scrolling
- **Return focus**: Restores focus to trigger element on close
- **Backdrop**: Semi-transparent dark overlay with `backdrop-blur-sm`
- **Add to Cart animation**: Shows a "Item added to cart" toast notification at top of viewport (auto-dismisses after 2.5s)

---

## 6. Prices & Discounts

### 6.1 Price Display

```jsx
<ProductPrice priceRange={...} compareAtPriceRange={...} size="sm" />
```

| Size                | Price Class           | Compare-at Class |
| ------------------- | --------------------- | ---------------- |
| `sm` (card)         | `text-base font-bold` | `text-sm`        |
| `md` (modal)        | `text-xl font-bold`   | `text-base`      |
| `lg` (product page) | `text-2xl font-bold`  | `text-lg`        |

### 6.2 Visual States

| State                   | Price Colour          | Compare-at Price                         |
| ----------------------- | --------------------- | ---------------------------------------- |
| Regular price           | Primary (`#1A1614`)   | Hidden (not rendered)                    |
| On sale                 | Error red (`#EF4444`) | Shown with `line-through` in neutral-400 |
| Price range (min ≠ max) | Primary               | Shown as "AED 4,500 – AED 6,900"         |

### 6.3 Discount Badge

Calculated from `compareAtPrice` and `price`:

```typescript
const discountPct = Math.round(
  ((compareAtAmount - priceAmount) / compareAtAmount) * 100,
);
```

Rendered as `-35%` in a red pill badge at the **bottom-left** of the image.

---

## 7. Loading States (Skeleton)

### 7.1 Filter Transition Loading

When filters change (URL updates), 8 skeleton cards replace the product cards:

```jsx
Array.from({ length: 8 }).map((_, i) => (
  <ProductCardSkeleton key={`sk-${i}`} />
));
```

### 7.2 Skeleton Card Structure

```
┌──────────────────────────────────┐
│  ┌──────────────────────────┐    │
│  │   Skeleton rect (4:3)    │    │
│  └──────────────────────────┘    │
│  ┌──────────────────────────┐    │
│  │  Skeleton text (75% w)   │    │
│  │  Skeleton text (50% w)   │    │
│  │  Skeleton text (33% w)   │    │
│  │  ┌──────┐ ┌──────────┐   │    │
│  │  │pill  │ │pill      │   │    │
│  │  └──────┘ └──────────┘   │    │
│  └──────────────────────────┘    │
└──────────────────────────────────┘
```

```css
/* Shimmer animation */
@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
```

Skeleton uses a **shimmer gradient**:

```css
background: linear-gradient(90deg, #e4e4e7 25%, #f4f4f5 50%, #e4e4e7 75%);
background-size: 200% 100%;
animation: shimmer 1.8s linear infinite;
```

### 7.3 Load More Loading

When "Load More" is clicked:

- Button shows a spinning `Loader2` icon + "Loading…" text
- Button becomes `opacity-70 pointer-events-none`
- Existing cards remain visible (no skeleton replacement)

---

## 8. Empty State

When no products match filters:

```
┌────────────────────────────────────────┐
│                                        │
│            📦  (Package icon)          │
│                                        │
│       No products found                │
│   No products match your current       │
│   filters.                             │
│                                        │
│   ┌──────────────────────────┐         │
│   │   Clear all filters      │         │
│   └──────────────────────────┘         │
│                                        │
└────────────────────────────────────────┘
```

- Icon: `Package` from lucide-react (48px, `text-neutral-300`)
- Title: `type-h4` in primary colour
- Description: `text-sm text-neutral-500`
- CTA: "Clear all filters" button (`btn btn-secondary`) — only shown if `onClearFilters` callback is provided
- Centered in grid: `col-span-full flex flex-col items-center justify-center py-24`

---

## 9. Load More Pagination

### 9.1 Structure

```
         Showing {count} products

   ┌─────────────────────────────┐
   │        Load More            │
   └─────────────────────────────┘

   You've seen all products        ← (only when no more pages and >12 items)
```

### 9.2 Load More Button

```css
btn btn-secondary min-w-[180px]
```

- Gold outline pill (`btn-secondary`)
- Minimum width: 180px
- Shows spinner + "Loading…" when `isLoadingMore` is true
- Disabled state: `opacity-70 pointer-events-none`

### 9.3 End of Results

Shown when `!hasMore && products.length > 12`:

```
text-xs text-neutral-400
"You've seen all products"
```

---

## 10. Collection Page Layout

### 10.1 Desktop Layout (>1024px)

```
┌──────────────────────────────────────────────────┐
│            Collection Header (hero)               │
│     Title | Description | Optional Cover Image   │
├──────────────┬───────────────────────────────────┤
│              │  "12 products"        [Sort ▼]    │
│   Filter     │                                   │
│   Sidebar    │   Product Grid (3-4 cols)         │
│   (220px)    │                                   │
│              │        [Load More]                 │
└──────────────┴───────────────────────────────────┘
```

Grid layout: `grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-12`

### 10.2 Mobile Layout (<1024px)

```
┌──────────────────────────────────────────────┐
│         Collection Header (hero)               │
├──────────────────────────────────────────────┤
│ [Filters]                     [Sort ▼]         │
│                                               │
│  [Active: Price] [Active: Material] [Clear ×] │
│                                               │
│  Product Grid (1-2 cols)                      │
│                                               │
│      [Load More]                              │
└──────────────────────────────────────────────┘
```

### 10.3 Filter Sidebar (Desktop)

- Fixed width: 220px
- Sticks to top on scroll
- Contains:
  - Price range filter
  - Feature toggles (checkbox style)
  - Material selection
  - "Clear All" button

### 10.4 Filter Drawer (Mobile)

- Opens as a **bottom sheet** (`FilterDrawer` component)
- Triggered by tapping "Filters" button
- Same filter options as desktop sidebar

### 10.5 Active Filters

Displays selected filters as removable **chips/pills**:

```css
inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm
bg-sand text-primary border border-sand-darker
```

Each chip has an "×" close button to remove that specific filter.

### 10.6 Sort Dropdown

```css
btn btn-ghost rounded-xl px-4 py-2 text-sm font-medium
```

- Options determined by Shopify collection sort keys
- Default sort key configurable
- Updates URL search params on change

---

## 11. Homepage Carousel Variation

The homepage "Featured Products" section uses a **horizontal scroll-snap carousel** instead of a static grid.

### 11.1 Track

```css
flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory
scrollbar-width: none;  /* Firefox */
msOverflowStyle: none;  /* IE/Edge */
```

### 11.2 Card Sizing

```css
flex-none w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] snap-start
```

| Breakpoint | Visible Cards |
| ---------- | ------------- |
| Mobile     | 1 card        |
| ≥640px     | 2 cards       |
| ≥1024px    | 4 cards       |

### 11.3 Navigation

- **Prev/Next buttons**: Circular white buttons with shadow, positioned at edges, turn gold on hover
- **Dot indicators**: Pill-shaped active dot (gold, 24px wide), circular inactive dots (grey, 8px)
- **Auto-play**: Advances every 5 seconds, pauses on hover
- **Looping**: Reaches end → smooth scrolls back to start

---

## 12. Design Tokens

### 12.1 Brand Colours

```css
--color-primary: #1a1614; /* Dark brown/charcoal */
--color-primary-light: #2e2825;
--color-primary-dark: #0d0b0a;

--color-gold: #c9a962; /* Main gold accent */
--color-gold-light: #dfc48a;
--color-gold-dark: #a88a42;
--color-gold-muted: #c9a96233; /* 20% opacity */

--color-sand: #f5f1eb; /* Warm off-white / page bg */
--color-sand-dark: #eae3d5;
--color-sand-darker: #d8cfbf;

--color-white: #ffffff;
--color-off-white: #fdfbf8;
```

### 12.2 Semantic Surfaces

```css
--bg-page: var(--color-sand); /* Page background */
--bg-elevated: var(--color-white); /* Card backgrounds */
--bg-sunken: var(--color-sand-dark); /* Footer / low-level sections */
--bg-inverse: var(--color-primary); /* Dark sections */
```

### 12.3 Typography

| Class                 | Font             | Size                           | Weight | Usage                   |
| --------------------- | ---------------- | ------------------------------ | ------ | ----------------------- |
| `.type-body-lg`       | Inter            | 1.125rem                       | 400    | Product titles on cards |
| `.type-h1`            | Playfair Display | clamp(1.875rem, 3vw, 2.5rem)   | 700    | Page headings           |
| `.type-h2`            | Playfair Display | clamp(1.5rem, 2.5vw, 2rem)     | 600    | Section headings        |
| `.type-h3`            | Playfair Display | clamp(1.25rem, 2vw, 1.75rem)   | 600    | Product titles (modal)  |
| `.type-h4`            | Playfair Display | clamp(1.125rem, 1.5vw, 1.5rem) | 600    | Card subtitles          |
| `.type-overline-gold` | Inter            | 0.6875rem                      | 600    | Luxury section labels   |
| `.type-label`         | Inter            | 0.8125rem                      | 500    | UI labels               |

### 12.4 Shadows

```css
--shadow-base: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
--shadow-xl:
  0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
--shadow-gold: 0 4px 24px 0 rgb(201 169 98 / 0.25);
--shadow-gold-lg: 0 8px 40px 0 rgb(201 169 98 / 0.35);
```

### 12.5 Border Radius

```css
--radius-lg: 0.5rem; /* 8px  — buttons */
--radius-xl: 0.75rem; /* 12px — input fields */
--radius-2xl: 1rem; /* 16px — cards, modals */
--radius-3xl: 1.5rem; /* 24px — mobile bottom sheet */
--radius-full: 9999px; /* Pill shapes */
```

### 12.6 Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-spring: 500ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

### 12.7 Buttons

| Class              | Background    | Text                | Border      | Usage            |
| ------------------ | ------------- | ------------------- | ----------- | ---------------- |
| `.btn-primary`     | Gold gradient | Primary (`#1A1614`) | Transparent | Primary CTA      |
| `.btn-secondary`   | Transparent   | Gold (`#C9A962`)    | Gold        | Outline CTA      |
| `.btn-ghost`       | Transparent   | Primary             | Primary     | Light outline    |
| `.btn-ghost-light` | Transparent   | Sand                | Sand/50%    | Dark backgrounds |

All buttons: `border-radius: 9999px` (pill shape).

---

## 13. Implementation Files

| File                                                 | Purpose                                               |
| ---------------------------------------------------- | ----------------------------------------------------- |
| `src/components/collection/ProductGrid.tsx`          | Grid container, empty state, load more                |
| `src/components/product/ProductCard.tsx`             | Individual card with all interactive elements         |
| `src/components/product/ProductImage.tsx`            | Image stacking, hover crossfade, mobile auto-rotation |
| `src/components/product/ProductPrice.tsx`            | Price display with compare-at and range support       |
| `src/components/product/Badge.tsx`                   | 7 badge types with configurable size/position         |
| `src/components/product/QuickViewModal.tsx`          | Full-screen modal with focus trap, cart integration   |
| `src/components/product/StarRating.tsx`              | Judge.me star rating display                          |
| `src/components/collection/CollectionPageClient.tsx` | Page layout orchestrating filters, sort, grid         |
| `src/components/collection/FilterSidebar.tsx`        | Desktop sidebar filter controls                       |
| `src/components/collection/FilterDrawer.tsx`         | Mobile filter bottom sheet                            |
| `src/components/collection/ActiveFilters.tsx`        | Removable filter chips                                |
| `src/components/collection/SortDropdown.tsx`         | Sort dropdown                                         |
| `src/components/collection/CollectionHeader.tsx`     | Collection hero header                                |
| `src/components/home/FeaturedProducts.tsx`           | Homepage featured section (server)                    |
| `src/components/home/FeaturedProductsCarousel.tsx`   | Homepage carousel (client)                            |
| `src/app/globals.css`                                | All design tokens, typography, utility classes        |
| `src/styles/animations.css`                          | Custom keyframe animations                            |
| `src/lib/utils.ts`                                   | `cn()` utility for conditional class merging          |

---

## Quick Reference: Key Tailwind Classes for the Grid

```jsx
// ProductGrid.tsx — The grid container
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

// ProductCard.tsx — Individual card
<article className="group relative flex flex-col rounded-2xl overflow-hidden bg-white
                    shadow-base hover:shadow-xl transition-all duration-300 ease-out
                    hover:-translate-y-1">

// ProductImage.tsx — Image wrapper
<div className="relative aspect-[4/3] overflow-hidden bg-sand">

// Badge positioning — Top-left
<div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">

// Badge positioning — Top-right
<div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 items-end">

// Discount badge — Bottom-left
<div className="absolute bottom-3 left-3 z-10">

// Desktop Quick View overlay
<button className="absolute inset-x-0 bottom-0 z-20 hidden md:flex items-center justify-center gap-2
                  py-3 bg-primary/80 backdrop-blur-sm text-white text-sm font-medium
                  translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100">

// Mobile Quick View button
<button className="w-full py-2.5 rounded-full text-sm font-medium
                  border border-neutral-200 text-neutral-600
                  hover:border-gold hover:text-gold">

// Out of stock overlay
<div className="absolute inset-0 bg-primary/60 flex items-center justify-center z-10">

// Empty state
<div className="col-span-full flex flex-col items-center justify-center py-24 text-center gap-5">

// Load More button
<button className="btn btn-secondary min-w-[180px]">
</pre>
</details>
</souce>
</document>
```

---

> **Design Theme**: "Desert Luxury" — Dark browns, warm camel sands, and rich gold accents inspired by UAE desert luxury. The product grid balances high information density with clean whitespace and smooth micro-interactions.
