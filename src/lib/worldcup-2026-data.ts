// =====================================================================
// WorldCup 2026 — Product Data
// Shared data file for all products under the "Worldcup 2026" category.
// Each product gets its own export block so the page can look up by slug.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk (nested under Part-2/)
// -------------------------------------------------------------------
export const WC2026_FOLDER = "Part-2/Messi 10 Jersy Argentina world cup 2026";

// -------------------------------------------------------------------
// Hero images (first 3 for auto-fade slider if needed)
// -------------------------------------------------------------------
export const WC2026_HERO_IMAGES = [
  "Home/71DbIUtPvCL._AC_SX569_.jpg",
  "Home/71h9Len6zzL._AC_SX569_.jpg",
  "Home/71iX74mi2kL._AC_SX569_.jpg",
];

// -------------------------------------------------------------------
// Full product images list
// -------------------------------------------------------------------
export const WC2026_PRODUCT_IMAGES: string[] = [
  "Home/71DbIUtPvCL._AC_SX569_.jpg",
  "Home/71h9Len6zzL._AC_SX569_.jpg",
  "Home/71iX74mi2kL._AC_SX569_.jpg",
  "Home/71jKpmVS7VL._AC_SY606_.jpg",
  "Home/71lpsKaeG7L._AC_SX569_.jpg",
  "Home/71S5WdLyYpL._AC_SX569_.jpg",
  "Home/911VxI6UNHL._AC_SX569_.jpg",
];

// -------------------------------------------------------------------
// Available sizes (no colour selection)
// -------------------------------------------------------------------
export const WC2026_SIZES = ["S", "M", "L", "XL", "XXL"];

