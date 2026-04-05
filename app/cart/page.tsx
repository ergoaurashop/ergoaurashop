"use client";

import { useCart } from "@/lib/cart/CartContext";
import { formatPrice } from "@/lib/formatters";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CartPage() {
  const { cart, isLoading: isCartLoading, removeItem, updateQuantity } = useCart();
  const [loadingLines, setLoadingLines] = useState<Record<string, boolean>>({});

  const handleRemove = async (lineId: string) => {
    if (!cart?.id) return;
    setLoadingLines((prev) => ({ ...prev, [lineId]: true }));
    try {
      await removeItem(lineId);
    } finally {
      setLoadingLines((prev) => ({ ...prev, [lineId]: false }));
    }
  };

  const handleUpdate = async (lineId: string, quantity: number) => {
    if (!cart?.id || quantity < 1) return;
    setLoadingLines((prev) => ({ ...prev, [lineId]: true }));
    try {
      await updateQuantity(lineId, quantity);
    } finally {
      setLoadingLines((prev) => ({ ...prev, [lineId]: false }));
    }
  };

  if (isCartLoading && !cart) {
    return (
      <div className="w-full min-h-[60vh] flex items-center justify-center bg-ergo-surface">
        <div className="w-8 h-8 font-black text-ergo-navy animate-spin">○</div>
      </div>
    );
  }

  if (!cart || cart.lines.edges.length === 0) {
    return (
      <div className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
        <div className="w-20 h-20 bg-ergo-surface rounded-full flex items-center justify-center mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-10 h-10 text-ergo-navy-deep">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-black text-ergo-navy-deep tracking-tight mb-4">Your cart is empty.</h1>
        <p className="text-ergo-muted font-medium mb-8">Before you proceed to checkout you must add some products to your shopping cart.</p>
        <Link href="/collections" className="bg-ergo-navy text-white px-8 py-4 rounded-full font-black text-sm hover:bg-ergo-navy-deep transition-all uppercase tracking-widest">
          Return to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white font-sans selection:bg-ergo-navy selection:text-white pb-20">
      <div className="bg-ergo-surface py-12 md:py-16 mb-8 border-b border-ergo-border">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <h1 className="text-4xl md:text-5xl font-black text-ergo-navy-deep tracking-tighter mb-2">Shopping Cart</h1>
          <p className="text-sm font-bold text-ergo-muted uppercase tracking-widest">{cart.totalQuantity} items</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col lg:flex-row gap-12">
        {/* Cart Items (Left) */}
        <div className="w-full lg:w-2/3">
          <div className="hidden md:grid grid-cols-6 gap-4 text-[10px] font-black text-ergo-muted uppercase tracking-widest border-b border-ergo-border pb-4 mb-6">
            <div className="col-span-3">Product</div>
            <div className="col-span-1 text-center">Quantity</div>
            <div className="col-span-1 text-right">Price</div>
            <div className="col-span-1 text-right">Total</div>
          </div>

          <div className="space-y-6">
            {cart.lines.edges.map(({ node: line }) => {
              const product = line.merchandise.product;
              const image = product.images.edges[0]?.node;
              return (
                <div key={line.id} className={`grid grid-cols-1 md:grid-cols-6 gap-4 md:items-center py-4 border-b border-ergo-border last:border-0 ${loadingLines[line.id] ? "opacity-50 pointer-events-none grayscale" : ""}`}>
                  
                  {/* Product Info */}
                  <div className="col-span-3 flex gap-4">
                    <Link href={`/products/${product.handle}`} className="relative w-24 h-24 bg-ergo-surface rounded-xl overflow-hidden flex-shrink-0 border border-ergo-border group">
                      {image && (
                        <Image src={image.url} alt={image.altText || product.title} fill className="object-cover group-hover:scale-110 transition-transform" />
                      )}
                    </Link>
                    <div className="flex flex-col justify-center">
                      <Link href={`/products/${product.handle}`} className="text-base font-black text-ergo-navy-deep hover:text-ergo-navy transition-colors tracking-tight line-clamp-2">
                        {product.title}
                      </Link>
                      <p className="text-xs font-bold text-ergo-muted mt-1">{line.merchandise.title !== 'Default Title' ? line.merchandise.title : ''}</p>
                      
                      {/* Mobile Pricing & Actions */}
                      <div className="md:hidden flex items-center justify-between mt-4">
                        <span className="font-bold text-sm text-ergo-text">{formatPrice(line.merchandise.price)}</span>
                        <div className="flex items-center gap-4 bg-ergo-surface px-3 py-1 rounded-full border border-ergo-border">
                          <button onClick={() => handleUpdate(line.id, line.quantity - 1)} className="font-black text-ergo-navy-deep px-1 hover:text-red-500 transition-colors">-</button>
                          <span className="text-xs font-bold text-ergo-text w-4 text-center">{line.quantity}</span>
                          <button onClick={() => handleUpdate(line.id, line.quantity + 1)} className="font-black text-ergo-navy-deep px-1 hover:text-ergo-green transition-colors">+</button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Desktop Quantity */}
                  <div className="hidden md:flex col-span-1 justify-center">
                    <div className="flex items-center gap-4 bg-ergo-surface px-3 py-2 rounded-full border border-ergo-border">
                      <button onClick={() => handleUpdate(line.id, line.quantity - 1)} className="font-black text-xl leading-none text-ergo-navy-deep hover:text-red-500 transition-colors">-</button>
                      <span className="text-sm font-bold text-ergo-text w-6 text-center select-none">{line.quantity}</span>
                      <button onClick={() => handleUpdate(line.id, line.quantity + 1)} className="font-black text-xl leading-none px-1 text-ergo-navy-deep hover:text-ergo-green transition-colors">+</button>
                    </div>
                  </div>

                  {/* Desktop Base Price */}
                  <div className="hidden md:block col-span-1 text-right text-sm font-bold text-ergo-muted">
                    {formatPrice(line.merchandise.price)}
                  </div>

                  {/* Desktop Subtotal & Remove */}
                  <div className="hidden md:flex col-span-1 justify-end items-center gap-4">
                    <span className="text-sm font-black text-ergo-navy-deep">
                      {formatPrice({ amount: (parseFloat(line.merchandise.price.amount) * line.quantity).toString(), currencyCode: line.merchandise.price.currencyCode })}
                    </span>
                    <button onClick={() => handleRemove(line.id)} className="text-ergo-muted hover:text-red-500 transition-colors p-1" title="Remove Item">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                        <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Order Summary (Right) */}
        <div className="w-full lg:w-1/3">
          <div className="bg-ergo-surface rounded-3xl p-6 md:p-8 border border-ergo-border sticky top-32">
            <h2 className="text-xl font-black text-ergo-navy-deep tracking-tight mb-6">Order Summary</h2>
            
            <div className="flex justify-between items-center mb-4 text-sm font-bold">
              <span className="text-ergo-muted">Subtotal</span>
              <span className="text-ergo-navy-deep">{formatPrice(cart.cost.subtotalAmount)}</span>
            </div>
            
            <div className="flex justify-between items-center mb-6 border-b border-ergo-border/50 pb-6 text-sm font-bold">
              <span className="text-ergo-muted">Shipping</span>
              <span className="text-ergo-navy-deep">Calculated at checkout</span>
            </div>

            <div className="flex justify-between items-end mb-8">
              <span className="text-base font-black text-ergo-navy-deep">Total</span>
              <div className="text-right">
                <span className="text-sm font-bold text-ergo-muted mr-2">{cart.cost.totalAmount.currencyCode}</span>
                <span className="text-2xl font-black text-ergo-navy-deep">{formatPrice(cart.cost.totalAmount)}</span>
              </div>
            </div>

            <button
              onClick={() => {
  const url = cart?.checkoutUrl
  if (!url) return
  const cartPath = url.includes('/cart/')
    ? url.substring(url.indexOf('/cart/'))
    : url
  const checkoutUrl = `https://hqdyqf-9e.myshopify.com${cartPath}`
  window.location.assign(checkoutUrl)
}}
              className="w-full bg-ergo-navy text-white flex items-center justify-center py-4 rounded-full font-black text-sm uppercase tracking-widest hover:bg-ergo-navy-deep transition-all shadow-md hover:shadow-lg active:scale-95"
            >
              Secure Checkout
            </button>
            
            <div className="mt-6 flex justify-center items-center gap-2 text-[10px] font-bold text-ergo-muted uppercase tracking-widest">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-ergo-green">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Standard 256-Bit SSL Encryption
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
