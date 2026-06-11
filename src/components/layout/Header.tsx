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
          "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
          scrolled
            ? "bg-apple-white/80 backdrop-blur-xl border-b border-apple-border/50"
            : "bg-transparent",
        )}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <img
                src="/images/logo/ergoauralogo.webp"
                alt="ErgoAura Shop"
                className="h-8 sm:h-9 w-auto"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-apple-text-primary hover:text-apple-text-secondary transition-colors"
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium text-apple-text-primary hover:text-apple-text-secondary transition-colors"
              >
                Products
              </Link>
              <Link
                href="/track-order"
                className="text-sm font-medium text-apple-text-primary hover:text-apple-text-secondary transition-colors"
              >
                Track Order
              </Link>
              <Link
                href="/signin"
                className="text-sm font-medium text-apple-text-primary hover:text-apple-text-secondary transition-colors"
              >
                Sign In
              </Link>
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Cart button */}
              <button
                onClick={toggleCart}
                className="relative p-2 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Open cart"
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
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
                className="md:hidden p-2 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Toggle menu"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
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
          <div className="md:hidden bg-apple-white border-t border-apple-border/50">
            <div className="section-container py-4 space-y-3">
              <Link
                href="/"
                className="block py-2 text-sm font-medium text-apple-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="block py-2 text-sm font-medium text-apple-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/track-order"
                className="block py-2 text-sm font-medium text-apple-text-primary"
                onClick={() => setMobileMenuOpen(false)}
              >
                Track Order
              </Link>
              <Link
                href="/signin"
                className="block py-2 text-sm font-medium text-apple-text-primary"
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
