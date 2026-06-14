"use client";

import "@/styles/s23-ultra.css";
import S23Hero from "./S23Hero";
import S23DealBanner from "./S23DealBanner";
import S23FullWidthImage from "./S23FullWidthImage";
import S23Story from "./S23Story";
import S23Features from "./S23Features";
import S23VideoSection from "./S23VideoSection";
import S23CameraSection from "./S23CameraSection";
import S23Pricing from "./S23Pricing";
import S23Specs from "./S23Specs";
import S23Reviews from "./S23Reviews";
import S23FAQ from "./S23FAQ";
import S23StickyCTA from "./S23StickyCTA";

/**
 * S23SamsungGalaxySection — Main orchestrator component.
 * Renders the full S23 Ultra product page with all sections.
 * All CSS is scoped under .s23-page to prevent theme bleed-through.
 */
export default function S23SamsungGalaxySection() {
  return (
    <div className="s23-page">
      {/* 1. Hero — 100vh video background */}
      <S23Hero />

      {/* 2. Deal Banner — scrolling marquee with SVG flame icons */}
      <S23DealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <S23FullWidthImage />

      {/* 4. Brand Story */}
      <S23Story />

      {/* 5. Key Features — alternating image/text pattern */}
      <S23Features />

      {/* 6. Full 100vh autoplay video section */}
      <S23VideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <S23CameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <S23Pricing id="s23-pricing" />

      {/* 9. Specs + Box Contents */}
      <S23Specs />

      {/* 10. Customer Reviews — Amazon-style with white bg, green accents */}
      <S23Reviews />

      {/* 11. FAQ — accordion */}
      <S23FAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <S23StickyCTA />
    </div>
  );
}
