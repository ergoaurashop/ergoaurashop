"use client";

import { useCallback } from "react";
import "@/styles/s23-ultra.css";
import S23Hero from "./S23Hero";
import S23DealBanner from "./S23DealBanner";
import S23Features from "./S23Features";
import S23Pricing from "./S23Pricing";
import S23Story from "./S23Story";
import S23CameraSection from "./S23CameraSection";
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
  const scrollToPricing = useCallback(() => {
    const el = document.getElementById("s23-pricing");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className="s23-page">
      {/* 1. Hero — 75vh auto-fade slider */}
      <S23Hero scrollToPricing={scrollToPricing} />

      {/* 2. Deal Banner — scrolling marquee */}
      <S23DealBanner />

      {/* 3. Key Features — 6-card grid */}
      <S23Features />

      {/* 4. Pricing & CTA — with urgency timer & stock indicator */}
      <S23Pricing id="s23-pricing" />

      {/* 5. Brand Story */}
      <S23Story />

      {/* 6. Camera Deep-Dive */}
      <S23CameraSection />

      {/* 7. Specs + Box Contents */}
      <S23Specs />

      {/* 8. Customer Reviews — 17 reviews, 2-column grid */}
      <S23Reviews />

      {/* 9. FAQ — accordion */}
      <S23FAQ />

      {/* 10. Sticky CTA — appears when hero scrolls past viewport */}
      <S23StickyCTA />
    </div>
  );
}
