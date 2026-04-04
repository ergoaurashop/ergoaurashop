import { shopifyFetch } from "./client";
import { GET_SHOP_INFO } from "./queries";
import { Shop } from "./types";

export async function getShopInfo(): Promise<Shop | null> {
  try {
    const data = await shopifyFetch<{ shop: Shop }>({
      query: GET_SHOP_INFO,
    });
    return data.shop;
  } catch (error) {
    console.error("[shopify] getShopInfo() failed:", error);
    return null;
  }
}
