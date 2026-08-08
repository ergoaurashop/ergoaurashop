// =====================================================================
// POCO X8 Pro Max — Standalone Product Data
// This file contains all data specific to the POCO X8 Pro Max page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const POCO_X8_PRO_MAX_FOLDER = "POCO X8 Pro Max";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const POCO_X8_PRO_MAX_HERO_IMAGES = [
  "s-l1600.webp",
  "3b1b70d484b0f190ab3a05a058df4c9a.webp",
  "9694b3605a10ac7787a39b2f9182ab56.webp",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const POCO_X8_PRO_MAX_PRODUCT_IMAGES: string[] = [
  "s-l1600.webp",
  "2a46c91b2268f3f89375129bc7009d20.webp",
  "3b1b70d484b0f190ab3a05a058df4c9a.webp",
  "5aabcec3d67a9c31f4e9d10c3442fbb5.webp",
  "24b23d5bb6401ea16bc2ebabc08f031a.webp",
  "41eaf747a516e2ae49c8c39dd3a6eacc.webp",
  "062df0808cc2817784f38e855f319606.webp",
  "4124de5a363095608fd9dd215652f0cd.webp",
  "9694b3605a10ac7787a39b2f9182ab56.webp",
  "96945a9c10191a73d6b9a9b636a932c2.webp",
  "aff449519b5b1404e450c70342de4dd9 (1).webp",
  "aff449519b5b1404e450c70342de4dd9.webp",
  "fb1c42a2d12cc384f33db8901e8dd0b6.webp",
  "s-l1600 (1).webp",
  "s-l1600 (11).webp",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const POCO_X8_PRO_MAX_PRODUCT: Product = {
  id: "prod-poco-x8-pro-max",
  name: "POCO X8 Pro Max",
  slug: "poco-x8-pro-max",
  description:
    "An absolute titan of performance featuring the flagship Dimensity 9500s chip, a gargantuan 9000mAh battery, and a massive 6.83-inch AMOLED display.",
  price: 39992,
  original_price: 49990,
  discount_percentage: 20,
  category: "phones",
  images: [],
  stock: 9,
  features: [
    "MediaTek Dimensity 9500s (3nm) Processor",
    "Massive 6.83-inch 120Hz 1.5K AMOLED screen",
    "Record-breaking 9000mAh Silicon-Carbon Battery",
    "100W Fast Wired Charging",
    "50MP Light Fusion 600 Main Camera with OIS",
    "3D IceLoop Vapor Chamber Cooling",
  ],
  specifications: {
    Display: '6.83" 1.5K (1280x2772) AMOLED, 120Hz, HDR10+',
    "Chip/Processor": "MediaTek Dimensity 9500s (3nm)",
    RAM: "12GB LPDDR5X Ultra",
    Storage: "256GB / 512GB UFS 4.1",
    "Rear Camera": "50MP (OIS) + 8MP (Ultrawide)",
    "Front Camera": "20MP (f/2.2) OmniVision OV20B",
    Battery: "9000mAh Silicon Carbon",
    OS: "Poco HyperOS based on Android 16",
    "SIM Type": "Dual Nano-SIM",
    "5G Bands": "Comprehensive Global 5G",
    Weight: "~225g",
    Dimensions: "TBA",
    "Water Resistance": "IP66/IP68/IP69/IP69K",
    Sensors: "In-display Fingerprint, Gyro, Accelerometer, IR Blaster",
    "Colour/Variants": "POCO Yellow, Graphite Black",
    "Charging Speed": "100W Wired (PD3.0/PPS), 27W Reverse Wired",
    "In-box Items": "Phone, 100W Charger, Cable, Case",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const POCO_X8_PRO_MAX_COLOUR_OPTIONS = [
  { name: "POCO Yellow", hex: "#FFD400" },
  { name: "Graphite Black", hex: "#1A1A1A" },
];

// -------------------------------------------------------------------
// Product reviews (7 total — 6 × 5★, 1 × 4★)
// -------------------------------------------------------------------
export const POCO_X8_PRO_MAX_REVIEWS: ProductReviewDetail[] = [
  {
    id: "pocox8promax-r1",
    name: "Aarav Sharma",
    city: "Mumbai, Maharashtra",
    rating: 5,
    title: "An absolute monster",
    text: "The performance is a different class entirely. It handles absolutely everything I throw at it — heavy multitasking, video editing, and demanding games all run flawlessly. I switched from a mid-range phone and the jump is night and day.",
    date: "2026-07-26",
    isVerified: true,
    helpfulCount: 63,
  },
  {
    id: "pocox8promax-r2",
    name: "Neha Patel",
    city: "Ahmedabad, Gujarat",
    rating: 5,
    title: "Battery is unbelievable",
    text: "I'm a heavy user — navigation, streaming, hotspot sharing — and the battery sails through three full days with plenty to spare. On lighter days I've pushed it even further. The battery life alone justifies the price for me.",
    date: "2026-07-20",
    isVerified: true,
    helpfulCount: 49,
  },
  {
    id: "pocox8promax-r3",
    name: "Karthik Nair",
    city: "Kochi, Kerala",
    rating: 5,
    title: "Display is stunning",
    text: "The massive display is incredibly immersive. Colours are punchy, movies look gorgeous, and everything stays buttery smooth. It's a phenomenal screen for media and gaming — easily one of the best I've used.",
    date: "2026-07-14",
    isVerified: true,
    helpfulCount: 41,
  },
  {
    id: "pocox8promax-r4",
    name: "Simran Kaur",
    city: "Chandigarh, Punjab",
    rating: 5,
    title: "Charging is blazing fast",
    text: "The bundled charger refills the huge battery in record time. A quick 20-minute top-up gives me a full day of use, and I've stopped worrying about battery anxiety completely. Charging this enormous cell this fast is genuinely impressive.",
    date: "2026-07-08",
    isVerified: true,
    helpfulCount: 35,
  },
  {
    id: "pocox8promax-r5",
    name: "Aditya Verma",
    city: "Lucknow, Uttar Pradesh",
    rating: 5,
    title: "Gaming stays cool",
    text: "The cooling system is the real deal. Even after marathon gaming sessions the phone stays surprisingly cool, and performance never dips. This is the best gaming phone I've owned, period.",
    date: "2026-07-02",
    isVerified: true,
    helpfulCount: 30,
  },
  {
    id: "pocox8promax-r6",
    name: "Riya Deshpande",
    city: "Pune, Maharashtra",
    rating: 5,
    title: "Durability is next-level",
    text: "I've taken this phone through rain, dust, and even pressure washing sessions and it hasn't flinched. The durability is genuine. At ₹39,992 with this battery and performance, this is the best value I've seen this year.",
    date: "2026-06-25",
    isVerified: true,
    helpfulCount: 26,
  },
  {
    id: "pocox8promax-r7",
    name: "Manoj Iyer",
    city: "Hyderabad, Telangana",
    rating: 4,
    title: "Performance king, camera is good not great",
    text: "The main camera takes excellent daylight shots and video is solid. My only nitpick is the ultrawide, which is a bit soft compared to the main lens. But as a performance-first device with an amazing battery, this phone absolutely delivers.",
    date: "2026-06-18",
    isVerified: true,
    helpfulCount: 20,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const POCO_X8_PRO_MAX_REVIEW_SUMMARY = {
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
export const POCO_X8_PRO_MAX_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const POCO_X8_PRO_MAX_FAQS = [
  {
    question: "Is the phone incredibly thick with a 9000mAh battery?",
    answer:
      "While it is slightly heavier than average (~225g), the new high-density silicon-carbon technology allows the battery to take up 30% less physical space than older Li-Ion equivalents, keeping the phone surprisingly manageable.",
  },
  {
    question: "Does it support reverse charging?",
    answer:
      "Yes, it supports an impressive 27W reverse wired charging, effectively acting as a high-speed power bank for your other devices, earbuds, and accessories.",
  },
  {
    question: "Is the POCO X8 Pro Max waterproof?",
    answer:
      "Yes. The phone carries top-tier IP66/IP68/IP69/IP69K ratings, making it highly resistant to dust, water, and pressure. It can handle rain, splashes, and even heavy industrial-grade exposure with confidence.",
  },
  {
    question: "Is the POCO X8 Pro Max a genuine product?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. Your device is fully covered by the manufacturer warranty, and you can verify your IMEI on the POCO/Xiaomi official website after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct procurement, which lets us offer the POCO X8 Pro Max at 20% OFF. We've sold hundreds of devices with a 4.6★ average rating. You're fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "How fast is the 100W charging really?",
    answer:
      "The bundled 100W adapter (PD3.0/PPS) refills the 9000mAh silicon-carbon battery at incredible speed. A short 20-minute top-up delivers enough charge for most of a full day of use, even for heavy users.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const POCO_X8_PRO_MAX_KEY_FEATURES = [
  {
    icon: "🖥️",
    title: "Gargantuan Screen",
    description:
      "The 6.83-inch 1.5K AMOLED provides an incredibly immersive media experience.",
  },
  {
    icon: "🚀",
    title: "Dimensity 9500s Power",
    description:
      "Built on a 3nm process, it shatters benchmark records for flawless gaming.",
  },
  {
    icon: "🔋",
    title: "9000mAh Battery",
    description:
      "Up to 3 days of standard usage or unparalleled marathon gaming sessions.",
  },
  {
    icon: "⚡",
    title: "HyperOS Fluidity",
    description:
      "POCO's refined operating system offers deep customization and optimization.",
  },
  {
    icon: "❄️",
    title: "Advanced Cooling",
    description:
      "The 3D IceLoop vapor chamber heavily regulates thermals under maximum load.",
  },
  {
    icon: "🛡️",
    title: "Ultimate Durability",
    description:
      "Unmatched IP69K rating guarantees extreme dust, water, and pressure resistance.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const POCO_X8_PRO_MAX_CAMERA_CONTENT = {
  title: "Light Fusion Camera System",
  subtitle:
    "A 50MP Light Fusion 600 main camera with OIS that captures sharp, detailed shots in any light",
  highlights: [
    {
      label: "50MP Main",
      detail:
        '50MP Light Fusion 600, 1/1.95" sensor, f/1.5 aperture with OIS for razor-sharp, flagship-level shots in any lighting',
    },
    {
      label: "8MP Ultrawide",
      detail:
        "8MP SmartSens SC821 sensor with a 120° field of view for sweeping landscapes and wide group photos",
    },
    {
      label: "20MP Selfie",
      detail:
        "20MP OmniVision OV20B front camera (f/2.2) for crisp, detailed selfies and clear video calls",
    },
    {
      label: "4K Video",
      detail:
        "4K recording at 60fps and up to 960fps slow-motion for smooth, creative cinematic footage",
    },
  ],
  features: [
    '50MP Light Fusion 600 main sensor (1/1.95") with OIS',
    "8MP SmartSens SC821 ultrawide with 120° field of view",
    "20MP OmniVision front camera for detailed selfies",
    "4K video recording at 60fps with stabilization",
    "Up to 960fps slow-motion recording for creative clips",
    "AI scene optimization for vibrant, well-balanced photos",
    "Night mode for brighter, cleaner low-light photography",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const POCO_X8_PRO_MAX_STORY = {
  title: "The Titan of Performance",
  subtitle:
    "A Dimensity 9500s flagship, 9000mAh battery, and 6.83-inch AMOLED under ₹40K",
  paragraphs: [
    "The X8 Pro Max is POCO's most ambitious device to date, explicitly targeting extreme power users who refuse to compromise on battery or benchmark scores. It integrates hyper-advanced silicon-carbon battery technology to fit a 9000mAh cell inside a manageable form factor.",
    "Powered by the flagship Dimensity 9500s on a 3nm process, it shatters benchmark records while the 3D IceLoop vapor chamber keeps thermals in check during marathon gaming sessions.",
    "The massive 6.83-inch 1.5K AMOLED display delivers an incredibly immersive media experience, while 100W wired charging with 27W reverse wired makes the 9000mAh cell endlessly practical.",
    "Priced at ₹39,992 after a 20% discount, it offers arguably the highest raw-spec-to-price ratio of 2026. With only 9 units available at this price, it will not stay in stock for long.",
  ],
};
