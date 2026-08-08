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

export default function PocoX8ProMaxDealBanner() {
  return (
    <div className="pocox8promax-deal-banner">
      <p className="pocox8promax-deal-banner-text">
        <LightningBoltIcon />
        <span className="pocox8promax-deal-banner-label">🔥 Limited Stock</span>
        POCO X8 Pro Max at{" "}
        <span className="pocox8promax-deal-banner-highlight">₹39,992</span> only
        &mdash; Save{" "}
        <span className="pocox8promax-deal-banner-highlight">₹9,998</span>
        <span className="pocox8promax-deal-banner-label">20% OFF</span>
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
