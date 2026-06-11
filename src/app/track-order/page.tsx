"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Card from "@/components/ui/Card";

export default function TrackOrderInputPage() {
  const router = useRouter();
  const [trackId, setTrackId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackId.trim()) {
      setError("Please enter a Track ID");
      return;
    }
    if (trackId.trim().length < 6) {
      setError("Track ID must be at least 6 characters");
      return;
    }
    setError("");
    router.push(`/track-order/${trackId.trim().toUpperCase()}`);
  };

  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-lg mx-auto"
        >
          <Card padding="lg">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-full bg-apple-bg flex items-center justify-center mx-auto mb-4">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold tracking-tight mb-2">
                Track Your Order
              </h1>
              <p className="text-sm text-apple-text-secondary">
                Enter your 12-character Track ID to see your order status
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Track ID"
                placeholder="e.g., A7X9K2M4P1QW"
                value={trackId}
                onChange={(e) => {
                  setTrackId(e.target.value.toUpperCase());
                  setError("");
                }}
                error={error}
                className="text-center font-mono tracking-widest uppercase"
                required
              />
              <Button type="submit" fullWidth size="lg">
                Track Order
              </Button>
            </form>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
