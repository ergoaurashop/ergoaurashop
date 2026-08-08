"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  APPLE_IPHONE_AIR_REVIEWS,
  APPLE_IPHONE_AIR_REVIEW_SUMMARY,
  APPLE_IPHONE_AIR_REVIEW_IMAGES,
  APPLE_IPHONE_AIR_FOLDER,
} from "@/lib/apple-iphone-air-data";
import type { ProductReviewDetail } from "@/lib/types";

/** Build a URL for a review image file. */
function getReviewImagePath(filename: string): string {
  return `/images/products/${APPLE_IPHONE_AIR_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

/* ── SVG Star (blue fill) ── */
function StarIcon({ filled }: { filled: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill={filled ? "#0066cc" : "none"}
      stroke={filled ? "#0066cc" : "#cccccc"}
      strokeWidth="1.5"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

/* ── Star Row ── */
function StarRow({ rating }: { rating: number }) {
  return (
    <div className="appleiphoneair-review-stars">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="appleiphoneair-review-star">
          <StarIcon filled={star <= rating} />
        </span>
      ))}
    </div>
  );
}

/* ── Thumbs Up SVG ── */
function ThumbsUpIcon({ active }: { active: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      stroke={active ? "#0066cc" : "#666666"}
      fill={active ? "#0066cc" : "none"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

/* ── Verified checkmark SVG ── */
function VerifiedCheckmark() {
  return (
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

/* ── Review Card (Amazon-style) with optional photo carousel & lightbox ── */
function ReviewCard({ review }: { review: ProductReviewDetail }) {
  const [thumbsUp, setThumbsUp] = useState(false);
  const [currentImg, setCurrentImg] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const reviewImages = APPLE_IPHONE_AIR_REVIEW_IMAGES[review.id] || [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : reviewImages.length - 1));
  };

  const nextLightbox = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev < reviewImages.length - 1 ? prev + 1 : 0));
  };

  return (
    <motion.div
      className="appleiphoneair-review-card"
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <div className="appleiphoneair-review-header">
        {/* Blue avatar with initials */}
        <div className="appleiphoneair-review-avatar">{getInitials(review.name)}</div>
        <div>
          <div className="appleiphoneair-review-name">{review.name}</div>
          <div className="appleiphoneair-review-city">{review.city}</div>
        </div>
      </div>

      {/* Blue star row */}
      <StarRow rating={review.rating} />

      <h4 className="appleiphoneair-review-title">{review.title}</h4>
      <p className="appleiphoneair-review-text">{review.text}</p>

      {/* ── Review photo carousel ── */}
      {reviewImages.length > 0 && (
        <div className="appleiphoneair-review-images">
          {reviewImages.map((filename, i) => (
            <div
              key={filename}
              className="appleiphoneair-review-image-wrapper"
              onClick={() => openLightbox(i)}
            >
              <Image
                src={getReviewImagePath(filename)}
                alt={`${review.name} review photo ${i + 1}`}
                width={120}
                height={120}
                style={{ height: "120px", width: "auto", objectFit: "cover" }}
                unoptimized
              />
            </div>
          ))}
        </div>
      )}

      {/* Carousel dot indicators */}
      {reviewImages.length > 1 && (
        <div className="appleiphoneair-review-carousel-nav">
          <button
            className="appleiphoneair-review-carousel-btn"
            onClick={() =>
              setCurrentImg((prev) =>
                prev > 0 ? prev - 1 : reviewImages.length - 1,
              )
            }
            aria-label="Previous image"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <div className="appleiphoneair-review-carousel-dots">
            {reviewImages.map((_, i) => (
              <button
                key={i}
                className={`appleiphoneair-review-carousel-dot${i === currentImg ? " active" : ""}`}
                onClick={() => {
                  setCurrentImg(i);
                  openLightbox(i);
                }}
                aria-label={`View photo ${i + 1}`}
              />
            ))}
          </div>
          <button
            className="appleiphoneair-review-carousel-btn"
            onClick={() =>
              setCurrentImg((prev) =>
                prev < reviewImages.length - 1 ? prev + 1 : 0,
              )
            }
            aria-label="Next image"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      )}

      <div className="appleiphoneair-review-meta">
        {review.isVerified && (
          <span className="appleiphoneair-review-verified">
            <VerifiedCheckmark />
            Verified Purchase
          </span>
        )}
        <button
          onClick={() => setThumbsUp(!thumbsUp)}
          className={`appleiphoneair-review-helpful ${thumbsUp ? "thumbs-up-active" : ""}`}
          aria-label={thumbsUp ? "Mark as not helpful" : "Mark as helpful"}
        >
          <ThumbsUpIcon active={thumbsUp} />
          <span>{review.helpfulCount} people found this helpful</span>
        </button>
      </div>

      {/* ── Lightbox overlay ── */}
      {lightboxOpen && (
        <div
          className="appleiphoneair-review-lightbox"
          onClick={closeLightbox}
          onKeyDown={(e) => {
            if (e.key === "Escape") closeLightbox();
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Review photo lightbox"
        >
          <button
            className="appleiphoneair-review-lightbox-close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Previous arrow */}
          {reviewImages.length > 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              style={{
                position: "absolute",
                left: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#ffffff",
                zIndex: 10,
              }}
              aria-label="Previous image"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="24"
                height="24"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
          )}

          <Image
            src={getReviewImagePath(reviewImages[lightboxIndex])}
            alt={`${review.name} review photo ${lightboxIndex + 1}`}
            width={800}
            height={800}
            style={{
              maxWidth: "90vw",
              maxHeight: "90vh",
              objectFit: "contain",
            }}
            unoptimized
            onClick={(e) => e.stopPropagation()}
          />

          {/* Next arrow */}
          {reviewImages.length > 1 && (
            <button
              onClick={nextLightbox}
              style={{
                position: "absolute",
                right: "1rem",
                top: "50%",
                transform: "translateY(-50%)",
                background: "rgba(255,255,255,0.15)",
                border: "none",
                borderRadius: "50%",
                width: "44px",
                height: "44px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#ffffff",
                zIndex: 10,
              }}
              aria-label="Next image"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="24"
                height="24"
              >
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          )}

          {/* Image counter */}
          {reviewImages.length > 1 && (
            <span
              style={{
                position: "absolute",
                bottom: "1.5rem",
                left: "50%",
                transform: "translateX(-50%)",
                color: "#ffffff",
                fontSize: "0.85rem",
                background: "rgba(0,0,0,0.5)",
                padding: "0.3rem 0.8rem",
                borderRadius: "20px",
                fontFamily: "Arial, sans-serif",
              }}
            >
              {lightboxIndex + 1} / {reviewImages.length}
            </span>
          )}
        </div>
      )}
    </motion.div>
  );
}

/* ── Rating bar chart row ── */
function RatingBarRow({
  star,
  count,
  maxCount,
  isActive,
  onClick,
}: {
  star: number;
  count: number;
  maxCount: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const pct = maxCount > 0 ? (count / maxCount) * 100 : 0;
  return (
    <div
      className={`appleiphoneair-rating-row ${isActive ? "active" : ""}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <span className="appleiphoneair-rating-label">{star}★</span>
      <div className="appleiphoneair-rating-bar-track">
        <div className="appleiphoneair-rating-bar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="appleiphoneair-rating-count">{count}</span>
    </div>
  );
}

