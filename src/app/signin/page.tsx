"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function SigninPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // TODO: Implement Supabase auth signin
    setTimeout(() => {
      router.push("/account");
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16">
      <div className="section-container">
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
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
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

              {error && <p className="text-sm text-apple-error">{error}</p>}

              <Button type="submit" fullWidth size="lg" loading={loading}>
                Sign In
              </Button>
            </form>

            <p className="text-sm text-apple-text-secondary text-center mt-6">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-apple-accent hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
