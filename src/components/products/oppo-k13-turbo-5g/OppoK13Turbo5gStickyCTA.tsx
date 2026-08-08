"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  OPPO_K13_TURBO_5G_PRODUCT,
  OPPO_K13_TURBO_5G_FOLDER,
} from "@/lib/oppo-k13-turbo-5g-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${OPPO_K13_TURBO_5G_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function OppoK13Turbo5gStickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(OPPO_K13_TURBO_5G_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="oppok13turbo5g-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="oppok13turbo5g-sticky-cta-inner">
        <div className="oppok13turbo5g-sticky-left">
          {/* Product thumbnail */}
          <div className="oppok13turbo5g-sticky-thumb">
            <Image
              src={getImagePath("s-l1600.webp")}
              alt="OPPO K13 Turbo 5G"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="oppok13turbo5g-sticky-product-name">
            OPPO K13 Turbo 5G
          </span>
          <div className="oppok13turbo5g-sticky-pricing">
            <span className="oppok13turbo5g-sticky-price">
              {formatPrice(OPPO_K13_TURBO_5G_PRODUCT.price)}
            </span>
            <span className="oppok13turbo5g-sticky-original">
              {formatPrice(OPPO_K13_TURBO_5G_PRODUCT.original_price)}
            </span>
            <span className="oppok13turbo5g-sticky-badge">
              -{OPPO_K13_TURBO_5G_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="oppok13turbo5g-btn-primary oppok13turbo5g-sticky-btn"
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
          Buy Now &mdash; {formatPrice(OPPO_K13_TURBO_5G_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
