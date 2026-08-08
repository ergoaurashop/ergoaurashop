"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  LAVA_AGNI_4_PRODUCT,
  LAVA_AGNI_4_FOLDER,
} from "@/lib/lava-agni-4-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${LAVA_AGNI_4_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function LavaAgni4StickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(LAVA_AGNI_4_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="lavaagni4-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="lavaagni4-sticky-cta-inner">
        <div className="lavaagni4-sticky-left">
          {/* Product thumbnail */}
          <div className="lavaagni4-sticky-thumb">
            <Image
              src={getImagePath("Lava-Agni-4.webp")}
              alt="Lava Agni 4"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="lavaagni4-sticky-product-name">Lava Agni 4</span>
          <div className="lavaagni4-sticky-pricing">
            <span className="lavaagni4-sticky-price">
              {formatPrice(LAVA_AGNI_4_PRODUCT.price)}
            </span>
            <span className="lavaagni4-sticky-original">
              {formatPrice(LAVA_AGNI_4_PRODUCT.original_price)}
            </span>
            <span className="lavaagni4-sticky-badge">
              -{LAVA_AGNI_4_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="lavaagni4-btn-primary lavaagni4-sticky-btn"
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
          Buy Now &mdash; {formatPrice(LAVA_AGNI_4_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
