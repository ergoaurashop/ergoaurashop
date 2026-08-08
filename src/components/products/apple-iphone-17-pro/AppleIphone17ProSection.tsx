"use client";

import "@/styles/apple-iphone-17-pro.css";
import AppleIphone17ProHero from "./AppleIphone17ProHero";
import AppleIphone17ProDealBanner from "./AppleIphone17ProDealBanner";
import AppleIphone17ProFullWidthImage from "./AppleIphone17ProFullWidthImage";
import AppleIphone17ProStory from "./AppleIphone17ProStory";
import AppleIphone17ProFeatures from "./AppleIphone17ProFeatures";
import AppleIphone17ProVideoSection from "./AppleIphone17ProVideoSection";
import AppleIphone17ProCameraSection from "./AppleIphone17ProCameraSection";
import AppleIphone17ProPricing from "./AppleIphone17ProPricing";
import AppleIphone17ProSpecs from "./AppleIphone17ProSpecs";
import AppleIphone17ProReviews from "./AppleIphone17ProReviews";
import AppleIphone17ProFAQ from "./AppleIphone17ProFAQ";
import AppleIphone17ProStickyCTA from "./AppleIphone17ProStickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * AppleIphone17ProSection — Main orchestrator component.
 * Renders the full Apple iPhone 17 Pro product page with all sections.
 * All CSS is scoped under .appleiphone17pro-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function AppleIphone17ProSection() {
  return (
    <div className="appleiphone17pro-page">
      {/* 1. Hero — full-screen image carousel */}
      <AppleIphone17ProHero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <AppleIphone17ProDealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <AppleIphone17ProFullWidthImage />

      {/* 4. Brand Story */}
      <AppleIphone17ProStory />

      {/* 5. Key Features — alternating image/text pattern */}
      <AppleIphone17ProFeatures />

      {/* 6. Full-width feature spotlight section */}
      <AppleIphone17ProVideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <AppleIphone17ProCameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <AppleIphone17ProPricing id="appleiphone17pro-pricing" />

      {/* 9. Specs + Box Contents */}
      <AppleIphone17ProSpecs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <AppleIphone17ProReviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <AppleIphone17ProFAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <AppleIphone17ProStickyCTA />
    </div>
  );
}
