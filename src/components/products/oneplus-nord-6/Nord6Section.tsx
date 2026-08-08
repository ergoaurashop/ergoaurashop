"use client";

import "@/styles/oneplus-nord-6.css";
import Nord6Hero from "./Nord6Hero";
import Nord6DealBanner from "./Nord6DealBanner";
import Nord6FullWidthImage from "./Nord6FullWidthImage";
import Nord6Story from "./Nord6Story";
import Nord6Features from "./Nord6Features";
import Nord6VideoSection from "./Nord6VideoSection";
import Nord6CameraSection from "./Nord6CameraSection";
import Nord6Pricing from "./Nord6Pricing";
import Nord6Specs from "./Nord6Specs";
import Nord6Reviews from "./Nord6Reviews";
import Nord6FAQ from "./Nord6FAQ";
import Nord6StickyCTA from "./Nord6StickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * Nord6Section — Main orchestrator component.
 * Renders the full OnePlus Nord 6 product page with all sections.
 * All CSS is scoped under .nord6-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function Nord6Section() {
  return (
    <div className="nord6-page">
      {/* 1. Hero — full-screen image carousel */}
      <Nord6Hero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <Nord6DealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <Nord6FullWidthImage />

      {/* 4. Brand Story */}
      <Nord6Story />

      {/* 5. Key Features — alternating image/text pattern */}
      <Nord6Features />

      {/* 6. Full-width feature spotlight section */}
      <Nord6VideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <Nord6CameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <Nord6Pricing id="nord6-pricing" />

      {/* 9. Specs + Box Contents */}
      <Nord6Specs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <Nord6Reviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <Nord6FAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <Nord6StickyCTA />
    </div>
  );
}
