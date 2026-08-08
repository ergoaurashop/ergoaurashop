"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { EDGE_70_PRO_PLUS_PRODUCT, EDGE_70_PRO_PLUS_FOLDER } from "@/lib/motorola-edge-70-pro-plus-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${EDGE_70_PRO_PLUS_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function Edge70ProPlusStickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(EDGE_70_PRO_PLUS_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="edge70proplus-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="edge70proplus-sticky-cta-inner">
        <div className="edge70proplus-sticky-left">
          {/* Product thumbnail */}
          <div className="edge70proplus-sticky-thumb">
            <Image
              src={getImagePath("s-l1600.webp")}
              alt="Motorola Edge 70 Pro+ 5G"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="edge70proplus-sticky-product-name">Motorola Edge 70 Pro+ 5G</span>
          <div className="edge70proplus-sticky-pricing">
            <span className="edge70proplus-sticky-price">
              {formatPrice(EDGE_70_PRO_PLUS_PRODUCT.price)}
            </span>
            <span className="edge70proplus-sticky-original">
              {formatPrice(EDGE_70_PRO_PLUS_PRODUCT.original_price)}
            </span>
            <span className="edge70proplus-sticky-badge">
              -{EDGE_70_PRO_PLUS_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="edge70proplus-btn-primary edge70proplus-sticky-btn"
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
          Buy Now &mdash; {formatPrice(EDGE_70_PRO_PLUS_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
