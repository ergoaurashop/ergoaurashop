import crypto from "crypto";

/**
 * Server-only admin session helpers.
 *
 * Sessions are stateless, HMAC-signed tokens stored in an httpOnly cookie
 * (`admin_session`). No database table or external service is required.
 *
 * Signing key resolution order:
 *   1. `ADMIN_SESSION_SECRET` env var (optional hardening — set it to rotate
 *      session keys without touching the admin password)
 *   2. A key derived from existing server-only secrets (zero manual setup)
 *
 * Deriving from the admin password is intentional: anyone who knows the
 * password can already mint a session, so the password is a valid source of
 * key material. Changing the password automatically invalidates all sessions.
 */

export const ADMIN_SESSION_COOKIE = "admin_session";

/** Session lifetime: 12 hours. */
export const ADMIN_SESSION_TTL_MS = 12 * 60 * 60 * 1000;

/** Maximum age sent to the browser (seconds). */
export const ADMIN_SESSION_MAX_AGE = Math.floor(ADMIN_SESSION_TTL_MS / 1000);

function getSigningKey(): Buffer {
  if (process.env.ADMIN_SESSION_SECRET) {
    return crypto
      .createHash("sha256")
      .update(process.env.ADMIN_SESSION_SECRET)
      .digest();
  }

  const material = [
    process.env.ADMIN_PASSWORD || "",
    process.env.SUPABASE_SERVICE_ROLE_KEY || "",
    process.env.RAZORPAY_KEY_SECRET || "",
    "ergoaura-admin-session-v1",
  ].join("::");

  return crypto.createHash("sha256").update(material).digest();
}

function toBase64Url(buf: Buffer): string {
  return buf.toString("base64url");
}

/**
 * Mint a signed session token.
 * Payload is a small JSON object: `{ iat, exp }`.
 * Format: `base64url(payload).base64url(hmac-sha256(payload))`
 */
export function createAdminSession(): string {
  const payload = toBase64Url(
    Buffer.from(
      JSON.stringify({
        iat: Date.now(),
        exp: Date.now() + ADMIN_SESSION_TTL_MS,
      }),
    ),
  );

  const signature = toBase64Url(
    crypto.createHmac("sha256", getSigningKey()).update(payload).digest(),
  );

  return `${payload}.${signature}`;
}

/**
 * Verify a session token.
 * - Recomputes the HMAC and compares with a timing-safe comparison
 * - Rejects expired tokens and malformed values
 */
export function verifyAdminSession(
  token: string | undefined | null,
): boolean {
  if (!token) return false;

  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expected = crypto
    .createHmac("sha256", getSigningKey())
    .update(payload)
    .digest();

  let provided: Buffer;
  try {
    provided = Buffer.from(signature, "base64url");
  } catch {
    return false;
  }

  if (expected.length !== provided.length) return false;
  if (!crypto.timingSafeEqual(expected, provided)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString()) as {
      exp?: unknown;
    };
    return typeof parsed.exp === "number" && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

// ============================================================================
// In-memory login rate limiting
//
// Limits failed login attempts per client IP. This is process-local memory:
// it resets on redeploy and is per serverless instance. That is acceptable
// basic protection for a single-admin dashboard with no external store
// required. For stronger, shared throttling, swap this for a Supabase table
// or Upstash Redis — the call sites in the login route are the only place
// that needs changing.
// ============================================================================

const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_WINDOW_MS = 15 * 60 * 1000; // lockout window length
const MAX_TRACKED_IPS = 10_000; // bound memory usage

interface LoginAttempt {
  count: number;
  firstAt: number;
}

const failedAttempts = new Map<string, LoginAttempt>();

function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return request.headers.get("x-real-ip") || "unknown";
}

function sweepStaleAttempts(now: number): void {
  if (failedAttempts.size < MAX_TRACKED_IPS) return;
  failedAttempts.forEach((attempt, ip) => {
    if (now - attempt.firstAt > LOCKOUT_WINDOW_MS) {
      failedAttempts.delete(ip);
    }
  });
}

/** Returns true when the client is currently locked out. */
export function isLoginRateLimited(request: Request): boolean {
  const ip = getClientIp(request);
  const now = Date.now();

  sweepStaleAttempts(now);

  const attempt = failedAttempts.get(ip);
  if (!attempt) return false;

  if (now - attempt.firstAt > LOCKOUT_WINDOW_MS) {
    failedAttempts.delete(ip);
    return false;
  }

  return attempt.count >= MAX_FAILED_ATTEMPTS;
}

/** Record a failed login for the requesting client. */
export function recordFailedLogin(request: Request): void {
  const ip = getClientIp(request);
  const now = Date.now();

  const existing = failedAttempts.get(ip);
  if (!existing) {
    failedAttempts.set(ip, { count: 1, firstAt: now });
    return;
  }

  if (now - existing.firstAt > LOCKOUT_WINDOW_MS) {
    failedAttempts.set(ip, { count: 1, firstAt: now });
    return;
  }

  existing.count += 1;
}

/** Clear any failed-attempt record after a successful login. */
export function recordSuccessfulLogin(request: Request): void {
  const ip = getClientIp(request);
  failedAttempts.delete(ip);
}
