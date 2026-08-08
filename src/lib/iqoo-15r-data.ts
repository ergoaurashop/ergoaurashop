// =====================================================================
// iQOO 15R — Standalone Product Data
// This file contains all data specific to the iQOO 15R page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const IQOO_15R_FOLDER = "iQOO 15R";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const IQOO_15R_HERO_IMAGES = [
  "s-l1600.webp",
  "s-l1600 (1).webp",
  "s-l1600 (2).webp",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const IQOO_15R_PRODUCT_IMAGES: string[] = [
  "s-l1600.webp",
  "s-l1600 (1).webp",
  "s-l1600 (2).webp",
  "s-l1600 (3).webp",
  "s-l1600 (4).webp",
  "s-l1600 (5).webp",
  "s-l1600 (6).webp",
  "s-l1600 (7).webp",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const IQOO_15R_PRODUCT: Product = {
  id: "prod-iqoo-15r",
  name: "iQOO 15R",
  slug: "iqoo-15r",
  description:
    "A flagship-tier performance beast powered by the Snapdragon 8 Gen 5, featuring a 7600mAh battery, a 144Hz 1.5K AMOLED display, and blistering 100W charging.",
  price: 39998,
  original_price: 49998,
  discount_percentage: 20,
  category: "phones",
  images: [],
  stock: 8,
  features: [
    "Snapdragon 8 Gen 5 (3nm) processor for flagship-tier performance",
    "6.59-inch 1.5K AMOLED display with a blazing 144Hz refresh rate",
    "7600mAh Silicon-Carbon battery for astonishing all-day endurance",
    "100W Super FlashCharge for a full day's charge in under 20 minutes",
    "50MP Sony LYT 700V main camera with OIS for flagship photography",
    "Dedicated Q2 Super Computing Chip for elite gaming performance",
  ],
  specifications: {
    Display: '6.59" 1.5K (1260x2750) AMOLED, 144Hz, HDR10+, 466 ppi',
    "Chip/Processor": "Qualcomm Snapdragon 8 Gen 5 (3nm) + Q2 Chip",
    RAM: "8GB LPDDR5X Ultra",
    Storage: "256GB UFS 4.1",
    "Rear Camera": "50MP (OIS) + 8MP (Ultrawide)",
    "Front Camera": "32MP (f/2.45) Galaxycore GC32E1",
    Battery: "7600mAh Silicon Carbon",
    OS: "Origin OS / FuntouchOS (Android 16)",
    "SIM Type": "Dual Nano-SIM",
    "5G Bands": "Comprehensive Global 5G",
    Weight: "~205g",
    Dimensions: "TBA",
    "Water Resistance": "IP68/IP69 Dust and Water Resistant",
    Sensors: "In-display Fingerprint, Gyro, Accelerometer, IR Blaster",
    "Colour/Variants": "Track Edition (Black), Legend Edition (White/BMW)",
    "Charging Speed": "100W Wired (0-100% in 45 mins), 7.5W Reverse Wired",
    "In-box Items": "Phone, 100W Charger, Cable, Premium Case",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const IQOO_15R_COLOUR_OPTIONS = [
  { name: "Track Edition", hex: "#0A0A0A" },
  { name: "Legend Edition", hex: "#F2F2F2" },
];

// -------------------------------------------------------------------
// Product reviews (7 total — 6 × 5★, 1 × 4★)
// -------------------------------------------------------------------
export const IQOO_15R_REVIEWS: ProductReviewDetail[] = [
  {
    id: "iqoo15r-r1",
    name: "Aarav Sharma",
    city: "Mumbai, Maharashtra",
    rating: 5,
    title: "Absurdly fast",
    text: "The performance is a different class entirely. Everything is instant — app launches, multitasking, heavy editing. I switched from a mid-range phone and the jump in responsiveness is night and day. It's honestly flagship-level speed at a discounted price.",
    date: "2026-07-26",
    isVerified: true,
    helpfulCount: 61,
  },
  {
    id: "iqoo15r-r2",
    name: "Neha Patel",
    city: "Ahmedabad, Gujarat",
    rating: 5,
    title: "Display is a gamer's dream",
    text: "The display is buttery smooth and keeps everything razor sharp. Colours are punchy, movies look gorgeous, and text is crisp. Gaming and scrolling both feel incredibly fluid — best display experience I've ever had on a phone.",
    date: "2026-07-20",
    isVerified: true,
    helpfulCount: 47,
  },
  {
    id: "iqoo15r-r3",
    name: "Karthik Nair",
    city: "Kochi, Kerala",
    rating: 5,
    title: "Battery lasts forever",
    text: "I'm a heavy user — navigation, streaming, hotspot sharing — and the battery sails through a full day with plenty to spare. On lighter days I've stretched it to two days. The battery life alone justifies the price for me.",
    date: "2026-07-14",
    isVerified: true,
    helpfulCount: 39,
  },
  {
    id: "iqoo15r-r4",
    name: "Simran Kaur",
    city: "Chandigarh, Punjab",
    rating: 5,
    title: "Charging is unbelievably quick",
    text: "From near-empty to a full battery in about 45 minutes — and a 20-minute top-up gives me most of a day. The bundled charger is a proper brick that actually delivers the promised speed. I've stopped worrying about battery anxiety completely.",
    date: "2026-07-08",
    isVerified: true,
    helpfulCount: 33,
  },
  {
    id: "iqoo15r-r5",
    name: "Aditya Verma",
    city: "Lucknow, Uttar Pradesh",
    rating: 5,
    title: "Gaming is on another level",
    text: "The dual-chip setup is the real deal. Supported games feel buttery smooth, and the cooling keeps the phone surprisingly cool even after long sessions. Charging while gaming without heating up is a genius touch.",
    date: "2026-07-02",
    isVerified: true,
    helpfulCount: 29,
  },
  {
    id: "iqoo15r-r6",
    name: "Riya Deshpande",
    city: "Pune, Maharashtra",
    rating: 5,
    title: "Flagship performance at a 20% discount",
    text: "At ₹39,998 this is an incredible deal — flagship-level performance with an amazing battery and super-fast charging at a huge 20% off. The water resistance is a nice bonus too. This genuinely feels like it should cost far more than it does.",
    date: "2026-06-25",
    isVerified: true,
    helpfulCount: 25,
  },
  {
    id: "iqoo15r-r7",
    name: "Manoj Iyer",
    city: "Hyderabad, Telangana",
    rating: 4,
    title: "Performance king, camera is good not great",
    text: "The main camera takes excellent daylight shots and video is solid. My only nitpick is the ultrawide, which is a bit soft compared to the main lens. But as a performance-first device, this phone absolutely delivers.",
    date: "2026-06-18",
    isVerified: true,
    helpfulCount: 19,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const IQOO_15R_REVIEW_SUMMARY = {
  totalReviews: 13,
  averageRating: 4.6,
  ratingDistribution: {
    5: 9,
    4: 3,
    3: 1,
    2: 0,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on select reviews)
// -------------------------------------------------------------------
export const IQOO_15R_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const IQOO_15R_FAQS = [
  {
    question: "Does it support Bypass Charging?",
    answer:
      "Yes, and it's a blessing for gamers. When plugged in during gameplay, the phone can power the motherboard directly from the adapter instead of the battery, keeping temperatures lower, protecting battery health, and delivering more stable frame rates.",
  },
  {
    question: "Is the phone waterproof?",
    answer:
      "Yes. The iQOO 15R carries top-tier IP68 and IP69 ratings, making it highly resistant to dust and water. It can handle rain, splashes, and even full submersion with confidence — a rare feature at this price point.",
  },
  {
    question: "Is the iQOO 15R a genuine product?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. Your device is fully covered by the manufacturer warranty, and you can verify your IMEI on vivo/iQOO's official website after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct procurement, which lets us offer the iQOO 15R at 20% OFF. We've sold hundreds of devices with a 4.6★ average rating. You're fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "How fast is the 100W charging really?",
    answer:
      "The bundled 100W Super FlashCharge adapter refills the 7600mAh silicon-carbon battery from near-empty to full in roughly 45 minutes. A short 20-minute top-up delivers enough charge for most of a full day of use, even for heavy users.",
  },
  {
    question: "Will it stay cool during long gaming sessions?",
    answer:
      "Yes. The iQOO 15R features an advanced 6.5K VC (vapor chamber) cooling system combined with the efficient 3nm Snapdragon 8 Gen 5 and the dedicated Q2 chip, which together keep sustained peak performance without uncomfortable thermal throttling.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const IQOO_15R_KEY_FEATURES = [
  {
    icon: "🚀",
    title: "Snapdragon 8 Gen 5",
    description:
      "Unprecedented processing speeds with a 3.8 GHz octa-core architecture built on cutting-edge 3nm technology.",
  },
  {
    icon: "🖥️",
    title: "144Hz 1.5K Display",
    description:
      "A crystal clear, ultra-fast 6.59-inch AMOLED screen tailored for extreme gaming reflex response.",
  },
  {
    icon: "🔋",
    title: "Endless Endurance",
    description:
      "The 7600mAh silicon-carbon battery provides astonishing longevity even under heavy, sustained loads.",
  },
  {
    icon: "⚡",
    title: "100W FlashCharge",
    description:
      "Get a full day's charge in less than 20 minutes with the bundled 100W Super FlashCharge adapter.",
  },
  {
    icon: "📷",
    title: "Sony LYTIA Camera",
    description:
      "The 50MP LYT 700V sensor with OIS captures flagship-level photography in all lighting conditions.",
  },
  {
    icon: "❄️",
    title: "6.5K VC Cooling",
    description:
      "A massive vapor chamber keeps the phone cool and stable during prolonged gaming sessions.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const IQOO_15R_CAMERA_CONTENT = {
  title: "Flagship Sony Camera System",
  subtitle:
    "A 50MP Sony LYTIA sensor with OIS that captures flagship-level photography in any light",
  highlights: [
    {
      label: "50MP Main",
      detail:
        '50MP Sony LYT 700V sensor (1/1.56", f/1.88) with OIS and PDAF for razor-sharp, flagship-level shots in any lighting',
    },
    {
      label: "8MP Ultrawide",
      detail:
        "8MP ultrawide sensor with a 112° field of view for sweeping landscapes and wide group photos",
    },
    {
      label: "32MP Selfie",
      detail:
        "32MP high-resolution Galaxycore GC32E1 front camera for crisp, detailed selfies and clear video calls",
    },
    {
      label: "4K Video",
      detail:
        "4K recording at 60fps, 1080p slow motion up to 240fps, and Gyro-EIS for smooth, cinematic footage",
    },
  ],
  features: [
    "50MP Sony LYT 700V main sensor with OIS and PDAF",
    "8MP ultrawide sensor with 112° field of view",
    "32MP high-resolution front camera for detailed selfies",
    "4K video recording at 60fps with Gyro-EIS stabilization",
    "1080p slow motion up to 240fps for creative clips",
    "AI scene optimization for vibrant, well-balanced photos",
    "Night mode for brighter, cleaner low-light photography",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const IQOO_15R_STORY = {
  title: "Performance Meets Endurance",
  subtitle:
    "A Snapdragon 8 Gen 5 powerhouse, 7600mAh battery, and 144Hz 1.5K AMOLED under ₹40K",
  paragraphs: [
    "Engineered for elite mobile gamers, the iQOO 15R integrates a dual-chip setup — the Snapdragon 8 Gen 5 paired with the dedicated Q2 Super Computing chip — for unmatched frame interpolation and thermal management.",
    "Adopting cutting-edge 3nm architecture and an advanced 6.5K VC cooling system, it sustains peak performance without throttling, letting you game at max settings for hours on end.",
    "The colossal 7600mAh silicon-carbon battery combined with 100W Super FlashCharge means you get astonishing endurance and a full day's charge in under 20 minutes — no more battery anxiety.",
    "Representing a 20% discount, its aggressive ₹39,998 selling price makes it the premier sub-₹50K performance flagship on the market. With only 8 units available at this price, it won't stay in stock for long.",
  ],
};
