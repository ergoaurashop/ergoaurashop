import { generateCodeVerifier, generateCodeChallenge, generateState } from "@/lib/shopify/auth/pkce";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Initiates the Shopify New Customer Account OAuth flow.
 * Redirects the user to the Shopify-hosted login page.
 */
export async function GET(request: Request) {
  const shopId = process.env.SHOPIFY_SHOP_ID?.trim();
  const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID?.trim();
  
  // Use the request origin to stay on the same domain (e.g. Vercel preview vs Production)
  const { origin } = new URL(request.url);
  const redirectUri = `${origin}/api/auth/callback`;

  if (!shopId || !clientId) {
    return NextResponse.json({ error: "Shopify OIDC configuration missing" }, { status: 500 });
  }

  // 1. Generate PKCE values
  const codeVerifier = generateCodeVerifier();
  const codeChallenge = await generateCodeChallenge(codeVerifier);
  const state = generateState();

  // 2. Store verifier and state in secure, temporary cookies
  const cookieStore = await cookies();
  
  // Set code verifier (Expires in 15 mins)
  cookieStore.set("shopify_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 15 * 60,
  });

  // Set state for CSRF protection
  cookieStore.set("shopify_auth_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 15 * 60,
  });

  // 3. Build Shopify Auth URL
  const authUrl = new URL(`https://shopify.com/${shopId}/auth/oauth/authorize`);
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("scope", "openid email https://api.customers.com/auth/customer.graphql");
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("redirect_uri", redirectUri);
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("code_challenge", codeChallenge);
  authUrl.searchParams.set("code_challenge_method", "S256");

  // 4. Redirect the user to Shopify
  return NextResponse.redirect(authUrl.toString());
}
