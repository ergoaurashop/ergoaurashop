// =====================================================================
// Supabase
// =====================================================================
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
export const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// =====================================================================
// Razorpay
// =====================================================================
export const RAZORPAY_KEY_ID = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;
export const RAZORPAY_KEY_SECRET = process.env.RAZORPAY_KEY_SECRET!;
export const RAZORPAY_WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;
export const RAZORPAY_WEBHOOK_URL = "/api/razorpay/webhook";

// =====================================================================
// Business Contact Emails
// =====================================================================
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL!;
export const COMPLAINT_EMAIL = process.env.NEXT_PUBLIC_COMPLAINT_EMAIL!;
export const SUGGESTION_EMAIL = process.env.NEXT_PUBLIC_SUGGESTION_EMAIL!;

// =====================================================================
// Site / SEO / Analytics
// =====================================================================
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL!;
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID!;

/** Default metadata for all pages */
export const SITE_METADATA = {
  title: "ErgoAura Shop",
  description: "Premium wellness products for your everyday comfort.",
  url: SITE_URL,
  logo: "/images/logo/ergoauralogo.webp",
} as const;

// =====================================================================
// DeepSeek AI
// =====================================================================
export const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY!;

// =====================================================================
// Klaviyo (Email Marketing)
// =====================================================================
export const KLAVIYO_CLIENT_ID = process.env.KLAVIYO_CLIENT_ID!;
export const KLAVIYO_CLIENT_SECRET = process.env.KLAVIYO_CLIENT_SECRET!;

// =====================================================================
// Admin Dashboard Credentials
// =====================================================================
export const ADMIN_USERNAME = process.env.ADMIN_USERNAME!;
export const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD!;

// =====================================================================
// Runtime Validation — crash on startup if required vars are missing
// =====================================================================
const REQUIRED_PUBLIC_VARS = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_RAZORPAY_KEY_ID",
  "NEXT_PUBLIC_CONTACT_EMAIL",
  "NEXT_PUBLIC_SITE_URL",
] as const;

const REQUIRED_SERVER_VARS = [
  "SUPABASE_SERVICE_ROLE_KEY",
  "RAZORPAY_KEY_SECRET",
  "RAZORPAY_WEBHOOK_SECRET",
  "DEEPSEEK_API_KEY",
  "ADMIN_USERNAME",
  "ADMIN_PASSWORD",
] as const;

export function validateEnv(): void {
  if (typeof window !== "undefined") return; // only run on server

  const missing: string[] = [];

  for (const key of REQUIRED_PUBLIC_VARS) {
    if (!process.env[key]) missing.push(key);
  }
  for (const key of REQUIRED_SERVER_VARS) {
    if (!process.env[key]) missing.push(key);
  }

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables:\n  ${missing.join("\n  ")}`,
    );
  }
}
