"use client";

import { useState, useCallback } from "react";
import type { DbOrder } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";

type SearchField =
  | "customer_name"
  | "customer_email"
  | "customer_phone"
  | "order_id"
  | "track_id";

const SEARCH_FIELDS: { value: SearchField; label: string }[] = [
  { value: "customer_name", label: "Name" },
  { value: "customer_email", label: "Email" },
  { value: "customer_phone", label: "Phone" },
  { value: "order_id", label: "Order ID" },
  { value: "track_id", label: "Track ID" },
];

export default function AdminDashboardPage() {
  const [authenticated, setAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [loading, setLoading] = useState(true);

  // Search state
  const [searchField, setSearchField] = useState<SearchField>("customer_name");
  const [searchValue, setSearchValue] = useState("");

  // ── Login: validate credentials server-side & fetch orders ────────
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          searchField,
          searchValue: searchValue.trim() || undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Invalid credentials");
        return;
      }

      setAuthenticated(true);
      setOrders(json.orders || []);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Search / refresh orders (used after login) ────────────────────
  const fetchOrders = useCallback(async () => {
    if (!authenticated) return;
    setLoading(true);

    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          password,
          searchField,
          searchValue: searchValue.trim() || undefined,
        }),
      });

      const json = await res.json();

      if (!res.ok) {
        console.error("[AdminPage] API error:", json.error);
        return;
      }

      setOrders(json.orders || []);
    } catch (err) {
      console.error("[AdminPage] Fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [authenticated, username, password, searchField, searchValue]);

  // ── Status badge variant helper ──────────────────────────────────
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

  const paymentVariant = (status: string) => {
    switch (status) {
      case "paid":
        return "success" as const;
      case "failed":
      case "refunded":
        return "error" as const;
      default:
        return "outline" as const;
    }
  };

  // ── Stats ────────────────────────────────────────────────────────
  const totalRevenue = orders.reduce(
    (sum, o) => sum + (o.payment_status === "paid" ? o.total : 0),
    0,
  );
  const pendingOrders = orders.filter(
    (o) => o.order_status === "placed",
  ).length;

  // ── Login view ───────────────────────────────────────────────────
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

  // ── Dashboard view ───────────────────────────────────────────────
  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <div className="section-container">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
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
            <p className="text-3xl font-bold mt-1">{pendingOrders}</p>
          </Card>
        </div>

        {/* Search */}
        <Card padding="lg" className="mb-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              value={searchField}
              onChange={(e) => setSearchField(e.target.value as SearchField)}
              className="px-3 py-2 border border-apple-border/50 rounded-apple text-sm bg-white focus:outline-none focus:ring-2 focus:ring-apple-accent/30 focus:border-apple-accent"
            >
              {SEARCH_FIELDS.map((f) => (
                <option key={f.value} value={f.value}>
                  {f.label}
                </option>
              ))}
            </select>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder={`Search by ${SEARCH_FIELDS.find((f) => f.value === searchField)?.label || "field"}...`}
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchOrders()}
                className="flex-1"
              />
              <Button variant="outline" size="sm" onClick={fetchOrders}>
                Search
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchValue("");
                  setTimeout(fetchOrders, 0);
                }}
                disabled={!searchValue.trim()}
              >
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* Orders Table */}
        <Card padding="none">
          <div className="p-6 border-b border-apple-border/50">
            <h2 className="text-lg font-semibold">
              {searchValue.trim() ? "Search Results" : "All Orders"}
              <span className="text-sm text-apple-text-secondary font-normal ml-2">
                ({orders.length})
              </span>
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-apple-border/50 text-apple-text-secondary text-xs uppercase tracking-wider">
                  <th className="text-left px-6 py-3 font-medium">Order ID</th>
                  <th className="text-left px-6 py-3 font-medium">Track ID</th>
                  <th className="text-left px-6 py-3 font-medium">Customer</th>
                  <th className="text-left px-6 py-3 font-medium">Phone</th>
                  <th className="text-left px-6 py-3 font-medium">Status</th>
                  <th className="text-left px-6 py-3 font-medium">Payment</th>
                  <th className="text-right px-6 py-3 font-medium">Total</th>
                  <th className="text-left px-6 py-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-12 text-center text-apple-text-secondary"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : orders.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-12 text-center text-apple-text-secondary"
                    >
                      {searchValue.trim()
                        ? "No orders match your search."
                        : "No orders yet."}
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
                      <td className="px-6 py-4 font-mono text-xs text-apple-accent">
                        {order.track_id}
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium">{order.customer_name}</p>
                        <p className="text-xs text-apple-text-secondary">
                          {order.customer_email}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-xs">
                        {order.customer_phone}
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={statusVariant(order.order_status)}>
                          {order.order_status.replace(/_/g, " ")}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant={paymentVariant(order.payment_status)}>
                          {order.payment_status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right font-medium">
                        {formatPrice(order.total)}
                      </td>
                      <td className="px-6 py-4 text-xs text-apple-text-secondary whitespace-nowrap">
                        {new Date(order.created_at).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )}
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
