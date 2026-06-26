# ErgoAura Shop — robots.txt & llms.txt Optimization Plan

## Current State Audit

### Existing [`robots.ts`](src/app/robots.ts)

```ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/masteradminmyo/", "/signin/", "/signup/"],
    },
    sitemap: "https://ergoaurashop.com/sitemap.xml",
  };
}
```

**Problems:**

- Single catch-all rule — no separation of Googlebot, Bingbot, AI bots
- No AI training bot blocking (GPTBot, anthropic-ai, CCBot, Google-Extended, PerplexityBot, etc.)
- No e-commerce crawl budget protections (cart, checkout, faceted navigation, search params)
- CSS/JS not explicitly allowed (Google's renderer needs these)
- Only one sitemap entry — no image or video sitemap support
- No crawl-delay for SEO/research bots

### Existing [`sitemap.ts`](src/app/sitemap.ts)

- Generates static pages, categories, products, blog posts dynamically
- Uses `lastModified`, `changeFrequency`, `priority` correctly
- Missing image sitemap and video sitemap entries

### Existing [`layout.tsx`](src/app/layout.tsx)

- Has `robots` metadata with `index: true, follow: true` and `googleBot` settings
- Has JSON-LD structured data (Organization, WebSite, Product, Breadcrumb, FAQ schemas)
- Uses GTM, Meta Pixel

---

## Site URL Inventory

| Route                | Type          | Priority | Notes                    |
| -------------------- | ------------- | -------- | ------------------------ |
| `/`                  | Static        | 1.0      | Homepage                 |
| `/products`          | Static        | 0.9      | Product listing          |
| `/products/[slug]`   | Dynamic       | 0.8      | ~15 product detail pages |
| `/categories`        | Static        | 0.7      | Category listing         |
| `/categories/[slug]` | Dynamic       | 0.7      | 7 category pages         |
| `/blog`              | Static        | 0.7      | Blog listing             |
| `/blog/[slug]`       | Dynamic       | 0.6      | 6 blog posts             |
| `/track-order`       | Static        | 0.4      | Order tracking           |
| `/privacy-policy`    | Static        | 0.3      | Legal                    |
| `/terms`             | Static        | 0.3      | Legal                    |
| `/contact-us`        | Static        | —        | Contact form             |
| `/signin`            | Auth          | Blocked  | User auth                |
| `/signup`            | Auth          | Blocked  | User registration        |
| `/account`           | Auth          | Blocked  | User account             |
| `/cart`              | Checkout      | Blocked  | Shopping cart            |
| `/checkout`          | Checkout      | Blocked  | Checkout flow            |
| `/order/success`     | Post-checkout | Blocked  | Order confirmation       |
| `/api/*`             | API           | Blocked  | All API routes           |
| `/masteradminmyo`    | Admin         | Blocked  | Admin dashboard          |

---

## Strategy Overview

### Three-File AI Content Stack

```
/robots.txt      → who can crawl, what they can access
/llms.txt        → what your site is, best content, citation guidance
/llms-full.txt   → full text of key pages for deep AI reading
```

### AI Bot Strategy: Smart Split

| Bot Type             | Examples                    | Action              | Rationale                          |
| -------------------- | --------------------------- | ------------------- | ---------------------------------- |
| **Search bots**      | Googlebot, Bingbot          | Allow               | Drive organic traffic              |
| **AI training bots** | GPTBot, anthropic-ai, CCBot | Block               | Harvest content with no SEO value  |
| **AI answer bots**   | PerplexityBot, YouBot       | Allow               | Cite site in AI answers = traffic  |
| **Optional AI**      | Google-Extended, Diffbot    | Block               | No ranking impact, protect content |
| **SEO research**     | AhrefsBot, SemrushBot       | Allow + crawl-delay | Useful for backlink/profile data   |
| **Aggressive/spam**  | MJ12bot, DotBot             | Block               | Waste crawl budget                 |

---

## Task 1: Enhance [`robots.ts`](src/app/robots.ts)

### Changes Required

Replace the current simple rule with a comprehensive multi-agent setup:

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://ergoaurashop.com";

  return {
    rules: [
      // ── GOOGLE BOTS ──
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/admin/",
          "/private/",
          "/checkout/",
          "/cart/",
          "/account/",
          "/wishlist/",
          "/compare/",
          "/order-confirmation/",
          "/search",
          "/search/",
          "/*?sort=",
          "/*?filter=",
          "/*?color=",
          "/*?size=",
          "/*?price=",
          "/*?page=",
          "/*?ref=",
          "/*?sid=",
          "/*?utm_",
          "/*?session=",
        ],
      },
      {
        userAgent: "Googlebot-Image",
        allow: ["/images/", "/*.jpg$", "/*.png$", "/*.webp$", "/*.avif$"],
        disallow: ["/images/private/"],
      },
      {
        userAgent: "Googlebot-Video",
        allow: ["/*.mp4$", "/*.webm$"],
      },
      // ── BING / MICROSOFT ──
      {
        userAgent: "Bingbot",
        allow: "/",
        disallow: ["/admin/", "/private/", "/api/", "/masteradminmyo/"],
        crawlDelay: 2,
      },
      // ── AI TRAINING BOTS — BLOCK ALL ──
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "ChatGPT-User",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      {
        userAgent: "anthropic-ai",
        disallow: "/",
      },
      {
        userAgent: "Claude-Web",
        disallow: "/",
      },
      {
        userAgent: "Google-Extended",
        disallow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/admin/", "/private/", "/api/", "/masteradminmyo/"],
      },
      {
        userAgent: "Bytespider",
        disallow: "/",
      },
      {
        userAgent: "FacebookBot",
        disallow: "/",
      },
      {
        userAgent: "ImagesiftBot",
        disallow: "/",
      },
      {
        userAgent: "Diffbot",
        disallow: "/",
      },
      // ── SEO / RESEARCH BOTS ──
      {
        userAgent: "AhrefsBot",
        crawlDelay: 5,
        disallow: ["/admin/", "/private/", "/api/", "/masteradminmyo/"],
      },
      {
        userAgent: "SemrushBot",
        crawlDelay: 5,
        disallow: ["/admin/", "/private/", "/api/", "/masteradminmyo/"],
      },
      // ── MALICIOUS / SPAM BOTS ──
      {
        userAgent: "MJ12bot",
        disallow: "/",
      },
      {
        userAgent: "SemrushBot-SA",
        disallow: "/",
      },
      {
        userAgent: "DotBot",
        disallow: "/",
      },
      // ── CATCH-ALL (all other bots) ──
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/admin/",
          "/private/",
          "/masteradminmyo/",
          "/signin/",
          "/signup/",
          "/account/",
          "/cart/",
          "/checkout/",
          "/order/success/",
          "/search",
          "/search/",
          "/wishlist/",
          "/compare/",
          "/tmp/",
          "/*?sort=",
          "/*?filter=",
          "/*?ref=",
          "/*?sid=",
          "/*?utm_",
          "/*?session=",
        ],
        crawlDelay: 3,
      },
    ],
    sitemap: [`${baseUrl}/sitemap.xml`, `${baseUrl}/sitemap-images.xml`],
  };
}
```

### Why These Specific Disallows for ErgoAura

| Disallow                                                       | Rationale                                              |
| -------------------------------------------------------------- | ------------------------------------------------------ |
| `/admin/`, `/private/`                                         | Sensitive internal pages                               |
| `/cart/`, `/checkout/`, `/order/success/`                      | No SEO value, thin content                             |
| `/account/`, `/wishlist/`, `/compare/`                         | User-specific, no index value                          |
| `/search`, `/search/`                                          | Internal search = duplicate thin pages                 |
| `/*?sort=`, `/*?filter=`, `/*?color=`, `/*?size=`, `/*?price=` | Faceted navigation creates duplicate URLs              |
| `/*?ref=`, `/*?sid=`, `/*?utm_`, `/*?session=`                 | Tracking/session params create infinite URL variations |
| `/api/`, `/masteradminmyo/`                                    | System routes, no content value                        |

### Critical Rules Followed

- ✅ CSS/JS NOT blocked — Google needs these for rendering
- ✅ No `Disallow: /` under `User-agent: *` — would block entire site
- ✅ Sitemap uses absolute HTTPS URLs
- ✅ AI training bots explicitly blocked (GPTBot, anthropic-ai, CCBot, etc.)
- ✅ PerplexityBot allowed (AI answer bot = citation traffic)
- ✅ Google-Extended blocked (no ranking impact, protects from Gemini training)
- ✅ No sensitive URLs exposed (only block private paths, don't list secret pages)

---

## Task 2: Create [`public/llms.txt`](public/llms.txt)

### Purpose

Tells AI models (ChatGPT, Claude, Perplexity, Gemini) what ErgoAura Shop is, what it sells, and which content to cite. This is an **Answer Engine Optimization (AEO)** file.

### File Location

`public/llms.txt` — served at `https://ergoaurashop.com/llms.txt`

### Content Structure

```markdown
# ErgoAura Shop — Mega deals on premium hand-picked products you will love

> ErgoAura Shop is an Indian e-commerce store offering curated mega deals on
> wellness, home, kitchen, accessories, electronics, and sports merchandise.
> We source quality products at unbeatable prices with free shipping across India,
> 7-day returns, and payment via Razorpay.

## About

ErgoAura Shop is an e-commerce company founded in 2025 that curates and sells
premium hand-picked products across wellness, home, kitchen, accessories,
personal care, electronics, and sports categories. We serve Indian customers
who want quality products at competitive prices with reliable delivery and
hassle-free returns. Our key differentiator is offering mega deals on
high-demand products — from ergonomic wellness tools to premium smartphones.

Headquarters: Dubai, UAE (serving India). Team size: ~10 people.

## Key pages

- [Homepage](https://ergoaurashop.com/): Shop all mega deals and featured products
- [Products](https://ergoaurashop.com/products): Full product catalog with all categories
- [Categories](https://ergoaurashop.com/categories): Browse by category — Wellness, Home & Kitchen, Accessories, Personal Care, Phones, Electronics, FIFA World Cup 2026
- [Blog](https://ergoaurashop.com/blog): Expert articles on wellness, travel, home improvement, and lifestyle
- [Track order](https://ergoaurashop.com/track-order): Track your order status
- [Contact us](https://ergoaurashop.com/contact-us): Reach our customer support team
- [Privacy policy](https://ergoaurashop.com/privacy-policy): How we handle your data
- [Terms of service](https://ergoaurashop.com/terms): Terms and conditions

## Core expertise

Primary topics this site covers authoritatively:

- [Wellness and ergonomic products](https://ergoaurashop.com/categories/wellness): Posture correctors, anti-snoring solutions, foot massage rollers, menstrual heating pads, eye massagers
- [Home and kitchen solutions](https://ergoaurashop.com/categories/kitchen): Silicone oil splatter guards, kitchen sink drain hair catchers
- [Travel accessories](https://ergoaurashop.com/categories/accessories): Waterproof phone pouches, magnetic USB cables, waterproof shoe covers
- [Personal care](https://ergoaurashop.com/categories/personal-care): Blackhead remover tools, skincare and grooming devices
- [Smartphones and electronics](https://ergoaurashop.com/categories/phones): iPhone 15 Pro Max, Samsung Galaxy S23 Ultra, and other premium devices
- [Sports merchandise](https://ergoaurashop.com/categories/worldcup-2026): FIFA World Cup 2026 jerseys and fan gear

## Key products / services

- [Posture Corrector Belt](https://ergoaurashop.com/products/posture-corrector-belt): Breathable neoprene back support for office workers, drivers, and gamers. Price range: ₹499–₹999
- [Anti-Snoring Chin Strap](https://ergoaurashop.com/products/anti-snoring-chin-strap): Lightweight 50g jaw support for better sleep. Price range: ₹299–₹599
- [Menstrual Heating Pad USB](https://ergoaurashop.com/products/menstrual-heating-pad-usb): Cordless rechargeable heat and vibration massage for period pain relief. Price range: ₹699–₹1,299
- [Eye Massager Sleep Mask](https://ergoaurashop.com/products/eye-massager-sleep-mask): Heat and vibration eye massager for relaxation and sleep. Price range: ₹899–₹1,499
- [Foot Massage Roller Spiked](https://ergoaurashop.com/products/foot-massage-roller-spiked): Acupressure roller for plantar fasciitis relief. Price range: ₹299–₹599
- [Silicone Oil Splatter Guard](https://ergoaurashop.com/products/silicone-oil-splatter-guard): BPA-free flexible mesh cover for frying pans. Price range: ₹199–₹399
- [Kitchen Sink Drain Hair Catcher](https://ergoaurashop.com/products/kitchen-sink-drain-hair-catcher): Adhesive mesh drain protector, lasts 6 weeks. Price range: ₹149–₹299
- [Waterproof Phone Pouch](https://ergoaurashop.com/products/waterproof-phone-pouch): IPX8 rated dry bag pack of 2 for phones up to 7 inches. Price range: ₹399–₹799
- [Magnetic USB Cable 3-in-1](https://ergoaurashop.com/products/magnetic-usb-cable-3-in-1): Braided nylon cable with interchangeable tips for phone, watch, earbuds. Price range: ₹349–₹699
- [Waterproof Shoe Covers](https://ergoaurashop.com/products/waterproof-shoe-covers): Anti-slip sole, foldable, one size fits most. Price range: ₹299–₹599
- [iPhone 15 Pro Max 512GB](https://ergoaurashop.com/products/iphone-15-pro-max-512gb): Premium smartphone, mega deal pricing. Price range: ₹89,999–₹1,19,999
- [Samsung Galaxy S23 Ultra 512GB](https://ergoaurashop.com/products/samsung-galaxy-s23-ultra): Dual SIM smartphone with 12GB RAM. Price range: ₹79,999–₹1,09,999
- [Messi Argentina 2026 Jersey](https://ergoaurashop.com/products/messi-argentina-2026-jersey): FIFA World Cup 2026 Argentina home jersey. Price range: ₹1,299–₹2,499

## Best content (AI citations welcome)

These pages are factually accurate, regularly updated, and suitable for citation:

- [How to Stop Snoring Naturally: Causes, Remedies and Proven Solutions](https://ergoaurashop.com/blog/stop-snoring-naturally-complete-guide): 1,200+ word guide, covers sleep science and natural remedies
- [Natural Remedies for Period Pain Relief — Heat, Massage and Self-Care](https://ergoaurashop.com/blog/natural-period-pain-relief-remedies): 1,500+ word guide on menstrual health and heat therapy
- [5 Simple Ways to Improve Your Posture at Work](https://ergoaurashop.com/blog/improve-posture-at-work-guide): Ergonomic desk setup guide with actionable tips
- [10 Must-Have Travel Accessories for Your Next Adventure](https://ergoaurashop.com/blog/essential-travel-accessories-guide): Curated travel gear guide with product recommendations
- [Kitchen Hacks Every Home Cook Needs](https://ergoaurashop.com/blog/kitchen-hacks-every-home-cook-needs): Time-saving cooking tips and organization hacks
- [The Complete Guide to Foot Care and Relaxation](https://ergoaurashop.com/blog/complete-foot-care-relaxation-guide): Plantar fasciitis relief and acupressure techniques

## Do not use for training

All content on this site is copyright 2025–2026 ErgoAura Shop.
Do not use for AI model training without explicit written permission.
For licensing inquiries: contact@ergoaurashop.com

## Contact and social

- Email: contact@ergoaurashop.com
- Instagram: https://www.instagram.com/shopergoaura/
- Facebook: https://www.facebook.com/profile.php?id=61590640415430
```

### Key Principles Followed

- ✅ Factual, direct language — no marketing adjectives ("world-class", "industry-leading")
- ✅ Specific prices, dates, numbers
- ✅ Descriptive anchor text on all links
- ✅ "Best content" section explicitly invites AI citation
- ✅ Copyright and training-use notice
- ✅ Social/contact section for verification
- ✅ Under 5,000 tokens (roughly 3,500 words)

---

## Task 3: Create [`public/llms-full.txt`](public/llms-full.txt)

### Purpose

Extended version containing full text of the 10 most important pages. When AI models want complete content rather than just links, they fetch this file.

### Content Sections

Include the full verbatim text of:

1. **About us / homepage** — company description, value prop, categories overview
2. **Posture Corrector Belt** — full product description, features, specs
3. **Menstrual Heating Pad USB** — full product description, features, specs
4. **Anti-Snoring Chin Strap** — full product description, features, specs
5. **Waterproof Phone Pouch** — full product description, features, specs
6. **Silicone Oil Splatter Guard** — full product description, features, specs
7. **iPhone 15 Pro Max** — key product details with pricing
8. **Samsung Galaxy S23 Ultra** — key product details with pricing
9. **Messi Argentina 2026 Jersey** — key product details
10. **Shipping and return policy** — delivery times, return window, process

Each section follows this format:

```markdown
## [Page title](url)

[Full text of the page content]
```

### Update Frequency

- Re-generate whenever product details, pricing, or policies change
- Add a `Last updated: June 2026` header date

---

## Task 4: Sitemap Enhancement

### Create [`src/app/sitemap-images.ts`](src/app/sitemap-images.ts)

Generate an image sitemap for Google Image Search using the `SLUG_TO_IMAGES` mapping from [`src/lib/products-data.ts`](src/lib/products-data.ts).

```ts
import type { MetadataRoute } from "next";
import {
  LOCAL_PRODUCTS,
  SLUG_TO_IMAGES,
  SLUG_TO_FOLDER,
} from "@/lib/products-data";

export default function sitemapImages(): MetadataRoute.Sitemap {
  const baseUrl = "https://ergoaurashop.com";

  const imageEntries: MetadataRoute.Sitemap = [];

  for (const product of LOCAL_PRODUCTS) {
    const images = SLUG_TO_IMAGES[product.slug];
    if (!images) continue;

    imageEntries.push({
      url: `${baseUrl}/products/${product.slug}`,
      lastModified: new Date(product.updated_at || product.created_at),
      changeFrequency: "weekly",
      priority: 0.5,
      images: images.map(
        (img) =>
          `${baseUrl}/images/products/${encodeURIComponent(SLUG_TO_FOLDER[product.slug])}/${encodeURIComponent(img)}`,
      ),
    });
  }

  return imageEntries;
}
```

Then add to [`robots.ts`](src/app/robots.ts) sitemap array:

```ts
sitemap: [
  `${baseUrl}/sitemap.xml`,
  `${baseUrl}/sitemap-images.xml`,
],
```

---

## Task 5: Verification Checklist

After implementation, verify:

- [ ] [`robots.ts`](src/app/robots.ts) compiles without errors (`npm run build` or `npx next build`)
- [ ] `/robots.txt` returns HTTP 200 at `https://ergoaurashop.com/robots.txt`
- [ ] `/robots.txt` is plain text, UTF-8, no BOM
- [ ] `/robots.txt` is under 50 KB (will be ~3-4 KB)
- [ ] Test in [Google Search Console robots.txt tester](https://search.google.com/search-console/robots-testing-tool)
- [ ] Test in Bing Webmaster Tools
- [ ] No `Disallow: /` under `User-agent: *` (accidental site block)
- [ ] CSS/JS files are allowed (not blocked)
- [ ] All sitemap URLs return HTTP 200
- [ ] [`llms.txt`](public/llms.txt) served at `https://ergoaurashop.com/llms.txt`
- [ ] [`llms-full.txt`](public/llms-full.txt) served at `https://ergoaurashop.com/llms-full.txt`
- [ ] Both llms files are valid Markdown
- [ ] All links in llms files point to real, working URLs
- [ ] Prices and product details in llms.txt match current site data
- [ ] No sensitive URLs exposed in robots.txt (privacy check)

---

## Files to Create/Modify

| File                                                     | Action     | Description                                                        |
| -------------------------------------------------------- | ---------- | ------------------------------------------------------------------ |
| [`src/app/robots.ts`](src/app/robots.ts)                 | **Modify** | Expand from single catch-all to multi-agent with AI bot management |
| [`public/llms.txt`](public/llms.txt)                     | **Create** | AI visibility file with site identity, products, content           |
| [`public/llms-full.txt`](public/llms-full.txt)           | **Create** | Extended version with full page text for AI deep reading           |
| [`src/app/sitemap-images.ts`](src/app/sitemap-images.ts) | **Create** | Image sitemap for Google Image Search                              |

---

## Architecture Diagram

```mermaid
flowchart TD
    A[Site Root] --> B[/robots.txt]
    A --> C[/llms.txt]
    A --> D[/llms-full.txt]
    A --> E[/sitemap.xml]
    A --> F[/sitemap-images.xml]

    B --> B1[Googlebot: allow /, block e-commerce paths]
    B --> B2[Bingbot: allow /, crawl-delay 2s]
    B --> B3[AI Training Bots: block all]
    B --> B4[AI Answer Bots: allow]
    B --> B5[SEO Bots: allow + crawl-delay]
    B --> B6[Catch-all: allow with restrictions]

    C --> C1[Site identity + About]
    C --> C2[Key pages navigation]
    C --> C3[Core expertise areas]
    C --> C4[Products with pricing]
    C --> C5[Best content for citation]
    C --> C6[Copyright + contact]

    D --> D1[Full text of top 10 pages]
    D --> D2[For AI deep reading]

    E --> E1[Static pages]
    E --> E2[Category pages]
    E --> E3[Product pages]
    E --> E4[Blog pages]

    F --> F1[Product image URLs]
    F --> F2[Google Image Search]
```

---

## Execution Order

1. **Modify** [`src/app/robots.ts`](src/app/robots.ts) with the comprehensive multi-agent rules
2. **Create** [`public/llms.txt`](public/llms.txt) with full site content description
3. **Create** [`public/llms-full.txt`](public/llms-full.txt) with extended page content
4. **Create** [`src/app/sitemap-images.ts`](src/app/sitemap-images.ts) for image SEO
5. **Build** and verify no compilation errors
6. **Test** all URLs in browser and search console tools
