// =====================================================================
// Product Types
// =====================================================================
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  original_price: number;
  discount_percentage: number;
  category: string;
  images: string[];
  stock: number;
  features: string[];
  specifications: Record<string, string>;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// =====================================================================
// Product Rich Content (from plans/product-content/*.md)
// =====================================================================

/** A benefit icon + label pair shown in the strip */
export interface BenefitItem {
  icon: string; // e.g. "ti ti-wind"
  label: string;
}

/** An FAQ entry */
export interface FAQItem {
  question: string;
  answer: string;
}

/** A customer review */
export interface ReviewItem {
  name: string;
  city: string;
  rating: number; // 1-5
  text: string;
}

/** A trust bar pillar */
export interface TrustItem {
  icon: string; // emoji or icon class
  text: string;
}

/** A "Who This Is Perfect For" entry */
export interface PerfectForItem {
  audience: string;
  reason: string;
}

/** Full rich content for a product page */
export interface ProductRichContent {
  /** 60-80 char SEO-optimised title */
  pageTitle: string;
  /** 100-120 char emotional tagline */
  tagline: string;
  /** 4 benefits with icons */
  benefits: BenefitItem[];
  /** 5 persuasive bullet benefits (15-20 words each) */
  bulletBenefits: string[];
  /** Pain points (before) */
  painPoints: string[];
  /** Solution points (after) */
  solutionPoints: string[];
  /** Empathy hook story (40-60 words) */
  problemHook: string;
  /** Product reveal / detailed description */
  solutionBody: string;
  /** What's in the box + specs table rows */
  whatsInTheBox: Record<string, string>;
  /** Target audience segments */
  perfectFor: PerfectForItem[];
  /** 3 FAQ entries */
  faqs: FAQItem[];
  /** 2-3 sample reviews */
  reviews: ReviewItem[];
  /** Trust bar items */
  trustItems: TrustItem[];
  /** Pricing summary note (optional) */
  pricingNote?: string;
  /** Stock warning text */
  stockWarning: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

// =====================================================================
// Order Types
// =====================================================================
export interface OrderProduct {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface OrderAddress {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  pincode: string;
}

export type OrderStatus =
  | "placed"
  | "confirmed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface Order {
  id: string;
  order_id: string;
  track_id: string;
  user_id?: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: OrderAddress;
  products: OrderProduct[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  notes?: string;
  payment_id?: string;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  placed_at: string;
  confirmed_at?: string;
  shipped_at?: string;
  out_for_delivery_at?: string;
  delivered_at?: string;
  cancelled_at?: string;
  created_at: string;
}

// =====================================================================
// Review Types
// =====================================================================
export interface Review {
  id: string;
  product_id: string;
  user_id: string;
  user_name: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  is_verified: boolean;
  helpful_count: number;
  is_approved: boolean;
  created_at: string;
}

/** Aggregated review stats per product (shown in grid + detail page) */
export interface ProductReviewSummary {
  totalReviews: number; // 110-250 range
  averageRating: number; // 4.3 - 5.0
  ratingDistribution: {
    // Count breakdown by star level
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}

/** Extended review for the detail page (Amazon-style) */
export interface ProductReviewDetail {
  id: string;
  name: string; // Full Indian name
  city: string; // "City, State" format
  rating: number; // 1-5
  title: string; // Short review headline
  text: string; // Full review body
  date: string; // ISO date string
  isVerified: boolean; // "Verified Purchase" badge
  helpfulCount: number; // "X people found this helpful"
}

// =====================================================================
// Profile Types
// =====================================================================
export interface Profile {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  created_at: string;
}

// =====================================================================
// Contact Message Types
// =====================================================================
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

// =====================================================================
// Order Status History
// =====================================================================
export interface OrderStatusHistory {
  id: string;
  order_id: string;
  status: OrderStatus;
  note?: string;
  created_at: string;
}

// =====================================================================
// Cart State
// =====================================================================
export interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  getSubtotal: () => number;
  getTotal: () => number;
  getItemCount: () => number;
}

// =====================================================================
// Database Row Types (snake_case, matching Supabase columns)
// =====================================================================
export type DbOrderStatus =
  | "placed"
  | "confirmed"
  | "shipped"
  | "out_for_delivery"
  | "delivered"
  | "cancelled";

export type DbPaymentStatus = "pending" | "paid" | "failed" | "refunded";

export interface DbOrder {
  id: string;
  order_id: string;
  track_id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  address: OrderAddress;
  products: OrderProduct[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  notes: string | null;
  payment_id: string | null;
  payment_status: DbPaymentStatus;
  order_status: DbOrderStatus;
  placed_at: string;
  confirmed_at: string | null;
  shipped_at: string | null;
  out_for_delivery_at: string | null;
  delivered_at: string | null;
  cancelled_at: string | null;
  created_at: string;
}

export interface DbProfile {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  created_at: string;
}
