"use client";

import Link from "next/link";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";

export default function AccountPage() {
  // TODO: Add auth check — redirect to signin if not authenticated

  return (
    <div className="pt-28 sm:pt-32 pb-16">
      <div className="section-container">
        <h1 className="heading-lg mb-8">My Account</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-apple-text-primary">
                  Profile Settings
                </h3>
                <p className="text-sm text-apple-text-secondary mt-1">
                  Manage your personal information
                </p>
              </div>
            </div>
          </Card>

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
                  Products you&apos;ve reviewed
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
