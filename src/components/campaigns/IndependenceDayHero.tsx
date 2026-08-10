"use client";

import "@/styles/independence-day.css";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { S24_FOLDER, S24_HERO_IMAGES } from "@/lib/s24-ultra-data";

/* =====================================================================
   Independence Day Offer Week — Homepage Hero
   Pure-SVG animated Indian flag (filter primitives — no picture, no video).
   Temporarily replaces HeroProductShowcase via a one-line toggle in
   src/app/page.tsx. Reusable for future festivals: edit COUNTDOWN_END and
   the CARDS array below only.

   Campaign: 10–20 Aug 2026 · countdown ends 20 Aug 2026 23:59:59 IST
   ===================================================================== */

const COUNTDOWN_END = new Date("2026-08-20T23:59:59+05:30").getTime();

/* Real product hero images (encode path segments like src/lib/utils.ts) */
const IPHONE_17_PRO_IMG = `/images/products/${encodeURIComponent(
  "iPhone 17 Pro",
)}/${encodeURIComponent("iphone-1.jpg")}`;

const IPHONE_AIR_IMG = `/images/products/${encodeURIComponent(
  "iPhone Air",
)}/${encodeURIComponent("hero_design__capuizdf0uuu_large_2x.jpg")}`;

/* S24 Ultra — primary hero visual pulled from data file (auto-syncs) */
const S24_ULTRA_IMG = `/images/products/${S24_FOLDER.split("/")
  .map(encodeURIComponent)
  .join("/")}/${encodeURIComponent(S24_HERO_IMAGES[0])}`;

/* Precomputed 24 Ashoka Chakra spokes (static → zero runtime plotting) */
const CHAKRA_SPOKES = Array.from({ length: 24 }, (_, i) => {
  const angle = (i * 15 * Math.PI) / 180;
  return { x2: Math.cos(angle) * 88, y2: Math.sin(angle) * 88 };
});

/* Ambient tricolor particles — deterministic (avoids hydration mismatch) */
const PARTICLES: Array<{
  left: string;
  size: number;
  color: string;
  dur: number;
  delay: number;
  drift: number;
  opacity: number;
}> = [
  { left: "4%", size: 6, color: "#FF9933", dur: 13, delay: 0, drift: 22, opacity: 0.45 },
  { left: "12%", size: 4, color: "#FFFFFF", dur: 15, delay: 2.2, drift: -18, opacity: 0.4 },
  { left: "22%", size: 7, color: "#138808", dur: 12, delay: 4.1, drift: 26, opacity: 0.4 },
  { left: "30%", size: 5, color: "#FF9933", dur: 16, delay: 1.4, drift: -24, opacity: 0.5 },
  { left: "40%", size: 4, color: "#FFFFFF", dur: 13, delay: 5.6, drift: 18, opacity: 0.35 },
  { left: "48%", size: 6, color: "#138808", dur: 14, delay: 0.8, drift: -20, opacity: 0.42 },
  { left: "56%", size: 5, color: "#FF9933", dur: 15, delay: 3.3, drift: 24, opacity: 0.45 },
  { left: "64%", size: 4, color: "#FFFFFF", dur: 12, delay: 6.4, drift: -16, opacity: 0.38 },
  { left: "72%", size: 7, color: "#138808", dur: 16, delay: 2.6, drift: 20, opacity: 0.4 },
  { left: "80%", size: 5, color: "#FF9933", dur: 13, delay: 4.8, drift: -26, opacity: 0.45 },
  { left: "88%", size: 4, color: "#FFFFFF", dur: 15, delay: 1, drift: 18, opacity: 0.35 },
  { left: "95%", size: 6, color: "#138808", dur: 14, delay: 3.9, drift: -22, opacity: 0.42 },
];

