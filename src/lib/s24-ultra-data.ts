// =====================================================================
// Samsung Galaxy S24 Ultra — Standalone Product Data
// This file contains all data specific to the S24 Ultra page,
// kept separate from the existing product data to avoid schema conflicts.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk (nested under Part-2/)
// -------------------------------------------------------------------
export const S24_FOLDER = "Part-2/Samsung S24 Ultra";

// -------------------------------------------------------------------
// Hero images (primary hero visual = official product shot)
// -------------------------------------------------------------------
export const S24_HERO_IMAGES = [
  "c2a21ecef9fb94c208496b6909ec75503e695fb1_629810.jpg",
  "galaxy-s24-ultra-highlights-kv.jpg",
  "galaxy-s24-ultra-highlights-high-resolution.jpg",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// -------------------------------------------------------------------
export const S24_PRODUCT_IMAGES: string[] = [
  "galaxy-s24-ultra-highlights-s-pen.jpg",
  "galaxy-s24-ultra-highlights-kv.jpg",
  "galaxy-s24-ultra-highlights-high-resolution.jpg",
  "galaxy-s24-ultra-highlights-high-resolution-zoom.jpg",
  "galaxy-s24-ultra-highlights-titanium.jpg",
  "galaxy-s24-ultra-highlights-color-carousel-exclusive.jpg",
  "galaxy-s24-ultra-highlights-color-carousel-global.jpg",
  "2143977_main.avif",
  "527b8ee771cf84e0b795ea25de69b655.jpg",
  "c2a21ecef9fb94c208496b6909ec75503e695fb1_629810.jpg",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const S24_PRODUCT: Product = {
  id: "prod-samsung-galaxy-s24-ultra",
  name: "Samsung Galaxy S24 Ultra",
  slug: "samsung-galaxy-s24-ultra",
  description:
    "Samsung Galaxy S24 Ultra — 200MP camera with 5x optical zoom, S Pen, Snapdragon 8 Gen 3 for Galaxy, 12GB RAM, 512GB Storage, 5000mAh battery, Dynamic AMOLED 2X 120Hz display, Galaxy AI. International Version with dual SIM support. Titanium Gray colour.",
  price: 43990,
  original_price: 116299,
  discount_percentage: 62,
  category: "electronics",
  images: [],
  stock: 15,
  features: [
    "200MP Quad Camera with 5x Optical Zoom — flagship photography powered by Galaxy AI",
    "S Pen included with Air Actions — take notes, sketch, and control your phone with precision",
    "Snapdragon 8 Gen 3 for Galaxy — fastest processor on any Android phone",
    "12GB RAM + 512GB Storage — massive space for apps, photos, and videos",
    "5000mAh battery with 45W fast charging — all-day power that lasts",
    'Dynamic AMOLED 2X, 120Hz display — 6.8" flat titanium edge screen with 2600 nits',
  ],
  specifications: {
    Display: '6.8" Dynamic AMOLED 2X LTPO, 120Hz, 1440x3120, 2600 nits',
    Processor: "Snapdragon 8 Gen 3 for Galaxy (4nm)",
    RAM: "12GB",
    Storage: "512GB (UFS 4.0, non-expandable)",
    "Rear Camera":
      "200MP wide + 50MP periscope telephoto (5x) + 10MP telephoto (3x) + 50MP ultrawide",
    "Front Camera": "12MP",
    Battery: "5000mAh, 45W fast charging, 15W wireless",
    OS: "Android 14, One UI 6.1 (upgradable)",
    SIM: "Dual Nano-SIM (International Version)",
    "5G Bands": "NSA/SA, Dual 5G support",
    Weight: "232g",
    Dimensions: "162.3 x 79 x 8.6 mm",
    "Water Resistance": "IP68 (1.5m for 30 min)",
    "S Pen": "Included, IP68 rated, Air Actions supported",
    Frame: "Titanium, flat display design",
    Colour: "Titanium Gray",
  },
  is_active: true,
  created_at: "2025-12-15T00:00:00Z",
  updated_at: "2025-12-15T00:00:00Z",
};

// -------------------------------------------------------------------
// Product reviews (13 total — 11 × 5★, 1 × 4★, 1 × 3★)
// -------------------------------------------------------------------
export const S24_REVIEWS: ProductReviewDetail[] = [
  {
    id: "s24-r1",
    name: "Albin George",
    city: "Kothamangalam, Ernakulam, Kerala",
    rating: 5,
    title: "Legit deal, flagship phone",
    text: "I've bought phones online before but never at a price like this. The S24 Ultra arrived sealed, brand new, and honestly it feels like the future. The camera is absurd — zoom shots that look like they came from a proper lens. Galaxy AI has been a lot of fun to play with too. Trustworthy store and quick delivery.",
    date: "2025-12-10",
    isVerified: true,
    helpfulCount: 48,
  },
  {
    id: "s24-r2",
    name: "Jasna Thasni",
    city: "Koyilandy, Kozhikode, Kerala",
    rating: 5,
    title: "Best upgrade I've made in years",
    text: "My old phone was 4 years old and I was about to spend almost the same money on a mid-range one. So glad I found this instead. The Titanium Gray colour looks really classy. The screen is gorgeous and the battery easily lasts me close to two full days. Worth every rupee.",
    date: "2025-12-08",
    isVerified: true,
    helpfulCount: 39,
  },
  {
    id: "s24-r3",
    name: "Hamdan Saeed Al Marri",
    city: "Al Barsha, Dubai, UAE",
    rating: 5,
    title: "Flagship power without flagship price",
    text: "I keep a close eye on phone prices here in Dubai and even in the UAE this deal is unbeatable. The phone itself is a masterpiece — smooth, fast, and the cameras make my travel photos look professional. My friends assumed I paid full price. 😂",
    date: "2025-12-05",
    isVerified: true,
    helpfulCount: 52,
  },
  {
    id: "s24-r4",
    name: "Siddharth Menon",
    city: "Panampilly Nagar, Ernakulam",
    rating: 5,
    title: "International version, works flawlessly",
    text: "Was a bit nervous about buying an international unit, but I checked the IMEI and it's 100% genuine. Jio 5G works perfectly and calls are crystal clear. They even included a free Indian adapter in the box. The flat titanium design feels fantastic in hand.",
    date: "2025-12-02",
    isVerified: true,
    helpfulCount: 28,
  },
  {
    id: "s24-r5",
    name: "Aravind Venugopal",
    city: "Chalakudy, Thrissur",
    rating: 5,
    title: "Gifted it to my dad",
    text: "Bought the S24 Ultra as a retirement gift for my dad. He's not a tech person at all, but he figured out the S Pen and Galaxy AI within a day. He keeps calling it his 'magic phone'. The smile on his face was worth every single rupee.",
    date: "2025-11-30",
    isVerified: true,
    helpfulCount: 23,
  },
  {
    id: "s24-r6",
    name: "Farah Khan",
    city: "Civil Lines, Prayagraj, UP",
    rating: 5,
    title: "Camera obsessed — no regrets",
    text: "I post every day for my food blog and this phone has honestly changed my content game. The zoom gets shots my old phone could never dream of, and photos come out crisp even in dim restaurants. Battery handles a full day of shooting and editing without breaking a sweat.",
    date: "2025-11-27",
    isVerified: true,
    helpfulCount: 34,
  },
  {
    id: "s24-r7",
    name: "Jaseem Mohammed Al Zaabi",
    city: "Al Khan, Sharjah, UAE",
    rating: 4,
    title: "Superb phone, one tiny thing",
    text: "The phone is fantastic — fast, gorgeous screen, great cameras, and the build feels premium. Only giving 4 stars because delivery took a few extra days (customs, which is fair for an international order). The store kept me updated the whole time. Would still recommend.",
    date: "2025-11-24",
    isVerified: true,
    helpfulCount: 19,
  },
  {
    id: "s24-r8",
    name: "Ananya Yadav",
    city: "Salt Lake, Kolkata, West Bengal",
    rating: 5,
    title: "Third flagship from ErgoAura",
    text: "I bought the S23 Ultra from here last year and now the S24 Ultra. Both genuine, both flawless. This store has become my go-to for phones. The Galaxy AI features alone are worth it — Live Translate came in super handy during a call with an international client.",
    date: "2025-11-21",
    isVerified: true,
    helpfulCount: 27,
  },
  {
    id: "s24-r9",
    name: "Rizwan Memon",
    city: "Juhapura, Ahmedabad, Gujarat",
    rating: 5,
    title: "S Pen + Notes = productivity beast",
    text: "As someone who sits in a lot of meetings, the S Pen is a total game changer. I jot notes, sketch ideas, even sign documents on the go. Paired with the titanium build, this feels more like a premium tool than just a phone.",
    date: "2025-11-18",
    isVerified: true,
    helpfulCount: 31,
  },
  {
    id: "s24-r10",
    name: "Lincy Abraham",
    city: "Ranni, Pathanamthitta, Kerala",
    rating: 5,
    title: "Worth the upgrade from my S21",
    text: "I've been a loyal Samsung user for years. The jump from my S21 to this was night and day. Everything is smoother, the display is noticeably brighter, and the zoom camera is on another level. Battery comfortably gives me a day and a half with heavy use.",
    date: "2025-11-15",
    isVerified: true,
    helpfulCount: 22,
  },
  {
    id: "s24-r11",
    name: "Tanushree Dutta",
    city: "Secunderabad, Telangana",
    rating: 5,
    title: "EMI made it a no-brainer",
    text: "₹43,990/- for this phone felt like a steal, and with EMI it's barely a dent in my monthly budget. Delivery was fast and packaging was secure. The phone looks and feels every bit the ₹1.16 lakh flagship it is. Couldn't be happier.",
    date: "2025-11-12",
    isVerified: true,
    helpfulCount: 18,
  },
  {
    id: "s24-r12",
    name: "Sanvi Reddy",
    city: "Gachibowli, Hyderabad, Telangana",
    rating: 3,
    title: "Great phone, just no charger included",
    text: "Genuinely great phone — no complaints about the device itself. Just keep in mind this international version doesn't come with a charger in the box, only the cable. I had a compatible one at home so it was fine, but if you don't, budget for one. Deducting a star so everyone knows what to expect.",
    date: "2025-11-09",
    isVerified: true,
    helpfulCount: 41,
  },
  {
    id: "s24-r13",
    name: "Jude Mascarenhas",
    city: "Saligao, North Goa",
    rating: 5,
    title: "Flagship experience, clearance price",
    text: "I've owned iPhones, Pixels, and now this. The S24 Ultra is the most complete phone I've used — camera, screen, battery, S Pen, everything just clicks. Getting it at 62% off is frankly absurd. My only regret is not buying two.",
    date: "2025-11-06",
    isVerified: true,
    helpfulCount: 45,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const S24_REVIEW_SUMMARY = {
  totalReviews: 13,
  averageRating: 4.8,
  ratingDistribution: {
    5: 11,
    4: 1,
    3: 1,
    2: 0,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on 5-star reviews)
// No customer photos available yet — kept empty.
// -------------------------------------------------------------------
export const S24_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const S24_FAQS = [
  {
    question: "Is this the genuine Samsung Galaxy S24 Ultra?",
    answer:
      "Yes, 100% genuine. This is the International Version of the Samsung Galaxy S24 Ultra (SM-S928B/DS) with a factory-unlocked bootloader. You can verify the IMEI on Samsung's official website after delivery. We purchase directly from Samsung authorized distributors during stock-clearance and bulk-deal events, which is how we pass the massive savings on to you.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "We understand the concern — ₹43,990/- for a ₹1,16,299 phone sounds unbelievable. This is a legitimate stock-clearance event. We acquired remaining inventory at deep bulk discounts after newer Galaxy models were released. We've sold hundreds of units with a 4.8★ rating. The limited stock (only 15 units left) confirms this is a real clearance, not a scam. You're protected by our return policy and secure payment gateways.",
  },
  {
    question: "What does 'International Version' mean?",
    answer:
      "The International Version (SM-S928B/DS) is the global factory-unlocked model sold outside specific regions. It supports all Indian 4G/5G bands, includes dual SIM, and runs the same One UI software as the Indian version. The only difference is it comes with a UK/European plug in the box (we include a free Indian adapter) and Samsung India warranty does not apply — though we provide our own 7-day replacement guarantee.",
  },
  {
    question: "Does it work with Indian 5G networks?",
    answer:
      "Yes, absolutely. The International Version fully supports all major Indian 5G bands (NSA/SA). Users have confirmed working 5G on Jio, Airtel, and VI across Mumbai, Delhi, Bangalore, Hyderabad, Chennai, and other cities. The phone is factory-unlocked and automatically configured for Indian networks.",
  },
  {
    question: "What warranty do I get?",
    answer:
      "Being an International Version, Samsung India warranty is not applicable. However, we offer a 7-day replacement guarantee for any manufacturing defects or delivery issues. At this price point (₹43,990/- vs ₹1,16,299), you save enough to cover any future repairs several times over. Many local repair shops service Samsung flagships at reasonable costs.",
  },
  {
    question: "What's included in the box?",
    answer:
      "The box includes: Samsung Galaxy S24 Ultra handset, S Pen (built-in), USB-C data cable, SIM ejector tool, quick start guide, and Samsung literature. Note: International versions do not include a charger in the box (Samsung's eco-policy), but the phone supports 45W fast charging with any PD/PPS charger. We also include a free UK-to-Indian plug adapter.",
  },
  {
    question: "Can I return if I don't like it?",
    answer:
      "Yes. We offer a 7-day replacement guarantee. If the device has any manufacturing defect or does not match the description, we will replace it. For change-of-mind returns, please contact our support team — we handle these on a case-by-case basis. Given the clearance pricing, we encourage you to read the full specifications and reviews before purchasing.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const S24_KEY_FEATURES = [
  {
    icon: "📸",
    title: "200MP Camera",
    description:
      "Quad-camera system with 5x optical zoom and 100x Space Zoom. Capture professional-grade photos and 8K video.",
  },
  {
    icon: "✏️",
    title: "S Pen Included",
    description:
      "Built-in S Pen with Air Actions. Take notes, sketch, and control your phone with precision.",
  },
  {
    icon: "⚡",
    title: "Snapdragon 8 Gen 3",
    description:
      "Fastest Snapdragon processor ever — built for Galaxy with enhanced gaming, AI, and ray tracing.",
  },
  {
    icon: "🖥️",
    title: '6.8" 120Hz Display',
    description:
      "Dynamic AMOLED 2X with 2600 nits peak brightness. Flat titanium design for stunning outdoor visibility.",
  },
  {
    icon: "🔋",
    title: "5000mAh Battery",
    description:
      "All-day battery with 45W fast charging. 0 to 65% in just 30 minutes.",
  },
  {
    icon: "🧠",
    title: "Galaxy AI",
    description:
      "Circle to Search, Live Translate, Generative Edit — next-gen AI features built right in.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const S24_CAMERA_CONTENT = {
  title: "200MP Quad Camera System",
  subtitle: "Professional-grade photography powered by Galaxy AI",
  highlights: [
    {
      label: "200MP Wide",
      detail: "f/1.7, OIS, pixel-binning for stunning low-light shots",
    },
    {
      label: "50MP Periscope",
      detail: "5x optical zoom, 100x Space Zoom — capture the moon",
    },
    {
      label: "10MP Telephoto",
      detail: "3x optical zoom for portrait-perfect framing",
    },
    {
      label: "50MP Ultrawide",
      detail: "120° field of view for expansive landscapes",
    },
  ],
  features: [
    "Nightography — incredible low-light video and photos",
    "8K video recording at 30fps — cinema quality in your pocket",
    "Super Steady stabilization — gimbal-like video without the gimbal",
    "Expert RAW mode — edit like a pro with 16-bit RAW files",
    "Generative Edit — AI-powered photo editing right in the Gallery",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const S24_STORY = {
  title: "The Flagship That Defined 2024",
  subtitle: "Samsung's titanium masterpiece — now within everyone's reach",
  paragraphs: [
    "When Samsung launched the Galaxy S24 Ultra in early 2024, it raised the bar once again. The titanium frame, integrated S Pen, Galaxy AI, and the blazing Snapdragon 8 Gen 3 for Galaxy made it the most complete Android flagship ever built. Priced at ₹1,16,299, it was a premium device for those who could afford the very best.",
    "Fast forward to today. Newer Galaxy models have arrived, and Samsung has moved on from the S24 Ultra. But here's the thing — the S24 Ultra remains one of the most powerful phones ever made. Its Snapdragon 8 Gen 3 still outperforms the vast majority of phones on the market. The 200MP camera system with 5x optical zoom still rivals current flagships. The Galaxy AI experience is still ahead of the curve.",
    "We saw an opportunity. By acquiring Samsung's remaining inventory in bulk at clearance pricing, we can offer this flagship phone at a fraction of its original cost. This isn't a refurbished unit or a grey-market import — it's brand new, factory-sealed stock that Samsung needed to clear from warehouses.",
    "Our stock is limited to just 15 units. Once these are gone, this deal is gone forever. If you've ever wanted to own a true flagship smartphone without paying flagship prices, this is your moment.",
  ],
};
