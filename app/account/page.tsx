"use client";

import { useEffect } from "react";
import { useCustomer } from "@/components/providers/CustomerProvider";

/**
 * app/account/page.tsx
 *
 * Redirects authenticated users to the Shopify Customer Account portal.
 * Redirects unauthenticated users to the login flow.
 *
 * The Customer Account URL is constructed from SHOPIFY_SHOP_ID env var
 * which is published as NEXT_PUBLIC_* so it's available client-side.
 */
export default function AccountPage() {
  const { isAuthenticated, isLoading, login } = useCustomer();

  useEffect(() => {
    if (isLoading) return; // Wait until auth state is known

    if (!isAuthenticated) {
      // Not logged in — redirect to our OAuth login flow
      login();
      return;
    }

    // Logged in — redirect to Shopify Customer Account portal
    const shopId = process.env.NEXT_PUBLIC_SHOPIFY_SHOP_ID;
    const accountUrl = shopId
      ? `https://shopify.com/${shopId}/account`
      : `${process.env.NEXT_PUBLIC_SHOPIFY_CUSTOMER_ACCOUNT_API_URL || "https://shopify.com/80089186558/account"}`;

    const timeout = setTimeout(() => {
      window.location.href = accountUrl;
    }, 800);

    return () => clearTimeout(timeout);
  }, [isAuthenticated, isLoading, login]);

  return (
    <div className="w-full min-h-[70vh] bg-white flex flex-col items-center justify-center font-sans">
      <div className="text-center">
        <div className="w-16 h-16 rounded-full bg-ergo-surface mx-auto flex items-center justify-center mb-6">
          {isLoading ? (
            <div className="w-6 h-6 border-[3px] border-ergo-border border-t-ergo-navy rounded-full animate-spin" />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-ergo-navy-deep">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          )}
        </div>
        <h1 className="text-2xl font-black text-ergo-navy-deep tracking-tight mb-2">
          {isLoading ? "Loading..." : isAuthenticated ? "Accessing Your Account" : "Redirecting to Login..."}
        </h1>
        <p className="text-sm font-bold text-ergo-muted uppercase tracking-widest">
          {isAuthenticated ? "Redirecting to your account dashboard..." : "Please wait..."}
        </p>
      </div>
    </div>
  );
}
