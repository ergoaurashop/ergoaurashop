"use client";

import "@/styles/motorola-edge-70.css";
import Edge70Hero from "./Edge70Hero";
import Edge70DealBanner from "./Edge70DealBanner";
import Edge70FullWidthImage from "./Edge70FullWidthImage";
import Edge70Story from "./Edge70Story";
import Edge70Features from "./Edge70Features";
import Edge70VideoSection from "./Edge70VideoSection";
import Edge70CameraSection from "./Edge70CameraSection";
import Edge70Pricing from "./Edge70Pricing";
import Edge70Specs from "./Edge70Specs";
import Edge70Reviews from "./Edge70Reviews";
import Edge70FAQ from "./Edge70FAQ";
import Edge70StickyCTA from "./Edge70StickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * Edge70Section — Main orchestrator component.
 * Renders the full Motorola Edge 70 product page with all sections.
 * All CSS is scoped under .edge70-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function Edge70Section() {
  return (
    <div className="edge70-page">
      {/* 1. Hero — full-screen image carousel */}
      <Edge70Hero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <Edge70DealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <Edge70FullWidthImage />

      {/* 4. Brand Story */}
      <Edge70Story />

      {/* 5. Key Features — alternating image/text pattern */}
      <Edge70Features />

      {/* 6. Full-width feature spotlight section */}
      <Edge70VideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <Edge70CameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <Edge70Pricing id="edge70-pricing" />

      {/* 9. Specs + Box Contents */}
      <Edge70Specs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <Edge70Reviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <Edge70FAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <Edge70StickyCTA />
    </div>
  );
}
