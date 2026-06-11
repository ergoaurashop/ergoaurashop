# ErgoAura Shop — Environment Variables & Configuration Plan

## Objective

Eliminate all hardcoded variables from source code by centralizing them in environment variables (`.env.local`) and a typed configuration module (`src/lib/constants.ts`). This ensures security, portability across environments (dev/production), and compliance with best practices.

---

## 1. Complete `.env.local` Template

Below is the full list of environment variables for the project. All values provided by you are filled in. Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser; all others are server-only.

```env
# =====================================================================
# SUPABASE — Database, Auth, Storage
# =====================================================================
NEXT_PUBLIC_SUPABASE_URL=https://alweuvyldykkcgosihoh.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsd2V1dnlsZHlra2Nnb3NpaG9oIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEwODE5NDAsImV4cCI6MjA5NjY1Nzk0MH0._DGw9FHZBchUWniEFEN6x7uqPAU5zGXsoJP6772nnWI
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsd2V1dnlsZHlra2Nnb3NpaG9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTA4MTk0MCwiZXhwIjoyMDk2NjU3OTQwfQ.p8wnxfjtGOWuZm7MqARj92Mhuw6qTMIZ_hpYZkJUQ90

# =====================================================================
# RAZORPAY — Payment Processing
# =====================================================================
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_Sml5gaGl1J409a
RAZORPAY_KEY_SECRET=DJqfFJpD22IENkcfmXHpyKsP
RAZORPAY_WEBHOOK_SECRET=snQdNKBbi9gc_vc

# =====================================================================
# BUSINESS CONTACT EMAILS — Displayed on site (contact page, footer)
# =====================================================================
NEXT_PUBLIC_CONTACT_EMAIL=info@ergoaurashop.com
NEXT_PUBLIC_COMPLAINT_EMAIL=customer@ergoaurashop.com
NEXT_PUBLIC_SUGGESTION_EMAIL=suggessions@ergoaurashop.com

# =====================================================================
# SITE — URL, Analytics, SEO
# =====================================================================
NEXT_PUBLIC_SITE_URL=https://ergoaurashop.com
NEXT_PUBLIC_GA4_ID=G-N6JQH432PP

# =====================================================================
# DEEPSEEK — AI Assistant / Chat
# =====================================================================
DEEPSEEK_API_KEY=sk-c3b70b23a599435982baa4907a1d31a0

# =====================================================================
# KLAVIYO — Email Marketing
# =====================================================================
KLAVIYO_CLIENT_ID=4c1e365d-981d-4c6c-b6a7-5ea32150c6eb
KLAVIYO_CLIENT_SECRET=QU5AYoXnMI6-F9CdwEMB4W8UzYVbNN_LAQIYRQmVb7FqdYdBBoMzq4bJA2bQ2ta2l9Kd9qfEKfYnKkkg3i3NEA

# =====================================================================
# ADMIN DASHBOARD — Hardcoded credentials replaced with env vars
# =====================================================================
ADMIN_USERNAME=MyonMee
ADMIN_PASSWORD=MyonMee@2029
```

---

## 2. Centralized Constants Module — `src/lib/constants.ts`

All environment variables are accessed through a single typed module. No `process.env` calls exist anywhere else in the codebase.

```typescript
// src/lib/constants.ts

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
```

---

## 3. Supabase Client — `src/lib/supabase/client.ts`

Initializes the Supabase client using environment variables from the constants module.

```typescript
// src/lib/supabase/client.ts
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON_KEY } from "@/lib/constants";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

For server-side operations that need the service role (e.g., webhook handlers, admin routes):

```typescript
// src/lib/supabase/admin.ts
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY } from "@/lib/constants";

