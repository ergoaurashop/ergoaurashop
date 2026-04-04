import { GET_RECENT_PRODUCTS } from "./queries";
import { shopifyFetch } from "./client";
import { ShopifyResponse } from "./types";

interface RecentProductsData {
  products: {
    edges: {
      node: {
        id: string;
        handle: string;
        title: string;
        featuredImage: {
          url: string;
          altText: string;
          width: number;
          height: number;
        };
        priceRange: {
          minVariantPrice: {
            amount: string;
            currencyCode: string;
          };
        };
      };
    }[];
  };
}

export async function getRecentProducts() {
  try {
    const data = await shopifyFetch<RecentProductsData>({
      query: GET_RECENT_PRODUCTS,
    });

    return data.products.edges.map((edge) => edge.node);
  } catch (error) {
    console.error("Error fetching recent products:", error);
    return [];
  }
}
