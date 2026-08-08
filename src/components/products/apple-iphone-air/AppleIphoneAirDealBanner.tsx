"use client";

function LightningBoltIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      width="14"
      height="14"
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export default function AppleIphoneAirDealBanner() {
  return (
    <div className="appleiphoneair-deal-banner">
      <p className="appleiphoneair-deal-banner-text">
        <LightningBoltIcon />
        <span className="appleiphoneair-deal-banner-label">🔥 Limited Stock</span>
        Apple iPhone Air at{" "}
        <span className="appleiphoneair-deal-banner-highlight">₹65,920</span> only
        &mdash; Save{" "}
        <span className="appleiphoneair-deal-banner-highlight">₹53,980</span>
        <span className="appleiphoneair-deal-banner-label">45% OFF</span>
        <LightningBoltIcon />
        <span>Free Shipping</span>
        <LightningBoltIcon />
        <span>7-Day Replacement</span>
        <LightningBoltIcon />
        <span>Only 12 Units Left</span>
      </p>
    </div>
  );
}
