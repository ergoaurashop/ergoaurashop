"use client";

import Link from "next/link";
import { CONTACT_EMAIL, COMPLAINT_EMAIL } from "@/lib/constants";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { trackOutboundClick } from "@/lib/analytics/engagement";

export default function Footer() {
  const [trackId, setTrackId] = useState("");
  const router = useRouter();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackId.trim()) {
      router.push(`/track-order/${trackId.trim()}`);
    }
  };

  return (
    <footer className="bg-apple-black text-apple-white mt-20">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <img
              src="/images/logo/ergoauralogo.webp"
              alt="ErgoAura Shop"
              className="h-8 w-auto brightness-0 invert mb-4"
            />
            <p className="text-sm text-white/60 leading-relaxed">
              Premium wellness products designed for your everyday comfort and
              well-being.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/products"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  href="/track-order"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Track Order
                </Link>
              </li>
              <li>
                <Link
                  href="/account"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Support
            </h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  onClick={() =>
                    trackOutboundClick(
                      `mailto:${CONTACT_EMAIL}`,
                      CONTACT_EMAIL,
                      "external",
                    )
                  }
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPLAINT_EMAIL}`}
                  onClick={() =>
                    trackOutboundClick(
                      `mailto:${COMPLAINT_EMAIL}`,
                      COMPLAINT_EMAIL,
                      "external",
                    )
                  }
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  {COMPLAINT_EMAIL}
                </a>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-white/60 hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Track Order */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">
              Track Your Order
            </h3>
            <form onSubmit={handleTrackSubmit} className="flex gap-2">
              <input
                type="text"
                value={trackId}
                onChange={(e) => setTrackId(e.target.value)}
                placeholder="Enter Track ID"
                className="flex-1 px-3 py-2.5 text-sm rounded-apple-input bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-apple-white text-apple-black text-sm font-medium rounded-apple-input hover:opacity-90 transition-opacity"
              >
                Track
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/40">
            &copy; {new Date().getFullYear()} ErgoAura Shop. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="/terms"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-xs text-white/40 hover:text-white/60 transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
