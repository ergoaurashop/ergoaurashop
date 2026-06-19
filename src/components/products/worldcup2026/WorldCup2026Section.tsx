"use client";

import "@/styles/worldcup2026.css";
import {
  WC2026_PRODUCT,
  WC2026_PRODUCT_IMAGES,
  WC2026_SIZES,
  WC2026_BUNDLE_OFFER,
  WC2026_REVIEWS,
  WC2026_REVIEW_SUMMARY,
  WC2026_FAQS,
  WC2026_FOLDER,
} from "@/lib/worldcup-2026-data";
import WCImageGallery from "./WCImageGallery";
import WCProductInfo from "./WCProductInfo";
import WCReviews from "./WCReviews";
import WCFaq from "./WCFaq";

/**
 * WorldCup2026Section — Main orchestrator component.
 * Renders the full Amazon-style product page for WorldCup 2026 products.
 * All CSS is scoped under .wc2026-page to prevent theme bleed-through.
 */
export default function WorldCup2026Section() {
  const product = WC2026_PRODUCT;
  const images = WC2026_PRODUCT_IMAGES;
  const sizes = WC2026_SIZES;
  const bundleOffer = WC2026_BUNDLE_OFFER;
  const reviews = WC2026_REVIEWS;
  const reviewSummary = WC2026_REVIEW_SUMMARY;
  const faqs = WC2026_FAQS;
  const folder = WC2026_FOLDER;

  return (
    <div className="wc2026-page">
      {/* Breadcrumb */}
      <div className="wc2026-container">
        <nav className="wc2026-breadcrumb">
          <a href="/">Home</a>
          <span className="sep">›</span>
          <a href="/categories">Worldcup 2026</a>
          <span className="sep">›</span>
          <span>{product.name}</span>
        </nav>
      </div>

      {/* Main product layout */}
      <div className="wc2026-container">
        <div className="wc2026-product">
          {/* Left: Image Gallery */}
          <WCImageGallery
            images={images}
            folder={folder}
            productName={product.name}
          />

          {/* Center: Product Info */}
          <WCProductInfo
            product={product}
            sizes={sizes}
            bundleOffer={bundleOffer}
            reviewSummary={reviewSummary}
            reviews={reviews}
            images={images}
            folder={folder}
          />

          {/* Right: Buy Box (desktop only) */}
          <WCProductInfo.BuyBox product={product} bundleOffer={bundleOffer} />
        </div>
      </div>

      {/* Reviews Section */}
      <WCReviews reviews={reviews} reviewSummary={reviewSummary} />

      {/* FAQ Section */}
      <WCFaq faqs={faqs} />

      {/* Sticky Mobile Cart Bar */}
      <WCProductInfo.MobileBar product={product} bundleOffer={bundleOffer} />
    </div>
  );
}