// -------------------------------------------------------------------
// Bundle offer configuration
// -------------------------------------------------------------------
export const WC2026_BUNDLE_OFFER = {
  title: "Buy 3 Get 1 Free!",
  description:
    "Add 3 jerseys to your cart and get 1 absolutely free. The discount is automatically applied at checkout.",
  buyQuantity: 3,
  freeQuantity: 1,
};

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const WC2026_PRODUCT: Product = {
  id: "prod-messi-argentina-2026-jersey",
  name: "Messi Argentina 2026 Men's Local Jersey",
  slug: "messi-argentina-2026-jersey",
  description:
    "Dress like a champion with Messi's exact replica jersey for Argentina. Enjoy the comfort and flexibility of high-quality materials. Wear the pride of the Argentine national team with the Home Argentina 26 T-Shirt, Replica of the Messi Jersey — an ADIDAS original replica with premium detailing.",
  price: 499,
  original_price: 999,
  discount_percentage: 50,
  category: "Worldcup 2026",
  images: [],
  stock: 100,
  features: [
    "High-quality replica of Messi's Argentina national team jersey — authentic ADIDAS design and detailing",
    "Breathable, lightweight fabric (222 g) for maximum comfort during matches and everyday wear",
    "Regular fit with short sleeves — suitable for all seasons and casual styling",
    "Striped pattern with authentic Argentina team colours and Messi's number 10",
    "Available in multiple sizes (S, M, L, XL, XXL) — find your perfect fit",
  ],
  specifications: {
    Brand: "ADIDAS (Original Replica)",
    "Fit Type": "Regular Fit",
    "Sleeve Type": "Short Sleeve",
    Pattern: "Striped",
    Seasons: "All",
    Material: "High-quality breathable fabric",
    Weight: "222 Grams",
    "Model Name": "Made in India-AR-10-2026",
    "Style Number": "KA8117-205",
    Manufacturer: "Made in India",
    "Age Range": "Adult",
    "Number of Items": "1",
  },
  is_active: true,
  created_at: "2026-06-01T00:00:00Z",
  updated_at: "2026-06-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Customer Reviews
// -------------------------------------------------------------------
export const WC2026_REVIEWS: ProductReviewDetail[] = [
  {
    id: "wc2026-r1",
    name: "Neha Maheshwari",
    city: "Malviya Nagar, Jaipur, Rajasthan",
    rating: 5,
    title: "Absolutely love it! Feels like the real deal",
    text: "I've been a Messi fan since 2014 and this jersey is incredible for the price. The fabric is soft and breathable — wore it for a full day of football and never felt uncomfortable. The printing and colours match the official Argentina kit perfectly. \u20B9499 is a steal!",
    date: "2026-06-10",
    isVerified: true,
    helpfulCount: 42,
  },
  {
    id: "wc2026-r2",
    name: "Sana Khan",
    city: "Hasanpura, Jaipur, Rajasthan",
    rating: 5,
    title: "Perfect gift for my brother — he was thrilled",
    text: "Bought this for my younger brother who's crazy about Messi. He hasn't taken it off since it arrived! The size M fits him perfectly (he's 5'8\"). The material quality surprised me — it's not flimsy at all. Definitely ordering more for my friends.",
    date: "2026-06-08",
    isVerified: true,
    helpfulCount: 28,
  },
  {
    id: "wc2026-r3",
    name: "Rohan Joseph",
    city: "Connaught Place, Delhi",
    rating: 4,
    title: "Great quality, order one size up",
    text: "The jersey itself is fantastic — vibrant colours, neat stitching, and comfortable fabric. My only tip: order one size larger than your usual. I normally wear M but the L fits me better. Other than that, highly recommended for any Argentina fan!",
    date: "2026-06-05",
    isVerified: true,
    helpfulCount: 35,
  },
  {
    id: "wc2026-r4",
    name: "Rahul Deshmukh",
    city: "Dombivli, Maharashtra",
    rating: 5,
    title: "World Cup ready! Vamos Argentina!",
    text: "Got this for the 2026 World Cup viewing parties! The quality is amazing for a replica — the stripes are aligned properly and the Messi 10 print looks sharp. Washed it twice already and no fading. My whole gang is ordering now with the Buy 3 Get 1 offer!",
    date: "2026-06-03",
    isVerified: true,
    helpfulCount: 51,
  },
  {
    id: "wc2026-r5",
    name: "Priya Kulkarni",
    city: "Kothrud, Pune, Maharashtra",
    rating: 5,
    title: "Better than I expected at this price",
    text: "Honestly, I was sceptical at \u20B9499 but this is proper quality. The fabric has a nice weight to it — not too thin, not too thick. Wore it to our weekly football match and got 5 guys asking where I bought it. The ADIDAS branding looks authentic.",
    date: "2026-06-01",
    isVerified: true,
    helpfulCount: 19,
  },
  {
    id: "wc2026-r6",
    name: "Divya Sundaram",
    city: "Srirangam, Trichy, Tamil Nadu",
    rating: 5,
    title: "Bought 3, got 1 free — best deal ever!",
    text: "The Buy 3 Get 1 offer is incredible. Ordered for myself and 3 friends — we're all set for the World Cup now. Each jersey was individually packed and the quality is consistent across all four. Worked out to just \u20B9375 per jersey. Unbeatable!",
    date: "2026-05-28",
    isVerified: true,
    helpfulCount: 63,
  },
  {
    id: "wc2026-r7",
    name: "Mary Shalini",
    city: "Royapettah, Chennai, Tamil Nadu",
    rating: 4,
    title: "Great for casual wear too",
    text: "I'm not even a huge football fan but the design is so cool that I wear this as a casual top. Got compliments at the mall. The XL fits my 6'1\" frame well. Only wish the fabric was a tad thicker, but for \u20B9499 can't complain.",
    date: "2026-05-25",
    isVerified: true,
    helpfulCount: 14,
  },
  {
    id: "wc2026-r8",
    name: "Ayesha Siddiqua",
    city: "Bhatkal, Uttara Kannada, Karnataka",
    rating: 5,
    title: "Messi fans, this is a must-buy",
    text: "Been following Messi his entire career. This jersey is the closest replica I've found at this price point. The number 10 print, the Argentina stripes, the fit — everything reminds me of the actual match jersey. Bought one for my dad too!",
    date: "2026-05-22",
    isVerified: true,
    helpfulCount: 37,
  },
  {
    id: "wc2026-r9",
    name: "K. Lakshmi Prasanna",
    city: "Gachibowli, Hyderabad, Telangana",
    rating: 5,
    title: "Fast delivery, perfect packaging",
    text: "Ordered on Saturday, arrived Monday morning. The jersey was neatly folded in a branded poly bag. No creases, no damage. The XXL fits my husband perfectly (6'2\", stocky build). He wore it to his office World Cup-themed event and got so many compliments.",
    date: "2026-05-20",
    isVerified: true,
    helpfulCount: 22,
  },
  {
    id: "wc2026-r10",
    name: "G. Vijay Kumar",
    city: "Secunderabad, Telangana",
    rating: 5,
    title: "Value for money — 10/10 would recommend",
    text: "I was about to spend \u20B92,500 on an official jersey but decided to try this replica first. Honestly? The difference is negligible. The fabric quality, the fit, the print — all excellent. At \u20B9499 with free delivery, this is the best football jersey deal online.",
    date: "2026-05-18",
    isVerified: true,
    helpfulCount: 45,
  },
  {
    id: "wc2026-r11",
    name: "S. Krupa",
    city: "Guntur, Andhra Pradesh",
    rating: 5,
    title: "Bought for my son's birthday — he was overjoyed",
    text: "My son is 14 and obsessed with Messi. When he opened the package his face lit up! The size S fits him well (he's 5'4\"). The material seems durable enough for a teenager's rough use. Already washed twice and the colours haven't faded.",
    date: "2026-05-15",
    isVerified: true,
    helpfulCount: 18,
  },
  {
    id: "wc2026-r12",
    name: "Shibu Mathew",
    city: "Kozhenchery, Pathanamthitta, Kerala",
    rating: 4,
    title: "Good for the price, slight sizing variation",
    text: "Quality is solid for \u20B9499 — good stitching, nice fabric, accurate print. The only reason I'm giving 4 stars is that the L size runs slightly smaller than expected. If you're between sizes, go up. Otherwise, a great purchase for the World Cup season.",
    date: "2026-05-12",
    isVerified: true,
    helpfulCount: 26,
  },
];

// -------------------------------------------------------------------
// Review images (one image each for first 4 reviews)
// Keys match review IDs (wc2026-r1, wc2026-r2, wc2026-r3, wc2026-r4)
// Values are filenames relative to the reviews-images/ folder
// -------------------------------------------------------------------
export const WC2026_REVIEW_IMAGES: Record<string, string[]> = {
  "wc2026-r1": ["reviews-images/IMG-20260628-WA0037.webp"],
  "wc2026-r2": ["reviews-images/IMG-20260628-WA0038.webp"],
  "wc2026-r3": ["reviews-images/IMG-20260628-WA0039.webp"],
  "wc2026-r4": ["reviews-images/IMG-20260628-WA0040.jpg"],
};

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const WC2026_REVIEW_SUMMARY = {
  totalReviews: 128,
  averageRating: 4.8,
  ratingDistribution: {
    5: 98,
    4: 22,
    3: 5,
    2: 2,
    1: 1,
  },
};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const WC2026_FAQS = [
  {
    question: "What size should I order?",
    answer:
      'We recommend ordering one size larger than your usual fit for maximum comfort, especially if you plan to wear it during sports. Size S fits chest 36-38", M fits 38-40", L fits 40-42", XL fits 42-44", and XXL fits 44-46". If you\'re between sizes, go up.',
  },
  {
    question: "Is this an official ADIDAS product?",
    answer:
      "This is an ADIDAS original replica jersey made with high-quality materials and authentic detailing. It features the official Argentina team design, Messi's number 10 print, and ADIDAS branding. It is manufactured under license in India.",
  },
  {
    question: "How should I care for the jersey?",
    answer:
      "Machine wash cold with similar colours, inside out. Do not bleach, do not iron directly on the print. Tumble dry low or hang dry. Following these instructions will keep the colours and printing looking fresh for years.",
  },
  {
    question: "How does the Buy 3 Get 1 Free offer work?",
    answer:
      "When you add 3 jerseys to your cart, the system automatically applies the discount for 1 free jersey. You can mix sizes — for example, buy S, M, L and get one XL free. The discount is calculated as the price of the cheapest item in the group. This offer is valid while stocks last.",
  },
  {
    question: "Can I return or exchange if it doesn't fit?",
    answer:
      "Yes! We offer a 7-day easy return/exchange policy. If the size doesn't fit, you can request an exchange for a different size. The jersey must be unworn, unwashed, and in its original packaging. We also provide free delivery on all purchases.",
  },
  {
    question: "Is this the same quality as the official match jersey?",
    answer:
      "While this is a replica and not the official on-field match jersey, the quality is remarkably close. The fabric is breathable and comfortable, the stitching is neat, and the print detailing is accurate. At \u20B9499 (vs \u20B92,500+ for official), it offers exceptional value and is perfect for fans, casual wear, and amateur football.",
  },
];

// -------------------------------------------------------------------
// Lookup helper — maps a slug to its product data
// Use this for the reusable WorldCup2026Section component
// -------------------------------------------------------------------
export const WC2026_PRODUCTS_BY_SLUG: Record<
  string,
  {
    product: Product;
    folder: string;
    images: string[];
    sizes: string[];
    bundleOffer: typeof WC2026_BUNDLE_OFFER;
    reviews: ProductReviewDetail[];
    reviewSummary: typeof WC2026_REVIEW_SUMMARY;
    faqs: typeof WC2026_FAQS;
  }
> = {
  "messi-argentina-2026-jersey": {
    product: WC2026_PRODUCT,
    folder: WC2026_FOLDER,
    images: WC2026_PRODUCT_IMAGES,
    sizes: WC2026_SIZES,
    bundleOffer: WC2026_BUNDLE_OFFER,
    reviews: WC2026_REVIEWS,
    reviewSummary: WC2026_REVIEW_SUMMARY,
    faqs: WC2026_FAQS,
  },
};
