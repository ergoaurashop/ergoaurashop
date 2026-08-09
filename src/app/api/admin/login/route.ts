import crypto from "crypto";
import { NextResponse } from "next/server";
import { ADMIN_USERNAME, ADMIN_PASSWORD } from "@/lib/constants";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
  isLoginRateLimited,
  recordFailedLogin,
  recordSuccessfulLogin,
} from "@/lib/admin-session";

/**
 * POST /api/admin/login
 *
 * Validates admin credentials ONCE and issues an httpOnly, signed session
 * cookie. The admin password is never sent on subsequent requests.
 *
 * Hardening applied:
 *   - Timing-safe credential comparison (SHA-256 + timingSafeEqual)
 *   - In-memory rate limiting per client IP (5 failed attempts → 15 min lockout)
 *   - httpOnly + SameSite=Lax cookie; Secure in production
 */
function safeEqual(a: unknown, b: unknown): boolean {
  const aHash = crypto
    .createHash("sha256")
    .update(String(a ?? ""))
    .digest();
  const bHash = crypto
    .createHash("sha256")
    .update(String(b ?? ""))
    .digest();
  return crypto.timingSafeEqual(aHash, bHash);
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { username, password } = body as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 },
      );
    }

    // ── Rate limiting (before any work that costs CPU/DB) ──────────
    if (isLoginRateLimited(request)) {
      return NextResponse.json(
        { error: "Too many failed attempts. Please try again in 15 minutes." },
        { status: 429 },
      );
    }

    const valid =
      safeEqual(username, ADMIN_USERNAME) && safeEqual(password, ADMIN_PASSWORD);

    if (!valid) {
      recordFailedLogin(request);
      console.warn("[AdminLogin] Failed login attempt");
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    recordSuccessfulLogin(request);

    const response = NextResponse.json({ success: true });

    response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSession(), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: ADMIN_SESSION_MAX_AGE,
    });

    // Sliding expiration is not implemented; refresh the expiry on each login.
    console.log("[AdminLogin] Admin signed in successfully");
    return response;
  } catch (err) {
    console.error(
      "[AdminLogin] Unexpected error:",
      err instanceof Error ? err.message : err,
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