export const supabaseAdmin = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_ROLE_KEY,
);
```

---

## 4. Where Variables Are Used

| Variable                        | Used In                                                  | Category  |
| ------------------------------- | -------------------------------------------------------- | --------- |
| `NEXT_PUBLIC_SUPABASE_URL`      | `src/lib/supabase/client.ts`, `admin.ts`                 | Database  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `src/lib/supabase/client.ts`                             | Database  |
| `SUPABASE_SERVICE_ROLE_KEY`     | `src/lib/supabase/admin.ts` (webhooks, admin)            | Database  |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID`   | Checkout page, Razorpay checkout modal                   | Payment   |
| `RAZORPAY_KEY_SECRET`           | `src/app/api/razorpay/route.ts` (create order)           | Payment   |
| `RAZORPAY_WEBHOOK_SECRET`       | `src/app/api/razorpay/webhook/route.ts` (verify webhook) | Payment   |
| `NEXT_PUBLIC_CONTACT_EMAIL`     | Footer, Contact page, Terms page                         | Business  |
| `NEXT_PUBLIC_COMPLAINT_EMAIL`   | Footer, Contact page, Terms page (grievance officer)     | Business  |
| `NEXT_PUBLIC_SUGGESTION_EMAIL`  | Contact page                                             | Business  |
| `NEXT_PUBLIC_SITE_URL`          | SEO metadata, OG images, sitemap generation              | Site      |
| `NEXT_PUBLIC_GA4_ID`            | Root layout — Google Analytics script                    | Analytics |
| `DEEPSEEK_API_KEY`              | `src/lib/ai.ts` — AI chat/assistant API                  | AI        |
| `KLAVIYO_CLIENT_ID`             | Newsletter signup, email marketing integration           | Marketing |
| `KLAVIYO_CLIENT_SECRET`         | Server-side Klaviyo API calls                            | Marketing |
| `ADMIN_USERNAME`                | `src/app/masteradminmyo/page.tsx` (auth check)           | Admin     |
| `ADMIN_PASSWORD`                | `src/app/masteradminmyo/page.tsx` (auth check)           | Admin     |

---

## 5. Additional Keys Recommended for a Smooth Production Site

After reviewing all the services you've configured, here are the **optional but strongly recommended** additions:

### 5.1 Google reCAPTCHA (FREE) — Checkout Spam Protection

Without this, bots can submit fake orders. The checkout form (name, email, phone, address) is exposed to the public. reCAPTCHA v3 is invisible to users and costs nothing.

- Site: https://www.google.com/recaptcha/admin
- Adds 2 env vars:
  ```
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY=<your_site_key>
  RECAPTCHA_SECRET_KEY=<your_secret_key>
  ```

### 5.2 Sentry (FREE tier) — Error Tracking

When the site goes live and a customer encounters a blank page or error, Sentry tells you exactly what broke, on which browser, and what the user was doing. Essential for production.

- Site: https://sentry.io
- Adds 1 env var:
  ```
  NEXT_PUBLIC_SENTRY_DSN=<your_dsn>
  ```

### 5.3 Vercel Environment Variables (already handled by deployment)

When you deploy to Vercel, copy all the entries from `.env.local` into Vercel's **Environment Variables** dashboard. This is a one-time setup per branch (production/preview).

---

## 6. Security & Housekeeping

### 6.1 `.gitignore` — Never commit `.env.local`

Add these entries to your root `.gitignore` (if not already present):

```gitignore
# Environment variables
.env.local
.env*.local

# Secrets
*.pem
*.key
```

### 6.2 `.env.example` — Template for other developers

Create a `.env.example` file with placeholder values so other developers know what variables to configure:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxx
RAZORPAY_KEY_SECRET=your-razorpay-secret
RAZORPAY_WEBHOOK_SECRET=your-webhook-secret

# Business Emails
NEXT_PUBLIC_CONTACT_EMAIL=info@example.com
NEXT_PUBLIC_COMPLAINT_EMAIL=customer@example.com
NEXT_PUBLIC_SUGGESTION_EMAIL=suggestions@example.com

# Site
NEXT_PUBLIC_SITE_URL=https://ergoaurashop.com
NEXT_PUBLIC_GA4_ID=G-XXXXXXXXXX

# DeepSeek AI
DEEPSEEK_API_KEY=sk-your-key

# Klaviyo
KLAVIYO_CLIENT_ID=your-client-id
KLAVIYO_CLIENT_SECRET=your-client-secret

# Admin Dashboard
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your-password
```

### 6.3 Deployment Checklist (Vercel)

When deploying to Vercel, you must manually add ALL the above environment variables in the Vercel Project Dashboard > Settings > Environment Variables.

**Important distinction:**

- Variables starting with `NEXT_PUBLIC_` → must be checked **"Available to Client-Side"**
- Variables WITHOUT `NEXT_PUBLIC_` → must be **unchecked** (server-only)

---

## 7. Implementation Steps for Code Mode

```mermaid
flowchart TD
    A[Start: Initialize Next.js project] --> B[Create .env.local with all values]
    B --> C[Create .env.example with placeholders]
    C --> D[Update .gitignore to exclude .env*.local]
    D --> E[Create src/lib/constants.ts - typed config module]
    E --> F[Create src/lib/supabase/client.ts - anon client]
    F --> G[Create src/lib/supabase/admin.ts - service role client]
    G --> H[Update all components to use constants.ts instead of hardcoded values]
    H --> I[Add validateEnv call in next.config or root layout]
    I --> J[Deploy to Vercel with env vars configured]
