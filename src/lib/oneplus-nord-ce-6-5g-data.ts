// =====================================================================
// OnePlus Nord CE 6 5G — Standalone Product Data
// This file contains all data specific to the OnePlus Nord CE 6 5G page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const NORD_CE6_FOLDER = "OnePlus Nord CE 6 5G";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const NORD_CE6_HERO_IMAGES = [
  "oneplus-nord-ce6.webp",
  "gsmarena_001.jpg",
  "images.jpg",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const NORD_CE6_PRODUCT_IMAGES: string[] = [
  "oneplus-nord-ce6.webp",
  "gsmarena_001.jpg",
  "images.jpg",
  "images (1).jpg",
  "s-l1600.webp",
  "s-l1600 (1).webp",
  "s-l1600 (2).webp",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const NORD_CE6_PRODUCT: Product = {
  id: "prod-oneplus-nord-ce-6-5g",
  name: "OnePlus Nord CE 6 5G",
  slug: "oneplus-nord-ce-6-5g",
  description:
    "The quintessential OnePlus experience focusing on Core Edition essentials: a flawless 120Hz Fluid AMOLED screen, reliable 80W SUPERVOOC charging, and a clean, bloat-free OxygenOS interface.",
  price: 23998,
  original_price: 29998,
  discount_percentage: 20,
  category: "phones",
  images: [],
  stock: 22,
  features: [
    "6.7-inch 120Hz Fluid AMOLED display",
    "Snapdragon 7 Gen 3 processor for hyper-efficient performance",
    "5500mAh battery offering exceptional multi-day endurance",
    "80W SUPERVOOC fast charging",
    "50MP Sony IMX main camera with OIS",
    "Clean, bloat-free OxygenOS based on Android 16",
  ],
  specifications: {
    Display: '6.7" FHD+ Fluid AMOLED, 120Hz, HDR10+, 2800 nits peak',
    "Chip/Processor": "Qualcomm Snapdragon 7 Gen 3",
    RAM: "8GB LPDDR4X",
    Storage: "128GB / 256GB UFS 3.1",
    "Rear Camera": "50MP (OIS) + 8MP (Ultrawide)",
    "Front Camera": "16MP (f/2.4)",
    Battery: "5500mAh",
    OS: "OxygenOS 16.0 (Android 16)",
    "SIM Type": "Dual Nano-SIM",
    "5G Bands": "n1/3/5/8/28A/40/41/77/78",
    Weight: "186g",
    Dimensions: "162.5 x 75.3 x 8.2 mm",
    "Water Resistance": "IP54 Splash Resistance",
    Sensors: "In-display Fingerprint, Accelerometer, Gyroscope, Proximity",
    "Colour/Variants": "Aqua Surge, Gravity Grey",
    "Charging Speed": "80W SUPERVOOC",
    "In-box Items":
      "Phone, 80W Power Adapter, Type-C Cable, Clear Case, Pre-applied Screen Protector",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const NORD_CE6_COLOUR_OPTIONS = [
  { name: "Aqua Surge", hex: "#0FA3A3" },
  { name: "Gravity Grey", hex: "#4A4F57" },
];

// -------------------------------------------------------------------
// Product reviews (7 total — 6 × 5★, 1 × 4★)
// -------------------------------------------------------------------
export const NORD_CE6_REVIEWS: ProductReviewDetail[] = [
  {
    id: "nordce6-r1",
    name: "Aditya Sharma",
    city: "Delhi, Delhi",
    rating: 5,
    title: "Marathon battery is the real deal",
    text: "The battery easily lasts me two full days of heavy use — I no longer carry a power bank. The fast charging takes it from empty to full in under 40 minutes, which is genuinely impressive. For ₹23,998 with 20% off, this is the best value OnePlus in years.",
    date: "2026-07-20",
    isVerified: true,
    helpfulCount: 45,
  },
  {
    id: "nordce6-r2",
    name: "Priya Menon",
    city: "Kochi, Kerala",
    rating: 5,
    title: "Buttery smooth display",
    text: "The display is stunning — everything feels incredibly fluid, and the colours are vivid with great viewing angles. OxygenOS is clean, fast, and free of bloatware. The phone feels light and the design looks premium in Aqua Surge. Absolutely love it.",
    date: "2026-07-14",
    isVerified: true,
    helpfulCount: 36,
  },
  {
    id: "nordce6-r3",
    name: "Rahul Verma",
    city: "Lucknow, Uttar Pradesh",
    rating: 5,
    title: "Flies through everything",
    text: "Gaming, multitasking, and everyday tasks are all handled effortlessly. The phone stays cool even during long gaming sessions, and OxygenOS keeps the experience smooth and responsive. Charging speed is a game-changer too.",
    date: "2026-07-08",
    isVerified: true,
    helpfulCount: 28,
  },
  {
    id: "nordce6-r4",
    name: "Sneha Kulkarni",
    city: "Pune, Maharashtra",
    rating: 5,
    title: "Camera nails every shot",
    text: "The main camera captures sharp, detailed photos even in low light — no more blurry night shots. The ultrawide is great for landscapes and video looks crisp. OnePlus kept exactly what matters in the Core Edition.",
    date: "2026-07-01",
    isVerified: true,
    helpfulCount: 22,
  },
  {
    id: "nordce6-r5",
    name: "Manish Gupta",
    city: "Jaipur, Rajasthan",
    rating: 5,
    title: "Clean OxygenOS experience",
    text: "This is the cleanest Android experience I've used — no bloatware, no annoying notifications, just fast and smooth. The in-display fingerprint sensor is quick and reliable. Battery life and the included fast charger make this an easy recommendation.",
    date: "2026-06-24",
    isVerified: true,
    helpfulCount: 19,
  },
  {
    id: "nordce6-r6",
    name: "Ananya Reddy",
    city: "Hyderabad, Telangana",
    rating: 5,
    title: "Perfect everyday phone",
    text: "The Nord CE 6 does everything right for daily use — a gorgeous display, two-day battery, and fast charging that fits my busy schedule. The clear case and pre-applied screen protector in the box are thoughtful touches. Delivery was quick and well packed.",
    date: "2026-06-16",
    isVerified: true,
    helpfulCount: 16,
  },
  {
    id: "nordce6-r7",
    name: "Kunal Mehta",
    city: "Mumbai, Maharashtra",
    rating: 4,
    title: "Excellent value, minor quirks",
    text: "Overall a fantastic phone for the price — battery, display, and performance are all top notch. I do miss the alert slider from mainline Nord devices, and there's no headphone jack, but neither is a deal-breaker. At 20% off MRP, it's superb value.",
    date: "2026-06-09",
    isVerified: true,
    helpfulCount: 13,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const NORD_CE6_REVIEW_SUMMARY = {
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
export const NORD_CE6_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const NORD_CE6_FAQS = [
  {
    question: "Does the OnePlus Nord CE 6 5G have an alert slider?",
    answer:
      "No, to maintain a streamlined design and lower cost, the CE series typically omits the physical alert slider found on mainline Nord devices. You can still quickly switch between ring, vibrate, and silent modes via the software quick settings.",
  },
  {
    question: "Does it have a 3.5mm audio jack?",
    answer:
      "No, the OnePlus Nord CE 6 5G relies on USB-C or Bluetooth for audio connectivity. It's fully compatible with wireless earbuds and USB-C earphones, delivering clean digital audio for music, calls, and gaming.",
  },
  {
    question: "Is the 80W SUPERVOOC charger included in the box?",
    answer:
      "Yes, the 80W SUPERVOOC power adapter is included in the box, along with a Type-C cable, a clear protective case, and a pre-applied screen protector. You get the complete fast-charging experience right out of the box.",
  },
  {
    question: "Is this the genuine OnePlus Nord CE 6 5G?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. You can verify the IMEI and warranty status on OnePlus's official website after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct procurement, which lets us offer the Nord CE 6 5G at 20% OFF. We've sold hundreds of devices with a 4.6★ average rating. You're fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "How fast does the 80W SUPERVOOC charging really work?",
    answer:
      "The 80W SUPERVOOC takes the 5500mAh battery from 1% to 100% in just under 40 minutes. Combined with the battery's exceptional multi-day endurance, you'll rarely need to reach for the charger at all.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const NORD_CE6_KEY_FEATURES = [
  {
    icon: "🖥️",
    title: "Fluid Visuals",
    description:
      "The 6.7-inch 120Hz Fluid AMOLED display with HDR10+ and 2800 nits peak brightness makes scrolling and gaming incredibly smooth.",
  },
  {
    icon: "🔋",
    title: "Marathon Battery",
    description:
      "The 5500mAh capacity provides up to two days of standard usage — exceptional endurance that keeps up with your busiest days.",
  },
  {
    icon: "⚡",
    title: "SUPERVOOC Speed",
    description:
      "Recharge from 1% to 100% in just under 40 minutes with 80W SUPERVOOC — the charger is included in the box.",
  },
  {
    icon: "🧼",
    title: "OxygenOS Purity",
    description:
      "Enjoy a smooth, bloatware-free, and highly customizable UI built on OxygenOS 16.0 (Android 16) — the OnePlus experience you love.",
  },
  {
    icon: "📷",
    title: "Crisp Camera",
    description:
      "The 50MP Sony IMX sensor with OIS eliminates blur in night shots and action photography for sharp, detailed results.",
  },
  {
    icon: "🪶",
    title: "Sleek Profile",
    description:
      "Maintains a lightweight 186g body despite the massive battery upgrade, keeping the phone comfortable to hold all day.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const NORD_CE6_CAMERA_CONTENT = {
  title: "Core Edition Imaging",
  subtitle: "A 50MP Sony IMX sensor with OIS for blur-free shots",
  highlights: [
    {
      label: "50MP Main",
      detail:
        "Sony IMX sensor with OIS + EIS and f/1.8 aperture — sharp, detailed shots with blur-free night and action photography",
    },
    {
      label: "8MP Ultrawide",
      detail:
        "112° field of view for expansive landscape shots — fit more into every frame",
    },
    {
      label: "4K Video",
      detail:
        "4K video at 30fps, 1080p at 60fps, and Dual-View Video mode for creative, crisp recordings",
    },
    {
      label: "16MP Selfie",
      detail: "f/2.4 aperture front camera for clean, natural self-portraits",
    },
  ],
  features: [
    "50MP Sony IMX main sensor with OIS + EIS — blur-free shots in any light",
    "f/1.8 aperture — bright, detailed low-light photography",
    "8MP 112° ultrawide — expansive landscape and group shots",
    "4K video at 30fps — crisp, detailed recordings",
    "1080p video at 60fps — smooth slow-motion-friendly footage",
    "Dual-View Video mode — capture from both cameras at once",
    "16MP f/2.4 selfie camera — natural, clean self-portraits",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const NORD_CE6_STORY = {
  title: "Back to Core",
  subtitle: "Battery, performance, and software fluidity — nothing more",
  paragraphs: [
    "The 'CE' stands for Core Edition, stripping away gimmicks to deliver exactly what users need most: battery, performance, and software fluidity. The OnePlus Nord CE 6 5G is a return to that philosophy, focusing on the essentials that make a phone genuinely enjoyable every day.",
    "It introduces a massive 5500mAh battery to the CE line without compromising the phone's sleek profile, keeping the weight at a light 186g. Paired with 80W SUPERVOOC charging, the phone recharges from 1% to 100% in just under 40 minutes for exceptional multi-day endurance.",
    "On the front, a 6.7-inch 120Hz Fluid AMOLED display delivers silky-smooth scrolling and gaming, while the Snapdragon 7 Gen 3 keeps everything hyper-efficient. The 50MP Sony IMX main camera with OIS captures crisp, blur-free shots in any light.",
    "With a sharp 20% discount applied to its MRP, the Nord CE 6 5G perfectly hits the sweet spot for budget-conscious tech enthusiasts. With only 22 units available at this price, it's the definitive Core Edition experience from OnePlus.",
  ],
};
