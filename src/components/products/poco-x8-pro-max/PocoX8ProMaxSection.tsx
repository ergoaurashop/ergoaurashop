"use client";

import "@/styles/poco-x8-pro-max.css";
import PocoX8ProMaxHero from "./PocoX8ProMaxHero";
import PocoX8ProMaxDealBanner from "./PocoX8ProMaxDealBanner";
import PocoX8ProMaxFullWidthImage from "./PocoX8ProMaxFullWidthImage";
import PocoX8ProMaxStory from "./PocoX8ProMaxStory";
import PocoX8ProMaxFeatures from "./PocoX8ProMaxFeatures";
import PocoX8ProMaxVideoSection from "./PocoX8ProMaxVideoSection";
import PocoX8ProMaxCameraSection from "./PocoX8ProMaxCameraSection";
import PocoX8ProMaxPricing from "./PocoX8ProMaxPricing";
import PocoX8ProMaxSpecs from "./PocoX8ProMaxSpecs";
import PocoX8ProMaxReviews from "./PocoX8ProMaxReviews";
import PocoX8ProMaxFAQ from "./PocoX8ProMaxFAQ";
import PocoX8ProMaxStickyCTA from "./PocoX8ProMaxStickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * PocoX8ProMaxSection — Main orchestrator component.
 * Renders the full POCO X8 Pro Max product page with all sections.
 * All CSS is scoped under .pocox8promax-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function PocoX8ProMaxSection() {
  return (
    <div className="pocox8promax-page">
      {/* 1. Hero — full-screen image carousel */}
      <PocoX8ProMaxHero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <PocoX8ProMaxDealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <PocoX8ProMaxFullWidthImage />

      {/* 4. Brand Story */}
      <PocoX8ProMaxStory />

      {/* 5. Key Features — alternating image/text pattern */}
      <PocoX8ProMaxFeatures />

      {/* 6. Full-width feature spotlight section */}
      <PocoX8ProMaxVideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <PocoX8ProMaxCameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <PocoX8ProMaxPricing id="pocox8promax-pricing" />

      {/* 9. Specs + Box Contents */}
      <PocoX8ProMaxSpecs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <PocoX8ProMaxReviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <PocoX8ProMaxFAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <PocoX8ProMaxStickyCTA />
    </div>
  );
}
