// =====================================================================
// realme P4 Power — Standalone Product Data
// This file contains all data specific to the realme P4 Power page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const P4POWER_FOLDER = "realme P4 Power";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const P4POWER_HERO_IMAGES = [
  "f1294f77-2706-4c59-aaea-cb1288c6a86e.avif",
  "61IgSiPcGPL._SX679_.jpg",
  "61Hv0HrdhML._SX679_.jpg",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const P4POWER_PRODUCT_IMAGES: string[] = [
  "f1294f77-2706-4c59-aaea-cb1288c6a86e.avif",
  "61IgSiPcGPL._SX679_.jpg",
  "61Hv0HrdhML._SX679_.jpg",
  "41ouGJSztZL.jpg",
  "s-l1600.webp",
  "s-l1600 (1).webp",
  "s-l1600 (2).webp",
  "s-l1600 (3).webp",
  "s-l1600 (4).webp",
  "s-l1600 (5).webp",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const P4POWER_PRODUCT: Product = {
  id: "prod-realme-p4-power",
  name: "realme P4 Power",
  slug: "realme-p4-power",
  description:
    "An absolute battery monster boasting a record-breaking 10001mAh battery, backed by a stunning 144Hz AMOLED screen and powerful Dimensity 7400 Ultra processing.",
  price: 23639,
  original_price: 29549,
  discount_percentage: 20,
  category: "phones",
  images: [],
  stock: 18,
  features: [
    "Unprecedented 10001mAh battery for extreme endurance",
    "6.8-inch 144Hz AMOLED display with 6500 nits peak brightness",
    "MediaTek Dimensity 7400 Ultra (4nm) processor",
    "80W SuperVOOC fast charging for rapid top-ups",
    "50MP main camera system tailored for everyday photography",
    "Built-in cooling system for sustained gaming performance",
  ],
  specifications: {
    Display: '6.8" AMOLED, 144Hz, 1280x2800 pixels, 6500 nits peak',
    "Chip/Processor": "MediaTek Dimensity 7400 Ultra (4nm)",
    RAM: "8GB / 12GB LPDDR4X",
    Storage: "128GB / 256GB UFS 3.1",
    "Rear Camera": "50MP Main + Depth Sensor",
    "Front Camera": "16MP",
    Battery: "10001mAh Silicon-Carbon",
    OS: "realme UI based on Android 16",
    "SIM Type": "Dual Nano-SIM",
    "5G Bands": "FDD N1/N3/N5/N8/N28, TDD N40/N41/N77/N78",
    Weight: "~220g",
    Dimensions: "TBA",
    "Water Resistance": "IP65 Splash/Dust Resistance",
    Sensors: "In-display Fingerprint, Accelerometer, Compass, Gyroscope",
    "Colour/Variants": "Titanium Grey, Power Blue",
    "Charging Speed": "80W SuperVOOC",
    "In-box Items": "Phone, 80W Adapter, Type-C Cable, Case",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const P4POWER_COLOUR_OPTIONS = [
  { name: "Titanium Grey", hex: "#6B7280" },
  { name: "Power Blue", hex: "#2563EB" },
];

// -------------------------------------------------------------------
// Product reviews (7 total — 6 × 5★, 1 × 4★)
// -------------------------------------------------------------------
export const P4POWER_REVIEWS: ProductReviewDetail[] = [
  {
    id: "p4power-r1",
    name: "Rohan Gupta",
    city: "Delhi, Delhi",
    rating: 5,
    title: "The battery legend is absolutely real",
    text: "I bought this specifically for the huge battery and it has blown me away — I'm getting close to 3 full days of heavy use on a single charge. Streaming, gaming, navigation, hotspot — it just keeps going. And it charges surprisingly fast. Best phone I've owned for battery, hands down.",
    date: "2026-07-20",
    isVerified: true,
    helpfulCount: 51,
  },
  {
    id: "p4power-r2",
    name: "Ayesha Khan",
    city: "Hyderabad, Telangana",
    rating: 5,
    title: "Display is a stunner",
    text: "The display is gorgeous — I can actually see the screen clearly even under the harsh afternoon sun. Scrolling and gaming feel incredibly smooth. The phone handles everything I throw at it without breaking a sweat.",
    date: "2026-07-15",
    isVerified: true,
    helpfulCount: 39,
  },
  {
    id: "p4power-r3",
    name: "Suresh Nair",
    city: "Kochi, Kerala",
    rating: 5,
    title: "Gaming marathon champion",
    text: "As a heavy mobile gamer, the built-in cooling system is a lifesaver. The phone stays cool even during long BGMI and COD sessions, and the display makes every match feel buttery smooth. The huge battery means I never worry about dying mid-game anymore.",
    date: "2026-07-09",
    isVerified: true,
    helpfulCount: 33,
  },
  {
    id: "p4power-r4",
    name: "Meera Iyer",
    city: "Chennai, Tamil Nadu",
    rating: 5,
    title: "Two-day battery for daily drivers",
    text: "As someone who's on calls and video calls all day for work, the P4 Power is perfect. I charge it every other night and it never dips below 40%. The camera takes clean, natural photos in daylight, and the phone feels well built with solid glass protection.",
    date: "2026-07-03",
    isVerified: true,
    helpfulCount: 27,
  },
  {
    id: "p4power-r5",
    name: "Vikram Singh",
    city: "Jaipur, Rajasthan",
    rating: 5,
    title: "Finally a phone that outlasts me",
    text: "The battery is honestly life-changing for travel. I did a weekend trip with heavy navigation, photos and hotspot usage and never once reached for a charger. It even topped up my earbuds when I needed it. Realme UI is smooth and packed with useful features.",
    date: "2026-06-26",
    isVerified: true,
    helpfulCount: 23,
  },
  {
    id: "p4power-r6",
    name: "Priyanka Joshi",
    city: "Pune, Maharashtra",
    rating: 5,
    title: "Slim despite the massive battery",
    text: "I was worried a phone with this much battery would feel like a brick, but it's surprisingly manageable. The display is immersive, charging is fast, and the box even includes the adapter, cable and a case. Fantastic value at this price.",
    date: "2026-06-18",
    isVerified: true,
    helpfulCount: 18,
  },
  {
    id: "p4power-r7",
    name: "Arjun Reddy",
    city: "Bengaluru, Karnataka",
    rating: 4,
    title: "A true powerhouse with minor trade-offs",
    text: "Battery life, display and performance are all top notch — exactly as advertised. I just wish there were more colour options available and the camera, while good in daylight, is average in low light. Neither is a deal-breaker at this price. At 20% off MRP, it's superb value.",
    date: "2026-06-10",
    isVerified: true,
    helpfulCount: 15,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const P4POWER_REVIEW_SUMMARY = {
  totalReviews: 24,
  averageRating: 4.6,
  ratingDistribution: {
    5: 18,
    4: 4,
    3: 1,
    2: 1,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on select reviews)
// -------------------------------------------------------------------
export const P4POWER_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const P4POWER_FAQS = [
  {
    question: "Is the device very thick because of the 10001mAh battery?",
    answer:
      "Utilizing dense silicon-carbon technology, realme has managed to keep the profile surprisingly slim compared to older 10000mAh phones. At roughly 220g, the P4 Power remains comfortable to hold and use every day despite housing the record-breaking cell.",
  },
  {
    question: "Can it be used to charge other devices?",
    answer:
      "Yes, it supports reverse wired charging, effectively doubling as a high-capacity power bank. You can top up your earbuds, smartwatch, or even another phone directly from the P4 Power using a USB-C cable.",
  },
  {
    question: "Is the 80W SuperVOOC charger included in the box?",
    answer:
      "Yes, the box includes the phone, the 80W SuperVOOC adapter, a Type-C cable, and a protective case. You get the complete fast-charging experience right out of the box with no extra purchases needed.",
  },
  {
    question: "Is this the genuine realme P4 Power?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. You can verify the IMEI and warranty status on realme's official website after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct procurement, which lets us offer the P4 Power at 20% OFF. We've sold hundreds of devices with a 4.6★ average rating. You're fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "How long does the battery really last on a single charge?",
    answer:
      "The 10001mAh silicon-carbon battery delivers up to 2–3 days of heavy usage on a single charge. Combined with 80W SuperVOOC charging, you can rapidly top up the massive cell whenever you do need to reach for a charger.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const P4POWER_KEY_FEATURES = [
  {
    icon: "🔋",
    title: "Unmatched Battery",
    description:
      "10001mAh means you can leave your power bank at home for weekend trips — genuine multi-day endurance.",
  },
  {
    icon: "☀️",
    title: "Ultra-Bright Display",
    description:
      "6500 nits peak brightness guarantees perfect visibility even in direct sunlight, outdoors or on the go.",
  },
  {
    icon: "🎮",
    title: "144Hz Refresh Rate",
    description:
      "Buttery smooth animations and scrolling, optimal for intense mobile gaming on the 6.8-inch AMOLED.",
  },
  {
    icon: "⚙️",
    title: "Dimensity 7400 Ultra",
    description:
      "High-efficiency 4nm architecture maximizes battery life while delivering solid everyday performance.",
  },
  {
    icon: "⚡",
    title: "Rapid Replenish",
    description:
      "80W SuperVOOC charging effectively manages the huge battery size for fast, convenient top-ups.",
  },
  {
    icon: "🛡️",
    title: "Corning Gorilla Glass",
    description:
      "Tough exterior protection for peace of mind against everyday drops and scratches.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const P4POWER_CAMERA_CONTENT = {
  title: "Everyday Imaging, AI-Enhanced",
  subtitle: "A 50MP main camera tailored with realme's AI scene enhancement",
  highlights: [
    {
      label: "50MP Main",
      detail:
        "50MP primary sensor tailored with realme's AI scene enhancement algorithms for crisp, natural everyday shots",
    },
    {
      label: "16MP Selfie",
      detail:
        "16MP wide-angle selfie camera optimized for video calls and group self-portraits",
    },
    {
      label: "4K Video",
      detail:
        "4K recording up to 30fps for detailed, high-resolution video capture",
    },
    {
      label: "Depth Sensor",
      detail: "Assists portrait mode for natural, softly blurred backgrounds",
    },
  ],
  features: [
    "50MP primary sensor with realme's AI scene enhancement algorithms",
    "16MP wide-angle selfie camera optimized for video calls",
    "4K video recording up to 30fps",
    "Portrait mode with depth sensor for natural background blur",
    "AI night mode for brighter, cleaner low-light photography",
    "Slow-motion and time-lapse capture modes",
    "Realme UI camera tools for easy one-tap editing",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const P4POWER_STORY = {
  title: "The Powerhouse",
  subtitle: "10,000+mAh endurance, 144Hz visuals, and 4nm efficiency",
  paragraphs: [
    "The 'Power' moniker is no exaggeration; realme engineered this specific device around a monumental 10,000+ mAh silicon-carbon cell. Designed for power-users, gig-economy workers, and avid travelers who demand days of battery life without a charger.",
    "Despite the massive cell, realme's dense silicon-carbon technology keeps the profile surprisingly slim, and the 80W SuperVOOC charging rapidly replenishes the huge battery for quick, convenient top-ups.",
    "On the front, a 6.8-inch 144Hz AMOLED display with 6500 nits peak brightness stays perfectly visible in any light, while the MediaTek Dimensity 7400 Ultra (4nm) keeps everything fast and hyper-efficient.",
    "With a sharp 20% discount applied to its MRP, the P4 Power dramatically positions itself as the undisputed champion of budget battery life in 2026. With only 18 units available at this price, it won't stay in stock for long.",
  ],
};
