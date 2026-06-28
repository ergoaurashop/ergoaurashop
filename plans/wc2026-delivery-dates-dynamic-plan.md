# Messi Argentina 2026 Jersey — Dynamic Delivery Dates & Countdown Plan

## Objective

Update the product page [`/messi-argentina-2026-jersey`](src/app/products/%5Bslug%5D/page.tsx) to use **dynamically computed dates** instead of the currently hardcoded delivery date strings.

## Current Static Content (to be replaced)

### Location 1: Main Product Info Section

**File:** [`src/components/products/worldcup2026/WCProductInfo.tsx`](src/components/products/worldcup2026/WCProductInfo.tsx:166)

```html
<p style={{ fontSize: 13, color: "#565959" }}>
  <strong style={{ color: "#0f1111" }}>FREE delivery</strong> Monday, 23
  June.{" "}
  <a href="/" style={{ color: "#007185", textDecoration: "none" }}>
    Order within 18 hrs 42 mins
  </a>
</p>
<p style={{ fontSize: 13, color: "#565959" }}>
  Or fastest delivery Tomorrow, 22 June
</p>
```

### Location 2: Desktop Buy Box

**File:** [`src/components/products/worldcup2026/WCProductInfo.tsx`](src/components/products/worldcup2026/WCProductInfo.tsx:312)

```html
<div className="wc2026-buy-free-delivery">FREE delivery Monday, 23 June</div>
```

## Requirements

1. **Standard delivery label** → Show dynamic "Tomorrow" text with tomorrow's real date (e.g., "Tomorrow, 29 June")
2. **Countdown timer** → Replace static "Order within 18 hrs 42 mins" with a live countdown showing hours & minutes remaining until cutoff
3. **Fastest delivery date** → Replace hardcoded "22 June" with dynamically computed tomorrow's date

> ⚠️ The same font, font size (13px), colors (#565959 for text, #0f1111 for "FREE delivery" label, #007185 for link), and placement must remain **identical**. No CSS or styling changes.

## Implementation Plan

### Step 1: Add a `useEffect` + `useState` countdown hook to WCProductInfo.tsx

Since the component is already a `"use client"` component, we can use React hooks directly.

**What to add in the Main Component** (inside the `WCProductInfo` function, before the `return`):

```typescript
// ── Dynamic delivery dates & countdown ──
const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0 });
const [tomorrowFormatted, setTomorrowFormatted] = useState("");

useEffect(() => {
  // Calculate tomorrow's date in Asia/Dubai timezone
  const now = new Date();
  const dubaiOffset = 4 * 60; // UTC+4 in minutes

  // Get current Dubai time
  const dubaiNow = new Date(
    now.getTime() + (now.getTimezoneOffset() + dubaiOffset) * 60000,
  );

  // Tomorrow's date
  const tomorrow = new Date(dubaiNow);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Format: "D Month" e.g., "29 June"
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  setTomorrowFormatted(`${tomorrow.getDate()} ${months[tomorrow.getMonth()]}`);

  // Countdown to midnight (23:59) Dubai time
  const cutoff = new Date(dubaiNow);
  cutoff.setHours(23, 59, 0, 0);

  function updateTimer() {
    const now2 = new Date();
    const dubaiNow2 = new Date(
      now2.getTime() + (now2.getTimezoneOffset() + dubaiOffset) * 60000,
    );
    const diffMs = cutoff.getTime() - dubaiNow2.getTime();

    if (diffMs <= 0) {
      setTimeLeft({ hours: 0, minutes: 0 });
      return;
    }

    const totalMinutes = Math.floor(diffMs / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setTimeLeft({ hours, minutes });
  }

  updateTimer();
  const interval = setInterval(updateTimer, 60000); // Update every minute
  return () => clearInterval(interval);
}, []);
```

> **Design decision:** Cutoff is set to **11:59 PM Asia/Dubai (UTC+4)**. This means "Order before midnight to get it tomorrow." The countdown updates every 60 seconds (not every second) to match the original format (hrs + mins, not seconds).

### Step 2: Replace static dates in Main Info Section

**Replace this** (lines 165-174):

```html
<p style={{ fontSize: 13, color: "#565959" }}>
  <strong style={{ color: "#0f1111" }}>FREE delivery</strong> Monday, 23
  June.{" "}
  <a href="/" style={{ color: "#007185", textDecoration: "none" }}>
    Order within 18 hrs 42 mins
  </a>
</p>
<p style={{ fontSize: 13, color: "#565959" }}>
  Or fastest delivery Tomorrow, 22 June
</p>
```

**With this:**

```html
<p style={{ fontSize: 13, color: "#565959" }}>
  <strong style={{ color: "#0f1111" }}>FREE delivery</strong> Tomorrow,{" "}
  {tomorrowFormatted}.{" "}
  <a href="/" style={{ color: "#007185", textDecoration: "none" }}>
    Order within {timeLeft.hours} hrs {timeLeft.minutes} mins
  </a>
</p>
<p style={{ fontSize: 13, color: "#565959" }}>
  Or fastest delivery Tomorrow, {tomorrowFormatted}
</p>
```

### Step 3: Replace static date in Buy Box

**Replace this** (line 313):

```html
<div className="wc2026-buy-free-delivery">FREE delivery Monday, 23 June</div>
```

**With this:**

```html
<div className="wc2026-buy-free-delivery">
  FREE delivery Tomorrow, {tomorrowFormatted}
</div>
```

**Note:** The BuyBox component is a **separate function** (`WCProductInfo.BuyBox`), so it needs its own independent countdown/date logic. We'll replicate the same `useEffect`/`useState` logic inside it.

### Step 4: Verify no other files need changes

- [`WorldCup2026Section.tsx`](src/components/products/worldcup2026/WorldCup2026Section.tsx) — No changes needed; it just passes data.
- [`WCReviews.tsx`](src/components/products/worldcup2026/WCReviews.tsx) — No changes needed.
- [`WCFaq.tsx`](src/components/products/worldcup2026/WCFaq.tsx) — No changes needed.
- [`worldcup-2026-data.ts`](src/lib/worldcup-2026-data.ts) — No changes needed (data layer is separate).
- [`worldcup2026.css`](src/styles/worldcup2026.css) — No changes needed.
- [`ProductDetailClient.tsx`](src/app/products/%5Bslug%5D/ProductDetailClient.tsx) — No changes needed.

## Files Modified

| File                                                                                                               | Change                                                               |
| ------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------- |
| [`src/components/products/worldcup2026/WCProductInfo.tsx`](src/components/products/worldcup2026/WCProductInfo.tsx) | Add dynamic date & countdown logic; replace 3 static date references |

## Testing

After deployment, verify:

1. The delivery text displays **tomorrow's date** correctly (e.g., if today is June 28, show "Tomorrow, 29 June")
2. The countdown shows **correct hours/minutes** until 11:59 PM Dubai time
3. The **Buy Box** also shows the updated dynamic date
4. All font sizes, colors, and styles remain **unchanged** from the original
