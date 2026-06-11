"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCartStore } from "@/store/cartStore";
import { formatPrice, getProductImageUrl } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Link from "next/link";

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
  const { items, clearCart } = useCartStore();
  const [form, setForm] = useState<CheckoutForm>(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);

  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  useEffect(() => {
    if (items.length === 0) {
      // Don't redirect immediately — user might have just cleared
    }
  }, [items]);

  const updateField = (field: keyof CheckoutForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // TODO: Implement Razorpay integration and order creation
    // For now, simulate a successful order
    setTimeout(() => {
      const trackId =
        "SIM" + Math.random().toString(36).substring(2, 11).toUpperCase();
      const orderId = "ORD-" + Date.now().toString(36).toUpperCase();
      clearCart();
      router.push(`/order/success?track_id=${trackId}&order_id=${orderId}`);
      setSubmitting(false);
    }, 1500);
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
                  <div className="flex justify-between text-sm">
                    <span className="text-apple-text-secondary">Subtotal</span>
                    <span className="text-apple-text-primary">
                      {formatPrice(subtotal)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-apple-text-secondary">Shipping</span>
                    <span className="text-apple-text-primary">
                      {subtotal >= 299 ? "Free" : "₹49"}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-semibold pt-2 border-t border-apple-border/50">
                    <span className="text-apple-text-primary">Total</span>
                    <span className="text-apple-text-primary">
                      {formatPrice(subtotal >= 299 ? subtotal : subtotal + 49)}
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
