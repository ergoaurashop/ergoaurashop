"use client";

import "@/styles/lava-agni-4.css";
import LavaAgni4Hero from "./LavaAgni4Hero";
import LavaAgni4DealBanner from "./LavaAgni4DealBanner";
import LavaAgni4FullWidthImage from "./LavaAgni4FullWidthImage";
import LavaAgni4Story from "./LavaAgni4Story";
import LavaAgni4Features from "./LavaAgni4Features";
import LavaAgni4VideoSection from "./LavaAgni4VideoSection";
import LavaAgni4CameraSection from "./LavaAgni4CameraSection";
import LavaAgni4Pricing from "./LavaAgni4Pricing";
import LavaAgni4Specs from "./LavaAgni4Specs";
import LavaAgni4Reviews from "./LavaAgni4Reviews";
import LavaAgni4FAQ from "./LavaAgni4FAQ";
import LavaAgni4StickyCTA from "./LavaAgni4StickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * LavaAgni4Section — Main orchestrator component.
 * Renders the full Lava Agni 4 product page with all sections.
 * All CSS is scoped under .lavaagni4-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function LavaAgni4Section() {
  return (
    <div className="lavaagni4-page">
      {/* 1. Hero — full-screen image carousel */}
      <LavaAgni4Hero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <LavaAgni4DealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <LavaAgni4FullWidthImage />

      {/* 4. Brand Story */}
      <LavaAgni4Story />

      {/* 5. Key Features — alternating image/text pattern */}
      <LavaAgni4Features />

      {/* 6. Full-width feature spotlight section */}
      <LavaAgni4VideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <LavaAgni4CameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <LavaAgni4Pricing id="lavaagni4-pricing" />

      {/* 9. Specs + Box Contents */}
      <LavaAgni4Specs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <LavaAgni4Reviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <LavaAgni4FAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <LavaAgni4StickyCTA />
    </div>
  );
}
