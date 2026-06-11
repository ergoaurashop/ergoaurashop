"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const trackId = searchParams.get("track_id");
  const orderId = searchParams.get("order_id");

  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg mx-auto text-center"
        >
          {/* Success animation */}
          <div className="w-20 h-20 rounded-full bg-apple-success/10 flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-apple-success"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-apple-text-secondary mb-8">
            Thank you for your purchase. You will receive an email confirmation
            shortly.
          </p>

          {/* Track ID */}
          {trackId && (
            <div className="card-apple p-6 mb-6">
              <p className="text-xs text-apple-text-secondary uppercase tracking-wider mb-1">
                Track ID
              </p>
              <p className="text-2xl font-mono font-bold tracking-wider text-apple-text-primary">
                {trackId}
              </p>
              <p className="text-xs text-apple-text-secondary mt-2">
                Use this ID to track your order status
              </p>
            </div>
          )}

          {/* Order ID */}
          {orderId && (
            <div className="card-apple p-6 mb-6">
              <p className="text-xs text-apple-text-secondary uppercase tracking-wider mb-1">
                Order ID
              </p>
              <p className="text-lg font-mono font-semibold text-apple-text-primary">
                {orderId}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
            {trackId && (
              <Link href={`/track-order/${trackId}`}>
                <Button>Track Order</Button>
              </Link>
            )}
            <Link href="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="pt-28 sm:pt-32 pb-16">
          <div className="section-container">
            <div className="max-w-lg mx-auto text-center">
              <p className="text-apple-text-secondary">Loading...</p>
            </div>
          </div>
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
