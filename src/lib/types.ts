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