/* ── Main Reviews Component ── */
export default function AppleIphoneAirReviews() {
  const [showAll, setShowAll] = useState(false);
  const [filterStar, setFilterStar] = useState<number | null>(null);
  const [sortBy, setSortBy] = useState<"recent" | "highest" | "lowest">(
    "recent",
  );

  const summary = APPLE_IPHONE_AIR_REVIEW_SUMMARY;

  // Filter
  let filtered = filterStar
    ? APPLE_IPHONE_AIR_REVIEWS.filter((r) => r.rating === filterStar)
    : [...APPLE_IPHONE_AIR_REVIEWS];

  // Sort
  if (sortBy === "highest") {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === "lowest") {
    filtered.sort((a, b) => a.rating - b.rating);
  } else {
    // "recent" — sort by date descending
    filtered.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }

  const displayed = showAll ? filtered : filtered.slice(0, 8);
  const maxCount = Math.max(...Object.values(summary.ratingDistribution));

  return (
    <section className="appleiphoneair-reviews-section" id="appleiphoneair-reviews">
      <div className="appleiphoneair-reviews-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Section heading */}
          <div className="text-center mb-8">
            <h2 className="appleiphoneair-section-title">Customer Reviews</h2>
            <p className="appleiphoneair-section-subtitle mx-auto">
              Real reviews from real buyers. We don't filter or edit feedback
              &mdash; honesty builds trust.
            </p>
          </div>

          {/* Rating summary (Amazon-style: white bg card) */}
          <div className="appleiphoneair-rating-bars">
            <div className="appleiphoneair-rating-summary">
              <div className="appleiphoneair-average-rating">
                {summary.averageRating.toFixed(1)}
              </div>
              <div>
                <div className="appleiphoneair-average-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="appleiphoneair-review-star">
                      <StarIcon
                        filled={star <= Math.round(summary.averageRating)}
                      />
                    </span>
                  ))}
                </div>
                <div className="appleiphoneair-total-reviews">
                  {summary.totalReviews} global ratings
                </div>
              </div>
            </div>

            {/* Clickable rating bars */}
            <div className="appleiphoneair-rating-bars-title">
              Filter by star rating
            </div>
            {([5, 4, 3, 2, 1] as const).map((star) => (
              <RatingBarRow
                key={star}
                star={star}
                count={summary.ratingDistribution[star] || 0}
                maxCount={maxCount}
                isActive={filterStar === star}
                onClick={() => setFilterStar(filterStar === star ? null : star)}
              />
            ))}
            {filterStar && (
              <button
                onClick={() => setFilterStar(null)}
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.85rem",
                  color: "#0066cc",
                  textDecoration: "underline",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Clear filter
              </button>
            )}
          </div>

          {/* Toolbar: count + sort */}
          <div className="appleiphoneair-reviews-toolbar">
            <span className="appleiphoneair-reviews-count">
              {filtered.length} review{filtered.length !== 1 ? "s" : ""}
              {filterStar ? ` (${filterStar}★)` : ""}
            </span>
            <div className="appleiphoneair-reviews-sort">
              <label htmlFor="appleiphoneair-sort">Sort by:</label>
              <select
                id="appleiphoneair-sort"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as "recent" | "highest" | "lowest")
                }
              >
                <option value="recent">Most recent</option>
                <option value="highest">Highest rated</option>
                <option value="lowest">Lowest rated</option>
              </select>
            </div>
          </div>

          {/* Review cards grid — single column */}
          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {displayed.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </AnimatePresence>
          </div>

          {/* No results */}
          {displayed.length === 0 && (
            <p
              style={{
                textAlign: "center",
                color: "#666666",
                padding: "2rem",
                background: "#ffffff",
                borderRadius: "8px",
                border: "1px solid #e0e0e0",
              }}
            >
              No reviews match this filter.
            </p>
          )}

          {/* Show more / show less */}
          {filtered.length > 8 && (
            <button
              onClick={() => setShowAll(!showAll)}
              className="appleiphoneair-reviews-load-more"
            >
              {showAll ? "Show less" : `Show all ${filtered.length} reviews`}
            </button>
          )}
        </motion.div>
      </div>
    </section>
  );
}
