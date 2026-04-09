/**
 * lib/judgeme/api.ts
 *
 * Review data strategy (in priority order):
 *
 * 1. Judge.me Private API  — requires JUDGEME_PRIVATE_API_TOKEN in .env.local
 *    Get your private token from: Judge.me Admin → Settings → General → API
 *
 * 2. Shopify Metafield fallback — product.reviews metafield (JSON string)
 *    Enable in Judge.me: Settings → Integrations → Shopify → "Write reviews to product metafields"
 *    Namespace: "custom", Key: "reviews"
 *
 * 3. Mock data — used only in development when neither source is configured.
 *
 * The 403 "public token" error is fully suppressed — we never crash or pollute
 * the console when Judge.me returns a permissions error.
 */

export interface JudgemeReview {
  id: number;
  rating: number;        // 1-5 scale
  title: string;
  body: string;
  reviewer_name: string;
  verified: boolean;     // "Verified Buyer" badge
  created_at: string;
  pictures: {
    urls: {
      small: string;
      original: string;
    };
  }[];
  cf_answers?: {
    question: string;
    answer: string;
  }[];
}

export interface JudgemeReviewResponse {
  current_page: number;
  per_page: number;
  reviews: JudgemeReview[];
}

export interface ReviewStats {
  average_rating: number;
  total_reviews: number;
  rating_distribution: { [key: number]: number };
  attribute_ratings: { [key: string]: number };
}

// ─── Stats Calculator ─────────────────────────────────────────────────────────

export function calculateReviewStats(reviews: JudgemeReview[]): ReviewStats {
  const total = reviews.length;
  if (total === 0) {
    return {
      average_rating: 0,
      total_reviews: 0,
      rating_distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      attribute_ratings: {},
    };
  }

  const counts: { [key: number]: number } = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  let sum = 0;

  reviews.forEach((r) => {
    const rating = Math.round(r.rating);
    if (counts[rating] !== undefined) counts[rating]++;
    sum += r.rating;
  });

  const distribution: { [key: number]: number } = {};
  [5, 4, 3, 2, 1].forEach((star) => {
    distribution[star] = Math.round((counts[star] / total) * 100);
  });

  // Attribute ratings from custom form answers (cf_answers)
  const attrSums: { [key: string]: number } = {};
  const attrCounts: { [key: string]: number } = {};

  reviews.forEach((r) => {
    r.cf_answers?.forEach((ans) => {
      const val = parseFloat(ans.answer);
      if (!isNaN(val)) {
        attrSums[ans.question] = (attrSums[ans.question] || 0) + val;
        attrCounts[ans.question] = (attrCounts[ans.question] || 0) + 1;
      }
    });
  });

  const attribute_ratings: { [key: string]: number } = {};
  Object.keys(attrSums).forEach((key) => {
    attribute_ratings[key] = parseFloat(
      (attrSums[key] / attrCounts[key]).toFixed(1)
    );
  });

  return {
    average_rating: parseFloat((sum / total).toFixed(1)),
    total_reviews: total,
    rating_distribution: distribution,
    attribute_ratings,
  };
}

// ─── Empty result helper ──────────────────────────────────────────────────────

const EMPTY_RESULT = {
  reviews: [] as JudgemeReview[],
  stats: {
    average_rating: 0,
    total_reviews: 0,
    rating_distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    attribute_ratings: {},
  } as ReviewStats,
};

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Fetches reviews for a Shopify product handle.
 *
 * Requires JUDGEME_PRIVATE_API_TOKEN (not the public widget token).
 * To get it: Judge.me Admin → Settings → General → API → Private API token.
 *
 * If the private token is absent or the call fails, returns an empty result
 * so the product page falls back to Shopify metafield reviews silently.
 */
export async function getProductReviews(
  handle: string
): Promise<{ reviews: JudgemeReview[]; stats: ReviewStats }> {
  // Prefer the private token; public token cannot access this endpoint.
  const apiToken =
    process.env.JUDGEME_PRIVATE_API_TOKEN || process.env.JUDGEME_API_TOKEN;
  const shopDomain =
    process.env.JUDGEME_SHOP_DOMAIN ||
    process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;

  // If no token is configured, skip silently — metafield fallback will handle it.
  if (!apiToken || !shopDomain) {
    return EMPTY_RESULT;
  }

  const endpoint = `https://judge.me/api/v1/reviews?shop_domain=${encodeURIComponent(
    shopDomain
  )}&api_token=${apiToken}&handle=${encodeURIComponent(handle)}&per_page=50`;

  try {
    const response = await fetch(endpoint, {
      next: { revalidate: 3600 },
    });

    // 403 = public token used instead of private — silent fallback, no console spam.
    // 401 = no credentials — silent fallback.
    if (response.status === 403 || response.status === 401) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "[judgeme] Token lacks permissions. Add JUDGEME_PRIVATE_API_TOKEN to .env.local.\n" +
          "  Get it from: Judge.me Admin → Settings → General → API → Private API token.\n" +
          "  Falling back to Shopify metafield reviews."
        );
      }
      return EMPTY_RESULT;
    }

    if (!response.ok) {
      // Other server errors — warn once, fallback silently.
      if (process.env.NODE_ENV === "development") {
        console.warn(`[judgeme] API returned ${response.status}. Using metafield fallback.`);
      }
      return EMPTY_RESULT;
    }

    const data = (await response.json()) as any;
    const allShopReviews = data.reviews || [];
    
    // Explicitly filter for the specific product since the raw endpoint returns shop-wide reviews
    const reviews = allShopReviews.filter((r: any) => r.product_handle === handle);

    return {
      reviews,
      stats: calculateReviewStats(reviews),
    };
  } catch {
    // Network error — silent fallback, never crash the product page.
    return EMPTY_RESULT;
  }
}
