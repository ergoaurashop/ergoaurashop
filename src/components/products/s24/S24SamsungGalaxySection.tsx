"use client";

import "@/styles/s24-ultra.css";
import S24Hero from "./S24Hero";
import S24DealBanner from "./S24DealBanner";
import S24FullWidthImage from "./S24FullWidthImage";
import S24Banner from "./S24Banner";
import S24Story from "./S24Story";
import S24Features from "./S24Features";
import S24VideoSection from "./S24VideoSection";
import S24CameraSection from "./S24CameraSection";
import S24Pricing from "./S24Pricing";
import S24Specs from "./S24Specs";
import S24Reviews from "./S24Reviews";
import S24FAQ from "./S24FAQ";
import S24StickyCTA from "./S24StickyCTA";

/**
 * S24SamsungGalaxySection — Main orchestrator component.
 * Renders the full S24 Ultra product page with all sections.
 * All CSS is scoped under .s24-page to prevent theme bleed-through.
 */
export default function S24SamsungGalaxySection() {
  return (
    <div className="s24-page">
      {/* 1. Hero — 100vh image background */}
      <S24Hero />

      {/* 2. Deal Banner — scrolling marquee with SVG flame icons */}
      <S24DealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <S24FullWidthImage />

      {/* 3b. Promo Banner — above The Story */}
      <S24Banner />

      {/* 4. Brand Story */}
      <S24Story />

      {/* 5. Key Features — alternating image/text pattern */}
      <S24Features />

      {/* 6. Full 100vh autoplay video section */}
      <S24VideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <S24CameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <S24Pricing id="s24-pricing" />

      {/* 9. Specs + Box Contents */}
      <S24Specs />

      {/* 10. Customer Reviews — Amazon-style with white bg, green accents */}
      <S24Reviews />

      {/* 11. FAQ — accordion */}
      <S24FAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <S24StickyCTA />
    </div>
  );
}
