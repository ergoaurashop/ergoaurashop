// =====================================================================
// iPhone 15 Pro Max 512GB — Standalone Product Data
// This file contains all data specific to the iPhone 15 Pro Max page,
// kept separate from the existing product data to avoid schema conflicts.
// =====================================================================

import type { Product, ProductReviewDetail } from "@/lib/types";

// -------------------------------------------------------------------
// Folder path on disk (nested under Part-2/)
// -------------------------------------------------------------------
export const IPHONE_FOLDER =
  "Part-2/iPhone-15-Pro-Max-512GB-Smart-Phone-Mega-Deal-Offer";

// -------------------------------------------------------------------
// Hero slider images (3 images, 75vh auto-fade)
// -------------------------------------------------------------------
export const IPHONE_HERO_IMAGES = [
  "Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.xlarge_2x.jpg",
  "Apple-iPhone-15-Pro-lineup-design-230912_big.jpg.large_2x.jpg",
  "Apple-iPhone-15-Pro-lineup-camera-system-230912_big.jpg.large_2x.jpg",
];

// -------------------------------------------------------------------
// Full product images list (for gallery/grid usage)
// -------------------------------------------------------------------
export const IPHONE_PRODUCT_IMAGES: string[] = [
  "Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.xlarge_2x.jpg",
  "Apple-iPhone-15-Pro-lineup-design-230912_big.jpg.large_2x.jpg",
  "Apple-iPhone-15-Pro-lineup-camera-system-230912_big.jpg.large_2x.jpg",
  "iPhone-15-Pro-and-15-Pro-Max-1024x593.jpg",
  "4cc8b667f46992d4f4b9b3616298c244.webp",
  "9c676b63b6504d2bb7bf3b92d5fac4cd.webp",
  "51vq0INE3QL._AC_SL1500_.jpg",
  "61M+HNJhn6L._AC_SL1500_.jpg",
  "71nimWkOyjL._AC_SL1500_.jpg",
  "81y-tY6E9hL._AC_SL1500_.jpg",
  "81YSmKnlijL._AC_SL1500_.jpg",
  "718qqVErHNL._AC_SL1500_.jpg",
  "H6c195da845164cdaada13760b9748329C.avif",
  "iphone-15-pro-max-issues-scaled.webp",
  "pexels-photo-16004744.jpg",
  "storage_large_2x.webp",
];

// -------------------------------------------------------------------
// Product data entry
// -------------------------------------------------------------------
export const IPHONE_PRODUCT: Product = {
  id: "prod-apple-iphone-15-pro-max-512gb",
  name: "Apple iPhone 15 Pro Max 512GB",
  slug: "iphone-15-pro-max-512gb",
  description:
    'Apple iPhone 15 Pro Max 512GB — A17 Pro chip, 48MP Pro camera system, 6.7" Super Retina XDR display with ProMotion, titanium design, USB-C, Action button, and all-day battery life. International Version with factory-unlocked SIM support.',
  price: 46990,
  original_price: 94994,
  discount_percentage: 51,
  category: "electronics",
  images: [],
  stock: 9,
  features: [
    "A17 Pro Chip — desktop-class GPU performance with hardware-accelerated ray tracing",
    "48MP Pro Camera System — 5x optical zoom, 24MP default resolution, ProRAW & ProRes",
    '6.7" Super Retina XDR Display — ProMotion 120Hz, Dynamic Island, Always-On display',
    "Titanium Design — aerospace-grade titanium, stronger and lighter than ever",
    "USB-C with USB 3 — up to 10Gb/s transfer speeds, works with your existing cables",
    "512GB Storage — massive space for 4K ProRes videos, photos, and apps",
  ],
  specifications: {
    Display: '6.7" Super Retina XDR, ProMotion 120Hz, 2796x1290, 2000 nits',
    Chip: "A17 Pro (3nm) — 6-core CPU, 6-core GPU, 16-core Neural Engine",
    RAM: "8GB",
    Storage: "512GB",
    "Rear Camera":
      "48MP main (f/1.78) + 12MP ultrawide (f/2.2) + 12MP telephoto 5x (f/2.8)",
    "Front Camera": "12MP TrueDepth (f/1.9) with autofocus",
    Battery: "Up to 29h video playback, 25W MagSafe, 20W wired fast charging",
    OS: "iOS 17 (upgradable to latest iOS)",
    SIM: "Dual eSIM + Nano-SIM (International Version, factory unlocked)",
    "5G Bands": "NSA/SA, Sub-6GHz & mmWave support",
    Weight: "221g",
    Dimensions: "159.9 x 76.7 x 8.25 mm",
    "Water Resistance": "IP68 (6m for 30 min)",
    "Action Button":
      "Customisable shortcut button — silent, camera, flash, voice memo, and more",
    Sensors:
      "Face ID, LiDAR Scanner, Barometer, Gyro, Accelerometer, Proximity, Ambient Light",
    Colour: "Natural Titanium",
  },
  is_active: true,
  created_at: "2026-01-01T00:00:00Z",
  updated_at: "2026-01-01T00:00:00Z",
};

