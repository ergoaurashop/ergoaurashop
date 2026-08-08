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

export default function LavaAgni4DealBanner() {
  return (
    <div className="lavaagni4-deal-banner">
      <p className="lavaagni4-deal-banner-text">
        <LightningBoltIcon />
        <span className="lavaagni4-deal-banner-label">🔥 Limited Stock</span>
        Lava Agni 4 at{" "}
        <span className="lavaagni4-deal-banner-highlight">₹21,599</span> only
        &mdash; Save{" "}
        <span className="lavaagni4-deal-banner-highlight">₹5,400</span>
        <span className="lavaagni4-deal-banner-label">20% OFF</span>
        <LightningBoltIcon />
        <span>Free Shipping</span>
        <LightningBoltIcon />
        <span>7-Day Replacement</span>
        <LightningBoltIcon />
        <span>Only 10 Units Left</span>
      </p>
    </div>
  );
}
