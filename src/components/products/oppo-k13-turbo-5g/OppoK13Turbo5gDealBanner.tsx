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

export default function OppoK13Turbo5gDealBanner() {
  return (
    <div className="oppok13turbo5g-deal-banner">
      <p className="oppok13turbo5g-deal-banner-text">
        <LightningBoltIcon />
        <span className="oppok13turbo5g-deal-banner-label">
          🔥 Limited Stock
        </span>
        OPPO K13 Turbo 5G at{" "}
        <span className="oppok13turbo5g-deal-banner-highlight">₹23,999</span>{" "}
        only &mdash; Save{" "}
        <span className="oppok13turbo5g-deal-banner-highlight">₹6,000</span>
        <span className="oppok13turbo5g-deal-banner-label">20% OFF</span>
        <LightningBoltIcon />
        <span>Free Shipping</span>
        <LightningBoltIcon />
        <span>7-Day Replacement</span>
        <LightningBoltIcon />
        <span>Only 17 Units Left</span>
      </p>
    </div>
  );
}
