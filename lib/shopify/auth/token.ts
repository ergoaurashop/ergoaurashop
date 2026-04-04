/**
 * lib/shopify/auth/token.ts
 * 
 * Helper for exchanging the OAuth authorization code for an access token.
 */

interface ShopifyTokenResponse {
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
  scope: string;
}

export async function exchangeCodeForToken(
  code: string,
  codeVerifier: string
): Promise<ShopifyTokenResponse> {
  const shopId = process.env.SHOPIFY_SHOP_ID;
  const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID;
  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`;

  if (!shopId || !clientId) {
    throw new Error("Missing Shopify Shop ID or Client ID");
  }

  const tokenEndpoint = `https://shopify.com/${shopId}/auth/oauth/token`;
  
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: clientId,
    redirect_uri: redirectUri,
    code,
    code_verifier: codeVerifier,
  });

  const response = await fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("Token exchange failed:", text);
    throw new Error(`Token exchange failed: ${response.status} ${text}`);
  }

  return response.json();
}
