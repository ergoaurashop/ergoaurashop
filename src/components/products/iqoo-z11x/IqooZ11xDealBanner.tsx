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

export default function IqooZ11xDealBanner() {
  return (
    <div className="iqooz11x-deal-banner">
      <p className="iqooz11x-deal-banner-text">
        <LightningBoltIcon />
        <span className="iqooz11x-deal-banner-label">🔥 Limited Stock</span>
        iQOO Z11x at{" "}
        <span className="iqooz11x-deal-banner-highlight">₹19,999</span> only
        &mdash; Save{" "}
        <span className="iqooz11x-deal-banner-highlight">₹5,000</span>
        <span className="iqooz11x-deal-banner-label">20% OFF</span>
        <LightningBoltIcon />
        <span>Free Shipping</span>
        <LightningBoltIcon />
        <span>7-Day Replacement</span>
        <LightningBoltIcon />
        <span>Only 25 Units Left</span>
      </p>
    </div>
  );
}
