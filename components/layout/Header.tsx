"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/cart/useCart";
import { SearchBar } from "@/components/ui/SearchBar";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { totalQuantity, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
    >
      {/* Announcement Bar */}
      <div className="w-full bg-ergo-navy-deep text-white text-xs font-semibold overflow-hidden">
        <div className="flex md:justify-center px-4 py-2 whitespace-nowrap animate-marquee md:animate-none">
          🚚 Free delivery on more items* | Shop best viral products
        </div>
      </div>

      {/* Main Header Container */}
      <div className="bg-white border-b border-ergo-border">
        {/* MOBILE LAYOUT (Default, hidden on md+) */}
        <div className="flex flex-col md:hidden py-3 px-4 gap-3">
          {/* Row 1: Logo + Cart */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center" prefetch={false}>
              <Image
                src="/logo.svg"
                alt="ErgoAura"
                width={150}
                height={37.5}
                className="w-[120px] object-contain flex-shrink-0"
                priority
              />
            </Link>

            <button
              onClick={openCart}
              className="relative p-1 text-ergo-text hover:text-ergo-navy-deep transition-colors"
              aria-label="Open cart"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              {totalQuantity > 0 && (
                <span className="absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ergo-orange px-1 text-[10px] font-bold text-white shadow-sm border border-white">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>

          {/* Row 2: Search */}
          <SearchBar />
        </div>

        {/* DESKTOP LAYOUT (Hidden below md) */}
        <div className="hidden md:flex flex-row items-center gap-6 h-[72px] max-w-7xl mx-auto px-6 lg:px-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center flex-shrink-0"
            prefetch={false}
          >
            <Image
              src="/logo.svg"
              alt="ErgoAura"
              width={150}
              height={37.5}
              className="w-[150px] object-contain flex-shrink-0"
              priority
            />
          </Link>

          {/* Search Bar - vast majority of flex space */}
          <SearchBar />

          {/* Actions (Deals, Account, Cart) */}
          <div className="flex items-center gap-5 lg:gap-7 flex-shrink-0 pl-6">
            {/* Deals Link */}
            <Link
              href="/deals"
              className="text-ergo-text hover:text-ergo-navy transition-colors font-semibold flex items-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hidden md:block lg:hidden"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                />
              </svg>
              <span className="text-sm hidden lg:inline">Deals</span>
            </Link>

            {/* Account / Login */}
            <Link
              href="/account/login"
              className="text-ergo-text hover:text-ergo-navy transition-colors font-semibold flex items-center gap-1.5"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                />
              </svg>
              <span className="text-sm hidden lg:inline">Sign In</span>
            </Link>

            {/* Cart */}
            <button
              onClick={openCart}
              className="relative flex items-center gap-1.5 text-ergo-text hover:text-ergo-navy transition-colors font-semibold"
              aria-label="Open cart"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-7 h-7"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                  />
                </svg>
                {totalQuantity > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-ergo-orange px-1 text-[10px] font-bold text-white shadow-sm border border-white">
                    {totalQuantity}
                  </span>
                )}
              </div>
              <span className="hidden lg:block text-sm ml-1">Cart</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
