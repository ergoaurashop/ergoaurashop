"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { NORD_6_PRODUCT, NORD_6_FOLDER } from "@/lib/oneplus-nord-6-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${NORD_6_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function Nord6StickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(NORD_6_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="nord6-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="nord6-sticky-cta-inner">
        <div className="nord6-sticky-left">
          {/* Product thumbnail */}
          <div className="nord6-sticky-thumb">
            <Image
              src={getImagePath("s-l1600.webp")}
              alt="OnePlus Nord 6"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="nord6-sticky-product-name">OnePlus Nord 6</span>
          <div className="nord6-sticky-pricing">
            <span className="nord6-sticky-price">
              {formatPrice(NORD_6_PRODUCT.price)}
            </span>
            <span className="nord6-sticky-original">
              {formatPrice(NORD_6_PRODUCT.original_price)}
            </span>
            <span className="nord6-sticky-badge">
              -{NORD_6_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="nord6-btn-primary nord6-sticky-btn"
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
          Buy Now &mdash; {formatPrice(NORD_6_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
