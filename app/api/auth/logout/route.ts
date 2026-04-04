import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * Shopify Logout handler.
 * Clears the session cookies for the root domain and redirects to the homepage.
 */
export async function GET() {
  const cookieStore = await cookies();

  // 1. Clear session cookies on root domain
  cookieStore.delete({ name: "shopify_accessToken", domain: ".ergoaurashop.com" });
  cookieStore.delete({ name: "shopify_refreshToken", domain: ".ergoaurashop.com" });
  cookieStore.delete({ name: "shopify_idToken", domain: ".ergoaurashop.com" });

  // 2. Clear PKCE and Auth state cookies
  cookieStore.delete("shopify_auth_state");
  cookieStore.delete("shopify_code_verifier");

  // 3. Redirect home
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/`);
}
