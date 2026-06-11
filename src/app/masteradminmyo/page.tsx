"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import type { Order } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

const ADMIN_USER = "MyonMee";
const ADMIN_PASS = "MyonMee@2029";

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setAuthenticated(true);
      setError("");
    } else {
      setError("Invalid credentials");
    }
  };

  useEffect(() => {
    if (!authenticated) return;

    async function fetchOrders() {
      try {
        const { data } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });
        setOrders(data || []);
      } catch {
        // Table may not exist
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [authenticated]);

  if (!authenticated) {
    return (
      <div className="pt-28 sm:pt-32 pb-16">
        <div className="section-container">
          <div className="max-w-sm mx-auto">
            <Card padding="lg">
              <h1 className="text-xl font-bold tracking-tight mb-6 text-center">
                Admin Login
              </h1>
              <form onSubmit={handleLogin} className="space-y-4">
                <Input
                  label="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
                <Input
                  label="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p className="text-sm text-apple-error">{error}</p>}
                <Button type="submit" fullWidth>
                  Sign In
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.payment_status === "paid" ? o.total : 0),
    0,
  );

  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <div className="section-container">
        <div className="flex items-center justify-between mb-8">
          <h1 className="heading-lg">Admin Dashboard</h1>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setAuthenticated(false)}
          >
            Logout
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <Card padding="lg">
            <p className="text-sm text-apple-text-secondary">Total Orders</p>
            <p className="text-3xl font-bold mt-1">{orders.length}</p>
          </Card>
          <Card padding="lg">
            <p className="text-sm text-apple-text-secondary">Total Revenue</p>
            <p className="text-3xl font-bold mt-1">
              {formatPrice(totalRevenue)}
            </p>
          </Card>
          <Card padding="lg">
            <p className="text-sm text-apple-text-secondary">Pending Orders</p>
            <p className="text-3xl font-bold mt-1">
              {orders.filter((o) => o.order_status === "placed").length}
            </p>
          </Card>
        </div>

        {/* Orders Table */}
        <Card padding="none">
          <div className="p-6 border-b border-apple-border/50">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-apple-border/50 text-apple-text-secondary text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-3 font-medium">Order ID</th>
                  <th className="text-left px-6 py-3 font-medium">Customer</th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                  <th className="text-left px-6 py-3 font-medium">Payment</th>
                  <th className="text-right px-6 py-3 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-apple-text-secondary"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-12 text-center text-apple-text-secondary"
                    >
                      No orders yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-apple-border/30 hover:bg-apple-bg/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono text-xs">
                        {order.order_id}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-xs text-apple-text-secondary">
                          {order.customer_email}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            order.order_status === "delivered"
                              ? "success"
                              : "outline"
                          }
                        >
                          {order.order_status.replace(/_/g, " ")}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge
                          variant={
                            order.payment_status === "paid"
                              ? "success"
                              : order.payment_status === "failed"
                                ? "error"
                                : "outline"
                          }
                        >
                          {order.payment_status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        {formatPrice(order.total)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
