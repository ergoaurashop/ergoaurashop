"use client";

import "@/styles/apple-iphone-air.css";
import AppleIphoneAirHero from "./AppleIphoneAirHero";
import AppleIphoneAirDealBanner from "./AppleIphoneAirDealBanner";
import AppleIphoneAirFullWidthImage from "./AppleIphoneAirFullWidthImage";
import AppleIphoneAirStory from "./AppleIphoneAirStory";
import AppleIphoneAirFeatures from "./AppleIphoneAirFeatures";
import AppleIphoneAirVideoSection from "./AppleIphoneAirVideoSection";
import AppleIphoneAirCameraSection from "./AppleIphoneAirCameraSection";
import AppleIphoneAirPricing from "./AppleIphoneAirPricing";
import AppleIphoneAirSpecs from "./AppleIphoneAirSpecs";
import AppleIphoneAirReviews from "./AppleIphoneAirReviews";
import AppleIphoneAirFAQ from "./AppleIphoneAirFAQ";
import AppleIphoneAirStickyCTA from "./AppleIphoneAirStickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * AppleIphoneAirSection — Main orchestrator component.
 * Renders the full Apple iPhone Air product page with all sections.
 * All CSS is scoped under .appleiphoneair-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function AppleIphoneAirSection() {
  return (
    <div className="appleiphoneair-page">
      {/* 1. Hero — full-screen image carousel */}
      <AppleIphoneAirHero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <AppleIphoneAirDealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <AppleIphoneAirFullWidthImage />

      {/* 4. Brand Story */}
      <AppleIphoneAirStory />

      {/* 5. Key Features — alternating image/text pattern */}
      <AppleIphoneAirFeatures />

      {/* 6. Full-width feature spotlight section */}
      <AppleIphoneAirVideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <AppleIphoneAirCameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <AppleIphoneAirPricing id="appleiphoneair-pricing" />

      {/* 9. Specs + Box Contents */}
      <AppleIphoneAirSpecs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <AppleIphoneAirReviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <AppleIphoneAirFAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <AppleIphoneAirStickyCTA />
    </div>
  );
}
