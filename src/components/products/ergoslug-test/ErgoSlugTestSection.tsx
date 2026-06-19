"use client";

import "@/styles/worldcup2026.css";
import {
  ERGO_TEST_PRODUCT,
  ERGO_TEST_PRODUCT_IMAGES,
  ERGO_TEST_SIZES,
  ERGO_TEST_BUNDLE_OFFER,
  ERGO_TEST_REVIEWS,
  ERGO_TEST_REVIEW_SUMMARY,
  ERGO_TEST_FAQS,
  ERGO_TEST_FOLDER,
} from "@/lib/ergoslug-test-data";
import WCImageGallery from "@/components/products/worldcup2026/WCImageGallery";
import WCProductInfo from "@/components/products/worldcup2026/WCProductInfo";
import WCReviews from "@/components/products/worldcup2026/WCReviews";
import WCFaq from "@/components/products/worldcup2026/WCFaq";

/**
 * ErgoSlugTestSection — Payment test page.
 * Exact duplicate of the Messi Argentina 2026 Jersey page
 * with price changed to ₹1. NOT indexed or in sitemap.
 */
export default function ErgoSlugTestSection() {
  const product = ERGO_TEST_PRODUCT;
  const images = ERGO_TEST_PRODUCT_IMAGES;
  const sizes = ERGO_TEST_SIZES;
  const bundleOffer = ERGO_TEST_BUNDLE_OFFER;
  const reviews = ERGO_TEST_REVIEWS;
  const reviewSummary = ERGO_TEST_REVIEW_SUMMARY;
  const faqs = ERGO_TEST_FAQS;
  const folder = ERGO_TEST_FOLDER;

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
