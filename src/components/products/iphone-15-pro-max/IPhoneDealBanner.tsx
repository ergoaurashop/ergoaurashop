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

export default function IPhoneDealBanner() {
  return (
    <div className="iphone-deal-banner">
      <p className="iphone-deal-banner-text">
        <LightningBoltIcon />
        <span className="iphone-deal-banner-label">🔥 Limited Stock</span>
        iPhone 15 Pro Max 512GB at{" "}
        <span className="iphone-deal-banner-highlight">₹46,990</span> only —
        Save <span className="iphone-deal-banner-highlight">₹48,004</span>
        <span className="iphone-deal-banner-label">51% OFF</span>
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
