"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { POCO_X8_PRO_MAX_PRODUCT, POCO_X8_PRO_MAX_FOLDER } from "@/lib/poco-x8-pro-max-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${POCO_X8_PRO_MAX_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function PocoX8ProMaxStickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(POCO_X8_PRO_MAX_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="pocox8promax-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="pocox8promax-sticky-cta-inner">
        <div className="pocox8promax-sticky-left">
          {/* Product thumbnail */}
          <div className="pocox8promax-sticky-thumb">
            <Image
              src={getImagePath("s-l1600.webp")}
              alt="POCO X8 Pro Max"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="pocox8promax-sticky-product-name">POCO X8 Pro Max</span>
          <div className="pocox8promax-sticky-pricing">
            <span className="pocox8promax-sticky-price">
              {formatPrice(POCO_X8_PRO_MAX_PRODUCT.price)}
            </span>
            <span className="pocox8promax-sticky-original">
              {formatPrice(POCO_X8_PRO_MAX_PRODUCT.original_price)}
            </span>
            <span className="pocox8promax-sticky-badge">
              -{POCO_X8_PRO_MAX_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="pocox8promax-btn-primary pocox8promax-sticky-btn"
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
          Buy Now &mdash; {formatPrice(POCO_X8_PRO_MAX_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
