"use client";

import "@/styles/motorola-edge-70-fusion.css";
import Edge70FusionHero from "./Edge70FusionHero";
import Edge70FusionDealBanner from "./Edge70FusionDealBanner";
import Edge70FusionFullWidthImage from "./Edge70FusionFullWidthImage";
import Edge70FusionStory from "./Edge70FusionStory";
import Edge70FusionFeatures from "./Edge70FusionFeatures";
import Edge70FusionVideoSection from "./Edge70FusionVideoSection";
import Edge70FusionCameraSection from "./Edge70FusionCameraSection";
import Edge70FusionPricing from "./Edge70FusionPricing";
import Edge70FusionSpecs from "./Edge70FusionSpecs";
import Edge70FusionReviews from "./Edge70FusionReviews";
import Edge70FusionFAQ from "./Edge70FusionFAQ";
import Edge70FusionStickyCTA from "./Edge70FusionStickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * Edge70FusionSection — Main orchestrator component.
 * Renders the full Motorola Edge 70 Fusion product page with all sections.
 * All CSS is scoped under .edge70fusion-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function Edge70FusionSection() {
  return (
    <div className="edge70fusion-page">
      {/* 1. Hero — full-screen image carousel */}
      <Edge70FusionHero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <Edge70FusionDealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <Edge70FusionFullWidthImage />

      {/* 4. Brand Story */}
      <Edge70FusionStory />

      {/* 5. Key Features — alternating image/text pattern */}
      <Edge70FusionFeatures />

      {/* 6. Full-width feature spotlight section */}
      <Edge70FusionVideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <Edge70FusionCameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <Edge70FusionPricing id="edge70fusion-pricing" />

      {/* 9. Specs + Box Contents */}
      <Edge70FusionSpecs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <Edge70FusionReviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <Edge70FusionFAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <Edge70FusionStickyCTA />
    </div>
  );
}
