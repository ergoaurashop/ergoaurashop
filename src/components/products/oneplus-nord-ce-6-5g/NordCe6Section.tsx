"use client";

import "@/styles/oneplus-nord-ce-6-5g.css";
import NordCe6Hero from "./NordCe6Hero";
import NordCe6DealBanner from "./NordCe6DealBanner";
import NordCe6FullWidthImage from "./NordCe6FullWidthImage";
import NordCe6Story from "./NordCe6Story";
import NordCe6Features from "./NordCe6Features";
import NordCe6VideoSection from "./NordCe6VideoSection";
import NordCe6CameraSection from "./NordCe6CameraSection";
import NordCe6Pricing from "./NordCe6Pricing";
import NordCe6Specs from "./NordCe6Specs";
import NordCe6Reviews from "./NordCe6Reviews";
import NordCe6FAQ from "./NordCe6FAQ";
import NordCe6StickyCTA from "./NordCe6StickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * NordCe6Section — Main orchestrator component.
 * Renders the full OnePlus Nord CE 6 5G product page with all sections.
 * All CSS is scoped under .nordce6-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function NordCe6Section() {
  return (
    <div className="nordce6-page">
      {/* 1. Hero — full-screen image carousel */}
      <NordCe6Hero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <NordCe6DealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <NordCe6FullWidthImage />

      {/* 4. Brand Story */}
      <NordCe6Story />

      {/* 5. Key Features — alternating image/text pattern */}
      <NordCe6Features />

      {/* 6. Full-width feature spotlight section */}
      <NordCe6VideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <NordCe6CameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <NordCe6Pricing id="nordce6-pricing" />

      {/* 9. Specs + Box Contents */}
      <NordCe6Specs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <NordCe6Reviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <NordCe6FAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <NordCe6StickyCTA />
    </div>
  );
}
