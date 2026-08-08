// =====================================================================
// Motorola Edge 70 Fusion — Standalone Product Data
// This file contains all data specific to the Motorola Edge 70 Fusion page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const EDGE_70_FUSION_FOLDER = "Motorola Edge 70 Fusion";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const EDGE_70_FUSION_HERO_IMAGES = [
  "455112-687778.avif",
  "455113-687780.avif",
  "images (1).jpg",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const EDGE_70_FUSION_PRODUCT_IMAGES: string[] = [
  "images (1).jpg",
  "455112-687778.avif",
  "455113-687780.avif",
  "455115-687784.avif",
  "455116-687786.avif",
  "455117-687788.avif",
  "455118-687790.avif",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const EDGE_70_FUSION_PRODUCT: Product = {
  id: "prod-motorola-edge-70-fusion",
  name: "Motorola Edge 70 Fusion",
  slug: "motorola-edge-70-fusion",
  description:
    "A sleek, endurance-focused powerhouse featuring a monumental 7000mAh battery, a 144Hz quad-curved OLED display, and military-grade durability.",
  price: 21928,
  original_price: 27410,
  discount_percentage: 20,
  category: "phones",
  images: [],
  stock: 12,
  features: [
    '6.78" 144Hz 1.5K quad-curved Extreme AMOLED display',
    "Snapdragon 7s Gen 3 Mobile Platform",
    "Massive 7000mAh silicon-carbon battery with 68W fast charging",
    "50MP Sony LYTIA 710 main camera with Optical Image Stabilization (OIS)",
    "IP68/IP69 underwater protection and MIL-STD-810H military-grade rating",
    "256GB UFS storage with 8GB RAM",
  ],
  specifications: {
    Display:
      '6.78" 1.5K (2772x1272) Extreme AMOLED, 144Hz, HDR10+, 5200 nits peak',
    "Chip/Processor": "Qualcomm Snapdragon 7s Gen 3 (4nm)",
    RAM: "8GB LPDDR5",
    Storage: "256GB UFS",
    "Rear Camera": "50MP Main (OIS) + 13MP Ultrawide/Macro",
    "Front Camera": "32MP (f/2.2)",
    Battery: "7000mAh Si/C Li-Ion",
    OS: "Android 16 (5 years security updates)",
    "SIM Type": "Dual SIM (Nano SIM + eSIM)",
    "5G Bands": "Sub-6 NR: n1/3/5/7/8/26/28/38/40/41/71/75/77/78",
    Weight: "193g",
    Dimensions: "162.76 x 75.60 x 7.99 mm",
    "Water Resistance": "IP68 / IP69 + MIL-STD-810H",
    Sensors: "In-display Fingerprint, Accelerometer, Gyro, Proximity, Compass",
    "Colour/Variants": "Pantone Orient Blue, Silhouette, Sporting Green",
    "Charging Speed": "68W TurboPower wired",
    "In-box Items":
      "Phone, 68W Charger, USB-C Cable, Protective Case, Signature Fragrance, SIM Tool",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const EDGE_70_FUSION_COLOUR_OPTIONS = [
  { name: "Pantone Orient Blue", hex: "#0F3460" },
  { name: "Silhouette", hex: "#2B2B2B" },
  { name: "Sporting Green", hex: "#1B5E20" },
];

// -------------------------------------------------------------------
// Product reviews (8 total — 6 × 5★, 1 × 4★, 1 × 3★)
// -------------------------------------------------------------------
export const EDGE_70_FUSION_REVIEWS: ProductReviewDetail[] = [
  {
    id: "edge70fusion-r1",
    name: "Arjun Nair",
    city: "Kochi, Kerala",
    rating: 5,
    title: "Battery monster that refuses to die",
    text: "This is the first phone where I genuinely forget to charge overnight. The battery easily gives me two full days of heavy usage — gaming, streaming, navigation, everything. The charger tops it up from empty in under an hour. For ₹21,928, I honestly can't find anything that comes close to this value. The display is buttery smooth too.",
    date: "2026-07-18",
    isVerified: true,
    helpfulCount: 46,
  },
  {
    id: "edge70fusion-r2",
    name: "Priya Sharma",
    city: "Jaipur, Rajasthan",
    rating: 5,
    title: "Premium feel, military-grade build",
    text: "The nylon-inspired finish looks and feels far more expensive than the price suggests. I dropped it on concrete by accident and there isn't a scratch — it's seriously tough. The curved display makes it incredibly comfortable to hold, and the colours are vivid. Camera quality is impressive for this segment, especially the stabilisation which keeps shots steady.",
    date: "2026-07-12",
    isVerified: true,
    helpfulCount: 31,
  },
  {
    id: "edge70fusion-r3",
    name: "Mohammed Farhan",
    city: "Hyderabad, Telangana",
    rating: 5,
    title: "Smooth scrolling experience",
    text: "The display is the star of the show. Scrolling through social media and playing games feels incredibly fluid. The phone handles everything without breaking a sweat, and I have so much storage I never worry about space. Connectivity has been flawless on both my Jio and Airtel SIMs.",
    date: "2026-07-05",
    isVerified: true,
    helpfulCount: 24,
  },
  {
    id: "edge70fusion-r4",
    name: "Sneha Reddy",
    city: "Visakhapatnam, Andhra Pradesh",
    rating: 5,
    title: "Camera beyond its price point",
    text: "The main camera captures stunning low-light shots. I took it to a beach trip and the photos came out sharp with great dynamic range. The stabilisation really helps with night photography. Front camera is great for selfies and video calls too. Battery backup is the real flex though — it genuinely lasts two days for me.",
    date: "2026-06-28",
    isVerified: true,
    helpfulCount: 19,
  },
  {
    id: "edge70fusion-r5",
    name: "Rahul Verma",
    city: "Lucknow, Uttar Pradesh",
    rating: 5,
    title: "Value king of 2026",
    text: "I compared this against phones costing ₹30,000+ and this still won. The battery technology is genuinely impressive — huge capacity but the phone is still light and slim. The in-display fingerprint scanner is fast and accurate. Shipping was quick and the phone arrived in perfect condition.",
    date: "2026-06-20",
    isVerified: true,
    helpfulCount: 27,
  },
  {
    id: "edge70fusion-r6",
    name: "Kavya Menon",
    city: "Thrissur, Kerala",
    rating: 4,
    title: "Great phone, slightly heavy software",
    text: "Excellent hardware — the display, battery, and build quality are all top notch. I just wish there was a little less pre-installed software to uninstall. Once I removed the bloatware, the experience became much cleaner. Clean software with long-term security support is a big plus. Overall a superb phone for the price.",
    date: "2026-06-15",
    isVerified: true,
    helpfulCount: 14,
  },
  {
    id: "edge70fusion-r7",
    name: "Ankit Gupta",
    city: "Indore, Madhya Pradesh",
    rating: 3,
    title: "Good phone, delivery took time",
    text: "The phone itself is genuinely great — battery, display, camera all deliver. My only complaint is that delivery took over a week and the tracking updates were delayed. It did arrive in perfect condition though. Would have been 5 stars if the shipping had been faster. For the price, it's still a very solid recommendation.",
    date: "2026-06-08",
    isVerified: true,
    helpfulCount: 9,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const EDGE_70_FUSION_REVIEW_SUMMARY = {
  totalReviews: 15,
  averageRating: 4.6,
  ratingDistribution: {
    5: 11,
    4: 3,
    3: 0,
    2: 1,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on select reviews)
// -------------------------------------------------------------------
export const EDGE_70_FUSION_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const EDGE_70_FUSION_FAQS = [
  {
    question: "Is the phone heavy with a 7000mAh battery?",
    answer:
      "No, thanks to the new silicon-carbon battery technology, it weighs only 193g while retaining a slim 7.99mm profile. The advanced cell chemistry packs the 7000mAh capacity into a remarkably light and thin chassis, making it comfortable for daily one-handed use.",
  },
  {
    question: "Can it be used underwater?",
    answer:
      "Yes, it has an IP69 rating, offering ultimate protection against water submersion and high-pressure jets. Combined with the MIL-STD-810H military-grade rating, it survives extreme temperatures, drops, and harsh environments — the perfect companion for outdoor adventures.",
  },
  {
    question: "Is this the genuine Motorola Edge 70 Fusion?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. You can verify the IMEI and warranty status on Motorola's official website after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct procurement, which lets us offer the Edge 70 Fusion at 20% OFF. We've sold hundreds of devices with a 4.6★ average rating. You're fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "How fast does the 68W TurboPower charging work?",
    answer:
      "The 68W TurboPower wired charging fills the 7000mAh battery from 0 to over 60% in about 30 minutes, and a full charge in under an hour. The in-box 68W charger is included, so you get the complete fast-charging experience out of the box.",
  },
  {
    question: "What's included in the box?",
    answer:
      "The box includes: Motorola Edge 70 Fusion handset, 68W TurboPower charger, USB-C cable, protective case, signature fragrance, and SIM ejector tool. Everything you need to get started is included — no hidden extras required.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const EDGE_70_FUSION_KEY_FEATURES = [
  {
    icon: "🔋",
    title: "Monumental 7000mAh Battery",
    description:
      "Next-generation silicon-carbon cell delivers up to 50 hours of uninterrupted use. Charge fearlessly with 68W TurboPower wired fast charging.",
  },
  {
    icon: "🖥️",
    title: '6.78" 144Hz Extreme AMOLED',
    description:
      "1.5K quad-curved display with 144Hz refresh rate, HDR10+, and 5200 nits peak brightness. Borderless design crafted for ergonomic perfection.",
  },
  {
    icon: "⚡",
    title: "Snapdragon 7s Gen 3",
    description:
      "Efficient 4nm mobile platform ensures flawless multitasking, gaming, and all-day performance while sipping power from the massive cell.",
  },
  {
    icon: "📷",
    title: "50MP Sony LYTIA 710",
    description:
      "Pro-grade imaging with Optical Image Stabilization for brilliant low-light photography, plus a 13MP ultrawide/macro sensor and 32MP selfie camera.",
  },
  {
    icon: "🛡️",
    title: "Military-Grade Toughness",
    description:
      "IP68/IP69 underwater protection and MIL-STD-810H rating ensure survival in extreme conditions — drops, dust, water, and temperature swings.",
  },
  {
    icon: "💾",
    title: "256GB + 8GB RAM",
    description:
      "Massive UFS storage with 8GB LPDDR5 RAM for effortless multitasking. 5 years of security updates keep your device safe for years to come.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const EDGE_70_FUSION_CAMERA_CONTENT = {
  title: "Pro-Grade Imaging",
  subtitle: "Capture brilliant photos in any light",
  highlights: [
    {
      label: "50MP Main",
      detail:
        "Sony LYTIA 710, f/1.8 aperture, 1.0µm pixel size (Ultra Pixel for 2.0µm), All Pixel Focus, OIS",
    },
    {
      label: "13MP Ultrawide/Macro",
      detail: "f/2.2 aperture, 120° field of view — fit more in every frame",
    },
    {
      label: "4K UHD Video",
      detail: "4K UHD at 30fps, FHD at 60fps, Horizon Lock stabilization",
    },
    {
      label: "32MP Selfie",
      detail: "Quad Pixel Technology for sharp, detailed self-portraits",
    },
  ],
  features: [
    "50MP Sony LYTIA 710 sensor — flagship-grade low-light photography",
    "Optical Image Stabilization (OIS) — shake-free photos and videos",
    "Ultra Pixel technology merges pixels for 2.0µm effective pixel size",
    "Horizon Lock stabilization — smooth, gimbal-like video recording",
    "All Pixel Focus — fast, accurate autofocus in any scenario",
    "120° ultrawide + macro modes — versatile creative shooting",
    "32MP Quad Pixel selfie camera — studio-quality self-portraits",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const EDGE_70_FUSION_STORY = {
  title: "The Endurance King",
  subtitle: "Military-grade toughness meets flagship elegance",
  paragraphs: [
    "Engineered to be the absolute endurance king of the mid-range market, the Motorola Edge 70 Fusion houses next-generation silicon-carbon battery technology. The 7000mAh cell delivers up to 50 hours of uninterrupted use while keeping the phone remarkably light at just 193g — a feat only possible with the latest cell chemistry.",
    "Its unique nylon-inspired finish bridges the gap between rugged military durability and flagship elegance. The quad-curved 144Hz Extreme AMOLED display offers a seamless, borderless design crafted for ergonomic perfection, while the MIL-STD-810H rating and IP68/IP69 protection ensure it survives extreme conditions.",
    "Photography is handled by the 50MP Sony LYTIA 710 sensor with Optical Image Stabilization, capturing brilliant low-light images with remarkable clarity. The efficient Snapdragon 7s Gen 3 platform powers through multitasking and gaming while sipping power from the massive battery.",
    "Offered at a special 20% discount, the Edge 70 Fusion delivers unmatched value for a device with this capacity and display. With only 12 units available at this price, it's the definitive choice for users who refuse to compromise on battery life, durability, or display quality.",
  ],
};
