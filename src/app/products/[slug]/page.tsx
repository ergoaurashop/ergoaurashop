"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabase/client";
import type { Product } from "@/lib/types";
import { formatPrice, getProductImageUrl } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { useCartStore } from "@/store/cartStore";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const addItem = useCartStore((state) => state.addItem);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const { data } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug)
          .single();
        setProduct(data);
      } catch {
        // Product not found
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-24 sm:pt-28 section-container">
        <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="aspect-square bg-apple-bg rounded-apple" />
          <div className="space-y-4">
            <div className="h-8 bg-apple-bg rounded w-3/4" />
            <div className="h-6 bg-apple-bg rounded w-1/3" />
            <div className="h-20 bg-apple-bg rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-24 sm:pt-28 section-container text-center py-20">
        <p className="text-apple-text-secondary">Product not found.</p>
      </div>
    );
  }

  const images = product.images?.length
    ? product.images
    : [getProductImageUrl(product.slug)];

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* ============================ */}
          {/* Image Gallery */}
          {/* ============================ */}
          <div className="space-y-4">
            <div className="aspect-square bg-apple-bg rounded-apple overflow-hidden">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-contain p-4"
              />
            </div>
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`w-16 h-16 rounded-apple-sm overflow-hidden border-2 shrink-0 transition-colors ${
                      i === selectedImage
                        ? "border-apple-black"
                        : "border-transparent hover:border-apple-border"
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ============================ */}
          {/* Product Info */}
          {/* ============================ */}
          <div className="space-y-6">
            {/* Name & Price */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-apple-text-primary">
                {product.name}
              </h1>
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-3xl font-semibold text-apple-text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.original_price > product.price && (
                  <>
                    <span className="text-lg text-apple-text-secondary line-through">
                      {formatPrice(product.original_price)}
                    </span>
                    <Badge variant="discount">
                      -{product.discount_percentage}%
                    </Badge>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-apple-text-secondary leading-relaxed">
              {product.description}
            </p>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-apple-text-primary"
                    >
                      <svg
                        className="w-4 h-4 text-apple-success mt-0.5 shrink-0"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Specifications */}
            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-apple-text-primary mb-3">
                    Specifications
                  </h3>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    {Object.entries(product.specifications).map(
                      ([key, value]) => (
                        <div key={key} className="contents">
                          <span className="text-apple-text-secondary">
                            {key}
                          </span>
                          <span className="text-apple-text-primary">
                            {value}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

            {/* Add to Cart */}
            <div className="pt-4">
              <Button
                size="lg"
                fullWidth
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </Button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Free Delivery", sub: "Above ₹299" },
                { label: "Easy Returns", sub: "7-Day Policy" },
                { label: "Secure Checkout", sub: "Razorpay" },
                { label: "Support", sub: "24/7 Available" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-apple-bg rounded-apple-sm p-3 text-center"
                >
                  <p className="text-sm font-medium text-apple-text-primary">
                    {item.label}
                  </p>
                  <p className="text-xs text-apple-text-secondary">
                    {item.sub}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
