"use client";

import "@/styles/iqoo-15r.css";
import Iqoo15rHero from "./Iqoo15rHero";
import Iqoo15rDealBanner from "./Iqoo15rDealBanner";
import Iqoo15rFullWidthImage from "./Iqoo15rFullWidthImage";
import Iqoo15rStory from "./Iqoo15rStory";
import Iqoo15rFeatures from "./Iqoo15rFeatures";
import Iqoo15rVideoSection from "./Iqoo15rVideoSection";
import Iqoo15rCameraSection from "./Iqoo15rCameraSection";
import Iqoo15rPricing from "./Iqoo15rPricing";
import Iqoo15rSpecs from "./Iqoo15rSpecs";
import Iqoo15rReviews from "./Iqoo15rReviews";
import Iqoo15rFAQ from "./Iqoo15rFAQ";
import Iqoo15rStickyCTA from "./Iqoo15rStickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * Iqoo15rSection — Main orchestrator component.
 * Renders the full iQOO 15R product page with all sections.
 * All CSS is scoped under .iqoo15r-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function Iqoo15rSection() {
  return (
    <div className="iqoo15r-page">
      {/* 1. Hero — full-screen image carousel */}
      <Iqoo15rHero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <Iqoo15rDealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <Iqoo15rFullWidthImage />

      {/* 4. Brand Story */}
      <Iqoo15rStory />

      {/* 5. Key Features — alternating image/text pattern */}
      <Iqoo15rFeatures />

      {/* 6. Full-width feature spotlight section */}
      <Iqoo15rVideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <Iqoo15rCameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <Iqoo15rPricing id="iqoo15r-pricing" />

      {/* 9. Specs + Box Contents */}
      <Iqoo15rSpecs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <Iqoo15rReviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <Iqoo15rFAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <Iqoo15rStickyCTA />
    </div>
  );
}
