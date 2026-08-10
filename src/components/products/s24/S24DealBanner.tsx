"use client";

// SVG Lightning Bolt icon (replaces ⚡ emoji)
function LightningBoltIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="currentColor"
      stroke="none"
      style={{
        display: "inline",
        verticalAlign: "middle",
        margin: "0 4px",
      }}
    >
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

export default function S24DealBanner() {
  return (
    <div className="s24-deal-banner">
      <p className="s24-deal-banner-text">
        {/* SVG flame icon at start */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            display: "inline",
            verticalAlign: "middle",
            marginRight: "4px",
            flexShrink: 0,
          }}
        >
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
        <span className="s24-deal-banner-label">🔔 STOCK CLEARANCE</span>
        <span className="s24-deal-banner-highlight">Very Limited!</span>
        <LightningBoltIcon />
        MEGA DEAL
        <LightningBoltIcon />— S24 Ultra 62% OFF — ₹43,990/- —{" "}
        <span className="s24-deal-banner-label">⚠️ HURRY!</span> Buy Now Before
        It's Gone! —{/* SVG flame icon at end */}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            display: "inline",
            verticalAlign: "middle",
            marginLeft: "4px",
            flexShrink: 0,
          }}
        >
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      </p>
    </div>
  );
}
