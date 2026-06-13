"use client";

import type { Product } from "@/lib/types";
import ProductGrid from "@/components/products/ProductGrid";

type Props = {
  products: Product[];
  categoryName: string;
};

/**
 * Client component that renders the filtered product grid for a category.
 * Wraps ProductGrid with the filtered products array — no additional
 * client-side filtering needed since the server already filters.
 */
export default function CategoryProducts({ products, categoryName }: Props) {
  return (
    <ProductGrid
      products={products}
      emptyMessage={`No products found in ${categoryName}.`}
      pageSize={products.length}
    />
  );
}
