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

export default function NordCe6DealBanner() {
  return (
    <div className="nordce6-deal-banner">
      <p className="nordce6-deal-banner-text">
        <LightningBoltIcon />
        <span className="nordce6-deal-banner-label">🔥 Limited Stock</span>
        OnePlus Nord CE 6 5G at{" "}
        <span className="nordce6-deal-banner-highlight">₹23,998</span> only
        &mdash; Save{" "}
        <span className="nordce6-deal-banner-highlight">₹6,000</span>
        <span className="nordce6-deal-banner-label">20% OFF</span>
        <LightningBoltIcon />
        <span>Free Shipping</span>
        <LightningBoltIcon />
        <span>7-Day Replacement</span>
        <LightningBoltIcon />
        <span>Only 22 Units Left</span>
      </p>
    </div>
  );
}
