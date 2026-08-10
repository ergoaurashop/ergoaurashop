"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { S24_PRODUCT, S24_FOLDER } from "@/lib/s24-ultra-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${S24_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function S24StickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(S24_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="s24-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="s24-sticky-cta-inner">
        <div className="s24-sticky-left">
          {/* Product thumbnail */}
          <div className="s24-sticky-thumb">
            <Image
              src={getImagePath("galaxy-s24-ultra-highlights-kv.jpg")}
              alt="Samsung Galaxy S24 Ultra"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="s24-sticky-product-name">
            Samsung Galaxy S24 Ultra
          </span>
          <div className="s24-sticky-pricing">
            <span className="s24-sticky-price">
              {formatPrice(S24_PRODUCT.price)}
            </span>
            <span className="s24-sticky-original">
              {formatPrice(S24_PRODUCT.original_price)}
            </span>
            <span className="s24-sticky-badge">
              -{S24_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="s24-btn-primary s24-sticky-btn"
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
          Buy Now &mdash; {formatPrice(S24_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
