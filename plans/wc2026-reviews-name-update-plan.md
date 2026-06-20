# Plan: Update Customer Names & Places in Messi Argentina 2026 Jersey Reviews

## Objective

Replace the `name` and `city` fields in the [`WC2026_REVIEWS`](src/lib/worldcup-2026-data.ts:96) array with the provided customer names and locations. **No other changes** — all review text, ratings, dates, IDs, verification status, and helpful counts remain exactly as-is.

## Context

The product page `/products/messi-argentina-2026-jersey` renders the `WorldCup2026Section` component, which imports `WC2026_REVIEWS` from [`src/lib/worldcup-2026-data.ts`](src/lib/worldcup-2026-data.ts:96). The reviews are displayed via [`WCReviews.tsx`](src/components/products/worldcup2026/WCReviews.tsx:118-119) which uses `review.name` and `review.city`.

## Scope of Change

**File to modify:** [`src/lib/worldcup-2026-data.ts`](src/lib/worldcup-2026-data.ts) (lines 96-229)

**What changes:**

- `name` field — replaced with new customer name
- `city` field — replaced with new location

**What stays identical:**

- `id`, `rating`, `title`, `text`, `date`, `isVerified`, `helpfulCount`
- All CSS, component structure, page layout, functions, hooks
- No files other than the data file are touched

## Mapping (12 reviews → first 12 names from provided list)

| #   | Review ID    | Current Name | Current City           | New Name            | New City                            |
| --- | ------------ | ------------ | ---------------------- | ------------------- | ----------------------------------- |
| 1   | `wc2026-r1`  | Rohit S.     | Mumbai, Maharashtra    | Neha Maheshwari     | Malviya Nagar, Jaipur, Rajasthan    |
| 2   | `wc2026-r2`  | Sneha P.     | Delhi                  | Sana Khan           | Hasanpura, Jaipur, Rajasthan        |
| 3   | `wc2026-r3`  | Arjun K.     | Bangalore, Karnataka   | Rohan Joseph        | Connaught Place, Delhi              |
| 4   | `wc2026-r4`  | Priya M.     | Chennai, Tamil Nadu    | Rahul Deshmukh      | Dombivli, Maharashtra               |
| 5   | `wc2026-r5`  | Vikram R.    | Pune, Maharashtra      | Priya Kulkarni      | Kothrud, Pune, Maharashtra          |
| 6   | `wc2026-r6`  | Ananya L.    | Kolkata, West Bengal   | Divya Sundaram      | Srirangam, Trichy, Tamil Nadu       |
| 7   | `wc2026-r7`  | Rahul D.     | Hyderabad, Telangana   | Mary Shalini        | Royapettah, Chennai, Tamil Nadu     |
| 8   | `wc2026-r8`  | Deepak T.    | Jaipur, Rajasthan      | Ayesha Siddiqua     | Bhatkal, Uttara Kannada, Karnataka  |
| 9   | `wc2026-r9`  | Neha G.      | Ahmedabad, Gujarat     | K. Lakshmi Prasanna | Gachibowli, Hyderabad, Telangana    |
| 10  | `wc2026-r10` | Amit S.      | Lucknow, Uttar Pradesh | G. Vijay Kumar      | Secunderabad, Telangana             |
| 11  | `wc2026-r11` | Kavita J.    | Chandigarh             | S. Krupa            | Guntur, Andhra Pradesh              |
| 12  | `wc2026-r12` | Suresh N.    | Coimbatore, Tamil Nadu | Shibu Mathew        | Kozhenchery, Pathanamthitta, Kerala |

## Execution Steps

1. Open [`src/lib/worldcup-2026-data.ts`](src/lib/worldcup-2026-data.ts)
2. For each of the 12 reviews in the `WC2026_REVIEWS` array (lines 99-228):
   - Replace only the `name` string value
   - Replace only the `city` string value
3. Verify no other fields or structures were altered
4. Save the file

## Files NOT Modified (verification list)

- `src/components/products/worldcup2026/WCReviews.tsx` — stays untouched
- `src/components/products/worldcup2026/WorldCup2026Section.tsx` — stays untouched
- `src/app/products/[slug]/ProductDetailClient.tsx` — stays untouched
- `src/hooks/useProductReviews.ts` — stays untouched
- `src/lib/reviews-data.ts` — stays untouched
- Any CSS, layout, or other component files — all untouched
