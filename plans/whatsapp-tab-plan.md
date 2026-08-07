# WhatsApp "Docked Side Tab" — Implementation Plan

## Goal

Add a premium, docked WhatsApp contact tab to the right screen edge on the
**Home** (`/`), **Products** (`/products`), each **Product detail**
(`/products/[slug]`) page, and the **Contact** (`/contact-us`) page. It appears
after ~3 seconds and opens WhatsApp with a beautiful pre-filled message.

## Design Spec (from user)

- **Position**: right edge, vertically centered with a slight downward offset
  ("just little down mid-right edge"). Not a bottom-corner button.
- **Shape**: slim rounded-left tab, rounded only on the outer (left) edge and
  flat where it meets the screen edge — like a bookmark. Use the site's pill
  radius (`rounded-l-full`) to match buttons used elsewhere.
- **Color**: brand gold `gold` (`#C9A962`) with dark `primary` (`#1A1614`)
  text/glyph — matches `btn-primary` CTA buttons.
- **Icon**: small WhatsApp glyph, **outline style** (stroke, not filled).
- **Label**: one word, vertical text — `"Chat"` (`writing-mode: vertical-rl`).
- **Motion**: on hover it slides out slightly and reveals full text
  `"Chat with us"` — desktop only. Reveal itself fades/slides in after 3s.
- **Elevation**: soft `1px` border, no heavy drop-shadow.
- **Consistency**: Inter (sans) font + pill radius, matching existing buttons.

## Implementation Details

### 1. Config — `src/lib/constants.ts`

Add WhatsApp constants, a link builder, and a route allowlist helper:

- `WHATSAPP_NUMBER = "919496090395"` (wa.me format, no `+`)
- `WHATSAPP_MESSAGE = "Hi ErgoAura! 🛍️ I'm interested in your products — any ongoing offers or discounts I should know about?"`
- `getWhatsAppLink(message = WHATSAPP_MESSAGE)` → `https://wa.me/<number>?text=<encodeURIComponent(message)>`
- `shouldShowWhatsApp(pathname)` → `true` for `/`, `/contact-us`, and any
  path starting with `/products`; `false` otherwise (keeps the tab off
  checkout, blog, etc.).

### 2. Component — `src/components/whatsapp/WhatsAppTab.tsx` (new, client)

- `"use client"`; uses `usePathname()` + `shouldShowWhatsApp()` to self-gate
  rendering to allowlisted routes: exact `/`, exact `/contact-us`, and paths
  starting with `/products`.
- Renders a `fixed right-0 top-1/2 z-40` anchor (`<a>`), flush to the right
  edge, with a slight downward nudge (`translate-y`).
- Outer edge `rounded-l-full`, `bg-gold`, `text-primary`, `1px` subtle border
  (`border-primary/10`), no drop-shadow.
- Resting content: outline WhatsApp SVG glyph + vertical `"Chat"` label
  (`[writing-mode:vertical-rl]`, `tracking-widest`, `text-xs`, `font-semibold`).
- Hover (desktop): the tab slides slightly left and expands to reveal
  horizontal `"Chat with us"` text next to the glyph (`group-hover`, CSS
  width/translate transition, `hidden md:flex` for the expanded label).
- Reveal animation: framer-motion `initial={{ opacity: 0, x: 40 }}` →
  `animate={{ opacity: 1, x: 0 }}` with `transition={{ delay: 3000 }}`;
  use `useReducedMotion()` to skip animation when reduced motion is preferred.
- Link: `href={getWhatsAppLink()}`, `target="_blank"`, `rel="noopener noreferrer"`.
- Accessibility: `aria-label="Chat with us on WhatsApp"`, visible focus ring.
- Analytics: on click call `trackOutboundClick(link, "Chat with us on WhatsApp", "cta")`
  from `@/lib/analytics/engagement`.

### 3. Mount — `src/app/layout.tsx`

- Import and render `<WhatsAppTab />` inside `<body>` (e.g., after `<Footer />`).
- Single mount covers all four page types; `shouldShowWhatsApp()` gate keeps it
  off other pages.
- z-index `z-40` keeps it below modals (CartSidebar / QuickViewModal = `z-50`);
  mid-right placement avoids the mobile bottom StickyCartPanel (`z-40` bottom bar).

### 4. Delay / Best Practice

- Reveal after **3 seconds** (within the accepted 2.5–4s window).
- Because the component is mounted once in the root layout, it persists across
  SPA route changes — reveal animates once per session by nature.
- Respect `prefers-reduced-motion`.

## Files

| Action | File                                                            |
| ------ | --------------------------------------------------------------- |
| Edit   | `src/lib/constants.ts` (WhatsApp config + link builder)         |
| Create | `src/components/whatsapp/WhatsAppTab.tsx` (tab + outline glyph) |
| Edit   | `src/app/layout.tsx` (mount `<WhatsAppTab />`)                  |

No Tailwind config or global CSS changes required (existing tokens + arbitrary
values cover everything).

## Verification

1. `npm run build` / `npm run lint` pass.
2. Tab appears only on `/`, `/products`, `/products/[slug]`, and
   `/contact-us` — not on checkout, blog, etc.
3. Tab fades/slides in ~3s after load; reduced-motion users see it without animation.
4. Hover (desktop) reveals `"Chat with us"`; tap/click opens
   `wa.me/919496090395` with the exact pre-filled message.
5. Sits below open cart/modal overlays (`z-40` < `z-50`).
6. WhatsApp click fires `outbound_click` in GTM/GA4.
