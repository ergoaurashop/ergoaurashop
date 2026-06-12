# B2G1 Badge & Promo Placement Plan

## Overview

Add "Buy 2 Get 1 Free" promotional badges/callouts in 5 locations to encourage users to buy more.

---

## 1. Add `b2g1` Variant to Badge Component

**File:** [`src/components/ui/Badge.tsx`](src/components/ui/Badge.tsx)

- Add `"b2g1"` to the `BadgeVariant` type union
- Add variant style: `b2g1: "bg-gradient-to-r from-amber-500 to-orange-500 text-white"`
- Add default icon: 🎁

This gives us a reusable badge we can use everywhere.

---

## 2. TrustMarquee — Replace "Best Price Guarantee" with B2G1

**File:** [`src/components/layout/TrustMarquee.tsx`](src/components/layout/TrustMarquee.tsx)

Change item `{ icon: "💰", label: "Best Price Guarantee" }` → `{ icon: "🎁", label: "Buy 2 Get 1 Free" }`

Adds a permanent scrolling promo badge visible on every page.

---

## 3. ProductCard — Replace "Dubai Climate" with B2G1

**File:** [`src/components/products/ProductCard.tsx`](src/components/products/ProductCard.tsx)

**Change A — Feature badges strip (line 189-192):**

```tsx
{
  /* Before */
}
<Badge variant="dubai_climate" size="sm">
  Dubai Climate
</Badge>;

{
  /* After */
}
<Badge variant="b2g1" size="sm">
  Buy 2 Get 1 Free
</Badge>;
```

**Change B — Top-right badges (optional, for extra visibility):**
Add a B2G1 flash badge to the top-right badge stack when `hasDiscount` is true (since B2G1 is our best promotion):

```tsx
{
  /* Before — after Super Deal badge */
}
{
  hasDiscount && product.discount_percentage >= 40 && (
    <Badge variant="super_deal" size="sm">
      Super Deal
    </Badge>
  );
}

{
  /* After */
}
{
  hasDiscount && product.discount_percentage >= 40 && (
    <Badge variant="super_deal" size="sm">
      Super Deal
    </Badge>
  );
}
<Badge variant="b2g1" size="sm">
  B2G1
</Badge>;
```

Actually, this might be too much clutter. Let's keep it simple: just replace Dubai Climate in the feature strip.

---

## 4. QuickViewModal — Replace "Dubai Climate" with B2G1

**File:** [`src/components/products/QuickViewModal.tsx`](src/components/products/QuickViewModal.tsx)

**Change — Trust badge strip (line 231-233):**

```tsx
{
  /* Before */
}
<Badge variant="dubai_climate" size="sm">
  Dubai Climate
</Badge>;

{
  /* After */
}
<Badge variant="b2g1" size="sm">
  🎁 Buy 2 Get 1 Free
</Badge>;
```

---

## 5. Product Detail Page — Add B2G1 Promo Note

**File:** [`src/components/products/StickyCartPanel.tsx`](src/components/products/StickyCartPanel.tsx)

Add a small callout between the savings chip and the quantity selector:

```tsx
{
  /* B2G1 Promo Callout — always visible */
}
<div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-apple-sm">
  <span className="text-lg">🎁</span>
  <p className="text-xs text-amber-800 font-medium">
    Buy 2 Get 1 Free! Add 3 of this item, get 1 free.
  </p>
</div>;
```

---

## 6. CartSidebar — Add B2G1 Promo Banner

**File:** [`src/components/layout/CartSidebar.tsx`](src/components/layout/CartSidebar.tsx)

When the cart has items but none qualify for B2G1 yet, show a subtle reminder. When items qualify, the existing B2G1 discount lines already show the savings.

Add this between the items list and the footer:

```tsx
{
  /* B2G1 Promo Banner — only when no items qualify yet */
}
{
  items.length > 0 && b2g1Discount === 0 && (
    <div className="mx-6 py-3 px-3 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-apple-sm flex items-center gap-2">
      <span className="text-lg">🎁</span>
      <p className="text-xs text-amber-800">
        Add 3 of the same product to get 1 <strong>free</strong>!
      </p>
    </div>
  );
}
```

---

## Summary of Changes

| #   | File                                                                                         | Change                                                       |
| --- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1   | [`src/components/ui/Badge.tsx`](src/components/ui/Badge.tsx)                                 | Add `b2g1` variant (amber/orange gradient + 🎁 icon)         |
| 2   | [`src/components/layout/TrustMarquee.tsx`](src/components/layout/TrustMarquee.tsx)           | Replace "Best Price Guarantee" with "Buy 2 Get 1 Free"       |
| 3   | [`src/components/products/ProductCard.tsx`](src/components/products/ProductCard.tsx)         | Replace "Dubai Climate" badge with B2G1 badge                |
| 4   | [`src/components/products/QuickViewModal.tsx`](src/components/products/QuickViewModal.tsx)   | Replace "Dubai Climate" badge with B2G1 badge                |
| 5   | [`src/components/products/StickyCartPanel.tsx`](src/components/products/StickyCartPanel.tsx) | Add B2G1 promo callout between savings chip and qty selector |
| 6   | [`src/components/layout/CartSidebar.tsx`](src/components/layout/CartSidebar.tsx)             | Add B2G1 promo banner when no items qualify yet              |

## Design

```
TrustMarquee (global, every page):
  🎁 Buy 2 Get 1 Free        ← scrolling infinitely with other badges

ProductCard (product grid):
  [🎁 Buy 2 Get 1 Free]      ← replaces [☀️ Dubai Climate] in feature strip

QuickViewModal:
  [🎁 Buy 2 Get 1 Free]      ← replaces [☀️ Dubai Climate] in badge strip

StickyCartPanel (product detail page):
  🎁 Buy 2 Get 1 Free! Add 3 of this item, get 1 free.
                                       ← amber callout above qty selector

CartSidebar:
  🎁 Add 3 of the same product to get 1 free!
                                       ← amber banner (only when no B2G1 items yet)
```
