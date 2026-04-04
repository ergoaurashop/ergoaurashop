import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Shopify Logout handler.
 * Clears the session cookies and redirects to the homepage.
 */
export async function GET() {
  const cookieStore = await cookies();

  // 1. Clear session cookies
  cookieStore.delete("shopify_accessToken");
  cookieStore.delete("shopify_refreshToken");
  cookieStore.delete("shopify_idToken");

  // 2. Clear PKCE and Auth state cookies
  cookieStore.delete("shopify_auth_state");
  cookieStore.delete("shopify_code_verifier");

  // 3. Clear temporary login cookies
  cookieStore.delete("shopify_auth_state");

  // 4. Redirect home
  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/`);
}
