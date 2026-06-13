"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, getProductImageUrl } from "@/lib/utils";
import { getSupabaseClient } from "@/lib/supabase/client";
import { RAZORPAY_KEY_ID } from "@/lib/constants";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { trackBeginCheckout, trackPurchase } from "@/lib/analytics/events";

// ── Razorpay global type ────────────────────────────────────────
declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  modal: {
    ondismiss: () => void;
  };
}

interface RazorpayInstance {
  open: () => void;
}

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface CheckoutForm {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

const INITIAL_FORM: CheckoutForm = {
  name: "",
  email: "",
  phone: "+91",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  pincode: "",
};

export default function CheckoutPage() {
  const router = useRouter();
  const { items, clearCart, getSubtotal, getBuy2Get1Discount } = useCartStore();
  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const hasTrackedCheckout = useRef(false);

  const subtotal = getSubtotal();
  const b2g1Discount = getBuy2Get1Discount();
  const discountedSubtotal = Math.max(0, subtotal - b2g1Discount);
  const shipping = discountedSubtotal >= 299 ? 0 : 49;
  const total = discountedSubtotal + shipping;

  // Track begin_checkout
  useEffect(() => {
    if (items.length > 0 && !hasTrackedCheckout.current) {
      hasTrackedCheckout.current = true;
      trackBeginCheckout(
        items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
        })),
      );
    }
  }, [items]);

  // Load Razorpay script
  useEffect(() => {
    if (
      !document.querySelector(
        'script[src="https://checkout.razorpay.com/v1/checkout.js"]',
      )
    ) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const updateField = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      // 1. Create a Razorpay order via our API route
      const orderRes = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total, currency: "INR" }),
      });

      if (!orderRes.ok) {
        const errBody = await orderRes.json();
        throw new Error(errBody.error || "Failed to create payment order");
      }

      const { id: razorpayOrderId } = await orderRes.json();

      // 2. Get current user (if logged in)
      const supabase = getSupabaseClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      // 3. Open Razorpay checkout modal
      const options: RazorpayOptions = {
        key: RAZORPAY_KEY_ID,
        amount: Math.round(total * 100),
        currency: "INR",
        name: "ErgoAura Shop",
        description: `Order for ${form.name}`,
        order_id: razorpayOrderId,
        handler: async (response: RazorpayResponse) => {
          try {
            // 4. Payment successful – create order in Supabase
            const orderRes = await fetch("/api/orders/create", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: user?.id || null,
                customer_name: form.name,
                customer_email: form.email,
                customer_phone: form.phone,
                address: {
                  line1: form.addressLine1,
                  line2: form.addressLine2 || undefined,
                  city: form.city,
                  state: form.state,
                  pincode: form.pincode,
                },
                products: items.map((item) => ({
                  product_id: item.product.id,
                  name: item.product.name,
                  price: item.product.price,
                  quantity: item.quantity,
                  image: getProductImageUrl(
                    item.product.slug,
                    item.product.images?.[0],
                  ),
                })),
                subtotal,
                discount: b2g1Discount,
                shipping,
                total,
                payment_id: response.razorpay_payment_id,
                payment_status: "paid",
              }),
            });

            if (!orderRes.ok) {
              const errBody = await orderRes.json();
              throw new Error(errBody.error || "Failed to save order");
            }

            const { order } = await orderRes.json();

            // 5. Track purchase event (GA4 enhanced e-commerce)
            trackPurchase({
              transactionId: response.razorpay_payment_id,
              value: total,
              shipping,
              items: items.map((item) => ({
                product: item.product,
                quantity: item.quantity,
              })),
              userId: user?.id || undefined,
            });

            // 6. Clear cart and redirect to success
            clearCart();
            router.push(
              `/order/success?track_id=${order.track_id}&order_id=${order.order_id}`,
            );
          } catch (err) {
            console.error("Order creation error:", err);
            setError(
              err instanceof Error ? err.message : "Failed to save order",
            );
            setSubmitting(false);
          }
        },
        prefill: {
          name: form.name,
          email: form.email,
          contact: form.phone,
        },
        theme: {
          color: "#C9A962",
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
          },
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Checkout error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="pt-28 sm:pt-32 section-container text-center py-20">
        <div className="max-w-md mx-auto">
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#86868B"
            strokeWidth="1.5"
            className="mx-auto mb-6"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
          </svg>
          <h1 className="text-2xl font-semibold mb-3">Your cart is empty</h1>
          <p className="text-apple-text-secondary mb-6">
            Add some products to your cart before checking out.
          </p>
          <Link href="/products">
            <Button>Browse Products</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <div className="section-container">
        <h1 className="heading-lg mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* ============================ */}
            {/* Shipping Form */}
            {/* ============================ */}
            <div className="lg:col-span-3 space-y-6">
              <Card padding="lg">
                <h2 className="text-lg font-semibold mb-6">
                  Shipping Information
                </h2>

                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    required
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => updateField("email", e.target.value)}
                      required
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      placeholder="9876543210"
                      prefix="+91"
                      value={form.phone}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val.startsWith("+91")) {
                          updateField("phone", val);
                        } else {
                          updateField(
                            "phone",
                            "+91" + val.replace(/[^0-9]/g, ""),
                          );
                        }
                      }}
                      required
                    />
                  </div>

                  <Input
                    label="Address Line 1"
                    placeholder="House/Flat No., Street, Area"
                    value={form.addressLine1}
                    onChange={(e) =>
                      updateField("addressLine1", e.target.value)
                    }
                    required
                  />

                  <Input
                    label="Address Line 2 (Optional)"
                    placeholder="Landmark, Building Name"
                    value={form.addressLine2}
                    onChange={(e) =>
                      updateField("addressLine2", e.target.value)
                    }
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Input
                      label="City"
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => updateField("city", e.target.value)}
                      required
                    />
                    <Input
                      label="State"
                      placeholder="State"
                      value={form.state}
                      onChange={(e) => updateField("state", e.target.value)}
                      required
                    />
                    <Input
                      label="Pincode"
                      placeholder="6-digit"
                      value={form.pincode}
                      onChange={(e) =>
                        updateField(
                          "pincode",
                          e.target.value.replace(/\D/g, "").slice(0, 6),
                        )
                      }
                      required
                    />
                  </div>
                </div>
              </Card>

              {/* Error message */}
              {error && (
                <div className="bg-red-50/80 border border-red-200 rounded-apple p-4">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}

              {/* Terms agreement */}
              <p className="text-xs text-apple-text-secondary">
                By placing this order, you agree to our{" "}
                <Link
                  href="/terms"
                  className="text-apple-accent hover:underline"
                >
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/terms"
                  className="text-apple-accent hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            {/* ============================ */}
            {/* Order Summary */}
            {/* ============================ */}
            <div className="lg:col-span-2">
              <Card padding="lg">
                <h2 className="text-lg font-semibold mb-6">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-3">
                      <div className="w-16 h-16 rounded-apple-sm bg-apple-bg overflow-hidden shrink-0">
                        <img
                          src={getProductImageUrl(
                            item.product.slug,
                            item.product.images?.[0],
                          )}
                          alt={item.product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-apple-text-primary truncate">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-apple-text-secondary">
                          Qty: {item.quantity}
                        </p>
                        <p className="text-sm font-medium text-apple-text-primary mt-1">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-apple-border/50 pt-4 space-y-2">
                  {/* Subtotal (full amount) */}
                  <div className="flex justify-between text-sm">
                    <span className="text-apple-text-secondary">Subtotal</span>
                    <span className="text-apple-text-primary">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  {/* B2G1 Discount */}
                  {b2g1Discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="flex items-center gap-1.5 text-apple-text-secondary">
                        <span className="text-[10px] font-bold text-white bg-gradient-to-r from-amber-500 to-orange-500 px-1.5 py-0.5 rounded-full">
                          B2G1
                        </span>
                        Discount
                      </span>
                      <span className="text-green-600 font-medium">
                        -{formatPrice(b2g1Discount)}
                      </span>
                    </div>
                  )}

                  {/* Discounted Subtotal */}
                  {b2g1Discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-apple-text-secondary">
                        Discounted Subtotal
                      </span>
                      <span className="text-apple-text-primary">
                        {formatPrice(discountedSubtotal)}
                      </span>
                    </div>
                  )}

                  {/* Shipping */}
                  <div className="flex justify-between text-sm">
                    <span className="text-apple-text-secondary">Shipping</span>
                    <span className="text-apple-text-primary">
                      {shipping === 0 ? (
                        <span className="text-green-600 font-medium">Free</span>
                      ) : (
                        "₹49"
                      )}
                    </span>
                  </div>

                  {/* You Save */}
                  {b2g1Discount > 0 && (
                    <div className="flex justify-between text-sm bg-green-50 rounded-apple-sm px-3 py-2 -mx-3">
                      <span className="font-semibold text-green-700">
                        You Save
                      </span>
                      <span className="font-bold text-green-700">
                        {formatPrice(b2g1Discount)}
                      </span>
                    </div>
                  )}

                  {/* Total */}
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-apple-border/50">
                    <span className="text-apple-text-primary">Total</span>
                    <span className="text-apple-text-primary">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <Button
                  variant="animated"
                  type="submit"
                  fullWidth
                  size="lg"
                  loading={submitting}
                  className="mt-6"
                >
                  {submitting ? "Processing..." : "Place Order"}
                </Button>

                <p className="text-xs text-apple-text-secondary text-center mt-3">
                  Secure payment via Razorpay
                </p>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
