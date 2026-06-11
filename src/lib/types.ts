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
  created_at: string;
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
  | "shipped"
  | "out_for_delivery"
  | "delivered";

export type PaymentStatus = "pending" | "paid" | "failed";

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
  total: number;
  payment_id?: string;
  payment_status: PaymentStatus;
  order_status: OrderStatus;
  placed_at: string;
  shipped_at?: string;
  out_for_delivery_at?: string;
  delivered_at?: string;
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
  comment: string;
  images: string[];
  created_at: string;
}

// =====================================================================
// Profile Types
// =====================================================================
export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
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
