# ErgoAura Meta CAPI + Ads Master Architecture

## Roo Code Production-Grade Implementation Guide

### Version: 1.0 | Platform: Next.js | Market: India | Goal: ROAS 10x+

---

## ⚠️ ABSOLUTE CONSTRAINTS — READ BEFORE WRITING ONE LINE OF CODE

```
STRICT RULES FOR ROO CODE:
1. ZERO modification to existing pages, components, routes, or DB schema
2. ALL new files go in isolated lib/meta/, components/meta/, app/api/meta-*/
3. NEVER import new meta modules into existing files without explicit instruction
4. NEVER modify existing API routes, middleware, or layout.js structure
5. ALWAYS wrap every new feature behind feature flags (env vars)
6. NEVER expose META_CAPI_TOKEN to client — server-side only, always
7. ALL changes must be additive only — no deletions, no refactors
8. Each build task must be independently testable before wiring to production

EXCEPTIONS (audited from existing codebase):
9. Rule 7 exception — The existing inline Pixel script in src/app/layout.tsx:138-161
   MUST be REMOVED and replaced with <MetaPixel /> component import. The old script
   fires PageView without eventID which breaks deduplication. This is a replacement,
   not a refactor of existing logic.
10. DEPENDENCY — Install 'uuid' package (npm install uuid) for event_id generation.
   Alternative: use Node's built-in crypto.randomUUID() which is available in Node 19+
   (used by Vercel). Prefer crypto.randomUUID() to avoid extra dependency.
```

---

## SECTION 1: STRATEGIC FOUNDATION — WHY THIS SYSTEM EXISTS

### Business Goal

Every ₹1 spent on Meta Ads must return ₹10+. This requires:

- **Signal Quality:** Meta's algorithm learns from ACCURATE data. Garbage in = garbage ROAS.
- **Deduplication:** No double-counting. Double-counting corrupts the algorithm's reward model.
- **Coverage:** Every purchase must reach Meta — even if the customer closes the browser tab.
- **Matching:** 10/10 EMQ (Event Match Quality) score. More signals = Meta finds better buyers.

### The Technical Architecture in One Sentence

Browser Pixel fires on the client → Server CAPI fires simultaneously from Next.js API → Both events carry the same `event_id` → Meta deduplicates them into one accurate signal.

---

## SECTION 2: META DASHBOARD PRE-CONFIGURATION (Manual — Done Before Code)

### 2.1 Meta Business Manager

- URL: business.facebook.com
- All assets (Pixel, Ad Account, Catalogue, Pages) must live under ONE Business Manager
- Confirm ErgoAura has its own Business Account (not personal)

### 2.2 Pixel Setup

- Events Manager → Connect Data Sources → Web → Meta Pixel
- Name: `ErgoAura Web Pixel`
- Website: `ergoaurashop.com`
- Verify domain is confirmed under Events Manager → Settings

### 2.3 CAPI Access Token

- Events Manager → Your Pixel → Settings → Conversions API → Generate Access Token
- Store immediately — shown only once
- Add to `.env.local`:
  ```
  META_PIXEL_ID=your_pixel_id
  META_CAPI_TOKEN=your_access_token
  META_TEST_EVENT_CODE=TEST12345
  NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id
  ```

### 2.4 Event Priority — Automatic (Account Updated)

Meta has removed manual event prioritization for this account.
Their AI automatically manages event priority based on campaign objective.

**ACTION:** Skip this step. Focus on Test Events verification instead.

### 2.5 Product Catalogue

- Commerce Manager → Catalogues → Create → E-commerce
- Name: `ErgoAura Products`
- Data Source Type: Scheduled Feed
- Feed URL: `https://ergoaurashop.com/api/meta-catalog`
- Fetch Frequency: Every hour
- Connect to Ad Account for Dynamic Product Ads

### 2.6 Test Events

- Events Manager → Test Events tab
- Note Test Event Code (e.g. `TEST12345`)
- Used ONLY in development — auto-excluded in production via `NODE_ENV` check

---

## SECTION 3: ENVIRONMENT VARIABLES — COMPLETE SPEC

```env
# Server-side only (NEVER prefix with NEXT_PUBLIC_)
META_PIXEL_ID=your_pixel_id_here
META_CAPI_TOKEN=your_access_token_here
META_TEST_EVENT_CODE=TEST12345

# Client-side (safe to expose — Pixel ID only, never the token)
NEXT_PUBLIC_META_PIXEL_ID=your_pixel_id_here

# Feature Flags (set to 'true' to enable, 'false' to disable without code changes)
META_CAPI_ENABLED=true
META_PIXEL_ENABLED=true
META_CATALOG_ENABLED=true
META_RETRY_ENABLED=true
```

---

## SECTION 4: FILE STRUCTURE — ALL NEW FILES (Zero Touch to Existing)

