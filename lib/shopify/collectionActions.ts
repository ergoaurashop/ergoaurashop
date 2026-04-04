"use server";

import { shopifyFetch } from "./client";
import { GET_COLLECTION_PAGE } from "./queries";
import { Collection } from "./types";

/**
 * Server action to fetch collection data with sorting and pagination
 */
export async function getSortedCollection(
  handle: string,
  sortParam: string = "best-selling",
  cursor?: string
): Promise<Collection | null> {
  let sortKey = "BEST_SELLING";
  let reverse = false;

  switch (sortParam) {
    case "price-low-high":
      sortKey = "PRICE";
      reverse = false;
      break;
    case "price-high-low":
      sortKey = "PRICE";
      reverse = true;
      break;
    case "newest":
      sortKey = "CREATED";
      reverse = true;
      break;
    case "best-selling":
    default:
      sortKey = "BEST_SELLING";
      reverse = false;
      break;
  }

  const variables = cursor
    ? { handle, sortKey, reverse, cursor }
    : { handle, sortKey, reverse };

  try {
    const data = await shopifyFetch<{ collection: Collection | null }>({
      query: GET_COLLECTION_PAGE,
      variables,
    });

    return data.collection;
  } catch (error) {
    console.error(`[shopify] getSortedCollection error for handle ${handle}:`, error);
    return null;
  }
}