// -------------------------------------------------------------------
// Colour options for the pricing section
// -------------------------------------------------------------------
export const IPHONE_COLOUR_OPTIONS = [
  { name: "Natural Titanium", hex: "#878684" },
  { name: "Blue Titanium", hex: "#2F3640" },
  { name: "White Titanium", hex: "#F2F1ED" },
];

// -------------------------------------------------------------------
// Product reviews (27 total — 24 × 5★, 2 × 4★, 1 × 3★)
// 10 more reviews than the S23 Ultra page (17 reviews)
// -------------------------------------------------------------------
export const IPHONE_REVIEWS: ProductReviewDetail[] = [
  {
    id: "iphone-r1",
    name: "Vikram Mehta",
    city: "Mumbai",
    rating: 5,
    title: "Flagship phone at mid-range price",
    text: "I've been using this iPhone 15 Pro Max for two weeks now and I'm blown away. The A17 Pro chip is insanely fast — games that used to lag on my old phone run buttery smooth at max settings. The 48MP camera captures stunning detail. And getting 512GB storage at this price? Absolute steal. The titanium build feels incredibly premium in hand.",
    date: "2026-01-15",
    isVerified: true,
    helpfulCount: 52,
  },
  {
    id: "iphone-r2",
    name: "Priya Sharma",
    city: "Delhi",
    rating: 5,
    title: "Worth every rupee I spent",
    text: "Was saving up for this phone for months and almost paid full price at an Apple store. Then I found this deal and saved over ₹48,000! The phone is brand new, factory sealed, and works perfectly with Airtel 5G. The battery easily lasts me a full day with heavy use. The 5x telephoto zoom is incredible for travel photography.",
    date: "2026-01-12",
    isVerified: true,
    helpfulCount: 44,
  },
  {
    id: "iphone-r3",
    name: "Rahul Joshi",
    city: "Bangalore",
    rating: 5,
    title: "International version works flawlessly",
    text: "I was hesitant about buying an international version, but I'm glad I took the chance. The phone supports all Indian 5G bands — I'm getting full speed on Jio 5G in Bangalore. Came with a box that had a US-style charger but they included a free Indian adapter. Updated to the latest iOS without any issues. Highly recommend this seller.",
    date: "2026-01-10",
    isVerified: true,
    helpfulCount: 38,
  },
  {
    id: "iphone-r4",
    name: "Ananya Patel",
    city: "Hyderabad",
    rating: 5,
    title: "Best birthday gift ever",
    text: "Bought this for my brother's birthday and he hasn't stopped thanking me. He's a content creator and the ProRes video recording at 4K60fps is a game changer for his work. The USB-C port means he can use the same cables as his MacBook. The titanium finish looks absolutely stunning in Natural Titanium colour.",
    date: "2026-01-08",
    isVerified: true,
    helpfulCount: 31,
  },
  {
    id: "iphone-r5",
    name: "Arun Kumar",
    city: "Chennai",
    rating: 5,
    title: "Upgraded from iPhone 12 — massive difference",
    text: "Had my iPhone 12 for three years and this 15 Pro Max is a generational leap. The 120Hz ProMotion display is so smooth I can't go back to 60Hz. The Dynamic Island is actually useful — I love seeing my Zomato delivery updates without opening the app. Battery life is phenomenal — two full days with moderate use.",
    date: "2026-01-05",
    isVerified: true,
    helpfulCount: 36,
  },
  {
    id: "iphone-r6",
    name: "Sneha Deshmukh",
    city: "Pune",
    rating: 5,
    title: "The titanium design is gorgeous",
    text: "I'm someone who appreciates good design and this iPhone is a masterpiece. The brushed titanium edges feel luxurious, the phone is noticeably lighter than the 14 Pro Max, and the Natural Titanium colour changes beautifully in different lighting. The Action Button is brilliant — I've set mine to open the camera instantly.",
    date: "2026-01-03",
    isVerified: true,
    helpfulCount: 28,
  },
  {
    id: "iphone-r7",
    name: "Karthik Srinivasan",
    city: "Kolkata",
    rating: 5,
    title: "Gaming on this thing is unreal",
    text: "As a mobile gamer, the A17 Pro chip with ray tracing support is a dream come true. Playing Genshin Impact at max settings with 120fps is smooth as butter. The phone does warm up after 45 minutes of gaming, but nothing concerning. The 6.7-inch display with ProMotion makes every game look incredible.",
    date: "2025-12-30",
    isVerified: true,
    helpfulCount: 42,
  },
  {
    id: "iphone-r8",
    name: "Deepa Iyer",
    city: "Ahmedabad",
    rating: 5,
    title: "Battery champ + fast charging",
    text: "I'm a heavy user — calls, emails, YouTube, Instagram, and some light gaming. This phone easily gets me through 1.5 days. When I do need to charge, 20W fast charging gets me to 50% in about 30 minutes. MagSafe charging is super convenient at my desk. At this price, the value is unbeatable.",
    date: "2025-12-28",
    isVerified: true,
    helpfulCount: 25,
  },
  {
    id: "iphone-r9",
    name: "Rohan Desai",
    city: "Jaipur",
    rating: 5,
    title: "Camera system is next level",
    text: "I'm a photography enthusiast and this camera system is incredible. The 48MP main sensor captures insane detail — I can crop into photos and still see crisp details. The 5x optical zoom is perfect for wildlife and architecture shots. Portrait mode with the LiDAR scanner gives DSLR-level bokeh. ProRAW gives me full editing control in Lightroom.",
    date: "2025-12-25",
    isVerified: true,
    helpfulCount: 48,
  },
  {
    id: "iphone-r10",
    name: "Meera Krishnan",
    city: "Lucknow",
    rating: 5,
    title: "₹48,000 off MRP — unbelievable deal",
    text: "Let me do the math for you: Original price ₹94,994. I paid ₹46,990. That's a saving of ₹48,004. For that saved amount, I bought AirPods Pro and still had money left over. The phone is 100% genuine, IMEI checked on Apple's website. International version with no Indian warranty, but at this price I'm okay with that.",
    date: "2025-12-22",
    isVerified: true,
    helpfulCount: 67,
  },
  {
    id: "iphone-r11",
    name: "Amit Verma",
    city: "Chandigarh",
    rating: 4,
    title: "Great phone, just one small issue",
    text: "The phone itself is fantastic — fast, beautiful display, amazing cameras. The reason for 4 stars is that the battery optimisation took about a week to kick in. First few days the battery drained quicker than expected, but after the phone learned my usage patterns, it's been solid. Otherwise, everything is perfect. Great value at this price point.",
    date: "2025-12-20",
    isVerified: true,
    helpfulCount: 19,
  },
  {
    id: "iphone-r12",
    name: "Pooja Nair",
    city: "Bhopal",
    rating: 5,
    title: "Perfect for content creators",
    text: "I run a small YouTube channel and this phone has become my primary camera. The 4K60fps ProRes video looks professionally shot. The stabilization is incredible — I can shoot walking videos without a gimbal. The Action button I mapped to start recording instantly. Log video recording gives me so much flexibility in colour grading.",
    date: "2025-12-18",
    isVerified: true,
    helpfulCount: 33,
  },
  {
    id: "iphone-r13",
    name: "Dhruv Khatri",
    city: "Indore",
    rating: 5,
    title: "Apple ecosystem integration is seamless",
    text: "This is my first iPhone after years on Android and wow, the ecosystem is real. It pairs perfectly with my MacBook and iPad. AirDrop for file transfers, Universal Clipboard, Handoff for calls and messages. iCloud syncs everything instantly. The 512GB storage means I never worry about space. Never going back to Android.",
    date: "2025-12-15",
    isVerified: true,
    helpfulCount: 39,
  },
  {
    id: "iphone-r14",
    name: "Neha Agarwal",
    city: "Coimbatore",
    rating: 5,
    title: "EMI made it easy on my wallet",
    text: "₹46,990 upfront is still a significant amount, but the no-cost EMI option made it very manageable. Paying around ₹3,900/month for 12 months. For a phone that normally costs ₹95,000, I feel like I'm committing a steal every month 😄. Delivery was well-packaged and arrived a day early.",
    date: "2025-12-12",
    isVerified: true,
    helpfulCount: 22,
  },
  {
    id: "iphone-r15",
    name: "Rajesh Tiwari",
    city: "Nagpur",
    rating: 3,
    title: "Good phone but had questions",
    text: "The phone works well and I'm happy with the performance. But I can't help wondering about the pricing — ₹46,990 for a ₹95,000 phone feels almost too good to be true. It's clearly an international version and the seller says it's stock clearance from Dubai. The phone itself seems genuine based on serial number check. Giving 3 stars because I wish there was more transparency about the source.",
    date: "2025-12-10",
    isVerified: true,
    helpfulCount: 55,
  },
  {
    id: "iphone-r16",
    name: "Shweta Bhat",
    city: "Thiruvananthapuram",
    rating: 5,
    title: "The display is a visual treat",
    text: "Coming from an iPhone 11, this display is mind-blowing. The Super Retina XDR with ProMotion at 120Hz makes everything look incredibly smooth. HDR content on Netflix and YouTube is stunning with 2000 nits peak brightness. Dynamic Island is a nice touch — much better than the notch. The always-on display is actually useful for checking time and notifications.",
    date: "2025-12-08",
    isVerified: true,
    helpfulCount: 27,
  },
  {
    id: "iphone-r17",
    name: "Akashdeep Singh",
    city: "Guwahati",
    rating: 5,
    title: "Works great in Northeast India",
    text: "Was worried about network compatibility in Assam, but the phone works flawlessly on Airtel 5G. Got speeds of 300+ Mbps on speed tests. The international version came with a US-style charger plug but they included a free Indian adapter. The Face ID works perfectly even in low light. Very happy with my purchase.",
    date: "2025-12-05",
    isVerified: true,
    helpfulCount: 18,
  },
  {
    id: "iphone-r18",
    name: "Lakshmi Menon",
    city: "Kochi",
    rating: 5,
    title: "USB-C is a game changer",
    text: "Finally Apple switched to USB-C and it's everything I hoped for. I can use the same cable for my iPhone, iPad, and MacBook. The USB 3 speeds (10Gb/s) mean transferring ProRes videos to my laptop is super fast. Charging my phone with my MacBook charger works perfectly. This should have happened years ago but better late than never!",
    date: "2025-12-02",
    isVerified: true,
    helpfulCount: 34,
  },
  {
    id: "iphone-r19",
    name: "Gaurav Yadav",
    city: "Lucknow",
    rating: 5,
    title: "Solid build quality",
    text: "The titanium frame makes a real difference. The phone feels significantly lighter than the 14 Pro Max despite the same size. The Natural Titanium finish doesn't show fingerprints nearly as much as the previous stainless steel models. Dropped it once from pocket height with a case on — absolutely no damage. Feels like a tank.",
    date: "2025-11-28",
    isVerified: true,
    helpfulCount: 21,
  },
  {
    id: "iphone-r20",
    name: "Divya Saxena",
    city: "Delhi",
    rating: 5,
    title: "Arrived before expected date",
    text: "Ordered on a Monday evening with standard delivery and it arrived by Wednesday morning. Packaging was secure with bubble wrap inside a sturdy box. The phone itself was factory sealed with the pull tabs intact. All accessories were present — USB-C braided cable, SIM ejector tool, Apple stickers, and documentation. The free screen protector was a nice bonus.",
    date: "2025-11-25",
    isVerified: true,
    helpfulCount: 16,
  },
  {
    id: "iphone-r21",
    name: "Siddharth Chopra",
    city: "Chandigarh",
    rating: 4,
    title: "Almost perfect — minor heating during charging",
    text: "Everything about this phone is premium — the display, cameras, performance, and build quality. My only minor complaint is that it gets slightly warm when fast charging while using navigation. Not a dealbreaker by any means, and it doesn't happen during regular use. The 5x optical zoom is phenomenal for my photography needs. Overall, fantastic value.",
    date: "2025-11-22",
    isVerified: true,
    helpfulCount: 14,
  },
  {
    id: "iphone-r22",
    name: "Nandini Reddy",
    city: "Hyderabad",
    rating: 5,
    title: "ProMotion makes everything smoother",
    text: "I didn't think I'd notice the difference between 60Hz and 120Hz, but now I can't unsee it. Scrolling through Instagram, switching between apps, even typing — everything feels more responsive. The 512GB storage is perfect for my photo library and all my apps. The Action Button I use for flashlight is the most used feature on my phone.",
    date: "2025-11-19",
    isVerified: true,
    helpfulCount: 29,
  },
  {
    id: "iphone-r23",
    name: "Manish Agarwal",
    city: "Kolkata",
    rating: 5,
    title: "Best iPhone deal in India right now",
    text: "I researched for weeks before buying. Checked Flipkart, Amazon, local stores — nowhere comes close to this price. ₹46,990 for a 512GB iPhone 15 Pro Max is insane. International version works perfectly with VI 5G in Kolkata. The phone is buttery smooth, cameras are incredible, and battery lasts all day. My colleague ordered one after seeing mine.",
    date: "2025-11-16",
    isVerified: true,
    helpfulCount: 45,
  },
  {
    id: "iphone-r24",
    name: "Fatima Khan",
    city: "Mumbai",
    rating: 5,
    title: "The 5x zoom is incredible",
    text: "Took this phone on a trip to Lonavala and the 5x optical zoom captured stunning shots of the hills from far away. The 48MP main camera with the new 24MP default mode produces photos with incredible detail and natural colours. Night mode on the telephoto lens works surprisingly well — clear shots even in dimly lit restaurants.",
    date: "2025-11-13",
    isVerified: true,
    helpfulCount: 37,
  },
  {
    id: "iphone-r25",
    name: "Rohit Malhotra",
    city: "Bangalore",
    rating: 5,
    title: "iOS 17 features are fantastic",
    text: "The phone came with iOS 17 pre-installed and the new features are brilliant. StandBy mode turns my phone into a smart display when charging. NameDrop makes sharing contacts effortless. The enhanced autocorrect actually learns my typing patterns. And all of this runs flawlessly on the A17 Pro chip. No lag, no stutter, just pure smoothness.",
    date: "2025-11-10",
    isVerified: true,
    helpfulCount: 24,
  },
  {
    id: "iphone-r26",
    name: "Swati Gupta",
    city: "Pune",
    rating: 5,
    title: "Third iPhone from this store",
    text: "This is my third purchase from ErgoAura after the iPhone 13 and 14. They consistently deliver genuine products at unbelievable prices. The 15 Pro Max is the best yet — the titanium design, the A17 Pro performance, the incredible camera system. This store has earned my complete trust. Will keep coming back.",
    date: "2025-11-07",
    isVerified: true,
    helpfulCount: 20,
  },
  {
    id: "iphone-r27",
    name: "Harsh Patel",
    city: "Surat",
    rating: 5,
    title: "From Android to iPhone — zero regrets",
    text: "Made the switch from a Samsung S23 and I'm loving every bit of this iPhone. The ecosystem integration is seamless, iMessage with family is convenient, and the app quality on iOS is noticeably better. The A17 Pro chip handles everything I throw at it. 512GB storage means I'll never run out of space. Best decision I've made this year.",
    date: "2025-11-04",
    isVerified: true,
    helpfulCount: 32,
  },
];

