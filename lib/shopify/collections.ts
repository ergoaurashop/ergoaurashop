import { shopifyFetch } from "./client";
import { GET_ALL_COLLECTIONS, GET_COLLECTION_PAGE } from "./queries";
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
export async function getCollectionPage(
  handle: string,
  cursor?: string,
  sortKey: string = "COLLECTION_DEFAULT",
  reverse: boolean = false
): Promise<Collection | null> {
  try {
    const data = await shopifyFetch<{ collection: Collection }>({
      query: GET_COLLECTION_PAGE,
      variables: { handle, cursor, sortKey, reverse },
    });
    return data.collection;
  } catch (error) {
    console.error(`[shopify] getCollectionPage(${handle}) failed:`, error);
    return null;
  }
}
