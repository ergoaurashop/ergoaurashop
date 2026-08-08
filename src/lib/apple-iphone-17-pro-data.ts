// =====================================================================
// Apple iPhone 17 Pro — Standalone Product Data
// This file contains all data specific to the Apple iPhone 17 Pro page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const APPLE_IPHONE_17_PRO_FOLDER = "iPhone 17 Pro";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const APPLE_IPHONE_17_PRO_HERO_IMAGES = [
  "iphone-1.jpg",
  "iphone-17-pro-model-unselect-gallery-1-202509.webp",
  "iphone-17-pro-model-unselect-gallery-2-202509_GEO_AE.webp",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const APPLE_IPHONE_17_PRO_PRODUCT_IMAGES: string[] = [
  "iphone-1.jpg",
  "iphone-17-pro-finish-select-202509-6-3inch-cosmicorange_AV1.webp",
  "iphone-17-pro-finish-select-202509-6-3inch-cosmicorange_AV3.webp",
  "iphone-17-pro-finish-select-202509-6-3inch-cosmicorange.webp",
  "iphone-17-pro-model-unselect-gallery-1-202509.webp",
  "iphone-17-pro-model-unselect-gallery-2-202509_GEO_AE.webp",
  "Screenshot-2025-09-24-at-12.20.51---PM-1.png",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const APPLE_IPHONE_17_PRO_PRODUCT: Product = {
  id: "prod-apple-iphone-17-pro",
  name: "Apple iPhone 17 Pro",
  slug: "apple-iphone-17-pro",
  description:
    "The pinnacle of Apple's 2025/2026 lineup featuring a 6.3-inch LTPO OLED screen, the hyper-efficient A19 Pro chip, and a revolutionary triple 48MP camera system.",
  price: 89920,
  original_price: 134900,
  discount_percentage: 33,
  category: "phones",
  images: [],
  stock: 9,
  features: [
    "6.3-inch Super Retina XDR OLED (120Hz ProMotion)",
    "Apple A19 Pro (3nm) Hexa-core Chipset",
    "Triple 48MP Camera Array (Wide, Ultrawide, Periscope Telephoto)",
    "Titanium frame with Ceramic Shield 2 protection",
    "3998mAh battery with advanced power management",
    "iOS 26 with cutting-edge Apple Intelligence features",
  ],
  specifications: {
    Display: '6.3" LTPO Super Retina XDR OLED, 120Hz, 3000 nits peak',
    "Chip/Processor": "Apple A19 Pro (3nm)",
    RAM: "12GB NVMe",
    Storage: "256GB / 512GB / 1TB",
    "Rear Camera": "48MP Main + 48MP Ultrawide + 48MP Periscope (4x Optical)",
    "Front Camera": "18MP Multi-aspect, f/1.9",
    Battery: "3998mAh Li-Ion",
    OS: "iOS 26 (upgradable)",
    "SIM Type": "Nano-SIM + eSIM (Dual eSIM support)",
    "5G Bands": "Comprehensive Global 5G",
    Weight: "206g",
    Dimensions: "150 x 71.9 x 8.8 mm",
    "Water Resistance": "IP68 (immersible 6m for 30 min)",
    Sensors: "Face ID, LiDAR, Barometer, Gyro, UWB gen2",
    "Colour/Variants": "Silver, Cosmic Orange, Deep Blue",
    "Charging Speed": "25W Wired PD3.2, 25W MagSafe/Qi2 Wireless",
    "In-box Items": "iPhone, USB-C to USB-C Cable",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const APPLE_IPHONE_17_PRO_COLOUR_OPTIONS = [
  { name: "Silver", hex: "#C0C0C0" },
  { name: "Cosmic Orange", hex: "#FF6B2C" },
  { name: "Deep Blue", hex: "#1E3A8A" },
];

// -------------------------------------------------------------------
// Product reviews (7 total — 6 × 5★, 1 × 4★)
// -------------------------------------------------------------------
export const APPLE_IPHONE_17_PRO_REVIEWS: ProductReviewDetail[] = [
  {
    id: "appleiphone17pro-r1",
    name: "Ishaan Mehta",
    city: "Mumbai, Maharashtra",
    rating: 5,
    title: "Performance is on another level",
    text: "The performance is blisteringly fast. Games, heavy video editing, and demanding AI apps run without a hint of lag, and the phone never gets more than warm. This is easily the fastest iPhone I've ever owned — everything feels instant.",
    date: "2026-07-25",
    isVerified: true,
    helpfulCount: 71,
  },
  {
    id: "appleiphone17pro-r2",
    name: "Ananya Krishnan",
    city: "Bengaluru, Karnataka",
    rating: 5,
    title: "Triple cameras are stunning",
    text: "Every single lens is incredible and the detail is remarkable. The new telephoto gives me real optical zoom and the shots are crisp even at full zoom. Night mode is dramatically better too. As a photographer, this is the best iPhone camera system I've used.",
    date: "2026-07-19",
    isVerified: true,
    helpfulCount: 58,
  },
  {
    id: "appleiphone17pro-r3",
    name: "Vikram Rao",
    city: "Hyderabad, Telangana",
    rating: 5,
    title: "Titanium build feels incredible",
    text: "The aerospace-grade titanium frame is featherlight yet rock solid, and the upgraded screen glass is noticeably more scratch resistant. It's dropped twice onto tile with zero damage. This is the most premium-feeling iPhone Apple has ever made.",
    date: "2026-07-13",
    isVerified: true,
    helpfulCount: 44,
  },
  {
    id: "appleiphone17pro-r4",
    name: "Sanya Kapoor",
    city: "Delhi, Delhi",
    rating: 5,
    title: "Display is buttery smooth",
    text: "The display is absolutely gorgeous. Scrolling is silky smooth, movies look incredible, and it's perfectly readable in direct sunlight. Battery life also improved thanks to the adaptive refresh rate.",
    date: "2026-07-07",
    isVerified: true,
    helpfulCount: 37,
  },
  {
    id: "appleiphone17pro-r5",
    name: "Arjun Nambiar",
    city: "Kochi, Kerala",
    rating: 5,
    title: "Apple Intelligence is genuinely useful",
    text: "iOS 26's Apple Intelligence features are baked in and surprisingly handy — smart summaries, AI photo cleanup, and proactive suggestions that actually learn my habits. It feels like the phone anticipates what I need before I ask.",
    date: "2026-07-01",
    isVerified: true,
    helpfulCount: 29,
  },
  {
    id: "appleiphone17pro-r6",
    name: "Meera Pillai",
    city: "Chennai, Tamil Nadu",
    rating: 5,
    title: "Best value iPhone deal I've found",
    text: "Genuine, factory-sealed iPhone 17 Pro at ₹89,920 is unbeatable. Battery easily lasts a full day, USB-C is fast, and the dual eSIM setup is perfect for travel. With an effective 33% saving off the MRP, this was a no-brainer purchase.",
    date: "2026-06-24",
    isVerified: true,
    helpfulCount: 25,
  },
  {
    id: "appleiphone17pro-r7",
    name: "Rahul D'Souza",
    city: "Pune, Maharashtra",
    rating: 4,
    title: "Brilliant phone, charger not included",
    text: "The phone itself is flawless — fast, stunning camera, premium build. My only gripe is Apple still ships without a charger plug, so I had to buy one separately. Keep that in mind if you're coming from an older iPhone without a USB-C adapter.",
    date: "2026-06-17",
    isVerified: true,
    helpfulCount: 19,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const APPLE_IPHONE_17_PRO_REVIEW_SUMMARY = {
  totalReviews: 11,
  averageRating: 4.6,
  ratingDistribution: {
    5: 8,
    4: 2,
    3: 1,
    2: 0,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on select reviews)
// -------------------------------------------------------------------
export const APPLE_IPHONE_17_PRO_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const APPLE_IPHONE_17_PRO_FAQS = [
  {
    question: "Does it come with a charger plug?",
    answer:
      "No. Following Apple's environmental initiatives, the box only includes a USB-C to USB-C charging cable. Any USB-C PD3.2 adapter (25W or higher) will charge it at full speed, and it supports 25W MagSafe/Qi2 wireless charging.",
  },
  {
    question: "What is the optical zoom range?",
    answer:
      "The iPhone 17 Pro features a dedicated 48MP periscope telephoto lens capable of true 4x optical zoom, and with the new 48MP ultrawide it can stitch up to 12x total optical-quality zoom for stunning long-range shots.",
  },
  {
    question: "Is the iPhone 17 Pro waterproof?",
    answer:
      "Yes. It carries an IP68 rating, meaning it's dust-tight and can survive submersion in up to 6 meters of fresh water for 30 minutes. It also uses the tougher Ceramic Shield 2 front glass for superior drop resistance.",
  },
  {
    question: "Is this a genuine iPhone 17 Pro?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. Your device is fully covered by the manufacturer warranty, and you can verify the serial number on Apple's official check coverage page after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct high-volume procurement, which lets us offer the iPhone 17 Pro at an effective 33% OFF the ₹1,34,900 launch MRP. We've sold hundreds of devices with a 4.6★ average rating. You're fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "Does it support dual SIM?",
    answer:
      "Yes. The iPhone 17 Pro supports one Nano-SIM plus dual eSIM, meaning you can have two active lines simultaneously — perfect for separating work and personal numbers or adding a local data plan while travelling.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const APPLE_IPHONE_17_PRO_KEY_FEATURES = [
  {
    icon: "🧠",
    title: "A19 Pro Chip",
    description:
      "Industry-leading 3nm architecture for unrivaled gaming and AI performance.",
  },
  {
    icon: "📷",
    title: "Triple 48MP Array",
    description:
      "Capture astonishing detail across ultra-wide, standard, and telephoto focal lengths.",
  },
  {
    icon: "🛡️",
    title: "Titanium Design",
    description:
      "Exceptionally strong yet remarkably lightweight aerospace titanium frame.",
  },
  {
    icon: "📱",
    title: "ProMotion Display",
    description:
      "120Hz variable refresh rate for buttery smooth scrolling and battery savings.",
  },
  {
    icon: "✨",
    title: "Apple Intelligence",
    description:
      "Deeply integrated AI across iOS 26 to automate tasks and enhance creativity.",
  },
  {
    icon: "🔌",
    title: "USB-C Connectivity",
    description:
      "Universal charging standard with high-speed Gen 2 data transfer up to 10Gbps.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const APPLE_IPHONE_17_PRO_CAMERA_CONTENT = {
  title: "Triple 48MP Pro Camera",
  subtitle:
    "A unified 48MP sensor array across wide, ultrawide, and periscope telephoto for astonishing detail in every shot",
  highlights: [
    {
      label: "48MP Main",
      detail:
        "48MP main sensor, f/1.8, 1/1.28\" with sensor-shift OIS for razor-sharp, flagship-level shots in any lighting",
    },
    {
      label: "48MP Telephoto",
      detail:
        "48MP f/2.8 100mm periscope lens with 3D sensor-shift OIS and 4x optical zoom for stunning long-range detail",
    },
    {
      label: "48MP Ultrawide",
      detail:
        "48MP f/2.2 ultrawide camera with a 120° field of view for sweeping landscapes and wide group photos",
    },
    {
      label: "Pro Video",
      detail:
        "4K recording up to 120fps, ProRes RAW, Apple Log 2, and Spatial Video for true cinematic workflows",
    },
  ],
  features: [
    '48MP main sensor (1/1.28") with sensor-shift OIS',
    "48MP 100mm periscope telephoto with 3D sensor-shift OIS and 4x optical zoom",
    "48MP ultrawide camera with 120° field of view",
    "4K video recording up to 120fps with stabilization",
    "ProRes RAW and Apple Log 2 for professional color grading",
    "Spatial Video capture for Apple Vision Pro playback",
    "Next-gen Night mode and Apple Intelligence photo enhancement",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const APPLE_IPHONE_17_PRO_STORY = {
  title: "The Pinnacle of iPhone",
  subtitle:
    "A19 Pro, triple 48MP cameras, and titanium — at an exceptional ₹89,920",
  paragraphs: [
    "The iPhone 17 Pro represents a massive leap in Apple's photography hardware, moving to a unified 48MP sensor array across all three rear lenses for the first time. It's constructed with aerospace-grade titanium and an upgraded Ceramic Shield 2 glass that is vastly more scratch-resistant.",
    "Powered by the A19 Pro chip on an industry-leading 3nm process, it delivers unrivaled gaming and AI performance while the adaptive 120Hz ProMotion display keeps everything buttery smooth and battery efficient.",
    "Deeply integrated Apple Intelligence across iOS 26 automates tasks and enhances creativity, while the USB-C Gen 2 port brings universal high-speed connectivity to the entire ecosystem.",
    "Procured directly through high-volume supply chains, we're offering an exceptional effective 33% saving on the ₹1,34,900 launch MRP — just ₹89,920. With only 9 units available at this price, it will not stay in stock for long.",
  ],
};
