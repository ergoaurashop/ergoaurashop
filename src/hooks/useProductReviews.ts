"use client";

import { useState, useMemo, useCallback } from "react";
import type { ProductReviewSummary, ProductReviewDetail } from "@/lib/types";
import { getProductReviewSummary, getProductReviews } from "@/lib/reviews-data";

export type SortOption = "most_recent" | "top" | "lowest";

const PER_PAGE = 10;

/** In-memory reactive hook for accessing pre-defined review data */
export function useProductReviews(slug: string) {
  const [sortBy, setSortBy] = useState<SortOption>("most_recent");
  const [visibleCount, setVisibleCount] = useState(PER_PAGE);
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const summary: ProductReviewSummary | null = useMemo(
    () => getProductReviewSummary(slug),
    [slug],
  );

  const allReviews: ProductReviewDetail[] = useMemo(
    () => getProductReviews(slug) ?? [],
    [slug],
  );

  /** Filter by star rating */
  const filtered = useMemo(() => {
    if (filterRating === null) return allReviews;
    return allReviews.filter((r) => r.rating === filterRating);
  }, [allReviews, filterRating]);

  /** Sort the filtered list */
  const sorted = useMemo(() => {
    const list = [...filtered];
    switch (sortBy) {
      case "most_recent":
        return list.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        );
      case "top":
        return list.sort(
          (a, b) => b.rating - a.rating || b.helpfulCount - a.helpfulCount,
        );
      case "lowest":
        return list.sort((a, b) => a.rating - b.rating);
      default:
        return list;
    }
  }, [filtered, sortBy]);

  /** Paginated slice */
  const displayed = useMemo(
    () => sorted.slice(0, visibleCount),
    [sorted, visibleCount],
  );
  const hasMore = visibleCount < sorted.length;
  const totalFiltered = sorted.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => prev + PER_PAGE);
  }, []);

  const changeSort = useCallback((opt: SortOption) => {
    setSortBy(opt);
    setVisibleCount(PER_PAGE);
  }, []);

  const changeFilterRating = useCallback((r: number | null) => {
    setFilterRating(r);
    setVisibleCount(PER_PAGE);
  }, []);

  /** Build rating-distribution counts for the filter bar */
  const distribution = useMemo(() => {
    if (!summary) return { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    return summary.ratingDistribution;
  }, [summary]);

  return {
    summary,
    allReviews,
    displayed,
    hasMore,
    totalFiltered,
    sortBy,
    changeSort,
    filterRating,
    changeFilterRating,
    loadMore,
    distribution,
  };
}
