import { shopifyFetch } from "./client";
import { GET_SHOPIFY_PAGE, GET_ALL_PAGES } from "./queries";

export interface ShopifyPage {
  id: string;
  title: string;
  handle: string;
  body: string;
  bodySummary: string;
  seo: {
    title: string;
    description: string;
  };
  createdAt: string;
  updatedAt: string;
}

export async function getShopifyPage(handle: string): Promise<ShopifyPage | null> {
  const data = await shopifyFetch<{ page: ShopifyPage | null }>({
    query: GET_SHOPIFY_PAGE,
    variables: { handle },
  });

  return data.page;
}

export async function getAllPages(): Promise<{ handle: string; title: string; updatedAt: string }[]> {
  const data = await shopifyFetch<{
    pages: { edges: { node: { handle: string; title: string; updatedAt: string } }[] };
  }>({
    query: GET_ALL_PAGES,
  });

  return data.pages?.edges.map((e) => e.node) || [];
}
