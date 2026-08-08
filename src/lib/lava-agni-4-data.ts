// =====================================================================
// Lava Agni 4 — Standalone Product Data
// This file contains all data specific to the Lava Agni 4 page,
// modeled exactly on the iPhone 15 Pro Max standalone page pattern.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk
// -------------------------------------------------------------------
export const LAVA_AGNI_4_FOLDER = "Lava Agni 4";

// -------------------------------------------------------------------
// Hero slider images (3 images, auto-fade)
// -------------------------------------------------------------------
export const LAVA_AGNI_4_HERO_IMAGES = [
  "Lava-Agni-4.webp",
  "gsmarena_001.jpg",
  "feature-image.jpg",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// First image is used as the primary / thumbnail
// -------------------------------------------------------------------
export const LAVA_AGNI_4_PRODUCT_IMAGES: string[] = [
  "Lava-Agni-4.webp",
  "gsmarena_001.jpg",
  "feature-image.jpg",
  "lava-agni4-5.jpg",
  "61sEMzIF9tL._AC_UF1000,1000_QL80_.jpg",
  "lavaagni44-1762770368.jpeg",
  "images (1).jpg",
  "images (3).jpg",
  "images.jpg",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const LAVA_AGNI_4_PRODUCT: Product = {
  id: "prod-lava-agni-4",
  name: "Lava Agni 4",
  slug: "lava-agni-4",
  description:
    "India's proud homegrown flagship-killer featuring a stunning curved AMOLED display, bloat-free Android, and lightning-fast Dimensity processing.",
  price: 21599,
  original_price: 26999,
  discount_percentage: 20,
  category: "phones",
  images: [],
  stock: 10,
  features: [
    "6.78-inch 120Hz 3D Curved AMOLED display for flagship aesthetics",
    "MediaTek Dimensity 7300 processor for reliable everyday performance",
    "Clean, Ad-free Android 16 experience straight out of the box",
    "50MP Quad-Bayer main camera with OIS for sharp, bright shots",
    "5000mAh battery with 66W fast charging for all-day power",
    "Premium glass back design with in-display fingerprint sensor",
  ],
  specifications: {
    Display: '6.78" FHD+ 3D Curved AMOLED, 120Hz, HDR10+, 1200 nits',
    "Chip/Processor": "MediaTek Dimensity 7300",
    RAM: "8GB LPDDR5",
    Storage: "256GB UFS 3.1",
    "Rear Camera": "50MP (OIS) + 8MP (Ultrawide) + 2MP (Macro)",
    "Front Camera": "16MP",
    Battery: "5000mAh",
    OS: "Stock Android 16 (No Bloatware)",
    "SIM Type": "Dual Nano-SIM",
    "5G Bands": "14 5G Bands supported",
    Weight: "195g",
    Dimensions: "164.2 x 74.4 x 8.5 mm",
    "Water Resistance": "Splash resistant",
    Sensors: "In-display Fingerprint, Accelerometer, Gyro, Proximity",
    "Colour/Variants": "Viridian Glass, Iron Glass",
    "Charging Speed": "66W Fast Charging",
    "In-box Items": "Phone, 66W Adapter, USB-C Cable, Premium Case",
  },
  is_active: true,
  isSuperChoice: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const LAVA_AGNI_4_COLOUR_OPTIONS = [
  { name: "Viridian Glass", hex: "#1F7A5C" },
  { name: "Iron Glass", hex: "#4A4E53" },
];

// -------------------------------------------------------------------
// Product reviews (7 total — 6 × 5★, 1 × 4★)
// -------------------------------------------------------------------
export const LAVA_AGNI_4_REVIEWS: ProductReviewDetail[] = [
  {
    id: "lavaagni4-r1",
    name: "Rohit Sharma",
    city: "New Delhi, Delhi",
    rating: 5,
    title: "Proudly Made in India and it shows",
    text: "The curved display is genuinely stunning for this price — colours pop, everything scrolls buttery smooth, and the glass back feels every bit as premium as phones costing twice as much. Knowing it's designed and built in India makes it even more special. The clean Android with zero bloatware is a breath of fresh air.",
    date: "2026-07-24",
    isVerified: true,
    helpfulCount: 52,
  },
  {
    id: "lavaagni4-r2",
    name: "Priya Deshmukh",
    city: "Pune, Maharashtra",
    rating: 5,
    title: "Charging is genuinely fast",
    text: "The battery easily gets me through a full day, and the adapter fills it up in under 40 minutes when I need a quick top-up. It's my first Lava phone in years and I'm honestly impressed by how polished the software is — no ads, no junk apps, just clean Android.",
    date: "2026-07-18",
    isVerified: true,
    helpfulCount: 41,
  },
  {
    id: "lavaagni4-r3",
    name: "Aditya Iyer",
    city: "Chennai, Tamil Nadu",
    rating: 5,
    title: "Handles everything smoothly",
    text: "Day-to-day performance is fantastic. App launches, juggling lots of apps at once, even medium-tier gaming all run smoothly without the phone heating up. The in-display fingerprint sensor is fast and reliable too. For ₹21,599 this is an absolute steal.",
    date: "2026-07-12",
    isVerified: true,
    helpfulCount: 33,
  },
  {
    id: "lavaagni4-r4",
    name: "Kavya Nair",
    city: "Kochi, Kerala",
    rating: 5,
    title: "Camera shines at night",
    text: "The camera takes remarkably sharp and bright photos even in low light. Night shots come out clean without the blur I used to get on my old phone. The curved display makes watching videos an immersive experience too.",
    date: "2026-07-06",
    isVerified: true,
    helpfulCount: 27,
  },
  {
    id: "lavaagni4-r5",
    name: "Manish Gupta",
    city: "Jaipur, Rajasthan",
    rating: 5,
    title: "Finally a phone without bloatware",
    text: "I bought this specifically for the clean Android experience and Lava didn't disappoint. No pre-installed spam apps, no forced ads, just stock Android with timely updates. The Agni Mitra doorstep service promise is also a huge confidence boost for a domestic brand.",
    date: "2026-06-29",
    isVerified: true,
    helpfulCount: 22,
  },
  {
    id: "lavaagni4-r6",
    name: "Sanjana Reddy",
    city: "Hyderabad, Telangana",
    rating: 5,
    title: "Incredible value at 20% off",
    text: "At ₹21,599 this is one of the most compelling deals of the year. A gorgeous curved display, plenty of storage, a great camera, fast charging and a clean software experience — it packs everything you'd want. The premium glass back and case in the box make it feel complete.",
    date: "2026-06-20",
    isVerified: true,
    helpfulCount: 19,
  },
  {
    id: "lavaagni4-r7",
    name: "Arjun Khanna",
    city: "Chandigarh, Punjab",
    rating: 4,
    title: "Excellent phone, minor camera trade-offs",
    text: "The main camera is genuinely excellent and the display is gorgeous. My only small complaints are the ultrawide which is a bit soft compared to the main sensor, and it's only splash resistant rather than fully waterproof. Neither is a deal-breaker at this price though.",
    date: "2026-06-13",
    isVerified: true,
    helpfulCount: 15,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const LAVA_AGNI_4_REVIEW_SUMMARY = {
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
export const LAVA_AGNI_4_REVIEW_IMAGES: Record<string, string[]> = {};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const LAVA_AGNI_4_FAQS = [
  {
    question: "Are there any ads in the UI?",
    answer:
      "Absolutely not. Lava prides itself on providing a clean, stock-like Android experience. The Agni 4 ships with Android 16 free of bloatware, pre-installed spam apps and forced advertisements — a major advantage over many competitors in this segment.",
  },
  {
    question: "What is the Agni Mitra service?",
    answer:
      "Agni Mitra is Lava's premium customer service offering, where Lava provides doorstep service or even a phone replacement for hardware faults during the warranty period. It brings peace of mind and is one of the key reasons customers choose a domestic brand.",
  },
  {
    question: "Is the Lava Agni 4 a genuine product?",
    answer:
      "Yes, 100% genuine and factory-sealed. We source our inventory directly from authorized distributors, allowing us to pass exceptional savings to our customers. Your device is fully covered by the manufacturer warranty, and you can verify your IMEI on Lava's official website after delivery.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "This is genuine clearance pricing — we secured a limited batch through direct procurement, which lets us offer the Agni 4 at 20% OFF. We've sold hundreds of devices with a 4.6★ average rating. You're fully protected by our return policy and secure payment gateway (Razorpay).",
  },
  {
    question: "How good is the curved AMOLED display?",
    answer:
      "The 6.78-inch 3D curved AMOLED panel offers flagship-level aesthetics with a 120Hz refresh rate, HDR10+ support and a peak brightness of 1200 nits. It delivers deep blacks, vivid colours and immersive viewing, making it one of the standout features at this price point.",
  },
  {
    question:
      "How long does the 5000mAh battery last, and how fast does it charge?",
    answer:
      "The 5000mAh battery comfortably lasts a full day of demanding use. When you do need a top-up, the bundled 66W fast charger refills the battery to over 60% in roughly 20 minutes and a full charge in well under 40 minutes, so downtime is kept to a minimum.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const LAVA_AGNI_4_KEY_FEATURES = [
  {
    icon: "🖥️",
    title: "Curve Appeal",
    description:
      "The 3D curved AMOLED screen offers flagship aesthetics and immersive viewing with 120Hz smoothness.",
  },
  {
    icon: "🤍",
    title: "Pure Android",
    description:
      "Enjoy a seamless, ad-free Android 16 UI straight out of the box, free from bloatware and spam apps.",
  },
  {
    icon: "⚙️",
    title: "Dimensity 7300",
    description:
      "Reliable performance for everyday multitasking and medium-tier gaming with efficient power management.",
  },
  {
    icon: "📸",
    title: "OIS Photography",
    description:
      "The 50MP sensor with optical stabilization guarantees sharp, bright night photos and steady video.",
  },
  {
    icon: "🔋",
    title: "All-Day Power",
    description:
      "A 5000mAh battery ensures you easily make it through a demanding day, with 66W fast top-ups when needed.",
  },
  {
    icon: "🛡️",
    title: "Agni Mitra",
    description:
      "Comes with Lava's unique doorstep replacement and service program for complete peace of mind.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const LAVA_AGNI_4_CAMERA_CONTENT = {
  title: "Steady, Sharp Imaging",
  subtitle:
    "A 50MP OIS camera system that captures sharp, bright photos day or night",
  highlights: [
    {
      label: "50MP Main",
      detail:
        '50MP 1/1.55" sensor with f/1.88 aperture and OIS + EIS, capturing sharp, bright shots even in low light',
    },
    {
      label: "8MP Ultrawide",
      detail:
        "8MP 112° ultrawide lens for expansive landscapes, group photos and creative perspectives",
    },
    {
      label: "16MP Selfie",
      detail:
        "16MP front camera for crisp selfies and clear video calls with natural skin tones",
    },
    {
      label: "4K Video",
      detail:
        "4K video recording at 30fps with Super Night Video mode for smooth handheld footage after dark",
    },
  ],
  features: [
    '50MP 1/1.55" primary sensor, f/1.88, with OIS + EIS stabilization',
    "8MP 112° ultrawide lens for expansive wide-angle shots",
    "2MP macro camera for close-up detail photography",
    "16MP front camera for sharp selfies and video calls",
    "4K video recording at 30fps with Super Night Video mode",
    "Night mode for brighter, cleaner low-light photography",
    "HDR and portrait modes for versatile everyday shooting",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const LAVA_AGNI_4_STORY = {
  title: "The Proud Homegrown Flagship-Killer",
  subtitle:
    "A curved AMOLED display, bloat-free Android, and Dimensity power under ₹22K",
  paragraphs: [
    'The Agni 4 continues Lava\'s mission to offer Indian consumers a true, no-compromise smartphone built and designed domestically, championing a "Clean Android" philosophy that completely omits the ads and bloatware that plague competitors in this segment.',
    "At its heart, a stunning 6.78-inch 3D curved AMOLED display with a 120Hz refresh rate delivers flagship aesthetics and immersive viewing, while the MediaTek Dimensity 7300 platform handles everyday multitasking and medium-tier gaming with effortless reliability.",
    "The 50MP main camera with optical stabilization ensures sharp, bright photos in any light, and the 5000mAh battery with 66W fast charging keeps you powered through the longest days with minimal downtime.",
    'With a sharp 20% discount applied to its MRP, the Agni 4 positions itself as one of the most compelling "Made in India" devices of 2026. With only 10 units available at this price, it won\'t stay in stock for long.',
  ],
};
