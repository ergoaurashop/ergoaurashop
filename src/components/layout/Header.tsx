"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { cn, formatPrice } from "@/lib/utils";
import CartSidebar from "./CartSidebar";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { items, toggleCart } = useCartStore();

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-10 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-[#1A1614]/95 backdrop-blur-xl border-b border-[#C9A962]/30 shadow-lg"
            : "bg-gradient-to-r from-[#C9A962] via-[#DFC48A] to-[#C9A962]",
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo — Animated Gradient Text */}
            <Link href="/" className="flex items-center gap-2 shrink-0 group">
              <span
                className={cn(
                  "text-xl sm:text-2xl font-bold tracking-tight transition-colors duration-300",
                  scrolled
                    ? "bg-gradient-to-r from-[#C9A962] via-[#DFC48A] to-[#C9A962] bg-[length:300%_100%] bg-clip-text text-transparent animate-[gradient-shift_4s_ease_infinite]"
                    : "text-[#1A1614]",
                )}
              >
                Ergoaura
              </span>
              <span
                className={cn(
                  "text-xs sm:text-sm font-medium tracking-widest uppercase transition-colors duration-300",
                  scrolled ? "text-[#C9A962]/70" : "text-[#1A1614]/60",
                )}
              >
                shop
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className={cn(
                  "text-sm font-medium transition-colors",
                  scrolled
                    ? "text-[#C9A962] hover:text-[#DFC48A]"
                    : "text-[#1A1614] hover:text-[#1A1614]/70",
                )}
              >
                Home
              </Link>
              <Link
                href="/products"
                className={cn(
                  "text-sm font-medium transition-colors",
                  scrolled
                    ? "text-[#C9A962] hover:text-[#DFC48A]"
                    : "text-[#1A1614] hover:text-[#1A1614]/70",
                )}
              >
                Products
              </Link>
              <Link
                href="/track-order"
                className={cn(
                  "text-sm font-medium transition-colors",
                  scrolled
                    ? "text-[#C9A962] hover:text-[#DFC48A]"
                    : "text-[#1A1614] hover:text-[#1A1614]/70",
                )}
              >
                Track Order
              </Link>
              <Link
                href="/signin"
                className={cn(
                  "text-sm font-medium transition-colors",
                  scrolled
                    ? "text-[#C9A962] hover:text-[#DFC48A]"
                    : "text-[#1A1614] hover:text-[#1A1614]/70",
                )}
              >
                Sign In
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Cart button */}
              <button
                onClick={toggleCart}
                className={cn(
                  "relative p-2 rounded-full transition-colors",
                  scrolled ? "hover:bg-[#C9A962]/10" : "hover:bg-[#1A1614]/10",
                )}
                aria-label="Open cart"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={scrolled ? "#C9A962" : "#1A1614"}
                  strokeWidth="1.5"
                >
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
                </svg>
                {itemCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-apple-error text-apple-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {itemCount > 99 ? "99+" : itemCount}
                  </span>
                )}
              </button>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={cn(
                  "md:hidden p-2 rounded-full transition-colors",
                  scrolled ? "hover:bg-[#C9A962]/10" : "hover:bg-[#1A1614]/10",
                )}
                aria-label="Toggle menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke={scrolled ? "#C9A962" : "#1A1614"}
                  strokeWidth="2"
                >
                  {mobileMenuOpen ? (
                    <path d="M18 6L6 18M6 6l12 12" />
                  ) : (
                    <>
                      <path d="M4 6h16M4 12h16M4 18h16" />
                    </>
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-[#1A1614] border-t border-[#C9A962]/30">
            <div className="section-container py-4 space-y-3">
              <Link
                href="/"
                className="block py-2 text-sm font-medium text-[#C9A962]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block py-2 text-sm font-medium text-[#C9A962]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/track-order"
                className="block py-2 text-sm font-medium text-[#C9A962]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Track Order
              </Link>
              <Link
                href="/signin"
                className="block py-2 text-sm font-medium text-[#C9A962]"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </header>

      <CartSidebar />
    </>
  );
}