```

### Checklist for Code Mode:

1. **Initialize project** — `npx create-next-app@latest . --typescript --tailwind --app`
2. **Install packages** — `npm install @supabase/supabase-js razorpay framer-motion zustand`
3. **Create `.env.local`** with all values from Section 1
4. **Create `.env.example`** with placeholder values (Section 6.2)
5. **Update `.gitignore`** (Section 6.1)
6. **Create `src/lib/constants.ts`** (Section 2)
7. **Create `src/lib/supabase/client.ts`** (Section 3)
8. **Create `src/lib/supabase/admin.ts`** (Section 3)
9. **Optional**: Add reCAPTCHA (Section 5.1) and Sentry (Section 5.2)
10. **Verify**: No `process.env` calls exist outside `constants.ts`
11. **Verify**: No hardcoded emails, keys, or URLs exist in any component

---

## Appendix: Complete Variable Inventory

| #   | Variable                         | Value                                      | Public?     | Status         |
| --- | -------------------------------- | ------------------------------------------ | ----------- | -------------- |
| 1   | `NEXT_PUBLIC_SUPABASE_URL`       | `https://alweuvyldykkcgosihoh.supabase.co` | ✅ Provided |
| 2   | `NEXT_PUBLIC_SUPABASE_ANON_KEY`  | _(anon key)_                               | ✅          | ✅ Provided    |
| 3   | `SUPABASE_SERVICE_ROLE_KEY`      | _(service role)_                           | ❌          | ✅ Provided    |
| 4   | `NEXT_PUBLIC_RAZORPAY_KEY_ID`    | `rzp_live_Sml5gaGl1J409a`                  | ✅          | ✅ Provided    |
| 5   | `RAZORPAY_KEY_SECRET`            | `DJqfFJpD22IENkcfmXHpyKsP`                 | ❌          | ✅ Provided    |
| 6   | `RAZORPAY_WEBHOOK_SECRET`        | `snQdNKBbi9gc_vc`                          | ❌          | ✅ Provided    |
| 7   | `NEXT_PUBLIC_CONTACT_EMAIL`      | `info@ergoaurashop.com`                    | ✅          | ✅ Provided    |
| 8   | `NEXT_PUBLIC_COMPLAINT_EMAIL`    | `customer@ergoaurashop.com`                | ✅          | ✅ Provided    |
| 9   | `NEXT_PUBLIC_SUGGESTION_EMAIL`   | `suggessions@ergoaurashop.com`             | ✅          | ✅ Provided    |
| 10  | `NEXT_PUBLIC_SITE_URL`           | `https://ergoaurashop.com`                 | ✅          | ✅ Provided    |
| 11  | `NEXT_PUBLIC_GA4_ID`             | `G-N6JQH432PP`                             | ✅          | ✅ Provided    |
| 12  | `DEEPSEEK_API_KEY`               | `sk-c3b70b23a5994...`                      | ❌          | ✅ Provided    |
| 13  | `KLAVIYO_CLIENT_ID`              | `4c1e365d-981d-4c6c...`                    | ❌          | ✅ Provided    |
| 14  | `KLAVIYO_CLIENT_SECRET`          | `QU5AYoXnMI6-...`                          | ❌          | ✅ Provided    |
| 15  | `ADMIN_USERNAME`                 | `MyonMee`                                  | ❌          | ✅ Provided    |
| 16  | `ADMIN_PASSWORD`                 | `MyonMee@2029`                             | ❌          | ✅ Provided    |
| 17  | `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | _(from Google)_                            | ✅          | ⬜ Recommended |
| 18  | `RECAPTCHA_SECRET_KEY`           | _(from Google)_                            | ❌          | ⬜ Recommended |
| 19  | `NEXT_PUBLIC_SENTRY_DSN`         | _(from Sentry)_                            | ✅          | ⬜ Recommended |
