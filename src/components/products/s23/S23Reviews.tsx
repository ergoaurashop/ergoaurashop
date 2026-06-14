"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { S23_REVIEWS, S23_REVIEW_SUMMARY } from "@/lib/s23-ultra-data";
import type { ProductReviewDetail } from "@/lib/types";

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="s23-review-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`s23-review-star ${star > rating ? "empty" : ""}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

function ReviewCard({ review }: { review: ProductReviewDetail }) {
  return (
    <motion.div
      className="s23-review-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="s23-review-header">
        <div className="s23-review-avatar">{getInitials(review.name)}</div>
        <div>
          <div className="s23-review-name">{review.name}</div>
          <div className="s23-review-city">{review.city}</div>
        </div>
      </div>

      <StarRow rating={review.rating} />

      <h4 className="s23-review-title">{review.title}</h4>
      <p className="s23-review-text">{review.text}</p>

      <div className="s23-review-meta">
        {review.isVerified && (
          <span className="s23-review-verified">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            Verified Purchase
          </span>
        )}
        <span>{review.helpfulCount} people found this helpful</span>
      </div>
    </motion.div>
  );
}

export default function S23Reviews() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? S23_REVIEWS : S23_REVIEWS.slice(0, 8);
  const summary = S23_REVIEW_SUMMARY;

  // Rating distribution bar
  const maxCount = Math.max(...Object.values(summary.ratingDistribution));

  return (
    <section className="s23-section s23-section-dark" id="s23-reviews">
      <div className="s23-section-container">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-10">
            <span className="s23-section-label">Customer Reviews</span>
            <h2 className="s23-section-title">What Our Customers Say</h2>
            <p className="s23-section-subtitle mx-auto">
              Real reviews from real buyers. We don't filter or edit feedback —
              honesty builds trust.
            </p>
          </div>

          {/* Rating summary */}
          <div className="bg-[var(--s23-bg-card)] border border-[var(--s23-border)] rounded-[var(--s23-radius-xl)] p-6 md:p-8 mb-8">
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10">
              {/* Big rating number */}
              <div className="text-center">
                <div
                  className="text-5xl font-bold"
                  style={{ color: "var(--s23-accent-text)" }}
                >
                  {summary.averageRating.toFixed(1)}
                </div>
                <StarRow rating={Math.round(summary.averageRating)} />
                <div
                  className="text-sm mt-1"
                  style={{ color: "var(--s23-text-tertiary)" }}
                >
                  {summary.totalReviews} reviews
                </div>
              </div>

              {/* Distribution bars */}
              <div className="flex-1 w-full space-y-1.5">
                {([5, 4, 3, 2, 1] as const).map((star) => {
                  const count = summary.ratingDistribution[star] || 0;
                  const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
                  return (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span
                        style={{
                          color: "var(--s23-text-secondary)",
                          width: "20px",
                        }}
                      >
                        {star}★
                      </span>
                      <div
                        className="flex-1 h-2 rounded-full"
                        style={{ background: "var(--s23-bg-primary)" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${pct}%`,
                            background: "var(--s23-gradient-green)",
                          }}
                        />
                      </div>
                      <span
                        style={{
                          color: "var(--s23-text-tertiary)",
                          width: "24px",
                          textAlign: "right",
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Review cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AnimatePresence>
              {displayed.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </AnimatePresence>
          </div>

          {/* Show more / show less */}
          {S23_REVIEWS.length > 8 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAll(!showAll)}
                className="s23-btn-secondary"
              >
                {showAll
                  ? `Show less (${S23_REVIEWS.length - 8} hidden)`
                  : `Show all ${S23_REVIEWS.length} reviews`}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