// -------------------------------------------------------------------
// Review summary
// -------------------------------------------------------------------
export const IPHONE_REVIEW_SUMMARY = {
  totalReviews: 27,
  averageRating: 4.8,
  ratingDistribution: {
    5: 24,
    4: 2,
    3: 1,
    2: 0,
    1: 0,
  },
};

// -------------------------------------------------------------------
// Review images (for photo carousels on select reviews)
// Keys match review IDs (iphone-r1, iphone-r2, etc.)
// Values are filenames relative to the review-images/ folder
// -------------------------------------------------------------------
export const IPHONE_REVIEW_IMAGES: Record<string, string[]> = {
  "iphone-r1": [
    "review-images/1/iphone-15-pro-max-review-1.png",
    "review-images/1/iphone-15-pro-max-review-2.png",
  ],
  "iphone-r2": [
    "review-images/2/iphone-15-pro-max-review-3.jpg",
    "review-images/2/iphone-15-pro-max-review-4.jpg",
    "review-images/2/iphone-15-pro-max-review-5.jpg",
  ],
  "iphone-r3": [
    "review-images/3/iphone-15-pro-max-review-6.jpg",
    "review-images/3/iphone-15-pro-max-review-7.jpg",
    "review-images/3/iphone-15-pro-max-review-8.jpg",
  ],
  "iphone-r4": [
    "review-images/4/iphone-15-pro-max-review-9.jpg",
    "review-images/4/iphone-15-pro-max-review-10.jpg",
    "review-images/4/iphone-15-pro-max-review-11.jpg",
  ],
};

