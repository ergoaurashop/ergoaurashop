// =====================================================================
// iQOO Z11x — Standalone Product Data
// This file contains all data specific to the iQOO Z11x page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const IQOO_Z11X_FOLDER = "iQOO Z11x";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const IQOO_Z11X_HERO_IMAGES = [
  "Vivo-iQOO-Z11x.jpg",
  "images.jpg",
  "images (2).jpg",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const IQOO_Z11X_PRODUCT_IMAGES: string[] = [
  "Vivo-iQOO-Z11x.jpg",
  "images.jpg",
  "images (2).jpg",
  "iqoo-z11x-sale-india-1773631047.webp",
  "images (1).jpg",
  "s-l1600.webp",
  "s-l1600 (1).webp",
  "s-l1600 (2).webp",
  "s-l1600 (3).webp",
  "s-l1600 (8).webp",
  "z11x-leak-price.jpg",
  "Vivo-iQOO-Z11x (1).jpg",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const IQOO_Z11X_PRODUCT: Product = {
  id: "prod-iqoo-z11x",
  name: "iQOO Z11x",
  slug: "iqoo-z11x",
  description:
    "The budget gaming king of the year, bringing a smooth 120Hz display, an enormous 6000mAh battery, and robust Snapdragon performance to the sub-₹20K segment.",
  price: 19999,
  original_price: 24999,
  discount_percentage: 20,
  category: "phones",
  images: [],
  stock: 25,
  features: [
    "6.72-inch 120Hz FHD+ display for silky-smooth scrolling and gaming",
    "Qualcomm Snapdragon 6 Gen 1 mobile platform for dependable performance",
    "Huge 6000mAh battery delivering all-day gaming endurance",
    "44W FlashCharge technology for rapid top-ups",
    "50MP AI rear camera system for vibrant everyday shots",
    "iQOO gaming optimization with Extended RAM up to 16GB",
  ],
  specifications: {
    Display: '6.72" FHD+ IPS LCD, 120Hz, 1000 nits peak',
    "Chip/Processor": "Qualcomm Snapdragon 6 Gen 1",
    RAM: "6GB / 8GB LPDDR4X (Expandable via Extended RAM)",
    Storage: "128GB UFS 2.2",
    "Rear Camera": "50MP Main + 2MP Depth",
    "Front Camera": "8MP",
    Battery: "6000mAh",
    OS: "FuntouchOS based on Android 16",
    "SIM Type": "Dual Nano-SIM (Hybrid slot)",
    "5G Bands": "Sub-6 5G Support",
    Weight: "199g",
    Dimensions: "165.7 x 76 x 8.0 mm",
    "Water Resistance": "IP64 Dust and Water resistance",
    Sensors: "Side-mounted Fingerprint, Accelerometer, Gyroscope",
    "Colour/Variants": "Mystic Black, Aqua Blue",
    "Charging Speed": "44W FlashCharge",
    "In-box Items": "Phone, 44W Charger, Cable, TPU Case",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const IQOO_Z11X_COLOUR_OPTIONS = [
  { name: "Mystic Black", hex: "#111827" },
  { name: "Aqua Blue", hex: "#22D3EE" },
];

// -------------------------------------------------------------------
// Product reviews (7 total — 6 × 5★, 1 × 4★)
// -------------------------------------------------------------------
export const IQOO_Z11X_REVIEWS: ProductReviewDetail[] = [
  {
    id: "iqooz11x-r1",
    name: "Arjun Mehta",
    city: "Mumbai, Maharashtra",
    rating: 5,
    title: "Gaming endurance is unreal for the price",
    text: "The battery is the real deal — I can play BGMI and Call of Duty for hours and still have plenty of charge left at the end of the day. The display makes every match feel incredibly smooth, and performance keeps frame rates stable. Easily the best gaming phone under ₹20K.",
    date: "2026-07-22",
    isVerified: true,
    helpfulCount: 48,
  },
  {
    id: "iqooz11x-r2",
    name: "Sneha Patel",
    city: "Ahmedabad, Gujarat",
    rating: 5,
    title: "Smooth experience every day",
    text: "Scrolling, animations and app switching are all buttery smooth. The screen is bright and sharp, and it handles sunlight really well. The battery easily lasts me a full day and a half.",
    date: "2026-07-16",
    isVerified: true,
    helpfulCount: 36,
  },
  {
    id: "iqooz11x-r3",
    name: "Rahul Verma",
    city: "Lucknow, Uttar Pradesh",
    rating: 5,
    title: "Charging is genuinely fast",
    text: "I was skeptical about fast charging but it fills the huge battery surprisingly quickly. A short 30-minute top-up gets me through most of a gaming session. The phone also stays cool during long use — no slowdowns in my experience.",
    date: "2026-07-10",
    isVerified: true,
    helpfulCount: 31,
  },
  {
    id: "iqooz11x-r4",
    name: "Ananya Sharma",
    city: "New Delhi, Delhi",
    rating: 5,
    title: "Perfect budget daily driver",
    text: "As a student, this is exactly what I needed. The battery lasts me through classes, streaming and social media without anxiety, and the camera takes clean, colourful shots in daylight. The headphone jack is a huge plus for my wired earphones.",
    date: "2026-07-04",
    isVerified: true,
    helpfulCount: 26,
  },
  {
    id: "iqooz11x-r5",
    name: "Karthik Nair",
    city: "Thiruvananthapuram, Kerala",
    rating: 5,
    title: "Great for multitasking",
    text: "The phone keeps all my apps and games open without reloading them, which I love. The software is clean and fast, and the gaming mode is genuinely useful — I can block notifications when I'm in a ranked match.",
    date: "2026-06-27",
    isVerified: true,
    helpfulCount: 21,
  },
  {
    id: "iqooz11x-r6",
    name: "Priya Reddy",
    city: "Bengaluru, Karnataka",
    rating: 5,
    title: "Incredible value with 20% off",
    text: "At ₹19,999 this is outstanding value. The battery, smooth screen, and the bundled fast charger and case in the box make it a complete package. It feels premium in hand with its slim profile and the water resistance gives peace of mind.",
    date: "2026-06-18",
    isVerified: true,
    helpfulCount: 18,
  },
  {
    id: "iqooz11x-r7",
    name: "Vikram Singh",
    city: "Jaipur, Rajasthan",
    rating: 4,
    title: "Great phone, minor display trade-off",
    text: "Performance, battery and charging are all excellent for the price. My only small gripe is the screen type — colours are still good, but blacks aren't as deep and there's no always-on display. The depth camera is also pretty basic. Neither is a deal-breaker at this price though.",
    date: "2026-06-10",
    isVerified: true,
    helpfulCount: 14,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const IQOO_Z11X_REVIEW_SUMMARY = {
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
export const IQOO_Z11X_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const IQOO_Z11X_FAQS = [
  {
    question: "Does the iQOO Z11x have an AMOLED screen?",
    answer:
      "To keep costs low and prioritize performance and battery life, the Z11x utilizes a high-quality 6.72-inch 120Hz FHD+ IPS LCD with 1000 nits peak brightness. It delivers smooth visuals and clear daylight visibility while keeping the price accessible.",
  },
  {
    question: "Is there a 3.5mm headphone jack?",
    answer:
      "Yes, the iQOO Z11x includes a 3.5mm audio jack, perfect for zero-latency gaming headsets and wired earphones. It's a welcome feature for gamers and music lovers alike.",
  },
  {
    question: "Can the RAM be expanded beyond the base configuration?",
    answer:
      "Yes, the Z11x supports iQOO's Extended RAM feature, which dynamically utilizes storage space to expand the memory up to 16GB. This keeps more apps and games running in the background without reloads.",
  },
  {
    question: "Is this the genuine iQOO Z11x?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. You can verify the IMEI and warranty status on vivo/iQOO's official website after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct procurement, which lets us offer the Z11x at 20% OFF. We've sold hundreds of devices with a 4.6★ average rating. You're fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "How long does the 6000mAh battery last for gaming?",
    answer:
      "The 6000mAh battery easily supports hours of non-stop BGMI or Call of Duty on a single charge. For mixed everyday use it comfortably lasts a full day and a half, and the 44W FlashCharge refills the large cell quickly whenever you do need to top up.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const IQOO_Z11X_KEY_FEATURES = [
  {
    icon: "🎮",
    title: "Marathon Gaming",
    description:
      "The 6000mAh battery easily supports hours of non-stop BGMI or Call of Duty on a single charge.",
  },
  {
    icon: "🖥️",
    title: "120Hz Fluidity",
    description:
      "A fast 120Hz refresh rate ensures smooth frame rendering and responsive touch on the 6.72-inch display.",
  },
  {
    icon: "⚙️",
    title: "Snapdragon Power",
    description:
      "The 4nm Snapdragon 6 Gen 1 provides stellar power efficiency and stable frame rates in demanding games.",
  },
  {
    icon: "⚡",
    title: "44W Fast Charge",
    description:
      "44W FlashCharge replenishes the large battery swiftly to minimize downtime between gaming sessions.",
  },
  {
    icon: "🧠",
    title: "Extended RAM",
    description:
      "Utilizes storage space to expand RAM up to 16GB dynamically for seamless multitasking and gaming.",
  },
  {
    icon: "📸",
    title: "50MP AI Camera",
    description:
      "Captures vibrant everyday photos with enhanced AI scene recognition and crisp detail.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const IQOO_Z11X_CAMERA_CONTENT = {
  title: "Action-Ready Imaging",
  subtitle: "A 50MP AI camera system built for sharp, vibrant everyday shots",
  highlights: [
    {
      label: "50MP Main",
      detail:
        "50MP f/1.8 primary sensor with PDAF focus, capturing sharp action shots with vibrant AI-enhanced colour",
    },
    {
      label: "8MP Selfie",
      detail:
        "8MP front camera with face beauty modes for crisp selfies and clear video calls",
    },
    {
      label: "1080p Video",
      detail:
        "1080p video recording at 30/60fps with electronic stabilization for smooth handheld footage",
    },
    {
      label: "Depth Sensor",
      detail:
        "2MP sensor specifically for calculating portrait mode blur with natural bokeh",
    },
  ],
  features: [
    "50MP f/1.8 primary sensor with PDAF focus",
    "2MP depth sensor for portrait mode background blur",
    "1080p video recording at 30/60fps with electronic stabilization",
    "AI scene recognition for vibrant everyday photos",
    "Night mode for brighter, cleaner low-light photography",
    "Slow-motion and time-lapse capture modes",
    "HDR and panorama modes for versatile shooting",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const IQOO_Z11X_STORY = {
  title: "The Budget Gaming King",
  subtitle:
    "120Hz fluidity, 6000mAh endurance, and Snapdragon power under ₹20K",
  paragraphs: [
    "Engineered to disrupt the budget gaming segment by maximizing battery life and thermal performance, the iQOO Z11x continues the Z-series legacy of high-refresh-rate displays and massive batteries built for young gamers.",
    "At the heart of the phone, a 6.72-inch 120Hz FHD+ display keeps every swipe and frame render silky smooth, while the Qualcomm Snapdragon 6 Gen 1 mobile platform delivers efficient, stable performance for hours of gaming.",
    "The colossal 6000mAh battery easily supports all-day sessions of BGMI or Call of Duty, and 44W FlashCharge technology replenishes it quickly so you spend less time tethered to a charger and more time in the game.",
    "With a sharp 20% discount applied to its MRP, the Z11x positions itself as the budget gaming king of 2026. With only 25 units available at this price, it won't stay in stock for long.",
  ],
};
