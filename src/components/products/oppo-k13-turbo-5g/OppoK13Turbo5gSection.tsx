"use client";

import "@/styles/oppo-k13-turbo-5g.css";
import OppoK13Turbo5gHero from "./OppoK13Turbo5gHero";
import OppoK13Turbo5gDealBanner from "./OppoK13Turbo5gDealBanner";
import OppoK13Turbo5gFullWidthImage from "./OppoK13Turbo5gFullWidthImage";
import OppoK13Turbo5gStory from "./OppoK13Turbo5gStory";
import OppoK13Turbo5gFeatures from "./OppoK13Turbo5gFeatures";
import OppoK13Turbo5gVideoSection from "./OppoK13Turbo5gVideoSection";
import OppoK13Turbo5gCameraSection from "./OppoK13Turbo5gCameraSection";
import OppoK13Turbo5gPricing from "./OppoK13Turbo5gPricing";
import OppoK13Turbo5gSpecs from "./OppoK13Turbo5gSpecs";
import OppoK13Turbo5gReviews from "./OppoK13Turbo5gReviews";
import OppoK13Turbo5gFAQ from "./OppoK13Turbo5gFAQ";
import OppoK13Turbo5gStickyCTA from "./OppoK13Turbo5gStickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * OppoK13Turbo5gSection — Main orchestrator component.
 * Renders the full OPPO K13 Turbo 5G product page with all sections.
 * All CSS is scoped under .oppok13turbo5g-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function OppoK13Turbo5gSection() {
  return (
    <div className="oppok13turbo5g-page">
      {/* 1. Hero — full-screen image carousel */}
      <OppoK13Turbo5gHero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <OppoK13Turbo5gDealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <OppoK13Turbo5gFullWidthImage />

      {/* 4. Brand Story */}
      <OppoK13Turbo5gStory />

      {/* 5. Key Features — alternating image/text pattern */}
      <OppoK13Turbo5gFeatures />

      {/* 6. Full-width feature spotlight section */}
      <OppoK13Turbo5gVideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <OppoK13Turbo5gCameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <OppoK13Turbo5gPricing id="oppok13turbo5g-pricing" />

      {/* 9. Specs + Box Contents */}
      <OppoK13Turbo5gSpecs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <OppoK13Turbo5gReviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <OppoK13Turbo5gFAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <OppoK13Turbo5gStickyCTA />
    </div>
  );
}