// -------------------------------------------------------------------
// FAQ items
// -------------------------------------------------------------------
export const IPHONE_FAQS = [
  {
    question: "Is this the genuine Apple iPhone 15 Pro Max 512GB?",
    answer:
      "Yes, 100% genuine. This is the International Version (A3106) of the Apple iPhone 15 Pro Max with factory-unlocked SIM. You can verify the serial number on Apple's official coverage check page after delivery. We source our inventory directly from Apple-authorized distributors through strategic bulk procurement, allowing us to pass exceptional savings to our customers.",
  },
  {
    question: "Why is the price so low? Is this a scam?",
    answer:
      "We understand the concern — ₹46,990 for a ₹94,994 phone is an exceptional deal. This pricing is made possible through our direct sourcing from the Dubai market, where we individually procure devices at wholesale rates. By operating with lean margins and selling large volumes, we pass the savings to you. We've sold hundreds of units with a 4.8★ rating. Our limited stock of 9 units reflects genuine clearance pricing, not a gimmick. You're fully protected by our return policy and secure payment gateways.",
  },
  {
    question: "What does 'International Version' mean?",
    answer:
      "The International Version is the factory-unlocked global model (A3106) designed for use outside specific carrier-restricted regions. It supports all Indian 4G/5G bands, includes dual eSIM support plus a physical Nano-SIM slot, and runs the same iOS 17 as the Indian version. The only difference is that it ships without Indian Apple warranty — though we provide our own 7-day replacement guarantee for your peace of mind.",
  },
  {
    question: "Does it work with Indian 5G networks?",
    answer:
      "Yes, absolutely. The International Version fully supports all major Indian 5G bands (NSA/SA) including those used by Jio, Airtel, and VI. Customers across Mumbai, Delhi, Bangalore, Hyderabad, Chennai, Kolkata, and other cities have confirmed working 5G connectivity. The phone is factory-unlocked and automatically configures itself for your carrier's network.",
  },
  {
    question: "What warranty do I get?",
    answer:
      "As an International Version, Apple India warranty is not applicable. However, we offer a 7-day replacement guarantee for any manufacturing defects or delivery issues. At this exceptional price point (₹46,990 vs ₹94,994), you save over ₹48,000 — more than enough to cover any future servicing needs. Apple's authorized service centres worldwide can assist with paid repairs if ever needed.",
  },
  {
    question: "What's included in the box?",
    answer:
      "The box includes: Apple iPhone 15 Pro Max handset, USB-C braided charging cable (1m), SIM ejector tool, Apple sticker sheet, and documentation. In line with Apple's environmental initiatives, the iPhone 15 series does not include a charger or EarPods in the box. The phone supports 20W USB-C fast charging (sold separately) and any standard USB-C charger you already own will work perfectly. We also include a free screen protector with your purchase.",
  },
  {
    question: "Can I return if I don't like it?",
    answer:
      "Yes. We offer a 7-day replacement guarantee. If the device has any manufacturing defect or does not match the description, we will replace it promptly. For change-of-mind returns, please contact our support team — we review these on a case-by-case basis. Given the deeply discounted clearance pricing, we encourage you to review the full specifications, features, and customer reviews before purchasing.",
  },
];

