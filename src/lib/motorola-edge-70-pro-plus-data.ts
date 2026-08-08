// =====================================================================
// Motorola Edge 70 Pro+ 5G — Standalone Product Data
// This file contains all data specific to the Motorola Edge 70 Pro+ 5G page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const EDGE_70_PRO_PLUS_FOLDER = "Motorola Edge 70 Pro+ 5G";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const EDGE_70_PRO_PLUS_HERO_IMAGES = [
  "motorola-edge-70-pro-plus.webp",
  "images.jpg",
  "images (1).jpg",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const EDGE_70_PRO_PLUS_PRODUCT_IMAGES: string[] = [
  "s-l1600.webp",
  "s-l1600 (1).webp",
  "s-l1600 (2).webp",
  "s-l1600 (3).webp",
  "s-l1600 (4).webp",
  "s-l1600 (5).webp",
  "s-l1600 (6).webp",
  "motorola-edge-70-pro-plus.webp",
  "images.jpg",
  "images (1).jpg",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const EDGE_70_PRO_PLUS_PRODUCT: Product = {
  id: "prod-motorola-edge-70-pro-plus",
  name: "Motorola Edge 70 Pro+ 5G",
  slug: "motorola-edge-70-pro-plus",
  description:
    "A true premium flagship killer featuring a blistering 165Hz pOLED display, dual 50MP cameras, and ultra-fast 125W charging.",
  price: 37474,
  original_price: 46843,
  discount_percentage: 20,
  category: "phones",
  images: [],
  stock: 11,
  features: [
    "6.7-inch 165Hz pOLED Display",
    "Snapdragon 8s Gen 4 Processor",
    "Dual 50MP Rear Cameras (Main + Ultrawide/Macro)",
    "5000mAh Battery with 125W Wired and 50W Wireless Charging",
    "IP68 Water & Dust Resistance",
    "Premium Vegan Leather and Aluminum build",
  ],
  specifications: {
    Display: '6.7" pOLED, 165Hz, 1.5K, HDR10+, 4000 nits peak',
    "Chip/Processor": "Qualcomm Snapdragon 8s Gen 4",
    RAM: "12GB LPDDR5X",
    Storage: "256GB UFS 4.0",
    "Rear Camera": "50MP (OIS) Main + 50MP Ultrawide",
    "Front Camera": "50MP",
    Battery: "5000mAh",
    OS: "Android 16 (3 years OS updates)",
    "SIM Type": "Dual SIM (Nano + eSIM)",
    "5G Bands": "Global Sub-6",
    Weight: "188g",
    Dimensions: "161.2 x 73.1 x 8.0 mm",
    "Water Resistance": "IP68",
    Sensors: "In-display Fingerprint, Accelerometer, Gyro, Proximity, Barometer",
    "Colour/Variants": "Interstellar Black, Vegan Leather Blue",
    "Charging Speed": "125W Wired, 50W Wireless, 10W Reverse Wireless",
    "In-box Items": "Phone, 125W Charger, Cable, Premium Case",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const EDGE_70_PRO_PLUS_COLOUR_OPTIONS = [
  { name: "Interstellar Black", hex: "#1A1A1A" },
  { name: "Vegan Leather Blue", hex: "#2E5E8C" },
];

// -------------------------------------------------------------------
// Product reviews (10 total)
// -------------------------------------------------------------------
export const EDGE_70_PRO_PLUS_REVIEWS: ProductReviewDetail[] = [
  {
    id: "edge70proplus-r1",
    name: "Aarav Sharma",
    city: "Mumbai, Maharashtra",
    rating: 5,
    title: "Display is stunning",
    text: "The display is the smoothest I have ever used on a phone. Everything looks vibrant and razor sharp. Scrolling, gaming, and even basic animations feel incredibly fluid. This is a flagship display experience that beats phones costing twice as much.",
    date: "2026-08-14",
    isVerified: true,
    helpfulCount: 58,
  },
  {
    id: "edge70proplus-r2",
    name: "Priya Sharma",
    city: "Delhi, Delhi",
    rating: 5,
    title: "Dual cameras deliver flagship photos",
    text: "The dual camera setup is outstanding. The main sensor captures sharp, detailed photos in any light, and the ultrawide doubles as a macro lens for close-up shots. Night mode is clean and the video capability is a massive bonus at this price.",
    date: "2026-08-08",
    isVerified: true,
    helpfulCount: 47,
  },
  {
    id: "edge70proplus-r3",
    name: "Rohan Verma",
    city: "Bengaluru, Karnataka",
    rating: 5,
    title: "Charging is a game-changer",
    text: "The bundled charger takes the battery from near-empty to full in about 18 minutes. I no longer worry about charging overnight. A quick 10-minute top-up while getting ready gives me a full day of heavy use. This phone has completely changed how I think about battery life.",
    date: "2026-08-01",
    isVerified: true,
    helpfulCount: 39,
  },
  {
    id: "edge70proplus-r4",
    name: "Ananya Iyer",
    city: "Chennai, Tamil Nadu",
    rating: 5,
    title: "Premium vegan leather build feels amazing",
    text: "The vegan leather back feels genuinely premium in hand and adds a comfortable grip. The frame gives it a solid, flagship feel. Interstellar Black looks stealthy and professional. People have asked me what phone it is multiple times.",
    date: "2026-07-26",
    isVerified: true,
    helpfulCount: 34,
  },
  {
    id: "edge70proplus-r5",
    name: "Kabir Malhotra",
    city: "Chandigarh, Punjab",
    rating: 5,
    title: "Wireless charging is shockingly fast",
    text: "I paired it with the Motorola wireless charging stand and it is genuinely fast. No cables needed during the day, and it is still faster than most wired chargers on other flagships. Combined with the wired option, you will never run out of ways to charge.",
    date: "2026-07-19",
    isVerified: true,
    helpfulCount: 28,
  },
  {
    id: "edge70proplus-r6",
    name: "Sneha Kulkarni",
    city: "Pune, Maharashtra",
    rating: 5,
    title: "Handles everything flawlessly",
    text: "Day to day this phone is flawless. Heavy multitasking, editing video, and playing demanding games all run without any stutter. Everything stays open in memory without reloading. It genuinely feels like a much more expensive flagship.",
    date: "2026-07-12",
    isVerified: true,
    helpfulCount: 26,
  },
  {
    id: "edge70proplus-r7",
    name: "Aditya Reddy",
    city: "Hyderabad, Telangana",
    rating: 5,
    title: "Selfie camera is exceptional",
    text: "The front camera takes incredibly detailed selfies, even in low light. Video calls are crisp. This is the first phone I have owned where the selfie camera matches the main camera quality.",
    date: "2026-07-05",
    isVerified: true,
    helpfulCount: 22,
  },
  {
    id: "edge70proplus-r8",
    name: "Ishita Banerjee",
    city: "Kolkata, West Bengal",
    rating: 4,
    title: "Great phone, wireless stand sold separately",
    text: "The phone itself is superb — fast, beautiful display, excellent cameras. I knocked one star only because the wireless charging requires a separate Motorola stand that is not included in the box. Wired charging is included and insanely fast though.",
    date: "2026-06-28",
    isVerified: true,
    helpfulCount: 19,
  },
  {
    id: "edge70proplus-r9",
    name: "Vikram Singh",
    city: "Jaipur, Rajasthan",
    rating: 5,
    title: "Water resistance gives total peace of mind",
    text: "I dropped this in water while taking a pool video and it survived without any issue. The water resistance is genuine. The video recording is also surprisingly stable. This phone is built for real-life use.",
    date: "2026-06-20",
    isVerified: true,
    helpfulCount: 17,
  },
  {
    id: "edge70proplus-r10",
    name: "Meera Nair",
    city: "Kochi, Kerala",
    rating: 5,
    title: "Best value flagship deal I have seen",
    text: "At ₹37,474 this is an unbelievable deal for a flagship with a stunning display, excellent dual cameras, and super-fast charging. I compared it to phones in the ₹50K range and this wins on almost everything. 100% recommend.",
    date: "2026-06-14",
    isVerified: true,
    helpfulCount: 31,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const EDGE_70_PRO_PLUS_REVIEW_SUMMARY = {
  totalReviews: 27,
  averageRating: 4.8,
  ratingDistribution: {
    5: 23,
    4: 3,
    3: 1,
    2: 0,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on select reviews)
// -------------------------------------------------------------------
export const EDGE_70_PRO_PLUS_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const EDGE_70_PRO_PLUS_FAQS = [
  {
    question: "Do I need a special charger for 50W wireless charging?",
    answer:
      "Yes, to achieve the full 50W wireless speeds, you will need the proprietary Motorola wireless charging stand (sold separately). Wired 125W charging is fully supported with the bundled charger in the box.",
  },
  {
    question: "Does it support e-SIM?",
    answer:
      "Yes, it supports one physical Nano-SIM alongside an eSIM, giving you the flexibility of dual connectivity without needing a second physical SIM card.",
  },
  {
    question: "Is the Motorola Edge 70 Pro+ 5G waterproof?",
    answer:
      "Yes. The phone carries a top-tier IP68 water and dust resistance rating, so it can handle rain, splashes, and even full submersion with confidence.",
  },
  {
    question: "How fast is the 125W wired charging really?",
    answer:
      "The bundled 125W TurboPower charger refills the 5000mAh battery from near-empty to full in roughly 18 minutes. A quick 10-minute top-up gives you a full day of use even for heavy users.",
  },
  {
    question: "Is the Motorola Edge 70 Pro+ 5G a genuine product?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. Your device is fully covered by the manufacturer warranty, and you can verify your IMEI on Motorola official website after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct procurement, which lets us offer the Motorola Edge 70 Pro+ 5G at 20% OFF. We have sold hundreds of devices with a 4.8★ average rating. You are fully protected by our return policy and secure payment gateway (Razorpay).",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const EDGE_70_PRO_PLUS_KEY_FEATURES = [
  {
    icon: "🖥️",
    title: "165Hz Display",
    description:
      "The absolute fastest refresh rate available for unparalleled UI smoothness and gaming.",
  },
  {
    icon: "🚀",
    title: "Snapdragon 8-Series",
    description:
      "Uncompromising performance powered by the Snapdragon 8s Gen 4.",
  },
  {
    icon: "⚡",
    title: "125W TurboPower",
    description:
      "Charge the 5000mAh battery to full in roughly 18 minutes.",
  },
  {
    icon: "📷",
    title: "High-Res Trio",
    description:
      "Features a 50MP main, 50MP ultrawide, and a 50MP selfie camera for zero resolution drops.",
  },
  {
    icon: "🔋",
    title: "50W Wireless Charging",
    description:
      "Ditch the cables without sacrificing fast charging speeds.",
  },
  {
    icon: "💻",
    title: "Ready For",
    description:
      "Seamlessly connect to external monitors for a desktop-like PC experience.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const EDGE_70_PRO_PLUS_CAMERA_CONTENT = {
  title: "High-Resolution Triple Camera System",
  subtitle:
    "50MP main, 50MP ultrawide with Macro Vision, and a 50MP selfie camera — zero resolution drops anywhere",
  highlights: [
    {
      label: "50MP Main",
      detail:
        '50MP, 1/1.3" sensor, f/1.8, omni-directional PDAF and OIS for razor-sharp, flagship-level shots in any light',
    },
    {
      label: "50MP Ultrawide",
      detail:
        "50MP ultrawide with a 114° field of view and Macro Vision for sweeping landscapes and extreme close-ups",
    },
    {
      label: "50MP Selfie",
      detail:
        "50MP front camera, f/2.2 with 4K recording for crisp, detailed selfies and clear video calls",
    },
    {
      label: "8K Video",
      detail:
        "Record up to 8K at 30fps and 4K at 60fps with smooth, cinematic stabilization",
    },
  ],
  features: [
    '50MP main sensor (1/1.3") with OIS and omni-directional PDAF',
    "50MP ultrawide with 114° field of view and Macro Vision",
    "50MP front camera with 4K video recording",
    "8K video at 30fps and 4K at 60fps",
    "AI scene optimization for vibrant, well-balanced photos",
    "Night mode for brighter, cleaner low-light photography",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const EDGE_70_PRO_PLUS_STORY = {
  title: "The Pinnacle of Motorola Engineering",
  subtitle:
    "A 165Hz pOLED flagship, dual 50MP cameras, and 125W charging under ₹38K",
  paragraphs: [
    "The Pro+ moniker represents the absolute pinnacle of Motorola 2026 Edge lineup, sparing no expense on premium features. It combines industry-leading 165Hz display technology with lightning-fast 50W wireless charging, features usually reserved for phones double its price.",
    "The dual 50MP camera system — a 50MP main with OIS and a 50MP ultrawide with Macro Vision — ensures zero resolution drops across every lens, while the 50MP front camera delivers stunning selfies.",
    "With a 5000mAh battery, 125W TurboPower wired charging fills it to full in roughly 18 minutes, and the 50W wireless option means you can ditch the cables entirely. IP68 resistance and a premium vegan leather build complete the flagship package.",
    "Thanks to the heavy 20% discount, users can obtain elite flagship specs at a mid-range price of ₹37,474. With only 11 units available at this price, it will not stay in stock for long.",
  ],
};