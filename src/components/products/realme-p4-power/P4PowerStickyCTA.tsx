"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { P4POWER_PRODUCT, P4POWER_FOLDER } from "@/lib/realme-p4-power-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${P4POWER_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function P4PowerStickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(P4POWER_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="p4power-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="p4power-sticky-cta-inner">
        <div className="p4power-sticky-left">
          {/* Product thumbnail */}
          <div className="p4power-sticky-thumb">
            <Image
              src={getImagePath("f1294f77-2706-4c59-aaea-cb1288c6a86e.avif")}
              alt="realme P4 Power"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="p4power-sticky-product-name">realme P4 Power</span>
          <div className="p4power-sticky-pricing">
            <span className="p4power-sticky-price">
              {formatPrice(P4POWER_PRODUCT.price)}
            </span>
            <span className="p4power-sticky-original">
              {formatPrice(P4POWER_PRODUCT.original_price)}
            </span>
            <span className="p4power-sticky-badge">
              -{P4POWER_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="p4power-btn-primary p4power-sticky-btn"
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
          Buy Now &mdash; {formatPrice(P4POWER_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
