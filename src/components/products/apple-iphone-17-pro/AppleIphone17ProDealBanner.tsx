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

export default function AppleIphone17ProDealBanner() {
  return (
    <div className="appleiphone17pro-deal-banner">
      <p className="appleiphone17pro-deal-banner-text">
        <LightningBoltIcon />
        <span className="appleiphone17pro-deal-banner-label">🔥 Limited Stock</span>
        Apple iPhone 17 Pro at{" "}
        <span className="appleiphone17pro-deal-banner-highlight">₹89,920</span> only
        &mdash; Save{" "}
        <span className="appleiphone17pro-deal-banner-highlight">₹44,980</span>
        <span className="appleiphone17pro-deal-banner-label">33% OFF</span>
        <LightningBoltIcon />
        <span>Free Shipping</span>
        <LightningBoltIcon />
        <span>7-Day Replacement</span>
        <LightningBoltIcon />
        <span>Only 9 Units Left</span>
      </p>
    </div>
  );
}
