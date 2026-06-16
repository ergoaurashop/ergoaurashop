# Samsung S23 Ultra — Price Update Plan

## Goal

Change the Samsung S23 Ultra product page price from ₹14,990 to ₹24,990/-, keeping the original price (₹1,24,999) unchanged, recalculating the discount % to 80%, and updating all price references across the page.

## Discount Recalculation

- **New Price**: ₹24,990/-
- **Original Price**: ₹1,24,999 (unchanged)
- **Discount %**: 80% (computed: (124999 - 24990) / 124999 × 100 = 80.0072% → rounded to 80%)
- **Savings**: ₹1,00,009

## Files to Modify

### 1. `src/lib/s23-ultra-data.ts` — Primary Data + Content

| Line             | Current                   | New                                                   |
| ---------------- | ------------------------- | ----------------------------------------------------- |
| 60               | `price: 14990`            | `price: 24990`                                        |
| 62               | `discount_percentage: 88` | `discount_percentage: 80`                             |
| 120 (s23-r2)     | `₹14,990`                 | `₹24,990/-`                                           |
| 186 (s23-r8)     | `₹14,990`                 | `₹24,990/-` (keep "88% off")                          |
| 196-197 (s23-r9) | `₹14,990` and `₹1,10,009` | `₹24,990/-` and `₹1,00,009` (keep "88% off" in title) |
| 252 (s23-r14)    | `₹14,990`                 | `₹24,990/-`                                           |
| 263 (s23-r15)    | `₹14,990`                 | `₹24,990/-` (keep "88% discount")                     |
| 342 (FAQ)        | `₹14,990 for a ₹1,24,999` | `₹24,990/- for a ₹1,24,999`                           |
| 357 (FAQ)        | `₹14,990 vs ₹1,24,999`    | `₹24,990/- vs ₹1,24,999`                              |

### 2. `src/lib/products-data.ts` — Fallback Data

| Line | Current                   | New                       |
| ---- | ------------------------- | ------------------------- |
| 510  | `price: 14990`            | `price: 24990`            |
| 512  | `discount_percentage: 88` | `discount_percentage: 80` |

### 3. `src/components/products/s23/S23DealBanner.tsx` — Component

| Line | Current             | New                   |
| ---- | ------------------- | --------------------- |
| 50   | `88% OFF — ₹14,990` | `80% OFF — ₹24,990/-` |

### 4. `src/app/products/[slug]/page.tsx` — Page Metadata

| Line | Current                  | New                        |
| ---- | ------------------------ | -------------------------- |
| 53   | `₹14,990 \| 88% OFF`     | `₹24,990/- \| 80% OFF`     |
| 55   | `88% OFF — ₹14,990 only` | `80% OFF — ₹24,990/- only` |

## Auto-Updated Components (no manual changes needed)

These components use `S23_PRODUCT.price`, `S23_PRODUCT.original_price`, and `S23_PRODUCT.discount_percentage` — they will auto-reflect the new values:

- `S23Hero.tsx` — hero price display
- `S23Pricing.tsx` — pricing section with countdown timer
- `S23StickyCTA.tsx` — sticky bottom action bar

## Review Text Policy

- Price digits (₹14,990) → updated to ₹24,990/-
- Discount % references (88%) → kept as-is (genuine customer experience)
- Savings figure (₹1,10,009) → updated to ₹1,00,009 for consistency
