"use client";

// ────────────────────────────────────────────────────────────────
// Cookie Reader — Client-Side
//
// CRITICAL RULE: _fbp and _fbc are NEVER hashed.
// They go to Meta raw as-is for EMQ matching.
// ────────────────────────────────────────────────────────────────

/**
 * Read a cookie value by name.
 * Safe to call server-side — returns undefined if window is undefined.
 *
 * @param {string} name
 * @returns {string|undefined}
 */
export function getCookie(name) {
  if (typeof window === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${encodeURIComponent(name)}=([^;]*)`),
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

/**
 * Get the raw _fbp cookie value (for Meta's browser matching).
 * Returns undefined if the cookie doesn't exist.
 *
 * @returns {string|undefined}
 */
export function getFbp() {
  return getCookie("_fbp");
}

/**
 * Get the raw _fbc cookie value (for Meta's click ID matching).
 * Only present when the user arrived via a Facebook ad click (fbclid).
 * Returns undefined (not empty string) if the cookie doesn't exist.
 *
 * @returns {string|undefined}
 */
export function getFbc() {
  return getCookie("_fbc");
}

/**
 * Get both _fbp and _fbc in a single call.
 * Both are optional — returns only what's available.
 *
 * @returns {{ fbp?: string, fbc?: string }}
 */
export function getClientData() {
  return {
    fbp: getFbp(),
    fbc: getFbc(),
  };
}
