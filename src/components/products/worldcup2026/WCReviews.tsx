"use client";

import { useState } from "react";
import type { ProductReviewDetail } from "@/lib/types";

/* ── Types ── */
interface WCReviewsProps {
  reviews: ProductReviewDetail[];
  reviewSummary: {
    totalReviews: number;
    averageRating: number;
    ratingDistribution: Record<number, number>;
  };
}

/* ── Star Helper ── */
function StarDisplay({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span className="wc2026-review-stars" style={{ gap: 1 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
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

/**
 * WCReviews — Amazon-style customer reviews section.
 * Shows summary bar chart, average rating, and individual review cards.
 */
export default function WCReviews({ reviews, reviewSummary }: WCReviewsProps) {
  const [visibleCount, setVisibleCount] = useState(5);

  const displayedReviews = reviews.slice(0, visibleCount);
  const hasMore = visibleCount < reviews.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 5, reviews.length));
  };

  const distribution = reviewSummary.ratingDistribution;

  return (
    <section className="wc2026-reviews" id="reviews">
      <h2 className="wc2026-reviews-title">Customer Reviews</h2>

      {/* Summary */}
      <div className="wc2026-reviews-summary">
        {/* Average */}
        <div className="wc2026-reviews-average">
          <div className="wc2026-reviews-average-num">
            {reviewSummary.averageRating.toFixed(1)}
          </div>
          <div className="wc2026-reviews-average-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg
                key={star}
                style={{ width: 18, height: 18 }}
                viewBox="0 0 24 24"
                fill={
                  star <= Math.round(reviewSummary.averageRating)
                    ? "#ffa41c"
                    : "#ddd"
                }
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            ))}
          </div>
          <div className="wc2026-reviews-average-label">
            {reviewSummary.totalReviews.toLocaleString()} ratings
          </div>
        </div>

        {/* Rating bars */}
        <div className="wc2026-reviews-bars">
          {([5, 4, 3, 2, 1] as const).map((star) => {
            const count = distribution?.[star] ?? 0;
            const pct =
              reviewSummary.totalReviews > 0
                ? (count / reviewSummary.totalReviews) * 100
                : 0;
            return (
              <div key={star} className="wc2026-review-bar-row">
                <span className="wc2026-review-bar-label">{star} star</span>
                <div className="wc2026-review-bar-track">
                  <div
                    className="wc2026-review-bar-fill"
                    style={{ width: `${pct}%` }}
                  />
                </div>
                <span className="wc2026-review-bar-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Individual reviews */}
      {displayedReviews.length > 0 ? (
        <>
          {displayedReviews.map((review) => (
            <div key={review.id} className="wc2026-review-card">
              <div className="wc2026-review-header">
                <StarDisplay rating={review.rating} />
              </div>
              {review.title && (
                <p className="wc2026-review-title-text">{review.title}</p>
              )}
              <div className="wc2026-review-meta">
                By <strong>{review.name}</strong>
                {review.city && ` from ${review.city}`}
                {review.date &&
                  ` on ${new Date(review.date).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}`}
                {review.isVerified && (
                  <>
                    <span style={{ margin: "0 6px", color: "#ccc" }}>|</span>
                    <span className="wc2026-review-verified">
                      <svg
                        style={{ width: 12, height: 12 }}
                        viewBox="0 0 24 24"
                        fill="#067d62"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                      </svg>
                      Verified Purchase
                    </span>
                  </>
                )}
              </div>
              <p className="wc2026-review-text">{review.text}</p>
              {review.helpfulCount !== undefined && (
                <div className="wc2026-review-helpful">
                  <span>{review.helpfulCount} people found this helpful</span>
                  <button
                    className="wc2026-review-helpful-btn"
                    onClick={() => {}}
                  >
                    Helpful
                  </button>
                </div>
              )}
            </div>
          ))}

          {hasMore && (
            <div style={{ textAlign: "center", marginTop: 16 }}>
              <button
                onClick={handleLoadMore}
                style={{
                  padding: "8px 24px",
                  border: "1px solid #ddd",
                  borderRadius: 8,
                  background: "#fff",
                  cursor: "pointer",
                  fontSize: 14,
                  fontFamily: "inherit",
                  color: "#0f1111",
                }}
              >
                See more reviews ({reviews.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        <p style={{ color: "#565959", fontSize: 14 }}>No reviews yet.</p>
      )}
    </section>
  );
}
