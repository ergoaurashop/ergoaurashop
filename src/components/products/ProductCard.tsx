"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { formatPrice, getProductImageUrl } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { useCartStore } from "@/store/cartStore";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/products/${product.slug}`}>
        <div className="card-apple overflow-hidden">
          {/* Image */}
          <div className="aspect-square bg-apple-bg overflow-hidden relative">
            <img
              src={getProductImageUrl(product.slug, product.images?.[0])}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            {product.discount_percentage > 0 && (
              <div className="absolute top-3 left-3">
                <Badge variant="discount">
                  -{product.discount_percentage}%
                </Badge>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="p-4 space-y-2">
            <h3 className="text-sm font-medium text-apple-text-primary line-clamp-2 leading-snug">
              {product.name}
            </h3>

            <div className="flex items-baseline gap-2">
              <span className="text-base font-semibold text-apple-text-primary">
                {formatPrice(product.price)}
              </span>
              {product.original_price > product.price && (
                <span className="text-sm text-apple-text-secondary line-through">
                  {formatPrice(product.original_price)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Add to cart button */}
      <div className="mt-2 px-1">
        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={(e) => {
            e.preventDefault();
            addItem(product);
          }}
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}
