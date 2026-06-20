# Meta Pixel (Facebook Pixel) Implementation Plan

## Goal

Add Meta Pixel tracking code to the website's `<head>` section without breaking any existing functionality.

## File to Modify

- [`src/app/layout.tsx`](../src/app/layout.tsx) — only the `<head>` section

## Change Details

### Target location in layout.tsx

Insert the Meta Pixel code **between line 136 and line 137** — i.e., right after the GTM Script block closes and before `</head>`.

### What to add

1. **Meta Pixel JavaScript** — using Next.js `<Script>` component (same pattern as existing GTM):
   - Use `dangerouslySetInnerHTML` to inject the Facebook Pixel initialization code
   - Use `strategy="afterInteractive"` so the pixel loads without blocking page rendering
   - Add a unique `id` attribute (e.g., `"meta-pixel"`) for React hydration

2. **Meta Pixel noscript fallback** — the `<noscript>` tag with the tracking pixel image, placed just after the Script component inside `<head>`

### Code to insert (between GTM and `</head>`)

```tsx
        {/* Meta Pixel */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1534611644710862');
fbq('track', 'PageView');`,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1534611644710862&ev=PageView&noscript=1"
          />
        </noscript>
```

### What is NOT changed

- No other files modified
- No functions, components, or logic altered
- Existing GTM code remains untouched
- No environment variables added (Pixel ID is hardcoded per the user's provided code)
- No new imports needed (`Script` is already imported)

## Verification Steps

1. Confirm the build passes (`npm run build` or `next build`)
2. Confirm no TypeScript or linting errors
3. Verify the pixel loads on the site using Facebook Pixel Helper browser extension or browser dev tools

## Risk Assessment

- **Low risk** — follows the exact same pattern as the existing GTM implementation
- Only adds new code, does not modify any existing code
- No impact on layout, styling, or functionality
