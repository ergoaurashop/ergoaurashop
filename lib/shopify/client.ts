import { ShopifyFetchOptions, ShopifyResponse } from "./types";

/**
 * Executes a GraphQL query against the Shopify Storefront API.
 */
export async function shopifyFetch<T>({
  query,
  variables,
}: ShopifyFetchOptions): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !storefrontAccessToken) {
    throw new Error(
      "Missing required environment variables for Shopify Storefront API (SHOPIFY_STORE_DOMAIN or SHOPIFY_STOREFRONT_ACCESS_TOKEN)"
    );
  }

  const endpoint = `https://${domain}/api/2025-01/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken,
      },
      body: JSON.stringify({
        query,
        ...(variables && { variables }),
      }),
    });

    if (!response.ok) {
      throw new Error(`Shopify API responded with status: ${response.status}`);
    }

    const json = (await response.json()) as ShopifyResponse<T>;

    if (json.errors && json.errors.length > 0) {
      const errorMessages = json.errors.map((e) => e.message).join("\n");
      throw new Error(`Shopify GraphQL Errors:\n${errorMessages}`);
    }

    return json.data;
  } catch (error) {
    console.error("Error in shopifyFetch:", error);
    throw error;
  }
}
