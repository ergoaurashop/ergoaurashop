import { shopifyFetch } from "./client";
import { GET_ALL_COLLECTIONS } from "./queries";
import type { Collection } from "./types";

export async function getAllCollections(): Promise<Collection[]> {
  try {
    const data = await shopifyFetch<{
      collections: { edges: { node: Collection }[] };
    }>({
      query: GET_ALL_COLLECTIONS,
    });
    return data.collections.edges.map((e) => e.node);
  } catch (error) {
    console.error("[shopify] getAllCollections() failed:", error);
    return [];
  }
}