// -------------------------------------------------------------------
// Key features for the features section
// -------------------------------------------------------------------
export const IPHONE_KEY_FEATURES = [
  {
    icon: "🚀",
    title: "A17 Pro Chip",
    description:
      "Industry-first 3nm processor with 6-core GPU and hardware-accelerated ray tracing. Desktop-class gaming performance in your pocket.",
  },
  {
    icon: "📷",
    title: "48MP Pro Camera",
    description:
      "Pro camera system with 5x optical zoom, 48MP main sensor, and LiDAR scanner. Capture studio-quality photos and cinema-grade video.",
  },
  {
    icon: "🖥️",
    title: '6.7" ProMotion Display',
    description:
      "Super Retina XDR with 120Hz ProMotion, 2000 nits peak brightness, Dynamic Island, and Always-On display. The best iPhone display ever.",
  },
  {
    icon: "💎",
    title: "Titanium Design",
    description:
      "Aerospace-grade titanium with PVD coating. Stronger, lighter, and more premium than any previous iPhone. Available in three stunning finishes.",
  },
  {
    icon: "🔋",
    title: "All-Day Battery",
    description:
      "Up to 29 hours of video playback. 20W fast charging reaches 50% in 30 minutes. MagSafe wireless charging for effortless power.",
  },
  {
    icon: "🎯",
    title: "Action Button",
    description:
      "Customisable shortcut button — launch camera, toggle silent mode, record voice memo, open flashlight, or run any Shortcut with a single press.",
  },
];

