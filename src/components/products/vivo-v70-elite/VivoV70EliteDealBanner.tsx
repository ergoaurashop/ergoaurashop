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

export default function VivoV70EliteDealBanner() {
  return (
    <div className="vivov70elite-deal-banner">
      <p className="vivov70elite-deal-banner-text">
        <LightningBoltIcon />
        <span className="vivov70elite-deal-banner-label">🔥 Limited Stock</span>
        vivo V70 Elite at{" "}
        <span className="vivov70elite-deal-banner-highlight">₹36,799</span> only
        &mdash; Save{" "}
        <span className="vivov70elite-deal-banner-highlight">₹9,200</span>
        <span className="vivov70elite-deal-banner-label">20% OFF</span>
        <LightningBoltIcon />
        <span>Free Shipping</span>
        <LightningBoltIcon />
        <span>7-Day Replacement</span>
        <LightningBoltIcon />
        <span>Only 14 Units Left</span>
      </p>
    </div>
  );
}
