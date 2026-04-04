import { exchangeCodeForToken } from "@/lib/shopify/auth/token";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

/**
 * Shopify OAuth Callback handler.
 * Receives the authorization code, exchanges it for tokens, and sets secure cookies.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  if (error) {
    console.error("Shopify OAuth Error:", error);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/?error=auth_failed`);
  }

  if (!code || !state) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/?error=missing_params`);
  }

  // 1. Verify CSRF state and get code verifier
  const cookieStore = await cookies();
  const storedState = cookieStore.get("shopify_auth_state")?.value;
  const codeVerifier = cookieStore.get("shopify_code_verifier")?.value;

  if (!storedState || state !== storedState || !codeVerifier) {
    console.error("Auth mismatch or missing verifier");
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/?error=invalid_session`);
  }

  try {
    // 2. Exchange code for access tokens
    const origin = request.nextUrl.origin;
    const redirectUri = `${origin}/api/auth/callback`;
    const { access_token, refresh_token, id_token, expires_in } = await exchangeCodeForToken(code, codeVerifier, redirectUri);

    // 3. Clear temporary PKCE cookies
    cookieStore.delete("shopify_auth_state");
    cookieStore.delete("shopify_code_verifier");

    // 4. Set persistent secure session cookies
    // Access Token (HttpOnly, Secure)
    cookieStore.set("shopify_accessToken", access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: expires_in,
      domain: ".ergoaurashop.com", // Share session across subdomains
    });

    // Refresh Token (Longer lived, for persistent login)
    cookieStore.set("shopify_refreshToken", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      domain: ".ergoaurashop.com",
    });

    // ID Token (Can be exposed if needed, but we'll stick to HttpOnly)
    cookieStore.set("shopify_idToken", id_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60,
      domain: ".ergoaurashop.com",
    });

    // 5. Success! Redirect to homepage
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/`);
  } catch (err) {
    console.error("Callback processing failed:", err);
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/?error=token_exchange_failed`);
  }
}
