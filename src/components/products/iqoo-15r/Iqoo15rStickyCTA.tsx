"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { IQOO_15R_PRODUCT, IQOO_15R_FOLDER } from "@/lib/iqoo-15r-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${IQOO_15R_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function Iqoo15rStickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(IQOO_15R_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="iqoo15r-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="iqoo15r-sticky-cta-inner">
        <div className="iqoo15r-sticky-left">
          {/* Product thumbnail */}
          <div className="iqoo15r-sticky-thumb">
            <Image
              src={getImagePath("s-l1600.webp")}
              alt="iQOO 15R"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="iqoo15r-sticky-product-name">iQOO 15R</span>
          <div className="iqoo15r-sticky-pricing">
            <span className="iqoo15r-sticky-price">
              {formatPrice(IQOO_15R_PRODUCT.price)}
            </span>
            <span className="iqoo15r-sticky-original">
              {formatPrice(IQOO_15R_PRODUCT.original_price)}
            </span>
            <span className="iqoo15r-sticky-badge">
              -{IQOO_15R_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="iqoo15r-btn-primary iqoo15r-sticky-btn"
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
          Buy Now &mdash; {formatPrice(IQOO_15R_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
