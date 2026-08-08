"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  EDGE_70_FUSION_PRODUCT,
  EDGE_70_FUSION_FOLDER,
} from "@/lib/motorola-edge-70-fusion-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${EDGE_70_FUSION_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function Edge70FusionStickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(EDGE_70_FUSION_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="edge70fusion-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="edge70fusion-sticky-cta-inner">
        <div className="edge70fusion-sticky-left">
          {/* Product thumbnail */}
          <div className="edge70fusion-sticky-thumb">
            <Image
              src={getImagePath("455112-687778.avif")}
              alt="Motorola Edge 70 Fusion"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="edge70fusion-sticky-product-name">
            Motorola Edge 70 Fusion
          </span>
          <div className="edge70fusion-sticky-pricing">
            <span className="edge70fusion-sticky-price">
              {formatPrice(EDGE_70_FUSION_PRODUCT.price)}
            </span>
            <span className="edge70fusion-sticky-original">
              {formatPrice(EDGE_70_FUSION_PRODUCT.original_price)}
            </span>
            <span className="edge70fusion-sticky-badge">
              -{EDGE_70_FUSION_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="edge70fusion-btn-primary edge70fusion-sticky-btn"
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
          Buy Now &mdash; {formatPrice(EDGE_70_FUSION_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
