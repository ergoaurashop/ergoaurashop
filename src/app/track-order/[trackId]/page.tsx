"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { DbOrder, DbOrderStatus } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import BreadcrumbSchemaClient from "@/components/seo/BreadcrumbSchemaClient";

const STATUS_NODES: { key: DbOrderStatus; label: string; icon: string }[] = [
  { key: "placed", label: "Order Placed", icon: "✓" },
  { key: "confirmed", label: "Confirmed", icon: "✓" },
  { key: "shipped", label: "Shipped", icon: "✓" },
  { key: "out_for_delivery", label: "Out for Delivery", icon: "✓" },
  { key: "delivered", label: "Delivered", icon: "✓" },
];

/** Human-readable timestamp label for a given status */
function getStatusTime(order: DbOrder, status: DbOrderStatus): string | null {
  const map: Record<DbOrderStatus, string | undefined> = {
    placed: order.placed_at,
    confirmed: order.confirmed_at ?? undefined,
    shipped: order.shipped_at ?? undefined,
    out_for_delivery: order.out_for_delivery_at ?? undefined,
    delivered: order.delivered_at ?? undefined,
    cancelled: order.cancelled_at ?? undefined,
  };
  const iso = map[status];
  if (!iso) return null;
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function TrackOrderResultPage() {
  const params = useParams();
  const trackId = params.trackId as string;

  const [order, setOrder] = useState<DbOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchOrder() {
      try {
        const supabase = getSupabaseClient();
        const { data, error: fetchError } = await supabase
          .from("orders")
          .select("*")
          .eq("track_id", trackId)
          .single();

        if (fetchError) throw fetchError;
        setOrder(data as DbOrder);
      } catch {
        setError("Order not found. Please check your Track ID.");
      } finally {
        setLoading(false);
      }
    }

    if (trackId) fetchOrder();
  }, [trackId]);

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "Track Order", url: `${SITE_URL}/track-order` },
    ...(trackId
      ? [{ name: trackId, url: `${SITE_URL}/track-order/${trackId}` }]
      : []),
  ];

  if (loading) {
    return (
      <>
        <BreadcrumbSchemaClient items={breadcrumbItems} />
        <div className="pt-28 sm:pt-32 pb-16">
          <div className="section-container">
            <div className="max-w-2xl mx-auto animate-pulse space-y-4">
              <div className="h-8 bg-apple-bg rounded w-1/3" />
              <div className="h-64 bg-apple-bg rounded-apple" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <BreadcrumbSchemaClient items={breadcrumbItems} />
        <div className="pt-28 sm:pt-32 pb-16">
          <div className="section-container">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#86868B] mb-6">
              <Link
                href="/"
                className="hover:text-apple-black transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/track-order"
                className="hover:text-apple-black transition-colors"
              >
                Track Order
              </Link>
              <span>/</span>
              <span className="text-apple-black font-medium">Not Found</span>
            </nav>
            <div className="text-center py-20">
              <div className="max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-apple-error/10 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-apple-error"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M15 9l-6 6M9 9l6 6" />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold mb-2">Order Not Found</h2>
                <p className="text-apple-text-secondary">
                  {error || "Invalid Track ID."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Use the actual order_status from the database
  const currentStatus: DbOrderStatus = order.order_status;

  // For cancelled orders, show a different status flow
  const isCancelled = currentStatus === "cancelled";
  const activeNodes = isCancelled ? STATUS_NODES : STATUS_NODES;
  const currentIndex = activeNodes.findIndex((n) => n.key === currentStatus);

  return (
    <>
      <BreadcrumbSchemaClient items={breadcrumbItems} />
      <div className="pt-28 sm:pt-32 pb-16">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#86868B] mb-6">
              <Link
                href="/"
                className="hover:text-apple-black transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <Link
                href="/track-order"
                className="hover:text-apple-black transition-colors"
              >
                Track Order
              </Link>
              <span>/</span>
              <span className="text-apple-black font-medium font-mono">
                {trackId}
              </span>
            </nav>

            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="heading-lg mb-2">Track Order</h1>
              <p className="text-apple-text-secondary mb-8">
                Track ID:{" "}
                <span className="font-mono font-medium text-apple-text-primary">
                  {trackId}
                </span>
              </p>
            </motion.div>

            {/* Cancelled Banner */}
            {isCancelled && (
              <Card
                padding="lg"
                className="mb-8 border-apple-error/30 bg-red-50/50"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-apple-error/10 flex items-center justify-center">
                    <svg
                      className="w-5 h-5 text-apple-error"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M15 9l-6 6M9 9l6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-semibold text-apple-error">
                      Order Cancelled
                    </p>
                    {order.cancelled_at && (
                      <p className="text-sm text-apple-text-secondary">
                        Cancelled on {getStatusTime(order, "cancelled")}
                      </p>
                    )}
                  </div>
                </div>
              </Card>
            )}

            {/* Timeline */}
            {!isCancelled && (
              <Card padding="lg" className="mb-8">
                <h2 className="text-base font-semibold mb-8">Order Status</h2>
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-apple-border/50" />

                  {/* Nodes */}
                  <div className="space-y-8">
                    {STATUS_NODES.map((node, index) => {
                      const isCompleted = index <= currentIndex;
                      const isCurrent = index === currentIndex;
                      const statusTime = getStatusTime(order, node.key);

                      return (
                        <div
                          key={node.key}
                          className="relative flex items-start gap-5"
                        >
                          {/* Node circle */}
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: index * 0.15 }}
                            className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                              isCompleted
                                ? "bg-apple-black text-apple-white"
                                : "bg-apple-bg border-2 border-apple-border text-apple-text-secondary"
                            } ${isCurrent ? "ring-4 ring-apple-black/20" : ""}`}
                          >
                            {isCompleted ? node.icon : index + 1}
                          </motion.div>

                          {/* Content */}
                          <div className="pt-1.5">
                            <p
                              className={`text-sm font-medium ${
                                isCompleted
                                  ? "text-apple-text-primary"
                                  : "text-apple-text-secondary"
                              }`}
                            >
                              {node.label}
                            </p>
                            {statusTime && (
                              <p className="text-xs text-apple-text-secondary mt-1">
                                {statusTime}
                              </p>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </Card>
            )}

            {/* Order Details */}
            <Card padding="lg">
              <h2 className="text-base font-semibold mb-4">Order Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-apple-text-secondary">Order ID</span>
                  <span className="font-mono text-apple-text-primary">
                    {order.order_id}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-apple-text-secondary">Customer</span>
                  <span className="text-apple-text-primary">
                    {order.customer_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-apple-text-secondary">Status</span>
                  <Badge
                    variant={
                      isCancelled
                        ? "error"
                        : order.order_status === "delivered"
                          ? "success"
                          : "outline"
                    }
                  >
                    {isCancelled
                      ? "Cancelled"
                      : order.order_status === "placed"
                        ? "Processing"
                        : order.order_status === "confirmed"
                          ? "Confirmed"
                          : order.order_status === "shipped"
                            ? "Shipped"
                            : order.order_status === "out_for_delivery"
                              ? "Out for Delivery"
                              : order.order_status === "delivered"
                                ? "Delivered"
                                : order.order_status}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-apple-text-secondary">Payment</span>
                  <Badge
                    variant={
                      order.payment_status === "paid" ? "success" : "outline"
                    }
                  >
                    {order.payment_status === "paid"
                      ? "Paid"
                      : order.payment_status === "refunded"
                        ? "Refunded"
                        : "Pending"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-apple-text-secondary">Total</span>
                  <span className="font-semibold text-apple-text-primary">
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Products */}
              <div className="mt-6 pt-6 border-t border-apple-border/50">
                <h3 className="text-sm font-semibold mb-3">Products</h3>
                <div className="space-y-3">
                  {order.products.map((p, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-apple-sm bg-apple-bg overflow-hidden shrink-0">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-apple-text-primary truncate">
                          {p.name}
                        </p>
                        <p className="text-xs text-apple-text-secondary">
                          Qty: {p.quantity} × {formatPrice(p.price)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div className="mt-6 pt-6 border-t border-apple-border/50">
                <h3 className="text-sm font-semibold mb-2">Delivery Address</h3>
                <p className="text-sm text-apple-text-secondary">
                  {order.address.line1}
                  {order.address.line2 && `, ${order.address.line2}`}
                  <br />
                  {order.address.city}, {order.address.state}{" "}
                  {order.address.pincode}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
