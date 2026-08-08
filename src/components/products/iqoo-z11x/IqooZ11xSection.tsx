"use client";

import "@/styles/iqoo-z11x.css";
import IqooZ11xHero from "./IqooZ11xHero";
import IqooZ11xDealBanner from "./IqooZ11xDealBanner";
import IqooZ11xFullWidthImage from "./IqooZ11xFullWidthImage";
import IqooZ11xStory from "./IqooZ11xStory";
import IqooZ11xFeatures from "./IqooZ11xFeatures";
import IqooZ11xVideoSection from "./IqooZ11xVideoSection";
import IqooZ11xCameraSection from "./IqooZ11xCameraSection";
import IqooZ11xPricing from "./IqooZ11xPricing";
import IqooZ11xSpecs from "./IqooZ11xSpecs";
import IqooZ11xReviews from "./IqooZ11xReviews";
import IqooZ11xFAQ from "./IqooZ11xFAQ";
import IqooZ11xStickyCTA from "./IqooZ11xStickyCTA";
import IPhoneBanner from "../iphone-15-pro-max/IPhoneBanner";
import S23Banner from "../s23/S23Banner";

/**
 * IqooZ11xSection — Main orchestrator component.
 * Renders the full iQOO Z11x product page with all sections.
 * All CSS is scoped under .iqooz11x-page to prevent theme bleed-through.
 * The iPhone + Samsung banners are inserted below the page contents (above the FAQ).
 */
export default function IqooZ11xSection() {
  return (
    <div className="iqooz11x-page">
      {/* 1. Hero — full-screen image carousel */}
      <IqooZ11xHero />

      {/* 2. Deal Banner — scrolling marquee with SVG lightning icons */}
      <IqooZ11xDealBanner />

      {/* 3. Full-Width Image — 50vh product hero shot with ad sentence */}
      <IqooZ11xFullWidthImage />

      {/* 4. Brand Story */}
      <IqooZ11xStory />

      {/* 5. Key Features — alternating image/text pattern */}
      <IqooZ11xFeatures />

      {/* 6. Full-width feature spotlight section */}
      <IqooZ11xVideoSection />

      {/* 7. Camera Deep-Dive — alternating pattern */}
      <IqooZ11xCameraSection />

      {/* 8. Pricing & CTA — with urgency timer, stock indicator, direct checkout */}
      <IqooZ11xPricing id="iqooz11x-pricing" />

      {/* 9. Specs + Box Contents */}
      <IqooZ11xSpecs />

      {/* 10. Customer Reviews — Amazon-style with white bg, blue accents */}
      <IqooZ11xReviews />

      {/* iPhone + Samsung banner — below page contents, above the FAQ */}
      <div className="section-container py-6">
        <IPhoneBanner />
      </div>
      <div className="section-container py-6">
        <S23Banner />
      </div>

      {/* 11. FAQ — accordion */}
      <IqooZ11xFAQ />

      {/* 12. Sticky CTA — always visible, animated gradient bg, product image */}
      <IqooZ11xStickyCTA />
    </div>
  );
}
