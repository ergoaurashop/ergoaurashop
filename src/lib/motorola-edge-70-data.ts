// =====================================================================
// Motorola Edge 70 — Standalone Product Data
// This file contains all data specific to the Motorola Edge 70 page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const EDGE_70_FOLDER = "Motorola Edge 70";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const EDGE_70_HERO_IMAGES = [
  "Edge-70.jpg",
  "169804735-PBA500CP20042026_01-2100.webp",
  "gsmarena_007.jpg",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const EDGE_70_PRODUCT_IMAGES: string[] = [
  "Edge-70.jpg",
  "169804735-PBA500CP20042026_01-2100.webp",
  "gsmarena_007.jpg",
  "images.jpg",
  "s-l1600.webp",
  "s-l1600 (1).webp",
  "s-l1600 (2).webp",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const EDGE_70_PRODUCT: Product = {
  id: "prod-motorola-edge-70",
  name: "Motorola Edge 70",
  slug: "motorola-edge-70",
  description:
    "The baseline standard for premium aesthetics, featuring a vivid 144Hz pOLED display, rapid 125W charging, and a versatile 50MP dual-camera system.",
  price: 22676,
  original_price: 28345,
  discount_percentage: 20,
  category: "phones",
  images: [],
  stock: 15,
  features: [
    "6.6-inch 144Hz pOLED 1.5K display",
    "Snapdragon 7 Gen 3 processor",
    "50MP main camera with OIS + 13MP Ultrawide",
    "5000mAh battery with 125W TurboPower",
    "Vegan leather finish with IP68 dust/water resistance",
    "Stereo speakers with Dolby Atmos tuning",
  ],
  specifications: {
    Display: '6.6" 1.5K pOLED, 144Hz, HDR10+, 4000 nits peak',
    "Chip/Processor": "Qualcomm Snapdragon 7 Gen 3",
    RAM: "8GB / 12GB LPDDR5X",
    Storage: "256GB UFS 3.1",
    "Rear Camera": "50MP (OIS) + 13MP (Ultrawide)",
    "Front Camera": "32MP (f/2.4)",
    Battery: "5000mAh",
    OS: "Android 16",
    "SIM Type": "Dual SIM (Nano + eSIM)",
    "5G Bands": "Comprehensive Global Sub-6 5G Support",
    Weight: "178g",
    Dimensions: "159.8 x 72.5 x 7.6 mm",
    "Water Resistance": "IP68",
    Sensors:
      "Under-display fingerprint, Accelerometer, Gyro, Proximity, Compass",
    "Colour/Variants": "Eclipse Black, Lunar Blue (Vegan Leather)",
    "Charging Speed": "125W Wired, 15W Wireless",
    "In-box Items": "Phone, 125W Charger, Cable, Case",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const EDGE_70_COLOUR_OPTIONS = [
  { name: "Eclipse Black", hex: "#141414" },
  { name: "Lunar Blue", hex: "#2A4B8C" },
];

// -------------------------------------------------------------------
// Product reviews (7 total — 6 × 5★, 1 × 4★)
// -------------------------------------------------------------------
export const EDGE_70_REVIEWS: ProductReviewDetail[] = [
  {
    id: "edge70-r1",
    name: "Rohan Iyer",
    city: "Chennai, Tamil Nadu",
    rating: 5,
    title: "Charging speed is unreal",
    text: "The super-fast charging is the headline feature and it genuinely delivers — I get a full day's battery in under 15 minutes. It completely changed how I use my phone. The display is gorgeous and buttery smooth. For ₹22,676, this is easily the best value premium phone I've owned.",
    date: "2026-07-19",
    isVerified: true,
    helpfulCount: 42,
  },
  {
    id: "edge70-r2",
    name: "Meera Nair",
    city: "Bengaluru, Karnataka",
    rating: 5,
    title: "Premium feel, gorgeous vegan leather",
    text: "The Lunar Blue vegan leather back feels fantastic in hand — soft, secure grip and it never picks up smudges. The display is vivid with punchy colours, and the slim profile makes it feel truly flagship. Camera quality is sharp even in low light. Highly recommended.",
    date: "2026-07-13",
    isVerified: true,
    helpfulCount: 33,
  },
  {
    id: "edge70-r3",
    name: "Arjun Deshpande",
    city: "Pune, Maharashtra",
    rating: 5,
    title: "Smooth, fluid experience",
    text: "The display is the smoothest I've used at this price. Scrolling, gaming, and video playback are incredibly fluid. The phone handles everything I throw at it without breaking a sweat. Battery life is solid too — easily a full day even with heavy use.",
    date: "2026-07-06",
    isVerified: true,
    helpfulCount: 26,
  },
  {
    id: "edge70-r4",
    name: "Sanya Kapoor",
    city: "Gurugram, Haryana",
    rating: 5,
    title: "Camera punches above its class",
    text: "The main camera captures stunning detail in both daylight and low-light conditions. The ultrawide with macro is great for creative shots. Stereo speakers make watching movies immersive. It really feels like a premium device in every way.",
    date: "2026-06-29",
    isVerified: true,
    helpfulCount: 21,
  },
  {
    id: "edge70-r5",
    name: "Vikram Singh",
    city: "Chandigarh, Punjab",
    rating: 5,
    title: "Water resistance gives real peace of mind",
    text: "I accidentally spilled water on the phone and it was completely fine — the water resistance is the real deal. Combined with the vegan leather back, this phone feels both premium and durable. Charging is insanely fast, and the phone stays cool even while charging and gaming.",
    date: "2026-06-21",
    isVerified: true,
    helpfulCount: 18,
  },
  {
    id: "edge70-r6",
    name: "Divya Pillai",
    city: "Kochi, Kerala",
    rating: 5,
    title: "Perfect all-rounder for everyday use",
    text: "This is the phone I recommend to everyone. It's fast, looks premium, charges in minutes, and the display is stunning. The slim design makes it easy to use with one hand. Delivery was quick and the phone arrived perfectly sealed with the fast charger included in the box.",
    date: "2026-06-14",
    isVerified: true,
    helpfulCount: 15,
  },
  {
    id: "edge70-r7",
    name: "Karthik Rao",
    city: "Hyderabad, Telangana",
    rating: 4,
    title: "Excellent phone, minor software niggles",
    text: "The hardware is superb — display, camera, charging, and build quality are all top notch. My only minor gripe is a little pre-installed software to uninstall out of the box. Once cleaned up, the experience is fast and fluid. Great value at 20% off the MRP.",
    date: "2026-06-07",
    isVerified: true,
    helpfulCount: 12,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const EDGE_70_REVIEW_SUMMARY = {
  totalReviews: 21,
  averageRating: 4.6,
  ratingDistribution: {
    5: 16,
    4: 3,
    3: 1,
    2: 1,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on select reviews)
// -------------------------------------------------------------------
export const EDGE_70_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const EDGE_70_FAQS = [
  {
    question: "Does it support wireless charging?",
    answer:
      "Yes, the Motorola Edge 70 supports 15W wireless charging, alongside the ultra-fast 125W TurboPower wired charging. You can top up conveniently on any Qi-compatible wireless charger without needing to plug in.",
  },
  {
    question: "Is the charger included in the box?",
    answer:
      "Yes, the ultra-fast 125W TurboPower charger is included in the box, along with the USB-C cable and a protective case. You get the complete fast-charging experience right out of the box — no extra purchases needed.",
  },
  {
    question: "Is this the genuine Motorola Edge 70?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. You can verify the IMEI and warranty status on Motorola's official website after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct procurement, which lets us offer the Edge 70 at 20% OFF. We've sold hundreds of devices with a 4.6★ average rating. You're fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "How fast does the 125W TurboPower charging work?",
    answer:
      "The 125W TurboPower charging provides a full day's battery in under 15 minutes and takes the 5000mAh cell to a full charge remarkably quickly. It's one of the fastest charging speeds available on any phone in this price range.",
  },
  {
    question: "Is the vegan leather back durable?",
    answer:
      "Yes, the vegan leather finish offers a secure, smudge-free grip and is built to last. Combined with the IP68 dust and water resistance rating, the Edge 70 is protected against accidental spills, splashes, and dust — perfect for everyday peace of mind.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const EDGE_70_KEY_FEATURES = [
  {
    icon: "🖥️",
    title: "Silky Smooth Display",
    description:
      "Navigate flawlessly on the 6.6-inch 144Hz 1.5K pOLED screen with HDR10+ and 4000 nits peak brightness. Vivid, fluid, and breathtakingly crisp.",
  },
  {
    icon: "⚡",
    title: "Lightning Charging",
    description:
      "The 125W TurboPower charger provides a full day's battery in under 15 minutes — the fastest charging in its class, with the charger included in the box.",
  },
  {
    icon: "👜",
    title: "Vegan Leather Back",
    description:
      "Enjoy a secure, smudge-free grip with the soft-touch rear panel. Premium flagship-tier aesthetics without the premium price tag.",
  },
  {
    icon: "📷",
    title: "Sharp Photography",
    description:
      "The 50MP OIS sensor guarantees clear shots, day or night, backed by a 13MP ultrawide with macro and a 32MP selfie camera.",
  },
  {
    icon: "🛡️",
    title: "All-Weather Ready",
    description:
      "IP68 certification means spills, splashes, and dust are no problem — the Edge 70 is built to handle everyday life with total confidence.",
  },
  {
    icon: "🔊",
    title: "Immersive Audio",
    description:
      "Dual stereo speakers enhanced by Dolby Atmos deliver rich, room-filling sound for movies, music, and gaming.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const EDGE_70_CAMERA_CONTENT = {
  title: "Versatile 50MP Imaging",
  subtitle: "Capture sharp, detailed shots day or night",
  highlights: [
    {
      label: "50MP Main",
      detail:
        'f/1.8 aperture, 1/1.55" large sensor, Optical Image Stabilization for shake-free clarity',
    },
    {
      label: "13MP Ultrawide",
      detail:
        "120° field of view with Macro capabilities — fit more in every frame and shoot creative close-ups",
    },
    {
      label: "4K Video",
      detail:
        "4K at 30/60fps with Night Vision Video and Auto Focus Tracking for crisp, bright footage",
    },
    {
      label: "32MP Selfie",
      detail: "f/2.4 aperture front camera for sharp, detailed self-portraits",
    },
  ],
  features: [
    "50MP f/1.8 main sensor with OIS — sharp shots in any light",
    'Large 1/1.55" sensor — excellent low-light performance',
    "13MP 120° ultrawide with Macro — versatile creative shooting",
    "4K video at 30/60fps — crisp, detailed recordings",
    "Night Vision Video — bright footage even in near-darkness",
    "Auto Focus Tracking — subjects stay sharp while moving",
    "32MP f/2.4 selfie camera — studio-quality self-portraits",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const EDGE_70_STORY = {
  title: "The Premium Baseline",
  subtitle: "Flagship-tier aesthetics redefined for the everyday",
  paragraphs: [
    "The Motorola Edge 70 is positioned as the perfect middle ground for everyday users seeking premium flagship-tier aesthetics without the ultra-premium price tag. It brings the silky-smooth 144Hz 1.5K pOLED display and a stunning vegan leather finish to a beautifully slim 7.6mm chassis.",
    "Renowned for introducing ultra-fast 125W TurboPower charging to Motorola's standard mid-range lineup, the Edge 70 provides a full day's battery in under 15 minutes. The 5000mAh cell keeps you going all day, while the IP68 rating ensures spills and splashes are no problem.",
    "Photography is handled by a versatile 50MP dual-camera system with Optical Image Stabilization, delivering sharp, detailed shots day or night — complemented by a 13MP ultrawide with macro and a 32MP selfie camera for every creative need.",
    "With the current 20% promotional discount, the Edge 70 is one of the most cost-effective premium devices on the market. With only 15 units available at this price, it's the definitive choice for users who refuse to compromise on design, speed, or value.",
  ],
};
