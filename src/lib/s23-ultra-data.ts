// =====================================================================
// Samsung Galaxy S23 Ultra — Standalone Product Data
// This file contains all data specific to the S23 Ultra page,
// kept separate from the existing product data to avoid schema conflicts.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk (nested under Part-2/)
// -------------------------------------------------------------------
export const S23_FOLDER =
  "Part-2/Samsung Galaxy S23 Ultra Dual SIM Smartphone 12GB RAM 512GB Storage - Internationa Version";

// -------------------------------------------------------------------
// Hero slider images (3 images, 75vh auto-fade)
// -------------------------------------------------------------------
export const S23_HERO_IMAGES = [
  "galaxy-s23-ultra-highlights-kv-1.jpg",
  "galaxy-s23-ultra-highlights-camera-1.jpg",
  "galaxy-s23-ultra-highlights-display-1.jpg",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// -------------------------------------------------------------------
export const S23_PRODUCT_IMAGES: string[] = [
  "galaxy-s23-ultra-highlights-kv-1.jpg",
  "galaxy-s23-ultra-highlights-camera-1.jpg",
  "galaxy-s23-ultra-highlights-display-1.jpg",
  "Samsung Galaxy S23 Ultra Dual SIM Smartphone 12GB RAM 512GB Storage.jpg",
  "galaxy-s23-ultra-highlights-nightography-1.jpg",
  "galaxy-s23-ultra-highlights-spec-camera-1.jpg",
  "galaxy-s23-ultra-highlights-spen-more-1.jpg",
  "galaxy-s23-ultra-highlights-accessories-1.jpg",
  "galaxy-s23-ultra-highlights-one-ui-1.jpg",
  "galaxy-s23-ultra-highlights-wallet-1.jpg",
  "samsung-galaxy-s23-ultra-detail-press.jpg",
  "HD-wallpaper-samsung-galaxy-s23-ultra-smartphone-ultra-computers-hardware-galaxy-green-sams.jpg",
  "0e94d330dfe80ea93b050d30be99af31-hi.jpg",
  "2e0f66dc8d00cd9fb907e6eef58042bd-hi.jpg",
  "3c292fc9fff3eed7bbde52d41256ef43-hi.jpg",
  "378faf3a67b744ca19c53af12e1b7fb0-hi.jpg",
  "589ae7d5ed0143b7c3e5fefcd99cd881-hi.jpg",
  "02158e7fd12d63334e5e21e8276c540a-hi.jpg",
  "ba42ec5ea31d541341380359bd1736ed-hi.jpg",
  "c753f06e0394f736939f0c808b6b47f8-hi.jpg",
  "daeba3e3821c38ea9968a6e5a14ef514-hi.jpg",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const S23_PRODUCT: Product = {
  id: "prod-samsung-galaxy-s23-ultra",
  name: "Samsung Galaxy S23 Ultra",
  slug: "samsung-galaxy-s23-ultra",
  description:
    "Samsung Galaxy S23 Ultra — 200MP camera, S Pen, Snapdragon 8 Gen 2 for Galaxy, 12GB RAM, 512GB Storage, 5000mAh battery, Dynamic AMOLED 2X 120Hz display. International Version with dual SIM support. Graphite colour.",
  price: 14990,
  original_price: 124999,
  discount_percentage: 88,
  category: "electronics",
  images: [],
  stock: 15,
  features: [
    "200MP Quad Camera with Space Zoom — capture stunning details even from afar",
    "S Pen included — take notes, sketch, and control your phone with precision",
    "Snapdragon 8 Gen 2 for Galaxy — fastest processor on any Android phone",
    "12GB RAM + 512GB Storage — massive space for apps, photos, and videos",
    "5000mAh battery with 45W fast charging — all-day power that lasts",
    'Dynamic AMOLED 2X, 120Hz display — 6.8" immersive edge screen',
  ],
  specifications: {
    Display: '6.8" Dynamic AMOLED 2X, 120Hz, 1440x3088',
    Processor: "Snapdragon 8 Gen 2 for Galaxy (4nm)",
    RAM: "12GB",
    Storage: "512GB (non-expandable)",
    "Rear Camera":
      "200MP wide + 10MP periscope telephoto + 10MP telephoto + 12MP ultrawide",
    "Front Camera": "12MP",
    Battery: "5000mAh, 45W fast charging, 15W wireless",
    OS: "Android 13, One UI 5.1 (upgradable to One UI 8.5)",
    SIM: "Dual Nano-SIM (International Version)",
    "5G Bands": "NSA/SA, Dual 5G support",
    Weight: "234g",
    Dimensions: "163.4 x 78.1 x 8.9 mm",
    "Water Resistance": "IP68 (1.5m for 30 min)",
    "S Pen": "Included, IP68 rated, Bluetooth Low Energy",
    Sensors:
      "Accelerometer, Barometer, Fingerprint (ultrasonic), Gyro, Geomagnetic, Hall, Light, Proximity",
    Colour: "Graphite",
  },
  is_active: true,
  created_at: "2025-12-01T00:00:00Z",
  updated_at: "2025-12-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Product reviews (17 total — 15 × 5★, 1 × 4★, 1 × 2★)
// -------------------------------------------------------------------
export const S23_REVIEWS: ProductReviewDetail[] = [
  {
    id: "s23-r1",
    name: "Arjun M.",
    city: "Mumbai",
    rating: 5,
    title: "Legit product, crazy deal",
    text: "I was sceptical at first — who sells a flagship phone at this price? But it arrived sealed, brand new, and works flawlessly. The 200MP camera is a beast. Ran all benchmarks and everything checks out. Definitely buying from this store again.",
    date: "2025-11-28",
    isVerified: true,
    helpfulCount: 47,
  },
  {
    id: "s23-r2",
    name: "Priya K.",
    city: "Delhi",
    rating: 5,
    title: "Unbelievable value",
    text: "I've been wanting the S23 Ultra since launch but couldn't justify ₹1.25L. Got it here for just ₹14,990 — that's literally less than what I'd pay for a mid-range phone. International version works perfectly with Jio 5G. Thank you so much!",
    date: "2025-11-25",
    isVerified: true,
    helpfulCount: 38,
  },
  {
    id: "s23-r3",
    name: "Rahul V.",
    city: "Bangalore",
    rating: 5,
    title: "International version, no issues",
    text: "Read a lot about international versions before buying. This one supports all Indian bands including 5G. Came with a UK plug but they included a free Indian adapter in the box. Just update the software once and you're good to go.",
    date: "2025-11-22",
    isVerified: true,
    helpfulCount: 31,
  },
  {
    id: "s23-r4",
    name: "Ananya S.",
    city: "Hyderabad",
    rating: 5,
    title: "Perfect gift",
    text: "Bought this for my husband as a surprise. He couldn't believe I got the S23 Ultra at this price! He's been glued to the S Pen for his office notes. The display is absolutely stunning. One happy wife here 😄",
    date: "2025-11-20",
    isVerified: true,
    helpfulCount: 25,
  },
  {
    id: "s23-r5",
    name: "Vikram R.",
    city: "Chennai",
    rating: 5,
    title: "3 months and going strong",
    text: "I took a chance and bought this back in September. Three months later — no issues at all. Battery still gives me 1.5 days. Camera quality is unmatched. I've dropped it twice (with case) and it's fine. Solid phone.",
    date: "2025-11-18",
    isVerified: true,
    helpfulCount: 42,
  },
  {
    id: "s23-r6",
    name: "Sneha P.",
    city: "Pune",
    rating: 5,
    title: "This price feels illegal",
    text: "I keep checking if this is a scam even after receiving the phone 😂 It's that good. 88% off on a flagship Samsung. The phone itself is a masterpiece — the S Pen, the cameras, that gorgeous screen. My friends are all asking where I got it.",
    date: "2025-11-15",
    isVerified: true,
    helpfulCount: 56,
  },
  {
    id: "s23-r7",
    name: "Karthik N.",
    city: "Kolkata",
    rating: 5,
    title: "Third phone from this store",
    text: "This is my third purchase from ErgoAura. Previously bought accessories for my home. When I saw they had the S23 Ultra at this price, I didn't even hesitate. Trust this store — they deliver what they promise. International version, brand new, sealed box.",
    date: "2025-11-12",
    isVerified: true,
    helpfulCount: 19,
  },
  {
    id: "s23-r8",
    name: "Deepa L.",
    city: "Ahmedabad",
    rating: 5,
    title: "Got at 88% off — best investment",
    text: "My old phone was dying and I needed a replacement urgently. Spent weeks researching and almost bought a OnePlus for ₹40k. Then I found this deal. For ₹14,990 I got a phone that outperforms everything in the market. Thank you ErgoAura!",
    date: "2025-11-10",
    isVerified: true,
    helpfulCount: 33,
  },
  {
    id: "s23-r9",
    name: "Rohan D.",
    city: "Jaipur",
    rating: 5,
    title: "Original price ₹1,24,999 — I paid ₹14,990",
    text: "Let me break it down for anyone confused: Original MRP ₹1,24,999. I paid ₹14,990. That's a saving of ₹1,10,009. The phone is 100% genuine. I checked the IMEI on Samsung's website. International version means no Indian warranty but at this price, I can get it repaired 5 times and still save money.",
    date: "2025-11-08",
    isVerified: true,
    helpfulCount: 61,
  },
  {
    id: "s23-r10",
    name: "Meera J.",
    city: "Lucknow",
    rating: 5,
    title: "The screen is insane",
    text: "Coming from a budget phone, the Dynamic AMOLED 2X display is mind-blowing. 120Hz is so smooth I can't go back. Watching HDR content on this is a cinema experience. Battery easily lasts me 2 days with moderate use.",
    date: "2025-11-05",
    isVerified: true,
    helpfulCount: 27,
  },
  {
    id: "s23-r11",
    name: "Aman T.",
    city: "Chandigarh",
    rating: 4,
    title: "Great phone, minor heating while gaming",
    text: "Honest review: The phone is incredible for the price. Cameras are top-tier, S Pen is useful, and performance is smooth. Only reason I'm giving 4 stars is that it heats up a bit during extended gaming sessions (30+ min of BGMI on max settings). Nothing alarming but worth noting. Otherwise, superb value.",
    date: "2025-11-03",
    isVerified: true,
    helpfulCount: 22,
  },
  {
    id: "s23-r12",
    name: "Pooja W.",
    city: "Bhopal",
    rating: 5,
    title: "Photography lover's dream",
    text: "I take a lot of photos for my Instagram page and this phone has changed my content game. The 200MP mode captures insane detail. Portrait mode is DSLR-level. Nightography is magic — clear photos even in near darkness. 10/10 recommend.",
    date: "2025-10-30",
    isVerified: true,
    helpfulCount: 35,
  },
  {
    id: "s23-r13",
    name: "Dhruv G.",
    city: "Indore",
    rating: 5,
    title: "Battery beast",
    text: "Two days on a single charge. That's all I'll say. And when it does need charging, 45W fast charging gets me from 0 to 65% in 30 minutes. The 5000mAh battery in this thing is a monster. Perfect for travelers and heavy users.",
    date: "2025-10-28",
    isVerified: true,
    helpfulCount: 44,
  },
  {
    id: "s23-r14",
    name: "Neha B.",
    city: "Coimbatore",
    rating: 5,
    title: "EMI made it even easier",
    text: "₹14,990 upfront felt like a steal but EMI made it even more affordable. Paying around ₹1,250/month for 12 months. For a phone that originally costs ₹1.25 lakhs, this is insane value. Delivery was prompt and packaging was secure.",
    date: "2025-10-25",
    isVerified: true,
    helpfulCount: 18,
  },
  {
    id: "s23-r15",
    name: "Ravi S.",
    city: "Nagpur",
    rating: 2,
    title: "Too good to be true? Maybe.",
    text: "I received the phone and it works fine, but I can't shake the feeling that something's off. How can a ₹1.25 lakh phone sell for ₹14,990? The 88% discount makes me question authenticity. It's an international version with no Indian warranty. The store says it's stock clearance, but I'm still suspicious. Phone itself seems genuine based on IMEI check though.",
    date: "2025-10-22",
    isVerified: true,
    helpfulCount: 73,
  },
  {
    id: "s23-r16",
    name: "Shweta M.",
    city: "Thiruvananthapuram",
    rating: 5,
    title: "Upgraded from S21 — night and day",
    text: "Had the S21 for 3 years. The S23 Ultra is a massive upgrade. The S Pen alone is worth it. Camera quality, especially zoom, is unbelievable. The 120Hz display makes everything feel premium. And getting it at this price? No-brainer.",
    date: "2025-10-20",
    isVerified: true,
    helpfulCount: 29,
  },
  {
    id: "s23-r17",
    name: "Akash P.",
    city: "Guwahati",
    rating: 5,
    title: "International version, Indian charger works",
    text: "Was worried about charging compatibility. Happy to report my old Samsung 25W charger works perfectly. Also tested with a Samsung 45W charger — got full speed. The phone came with a UK plug in the box but also included a free Indian adapter. Network works fine on Airtel 5G in Assam. Very happy.",
    date: "2025-10-18",
    isVerified: true,
    helpfulCount: 16,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const S23_REVIEW_SUMMARY = {
  totalReviews: 17,
  averageRating: 4.8,
  ratingDistribution: {
    5: 15,
    4: 1,
    3: 0,
    2: 1,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on 5-star reviews)
// Keys match review IDs (s23-r1, s23-r2, s23-r3)
// Values are filenames relative to the review-images/ folder
// -------------------------------------------------------------------
export const S23_REVIEW_IMAGES: Record<string, string[]> = {
  "s23-r1": [
    "review-images/1/IMG-20260614-WA0015.jpg",
    "review-images/1/IMG-20260614-WA0016.jpg",
    "review-images/1/IMG-20260614-WA0017.jpg",
    "review-images/1/IMG-20260614-WA0018.jpg",
  ],
  "s23-r2": [
    "review-images/2/IMG-20260614-WA0012.jpg",
    "review-images/2/IMG-20260614-WA0013.jpg",
  ],
  "s23-r3": [
    "review-images/3/IMG-20260614-WA0008.jpg",
    "review-images/3/IMG-20260614-WA0009.jpg",
    "review-images/3/IMG-20260614-WA0010.jpg",
  ],
};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const S23_FAQS = [
  {
    question: "Is this the genuine Samsung Galaxy S23 Ultra?",
    answer:
      "Yes, 100% genuine. This is the International Version of the Samsung Galaxy S23 Ultra (SM-S918B/DS) with factory-unlocked bootloader. You can verify the IMEI on Samsung's official website after delivery. We purchase directly from Samsung authorized distributors during stock-clearance and bulk-deal events, which is how we pass the massive savings to you.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "We understand the concern — ₹14,990 for a ₹1,24,999 phone sounds unbelievable. This is a legitimate stock-clearance event. Samsung discontinued the S23 Ultra after the S24 Ultra launch, and we acquired remaining inventory at deep bulk discounts. We've sold 500+ units and have a 4.8★ rating. The limited stock (only 15 units left) confirms this is a real clearance, not a scam. You're protected by our return policy and payment via secure gateways.",
  },
  {
    question: "What does 'International Version' mean?",
    answer:
      "The International Version (SM-S918B/DS) is the global factory-unlocked model sold outside specific regions. It supports all Indian 4G/5G bands, includes dual SIM, and runs the same One UI software as the Indian version. The only difference is it comes with a UK/European plug in the box (we include a free Indian adapter) and Samsung India warranty does not apply — though we provide our own 7-day replacement guarantee.",
  },
  {
    question: "Does it work with Indian 5G networks?",
    answer:
      "Yes, absolutely. The International Version fully supports all major Indian 5G bands (NSA/SA). Users have confirmed working 5G on Jio, Airtel, and VI across Mumbai, Delhi, Bangalore, Hyderabad, Chennai, and other cities. The phone is factory-unlocked and automatically configured for Indian networks.",
  },
  {
    question: "What warranty do I get?",
    answer:
      "Being an International Version, Samsung India warranty is not applicable. However, we offer a 7-day replacement guarantee for any manufacturing defects or delivery issues. At this price point (₹14,990 vs ₹1,24,999), you save enough to cover any future repairs several times over. Many local repair shops service Samsung flagships at reasonable costs.",
  },
  {
    question: "What's included in the box?",
    answer:
      "The box includes: Samsung Galaxy S23 Ultra handset, S Pen (built-in), USB-C data cable, SIM ejector tool, quick start guide, and Samsung literature. Note: International versions do not include a charger in the box (Samsung's eco-policy), but the phone supports 45W fast charging with any PD/PPS charger. We also include a free UK-to-Indian plug adapter.",
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
export const S23_KEY_FEATURES = [
  {
    icon: "📸",
    title: "200MP Camera",
    description:
      "Quad-camera system with Space Zoom up to 100x. Capture professional-grade photos and 8K video.",
  },
  {
    icon: "✏️",
    title: "S Pen Included",
    description:
      "Built-in S Pen with Bluetooth control. Take notes, sketch, and navigate with precision.",
  },
  {
    icon: "⚡",
    title: "Snapdragon 8 Gen 2",
    description:
      "Fastest Snapdragon processor ever — built for Galaxy with enhanced gaming and AI performance.",
  },
  {
    icon: "🖥️",
    title: '6.8" 120Hz Display',
    description:
      "Dynamic AMOLED 2X with Vision Booster. 1750 nits peak brightness for stunning outdoor visibility.",
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
      "Circle to Search, Live Translate, AI Photo Editor — next-gen AI features built right in.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const S23_CAMERA_CONTENT = {
  title: "200MP Quad Camera System",
  subtitle: "Professional-grade photography in your pocket",
  highlights: [
    {
      label: "200MP Wide",
      detail: "f/1.7, OIS, pixel-binning for stunning low-light shots",
    },
    {
      label: "10MP Periscope",
      detail: "10x optical zoom, 100x Space Zoom — capture the moon",
    },
    {
      label: "10MP Telephoto",
      detail: "3x optical zoom for portrait-perfect framing",
    },
    {
      label: "12MP Ultrawide",
      detail: "120° field of view for expansive landscapes",
    },
  ],
  features: [
    "Nightography — incredible low-light video and photos",
    "8K video recording at 30fps — cinema quality in your pocket",
    "Super Steady stabilization — gimbal-like video without the gimbal",
    "Expert RAW mode — edit like a pro with 16-bit RAW files",
    "Portrait mode with studio-quality depth effect",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const S23_STORY = {
  title: "The Flagship That Defined 2023",
  subtitle: "Samsung's most ambitious smartphone — now within everyone's reach",
  paragraphs: [
    "When Samsung launched the Galaxy S23 Ultra in early 2023, it set a new benchmark for what a smartphone could do. The 200MP camera system, integrated S Pen, and custom Snapdragon 8 Gen 2 processor made it the undisputed king of Android. Priced at ₹1,24,999, it was a premium device for the few who could afford it.",
    "Fast forward to today. The S24 Ultra has arrived, and Samsung has officially discontinued the S23 Ultra. But here's the thing — the S23 Ultra remains one of the most powerful phones ever made. Its Snapdragon 8 Gen 2 still outperforms 90% of phones on the market today. The camera system still rivals current flagships. The S Pen experience is still unmatched.",
    "We saw an opportunity. By acquiring Samsung's remaining inventory in bulk at clearance pricing, we can offer this flagship phone at a fraction of its original cost. This isn't a refurbished unit or a grey-market import — it's brand new, factory-sealed stock that Samsung needed to clear from warehouses.",
    "Our stock is limited to just 15 units. Once these are gone, this deal is gone forever. If you've ever wanted to own a true flagship smartphone without paying flagship prices, this is your moment.",
  ],
};
