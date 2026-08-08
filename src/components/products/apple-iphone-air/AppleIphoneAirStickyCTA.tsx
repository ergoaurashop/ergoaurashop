"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { APPLE_IPHONE_AIR_PRODUCT, APPLE_IPHONE_AIR_FOLDER } from "@/lib/apple-iphone-air-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${APPLE_IPHONE_AIR_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function AppleIphoneAirStickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(APPLE_IPHONE_AIR_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="appleiphoneair-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="appleiphoneair-sticky-cta-inner">
        <div className="appleiphoneair-sticky-left">
          {/* Product thumbnail */}
          <div className="appleiphoneair-sticky-thumb">
            <Image
              src={getImagePath("hero_design__capuizdf0uuu_large_2x.jpg")}
              alt="Apple iPhone Air"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="appleiphoneair-sticky-product-name">Apple iPhone Air</span>
          <div className="appleiphoneair-sticky-pricing">
            <span className="appleiphoneair-sticky-price">
              {formatPrice(APPLE_IPHONE_AIR_PRODUCT.price)}
            </span>
            <span className="appleiphoneair-sticky-original">
              {formatPrice(APPLE_IPHONE_AIR_PRODUCT.original_price)}
            </span>
            <span className="appleiphoneair-sticky-badge">
              -{APPLE_IPHONE_AIR_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="appleiphoneair-btn-primary appleiphoneair-sticky-btn"
        >
          {/* Shopping bag SVG */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          Buy Now &mdash; {formatPrice(APPLE_IPHONE_AIR_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
