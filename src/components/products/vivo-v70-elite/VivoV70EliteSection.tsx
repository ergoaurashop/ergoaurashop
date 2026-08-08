"use client";

import "@/styles/vivo-v70-elite.css";
import VivoV70EliteHero from "./VivoV70EliteHero";
import VivoV70EliteDealBanner from "./VivoV70EliteDealBanner";
import VivoV70EliteFullWidthImage from "./VivoV70EliteFullWidthImage";
import VivoV70EliteStory from "./VivoV70EliteStory";
import VivoV70EliteFeatures from "./VivoV70EliteFeatures";
import VivoV70EliteVideoSection from "./VivoV70EliteVideoSection";
import VivoV70EliteCameraSection from "./VivoV70EliteCameraSection";
import VivoV70ElitePricing from "./VivoV70ElitePricing";
import VivoV70EliteSpecs from "./VivoV70EliteSpecs";
import VivoV70EliteReviews from "./VivoV70EliteReviews";
import VivoV70EliteFAQ from "./VivoV70EliteFAQ";
import VivoV70EliteStickyCTA from "./VivoV70EliteStickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * VivoV70EliteSection — Main orchestrator component.
 * Renders the full vivo V70 Elite product page with all sections.
 * All CSS is scoped under .vivov70elite-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function VivoV70EliteSection() {
  return (
    <div className="vivov70elite-page">
      {/* 1. Hero — full-screen image carousel */}
      <VivoV70EliteHero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <VivoV70EliteDealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <VivoV70EliteFullWidthImage />

      {/* 4. Brand Story */}
      <VivoV70EliteStory />

      {/* 5. Key Features — alternating image/text pattern */}
      <VivoV70EliteFeatures />

      {/* 6. Full-width feature spotlight section */}
      <VivoV70EliteVideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <VivoV70EliteCameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <VivoV70ElitePricing id="vivov70elite-pricing" />

      {/* 9. Specs + Box Contents */}
      <VivoV70EliteSpecs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <VivoV70EliteReviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <VivoV70EliteFAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <VivoV70EliteStickyCTA />
    </div>
  );
}
