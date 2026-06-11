"use client";

/**
 * TrustMarquee — Infinite scrolling trust badges
 *
 * Displays a fixed strip at the top of the viewport with 10 trust/social-proof
 * signals scrolling horizontally via pure CSS animation. Pauses on hover.
 *
 * This component appears on every page (rendered in RootLayout).
 */

const TRUST_ITEMS = [
  { icon: "🏆", label: "10,000+ Happy Customers" },
  { icon: "🚚", label: "Free Delivery All Orders" },
  { icon: "🔒", label: "100% Secure Checkout" },
  { icon: "🔄", label: "7-Day Easy Returns" },
  { icon: "⭐", label: "Premium Quality Products" },
  { icon: "💰", label: "Best Price Guarantee" },
  { icon: "📞", label: "24/7 Customer Support" },
  { icon: "⚡", label: "Same Day Dispatch" },
  { icon: "🛡️", label: "100% Original Guaranteed" },
  { icon: "🇮🇳", label: "Made with Love in India" },
] as const;

/** Gold diamond bullet separator */
function Separator() {
  return (
    <span
      className="mx-4 sm:mx-6 text-[#C9A962]/40 select-none"
      aria-hidden="true"
    >
      ◆
    </span>
  );
}

/** Single trust badge: icon + label */
function TrustBadge({ icon, label }: { icon: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm leading-none">
      <span className="text-[#DFC48A] shrink-0" aria-hidden="true">
        {icon}
      </span>
      <span className="text-[#D8CFBF] font-medium whitespace-nowrap">
        {label}
      </span>
    </span>
  );
}

/** Full set of items joined by separators */
function TrustSet() {
  return (
    <>
      {TRUST_ITEMS.map((item, i) => (
        <span key={i} className="inline-flex items-center">
          {i > 0 && <Separator />}
          <TrustBadge icon={item.icon} label={item.label} />
        </span>
      ))}
    </>
  );
}

export default function TrustMarquee() {
  return (
    <div
      className="group fixed top-0 left-0 right-0 z-50 h-10 overflow-hidden
                 bg-[#1A1614] border-t-2 border-[#C9A962]
                 shadow-[0_2px_12px_rgba(201,169,98,0.15)]
                 print:hidden"
      role="presentation"
      aria-hidden="true"
    >
      {/* Track — pauses on hover via group */}
      <div
        className="marquee-track
                   group-hover:[animation-play-state:paused]
                   flex items-center h-full"
      >
        {/* Two copies for seamless loop */}
        <span className="flex items-center shrink-0">
          <TrustSet />
          <Separator />
        </span>
        <span className="flex items-center shrink-0">
          <TrustSet />
          <Separator />
        </span>
      </div>
    </div>
  );
}
