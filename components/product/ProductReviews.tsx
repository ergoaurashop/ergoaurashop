"use client";

import { useState, useMemo } from "react";
import { JudgemeReview, ReviewStats, calculateReviewStats } from "@/lib/judgeme/api";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export function ProductReviews({ 
  title, 
  reviewsRaw,
  judgemeReviews = [],
  judgemeStats
}: { 
  title: string; 
  reviewsRaw?: string;
  judgemeReviews?: JudgemeReview[];
  judgemeStats?: ReviewStats;
}) {
  const [filterTag, setFilterTag] = useState<string | null>(null);

  // Source priority: 1) Judge.me API  2) Shopify metafield JSON  3) Empty
  const rawReviews: any[] = useMemo(() => {
    // 1. Live Judge.me reviews (when private token is configured)
    if (judgemeReviews.length > 0) {
      return judgemeReviews.map(r => ({
        id: r.id,
        author: r.reviewer_name,
        rating: r.rating,
        date: new Date(r.created_at).toLocaleDateString("en-AE", { day: "numeric", month: "short", year: "numeric" }),
        text: r.body,
        title: r.title,
        verified: r.verified,
        images: r.pictures?.map(p => p.urls.original) || [],
      }));
    }

    // 2. Shopify metafield reviews (pushed by Judge.me → Settings → Metafields sync)
    if (reviewsRaw) {
      try {
        const parsed = JSON.parse(reviewsRaw);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch {
        console.warn("[reviews] Could not parse product reviews metafield — invalid JSON.");
      }
    }

    // 3. No reviews available — return empty (component will show a CTA)
    return [];
  }, [judgemeReviews, reviewsRaw]);

  // Keyword extraction for tag cloud
  const tags = useMemo(() => {
    const commonKeywords = ["Quality", "Shipping", "Comfort", "Design", "Value", "Material", "Support"];
    const counts: Record<string, number> = {};
    rawReviews.forEach(r => {
      commonKeywords.forEach(keyword => {
        if (r.text.toLowerCase().includes(keyword.toLowerCase())) {
          counts[keyword] = (counts[keyword] || 0) + 1;
        }
      });
    });
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name]) => name);
  }, [rawReviews]);

  const filteredReviews = useMemo(() => {
    if (!filterTag) return rawReviews;
    return rawReviews.filter(r => r.text.toLowerCase().includes(filterTag.toLowerCase()));
  }, [rawReviews, filterTag]);

  // Aggregate all images for the gallery
  const allImages = useMemo(() => {
    return rawReviews.flatMap(r => r.images || []).slice(0, 8);
  }, [rawReviews]);

  // Compute stats from real data: Judge.me stats > calculated from metafield reviews > zeros
  const computedStats = useMemo(
    () => calculateReviewStats(rawReviews as never),
    [rawReviews]
  );
  const hasReviews = rawReviews.length > 0;
  const averageRating = judgemeStats?.average_rating ?? computedStats.average_rating;
  const totalReviews = judgemeStats?.total_reviews ?? computedStats.total_reviews;
  const distribution = judgemeStats?.rating_distribution ?? computedStats.rating_distribution;
  const attributes =
    judgemeStats?.attribute_ratings &&
    Object.keys(judgemeStats.attribute_ratings).length > 0
      ? judgemeStats.attribute_ratings
      : computedStats.attribute_ratings;

  return (
    <div className="w-full mt-10 md:mt-16 py-10 md:py-16 bg-white px-4 md:px-8 border-t border-ergo-border" id="reviews">
      <div className="max-w-7xl mx-auto">
        {!hasReviews ? (
          /* ── No Reviews State ──────────────────────────────────────── */
          <div className="flex flex-col items-center justify-center py-20 text-center gap-6">
            <div className="w-16 h-16 rounded-full bg-ergo-surface flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-ergo-muted">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-ergo-navy-deep tracking-tighter mb-2">No Reviews Yet</h2>
              <p className="text-sm text-ergo-muted max-w-sm">Be the first to share your experience with <span className="font-bold text-ergo-navy-deep">{title}</span>.</p>
            </div>
            <a
              href={`mailto:support@ergoaurashop.com?subject=Review for ${encodeURIComponent(title)}`}
              className="inline-flex items-center gap-2 bg-ergo-navy text-white px-8 py-3 rounded-full font-bold text-sm hover:bg-ergo-navy-deep transition-all"
            >
              Write a Review
            </a>
          </div>
        ) : (
        <>
        {/* Amazon-Style Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-16 items-start">
          
          {/* Column 1: Star Distribution */}
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-black text-ergo-navy-deep tracking-tighter">Verified Ratings</h2>
            <div className="flex items-center gap-4">
              <div className="text-6xl font-black text-ergo-navy-deep tracking-tighter">{averageRating}</div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-xl">{i < Math.floor(averageRating) ? "★" : "☆"}</span>
                  ))}
                </div>
                <p className="text-xs font-bold text-ergo-muted uppercase tracking-wider">{totalReviews} Global Reviews</p>
              </div>
            </div>
            <div className="flex flex-col gap-2.5">
              {[5, 4, 3, 2, 1].map((star) => (
                <div key={star} className="flex items-center gap-3">
                  <span className="w-10 text-[10px] font-black text-ergo-navy-deep uppercase whitespace-nowrap">{star} Star</span>
                  <div className="flex-1 h-2.5 bg-ergo-surface rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${distribution[star]}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "circOut" }}
                      className="h-full bg-yellow-400"
                    />
                  </div>
                  <span className="w-8 text-[10px] font-bold text-ergo-muted text-right">{distribution[star]}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Column 2: Attribute Ratings */}
          <div className="flex flex-col gap-6 p-8 bg-ergo-surface rounded-3xl border border-ergo-border">
            <h3 className="text-sm font-black text-ergo-navy-deep uppercase tracking-widest">Experience metrics</h3>
            <div className="space-y-6">
              {Object.entries(attributes).map(([name, rating]) => (
                <div key={name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-ergo-navy-deep">{name}</span>
                    <span className="text-xs font-black text-ergo-navy">{rating} / 5</span>
                  </div>
                  <div className="h-1.5 bg-white rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(rating / 5) * 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, ease: "circOut", delay: 0.2 }}
                      className="h-full bg-ergo-green"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Column 3: Photo Gallery */}
          <div className="flex flex-col gap-6">
            <h3 className="text-sm font-black text-ergo-navy-deep uppercase tracking-widest flex justify-between items-center">
              Customer Gallery
              <span className="text-[10px] font-bold text-ergo-muted truncate ml-2">Shared by real buyers</span>
            </h3>
            {allImages.length > 0 ? (
              <div className="grid grid-cols-4 grid-rows-2 gap-2 h-[220px]">
                {allImages.map((img, idx) => (
                  <div key={idx} className={`relative rounded-xl overflow-hidden border border-ergo-border group cursor-zoom-in ${idx === 0 ? "col-span-2 row-span-2" : ""}`}>
                    <Image
                      src={img}
                      alt="Review Gallery"
                      fill
                      className="object-cover group-hover:scale-110 transition-all duration-500"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-[220px] bg-ergo-surface rounded-3xl border border-dashed border-ergo-border flex flex-col items-center justify-center text-center p-6 grayscale opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15a2.25 2.25 0 002.25-2.25V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                </svg>
                <p className="text-xs font-bold uppercase tracking-widest">Gallery Empty</p>
              </div>
            )}
          </div>
        </div>

        {/* Filters & Review List */}
        <div className="flex flex-col lg:flex-row gap-12 pt-16 border-t border-ergo-border">
          {/* Tag Cloud */}
          <div className="lg:w-1/4 h-fit sticky top-32">
            <h4 className="text-xs font-black text-ergo-navy-deep uppercase tracking-widest mb-6">Filter by keyword</h4>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setFilterTag(null)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${!filterTag ? "bg-ergo-navy text-white" : "bg-ergo-surface text-ergo-navy-deep hover:bg-white border border-ergo-border"}`}
              >
                All Reviews
              </button>
              {tags.map(tag => (
                <button 
                  key={tag}
                  onClick={() => setFilterTag(tag === filterTag ? null : tag)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${filterTag === tag ? "bg-ergo-navy text-white text-md shadow-lg" : "bg-ergo-surface text-ergo-navy-deep hover:bg-white border border-ergo-border"}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* List */}
          <div className="lg:flex-1 space-y-12">
            <AnimatePresence mode="wait">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review: any) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    key={review.id} 
                    className="group"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-ergo-surface text-ergo-navy-deep font-black flex items-center justify-center border border-ergo-border">
                          {review.author ? review.author.charAt(0).toUpperCase() : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-ergo-muted/60">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                            </svg>
                          )}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-ergo-navy-deep">{review.author}</span>
                            {review.verified && (
                              <span className="text-[9px] font-black uppercase tracking-widest text-ergo-green bg-ergo-green/5 px-1.5 py-0.5 rounded">Verified</span>
                            )}
                          </div>
                          <div className="flex items-center gap-0.5 text-yellow-400 text-[10px] mt-1">
                            {Array.from({ length: 5 }).map((_, i) => <span key={i}>{i < Math.floor(review.rating) ? "★" : "☆"}</span>)}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-ergo-muted">{review.date}</span>
                    </div>
                    {review.title && (
                      <h5 className="text-sm font-black text-ergo-navy-deep mb-2 tracking-tight">{review.title}</h5>
                    )}
                    <p className={`text-sm text-ergo-text leading-relaxed mb-4 ${!review.title ? 'mt-2' : ''} italic`}>"{review.text}"</p>
                    {review.images && review.images.length > 0 && (
                      <div className="flex gap-2">
                        {review.images.map((img: string, idx: number) => (
                           <Image key={idx} src={img} alt="Rev" width={64} height={64} className="rounded-lg border border-ergo-border object-cover" />
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))
              ) : (
                <div className="py-20 text-center bg-ergo-surface rounded-3xl border border-dashed border-ergo-border">
                  <p className="text-sm font-bold text-ergo-muted italic">No reviews matching "{filterTag}"</p>
                  <button onClick={() => setFilterTag(null)} className="mt-4 text-xs font-black text-ergo-navy underline underline-offset-4">Reset filter</button>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
        </>
        )}
      </div>
    </div>
  );
}
