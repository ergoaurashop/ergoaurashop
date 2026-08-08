"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { APPLE_IPHONE_17_PRO_PRODUCT, APPLE_IPHONE_17_PRO_FOLDER } from "@/lib/apple-iphone-17-pro-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${APPLE_IPHONE_17_PRO_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function AppleIphone17ProStickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(APPLE_IPHONE_17_PRO_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="appleiphone17pro-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="appleiphone17pro-sticky-cta-inner">
        <div className="appleiphone17pro-sticky-left">
          {/* Product thumbnail */}
          <div className="appleiphone17pro-sticky-thumb">
            <Image
              src={getImagePath("iphone-1.jpg")}
              alt="Apple iPhone 17 Pro"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="appleiphone17pro-sticky-product-name">Apple iPhone 17 Pro</span>
          <div className="appleiphone17pro-sticky-pricing">
            <span className="appleiphone17pro-sticky-price">
              {formatPrice(APPLE_IPHONE_17_PRO_PRODUCT.price)}
            </span>
            <span className="appleiphone17pro-sticky-original">
              {formatPrice(APPLE_IPHONE_17_PRO_PRODUCT.original_price)}
            </span>
            <span className="appleiphone17pro-sticky-badge">
              -{APPLE_IPHONE_17_PRO_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="appleiphone17pro-btn-primary appleiphone17pro-sticky-btn"
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
          Buy Now &mdash; {formatPrice(APPLE_IPHONE_17_PRO_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
