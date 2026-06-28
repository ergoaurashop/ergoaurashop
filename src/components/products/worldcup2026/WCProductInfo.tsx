"use client";

import { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { Product, ProductReviewDetail } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

/* ── Types ── */
interface WCProductInfoProps {
  product: Product;
  sizes: string[];
  bundleOffer: {
    title: string;
    description: string;
    buyQuantity: number;
    freeQuantity: number;
  };
  reviewSummary: {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: Record<number, number>;
  };
  reviews: ProductReviewDetail[];
  images: string[];
  folder: string;
}

interface BuyBoxProps {
  product: Product;
  bundleOffer: {
    title: string;
    description: string;
    buyQuantity: number;
    freeQuantity: number;
  };
}

interface MobileBarProps {
  product: Product;
  bundleOffer: {
    title: string;
    description: string;
    buyQuantity: number;
    freeQuantity: number;
  };
}

/* ── Star Rating Helper ── */
function Stars({ rating, size = 16 }: { rating: number; size?: number }) {
  return (
    <span className="wc2026-stars" style={{ gap: 1 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className="wc2026-star"
          style={{ width: size, height: size }}
          viewBox="0 0 24 24"
          fill={star <= rating ? "#ffa41c" : "#ddd"}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

/* ── Main Product Info Component ── */
export default function WCProductInfo({
  product,
  sizes,
  bundleOffer,
  reviewSummary,
  reviews,
  images,
  folder,
}: WCProductInfoProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) {
      setToast("Please select a size");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    setIsAdding(true);
    addItem(product, quantity);
    setToast(`Added ${quantity} item(s) to cart`);
    setTimeout(() => {
      setToast(null);
      setIsAdding(false);
    }, 2000);
  }, [product, quantity, selectedSize, addItem]);

  const handleBuyNow = useCallback(() => {
    if (!selectedSize) {
      setToast("Please select a size");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    addItem(product, quantity);
    router.push("/checkout");
  }, [product, quantity, selectedSize, addItem, router]);

  const savings = product.original_price
    ? product.original_price - product.price
    : 0;
  const savingsPercent = product.discount_percentage;

  // ── Dynamic delivery dates & countdown ──
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0 });
  const [tomorrowFormatted, setTomorrowFormatted] = useState("");

  useEffect(() => {
    const dubaiOffset = 240; // UTC+4 in minutes
    const now = new Date();
    const dubaiNow = new Date(
      now.getTime() + (now.getTimezoneOffset() + dubaiOffset) * 60000,
    );

    // Tomorrow's date
    const tomorrow = new Date(dubaiNow);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setTomorrowFormatted(
      `${tomorrow.getDate()} ${months[tomorrow.getMonth()]}`,
    );

    // Countdown to 11:59 PM Dubai time
    const cutoff = new Date(dubaiNow);
    cutoff.setHours(23, 59, 0, 0);

    function updateTimer() {
      const now2 = new Date();
      const dubaiNow2 = new Date(
        now2.getTime() + (now2.getTimezoneOffset() + dubaiOffset) * 60000,
      );
      const diffMs = cutoff.getTime() - dubaiNow2.getTime();

      if (diffMs <= 0) {
        setTimeLeft({ hours: 0, minutes: 0 });
        return;
      }

      const totalMinutes = Math.floor(diffMs / 60000);
      const hours = Math.floor(totalMinutes / 60);
      const minutes = totalMinutes % 60;
      setTimeLeft({ hours, minutes });
    }

    updateTimer();
    const interval = setInterval(updateTimer, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="wc2026-info">
      {/* ── Title ── */}
      <h1 className="wc2026-title">{product.name}</h1>

      {/* ── Brand Link ── */}
      {product.specifications?.Brand && (
        <a href="/categories" className="wc2026-brand-link">
          Visit the {product.specifications.Brand} Store
        </a>
      )}

      {/* ── Rating Row ── */}
      <div className="wc2026-rating-row">
        <Stars rating={reviewSummary.averageRating} />
        <span className="wc2026-rating-count">
          {reviewSummary.totalReviews.toLocaleString()} ratings
        </span>
        <span style={{ color: "#ccc", fontSize: 12 }}>|</span>
        <span style={{ fontSize: 13, color: "#565959" }}>
          {reviewSummary.totalReviews > 100
            ? `${(reviewSummary.averageRating * 20).toFixed(0)}%+ bought in past month`
            : "Top rated"}
        </span>
      </div>

      <hr className="wc2026-divider" />

      {/* ── Price ── */}
      <div className="wc2026-price-section">
        <p className="wc2026-price-label">
          {product.specifications?.Brand || "Brand"}: {product.name}
        </p>
        <div className="wc2026-price">
          <span className="wc2026-price-current">
            <span className="wc2026-price-symbol">₹</span>
            {product.price}
          </span>
          {product.original_price && product.original_price > product.price && (
            <>
              <span className="wc2026-price-original">
                M.R.P.: ₹{product.original_price}
              </span>
              <span className="wc2026-price-discount">
                ({savingsPercent}% off)
              </span>
            </>
          )}
        </div>
        <p className="wc2026-price-tax">Inclusive of all taxes</p>
        <p style={{ fontSize: 13, color: "#565959" }}>
          <strong style={{ color: "#0f1111" }}>FREE delivery</strong> Tomorrow,{" "}
          {tomorrowFormatted}.{" "}
          <a href="/" style={{ color: "#007185", textDecoration: "none" }}>
            Order within {timeLeft.hours} hrs {timeLeft.minutes} mins
          </a>
        </p>
        <p style={{ fontSize: 13, color: "#565959" }}>
          Or fastest delivery Tomorrow, {tomorrowFormatted}
        </p>
      </div>

      <hr className="wc2026-divider" />

      {/* ── Bundle Offer ── */}
      {bundleOffer && (
        <div className="wc2026-bundle-banner">
          <div className="wc2026-bundle-icon">🎁</div>
          <div className="wc2026-bundle-content">
            <p className="wc2026-bundle-title">{bundleOffer.title}</p>
            <p className="wc2026-bundle-desc">{bundleOffer.description}</p>
          </div>
        </div>
      )}

      <hr className="wc2026-divider" />

      {/* ── Size Selector ── */}
      {sizes && sizes.length > 0 && (
        <div className="wc2026-size-section">
          <p className="wc2026-size-label">
            Size:
            <span className="wc2026-size-selected">
              {selectedSize || "Select"}
            </span>
          </p>
          <div className="wc2026-sizes">
            {sizes.map((size) => (
              <button
                key={size}
                className={`wc2026-size-btn ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      <hr className="wc2026-divider" />

      {/* ── About This Item ── */}
      {product.features && product.features.length > 0 && (
        <div className="wc2026-about">
          <h2 className="wc2026-about-title">About this item</h2>
          <ul className="wc2026-about-list">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </div>
      )}

      <hr className="wc2026-divider" />

      {/* ── Specifications ── */}
      {product.specifications &&
        Object.keys(product.specifications).length > 0 && (
          <div className="wc2026-specs">
            <h2 className="wc2026-specs-title">Product information</h2>
            <table className="wc2026-specs-table">
              <tbody>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <tr key={key}>
                    <td>{key}</td>
                    <td>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      {/* ── Toast notification ── */}
      {toast && <Toast message={toast} onComplete={() => setToast(null)} />}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════════════
   Buy Box — Desktop Right Column
   ═════════════════════════════════════════════════════════════════════ */
WCProductInfo.BuyBox = function BuyBox({ product, bundleOffer }: BuyBoxProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [toast, setToast] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [buyBoxTomorrow, setBuyBoxTomorrow] = useState("");

  useEffect(() => {
    const dubaiOffset = 240; // UTC+4 in minutes
    const now = new Date();
    const dubaiNow = new Date(
      now.getTime() + (now.getTimezoneOffset() + dubaiOffset) * 60000,
    );
    const tomorrow = new Date(dubaiNow);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setBuyBoxTomorrow(`${tomorrow.getDate()} ${months[tomorrow.getMonth()]}`);
  }, []);

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) {
      setToast("Please select a size");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    setIsAdding(true);
    addItem(product, quantity);
    setToast(`Added ${quantity} item(s) to cart`);
    setTimeout(() => {
      setToast(null);
      setIsAdding(false);
    }, 2000);
  }, [product, quantity, selectedSize, addItem]);

  const handleBuyNow = useCallback(() => {
    if (!selectedSize) {
      setToast("Please select a size");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    addItem(product, quantity);
    router.push("/checkout");
  }, [product, quantity, selectedSize, addItem, router]);

  return (
    <div className="wc2026-buy-box">
      {/* Price */}
      <div className="wc2026-buy-price">
        <span className="wc2026-buy-price-symbol">₹</span>
        {product.price}
      </div>
      {product.original_price && product.original_price > product.price && (
        <div style={{ fontSize: 13, color: "#565959", marginBottom: 4 }}>
          M.R.P.:{" "}
          <span style={{ textDecoration: "line-through" }}>
            ₹{product.original_price}
          </span>
          <span style={{ color: "#b12704", marginLeft: 6 }}>
            ({product.discount_percentage}% off)
          </span>
        </div>
      )}

      {/* Free delivery */}
      <div className="wc2026-buy-free-delivery">
        FREE delivery Tomorrow, {buyBoxTomorrow}
      </div>

      {/* Stock status */}
      <div className="wc2026-buy-stock-status">
        <span className="wc2026-buy-stock-dot" />
        In stock
      </div>

      {/* Size selector in buy box */}
      {["S", "M", "L", "XL", "XXL"].length > 0 && (
        <div style={{ marginBottom: 12 }}>
          <label
            style={{
              fontSize: 13,
              color: "#565959",
              display: "block",
              marginBottom: 4,
            }}
          >
            Size:
            <span style={{ color: "#0f1111", fontWeight: 600, marginLeft: 4 }}>
              {selectedSize || "Select"}
            </span>
          </label>
          <div className="wc2026-sizes" style={{ gap: 4 }}>
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className={`wc2026-size-btn ${selectedSize === size ? "active" : ""}`}
                onClick={() => setSelectedSize(size)}
                style={{
                  minWidth: 40,
                  height: 34,
                  padding: "0 10px",
                  fontSize: 13,
                }}
                aria-pressed={selectedSize === size}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity */}
      <div className="wc2026-qty-selector">
        <span className="wc2026-qty-label">Qty:</span>
        <button
          className="wc2026-qty-btn"
          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
          aria-label="Decrease quantity"
        >
          −
        </button>
        <span className="wc2026-qty-value">{quantity}</span>
        <button
          className="wc2026-qty-btn"
          onClick={() => setQuantity((q) => Math.min(10, q + 1))}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* CTA buttons */}
      <button
        className="wc2026-btn-add-to-cart"
        onClick={handleAddToCart}
        disabled={isAdding}
      >
        {isAdding ? "Adding..." : "Add to Cart"}
      </button>
      <button className="wc2026-btn-buy-now" onClick={handleBuyNow}>
        Buy Now
      </button>

      {/* Trust badges */}
      <div className="wc2026-trust">
        <div className="wc2026-trust-item">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Secure transaction
        </div>
        <div className="wc2026-trust-item">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          7-Day easy return
        </div>
        <div className="wc2026-trust-item">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
          Free delivery
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast} onComplete={() => setToast(null)} />}
    </div>
  );
};

/* ═════════════════════════════════════════════════════════════════════
   Mobile Bar — Sticky bottom bar for mobile/tablet
   ═════════════════════════════════════════════════════════════════════ */
WCProductInfo.MobileBar = function MobileBar({
  product,
  bundleOffer,
}: MobileBarProps) {
  const router = useRouter();
  const addItem = useCartStore((state) => state.addItem);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [toast, setToast] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = useCallback(() => {
    if (!selectedSize) {
      setToast("Please select a size");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    setIsAdding(true);
    addItem(product, 1);
    setToast("Added to cart");
    setTimeout(() => {
      setToast(null);
      setIsAdding(false);
    }, 2000);
  }, [product, selectedSize, addItem]);

  const handleBuyNow = useCallback(() => {
    if (!selectedSize) {
      setToast("Please select a size");
      setTimeout(() => setToast(null), 2000);
      return;
    }
    addItem(product, 1);
    router.push("/checkout");
  }, [product, selectedSize, addItem, router]);

  /* ── Single size selector for mobile bar ── */
  const sizes = ["S", "M", "L", "XL", "XXL"];

  return (
    <div className="wc2026-mobile-bar">
      {/* Size selector inline */}
      <div style={{ flexShrink: 0 }}>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          style={{
            padding: "6px 8px",
            border: "1px solid #ddd",
            borderRadius: 4,
            fontSize: 13,
            fontFamily: "inherit",
            background: "#fff",
          }}
          aria-label="Select size"
        >
          <option value="">Size</option>
          {sizes.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="wc2026-mobile-bar-price">
        <div className="wc2026-mobile-bar-price-current">₹{product.price}</div>
        {product.original_price && (
          <div className="wc2026-mobile-bar-price-original">
            ₹{product.original_price}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="wc2026-mobile-bar-actions">
        <button
          className="wc2026-btn-add-to-cart"
          onClick={handleAddToCart}
          disabled={isAdding}
          style={{ flex: 1 }}
        >
          {isAdding ? "..." : "Cart"}
        </button>
        <button
          className="wc2026-btn-buy-now"
          onClick={handleBuyNow}
          style={{ flex: 1 }}
        >
          Buy Now
        </button>
      </div>

      {toast && <Toast message={toast} onComplete={() => setToast(null)} />}
    </div>
  );
};

/* ── Toast component for BuyBox/MobileBar ── */
function Toast({
  message,
  onComplete,
}: {
  message: string;
  onComplete: () => void;
}) {
  return (
    <div className="wc2026-toast" onAnimationEnd={onComplete}>
      {message}
    </div>
  );
}
