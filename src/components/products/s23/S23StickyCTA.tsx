"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Image from "next/image";
import { S23_PRODUCT, S23_FOLDER } from "@/lib/s23-ultra-data";
import { formatPrice } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";

function getImagePath(filename: string): string {
  return `/images/products/${S23_FOLDER.split("/").map(encodeURIComponent).join("/")}/${encodeURIComponent(filename)}`;
}

export default function S23StickyCTA() {
  const router = useRouter();

  const handleBuyNow = () => {
    useCartStore.getState().addItem(S23_PRODUCT, 1);
    router.push("/checkout");
  };

  return (
    <motion.div
      className="s23-sticky-cta"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
    >
      <div className="s23-sticky-cta-inner">
        <div className="s23-sticky-left">
          {/* Product thumbnail */}
          <div className="s23-sticky-thumb">
            <Image
              src={getImagePath("galaxy-s23-ultra-highlights-kv-1.jpg")}
              alt="Samsung Galaxy S23 Ultra"
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
          <span className="s23-sticky-product-name">
            Samsung Galaxy S23 Ultra
          </span>
          <div className="s23-sticky-pricing">
            <span className="s23-sticky-price">
              {formatPrice(S23_PRODUCT.price)}
            </span>
            <span className="s23-sticky-original">
              {formatPrice(S23_PRODUCT.original_price)}
            </span>
            <span className="s23-sticky-badge">
              -{S23_PRODUCT.discount_percentage}%
            </span>
          </div>
        </div>

        <button
          onClick={handleBuyNow}
          className="s23-btn-primary s23-sticky-btn"
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
          Buy Now &mdash; {formatPrice(S23_PRODUCT.price)}
        </button>
      </div>
    </motion.div>
  );
}
