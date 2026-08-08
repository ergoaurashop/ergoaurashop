"use client";

import "@/styles/motorola-edge-70-pro-plus.css";
import Edge70ProPlusHero from "./Edge70ProPlusHero";
import Edge70ProPlusDealBanner from "./Edge70ProPlusDealBanner";
import Edge70ProPlusFullWidthImage from "./Edge70ProPlusFullWidthImage";
import Edge70ProPlusStory from "./Edge70ProPlusStory";
import Edge70ProPlusFeatures from "./Edge70ProPlusFeatures";
import Edge70ProPlusVideoSection from "./Edge70ProPlusVideoSection";
import Edge70ProPlusCameraSection from "./Edge70ProPlusCameraSection";
import Edge70ProPlusPricing from "./Edge70ProPlusPricing";
import Edge70ProPlusSpecs from "./Edge70ProPlusSpecs";
import Edge70ProPlusReviews from "./Edge70ProPlusReviews";
import Edge70ProPlusFAQ from "./Edge70ProPlusFAQ";
import Edge70ProPlusStickyCTA from "./Edge70ProPlusStickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * Edge70ProPlusSection — Main orchestrator component.
 * Renders the full Motorola Edge 70 Pro+ 5G product page with all sections.
 * All CSS is scoped under .edge70proplus-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function Edge70ProPlusSection() {
  return (
    <div className="edge70proplus-page">
      {/* 1. Hero — full-screen image carousel */}
      <Edge70ProPlusHero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <Edge70ProPlusDealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <Edge70ProPlusFullWidthImage />

      {/* 4. Brand Story */}
      <Edge70ProPlusStory />

      {/* 5. Key Features — alternating image/text pattern */}
      <Edge70ProPlusFeatures />

      {/* 6. Full-width feature spotlight section */}
      <Edge70ProPlusVideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <Edge70ProPlusCameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <Edge70ProPlusPricing id="edge70proplus-pricing" />

      {/* 9. Specs + Box Contents */}
      <Edge70ProPlusSpecs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <Edge70ProPlusReviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <Edge70ProPlusFAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <Edge70ProPlusStickyCTA />
    </div>
  );
}