```
lib/
  meta/
    hash.js           ← All SHA256 hashing + normalisation utilities
    cookies.js        ← Client-side _fbp/_fbc cookie readers
    capi.js           ← Server-side CAPI sender with retry logic
    pixel.js          ← Client-side event helper (fires both pixel + CAPI)
    queue.js          ← Failed event queue manager (DB-backed)

components/
  meta/
    MetaPixel.jsx     ← Layout-level Pixel script loader + PageView tracker

app/
  api/
    meta-capi/
      route.js        ← POST handler: receives from frontend, sends to Meta
    meta-catalog/
      route.js        ← GET handler: XML product feed for Meta Commerce
    webhooks/
      razorpay/
        route.js      ← Razorpay payment.captured → fires CAPI Purchase
    meta-retry/
      route.js        ← Cron-triggered: processes failed events from DB queue
```

**DB additions required (additive only — new tables, no modifications):**

```sql
-- New table: meta_event_queue (failed events for retry)
CREATE TABLE meta_event_queue (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name VARCHAR(100) NOT NULL,
  payload JSONB NOT NULL,
  attempts INTEGER DEFAULT 0,
  last_attempted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status VARCHAR(20) DEFAULT 'pending' -- pending | sent | failed
);

-- Add columns to orders table (additive only)
ALTER TABLE orders ADD COLUMN IF NOT EXISTS capi_event_id VARCHAR(100);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS fbp VARCHAR(200);
ALTER TABLE orders ADD COLUMN IF NOT EXISTS fbc VARCHAR(200);
```

---

## SECTION 5: BUILD TASKS — EXACT SEQUENCE FOR ROO CODE

> **Rule:** Build, test, and verify each task before starting the next.  
> **Rule:** Never skip task order. Each module depends on the previous.

---

### TASK 1: `lib/meta/hash.js` — Hashing + Normalisation Engine

**Purpose:** All PII normalisation and SHA256 hashing. Everything else depends on this.

**Requirements:**

- Use Node's built-in `crypto` module — NO external packages
- All functions must be pure (no side effects)
- Must handle null/undefined inputs gracefully (return undefined, never crash)
- All hashed values returned as hex strings (64 chars)

**Functions to build:**

```javascript
// 1. Core hasher
hashData(value) → SHA256 hex string

// 2. Email: lowercase → trim → hash
hashEmail(email) → hash or undefined

// 3. Phone: India normalisation → hash
// Input formats handled: +91-9876543210, 09876543210, 919876543210, 9876543210
// Output: 10-digit number string → then hashed
hashPhone(phone) → hash or undefined

// 4. Name: lowercase → trim → hash
hashName(name) → hash or undefined

// 5. External ID: toString → trim → hash
hashExternalId(id) → hash or undefined

// 6. City: lowercase → trim → hash
hashCity(city) → hash or undefined

// 7. State: normalise abbreviation to full name → lowercase → hash
// Must include ALL Indian states — see state map below
hashState(state) → hash or undefined

// 8. Pincode: strip spaces → must be exactly 6 digits → hash
hashPincode(pincode) → hash or undefined

// 9. Country: always "in" → hash
hashCountry() → hash of "in"
```

**India Phone Normalisation (exact logic):**

```javascript
const normalisePhone = (phone) => {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("91") && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith("0") && digits.length === 11) digits = digits.slice(1);
  if (digits.length !== 10) return null; // invalid — do not hash
  return digits;
};
```

**Complete India State Map (all states + common misspellings):**

```javascript
const stateMap = {
  // Abbreviations → full names
  dl: "delhi",
  mh: "maharashtra",
  ka: "karnataka",
  tn: "tamil nadu",
  kl: "kerala",
  gj: "gujarat",
  up: "uttar pradesh",
  wb: "west bengal",
  rj: "rajasthan",
  mp: "madhya pradesh",
  hr: "haryana",
  pb: "punjab",
  br: "bihar",
  ts: "telangana",
  ap: "andhra pradesh",
  or: "odisha",
  jh: "jharkhand",
  uk: "uttarakhand",
  hp: "himachal pradesh",
  ga: "goa",
  as: "assam",
  mn: "manipur",
  ml: "meghalaya",
  mz: "mizoram",
  nl: "nagaland",
  sk: "sikkim",
  tr: "tripura",
  ar: "arunachal pradesh",
  ct: "chhattisgarh",
  // Common customer mis-spellings
  maharastra: "maharashtra",
  tamilnadu: "tamil nadu",
  bangaluru: "karnataka",
  bengaluru: "karnataka",
  bengalore: "karnataka",
  tamilnādu: "tamil nadu",
  uttarpradesh: "uttar pradesh",
  andhrapradesh: "andhra pradesh",
  madhyapradesh: "madhya pradesh",
  himachalpradesh: "himachal pradesh",
  jammukashmir: "jammu and kashmir",
  "j&k": "jammu and kashmir",
};
```

**Pincode Normalisation:**

```javascript
const normalisePincode = (pincode) => {
  const digits = String(pincode).replace(/\D/g, "");
  if (digits.length !== 6) return null; // Indian pincodes are always 6 digits
  return digits;
};
```