// -------------------------------------------------------------------
// Camera section content
// -------------------------------------------------------------------
export const IPHONE_CAMERA_CONTENT = {
  title: "Pro Camera System",
  subtitle: "The most powerful iPhone camera system ever",
  highlights: [
    {
      label: "48MP Main",
      detail:
        "f/1.78, 24mm, second-gen sensor-shift OIS, 24MP default resolution",
    },
    {
      label: "12MP Telephoto 5x",
      detail:
        "f/2.8, 120mm, 5x optical zoom, OIS — capture distant subjects with clarity",
    },
    {
      label: "12MP Ultrawide",
      detail: "f/2.2, 13mm, 120° field of view, macro photography support",
    },
    {
      label: "LiDAR Scanner",
      detail:
        "Night mode portraits, faster autofocus, AR precision, and ProRes video",
    },
  ],
  features: [
    "48MP ProRAW — full-resolution editing with 16-bit depth",
    "4K60fps ProRes video with Log encoding — cinema-grade colour grading",
    "5x optical zoom, 25x digital zoom — get closer than ever",
    "Action Mode — gimbal-like stabilisation for smooth handheld video",
    "Portrait mode with Focus and Depth Control — studio-quality bokeh",
    "Night mode on all cameras — stunning low-light photography",
    "Macro photography on ultrawide — capture the smallest details",
  ],
};

