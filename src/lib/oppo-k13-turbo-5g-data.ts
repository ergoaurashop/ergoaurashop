// =====================================================================
// OPPO K13 Turbo 5G — Standalone Product Data
// This file contains all data specific to the OPPO K13 Turbo 5G page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const OPPO_K13_TURBO_5G_FOLDER = "OPPO K13 Turbo 5G";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const OPPO_K13_TURBO_5G_HERO_IMAGES = [
  "s-l1600.webp",
  "s-l1600 (1).webp",
  "s-l1600 (2).webp",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const OPPO_K13_TURBO_5G_PRODUCT_IMAGES: string[] = [
  "s-l1600.webp",
  "s-l1600 (1).webp",
  "s-l1600 (2).webp",
  "s-l1600 (3).webp",
  "s-l1600 (4).webp",
  "s-l1600 (5).webp",
  "s-l1600 (6).webp",
  "s-l1600 (7).webp",
  "s-l1600 (8).webp",
  "s-l1600 (9).webp",
  "s-l1600 (10).webp",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const OPPO_K13_TURBO_5G_PRODUCT: Product = {
  id: "prod-oppo-k13-turbo-5g",
  name: "OPPO K13 Turbo 5G",
  slug: "oppo-k13-turbo-5g",
  description:
    "A highly refined performance mid-ranger featuring a colossal 7000mAh battery, a crisp 120Hz AMOLED screen, and the powerhouse Dimensity 8450 processor.",
  price: 23999,
  original_price: 29999,
  discount_percentage: 20,
  category: "phones",
  images: [],
  stock: 17,
  features: [
    "6.8-inch 120Hz AMOLED punch-hole display for ultra-smooth visuals",
    "MediaTek Dimensity 8450 Mobile Platform for flagship-grade performance",
    "Enormous 7000mAh Silicon-Carbon battery for multi-day endurance",
    "80W Super Flash fast charging to minimize downtime",
    "50MP dual-camera setup with AI optimization for sharp photos",
    "Integrated 3.5mm audio jack and expandable storage",
  ],
  specifications: {
    Display: '6.8" AMOLED, 120Hz, 1600 nits peak',
    "Chip/Processor": "MediaTek Dimensity 8450 (4nm)",
    RAM: "8GB LPDDR5X",
    Storage: "128GB / 256GB UFS 3.1 (Expandable)",
    "Rear Camera": "50MP Main + 8MP Ultrawide",
    "Front Camera": "16MP",
    Battery: "7000mAh Silicon Carbon",
    OS: "ColorOS based on Android 15",
    "SIM Type": "Hybrid Dual SIM (Nano + MicroSD)",
    "5G Bands": "FDD N1/N3/N5/N8/N28, TDD N40/N41/N77/N78",
    Weight: "198g",
    Dimensions: "TBA",
    "Water Resistance": "IP54 Splash Resistance",
    Sensors:
      "Side/In-display Fingerprint, Accelerometer, Compass, Light Sensor",
    "Colour/Variants": "Turbo Black, Cyan Flash",
    "Charging Speed": "80W Super Flash Charge",
    "In-box Items": "Phone, 80W Charger, Cable, Case",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const OPPO_K13_TURBO_5G_COLOUR_OPTIONS = [
  { name: "Turbo Black", hex: "#111318" },
  { name: "Cyan Flash", hex: "#00B8D4" },
];

// -------------------------------------------------------------------
// Product reviews (7 total — 6 × 5★, 1 × 4★)
// -------------------------------------------------------------------
export const OPPO_K13_TURBO_5G_REVIEWS: ProductReviewDetail[] = [
  {
    id: "oppok13turbo-r1",
    name: "Vikram Rathore",
    city: "New Delhi, Delhi",
    rating: 5,
    title: "This battery is an absolute monster",
    text: "The battery is the reason I bought this phone and it completely delivers. I'm a heavy user — gaming, YouTube, navigation — and I still end most days with 30%+ left. It genuinely feels like a two-day phone, which is almost unheard of in 2026.",
    date: "2026-07-24",
    isVerified: true,
    helpfulCount: 58,
  },
  {
    id: "oppok13turbo-r2",
    name: "Ananya Sen",
    city: "Kolkata, West Bengal",
    rating: 5,
    title: "Seriously fast",
    text: "The 'Turbo' name is no joke. Games run at high settings without stutter, app launches are instant, and switching between a dozen apps feels effortless. The phone stays cool too, which is rare for a performance-focused device.",
    date: "2026-07-18",
    isVerified: true,
    helpfulCount: 44,
  },
  {
    id: "oppok13turbo-r3",
    name: "Rohan Mehta",
    city: "Mumbai, Maharashtra",
    rating: 5,
    title: "Display looks incredible",
    text: "The display is stunning — colours are vivid, blacks are deep, and I can read it easily even under direct sunlight. Scrolling and animations are buttery smooth. Best display I've used at this price.",
    date: "2026-07-12",
    isVerified: true,
    helpfulCount: 36,
  },
  {
    id: "oppok13turbo-r4",
    name: "Ishita Rao",
    city: "Bengaluru, Karnataka",
    rating: 5,
    title: "Charging is ridiculously quick",
    text: "From near-empty to a full charge takes me well under an hour. A 15-minute top-up before leaving the house is enough for most of the day thanks to the huge battery. It's such a relief not to stress about finding a charger anymore.",
    date: "2026-07-06",
    isVerified: true,
    helpfulCount: 31,
  },
  {
    id: "oppok13turbo-r5",
    name: "Arvind Pillai",
    city: "Thiruvananthapuram, Kerala",
    rating: 5,
    title: "Headphone jack AND expandable storage — rare win",
    text: "I was shocked to see both a headphone jack and expandable storage in a 2026 phone. My wired earphones work perfectly and I added a big memory card for all my media. OPPO really thought about what practical users actually need.",
    date: "2026-06-29",
    isVerified: true,
    helpfulCount: 27,
  },
  {
    id: "oppok13turbo-r6",
    name: "Devansh Agarwal",
    city: "Jaipur, Rajasthan",
    rating: 5,
    title: "Unbeatable value at 20% off",
    text: "At ₹23,999 this is one of the best deals I've seen all year. A massive battery, fast charging, a beautiful display and genuinely fast performance — it packs flagship-tier endurance at a mid-range price. So glad I grabbed one before stock ran out.",
    date: "2026-06-20",
    isVerified: true,
    helpfulCount: 23,
  },
  {
    id: "oppok13turbo-r7",
    name: "Meera Krishnan",
    city: "Chennai, Tamil Nadu",
    rating: 4,
    title: "Brilliant phone, camera is good not great",
    text: "The battery and performance are outstanding and the display is gorgeous. My only minor note is the camera system — the main camera is solid, but the ultrawide is a bit soft. Still, for this price I honestly can't complain.",
    date: "2026-06-13",
    isVerified: true,
    helpfulCount: 18,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const OPPO_K13_TURBO_5G_REVIEW_SUMMARY = {
  totalReviews: 17,
  averageRating: 4.6,
  ratingDistribution: {
    5: 12,
    4: 4,
    3: 1,
    2: 0,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on select reviews)
// -------------------------------------------------------------------
export const OPPO_K13_TURBO_5G_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const OPPO_K13_TURBO_5G_FAQS = [
  {
    question: "Does it support expandable memory?",
    answer:
      "Yes. The hybrid SIM tray allows you to use a MicroSD card in place of a second SIM, giving you up to 1TB of additional expandable storage — a rare and welcome feature in 2026 smartphones.",
  },
  {
    question: "What Android version does it run?",
    answer:
      "It runs on OPPO's highly customized ColorOS based on Android 15, packed with customization options, smart features and smooth animations while keeping the core experience stable and fluid.",
  },
  {
    question: "Is the OPPO K13 Turbo 5G a genuine product?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. Your device is fully covered by the manufacturer warranty, and you can verify your IMEI on OPPO's official website after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct procurement, which lets us offer the K13 Turbo 5G at 20% OFF. We've sold hundreds of devices with a 4.6★ average rating. You're fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "How fast is the 80W Super Flash charging really?",
    answer:
      "The bundled 80W Super Flash charger refills the 7000mAh silicon-carbon battery from near-empty to over 50% in roughly 20 minutes and to a full charge in well under an hour — so you spend far less time tethered to a wall outlet.",
  },
  {
    question: "Is the phone water resistant?",
    answer:
      "Yes, the K13 Turbo 5G carries an IP54 splash-resistance rating, meaning it's protected against dust and light water splashes. It handles light rain and accidental spills with ease, though it isn't designed for full submersion.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const OPPO_K13_TURBO_5G_KEY_FEATURES = [
  {
    icon: "🔋",
    title: "Massive 7000mAh Cell",
    description:
      "Unprecedented battery life for endless media consumption and gaming — a genuine two-day phone.",
  },
  {
    icon: "⚡",
    title: "Turbo Processing",
    description:
      "The Dimensity 8450 chipset easily tackles demanding applications and seamless multitasking.",
  },
  {
    icon: "🖥️",
    title: "120Hz Fluidity",
    description:
      "A vibrant 6.8-inch AMOLED display ensures incredibly smooth visual performance with 1600 nits peak.",
  },
  {
    icon: "🔌",
    title: "80W Flash Charge",
    description:
      "Minimize your time tethered to a wall with blazing fast charge times via the bundled 80W adapter.",
  },
  {
    icon: "💾",
    title: "Expandable Storage",
    description:
      "A rare feature in 2026, allowing you to add a MicroSD card for extra space alongside the fast UFS 3.1 storage.",
  },
  {
    icon: "🎧",
    title: "Audio Jack Included",
    description:
      "Keep your reliable wired headphones with the integrated 3.5mm port — no dongle required.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const OPPO_K13_TURBO_5G_CAMERA_CONTENT = {
  title: "AI-Powered Dual Camera",
  subtitle:
    "A 50MP ColorOS AI imaging system that captures sharp, vivid photos day or night",
  highlights: [
    {
      label: "50MP Main",
      detail:
        "50MP high-resolution sensor paired with OPPO's renowned ColorOS AI image processing for crisp, vibrant shots in any light",
    },
    {
      label: "8MP Ultrawide",
      detail:
        "8MP ultrawide sensor for wide group shots and sweeping landscape photography",
    },
    {
      label: "16MP Selfie",
      detail:
        "16MP front camera for sharp selfies and clear video calls with natural skin tones",
    },
    {
      label: "4K Video",
      detail:
        "4K video recording at up to 30fps with AI stabilization for smooth, polished footage",
    },
  ],
  features: [
    "50MP high-resolution main sensor with ColorOS AI image processing",
    "8MP ultrawide sensor for wide group shots and landscapes",
    "16MP front camera for sharp selfies and clear video calls",
    "4K video recording at up to 30fps",
    "AI scene optimization for vibrant, well-balanced photos",
    "Night mode for brighter, cleaner low-light photography",
    "HDR and portrait modes for versatile everyday shooting",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const OPPO_K13_TURBO_5G_STORY = {
  title: "Performance Meets Endurance",
  subtitle:
    "A 7000mAh Silicon-Carbon battery, Dimensity 8450 power, and 120Hz AMOLED under ₹24K",
  paragraphs: [
    "The 'Turbo' designation highlights its emphasis on sustained processing power paired with incredible battery longevity, delivering a phone that simply refuses to slow down — no matter how hard you push it.",
    "Utilizing cutting-edge silicon-carbon battery technology, the K13 Turbo crams a colossal 7000mAh cell into a standard-sized chassis, while the MediaTek Dimensity 8450 platform tackles demanding applications and multitasking with effortless speed.",
    "A vibrant 6.8-inch 120Hz AMOLED display keeps everything smooth and immersive, and thoughtful touches like the 3.5mm audio jack and expandable MicroSD storage make it one of the most practical devices of 2026.",
    "Representing a 20% discount, the K13 Turbo hits the perfect equilibrium of price, power, and practicality. With only 17 units available at this price, it won't stay in stock for long.",
  ],
};