**Test checklist for Task 1:**

- [ ] `hashEmail('TEST@Gmail.com')` produces same hash as `hashEmail('test@gmail.com')`
- [ ] `hashPhone('+91-9876543210')` === `hashPhone('9876543210')`
- [ ] `hashPhone('09876543210')` === `hashPhone('9876543210')`
- [ ] `hashPhone('invalid')` returns `undefined` (no crash)
- [ ] `hashState('MH')` === `hashState('maharashtra')`
- [ ] `hashPincode('400 001')` === `hashPincode('400001')`
- [ ] `hashPincode('1234')` returns `undefined` (not 6 digits)
- [ ] All functions return `undefined` for `null` / `undefined` input (no crash)

---

### TASK 2: `lib/meta/cookies.js` — Client-Side Cookie Reader

**Purpose:** Read `_fbp` and `_fbc` browser cookies. These push EMQ from 6 → 9+.

**CRITICAL RULE:** `_fbp` and `_fbc` are NEVER hashed. They go to Meta raw as-is.

**Requirements:**

- Client-side only — add `'use client'` directive
- Must be safe to call server-side (return `null` if `window` is undefined)
- `_fbc` may not exist if user arrived organically — return `undefined` (not empty string)

```javascript
// Functions to build:
getCookie(name) → string | undefined
getFbp() → raw _fbp value or undefined
getFbc() → raw _fbc value or undefined (only if fbclid exists in cookie)
getClientData() → { fbp, fbc } — both optional
```

**Test checklist for Task 2:**

- [ ] Returns `undefined` (not empty string) when cookie doesn't exist
- [ ] Works in SSR context without crashing (`typeof window === 'undefined'` guard)
- [ ] Does NOT hash the returned values

---

### TASK 3: `lib/meta/capi.js` — Server-Side CAPI Sender with Retry

**Purpose:** Core engine. Sends events to Meta's CAPI endpoint with retry logic.

**Requirements:**

- Server-side only — never import into client components
- Retry up to 3 times with exponential backoff
- Rate limit (429) gets additional wait time before retry
- On final failure, save to DB queue (via `lib/meta/queue.js`)
- Include `META_TEST_EVENT_CODE` ONLY when `NODE_ENV !== 'production'`
- Timeout: 8 seconds per attempt (use `AbortSignal.timeout(8000)`)

**Meta API Endpoint:**

```
POST https://graph.facebook.com/v19.0/{PIXEL_ID}/events?access_token={TOKEN}
```

**Complete Payload Structure:**

```javascript
{
  data: [{
    event_name: 'Purchase',            // Required
    event_time: Math.floor(Date.now() / 1000), // Unix timestamp
    event_id: 'uuid-v4-here',          // CRITICAL for deduplication
    event_source_url: 'https://ergoaurashop.com/checkout', // Often missed — include always
    action_source: 'website',          // Always 'website' for ErgoAura (no COD)

    user_data: {
      // Layer 1 — Browser (from cookies — raw, never hashed)
      fbp: '_fbp cookie value or undefined',
      fbc: '_fbc cookie value or undefined',

      // Layer 2 — Network (from request headers)
      client_ip_address: 'from x-forwarded-for header',
      client_user_agent: 'from user-agent header',

      // Layer 3 — Customer (ALL SHA256 hashed — wrapped in arrays)
      em: [hashEmail(email)],
      ph: [hashPhone(phone)],
      fn: [hashName(firstName)],
      ln: [hashName(lastName)],
      external_id: [hashExternalId(customerId)],

      // Layer 4 — Location (ALL SHA256 hashed — wrapped in arrays)
      ct: [hashCity(city)],
      st: [hashState(state)],
      zp: [hashPincode(pincode)],
      country: [hashCountry()],         // always hash of "in"
    },

    custom_data: {
      // Event-specific — see per-event specs in Section 7
    }
  }],

  // Only in development — remove in production
  test_event_code: process.env.NODE_ENV !== 'production'
    ? process.env.META_TEST_EVENT_CODE
    : undefined
}
```

**Retry Logic:**

```javascript
const sendWithRetry = async (payload, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await fetch(META_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(8000),
      });

      if (res.ok) return await res.json();

      const error = await res.json().catch(() => ({}));

      if (res.status === 429) {
        // Rate limited — exponential backoff
        await sleep(attempt * 2000);
        continue;
      }

      if (res.status >= 500) {
        // Server error — retry
        await sleep(attempt * 1000);
        continue;
      }

      // 4xx client error — don't retry (bad payload), log and return
      console.error("[Meta CAPI] Client error:", error);
      return null;
    } catch (err) {
      if (attempt === maxRetries) {
        // Final failure — queue for cron retry
        await saveToQueue(payload);
        console.error(
          "[Meta CAPI] Event queued after all retries failed:",
          err.message,
        );
      }
      await sleep(attempt * 1000);
    }
  }
};
```

**Test checklist for Task 3:**