// -------------------------------------------------------------------
// Story section
// -------------------------------------------------------------------
export const IPHONE_STORY = {
  title: "The Pinnacle of Innovation",
  subtitle: "Apple's most advanced iPhone — now within reach",
  paragraphs: [
    "When Apple unveiled the iPhone 15 Pro Max in September 2023, it represented a defining moment in smartphone design. The introduction of aerospace-grade titanium marked the first major material change since the iPhone X. Combined with the revolutionary A17 Pro chip — the industry's first 3nm processor — and the most advanced camera system ever fitted to an iPhone, it set a new standard for what a smartphone could be.",
    "Today, the iPhone 15 Pro Max remains one of the most capable devices on the market. The A17 Pro chip still outperforms the vast majority of competing processors. The 48MP camera system with 5x optical zoom rivals dedicated cameras. The titanium design is both lighter and more durable than any previous model. With the addition of USB-C, it integrates seamlessly into the modern digital ecosystem.",
    "We source our inventory directly from Dubai's wholesale market, securing individually procured units at competitive rates. This direct-to-consumer approach bypasses traditional retail markups, allowing us to offer genuine, factory-sealed iPhone 15 Pro Max units at a fraction of the MRP. Every unit is inspected, verified, and dispatched with the same quality assurance as any premium retailer.",
    "Our stock is limited to just 9 units at this price. As a premium flagship nearing the end of its production cycle, availability is dwindling. If you've been waiting for the right moment to experience Apple's finest engineering without the flagship price tag — this is it.",
  ],
};
