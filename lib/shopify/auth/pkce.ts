/**
 * lib/shopify/auth/pkce.ts
 * 
 * Implements Proof Key for Code Exchange (PKCE) for the Shopify New Customer Account API.
 * This is a mandatory security layer for OAuth 2.0.
 */

/**
 * Generates a random unguessable string for the code verifier.
 */
export function generateCodeVerifier(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}

/**
 * Creates a code challenge from a code verifier using SHA-256.
 */
export async function generateCodeChallenge(verifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(verifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(new Uint8Array(hash));
}

/**
 * Standard Base64URL encoding (no padding, URL-safe characters)
 */
function base64UrlEncode(array: Uint8Array): string {
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Generates a random state string for CSRF protection.
 */
export function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return base64UrlEncode(array);
}
