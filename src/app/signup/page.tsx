"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getSupabaseClient } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "+91",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const supabase = getSupabaseClient();

      // 1. Sign up with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            name: form.name,
            phone: form.phone,
          },
        },
      });

      if (authError) throw new Error(authError.message);
      if (!authData.user) throw new Error("Signup failed. Please try again.");

      // 2. Create profile entry in the profiles table
      const { error: profileError } = await supabase.from("profiles").insert({
        id: authData.user.id,
        name: form.name,
        email: form.email,
        phone: form.phone,
      });

      if (profileError) {
        console.error("Profile creation error:", profileError);
        // Non-fatal – the trigger may have created it already
      }

      setSuccess(
        "Account created! Please check your email to confirm your account.",
      );

      // Redirect to account after a brief delay
      setTimeout(() => {
        router.push("/account");
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto"
        >
          <Card padding="lg">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold tracking-tight mb-2">
                Create Account
              </h1>
              <p className="text-sm text-apple-text-secondary">
                Sign up to track orders and manage your profile
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Name"
                placeholder="Your full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                  setForm({
                    ...form,
                    phone: val.startsWith("+91")
                      ? val
                      : "+91" + val.replace(/[^0-9]/g, ""),
                  });
                }}
                required
              />
              <div className="relative">
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password (min. 6 characters)"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  minLength={6}
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
              {success && (
                <p className="text-sm text-green-600 bg-green-50/50 p-3 rounded-lg">
                  {success}
                </p>
              )}

              <Button type="submit" fullWidth size="lg" loading={loading}>
                Create Account
              </Button>
            </form>

            <p className="text-sm text-apple-text-secondary text-center mt-6">
              Already have an account?{" "}
              <Link
                href="/signin"
                className="text-apple-accent hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
