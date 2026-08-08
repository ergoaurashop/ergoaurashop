"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { VIVO_V70_ELITE_PRODUCT, VIVO_V70_ELITE_FOLDER } from "@/lib/vivo-v70-elite-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${VIVO_V70_ELITE_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function VivoV70EliteStickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(VIVO_V70_ELITE_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="vivov70elite-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="vivov70elite-sticky-cta-inner">
        <div className="vivov70elite-sticky-left">
          {/* Product thumbnail */}
          <div className="vivov70elite-sticky-thumb">
            <Image
              src={getImagePath("s-l1600.webp")}
              alt="vivo V70 Elite"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="vivov70elite-sticky-product-name">vivo V70 Elite</span>
          <div className="vivov70elite-sticky-pricing">
            <span className="vivov70elite-sticky-price">
              {formatPrice(VIVO_V70_ELITE_PRODUCT.price)}
            </span>
            <span className="vivov70elite-sticky-original">
              {formatPrice(VIVO_V70_ELITE_PRODUCT.original_price)}
            </span>
            <span className="vivov70elite-sticky-badge">
              -{VIVO_V70_ELITE_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="vivov70elite-btn-primary vivov70elite-sticky-btn"
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
          Buy Now &mdash; {formatPrice(VIVO_V70_ELITE_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
