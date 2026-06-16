# iPhone 15 Pro Max 512GB — Dedicated Product Page Plan

## Overview

Create a dedicated product page for iPhone 15 Pro Max 512GB that mirrors the architecture and section structure of the Samsung Galaxy S23 Ultra page. The page will have its own data file, CSS (Apple theme), section components, orchestrator, and routing.

---

## Architecture (Same Pattern as S23 Ultra)

```
src/
├── lib/
│   └── iphone-15-pro-max-data.ts          ← NEW: Standalone data file
├── styles/
│   └── iphone-15-pro-max.css              ← NEW: Apple theme CSS (scoped under .iphone-page)
├── components/products/iphone-15-pro-max/
│   ├── iPhone15ProMaxSection.tsx           ← NEW: Orchestrator
│   ├── iPhone15ProMaxHero.tsx              ← NEW
│   ├── iPhone15ProMaxDealBanner.tsx        ← NEW
│   ├── iPhone15ProMaxFullWidthImage.tsx    ← NEW
│   ├── iPhone15ProMaxStory.tsx             ← NEW
│   ├── iPhone15ProMaxFeatures.tsx          ← NEW
│   ├── iPhone15ProMaxVideoSection.tsx      ← NEW
│   ├── iPhone15ProMaxPricing.tsx           ← NEW (includes color selector)
│   ├── iPhone15ProMaxSpecs.tsx             ← NEW
│   ├── iPhone15ProMaxReviews.tsx           ← NEW (27 reviews)
│   ├── iPhone15ProMaxFAQ.tsx               ← NEW
│   └── iPhone15ProMaxStickyCTA.tsx         ← NEW
├── app/products/[slug]/
│   ├── page.tsx                            ← MODIFY: Add iPhone route
│   └── ProductDetailClient.tsx             ← MODIFY: Add iPhone route
└── app/
    └── layout.tsx                          ← MODIFY: Add Plus Jakarta Sans font
```

---

## Step-by-Step Execution

### Step 1: Add Plus Jakarta Sans Font to `src/app/layout.tsx`

- Import `Plus_Jakarta_Sans` from `next/font/google`
- Add variable `--font-plus-jakarta`
- Weights: `400`, `500`, `600`, `700`, `800`

### Step 2: Copy iPhone Images to `public/images/products/`

The assets are currently in `images/products/Part-2/iPhone-15-Pro-Max-512GB-Smart-Phone-Mega-Deal-Offer/`. They need to be copied to `public/images/products/Part-2/iPhone-15-Pro-Max-512GB-Smart-Phone-Mega-Deal-Offer/`.

**Image inventory (17 files + 1 video):**

```
4cc8b667f46992d4f4b9b3616298c244.webp
9c676b63b6504d2bb7bf3b92d5fac4cd.webp
51vq0INE3QL._AC_SL1500_.jpg
61M+HNJhn6L._AC_SL1500_.jpg
71nimWkOyjL._AC_SL1500_.jpg
81y-tY6E9hL._AC_SL1500_.jpg
81YSmKnlijL._AC_SL1500_.jpg
718qqVErHNL._AC_SL1500_.jpg
Apple-iPhone-15-Pro-lineup-camera-system-230912_big.jpg.large_2x.jpg
Apple-iPhone-15-Pro-lineup-design-230912_big.jpg.large_2x.jpg
Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.xlarge_2x.jpg
H6c195da845164cdaada13760b9748329C.avif
iPhone-15-Pro-and-15-Pro-Max-1024x593.jpg
iphone-15-pro-max-issues-scaled.webp
large_2x.webm
pexels-photo-16004744.jpg
storage_large_2x.webp
```

**Review images (11 total in 4 folders):**

