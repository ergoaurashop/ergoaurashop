# Cart Sidebar Updates Plan

## Overview

Five visual and functional updates to [`src/components/layout/CartSidebar.tsx`](src/components/layout/CartSidebar.tsx) to improve conversion, UX, and visual appeal.

---

## Task 1 — "Buy 2 Get 1" Badge + Discount Price Display Per Cart Item

**File:** [`src/components/layout/CartSidebar.tsx`](src/components/layout/CartSidebar.tsx) (lines 138-152)

### Current State

- Line 144-148: A small "B2G1" badge shows only when `item.quantity >= 3`
- Line 150-152: Only displays `item.product.price` — no `original_price` strikethrough shown

### Target State

1. **Show discount pricing for every product:** Display `original_price` with strikethrough alongside the current `price` (red sale color), using the same pattern as [`ProductPrice.tsx`](src/components/products/ProductPrice.tsx#L38-L58)
2. **Conversion-style "Buy 2 Get 1" badge:** Replace the small conditional B2G1 badge with an always-visible, eye-catching badge after the price that reads "Buy 2 Get 1" — styled as a pill with gradient background and subtle animation

### Implementation Details

**Price block (replace lines 150-152):**

```tsx
<p className="text-sm mt-0.5 flex items-center gap-2 flex-wrap">
  {/* Current price (red if on sale) */}
  <span
    className={cn(
      "font-semibold",
      item.product.original_price > item.product.price && "text-[#EF4444]",
    )}
  >
    {formatPrice(item.product.price)}
  </span>
  {/* Original price strikethrough */}
  {item.product.original_price > item.product.price && (
    <span className="text-xs text-apple-text-secondary line-through">
      {formatPrice(item.product.original_price)}
    </span>
  )}
  {/* Buy 2 Get 1 badge — always visible */}
  <span
    className="inline-flex items-center gap-1 text-[10px] font-bold text-white 
                  bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 
                  bg-[length:200%_100%] animate-gradient-shift
                  px-2 py-0.5 rounded-full whitespace-nowrap
                  shadow-sm"
  >
    🎁 Buy 2 Get 1
  </span>
</p>
```

**Remove the old B2G1 badge** at lines 144-148 (the one that was conditional on `item.quantity >= 3`).

---

## Task 2 — Product Image Links to Product Page

**File:** [`src/components/layout/CartSidebar.tsx`](src/components/layout/CartSidebar.tsx) (lines 128-135)

### Current State

- Line 129-135: A plain `<div>` wraps an `<img>` tag — no link

### Target State

- Wrap the image in a [`<Link>`](src/components/layout/CartSidebar.tsx#L8) (already imported) pointing to `/products/${item.product.slug}`
- Add `cursor-pointer` and a subtle hover effect (scale/opacity)
- Ensure clicking closes the cart (`onClick={closeCart}`)

### Implementation

```tsx
<Link
  href={`/products/${item.product.slug}`}
  onClick={closeCart}
  className="w-20 h-20 rounded-apple-sm bg-apple-bg overflow-hidden flex-shrink-0 
             group block"
>
  <img
    src={getProductImageUrl(item.product.slug)}
    alt={item.product.name}
    className="w-full h-full object-cover transition-transform duration-300 
               group-hover:scale-105"
  />
</Link>
```

---

## Task 3 — Replace "Shipping calculated at checkout" with "Free Delivery"

**File:** [`src/components/layout/CartSidebar.tsx`](src/components/layout/CartSidebar.tsx) (line 257-259)

### Current State

```tsx
<p className="text-xs text-apple-text-secondary">
  Shipping calculated at checkout
</p>
```

### Target State

```tsx
<p className="text-xs text-green-600 font-medium flex items-center gap-1">
  <svg className="w-3.5 h-3.5" ... /> Free Delivery
</p>
```

Add a small truck/delivery icon or checkmark icon alongside "Free Delivery" text, colored green to signal positivity.

---

## Task 4 — Animated Gradient Background on B2G1 Promo Banner

**File:** [`src/components/layout/CartSidebar.tsx`](src/components/layout/CartSidebar.tsx) (lines 197-204)

### Current State

```tsx
<div
  className="mx-6 py-3 px-3 bg-gradient-to-r from-amber-50 to-orange-50 
                border border-amber-200 rounded-apple-sm flex items-center gap-2"
>
  <span className="text-lg shrink-0">🎁</span>
  <p className="text-xs text-amber-800 leading-snug">
    Add 3 of the same product to get 1 <strong>free</strong>!
  </p>
</div>
```

### Target State

- Replace the static `from-amber-50 to-orange-50` gradient with an animated gradient using the theme's gold/sand colors
- Use `bg-[length:200%_100%]` + `animate-gradient-shift` keyframes (already defined in [`tailwind.config.ts`](tailwind.config.ts#L94-L97))
- Keep text readable with darker gold/amber text color
- Add a subtle `shadow-gold` or glow effect

```tsx
<div
  className="mx-6 py-3 px-3 
                bg-gradient-to-r from-amber-200 via-gold-light to-amber-100 
                bg-[length:200%_100%] animate-gradient-shift
                border border-gold/30 rounded-apple-sm flex items-center gap-2
                shadow-gold/20"
>
  <span className="text-lg shrink-0">🎁</span>
  <p className="text-xs text-amber-900 font-medium leading-snug">
    Add 3 of the same product to get 1 <strong>free</strong>!
  </p>
</div>
```

---

## Task 5 — Light Gradient Animation on Cart Sidebar Background

**File:** [`src/components/layout/CartSidebar.tsx`](src/components/layout/CartSidebar.tsx) (line 64)

### Current State

```tsx
className="fixed right-0 top-0 h-full w-full max-w-md bg-apple-white z-50
           shadow-2xl flex flex-col"
```

### Target State

- Replace `bg-apple-white` with a subtle animated gradient using the brand's sand/gold/off-white colors
- Very subtle — barely perceptible but adds visual richness
- Use `bg-[length:400%_400%]` with a slow `animate-gradient-shift` (6s+ duration) for a gentle ambient effect

```tsx
className="fixed right-0 top-0 h-full w-full max-w-md z-50 shadow-2xl flex flex-col
           bg-gradient-to-br from-white via-sand/30 to-gold-muted
           bg-[length:400%_400%] animate-gradient-shift"
```

**Note:** The `gradient-shift` animation already exists in [`globals.css`](src/app/globals.css#L350-L360) and [`tailwind.config.ts`](tailwind.config.ts#L94-L97). We may need to add a slower variant (e.g., `animate-gradient-shift-slow`) for the background to make it more subtle. This can be added to tailwind config.

---

## Files to Modify

| #   | File                                                                             | Changes                                                |
| --- | -------------------------------------------------------------------------------- | ------------------------------------------------------ |
| 1   | [`src/components/layout/CartSidebar.tsx`](src/components/layout/CartSidebar.tsx) | All 5 tasks above                                      |
| 2   | [`tailwind.config.ts`](tailwind.config.ts)                                       | Add `gradient-shift-slow` animation variant (optional) |

---

## Summary of Visual Changes

```
Before:                             After:
┌──────────────────────────┐       ┌──────────────────────────┐ (animated gradient bg)
│ Cart (2 items)           │       │ Cart (2 items)           │
│                          │       │                          │
│ ┌────┐                   │       │ ┌────┐ (clickable → PDP) │
│ │img │ Product Name B2G1 │       │ │img │ Product Name      │
│ │    │ ₹99               │       │ │    │ ₹99 ₹198 🎁 B2G1  │ ← always visible badge
│ └────┘ [-] [+] Remove    │       │ └────┘ [-] [+] Remove    │
│                          │       │                          │
│ 🎁 Add 3...get 1 free!   │       │ 🎁 Add 3...get 1 free!   │ ← animated gradient bg
│                          │       │                          │
│ Subtotal    ₹198          │       │ Subtotal    ₹198          │
│ Shipping calc. @ checkout│       │ ✅ Free Delivery          │ ← green with icon
└──────────────────────────┘       └──────────────────────────┘
```

---

## Dependencies

- `framer-motion` already imported — no new packages needed
- `Link` from `next/link` already imported — no change needed
- `cn` utility from `@/lib/utils` already available — need to add import
- `gradient-shift` animation already defined in tailwind config and globals.css — ready to use