- [ ] Test event code appears in payload when `NODE_ENV=development`
- [ ] Test event code is absent when `NODE_ENV=production`
- [ ] Retries 3 times on 500 errors
- [ ] Saves to queue on final failure
- [ ] Timeout after 8 seconds (don't block customer checkout)
- [ ] `fbp` and `fbc` are passed raw — NOT through `hashData()`
- [ ] `fn`, `ln`, `ct`, `st`, `zp`, `country` are present (not missing)

---

### TASK 4: `lib/meta/queue.js` — Failed Event Queue Manager

**Purpose:** Save failed CAPI events to DB for cron retry. Meta allows events up to 7 days late.

**Requirements:**

- Server-side only
- Uses existing DB connection (Prisma/Supabase — whichever is in the project)
- Marks events as `sent` after successful retry, `failed` after 7 days

```javascript
// Functions to build:
saveToQueue(payload) → saves event to meta_event_queue table
getPendingEvents(limit = 50) → returns events with status 'pending'
markAsSent(id) → updates status to 'sent'
markAsFailed(id) → updates status to 'failed'
incrementAttempts(id) → increments attempts counter + updates last_attempted_at
```

---

### TASK 5: `lib/meta/pixel.js` — Client-Side Event Helper

**Purpose:** Single function the entire codebase calls for every event. Never fire pixel events ad-hoc.

**Requirements:**

- `'use client'` directive
- Generates `event_id` (uuid v4) — same ID sent to both browser pixel AND server CAPI
- Fires browser `fbq()` call
- Simultaneously POSTs to `/api/meta-capi`
- Never throws — wrap everything in try/catch

```javascript
// import { v4 as uuidv4 } from 'uuid'

const trackEvent = async (eventName, customData = {}, userData = {}) => {
  if (!process.env.NEXT_PUBLIC_META_PIXEL_ID) return;

  const eventId = uuidv4();
  const { fbp, fbc } = getClientData(); // from lib/meta/cookies.js

  // 1. Fire browser pixel (client-side)
  if (typeof window !== "undefined" && window.fbq) {
    window.fbq("track", eventName, customData, { eventID: eventId });
  }

  // 2. Fire server CAPI (simultaneous)
  try {
    await fetch("/api/meta-capi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName,
        eventId,
        customData,
        userData: { ...userData, fbp, fbc },
        eventSourceUrl: window.location.href,
      }),
    });
  } catch (err) {
    // Silent fail — never break the customer's journey
    console.error("[Meta Pixel] CAPI post failed:", err.message);
  }
};
```

---

### TASK 6: `app/api/meta-capi/route.js` — POST Handler

**Purpose:** Receives event data from frontend, builds full payload with all 12 user_data fields, sends to Meta.

**Requirements:**

- Extracts IP from `x-forwarded-for` header (site is behind CDN/Vercel proxy)
- Extracts `user-agent` from request headers
- Calls all hash functions from `lib/meta/hash.js`
- Calls `sendWithRetry` from `lib/meta/capi.js`
- NEVER logs PII (email, phone, name) in plaintext — log only event name and event_id
- Returns `200` immediately after queuing (don't make customer wait for Meta's response)

**Request body shape received from frontend:**

```json
{
  "eventName": "Purchase",
  "eventId": "uuid-v4",
  "customData": { "value": 2999, "currency": "INR", "content_ids": ["SKU001"] },
  "userData": {
    "email": "customer@email.com",
    "phone": "9876543210",
    "firstName": "Rahul",
    "lastName": "Sharma",
    "customerId": "cust_123",
    "city": "Mumbai",
    "state": "MH",
    "pincode": "400001",
    "fbp": "_fbp.1.xxx.xxx",
    "fbc": "_fbc.1.xxx.xxx"
  },
  "eventSourceUrl": "https://ergoaurashop.com/order-success"
}
```

**CRITICAL — field-by-field assembly in the route:**

```javascript
const user_data = {
  // Raw — NEVER hash these two
  fbp: body.userData.fbp || undefined,
  fbc: body.userData.fbc || undefined,

  // Network — from request headers
  client_ip_address: req.headers.get("x-forwarded-for")?.split(",")[0]?.trim(),
  client_user_agent: req.headers.get("user-agent"),

  // Hashed PII — arrays
  em: body.userData.email ? [hashEmail(body.userData.email)] : undefined,
  ph: body.userData.phone ? [hashPhone(body.userData.phone)] : undefined,
  fn: body.userData.firstName ? [hashName(body.userData.firstName)] : undefined,
  ln: body.userData.lastName ? [hashName(body.userData.lastName)] : undefined,
  external_id: body.userData.customerId
    ? [hashExternalId(body.userData.customerId)]
    : undefined,
  ct: body.userData.city ? [hashCity(body.userData.city)] : undefined,
  st: body.userData.state ? [hashState(body.userData.state)] : undefined,
  zp: body.userData.pincode ? [hashPincode(body.userData.pincode)] : undefined,
  country: [hashCountry()], // always "in"
};
```

---

### TASK 7: `components/meta/MetaPixel.jsx` — Layout-Level Pixel Loader

**Purpose:** Loads Meta Pixel script site-wide. Fires `PageView` on every route change.

**Requirements:**

- `'use client'` directive
- Uses `next/script` with `strategy="afterInteractive"` (never blocking)
- Reads `NEXT_PUBLIC_META_PIXEL_ID`
- Uses `usePathname` hook to detect route changes
- Fires `PageView` on every route change via `useEffect`
- Must be added to `app/layout.js` — only modification to existing file (one import + one JSX tag)

**Integration in existing `app/layout.js`:**

```jsx
// Add this import (additive only — nothing else changes)
import MetaPixel from "@/components/meta/MetaPixel";

// Add inside <body> (additive only):
<MetaPixel />;
```

---

### TASK 8: Wire `ViewContent` to Every Product Page

**Purpose:** Fires when a customer views any product page. Required for Dynamic Product Ads.

**Where to add:** In the product page component's `useEffect` on mount.

**NEVER modify the product page's existing logic — only add the trackEvent call.**

```javascript
// Add inside existing product page useEffect or new useEffect:
import { trackEvent } from "@/lib/meta/pixel";

useEffect(() => {
  trackEvent(
    "ViewContent",
    {
      content_ids: [product.sku], // CRITICAL — must match catalogue feed SKU
      content_type: "product",
      content_name: product.name,
      value: product.salePrice, // Use sale price (discounted)
      currency: "INR",
    },
    {
      // Pass customer data if user is logged in
      email: user?.email,
      phone: user?.phone,
      firstName: user?.firstName,
      lastName: user?.lastName,
      customerId: user?.id,
      city: user?.address?.city,
      state: user?.address?.state,
      pincode: user?.address?.pincode,
    },
  );
}, [product.sku]);
```

---

### TASK 9: Wire `AddToCart` to Cart Action

**Purpose:** Fires when customer adds any product to cart.

**Fire from:** The existing cart API route (server-side) simultaneously with the DB insert — most reliable trigger.

**Custom data:**

```javascript
{
  content_ids: [sku],
  content_type: 'product',
  value: price,
  currency: 'INR',
  num_items: quantity,
}
```

---

### TASK 10: Wire `InitiateCheckout` + Store `event_id` in Order Record

**Purpose:** Fires when checkout page loads. CRITICAL — store `event_id` in DB for Razorpay webhook deduplication.

**CRITICAL architecture:**

1. Generate `event_id` (uuid) when checkout session starts
2. Store `event_id`, `fbp`, `fbc` in the order/checkout DB record immediately
3. Fire browser pixel + server CAPI with that same `event_id`
4. When Razorpay webhook fires later — retrieve this `event_id` from DB for Purchase deduplication

**Custom data:**

```javascript
{
  content_ids: cartItems.map(i => i.sku),
  contents: cartItems.map(i => ({ id: i.sku, quantity: i.qty })),
  num_items: totalQty,
  value: totalValue,
  currency: 'INR',
}
```

**DB record additions at checkout creation:**

```javascript
await db.order.update({
  where: { id: orderId },
  data: {
    capi_event_id: eventId, // the uuid from InitiateCheckout
    fbp: cookies.fbp,
    fbc: cookies.fbc,
  },
});
```

---

### TASK 11: `app/api/webhooks/razorpay/route.js` — Payment Webhook → Purchase Event

**Purpose:** MOST IMPORTANT file. Server-to-server — works even if customer closes browser.

**Requirements:**

- Verify Razorpay webhook signature FIRST — reject anything that fails verification
- Listen for `payment.captured` event only (not `payment.authorized`)
- Fetch full order from DB using payment ID
- Retrieve `capi_event_id`, `fbp`, `fbc` stored during InitiateCheckout
- Fire CAPI Purchase with the SAME `event_id` from InitiateCheckout → perfect deduplication
- Event time should be the actual order creation time, not the webhook receipt time

**Signature Verification (mandatory):**

```javascript
import crypto from "crypto";

const verifyRazorpaySignature = (body, signature) => {
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(body)
    .digest("hex");
  return expectedSignature === signature;
};
```

**Full handler:**

```javascript
export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature");

  // Step 1: Verify signature — reject tampered webhooks
  if (!verifyRazorpaySignature(body, signature)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const event = JSON.parse(body);

  if (event.event === "payment.captured") {
    const paymentId = event.payload.payment.entity.id;

    // Step 2: Fetch full order from DB
    const order = await db.order.findFirst({
      where: { razorpayPaymentId: paymentId },
      include: { customer: true, items: true, address: true },
    });

    if (!order) {
      console.error(
        "[Razorpay Webhook] Order not found for payment:",
        paymentId,
      );
      return new Response("Order not found", { status: 404 });
    }

    // Step 3: Fire CAPI Purchase with stored event_id (deduplication key)
    await sendCAPIEvent({
      eventName: "Purchase",
      eventId: order.capi_event_id, // SAME as InitiateCheckout event_id
      eventTime: Math.floor(new Date(order.createdAt).getTime() / 1000),
      eventSourceUrl: "https://ergoaurashop.com/checkout/success",
      userData: {
        email: order.customer.email,
        phone: order.customer.phone,
        firstName: order.customer.firstName,
        lastName: order.customer.lastName,
        customerId: order.customer.id,
        city: order.address.city,
        state: order.address.state,
        pincode: order.address.pincode,
        // fbp and fbc stored during checkout — passed raw, NEVER hashed
        fbp: order.fbp,
        fbc: order.fbc,
      },
      customData: {
        value: order.totalAmount,
        currency: "INR",
        order_id: order.id,
        content_ids: order.items.map((i) => i.sku),
        content_type: "product",
        contents: order.items.map((i) => ({
          id: i.sku,
          quantity: i.quantity,
          item_price: i.price,
        })),
        num_items: order.items.reduce((sum, i) => sum + i.quantity, 0),
      },
    });

    return new Response("OK", { status: 200 });
  }

  return new Response("Event ignored", { status: 200 });
}
```

---

### TASK 12: `app/api/meta-retry/route.js` — Cron Retry Handler

**Purpose:** Processes failed events from `meta_event_queue`. Called by Vercel Cron every 15 minutes.

**`vercel.json` addition:**

```json
{
  "crons": [
    {
      "path": "/api/meta-retry",
      "schedule": "*/15 * * * *"
    }
  ]
}
```

**Logic:**

1. Fetch up to 50 pending events from queue
2. Attempt to send each one via `sendWithRetry`
3. On success: mark as `sent`
4. On failure: increment attempts
5. If attempts > 5 or event is > 7 days old: mark as `failed` (beyond Meta's window)

---

### TASK 13: `app/api/meta-catalog/route.js` — Dynamic XML Product Feed

**Purpose:** Real-time product catalogue for Meta Commerce Manager. Enables Dynamic Product Ads.

**Requirements:**

- GET request returns valid XML (`Content-Type: application/xml`)
- Data comes live from DB (not static file)
- Include BOTH `price` AND `sale_price` — Meta shows strikethrough pricing automatically
- Include `availability` based on actual stock status
- SKU/`content_ids` must EXACTLY match what's sent in CAPI events

**XML Feed Format:**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rss xmlns:g="http://base.google.com/ns/1.0" version="2.0">
  <channel>
    <title>ErgoAura Products</title>
    <link>https://ergoaurashop.com</link>
    <description>ErgoAura Product Catalogue</description>

    <item>
      <g:id>SKU001</g:id>                    <!-- Must match content_ids in CAPI -->
      <g:title>ErgoAura Lumbar Support Cushion</g:title>
      <g:description>Full product description here</g:description>
      <g:link>https://ergoaurashop.com/products/lumbar-support</g:link>
      <g:image_link>https://ergoaurashop.com/images/lumbar-main.jpg</g:image_link>
      <g:additional_image_link>https://ergoaurashop.com/images/lumbar-2.jpg</g:additional_image_link>
      <g:availability>in stock</g:availability>  <!-- or 'out of stock' -->
      <g:price>5999 INR</g:price>               <!-- Original MRP -->
      <g:sale_price>2999 INR</g:sale_price>      <!-- Sale price — shows strikethrough in ads -->
      <g:brand>ErgoAura</g:brand>
      <g:condition>new</g:condition>
      <g:google_product_category>436</g:google_product_category>
      <g:custom_label_0>bestseller</g:custom_label_0>  <!-- For campaign segmentation -->
    </item>

    <!-- repeat for each product -->
  </channel>
</rss>
```

---

## SECTION 6: DEDUPLICATION — THE MOST CRITICAL REQUIREMENT

**Deduplication is how Meta merges the browser Pixel event + the server CAPI event into ONE accurate signal. Without it, you double-count every conversion and the algorithm learns wrong.**

### How it works

1. Browser fires: `fbq('track', 'Purchase', data, { eventID: 'abc-123' })`
2. Server fires: CAPI payload with `event_id: 'abc-123'`
3. Meta sees same `event_id` → merges into one event (not two)

### How to verify deduplication is working

1. Go to Events Manager → Test Events
2. Make a test purchase
3. Look at the Purchase event that appears
4. It MUST show the label: **"Deduplicated"**
5. If you see TWO separate Purchase events → deduplication is broken → fix `event_id` mismatch before launching paid ads

### Common deduplication failures

- `event_id` generated separately on client and server (must be the same uuid)
- `event_id` not stored at InitiateCheckout and retrieved at Purchase webhook
- Browser pixel fires but CAPI route returns error (check server logs)

---

## SECTION 7: PER-EVENT CUSTOM DATA SPECS

| Event              | Trigger                             | Key Custom Data Fields                                                            |
| ------------------ | ----------------------------------- | --------------------------------------------------------------------------------- |
| `PageView`         | Every route change                  | `event_source_url` only                                                           |
| `ViewContent`      | Product page load                   | `content_ids:[sku]`, `content_type:'product'`, `value`, `currency:'INR'`          |
| `Search`           | Search bar submit                   | `search_string: query`                                                            |
| `AddToCart`        | Add to cart click                   | `content_ids`, `value`, `currency:'INR'`, `num_items`                             |
| `InitiateCheckout` | Checkout page load                  | `content_ids[]`, `contents[]`, `num_items`, `value`, `currency:'INR'`             |
| `Purchase`         | Razorpay webhook `payment.captured` | `value`, `currency:'INR'`, `order_id`, `content_ids[]`, `contents[]`, `num_items` |

### `action_source` for all events

Always `"website"` — ErgoAura has no COD, so all purchases are online payment.

---

## SECTION 8: EMQ (EVENT MATCH QUALITY) TARGET

**Target: 9.0–10.0 / 10**

| Signal              | EMQ Value | Source          | Status                     |
| ------------------- | --------- | --------------- | -------------------------- |
| `em` (email)        | +1.5      | Customer DB     | ✅ Include                 |
| `ph` (phone)        | +1.0      | Customer DB     | ✅ Include                 |
| `fn` (first name)   | +1.0      | Customer DB     | ✅ Include                 |
| `ln` (last name)    | +1.0      | Customer DB     | ✅ Include                 |
| `external_id`       | +1.5      | Customer ID     | ✅ Include                 |
| `fbp` cookie        | +1.5      | Browser cookie  | ✅ Include (raw)           |
| `fbc` cookie        | +1.0      | Browser cookie  | ✅ Include if exists (raw) |
| `ct` (city)         | +0.5      | Address DB      | ✅ Include                 |
| `st` (state)        | +0.5      | Address DB      | ✅ Include                 |
| `zp` (pincode)      | +0.5      | Address DB      | ✅ Include                 |
| `country`           | required  | Always "in"     | ✅ Include                 |
| `client_ip_address` | +0.5      | Request headers | ✅ Include                 |
| `client_user_agent` | +0.5      | Request headers | ✅ Include                 |

---

## SECTION 9: ADS STRATEGY — INDIA-SPECIFIC HIGH-ROAS FRAMEWORK (2026)

### 9.1 Campaign Structure for Maximum ROAS

```
Campaign Level: Advantage+ Shopping Campaign (ASC)
  → Budget: ₹500–1000/day minimum to exit learning phase
  → Objective: Sales (Purchase)
  → Pixel: ErgoAura Web Pixel
  → Catalogue: ErgoAura Products
  → Attribution: 7-day click / 1-day view

Ad Set Level:
  → Advantage+ Audience (let Meta use all signals from CAPI)
  → Location: India
  → No manual interest targeting (CAPI data makes this more accurate than manual)

Ad Level: 3 creative variants per ad set
  → Video (9:16 for Reels + Stories)
  → Carousel (product catalogue)
  → Single image (direct response)
```

### 9.2 Psychological Triggers for India E-Commerce (2026)

**The Indian buyer's decision hierarchy:**

1. **Social proof first** — "X people bought this today" / "⭐4.8 from 2,300 reviews"
2. **Price anchoring** — Always show MRP crossed out → sale price. Strikethrough in Meta catalogue = automatic.
3. **FOMO + Scarcity** — "Only 7 left at this price" converts better than any other hook in Indian market
4. **Trust signals** — COD badge, easy returns, India-specific payment logos (UPI, Razorpay)
5. **Regional language** — Hindi captions in Reels outperform English-only by 30–40% in Tier 2+ cities

**Ad copy formula that works in India:**

```
Hook (0–3 sec video): Problem statement in Hindi/Hinglish
Middle: Product demo solving the problem
CTA: "Shop Now" + price + "Free Delivery" (if applicable)
```

### 9.3 Funnel Campaign Architecture

```
TOFU (Awareness — 15% of budget)
  → Reels + Stories: Problem-aware content
  → Custom Audience: Lookalike of Purchasers (1–2%)
  → Goal: Cheap CPM, broad reach

MOFU (Consideration — 25% of budget)
  → Retarget: ViewContent (last 14 days)
  → Retarget: AddToCart (last 7 days)
  → Carousel: Product catalogue
  → Goal: Bring warm traffic back

BOFU (Conversion — 60% of budget)
  → Retarget: InitiateCheckout abandoners (last 3 days)
  → ASC with full CAPI signals
  → UGC creative + strong price anchoring
  → Goal: PURCHASE
```

### 9.4 Creative Strategy for ErgoAura Products

**For ergonomic/home office products — what works:**

- Before/after: "Old chair causing pain" → "After ErgoAura: zero pain"
- Demonstrate with real users (UGC > polished ads)
- Show the product being unboxed (unboxing content converts well on Reels)
- Customer testimonials in Hindi/regional language
- Show product in real Indian home office setup (relatable environment)

### 9.5 Bidding Strategy

```
Phase 1 (Learning — Day 1–14):
  → Cost per result goal (CPR): Set 20% above your target CPA
  → Never edit campaigns during learning phase
  → Minimum 50 Purchase events/week to exit learning

Phase 2 (Scaling — Day 15+):
  → Increase budget by max 20% every 3–4 days (not more)
  → Introduce Highest Volume bidding once out of learning
  → Test Advantage+ Campaign Budget (ACB) vs manual budget split

Phase 3 (Optimisation):
  → Kill creatives below 0.5% CTR
  → Scale creatives above 2% CTR + positive ROAS
  → Refresh creative every 3 weeks (Indian audience fatigues fast)
```

### 9.6 Audience Strategy with CAPI Data

Once CAPI is live with 100+ purchases in pixel:

```
Lookalike audiences to build (in order of priority):
1. LLA 1% — from Purchasers (last 180 days) → BEST ROAS
2. LLA 1% — from High-Value Purchasers (top 25% by order value)
3. LLA 2–3% — from AddToCart (scale reach while maintaining quality)
4. LLA — from email list (upload customer CSV → Meta matches via email hash)

Custom Audiences for retargeting:
- Purchasers (180 days) → Exclude from acquisition, use for upsell
- ViewContent but NOT purchased (14 days) → MOFU retargeting
- AddToCart but NOT purchased (7 days) → BOFU retargeting
- InitiateCheckout but NOT purchased (3 days) → BOFU priority
- Website visitors (30 days) → TOFU retargeting
```

---

## SECTION 10: MONITORING + VERIFICATION CHECKLIST

### Pre-Launch Verification (Complete ALL before spending ₹1)

- [ ] Events Manager → Test Events shows `Purchase` as "Deduplicated"
- [ ] All 8 events appear in Test Events when triggered manually
- [ ] EMQ score shows 8.0+ in Events Manager
- [ ] `_fbp` and `_fbc` values appear in test purchase payload (not hashed)
- [ ] `fn`, `ln`, `external_id`, `ct`, `st`, `zp` appear in test purchase payload (hashed)
- [ ] Razorpay webhook verified — test `payment.captured` fires CAPI Purchase
- [ ] Meta catalogue URL returns valid XML (visit `ergoaurashop.com/api/meta-catalog`)
- [ ] Catalogue items have both `price` and `sale_price`
- [ ] Catalogue `g:id` exactly matches `content_ids` sent in CAPI events
- [ ] Retry cron job fires every 15 minutes (check Vercel Cron logs)
- [ ] Zero existing pages broken (full regression check)
- [ ] `META_TEST_EVENT_CODE` absent from production payload (check live events)

### Ongoing Monitoring (Weekly)

- [ ] Events Manager → EMQ score above 8.0
- [ ] Events Manager → Deduplication rate above 80% for Purchase
- [ ] Meta catalogue last successful sync < 2 hours ago
- [ ] `meta_event_queue` table has 0 events with status `failed`
- [ ] Server logs show no CAPI 400 errors (400 = bad payload = data problem)

---

## SECTION 11: WHAT NOT TO DO — ANTI-PATTERNS

```
❌ Never fire Purchase from frontend success page only (webhook is the source of truth)
❌ Never hash _fbp or _fbc (Meta requires raw values — hashing breaks matching)
❌ Never send empty string for _fbc when it doesn't exist (omit entirely / send undefined)
❌ Never modify existing pages/routes/components (additive only rule)
❌ Never expose META_CAPI_TOKEN to the browser
❌ Never use the same event_id for different events
❌ Never skip storing event_id at InitiateCheckout (breaks Purchase deduplication)
❌ Never scale campaign budget more than 20% in one edit
❌ Never edit campaigns during the learning phase
❌ Never launch paid traffic before deduplication shows "Deduplicated" in Test Events
❌ Never send phone as "09876543210" without normalising (hash won't match Meta's DB)
❌ Never send pincode as "400 001" with a space (hash won't match Meta's DB)
```

---

## SECTION 12: EXPECTED OUTCOMES AFTER FULL IMPLEMENTATION

| Metric                     | Before (Pixel only) | After (Full CAPI + Strategy)  |
| -------------------------- | ------------------- | ----------------------------- |
| EMQ Score                  | 4–5 / 10            | 9–10 / 10                     |
| Attribution window         | iOS 14 limited      | Full across devices           |
| Purchase events captured   | ~60–70%             | ~99%+                         |
| Meta algorithm quality     | Poor signals        | Rich signals                  |
| Audience matching accuracy | Low                 | High                          |
| Expected ROAS              | 2–4x                | 8–15x (with right creative)   |
| Time to full optimisation  | Slow                | Faster learning = faster ROAS |

---

_Document prepared for Roo Code Architecture Mode | ErgoAura Shop | 2026_  
_Build sequence: Tasks 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10 → 11 → 12 → 13_  
_Verify each task independently before proceeding to the next_
