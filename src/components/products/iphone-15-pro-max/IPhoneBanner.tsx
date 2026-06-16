"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IPHONE_PRODUCT } from "@/lib/iphone-15-pro-max-data";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

type StorageOption = "512GB" | "256GB" | "1TB";

const STORAGE_OPTIONS: { label: string; value: StorageOption }[] = [
  { label: "512 GB", value: "512GB" },
  { label: "256 GB", value: "256GB" },
  { label: "1 TB", value: "1TB" },
];

const DOT_GRID_SVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Ccircle cx='20' cy='20' r='0.8' fill='rgba(255,255,255,0.04)'/%3E%3C/svg%3E`;

export default function IPhoneBanner() {
  const router = useRouter();
  const [activeStorage, setActiveStorage] = useState<StorageOption>("512GB");
  const [isHovered, setIsHovered] = useState(false);

  const handleBuyNow = () => {
    useCartStore.getState().addItem(IPHONE_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <section
      className="relative w-full h-[220px] overflow-hidden rounded-[16px]"
      style={{ background: "#000" }}
    >
      {/* ── Background layers (z-index: 0) ── */}

      {/* Dot grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("${DOT_GRID_SVG}")`,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Radial spotlight blobs */}
      <div
        className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at top right, rgba(255,255,255,0.09) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-[350px] h-[250px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at bottom left, rgba(255,255,255,0.05) 0%, transparent 70%)",
        }}
      />

      {/* Decorative concentric circles (top-right quadrant) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-60px",
          right: "80px",
          width: "280px",
          height: "280px",
          border: "0.5px solid rgba(255,255,255,0.12)",
          borderRadius: "50%",
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: "-10px",
          right: "130px",
          width: "180px",
          height: "180px",
          border: "0.5px solid rgba(255,255,255,0.12)",
          borderRadius: "50%",
        }}
      />

      {/* Vertical hairline dividers */}
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: "30%",
          width: "0.5px",
          height: "100%",
          background: "rgba(255,255,255,0.06)",
        }}
      />
      <div
        className="absolute top-0 bottom-0 pointer-events-none"
        style={{
          left: "72%",
          width: "0.5px",
          height: "100%",
          background: "rgba(255,255,255,0.06)",
        }}
      />

      {/* ── Content layers (z-index: 10) ── */}
      <div className="relative z-10 flex items-center h-full">
        {/* ── LEFT COLUMN ── */}
        <div
          className="shrink-0 h-full flex flex-col justify-center gap-[6px]"
          style={{ maxWidth: "320px", padding: "0 36px" }}
        >
          {/* Badge pill */}
          <div
            className="inline-flex items-center gap-[5px] self-start px-[8px] py-[3px] rounded-full uppercase leading-none"
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "0.5px solid rgba(255,255,255,0.18)",
              fontSize: "11px",
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <span style={{ color: "#fff", fontSize: "8px", lineHeight: 1 }}>
              ●
            </span>
            Brand New · 2024
          </div>

          {/* Title */}
          <div className="flex items-baseline gap-[2px]">
            <span
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              iPhone 15{" "}
              <span style={{ color: "rgba(255,255,255,0.35)" }}>/</span>
            </span>
            <span
              style={{
                fontSize: "26px",
                fontWeight: 700,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              {" "}
              Pro Max
            </span>
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "12px",
              color: "rgba(255,255,255,0.45)",
              lineHeight: 1.3,
            }}
          >
            512GB · Black Titanium / A17 Pro · Titanium design · ProRes video
          </p>

          {/* Storage pills */}
          <div className="flex items-center gap-[5px]">
            {STORAGE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => setActiveStorage(opt.value)}
                style={{
                  padding: "3px 8px",
                  borderRadius: "6px",
                  fontSize: "10px",
                  lineHeight: 1.4,
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 150ms ease",
                  background:
                    activeStorage === opt.value
                      ? "rgba(255,255,255,0.15)"
                      : "rgba(255,255,255,0.07)",
                  color:
                    activeStorage === opt.value
                      ? "#fff"
                      : "rgba(255,255,255,0.35)",
                }}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Buy Now button */}
          <button
            onClick={handleBuyNow}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 22px",
              borderRadius: "8px",
              fontSize: "13px",
              fontWeight: 600,
              lineHeight: 1,
              border: "none",
              cursor: "pointer",
              alignSelf: "flex-start",
              background: isHovered ? "#e5e5e5" : "#fff",
              color: "#000",
              transform: isHovered ? "scale(0.98)" : "scale(1)",
              transition: "all 150ms ease",
            }}
          >
            BUY NOW{" "}
            <span style={{ fontSize: "15px", lineHeight: 1 }}>&rarr;</span>
          </button>
        </div>

        {/* ── CENTER COLUMN — SVG iPhone ── */}
        <div
          className="shrink-0 flex items-center justify-center"
          style={{ width: "170px" }}
        >
          <svg
            width="90"
            height="175"
            viewBox="0 0 90 175"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="screenShimmer" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
                <stop offset="100%" stopColor="transparent" />
              </linearGradient>
            </defs>

            {/* Outer shell */}
            <rect
              x="1"
              y="1"
              width="88"
              height="173"
              rx="18"
              fill="#111"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.8"
            />

            {/* Inner layer 1 */}
            <rect
              x="3.5"
              y="4"
              width="83"
              height="167"
              rx="16"
              fill="#0a0a0a"
            />

            {/* Inner layer 2 */}
            <rect
              x="5.5"
              y="6"
              width="79"
              height="163"
              rx="14"
              fill="#050505"
            />

            {/* Inner layer 3 */}
            <rect
              x="7.5"
              y="8"
              width="75"
              height="159"
              rx="13"
              fill="#0e0e0e"
            />

            {/* Screen area */}
            <rect x="10" y="14" width="70" height="148" rx="8" fill="#000" />

            {/* Screen shimmer overlay */}
            <rect
              x="10"
              y="14"
              width="70"
              height="148"
              rx="8"
              fill="url(#screenShimmer)"
            />

            {/* Dynamic Island */}
            <rect
              x="27"
              y="18"
              width="36"
              height="10"
              rx="5"
              fill="#000"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="0.3"
            />

            {/* Screen content lines */}
            <rect
              x="18"
              y="36"
              width="24"
              height="3"
              rx="1.5"
              fill="rgba(255,255,255,0.08)"
            />
            <rect
              x="18"
              y="43"
              width="18"
              height="2"
              rx="1"
              fill="rgba(255,255,255,0.05)"
            />
            <rect
              x="18"
              y="52"
              width="30"
              height="18"
              rx="3"
              fill="rgba(255,255,255,0.04)"
            />
            <rect
              x="18"
              y="75"
              width="28"
              height="2"
              rx="1"
              fill="rgba(255,255,255,0.06)"
            />
            <rect
              x="18"
              y="81"
              width="20"
              height="2"
              rx="1"
              fill="rgba(255,255,255,0.04)"
            />
            <rect
              x="18"
              y="90"
              width="26"
              height="2"
              rx="1"
              fill="rgba(255,255,255,0.06)"
            />
            <rect
              x="18"
              y="96"
              width="22"
              height="2"
              rx="1"
              fill="rgba(255,255,255,0.04)"
            />
            <rect
              x="18"
              y="105"
              width="30"
              height="2"
              rx="1"
              fill="rgba(255,255,255,0.06)"
            />
            <rect
              x="18"
              y="111"
              width="16"
              height="2"
              rx="1"
              fill="rgba(255,255,255,0.04)"
            />

            {/* Bottom indicator bar */}
            <rect
              x="30"
              y="150"
              width="30"
              height="3"
              rx="1.5"
              fill="rgba(255,255,255,0.08)"
            />

            {/* Side buttons — right */}
            <rect
              x="89"
              y="42"
              width="1.5"
              height="16"
              rx="0.75"
              fill="rgba(255,255,255,0.12)"
            />
            <rect
              x="89"
              y="64"
              width="1.5"
              height="32"
              rx="0.75"
              fill="rgba(255,255,255,0.12)"
            />
            <rect
              x="89"
              y="102"
              width="1.5"
              height="14"
              rx="0.75"
              fill="rgba(255,255,255,0.12)"
            />

            {/* Side buttons — left */}
            <rect
              x="-0.5"
              y="55"
              width="1.5"
              height="8"
              rx="0.75"
              fill="rgba(255,255,255,0.10)"
            />
            <rect
              x="-0.5"
              y="67"
              width="1.5"
              height="28"
              rx="0.75"
              fill="rgba(255,255,255,0.10)"
            />
          </svg>
        </div>

        {/* ── RIGHT COLUMN ── */}
        <div
          className="flex-1 h-full flex flex-col justify-center gap-[8px]"
          style={{ padding: "0 24px 0 12px" }}
        >
          {/* Price card */}
          <div
            className="flex flex-col"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "0.5px solid rgba(255,255,255,0.1)",
              borderRadius: "10px",
              padding: "12px 16px",
            }}
          >
            <div className="flex items-baseline gap-[6px]">
              <span
                style={{
                  fontSize: "11px",
                  color: "rgba(255,255,255,0.3)",
                  textDecoration: "line-through",
                }}
              >
                {formatPrice(IPHONE_PRODUCT.original_price ?? 0)}
              </span>
              <span
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "#fff",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.1,
                }}
              >
                {formatPrice(IPHONE_PRODUCT.price)}
              </span>
            </div>
            <span
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.4)",
                marginTop: "2px",
              }}
            >
              Free delivery · 2-yr warranty
            </span>
          </div>

          {/* Stats row */}
          <div
            className="flex items-center"
            style={{ gap: "16px", height: "36px" }}
          >
            {[
              { value: "48MP", label: "Camera" },
              { value: "A17", label: "Pro chip" },
              { value: "29h", label: "Battery" },
            ].map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-[16px]">
                <div className="flex flex-col">
                  <span
                    style={{
                      fontSize: "20px",
                      fontWeight: 700,
                      color: "#fff",
                      lineHeight: 1.1,
                    }}
                  >
                    {stat.value}
                  </span>
                  <span
                    style={{
                      fontSize: "10px",
                      color: "rgba(255,255,255,0.35)",
                      textTransform: "uppercase",
                      letterSpacing: "0.02em",
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.label}
                  </span>
                </div>
                {i < 2 && (
                  <div
                    style={{
                      width: "1px",
                      height: "40px",
                      background: "rgba(255,255,255,0.08)",
                      flexShrink: 0,
                    }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Star rating */}
          <div className="flex items-center gap-[6px]">
            <span style={{ fontSize: "12px", color: "#fff", lineHeight: 1 }}>
              ★★★★★
            </span>
            <span
              style={{
                fontSize: "10px",
                color: "rgba(255,255,255,0.4)",
                lineHeight: 1,
              }}
            >
              4.9 · 158+ reviews
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
