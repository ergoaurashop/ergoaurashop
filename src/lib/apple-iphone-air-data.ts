// =====================================================================
// Apple iPhone Air — Standalone Product Data
// This file contains all data specific to the Apple iPhone Air page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const APPLE_IPHONE_AIR_FOLDER = "iPhone Air";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const APPLE_IPHONE_AIR_HERO_IMAGES = [
  "hero_design__capuizdf0uuu_large_2x.jpg",
  "camera__gl56mvovq6qi_large_2x.jpg",
  "iPhone_Air_Sky_Blue_PDP_Image_Position_1__en-AE.webp",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const APPLE_IPHONE_AIR_PRODUCT_IMAGES: string[] = [
  "hero_design__capuizdf0uuu_large_2x.jpg",
  "camera__gl56mvovq6qi_large_2x.jpg",
  "iPhone_Air_Sky_Blue_PDP_Image_Position_1__en-AE.webp",
  "iPhone_Air_Sky_Blue_PDP_Image_Position_3__en-AE.webp",
  "iPhone_Air_Sky_Blue_PDP_Image_Position_4__en-AE.webp",
  "iPhone_Air_Sky_Blue_PDP_Image_Position_7__en-AE.webp",
  "iPhone_Air_Sky_Blue_PDP_Image_Position_8__en-AE.webp",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const APPLE_IPHONE_AIR_PRODUCT: Product = {
  id: "prod-apple-iphone-air",
  name: "Apple iPhone Air",
  slug: "apple-iphone-air",
  description:
    "An ultra-thin, revolutionary redesign of the iPhone featuring a stunning 6.6-inch OLED display, a single high-power 48MP camera, and a profile that redefines pocketability.",
  price: 65920,
  original_price: 119900,
  discount_percentage: 45,
  category: "phones",
  images: [],
  stock: 12,
  features: [
    "Unbelievably thin profile (approx. 5mm thickness)",
    "6.6-inch Super Retina XDR OLED Display",
    "Apple A19 Processor",
    "Single, highly capable 48MP Main Camera",
    "Advanced thermal management for an ultra-slim chassis",
    "iOS 26 with Apple Intelligence",
  ],
  specifications: {
    Display: '6.6" Super Retina XDR OLED, 60Hz, 2500 nits peak',
    "Chip/Processor": "Apple A19",
    RAM: "8GB",
    Storage: "256GB / 512GB",
    "Rear Camera": "48MP Main (Fusion)",
    "Front Camera": "12MP TrueDepth",
    Battery: "3500mAh Li-Ion",
    OS: "iOS 26",
    "SIM Type": "Nano-SIM + eSIM",
    "5G Bands": "Comprehensive Global 5G",
    Weight: "~160g",
    Dimensions: "Ultra-thin profile (approx. 5mm)",
    "Water Resistance": "IP68",
    Sensors: "Face ID, Accelerometer, Gyro, Proximity, Barometer",
    "Colour/Variants": "Midnight, Starlight, Pale Pink, Space Grey",
    "Charging Speed": "20W Wired, 15W MagSafe",
    "In-box Items": "iPhone, USB-C Cable",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const APPLE_IPHONE_AIR_COLOUR_OPTIONS = [
  { name: "Midnight", hex: "#1B1B1F" },
  { name: "Starlight", hex: "#F5F2E9" },
  { name: "Pale Pink", hex: "#F3C6CE" },
  { name: "Space Grey", hex: "#4A4A4A" },
];

// -------------------------------------------------------------------
// Product reviews (7 total — 6 × 5★, 1 × 4★)
// -------------------------------------------------------------------
export const APPLE_IPHONE_AIR_REVIEWS: ProductReviewDetail[] = [
  {
    id: "appleiphoneair-r1",
    name: "Rohan Iyer",
    city: "Mumbai, Maharashtra",
    rating: 5,
    title: "Incredibly thin, shockingly premium",
    text: "I genuinely can't believe how thin this phone is. It slides into any pocket without a hint of bulk and the build quality feels every bit as premium as a Pro model. The display is gorgeous and one-handed use is effortless thanks to the featherweight chassis.",
    date: "2026-07-26",
    isVerified: true,
    helpfulCount: 68,
  },
  {
    id: "appleiphoneair-r2",
    name: "Sneha Venkatesh",
    city: "Chennai, Tamil Nadu",
    rating: 5,
    title: "That Fusion camera delivers",
    text: "Single camera, zero compromises. The Fusion lens captures stunning detail and the quality zoom is genuinely impressive for zooming into architecture and food shots. Night mode is superb too. For a phone this slim, the camera is a real engineering marvel.",
    date: "2026-07-20",
    isVerified: true,
    helpfulCount: 55,
  },
  {
    id: "appleiphoneair-r3",
    name: "Aarav Sharma",
    city: "Delhi, Delhi",
    rating: 5,
    title: "Battery easily lasts a full day",
    text: "I was worried a paper-thin phone would die by lunch, but the optimized chip sips power and I'm ending most days with 30% left. The engineering is clearly years ahead — it barely even gets warm under normal use.",
    date: "2026-07-14",
    isVerified: true,
    helpfulCount: 42,
  },
  {
    id: "appleiphoneair-r4",
    name: "Divya Nair",
    city: "Kochi, Kerala",
    rating: 5,
    title: "Plenty fast for everything",
    text: "Coming from an older iPhone, this feels instant for every task — social media, video, photo editing, and even heavy games run smooth. iOS 26 with Apple Intelligence makes the phone feel genuinely smart. You really don't need the Pro model for everyday life.",
    date: "2026-07-08",
    isVerified: true,
    helpfulCount: 36,
  },
  {
    id: "appleiphoneair-r5",
    name: "Kabir Malhotra",
    city: "Bengaluru, Karnataka",
    rating: 5,
    title: "MagSafe is the perfect match",
    text: "The flat, thin design pairs beautifully with MagSafe. My magnetic charger and wallet snap on perfectly, and wireless charging is reliable. The whole experience feels incredibly refined — this is what a slim flagship should be.",
    date: "2026-07-02",
    isVerified: true,
    helpfulCount: 28,
  },
  {
    id: "appleiphoneair-r6",
    name: "Priya Reddy",
    city: "Hyderabad, Telangana",
    rating: 5,
    title: "Best Apple deal I've bought",
    text: "Genuine, factory-sealed iPhone Air at ₹65,920 is an absolute steal — an effective 45% off the ₹1,19,900 MRP. Battery is solid, the display is bright and vivid, and it's the lightest iPhone I've ever held. Fast delivery and sealed packaging, as promised.",
    date: "2026-06-25",
    isVerified: true,
    helpfulCount: 24,
  },
  {
    id: "appleiphoneair-r7",
    name: "Aditya Menon",
    city: "Pune, Maharashtra",
    rating: 4,
    title: "Gorgeous, but a single camera takes adjusting",
    text: "The design and thinness are unreal — easily the most beautiful phone I've owned. The Fusion camera is fantastic for most shots, but if you live on ultrawide and telephoto lenses you'll miss the extra cameras. For 95% of users this is more than enough.",
    date: "2026-06-18",
    isVerified: true,
    helpfulCount: 17,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const APPLE_IPHONE_AIR_REVIEW_SUMMARY = {
  totalReviews: 16,
  averageRating: 4.6,
  ratingDistribution: {
    5: 11,
    4: 4,
    3: 1,
    2: 0,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on select reviews)
// -------------------------------------------------------------------
export const APPLE_IPHONE_AIR_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const APPLE_IPHONE_AIR_FAQS = [
  {
    question: "Why does it only have one camera?",
    answer:
      "To achieve its unprecedented thinness and lower weight, the iPhone Air replaces multiple lenses with a single, highly advanced 48MP fusion camera that can crop in for a 2x optical-quality zoom. For the vast majority of users this delivers stunning photos while keeping the phone remarkably slim.",
  },
  {
    question: "Is the battery life bad because it's so thin?",
    answer:
      "No. Apple optimized the A19 chip and the internal space with cutting-edge stacked battery technology to provide a robust all-day battery life, perfectly adequate for the standard user. The ultra-efficient silicon is the key — this is one of the most power-efficient iPhones Apple has made.",
  },
  {
    question: "Is the iPhone Air waterproof?",
    answer:
      "Yes. It carries the same IP68 rating as the rest of the iPhone lineup, meaning it's dust-tight and can survive submersion in fresh water. Apple has engineered the ultra-thin chassis without compromising on the flagship durability standards.",
  },
  {
    question: "Is this a genuine iPhone Air?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. Your device is fully covered by the manufacturer warranty, and you can verify the serial number on Apple's official check coverage page after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct high-volume procurement, which lets us offer the iPhone Air at an effective 45% OFF the ₹1,19,900 launch MRP. We've sold hundreds of devices with a 4.6★ average rating. You're fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "Does it support dual SIM?",
    answer:
      "Yes. The iPhone Air supports one Nano-SIM plus eSIM, meaning you can have two active lines simultaneously — perfect for separating work and personal numbers or adding a local data plan while travelling.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const APPLE_IPHONE_AIR_KEY_FEATURES = [
  {
    icon: "🪶",
    title: "Ultra-Thin Design",
    description:
      "The slimmest iPhone ever created, disappearing into your pocket or purse.",
  },
  {
    icon: "📱",
    title: 'Large 6.6" Display',
    description:
      "Maximum screen real estate without the bulk of a 'Max' device.",
  },
  {
    icon: "🧠",
    title: "A19 Silicon",
    description:
      "The advanced standard A19 chip easily handles everyday tasks with total efficiency.",
  },
  {
    icon: "📷",
    title: "48MP Fusion Camera",
    description:
      "A single, powerful rear lens that captures incredible high-resolution photos and 2x optical-quality crops.",
  },
  {
    icon: "🧲",
    title: "MagSafe Integrated",
    description:
      "Easily snap on ultra-slim accessories and chargers.",
  },
  {
    icon: "⚖️",
    title: "Featherweight",
    description:
      "Designed to prevent hand fatigue, making one-handed usage much more comfortable despite the large screen.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const APPLE_IPHONE_AIR_CAMERA_CONTENT = {
  title: "48MP Fusion Camera",
  subtitle:
    "A single, extraordinarily capable 48MP lens that redefines what a slim phone can capture",
  highlights: [
    {
      label: "48MP Main",
      detail:
        '48MP main sensor, f/1.6 with sensor-shift OIS — captures stunning 24MP super-high-resolution default photos',
    },
    {
      label: "2x Optical-quality Zoom",
      detail:
        "Intelligent 2x crop from the 48MP sensor delivers optical-quality telephoto shots without a second lens",
    },
    {
      label: "Pro Video",
      detail:
        "4K HDR recording up to 60fps and Cinematic Mode in 4K for beautifully shallow depth-of-field video",
    },
    {
      label: "12MP Selfie",
      detail:
        "12MP TrueDepth front camera with advanced portrait lighting and the full Face ID array",
    },
  ],
  features: [
    "48MP main sensor (f/1.6) with sensor-shift OIS",
    "24MP super-high-resolution default photos",
    "2x optical-quality zoom from the 48MP sensor",
    "4K HDR video recording up to 60fps with stabilization",
    "Cinematic Mode in 4K for professional depth-of-field",
    "12MP TrueDepth front camera with Face ID array",
    "Advanced thermal management for sustained recording in a slim chassis",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const APPLE_IPHONE_AIR_STORY = {
  title: "Radically Thin. Utterly Apple.",
  subtitle:
    "A 6.6-inch OLED, the A19 chip, and a 48MP Fusion camera — at an exceptional ₹65,920",
  paragraphs: [
    "In 2026 Apple took a bold new direction, dropping the 'Plus' model in favor of the radically thin 'Air,' prioritizing design and weight reduction above all else. Inspired by the iPad Pro M4's ultra-thin architecture, the iPhone Air utilizes cutting-edge internal stacking to compress standard flagship hardware into a mesmerizing form factor.",
    "At roughly 5mm thick and just ~160g, it is the slimmest iPhone ever made — yet it still houses a stunning 6.6-inch Super Retina XDR OLED display, the efficient A19 chip, and a single, highly capable 48MP Fusion camera.",
    "Advanced thermal management keeps the ultra-slim chassis cool under pressure, while iOS 26 with Apple Intelligence makes every interaction feel effortless and intelligent.",
    "Procured directly through high-volume supply chains, we're offering an exceptional effective 45% saving on the ₹1,19,900 launch MRP — just ₹65,920. With only 12 units available at this price, it will not stay in stock for long.",
  ],
};