```
review-images/1/iphone-15-pro-max-review-1.png
review-images/1/iphone-15-pro-max-review-2.png
review-images/2/iphone-15-pro-max-review-3.jpg
review-images/2/iphone-15-pro-max-review-4.jpg
review-images/2/iphone-15-pro-max-review-5.jpg
review-images/3/iphone-15-pro-max-review-6.jpg
review-images/3/iphone-15-pro-max-review-7.jpg
review-images/3/iphone-15-pro-max-review-8.jpg
review-images/4/iphone-15-pro-max-review-9.jpg
review-images/4/iphone-15-pro-max-review-10.jpg
review-images/4/iphone-15-pro-max-review-11.jpg
```

### Step 3: Create `src/lib/iphone-15-pro-max-data.ts`

Modeled after `src/lib/s23-ultra-data.ts`. Contains:

- `IPHONE_FOLDER` — path constant
- `IPHONE_HERO_IMAGES` — 3 images for hero slider
- `IPHONE_PRODUCT_IMAGES` — all 17 images (same count as S23's 21)
- `IPHONE_PRODUCT` — Product object with:
  - id: `"prod-iphone-15-pro-max-512gb"`
  - name: `"iPhone 15 Pro Max 512GB"`
  - slug: `"iphone-15-pro-max-512gb"`
  - price: `46990` (₹46,990/-)
  - original_price: `94994` (₹94,994/-)
  - discount_percentage: calculated (~51%)
  - stock: `15` (same as S23)
  - features: 6 iPhone-specific features (A17 Pro chip, 48MP camera, Titanium design, etc.)
  - specifications: Full iPhone 15 Pro Max specs (see user's provided specs)
  - Colour options for selector:
    - Natural Titanium (#878684)
    - Blue Titanium (#2F3640)
    - White Titanium (#F2F1ED)
- `IPHONE_REVIEWS` — 27 reviews (10 more than S23's 17)
  - Same structure: name (full name), city, rating, title, text, date, isVerified, helpfulCount
  - Review distribution: ~24× 5★, 2× 4★, 1× 3★ (or similar realistic mix)
  - Realistic Indian customer names (full names)
- `IPHONE_REVIEW_SUMMARY` — totalReviews: 27, averageRating: ~4.8
- `IPHONE_REVIEW_IMAGES` — map review IDs to review image paths (4 review sets from the 4 folders)
- `IPHONE_FAQS` — 7 FAQs (same structure as S23) including:
  - Discount reason rewritten professionally: "We individually export each unit from the Dubai market, which allows us to bypass regional distribution markups and pass the savings directly to you. This is how we keep our prices the lowest in the market."
  - Other FAQs: authenticity, warranty, colour options, Indian network compatibility, box contents, returns
- `IPHONE_KEY_FEATURES` — 6 features with SVG icons
- `IPHONE_CAMERA_CONTENT` — Camera section (Pro camera system: 48MP Fusion, 12MP Ultra Wide, 12MP Telephoto with 5x optical zoom)
- `IPHONE_STORY` — Brand story paragraphs about iPhone 15 Pro Max

### Step 4: Create `src/styles/iphone-15-pro-max.css`

**Apple Theme:**

- Scoped under `.iphone-page` class
- CSS custom properties:
  - `--iphone-bg-primary: #000000`
  - `--iphone-bg-secondary: #1d1d1f`
  - `--iphone-bg-card: #ffffff` (for Amazon-style reviews)
  - `--iphone-accent: #0066cc` (Apple blue)
  - `--iphone-text-primary: #f5f5f7`
  - `--iphone-text-secondary: #86868b`
  - `--iphone-border: rgba(255,255,255,0.12)`
  - `--iphone-radius: 8px` (8px grid)
- Font: `Plus Jakarta Sans` via `--font-plus-jakarta`
- **Glassmorphism**: Use `backdrop-filter: blur(20px)` with `rgba(255,255,255,0.05)` backgrounds
- **Depth effects**: Box shadows, layered gradients, frosted overlays
- Copy existing S23 CSS structure (sections, hero, alternating rows, reviews, FAQ, sticky CTA, pricing, timer, etc.) but with Apple colour palette

### Step 5: Create iPhone Section Components

All components live in `src/components/products/iphone-15-pro-max/`. Each mirrors its S23 counterpart exactly in structure/functionality but with:

- Apple theme colours
- iPhone content from the data file
- Plus Jakarta Sans font
- Glassmorphism effects where applicable

**Components to create (12 total):**

| Component      | File                               | Description                                                                                                                          |
| -------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Orchestrator   | `iPhone15ProMaxSection.tsx`        | Imports CSS, renders all 12 sections                                                                                                 |
| Hero           | `iPhone15ProMaxHero.tsx`           | 100vh video background with `large_2x.webm`, animated content overlay, price ₹46,990, Buy Now → checkout, stock clearance seal       |
| DealBanner     | `iPhone15ProMaxDealBanner.tsx`     | Scrolling marquee with deal text + Apple-style icons                                                                                 |
| FullWidthImage | `iPhone15ProMaxFullWidthImage.tsx` | 50vh hero shot with overlay text                                                                                                     |
| Story          | `iPhone15ProMaxStory.tsx`          | Brand story with animated paragraphs                                                                                                 |
| Features       | `iPhone15ProMaxFeatures.tsx`       | Alternating image/text rows with 6 key features                                                                                      |
| VideoSection   | `iPhone15ProMaxVideoSection.tsx`   | 100vh autoplay video (reuse `large_2x.webm` or use a different section)                                                              |
| Pricing        | `iPhone15ProMaxPricing.tsx`        | Countdown timer, animated price, **colour selector circles** (3 colours with hex backgrounds), stock bar, trust badges, gradient CTA |
| Specs          | `iPhone15ProMaxSpecs.tsx`          | Full specs table + What's in the Box                                                                                                 |
| Reviews        | `iPhone15ProMaxReviews.tsx`        | Amazon-style with 27 reviews, star ratings, photo carousels, lightbox, filtering/sorting                                             |
| FAQ            | `iPhone15ProMaxFAQ.tsx`            | Accordion with framer-motion AnimatePresence                                                                                         |
| StickyCTA      | `iPhone15ProMaxStickyCTA.tsx`      | Fixed bottom bar, product thumb, price, Buy Now → checkout                                                                           |

### Step 6: Create Orchestrator

`iPhone15ProMaxSection.tsx` — imports CSS, renders all 12 section components in order, same structure as `S23SamsungGalaxySection.tsx`.

### Step 7: Update Routing

**`src/app/products/[slug]/page.tsx`:**

- Import iPhone data (`IPHONE_PRODUCT`, `IPHONE_REVIEWS`, `IPHONE_REVIEW_SUMMARY`, `IPHONE_FAQS`, `IPHONE_FOLDER`)
- Add routing logic: `if (slug === "iphone-15-pro-max-512gb")` — generate metadata with iPhone details, render JSON-LD schemas (Product, Breadcrumb, FAQ), then `<ProductDetailClient />`

**`src/app/products/[slug]/ProductDetailClient.tsx`:**

- Add dynamic import for `iPhone15ProMaxSection`
- Add routing: `if (slug === "iphone-15-pro-max-512gb") return <iPhone15ProMaxSection />`

### Step 8: Product Listing (Optional)

Check if iPhone should appear in the main `/products` listing. If yes, add to `LOCAL_PRODUCTS` in `src/lib/products-data.ts`.

---

## Key Design Details

### Apple Colour Palette

| Token          | Hex       | Usage                            |
| -------------- | --------- | -------------------------------- |
| Pro Black      | `#000000` | Page background, hero            |
| Consumer White | `#ffffff` | Review cards, elevated surfaces  |
| Light Gray     | `#f5f5f7` | Text on dark backgrounds         |
| Off-Black      | `#1d1d1f` | Secondary text, card backgrounds |
| Accent Blue    | `#0066cc` | CTAs, links, highlights          |

### Colour Selector (Pricing Section)

3 circular colour swatches displayed horizontally:

- Natural Titanium: `#878684` (medium gray with warm undertone)
- Blue Titanium: `#2F3640` (deep charcoal-blue)
- White Titanium: `#F2F1ED` (warm off-white)

Each is a clickable circle (40px diameter) with a check mark or ring indicating selection. This is purely visual for now (for cart page implementation later).

### Glassmorphism Effects

- Hero overlay: `backdrop-filter: blur(8px)` with translucent background
- Sticky CTA: `backdrop-filter: blur(20px)` with `rgba(255,255,255,0.05)` background
- Cards/containers: `background: rgba(255,255,255,0.03)` with `backdrop-filter: blur(12px)`
- Pricing section: Frosted glass panel for the pricing card

### Typography

- **Headings**: Plus Jakarta Sans, 700-800 weight
- **Body**: Plus Jakarta Sans, 400-500 weight
- **Micro text**: Plus Jakarta Sans, 500-600 weight, smaller sizes
- Use font-size clamp() for responsive scaling (same pattern as S23)

### Buy Now Flow

Same as S23: `useCartStore.getState().addItem(PRODUCT, 1)` then `router.push("/checkout")` — direct checkout, no cart sidebar open.

---

## File Creation Summary

| #   | Action  | File Path                                                                    | Type                                         |
| --- | ------- | ---------------------------------------------------------------------------- | -------------------------------------------- |
| 1   | Modify  | `src/app/layout.tsx`                                                         | Add Plus Jakarta Sans font import & variable |
| 2   | Execute | Copy image assets to `public/images/products/...`                            | CLI/script                                   |
| 3   | Create  | `src/lib/iphone-15-pro-max-data.ts`                                          | Data file                                    |
| 4   | Create  | `src/styles/iphone-15-pro-max.css`                                           | CSS (~500+ lines)                            |
| 5   | Create  | `src/components/products/iphone-15-pro-max/iPhone15ProMaxSection.tsx`        | Orchestrator                                 |
| 6   | Create  | `src/components/products/iphone-15-pro-max/iPhone15ProMaxHero.tsx`           | Hero                                         |
| 7   | Create  | `src/components/products/iphone-15-pro-max/iPhone15ProMaxDealBanner.tsx`     | Deal banner                                  |
| 8   | Create  | `src/components/products/iphone-15-pro-max/iPhone15ProMaxFullWidthImage.tsx` | Full-width image                             |
| 9   | Create  | `src/components/products/iphone-15-pro-max/iPhone15ProMaxStory.tsx`          | Story                                        |
| 10  | Create  | `src/components/products/iphone-15-pro-max/iPhone15ProMaxFeatures.tsx`       | Features                                     |
| 11  | Create  | `src/components/products/iphone-15-pro-max/iPhone15ProMaxVideoSection.tsx`   | Video                                        |
| 12  | Create  | `src/components/products/iphone-15-pro-max/iPhone15ProMaxPricing.tsx`        | Pricing + colour selector                    |
| 13  | Create  | `src/components/products/iphone-15-pro-max/iPhone15ProMaxSpecs.tsx`          | Specs                                        |
| 14  | Create  | `src/components/products/iphone-15-pro-max/iPhone15ProMaxReviews.tsx`        | Reviews (27)                                 |
| 15  | Create  | `src/components/products/iphone-15-pro-max/iPhone15ProMaxFAQ.tsx`            | FAQ                                          |
| 16  | Create  | `src/components/products/iphone-15-pro-max/iPhone15ProMaxStickyCTA.tsx`      | Sticky CTA                                   |
| 17  | Modify  | `src/app/products/[slug]/page.tsx`                                           | Add iPhone route                             |
| 18  | Modify  | `src/app/products/[slug]/ProductDetailClient.tsx`                            | Add iPhone route                             |

**Total: 3 modifications + 14 new files + 1 asset copy operation**
