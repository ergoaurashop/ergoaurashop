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

export default function Edge70ProPlusDealBanner() {
  return (
    <div className="edge70proplus-deal-banner">
      <p className="edge70proplus-deal-banner-text">
        <LightningBoltIcon />
        <span className="edge70proplus-deal-banner-label">🔥 Limited Stock</span>
        Motorola Edge 70 Pro+ 5G at{" "}
        <span className="edge70proplus-deal-banner-highlight">₹37,474</span> only
        &mdash; Save{" "}
        <span className="edge70proplus-deal-banner-highlight">₹9,369</span>
        <span className="edge70proplus-deal-banner-label">20% OFF</span>
        <LightningBoltIcon />
        <span>Free Shipping</span>
        <LightningBoltIcon />
        <span>7-Day Replacement</span>
        <LightningBoltIcon />
        <span>Only 11 Units Left</span>
      </p>
    </div>
  );
}
