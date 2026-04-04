import { GET_CUSTOMER_QUERY } from "./queries";
import { cookies } from "next/headers";

/**
 * lib/shopify/customer.ts
 * 
 * Fetches the logged-in customer's profile using the Shopify Customer Account API.
 * This is a server-side only function that reads the secure accessToken cookie.
 */

interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: {
    emailAddress: string;
  };
}

/**
 * Fetches the logged-in user profile from the Shopify Customer Account API.
 */
export async function getCustomerProfile(): Promise<CustomerProfile | null> {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("shopify_accessToken")?.value;

  if (!accessToken) {
    return null;
  }

  const shopId = process.env.SHOPIFY_SHOP_ID;
  const endpoint = `https://shopify.com/${shopId}/account/customer/api/2024-10/graphql`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": accessToken, // Important: New Customer API uses the token directly
      },
      body: JSON.stringify({
        query: GET_CUSTOMER_QUERY,
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        // Token expired — return null to signify not logged in
        return null;
      }
      throw new Error(`Customer API error: ${response.status}`);
    }

    const { data } = await response.json();
    return data?.customer || null;
  } catch (err) {
    console.error("Failed to fetch customer profile:", err);
    return null;
  }
}
