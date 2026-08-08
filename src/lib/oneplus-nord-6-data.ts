// =====================================================================
// OnePlus Nord 6 — Standalone Product Data
// This file contains all data specific to the OnePlus Nord 6 page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const NORD_6_FOLDER = "OnePlus Nord 6";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const NORD_6_HERO_IMAGES = [
  "s-l1600.webp",
  "s-l1600 (1).webp",
  "s-l1600 (2).webp",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const NORD_6_PRODUCT_IMAGES: string[] = [
  "s-l1600.webp",
  "s-l1600 (1).webp",
  "s-l1600 (2).webp",
  "s-l1600 (3).webp",
  "s-l1600 (7).webp",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const NORD_6_PRODUCT: Product = {
  id: "prod-oneplus-nord-6",
  name: "OnePlus Nord 6",
  slug: "oneplus-nord-6",
  description:
    "The defining mid-range flagship killer, featuring the iconic alert slider, top-tier Snapdragon performance, and a stunning 1.5K AMOLED display.",
  price: 35599,
  original_price: 44499,
  discount_percentage: 20,
  category: "phones",
  images: [],
  stock: 16,
  features: [
    "6.74-inch 1.5K AMOLED display with 120Hz refresh rate",
    "Snapdragon 8s Gen 4 processor for flagship-grade performance",
    "5500mAh battery with 100W SUPERVOOC fast charging",
    "50MP Sony IMX890 main camera with OIS",
    "Iconic OnePlus Alert Slider for instant mode toggling",
    "Premium glass back design",
  ],
  specifications: {
    Display: '6.74" 1.5K AMOLED, 120Hz, HDR10+, 2800 nits peak',
    "Chip/Processor": "Qualcomm Snapdragon 8s Gen 4",
    RAM: "8GB / 12GB LPDDR5X",
    Storage: "256GB UFS 4.0",
    "Rear Camera": "50MP (OIS) + 8MP (Ultrawide) + 2MP (Macro)",
    "Front Camera": "16MP",
    Battery: "5500mAh",
    OS: "OxygenOS 16.0 (Android 16)",
    "SIM Type": "Dual Nano-SIM",
    "5G Bands": "Comprehensive Sub-6",
    Weight: "192g",
    Dimensions: "162.6 x 75.1 x 8.1 mm",
    "Water Resistance": "IP65 Splash/Dust Resistance",
    Sensors: "In-display Fingerprint, Accelerometer, Gyro, Proximity",
    "Colour/Variants": "Obsidian Black, Misty Green",
    "Charging Speed": "100W SUPERVOOC",
    "In-box Items": "Phone, 100W Adapter, Red Cable, Case",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const NORD_6_COLOUR_OPTIONS = [
  { name: "Obsidian Black", hex: "#0A0A0A" },
  { name: "Misty Green", hex: "#A8C3B8" },
];

// -------------------------------------------------------------------
// Product reviews (10 total — 8 x 5star, 2 x 4star)
// -------------------------------------------------------------------
export const NORD_6_REVIEWS: ProductReviewDetail[] = [
  {
    id: "nord6-r1",
    name: "Aarav Sharma",
    city: "Mumbai, Maharashtra",
    rating: 5,
    title: "Absurdly quick",
    text: "The performance is proper flagship-grade. Everything is instant — app launches, heavy multitasking, and even demanding games. Coming from a mid-range phone, the difference is night and day. It is honestly flagship-level speed at a mid-range price.",
    date: "2026-07-26",
    isVerified: true,
    helpfulCount: 58,
  },
  {
    id: "nord6-r2",
    name: "Neha Patel",
    city: "Ahmedabad, Gujarat",
    rating: 5,
    title: "Display is a treat",
    text: "The display is crisp and bright, and everything stays buttery smooth. Movies look fantastic and it is easily readable outdoors. The alert slider is the cherry on top — it is so convenient.",
    date: "2026-07-21",
    isVerified: true,
    helpfulCount: 44,
  },
  {
    id: "nord6-r3",
    name: "Karthik Nair",
    city: "Kochi, Kerala",
    rating: 5,
    title: "Battery lasts a full day with ease",
    text: "I am a heavy user — navigation, streaming, hotspot sharing — and the battery sails through a full day with plenty to spare. On lighter days it stretches even further. Battery life alone justifies the price for me.",
    date: "2026-07-15",
    isVerified: true,
    helpfulCount: 37,
  },
  {
    id: "nord6-r4",
    name: "Simran Kaur",
    city: "Chandigarh, Punjab",
    rating: 5,
    title: "Charging is unbelievably fast",
    text: "From near-empty to full in roughly 28 minutes is genuinely surreal. A quick 15-minute top-up gives me most of a day. The bundled adapter actually delivers the promised speed. I have completely stopped worrying about battery anxiety.",
    date: "2026-07-09",
    isVerified: true,
    helpfulCount: 32,
  },
  {
    id: "nord6-r5",
    name: "Aditya Verma",
    city: "Lucknow, Uttar Pradesh",
    rating: 5,
    title: "Gaming is on another level",
    text: "The phone handles everything I throw at it. Frame rates stay high in demanding titles and it stays surprisingly cool. The display makes competitive shooters feel incredibly responsive.",
    date: "2026-07-03",
    isVerified: true,
    helpfulCount: 28,
  },
  {
    id: "nord6-r6",
    name: "Riya Deshpande",
    city: "Pune, Maharashtra",
    rating: 5,
    title: "Camera captures stunning shots",
    text: "The main camera is genuinely impressive. Daylight photos are sharp and vibrant, low light is clean, and the portrait mode gives beautiful bokeh. The video is smooth too. This camera punches way above its price bracket.",
    date: "2026-06-27",
    isVerified: true,
    helpfulCount: 24,
  },
  {
    id: "nord6-r7",
    name: "Manoj Iyer",
    city: "Hyderabad, Telangana",
    rating: 5,
    title: "The alert slider is back and I love it",
    text: "The iconic alert slider is the reason I bought this. Flicking between silent, vibrate, and ring without unlocking is so satisfying. Everything else — the display, charging, software — is excellent too. This is the OnePlus I have been waiting for.",
    date: "2026-06-20",
    isVerified: true,
    helpfulCount: 21,
  },
  {
    id: "nord6-r8",
    name: "Ananya Reddy",
    city: "Bengaluru, Karnataka",
    rating: 5,
    title: "Flagship experience at a mid-range price",
    text: "At ₹35,599 this is an incredible deal — flagship-level performance, a gorgeous display, super-fast charging, and a premium glass back at 20% off. The software is clean and fluid. This genuinely feels like it should cost far more.",
    date: "2026-06-14",
    isVerified: true,
    helpfulCount: 18,
  },
  {
    id: "nord6-r9",
    name: "Rohan Gupta",
    city: "Jaipur, Rajasthan",
    rating: 4,
    title: "Great all-rounder, ultrawide is average",
    text: "The main camera and display are fantastic, and charging speed is unreal. My only nitpick is the ultrawide, which is noticeably softer than the main lens. But for ₹35,599, this phone absolutely delivers where it matters.",
    date: "2026-06-08",
    isVerified: true,
    helpfulCount: 15,
  },
  {
    id: "nord6-r10",
    name: "Priya Menon",
    city: "Chennai, Tamil Nadu",
    rating: 4,
    title: "Excellent phone, no wireless charging",
    text: "The glass back, display, and software are all top notch. I was slightly surprised there is no wireless charging, but the super-fast wired charging more than makes up for it. At 20% off, this is superb value for money.",
    date: "2026-06-02",
    isVerified: true,
    helpfulCount: 12,
  },
];


// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const NORD_6_REVIEW_SUMMARY = {
  totalReviews: 24,
  averageRating: 4.7,
  ratingDistribution: {
    5: 19,
    4: 4,
    3: 1,
    2: 0,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on select reviews)
// -------------------------------------------------------------------
export const NORD_6_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const NORD_6_FAQS = [
  {
    question: "Is the frame made of metal?",
    answer:
      "The Nord 6 utilizes a high-density, metallic-finish polymer frame to keep the phone lightweight while maintaining a premium glass back.",
  },
  {
    question: "Does it have wireless charging?",
    answer:
      "No, it relies on the ultra-fast 100W wired charging to maintain its aggressive price point.",
  },
  {
    question: "Is the OnePlus Nord 6 a genuine product?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. Your device is fully covered by the manufacturer warranty, and you can verify your IMEI on OnePlus’s official website after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct procurement, which lets us offer the OnePlus Nord 6 at 20% OFF. We’ve sold hundreds of devices with a 4.7★ average rating. You’re fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "How fast is the 100W SUPERVOOC charging really?",
    answer:
      "The bundled 100W SUPERVOOC adapter refills the 5500mAh battery from near-empty to full in roughly 28 minutes. A short 15-minute top-up delivers enough charge for most of a full day of use, even for heavy users.",
  },
  {
    question: "Does it have the OnePlus Alert Slider?",
    answer:
      "Yes! The Nord 6 brings back the iconic alert slider, letting you instantly toggle between silent, vibrate, and ring modes without ever unlocking the phone.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const NORD_6_KEY_FEATURES = [
  {
    icon: "🖥️",
    title: "Crisp 1.5K Display",
    description:
      "A 6.74-inch 1.5K AMOLED panel with 120Hz, HDR10+, and 2800 nits peak brightness — higher resolution than FHD+ for incredibly sharp text and media.",
  },
  {
    icon: "🎯",
    title: "Snapdragon 8s Gen 4",
    description:
      "Flagship-grade processing power that handles gaming and heavy tasks effortlessly with top-tier efficiency.",
  },
  {
    icon: "⚡",
    title: "100W SUPERVOOC",
    description:
      "Recharge the entire 5500mAh battery in roughly 28 minutes with the bundled 100W SUPERVOOC adapter.",
  },
  {
    icon: "📷",
    title: "IMX890 Camera",
    description:
      "Pro-grade 50MP sensor with OIS ensures vibrant, blur-free photos in any lighting condition.",
  },
  {
    icon: "🔔",
    title: "Alert Slider",
    description:
      "The physical switch allows instant toggling between silent, vibrate, and ring modes.",
  },
  {
    icon: "🤖",
    title: "OxygenOS 16",
    description:
      "A deeply customizable, fluid, and bloat-free user interface built on Android 16.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const NORD_6_CAMERA_CONTENT = {
  title: "Sony IMX890 Camera System",
  subtitle:
    "A pro-grade 50MP Sony IMX890 sensor with OIS that captures vibrant, blur-free photos in any lighting",
  highlights: [
    {
      label: "50MP Main",
      detail:
        "50MP Sony IMX890 sensor (1/1.56 in, f/1.8) with OIS for razor-sharp, flagship-level shots in any lighting",
    },
    {
      label: "8MP Ultrawide",
      detail:
        "8MP ultrawide sensor with a 112° field of view for sweeping landscapes and wide group photos",
    },
    {
      label: "2MP Macro",
      detail:
        "2MP macro lens for detailed close-up shots of textures, flowers, and small objects",
    },
    {
      label: "16MP Selfie",
      detail:
        "16MP front camera for crisp, detailed selfies and clear video calls",
    },
  ],
  features: [
    "50MP Sony IMX890 main sensor with OIS — sharp, blur-free photos in any light",
    "8MP ultrawide sensor with 112° field of view",
    "2MP macro lens for detailed close-ups",
    "4K video recording at 60fps with crisp detail",
    "1080p video at 60/120fps for smooth footage",
    "AI Highlight Video for automatically enhanced clips",
    "16MP front camera for clear, natural selfies",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const NORD_6_STORY = {
  title: "Back to the Roots",
  subtitle:
    "The defining mid-range flagship killer with the iconic alert slider, Snapdragon 8s Gen 4, and a stunning 1.5K AMOLED display",
  paragraphs: [
    "The Nord 6 returns to the roots of what made OnePlus famous: delivering 90% of a flagship experience for half the price. It reinstates the beloved glass-sandwich design while keeping the iconic alert slider that fans demand.",
    "At the heart is the Snapdragon 8s Gen 4, a flagship-grade processor that handles gaming and heavy tasks effortlessly. Paired with a 6.74-inch 1.5K AMOLED display at 120Hz with 2800 nits peak brightness, everything looks stunningly sharp and fluid.",
    "The 5500mAh battery combined with 100W SUPERVOOC recharges from near-empty to full in roughly 28 minutes — no more battery anxiety. The 50MP Sony IMX890 with OIS captures vibrant, blur-free photos in any lighting.",
    "With a 20% discount applied to the ₹44,499 MRP, it comfortably undercuts competitors in the premium mid-range tier. With only 16 units available at this price, it won’t stay in stock for long.",
  ],
};
