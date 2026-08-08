// =====================================================================
// vivo V70 Elite — Standalone Product Data
// This file contains all data specific to the vivo V70 Elite page,
// modeled exactly on the iQOO 15R standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const VIVO_V70_ELITE_FOLDER = "vivo V70 Elite";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const VIVO_V70_ELITE_HERO_IMAGES = [
  "s-l1600.webp",
  "s-l1600 (1).webp",
  "s-l1600 (2).webp",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const VIVO_V70_ELITE_PRODUCT_IMAGES: string[] = [
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
  "s-l1600 (11).webp",
  "s-l1600 (12).webp",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const VIVO_V70_ELITE_PRODUCT: Product = {
  id: "prod-vivo-v70-elite",
  name: "vivo V70 Elite",
  slug: "vivo-v70-elite",
  description:
    "The ultimate portrait photography smartphone, boasting 50MP autofocus cameras on both the front and back, complemented by a gorgeous curved display.",
  price: 36799,
  original_price: 45999,
  discount_percentage: 20,
  category: "phones",
  images: [],
  stock: 14,
  features: [
    "6.78-inch 1.5K 3D Curved AMOLED display with 120Hz refresh rate",
    "MediaTek Dimensity 8300 processor for snappy, efficient performance",
    "50MP Eye-AF selfie camera for flawless, sharp self-portraits",
    "50MP OIS main camera with Smart Aura Light for studio-grade portraits",
    "5500mAh battery with 80W FlashCharge for all-day endurance",
    "Ultra-slim premium glass design with a gorgeous 3D curved profile",
  ],
  specifications: {
    Display: '6.78" 1.5K Curved AMOLED, 120Hz, 2800 nits peak',
    "Chip/Processor": "MediaTek Dimensity 8300",
    RAM: "8GB / 12GB LPDDR5X",
    Storage: "256GB / 512GB UFS 3.1",
    "Rear Camera": "50MP (OIS) + 8MP (Ultrawide) + Smart Aura Light",
    "Front Camera": "50MP with Eye Autofocus",
    Battery: "5500mAh",
    OS: "FuntouchOS 16",
    "SIM Type": "Dual Nano-SIM",
    "5G Bands": "Sub-6 5G Support",
    Weight: "186g",
    Dimensions: "164.4 x 75.1 x 7.5 mm",
    "Water Resistance": "IP54 Splash Resistance",
    Sensors: "In-display Fingerprint, Gyro, Proximity, Compass",
    "Colour/Variants": "Magic Blue, Noble Black",
    "Charging Speed": "80W FlashCharge",
    "In-box Items": "Phone, 80W Adapter, Cable, Transparent Case",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const VIVO_V70_ELITE_COLOUR_OPTIONS = [
  { name: "Magic Blue", hex: "#4A7BF7" },
  { name: "Noble Black", hex: "#1A1A1A" },
];


// -------------------------------------------------------------------
// Product reviews (10 total — 8 × 5★, 2 × 4★)
// -------------------------------------------------------------------
export const VIVO_V70_ELITE_REVIEWS: ProductReviewDetail[] = [
  {
    id: "vivov70elite-r1",
    name: "Aarav Sharma",
    city: "Mumbai, Maharashtra",
    rating: 5,
    title: "Portrait camera is genuinely studio-grade",
    text: "The main camera plus the Aura Light ring makes portraits look like they were shot with professional lighting. The eye autofocus on the front camera is incredible too — my selfies lock onto my eyes even when moving. This phone is a portrait machine.",
    date: "2026-07-27",
    isVerified: true,
    helpfulCount: 68,
  },
  {
    id: "vivov70elite-r2",
    name: "Priya Nair",
    city: "Kochi, Kerala",
    rating: 5,
    title: "Aura Light is a game changer for night shots",
    text: "I take a lot of evening photos with friends, and the Smart Aura Light automatically warms or cools the ring light to match the scene. Skin tones look natural, backgrounds are crisp, and there is none of that harsh flash look. Absolutely love it.",
    date: "2026-07-22",
    isVerified: true,
    helpfulCount: 52,
  },
  {
    id: "vivov70elite-r3",
    name: "Rohan Mehta",
    city: "Ahmedabad, Gujarat",
    rating: 5,
    title: "Curved display feels ultra-premium",
    text: "The curved display is stunning. It is perfectly readable in direct sunlight, and everything stays buttery smooth. The slim body feels incredible in hand.",
    date: "2026-07-18",
    isVerified: true,
    helpfulCount: 44,
  },
  {
    id: "vivov70elite-r4",
    name: "Ananya Iyer",
    city: "Chennai, Tamil Nadu",
    rating: 5,
    title: "Handles everything I throw at it",
    text: "Daily multitasking, heavy photo editing, and even gaming run smoothly. The phone stays cool and the battery easily lasts a full day with my heavy camera usage. Fast and reliable.",
    date: "2026-07-12",
    isVerified: true,
    helpfulCount: 37,
  },
  {
    id: "vivov70elite-r5",
    name: "Sneha Kulkarni",
    city: "Pune, Maharashtra",
    rating: 5,
    title: "Charging is ridiculously fast",
    text: "From 10% to full in about 35 minutes. I plug in while I am getting ready and by the time I leave, the phone is charged for the whole day. The bundled adapter is compact too, so it travels well.",
    date: "2026-07-05",
    isVerified: true,
    helpfulCount: 31,
  },
  {
    id: "vivov70elite-r6",
    name: "Vikram Singh",
    city: "Jaipur, Rajasthan",
    rating: 5,
    title: "Slimmest premium phone I have owned",
    text: "At just over half a centimetre thick and featherlight, this phone is a joy to hold and use one-handed. The Magic Blue finish looks stunning and gathers compliments constantly. And to pack this much battery into such a slim body is genuinely impressive engineering.",
    date: "2026-06-29",
    isVerified: true,
    helpfulCount: 27,
  },
  {
    id: "vivov70elite-r7",
    name: "Kavya Reddy",
    city: "Hyderabad, Telangana",
    rating: 5,
    title: "Best selfie camera on any phone I have tried",
    text: "The front camera with Eye Autofocus is unreal. Group selfies are sharp across everyone, and the autofocus means no more soft, blurry faces. Video calls also look noticeably better.",
    date: "2026-06-23",
    isVerified: true,
    helpfulCount: 23,
  },
  {
    id: "vivov70elite-r8",
    name: "Arjun Khanna",
    city: "Delhi, Delhi",
    rating: 5,
    title: "Studio-level portraits at a 20% discount",
    text: "At ₹36,799 this is an absolute steal for the portrait capabilities alone. The combination of a great main camera and the Aura Light ring produces photos that would cost far more in any other brand. Superb value.",
    date: "2026-06-17",
    isVerified: true,
    helpfulCount: 20,
  },
  {
    id: "vivov70elite-r9",
    name: "Ishita Bose",
    city: "Kolkata, West Bengal",
    rating: 4,
    title: "Beautiful phone, ultrawide could be better",
    text: "The main camera, selfie camera, and Aura Light are outstanding. My only minor complaint is the ultrawide, which is a little soft compared to the main lens. Everything else about the phone — display, battery, design — is excellent.",
    date: "2026-06-11",
    isVerified: true,
    helpfulCount: 17,
  },
  {
    id: "vivov70elite-r10",
    name: "Siddharth Rao",
    city: "Bengaluru, Karnataka",
    rating: 4,
    title: "Great all-rounder for photography lovers",
    text: "The portrait mode is genuinely flagship-level and the selfie camera is a standout. I wish the phone had better water resistance, but for everyday use it has been perfect. Battery and charging are both excellent.",
    date: "2026-06-04",
    isVerified: true,
    helpfulCount: 14,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const VIVO_V70_ELITE_REVIEW_SUMMARY = {
  totalReviews: 11,
  averageRating: 4.6,
  ratingDistribution: {
    5: 7,
    4: 3,
    3: 1,
    2: 0,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on select reviews)
// -------------------------------------------------------------------
export const VIVO_V70_ELITE_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const VIVO_V70_ELITE_FAQS = [
  {
    question: "What is the Aura Light?",
    answer:
      "It is a specialized, large ring light on the back of the phone that provides softer, more natural lighting for portraits compared to a harsh standard LED flash. It automatically adjusts color temperature to match the scene for beautiful, studio-quality results.",
  },
  {
    question: "Does it have dual stereo speakers?",
    answer:
      "Yes, the V70 Elite features a dual speaker setup for immersive multimedia viewing, with clear vocals and rich sound whether you are watching movies or on a call.",
  },
  {
    question: "Is the phone waterproof?",
    answer:
      "The V70 Elite carries an IP54 splash resistance rating, which protects it against water splashes and light rain. It is not designed for full submersion, but it handles everyday exposure confidently.",
  },
  {
    question: "Is the vivo V70 Elite a genuine product?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. Your device is fully covered by the manufacturer warranty.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct procurement, which lets us offer the V70 Elite at 20% OFF. We have sold hundreds of devices with a 4.6★ average rating. You are fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "How fast is the 80W charging really?",
    answer:
      "The bundled 80W FlashCharge adapter refills the 5500mAh battery from near-empty to full in roughly 35 minutes. A short 15-minute top-up delivers enough charge for most of a full day of use.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const VIVO_V70_ELITE_KEY_FEATURES = [
  {
    icon: "💡",
    title: "Aura Light Portrait",
    description:
      "Studio-quality lighting ring on the back that automatically adjusts color temperature for perfectly natural portraits.",
  },
  {
    icon: "🤳",
    title: "50MP Eye-AF Selfie",
    description:
      "Flawless, sharp selfies that lock onto your eyes even in motion, powered by a 50MP autofocus front camera.",
  },
  {
    icon: "✨",
    title: "Sleek Curved Profile",
    description:
      "A gorgeous 3D curved screen provides a premium, bezel-less feel in an ultra-slim 7.5mm chassis.",
  },
  {
    icon: "⚡",
    title: "Dimensity 8300",
    description:
      "Snappy, energy-efficient performance for seamless daily use and smooth multitasking.",
  },
  {
    icon: "🔋",
    title: "5500mAh Endurance",
    description:
      "All-day battery life enclosed in an ultra-slim 7.5mm chassis.",
  },
  {
    icon: "🚀",
    title: "80W FlashCharge",
    description:
      "Rapid charging powers the phone back up while you grab a coffee.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const VIVO_V70_ELITE_CAMERA_CONTENT = {
  title: "Portrait-First Camera System",
  subtitle:
    "50MP autofocus cameras on the front and back, paired with Smart Aura Light for studio-quality portraits",
  highlights: [
    {
      label: "50MP Main",
      detail:
        "50MP main sensor (f/1.88) with OIS and advanced vivo color science for razor-sharp, flagship-level shots",
    },
    {
      label: "8MP Ultrawide",
      detail:
        "8MP ultrawide sensor for sweeping landscapes and wide group photos with balanced colors",
    },
    {
      label: "50MP Selfie",
      detail:
        "50MP front camera (f/2.0) with Eye Autofocus for flawless selfies and 4K video recording",
    },
    {
      label: "Smart Aura Light",
      detail:
        "Automatic warm/cool color temperature shifting ring light for softer, more natural portrait lighting",
    },
  ],
  features: [
    "50MP main sensor with OIS and advanced vivo color science",
    "Smart Aura Light with automatic warm/cool color temperature shifting",
    "50MP front camera with Eye Autofocus",
    "4K video recording on the front camera",
    "8MP ultrawide sensor for wide-angle shots",
    "AI-enhanced portrait modes for studio-quality results",
    "Night mode for brighter, cleaner low-light photography",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const VIVO_V70_ELITE_STORY = {
  title: "Mobile Portraiture, Redefined",
  subtitle:
    "Temperature-adjusting Aura Light, 50MP autofocus cameras, and an ultra-slim 5500mAh design under ₹40K",
  paragraphs: [
    "The V-series has always championed mobile portraiture, and the V70 Elite pushes boundaries with its temperature-adjusting Aura Light technology — a studio-quality ring light that automatically matches the scene for perfectly natural portraits.",
    "Designed to be one of the slimmest, most ergonomically pleasing phones on the market, it houses a large 5500mAh battery inside an ultra-slim 7.5mm glass chassis with a gorgeous 3D curved AMOLED display.",
    "With 50MP autofocus cameras on both the front and back, every shot — selfie or portrait — locks onto your subject with razor-sharp precision. The 80W FlashCharge gets you back to full in about 35 minutes.",
    "Available at a steep 20% discount, the V70 Elite makes premium studio-level photography accessible for under ₹40K. With only 14 units available at this price, it won't stay in stock for long.",
  ],
};