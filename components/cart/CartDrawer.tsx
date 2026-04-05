"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart/useCart";
import { CartItem } from "./CartItem";
import { formatPrice } from "@/lib/formatters";

const FREE_SHIPPING_THRESHOLD = 50;

export function CartDrawer() {
  const { cart, isOpen, closeCart, isLoading } = useCart();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent background scrolling when drawer is open
  useEffect(() => {
    if (!mounted) return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, mounted]);

  if (!mounted) return null;

  const subtotal = cart?.cost?.subtotalAmount?.amount 
    ? parseFloat(cart.cost.subtotalAmount.amount) 
    : 0;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progressPercentage = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-[100dvh] w-full max-w-[400px] bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-ergo-border">
          <h2 className="text-xl font-bold text-ergo-navy-deep flex items-center gap-2">
            Your Cart
            {cart && cart.totalQuantity > 0 && (
              <span className="bg-gray-100 text-ergo-text text-sm font-semibold px-2 py-0.5 rounded-full">
                {cart.totalQuantity}
              </span>
            )}
          </h2>
          <button 
            onClick={closeCart}
            className="p-2 text-gray-400 hover:text-ergo-navy transition-colors bg-gray-50 hover:bg-gray-100 rounded-full"
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-ergo-surface px-5 py-4 border-b border-ergo-border flex-shrink-0">
          <div className="flex justify-between text-sm font-bold mb-2">
            {isFreeShipping ? (
              <span className="text-ergo-green flex items-center gap-1.5">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
                </svg>
                You got free shipping!
              </span>
            ) : (
              <span className="text-ergo-text">
                Add <span className="text-ergo-orange">{formatPrice(amountToFreeShipping)}</span> for free shipping!
              </span>
            )}
          </div>
          <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
            <div 
              className={`h-full rounded-full transition-all duration-700 ease-out ${isFreeShipping ? 'bg-ergo-green' : 'bg-ergo-orange'}`}
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        {/* Cart Items Area */}
        <div className="flex-1 overflow-y-auto px-5 py-2">
          {isLoading && !cart ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-3">
              <div className="w-8 h-8 border-[3px] border-gray-200 border-t-ergo-navy rounded-full animate-spin" />
              <p className="text-sm font-medium">Loading your cart...</p>
            </div>
          ) : !cart || cart.lines.edges.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <div className="bg-gray-50 p-6 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-gray-300">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <p className="text-lg font-bold text-ergo-navy mb-1">Your cart is empty</p>
              <p className="text-sm text-gray-500 mb-6 text-center">It looks like you haven&apos;t added any items yet.</p>
              <button 
                onClick={closeCart}
                className="bg-ergo-navy text-white px-8 py-3 rounded-xl font-bold hover:bg-ergo-navy-deep transition-colors shadow-sm"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col">
              {cart.lines.edges.map((edge: { node: import("@/lib/shopify/types").CartLine }) => (
                <CartItem key={edge.node.id} line={edge.node} />
              ))}
            </div>
          )}
        </div>

        {/* Footer Area */}
        {cart && cart.lines.edges.length > 0 && (
          <div className="border-t border-ergo-border p-5 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)] pt-4 pb-6 mt-auto">
            <div className="flex justify-between items-center mb-1 drop-shadow-sm">
              <span className="text-gray-500 text-sm font-medium">Subtotal</span>
              <span className="font-bold text-ergo-text text-xl">
                {cart.cost?.subtotalAmount ? formatPrice(cart.cost.subtotalAmount) : "$0.00"}
              </span>
            </div>
            
            <p className="text-[11px] text-gray-400 mb-4 pb-3 border-b border-dashed border-gray-200">
              Taxes and shipping calculated at checkout.
            </p>

            <button
              onClick={() => {
  const url = cart?.checkoutUrl;
  if (!url) return;
  const checkoutUrl = url.replace(
    /^(https?:\/\/[^\/]*|)/,
    "https://hqdyqf-9e.myshopify.com"
  );
  window.location.assign(checkoutUrl);
}}
              className="w-full flex items-center justify-center gap-2 bg-ergo-green hover:bg-[#2e6537] text-white rounded-xl py-[14px] font-bold text-[15px] shadow-sm transition-transform active:scale-[0.98]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
              </svg>
              Secure Checkout
            </button>
          </div>
        )}

      </div>
    </>
  );
}
