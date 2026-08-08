"use client";

import "@/styles/realme-p4-power.css";
import P4PowerHero from "./P4PowerHero";
import P4PowerDealBanner from "./P4PowerDealBanner";
import P4PowerFullWidthImage from "./P4PowerFullWidthImage";
import P4PowerStory from "./P4PowerStory";
import P4PowerFeatures from "./P4PowerFeatures";
import P4PowerVideoSection from "./P4PowerVideoSection";
import P4PowerCameraSection from "./P4PowerCameraSection";
import P4PowerPricing from "./P4PowerPricing";
import P4PowerSpecs from "./P4PowerSpecs";
import P4PowerReviews from "./P4PowerReviews";
import P4PowerFAQ from "./P4PowerFAQ";
import P4PowerStickyCTA from "./P4PowerStickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * P4PowerSection — Main orchestrator component.
 * Renders the full realme P4 Power product page with all sections.
 * All CSS is scoped under .p4power-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function P4PowerSection() {
  return (
    <div className="p4power-page">
      {/* 1. Hero — full-screen image carousel */}
      <P4PowerHero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <P4PowerDealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <P4PowerFullWidthImage />

      {/* 4. Brand Story */}
      <P4PowerStory />

      {/* 5. Key Features — alternating image/text pattern */}
      <P4PowerFeatures />

      {/* 6. Full-width feature spotlight section */}
      <P4PowerVideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <P4PowerCameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <P4PowerPricing id="p4power-pricing" />

      {/* 9. Specs + Box Contents */}
      <P4PowerSpecs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <P4PowerReviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <P4PowerFAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <P4PowerStickyCTA />
    </div>
  );
}
