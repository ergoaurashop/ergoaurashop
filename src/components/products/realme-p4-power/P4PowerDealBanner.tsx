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

export default function P4PowerDealBanner() {
  return (
    <div className="p4power-deal-banner">
      <p className="p4power-deal-banner-text">
        <LightningBoltIcon />
        <span className="p4power-deal-banner-label">🔥 Limited Stock</span>
        realme P4 Power at{" "}
        <span className="p4power-deal-banner-highlight">₹23,639</span> only
        &mdash; Save{" "}
        <span className="p4power-deal-banner-highlight">₹5,910</span>
        <span className="p4power-deal-banner-label">20% OFF</span>
        <LightningBoltIcon />
        <span>Free Shipping</span>
        <LightningBoltIcon />
        <span>7-Day Replacement</span>
        <LightningBoltIcon />
        <span>Only 18 Units Left</span>
      </p>
    </div>
  );
}
