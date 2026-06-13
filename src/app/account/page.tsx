"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getSupabaseClient } from "@/lib/supabase/client";
import type { DbOrder, DbProfile } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { SITE_URL } from "@/lib/constants";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import BreadcrumbSchemaClient from "@/components/seo/BreadcrumbSchemaClient";

export default function AccountPage() {
  const router = useRouter();
  const supabase = getSupabaseClient();

  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<DbProfile | null>(null);
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      setLoading(true);

      // 1. Check authentication
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser();

      if (!authUser) {
        router.replace("/signin?redirect=/account");
        return;
      }

      setUser(authUser);

      // 2. Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", authUser.id)
        .single();
      setProfile(profileData);

      // 3. Fetch recent orders
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", authUser.id)
        .order("created_at", { ascending: false })
        .limit(10);
      setOrders(ordersData || []);

      setLoading(false);
    }

    init();
  }, [router, supabase]);

  // ── Status badge variant ─────────────────────────────────────────
  const statusVariant = (status: string) => {
    switch (status) {
      case "delivered":
        return "success" as const;
      case "cancelled":
        return "error" as const;
      case "confirmed":
      case "shipped":
      case "out_for_delivery":
        return "info" as const;
      default:
        return "outline" as const;
    }
  };

  const breadcrumbItems = [
    { name: "Home", url: SITE_URL },
    { name: "My Account", url: `${SITE_URL}/account` },
  ];

  if (loading) {
    return (
      <>
        <BreadcrumbSchemaClient items={breadcrumbItems} />
        <div className="pt-28 sm:pt-32 pb-16">
          <div className="section-container">
            <div className="flex items-center justify-center py-20">
              <p className="text-apple-text-secondary">Loading...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // If user is null, they were redirected (shouldn't render this)
  if (!user) {
    return null;
  }

  return (
    <>
      <BreadcrumbSchemaClient items={breadcrumbItems} />
      <div className="pt-28 sm:pt-32 pb-16">
        <div className="section-container">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-[#86868B] mb-6">
            <Link href="/" className="hover:text-apple-black transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-apple-black font-medium">My Account</span>
          </nav>
          <h1 className="heading-lg mb-8">My Account</h1>

          {/* ── Profile Card ───────────────────────────────────────── */}
          <Card padding="lg" className="mb-8">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-full bg-apple-accent/10 flex items-center justify-center shrink-0">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="text-apple-accent"
                >
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-semibold text-apple-text-primary">
                  {profile?.name || user.user_metadata?.name || "User"}
                </h2>
                <p className="text-sm text-apple-text-secondary">
                  {user.email}
                </p>
                {profile?.phone && (
                  <p className="text-sm text-apple-text-secondary">
                    {profile.phone}
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  supabase.auth.signOut().then(() => router.push("/"))
                }
              >
                Sign Out
              </Button>
            </div>
          </Card>

          {/* ── Quick Actions ──────────────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <Link href="/track-order">
              <Card hover padding="lg" className="h-full">
                <div className="flex flex-col items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-apple-bg flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-apple-text-primary">
                      Track Orders
                    </h3>
                    <p className="text-sm text-apple-text-secondary mt-1">
                      View and track your order status
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Link href="/products">
              <Card hover padding="lg" className="h-full">
                <div className="flex flex-col items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-apple-bg flex items-center justify-center">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-apple-text-primary">
                      Shop Products
                    </h3>
                    <p className="text-sm text-apple-text-secondary mt-1">
                      Browse our latest products
                    </p>
                  </div>
                </div>
              </Card>
            </Link>

            <Card hover padding="lg" className="h-full">
              <div className="flex flex-col items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-apple-bg flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-apple-text-primary">
                    My Reviews
                  </h3>
                  <p className="text-sm text-apple-text-secondary mt-1">
                    Products you've reviewed
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* ── Recent Orders ──────────────────────────────────────── */}
          <h2 className="text-lg font-semibold mb-4">Recent Orders</h2>

          {orders.length === 0 ? (
            <Card padding="lg">
              <div className="text-center py-8">
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="mx-auto mb-4 text-apple-text-secondary/50"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                </svg>
                <p className="text-apple-text-secondary mb-4">
                  You haven't placed any orders yet.
                </p>
                <Link href="/products">
                  <Button>Start Shopping</Button>
                </Link>
              </div>
            </Card>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <Link
                  key={order.id}
                  href={`/track-order/${order.track_id}`}
                  className="block"
                >
                  <Card hover padding="lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-xs text-apple-accent font-medium">
                            #{order.order_id}
                          </span>
                          <span className="text-xs text-apple-text-secondary">
                            {new Date(order.created_at).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              },
                            )}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-apple-text-primary truncate">
                          {order.products
                            .map((p) => p.name)
                            .join(", ")
                            .slice(0, 60)}
                          ...
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <Badge variant={statusVariant(order.order_status)}>
                          {order.order_status.replace(/_/g, " ")}
                        </Badge>
                        <span className="text-sm font-semibold whitespace-nowrap">
                          {formatPrice(order.total)}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