/* Filler-card icons (sample's line-art style) */
const ICONS: Record<string, ReactNode> = {
  phone: (
    <>
      <rect x="8" y="3" width="8" height="18" rx="2" />
      <circle cx="12" cy="17.5" r="0.6" fill="currentColor" stroke="none" />
    </>
  ),
  earbuds: (
    <>
      <path d="M8 3a3 3 0 013 3v6a3 3 0 01-6 0V6a3 3 0 013-3z" />
      <path d="M16 3a3 3 0 00-3 3v6a3 3 0 006 0V6a3 3 0 00-3-3z" />
      <circle cx="8" cy="19" r="2" />
      <circle cx="16" cy="19" r="2" />
    </>
  ),
  watch: (
    <>
      <rect x="7" y="6" width="10" height="12" rx="3" />
      <path d="M9 6V3h6v3M9 18v3h6v-3" />
    </>
  ),
  powerbank: (
    <>
      <rect x="6" y="4" width="12" height="17" rx="2" />
      <path d="M13 8l-3.5 5H12l-1 4 4-5.5H12z" fill="currentColor" stroke="none" />
    </>
  ),
};

type DealCardData = {
  name: string;
  href: string;
  badge: string;
  color: string;
  iconKey?: keyof typeof ICONS;
  image?: string;
  now?: string;
  was?: string;
  comingSoon?: boolean;
};

/* Curated shelf cards — star cards are the real hero products */
const CARDS: DealCardData[] = [
  {
    name: "Apple iPhone 17 Pro",
    href: "/products/apple-iphone-17-pro",
    badge: "15% OFF",
    color: "#FF9933",
    image: IPHONE_17_PRO_IMG,
    now: "₹1,14,665",
    was: "₹1,34,900",
  },
  {
    name: "Apple iPhone Air",
    href: "/products/apple-iphone-air",
    badge: "20% OFF",
    color: "#138808",
    image: IPHONE_AIR_IMG,
    now: "₹95,920",
    was: "₹1,19,900",
  },
  {
    name: "Samsung Galaxy S24 Ultra",
    href: "/products/samsung-galaxy-s24-ultra",
    badge: "62% OFF",
    color: "#17348C",
    image: S24_ULTRA_IMG,
    now: "₹43,990",
    was: "₹1,16,299",
  },
  {
    name: "TWS Earbuds Pro",
    href: "/products",
    badge: "70% OFF",
    color: "#138808",
    iconKey: "earbuds",
    now: "₹1,199",
    was: "₹3,999",
  },
  {
    name: "Fitness Smartwatch",
    href: "/products",
    badge: "65% OFF",
    color: "#17348C",
    iconKey: "watch",
    now: "₹2,299",
    was: "₹6,499",
  },
  {
    name: "20000mAh Power Bank",
    href: "/products",
    badge: "64% OFF",
    color: "#FF9933",
    iconKey: "powerbank",
    now: "₹799",
    was: "₹2,199",
  },
];

const UNITS: { key: "d" | "h" | "m" | "s"; label: string }[] = [
  { key: "d", label: "Days" },
  { key: "h", label: "Hrs" },
  { key: "m", label: "Min" },
  { key: "s", label: "Sec" },
];

const TRUST_ITEMS: { label: string; icon: ReactNode }[] = [
  {
    label: "Secure Razorpay checkout",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <rect x="4" y="10" width="16" height="10" rx="2" />
        <path d="M8 10V7a4 4 0 018 0v3" />
      </svg>
    ),
  },
  {
    label: "Pan-India free shipping",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <rect x="1" y="7" width="14" height="10" />
        <path d="M15 10h4l3 3v4h-7z" />
        <circle cx="6" cy="19" r="1.8" />
        <circle cx="17.5" cy="19" r="1.8" />
      </svg>
    ),
  },
  {
    label: "7-day easy returns",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M3 12a9 9 0 109-9" />
        <path d="M3 3v6h6" />
      </svg>
    ),
  },
];

