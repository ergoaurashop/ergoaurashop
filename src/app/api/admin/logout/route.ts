import { NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE } from "@/lib/admin-session";

/**
 * POST /api/admin/logout
 *
 * Clears the admin session cookie. The signed token is stateless, so the
 * server simply expires it in the browser.
 */
export async function POST() {
  const response = NextResponse.json({ success: true });

  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });

  return response;
}
