# Plan: Fix Product Hero Banner Images Across All Product Pages

## Investigation Summary

### What Was Checked ✓

1. **`public/images/products/` — ALL files present**
   - 11 original product folders (Anti-snoring chin strap, Blackhead remover, etc.) — all images confirmed
   - Part-2/Samsung Galaxy S23 Ultra — all 27 images confirmed
   - Part-2/iPhone-15-Pro-Max-512GB — all 18 images confirmed
   - Part-2/Messi 10 Jersy Argentina world cup 2026 — all 7 Home/ images + reviews-images confirmed
   - Part-2/Elephant trunk pyjama — 6 images confirmed
   - Part-2/Fence lights — 7 images confirmed
   - Part-2/pengpt — 5 images confirmed
   - Part-2/Pokemon Car Dashboard — 8 images confirmed
   - Part-2/swimming fish — 6 images confirmed

2. **Filenames in `SLUG_TO_IMAGES` match disk files** — Spot-checked anti-snoring-chin-strap, all 8 filenames match exactly

3. **Code path for image resolution is correct**
   - [`src/lib/utils.ts:88-96`](src/lib/utils.ts) — `getProductImages()` builds URLs as `/images/products/${encodePath(folder)}/${encodeURIComponent(filename)}`
   - [`src/lib/utils.ts:77-85`](src/lib/utils.ts) — `getProductImageUrl()` fallback returns single URL
   - [`src/app/products/[slug]/ProductDetailClient.tsx:291-297`](src/app/products/slug/ProductDetailClient.tsx) — resolves images: local → Supabase → fallback
   - Hero banner uses `<motion.img>` (regular HTML img tag, NOT next/image) so no image optimization conflicts

4. **No `.gitignore` rules block `public/images/`** — Only excludes `/node_modules`, `/.next/`, `/out/`, `.env*.local`, `.vercel`

5. **No `vercel.json` config blocks images** — Only contains cron job schedules

6. **`next.config.mjs` has no problematic config** — Only `remotePatterns` for Supabase + `formats: ["image/avif", "image/webp"]` (applies only to `next/image`, not plain `<img>`)

### Key Architecture

```
User visits /products/anti-snoring-chin-strap
  │
  ├─ ProductDetailClient renders
  │   │
  │   ├─ getProductImages("anti-snoring-chin-strap")
  │   │   ├─ Looks up SLUG_TO_IMAGES → ["713s6nBocOL...jpg", ...]
  │   │   ├─ Looks up SLUG_TO_FOLDER → "Anti-snoring chin strap"
  │   │   └─ Returns ["/images/products/Anti-snoring%20chin%20strap/713s6nBocOL...jpg", ...]
  │   │
  │   └─ <motion.img src={images[selectedImage]} alt={product.name} />
  │
  └─ Browser requests /images/products/Anti-snoring%20chin%20strap/713s6nBocOL...jpg
       │
       └─ Next.js serves from public/images/products/Anti-snoring chin strap/713s6nBocOL...jpg
```

### Products Covered

14 products have entries in `SLUG_TO_IMAGES` + `SLUG_TO_FOLDER`:

| #   | Slug                            | Folder                             |
| --- | ------------------------------- | ---------------------------------- |
| 1   | anti-snoring-chin-strap         | Anti-snoring chin strap            |
| 2   | blackhead-remover-vacuum-tool   | Blackhead remover vacuum tool      |
| 3   | eye-massager-sleep-mask         | Eye massager sleep mask            |
| 4   | foot-massage-roller-spiked      | Foot massage roller                |
| 5   | kitchen-sink-drain-hair-catcher | Kitchen sink drain hair catcher    |
| 6   | magnetic-usb-cable-3-in-1       | Magnetic USB cable                 |
| 7   | menstrual-heating-pad-usb       | Menstrual heating pad (USB)        |
| 8   | posture-corrector-belt          | Posture corrector belt             |
| 9   | silicone-oil-splatter-guard     | Silicone oil splatter guard        |
| 10  | waterproof-phone-pouch          | Waterproof Phone Pouch             |
| 11  | waterproof-shoe-covers          | Waterproof shoe covers             |
| 12  | samsung-galaxy-s23-ultra        | Part-2/Samsung Galaxy S23 Ultra... |
| 13  | iphone-15-pro-max-512gb         | Part-2/iPhone-15-Pro-Max...        |
| 14  | messi-argentina-2026-jersey     | Part-2/Messi 10 Jersy Argentina... |

**Note:** Products like `swimming fish`, `pengpt`, `Elephant trunk pyjama`, `Fence lights`, `Pokemon Car Dashboard water gun` do NOT have entries in `SLUG_TO_FOLDER` or `SLUG_TO_IMAGES`. They exist only as files on disk and potentially in Supabase database, but have NO static product detail pages generated.

## Root Cause Analysis

Despite exhaustive investigation, **the root cause could NOT be definitively identified through code/file analysis alone** because:

1. All image files ARE present in `public/images/products/` (verified across ALL product folders)
2. All code paths resolve images correctly
3. No configuration blocks image serving

### Possible Remaining Causes

1. **Git tracking issue**: The `public/images/products/` files may exist locally but NOT be tracked in git (and therefore not deployed to Vercel). Need to verify with `git status` / `git ls-files`.

2. **Supabase product data overriding**: If Supabase returns products with invalid/null image URLs, the `images` array in `ProductDetailClient` might be resolving to Supabase URLs instead of local paths.

3. **Build/deployment issue**: The last Vercel deployment may have failed or cached stale build artifacts.

4. **Browser caching**: The user might be seeing cached alt-text from a previous failed load.

5. **Products without SLUG_TO_IMAGES entries**: Products fetched from Supabase that have no local image mapping will show broken images (falling through to `placeholder.jpg` which doesn't exist).

## Proposed Action Plan

### Step 1: Confirm git tracking status

Run `git ls-files public/images/products/` to check if these files are tracked in git. If NOT tracked, the files exist only locally and are NOT deployed to Vercel — which would explain the issue.

### Step 2: If files ARE git-tracked

If files are tracked, the issue may be:

- A stale deployment — trigger a fresh Vercel deployment
- A Supabase data issue — check if Supabase products have null/empty `images` fields

### Step 3: If files are NOT git-tracked

**This is the most likely root cause**, matching the same class of bug as the review images issue (missing files in deployment).

The fix (NO code changes needed, per user request):

- Run `git add public/images/products/` to stage all product images
- Commit and push to trigger Vercel redeployment

### Step 4: Verify fix

- Visit multiple product pages (`/products/anti-snoring-chin-strap`, `/products/eye-massager-sleep-mask`, etc.)
- Confirm hero banner images load correctly
- Check browser devtools network tab for 404s

## Strict Constraints

Per user instructions:

- **NO code changes** to any file — this is purely a file/deployment issue
- **NO changes** to theme, styles, functions, or any part of the website
- Only fix image serving by ensuring files are properly deployed
