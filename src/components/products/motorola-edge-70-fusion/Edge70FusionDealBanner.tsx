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

export default function Edge70FusionDealBanner() {
  return (
    <div className="edge70fusion-deal-banner">
      <p className="edge70fusion-deal-banner-text">
        <LightningBoltIcon />
        <span className="edge70fusion-deal-banner-label">🔥 Limited Stock</span>
        Motorola Edge 70 Fusion at{" "}
        <span className="edge70fusion-deal-banner-highlight">₹21,928</span> only
        &mdash; Save{" "}
        <span className="edge70fusion-deal-banner-highlight">₹5,482</span>
        <span className="edge70fusion-deal-banner-label">20% OFF</span>
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
