"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AccountBridgePage() {
  const router = useRouter();

  useEffect(() => {
    // In a headless setup without Shopify Plus Multipass,
    // the safest account route is redirecting back to the Shopify native checkout/account domain
    // Next.js config or middleware can also handle this, but this provides a fallback visual.
    const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN || "hqdyqf-9e.myshopify.com";
    
    const timeout = setTimeout(() => {
      window.location.href = `https://${SHOPIFY_DOMAIN}/account`;
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full min-h-[70vh] bg-white flex flex-col items-center justify-center font-sans">
      <div className="text-center animate-pulse">
        <div className="w-16 h-16 rounded-full bg-ergo-surface mx-auto flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 text-ergo-navy-deep">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
        <h1 className="text-2xl font-black text-ergo-navy-deep tracking-tight mb-2">Accessing Secure Portal</h1>
        <p className="text-sm font-bold text-ergo-muted uppercase tracking-widest">Redirecting to your account dashboard...</p>
      </div>
    </div>
  );
}
