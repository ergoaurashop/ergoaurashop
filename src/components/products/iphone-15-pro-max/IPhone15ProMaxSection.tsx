"use client";

import "@/styles/iphone-15-pro-max.css";
import IPhoneHero from "./IPhoneHero";
import IPhoneDealBanner from "./IPhoneDealBanner";
import IPhoneFullWidthImage from "./IPhoneFullWidthImage";
import IPhoneStory from "./IPhoneStory";
import IPhoneFeatures from "./IPhoneFeatures";
import IPhoneVideoSection from "./IPhoneVideoSection";
import IPhoneCameraSection from "./IPhoneCameraSection";
import IPhonePricing from "./IPhonePricing";
import IPhoneSpecs from "./IPhoneSpecs";
import IPhoneReviews from "./IPhoneReviews";
import IPhoneFAQ from "./IPhoneFAQ";
import IPhoneStickyCTA from "./IPhoneStickyCTA";

/**
 * IPhone15ProMaxSection — Main orchestrator component.
 * Renders the full iPhone 15 Pro Max 512GB product page with all sections.
 * All CSS is scoped under .iphone-page to prevent theme bleed-through.
 */
export default function IPhone15ProMaxSection() {
  return (
    <div className="iphone-page">
      {/* 1. Hero — 100vh video background */}
      <IPhoneHero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <IPhoneDealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <IPhoneFullWidthImage />

      {/* 4. Brand Story */}
      <IPhoneStory />

      {/* 5. Key Features — alternating image/text pattern */}
      <IPhoneFeatures />

      {/* 6. Full 100vh autoplay video section */}
      <IPhoneVideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <IPhoneCameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <IPhonePricing id="iphone-pricing" />

      {/* 9. Specs + Box Contents */}
      <IPhoneSpecs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <IPhoneReviews />

      {/* 11. FAQ — accordion */}
      <IPhoneFAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <IPhoneStickyCTA />
    </div>
  );
}