/* ── Framer Motion entrance choreography ─────────────────────────── */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const trustContainerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const trustItemVariants = {
  hidden: { opacity: 0, scale: 0.7 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function DealCard({ data }: { data: DealCardData }) {
  return (
    <Link href={data.href} className="id-p-card">
      <span className="id-p-badge">{data.badge}</span>
      <span
        className="id-p-visual"
        style={{ background: `${data.color}1f`, color: data.color }}
      >
        {data.image ? (
          <Image
            src={data.image}
            alt={data.name}
            fill
            sizes="56px"
            style={{ objectFit: "cover" }}
          />
        ) : (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.6}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {data.iconKey ? ICONS[data.iconKey] : null}
          </svg>
        )}
      </span>
      <span className="id-p-info">
        <span className="id-p-name">{data.name}</span>
        {data.comingSoon ? (
          <span className="id-p-coming">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            Coming Soon
          </span>
        ) : (
          <span className="id-p-price">
            <span className="id-p-now">{data.now}</span>
            <span className="id-p-was">{data.was}</span>
          </span>
        )}
      </span>
    </Link>
  );
}

export default function IndependenceDayHero() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });
  const [mounted, setMounted] = useState(false);

  /* countdown to 20 Aug 2026 23:59:59 IST */
  useEffect(() => {
    setMounted(true);
    const tick = () => {
      const diff = Math.max(0, COUNTDOWN_END - Date.now());
      setTimeLeft({
        d: Math.floor(diff / 86400000),
        h: Math.floor((diff % 86400000) / 3600000),
        m: Math.floor((diff % 3600000) / 60000),
        s: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  /* pause SMIL flag animation on reduced-motion + when tab hidden */
  useEffect(() => {
    const svg = svgRef.current;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");

    const pause = () => svg?.pauseAnimations();
    const resume = () => {
      if (!mq.matches) svg?.unpauseAnimations();
    };

    if (mq.matches) pause();

    const onVisibility = () => {
      if (document.hidden) pause();
      else resume();
    };
    const onPrefChange = (e: MediaQueryListEvent) => {
      if (e.matches) pause();
      else svg?.unpauseAnimations();
    };

    document.addEventListener("visibilitychange", onVisibility);
    mq.addEventListener("change", onPrefChange);

    return () => {
      document.removeEventListener("visibilitychange", onVisibility);
      mq.removeEventListener("change", onPrefChange);
    };
  }, []);

  const trackStyle = (speed: number) => ({ "--speed": `${speed}s` }) as CSSProperties;

  return (
    <section className="id-hero" aria-label="Independence Day Offer Week — up to 70% off">
      {/* ===== pure-SVG animated Indian flag ===== */}
      <svg
        className="id-flag-bg"
        ref={svgRef}
        viewBox="0 0 1600 720"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
        role="presentation"
        aria-hidden="true"
      >
        <defs>
          {/* desktop: full multi-layer cloth simulation */}
          <filter
            id="flagFilterFull"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence type="fractalNoise" baseFrequency="0.0035 0.010" numOctaves={2} seed={5} result="bigNoise">
              <animate
                attributeName="baseFrequency"
                dur="11s"
                values="0.0035 0.010;0.0050 0.014;0.0030 0.009;0.0035 0.010"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feTurbulence type="fractalNoise" baseFrequency="0.018 0.05" numOctaves={2} seed={11} result="smallNoise">
              <animate
                attributeName="baseFrequency"
                dur="5s"
                values="0.018 0.05;0.024 0.06;0.018 0.05"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feBlend in="bigNoise" in2="smallNoise" mode="screen" result="noiseMix" />

            <feDiffuseLighting in="noiseMix" surfaceScale={7} diffuseConstant={1.15} lightingColor="#ffffff" result="lightMap">
              <feDistantLight azimuth={230} elevation={58}>
                <animate attributeName="azimuth" values="195;265;195" dur="9s" repeatCount="indefinite" />
              </feDistantLight>
            </feDiffuseLighting>

            <feBlend in="SourceGraphic" in2="lightMap" mode="overlay" result="lit" />
            <feDisplacementMap in="lit" in2="noiseMix" scale={34} xChannelSelector="R" yChannelSelector="G" result="displaced" />
            <feColorMatrix in="displaced" type="saturate" values="1.15" result="saturated" />
            <feGaussianBlur in="saturated" stdDeviation={1.1} />
          </filter>

          {/* mobile (<700px): cheap single-turbulence fallback */}
          <filter id="flagFilterLite" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.018" numOctaves={2} seed={5} result="noise">
              <animate
                attributeName="baseFrequency"
                dur="9s"
                values="0.006 0.018;0.009 0.024;0.006 0.018"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={26} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>

        <g className="id-flagGroup">
          <rect x="0" y="0" width="1600" height="240" fill="#FF9933" />
          <rect x="0" y="240" width="1600" height="240" fill="#FFFFFF" />
          <rect x="0" y="480" width="1600" height="240" fill="#138808" />

          {/* Ashoka Chakra — plotted, not traced; slow CSS rotation */}
          <g className="id-chakra" transform="translate(800,360)">
            <circle r="92" fill="none" stroke="#17348C" strokeWidth={8} />
            <circle r="11" fill="#17348C" />
            {CHAKRA_SPOKES.map((s, i) => (
              <line key={i} x1={0} y1={0} x2={s.x2} y2={s.y2} stroke="#17348C" strokeWidth={4} />
            ))}
          </g>
        </g>
      </svg>

      {/* scrim for text legibility */}
      <div className="id-scrim" aria-hidden="true" />

      {/* ambient tricolor particles */}
      <div className="id-particles" aria-hidden="true">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="id-particle"
            style={
              {
                left: p.left,
                width: p.size,
                height: p.size,
                background: p.color,
                boxShadow: `0 0 ${p.size * 2}px ${p.color}66`,
                "--dur": `${p.dur}s`,
                "--delay": `${p.delay}s`,
                "--drift": `${p.drift}px`,
                "--max-opacity": p.opacity,
              } as CSSProperties
            }
          />
        ))}
      </div>

      {/* ===== foreground content panel ===== */}
      <motion.div
        className="id-hero-inner"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className="id-content-panel">
          <motion.p className="id-eyebrow" variants={itemVariants}>
            ErgoAura · Independence Day Offer Week
          </motion.p>

          <motion.h1 className="id-headline" variants={itemVariants}>
            <span className="id-lede id-tricolor">This 15th August,</span>
            Declare freedom
            <br />
            from <span className="id-accent">full price</span>
          </motion.h1>

          <motion.p className="id-subhead" variants={itemVariants}>
            One week only — steep cuts across smartphones, audio and everyday
            essentials. Every order ships free, anywhere in India.
          </motion.p>

          <motion.div className="id-cta-row" variants={itemVariants}>
            <span className="id-pill">Up to 70% OFF</span>
            <Link href="/products" className="id-btn">
              Shop the sale
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.4}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </motion.div>

          <motion.div className="id-countdown" variants={itemVariants}>
            <span className="id-countdown-label">Offer ends in</span>
            <div className="id-countdown-units">
              {UNITS.map((u) => (
                <div className="id-unit" key={u.key}>
                  <span className="num" key={mounted ? timeLeft[u.key] : "init"}>
                    {mounted ? String(timeLeft[u.key]).padStart(2, "0") : "--"}
                  </span>
                  <span className="lbl">{u.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="id-trust-row"
            variants={trustContainerVariants}
          >
            {TRUST_ITEMS.map((t) => (
              <motion.span key={t.label} className="id-trust-item" variants={trustItemVariants}>
                {t.icon}
                {t.label}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* scroll cue */}
      <motion.a
        className="id-scroll-cue"
        href="#id-shelf"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.85 }}
        transition={{ delay: 1.3, duration: 0.6 }}
      >
        Scroll for deals
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.2}
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </motion.a>

      {/* ===== floating deals shelf ===== */}
      <motion.div
        id="id-shelf"
        className="id-shelf-wrap"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.85, duration: 0.6, ease: "easeOut" }}
      >
        <div className="id-shelf-panel">
          <p className="id-shelf-title">
            <span className="id-shelf-flag" aria-hidden="true" />
            Today's deals — Independence Day special
          </p>

          <div className="id-marquee">
            <div className="id-marquee-track" style={trackStyle(34)}>
              {[...CARDS, ...CARDS].map((c, i) => (
                <DealCard key={`a-${c.name}-${i}`} data={c} />
              ))}
            </div>
          </div>

          <div className="id-marquee id-marquee--reverse" style={{ marginTop: 14 }}>
            <div className="id-marquee-track" style={trackStyle(42)}>
              {[...[...CARDS].reverse(), ...[...CARDS].reverse()].map((c, i) => (
                <DealCard key={`b-${c.name}-${i}`} data={c} />
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
