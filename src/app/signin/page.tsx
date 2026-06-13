"use client";

import { Suspense, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { getSupabaseClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";
import { trackLogin } from "@/lib/analytics/events";

function SigninContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const supabase = getSupabaseClient();
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (authError) throw new Error(authError.message);

      // Track successful login
      trackLogin("email");

      // Redirect to the page they were trying to access, or /account
      const redirectTo = searchParams.get("redirect") || "/account";
      router.push(redirectTo);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid email or password",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <Card padding="lg">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-apple-text-secondary">
            Sign in to your ErgoAura account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="your@email.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-[38px] text-xs text-apple-text-secondary hover:text-apple-text-primary"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {error && (
            <p className="text-sm text-apple-error bg-red-50/50 p-3 rounded-lg">
              {error}
            </p>
          )}

          <Button type="submit" fullWidth size="lg" loading={loading}>
            Sign In
          </Button>
        </form>

        <p className="text-sm text-apple-text-secondary text-center mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-apple-accent hover:underline font-medium"
          >
            Sign up
          </Link>
        </p>
      </Card>
    </motion.div>
  );
}

export default function SigninPage() {
  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <div className="section-container">
        <Suspense
          fallback={
            <div className="max-w-md mx-auto text-center py-12">
              <p className="text-apple-text-secondary">Loading...</p>
            </div>
          }
        >
          <SigninContent />
        </Suspense>
      </div>
    </div>
  );
}
