import { shopifyFetch } from "./client";
import { GET_ALL_PRODUCT_HANDLES, GET_ALL_COLLECTIONS } from "./queries";

interface ProductNode {
  handle: string;
  updatedAt: string;
}

interface CollectionNode {
  handle: string;
}

export async function getSitemapData() {
  const [productsData, collectionsData] = await Promise.all([
    shopifyFetch<{ products: { edges: { node: ProductNode }[] } }>({
      query: GET_ALL_PRODUCT_HANDLES,
    }),
    shopifyFetch<{ collections: { edges: { node: CollectionNode }[] } }>({
      query: GET_ALL_COLLECTIONS,
    }),
  ]);

  return {
    products: productsData.products.edges.map((edge: { node: ProductNode }) => edge.node),
    collections: collectionsData.collections.edges.map((edge: { node: CollectionNode }) => edge.node),
  };
}
