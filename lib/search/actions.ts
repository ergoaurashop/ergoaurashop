"use server";

import { shopifyFetch } from "@/lib/shopify/client";
import { PREDICTIVE_SEARCH } from "@/lib/shopify/queries";
import type { Money, ShopifyImage } from "@/lib/shopify/types";

export interface PredictiveSearchProduct {
  id: string;
  handle: string;
  title: string;
  featuredImage: ShopifyImage | null;
  priceRange: {
    minVariantPrice: Money;
    maxVariantPrice: Money;
  };
}

export async function getPredictiveSearch(
  query: string
): Promise<PredictiveSearchProduct[]> {
  if (!query || query.length < 2) return [];

  try {
    const data = await shopifyFetch<{
      predictiveSearch: { products: PredictiveSearchProduct[] };
    }>({
      query: PREDICTIVE_SEARCH,
      variables: { query },
    });
    
    return data.predictiveSearch?.products || [];
  } catch (error) {
    console.error("[shopify] getPredictiveSearch error:", error);
    return [];
  }
}
