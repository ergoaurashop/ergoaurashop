"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { IQOO_Z11X_PRODUCT, IQOO_Z11X_FOLDER } from "@/lib/iqoo-z11x-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${IQOO_Z11X_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function IqooZ11xStickyCTA() {
  const router = useRouter();
  const cartIsOpen = useCartStore((s) => s.isOpen);

  // Don't render when the cart sidebar is open
  if (cartIsOpen) return null;

  const handleBuyNow = () => {
    useCartStore.getState().addItem(IQOO_Z11X_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="iqooz11x-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="iqooz11x-sticky-cta-inner">
        <div className="iqooz11x-sticky-left">
          {/* Product thumbnail */}
          <div className="iqooz11x-sticky-thumb">
            <Image
              src={getImagePath("Vivo-iQOO-Z11x.jpg")}
              alt="iQOO Z11x"
              width={48}
              height={48}
              unoptimized
              className="object-cover"
            />
          </div>
          <span className="iqooz11x-sticky-product-name">iQOO Z11x</span>
          <div className="iqooz11x-sticky-pricing">
            <span className="iqooz11x-sticky-price">
              {formatPrice(IQOO_Z11X_PRODUCT.price)}
            </span>
            <span className="iqooz11x-sticky-original">
              {formatPrice(IQOO_Z11X_PRODUCT.original_price)}
            </span>
            <span className="iqooz11x-sticky-badge">
              -{IQOO_Z11X_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="iqooz11x-btn-primary iqooz11x-sticky-btn"
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
          Buy Now &mdash; {formatPrice(IQOO_Z11X_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
