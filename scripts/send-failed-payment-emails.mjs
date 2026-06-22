/**
 * scripts/send-failed-payment-emails.mjs
 *
 * ONE-TIME retroactive script to send payment-failed recovery emails to
 * all existing orders in Supabase with payment_status = 'failed'.
 *
 * Usage:
 *   1. Ensure your .env.local has the required vars:
 *        SUPABASE_SERVICE_ROLE_KEY=...
 *        NEXT_PUBLIC_SUPABASE_URL=...
 *        RESEND_API_KEY=re_...
 *        RESEND_FROM_EMAIL=ErgoAura <support@ergoaurashop.com>
 *        NEXT_PUBLIC_SITE_URL=https://ergoaurashop.com
 *
 *   2. Run from project root:
 *        node scripts/send-failed-payment-emails.mjs
 *
 * Safety:
 *   - 500ms delay between sends (respect rate limits)
 *   - Logs every send attempt to stdout
 *   - Never modifies the database
 *   - Fatal errors (invalid API key, etc.) stop the script immediately
 */

// ── Load .env.local ──────────────────────────────────────────────────
import { config } from "dotenv";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, "..", ".env.local") });

// ── Dependencies ─────────────────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ergoaurashop.com";

const MISSING = [];
if (!RESEND_API_KEY) MISSING.push("RESEND_API_KEY");
if (!RESEND_FROM_EMAIL) MISSING.push("RESEND_FROM_EMAIL");
if (!SUPABASE_URL) MISSING.push("NEXT_PUBLIC_SUPABASE_URL");
if (!SUPABASE_SERVICE_ROLE_KEY) MISSING.push("SUPABASE_SERVICE_ROLE_KEY");

if (MISSING.length > 0) {
  console.error(
    `❌ Missing required environment variables:\n  ${MISSING.join("\n  ")}`,
  );
  process.exit(1);
}

// ── Init clients ─────────────────────────────────────────────────────
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

/**
 * Send an email via Resend API directly (no SDK needed for this script).
 */
async function sendEmailViaResend({ to, subject, html }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: RESEND_FROM_EMAIL,
      to: [to],
      subject,
      html,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      `Resend API error (${response.status}): ${data?.message || JSON.stringify(data)}`,
    );
  }

  return data;
}

/**
 * Build a simple HTML email for payment recovery.
 * Uses inline styles for maximum email-client compatibility.
 */
function buildPaymentFailedHtml({
  customerName,
  orderId,
  productName,
  productImage,
  productPrice,
  checkoutUrl,
  trackId,
}) {
  const BRAND_GOLD = "#C9A962";
  const BRAND_DARK = "#1A1A1A";
  const BRAND_IVORY = "#F5F1EB";

  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:${BRAND_IVORY};font-family:Inter,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_IVORY};">
    <tr>
      <td align="center" style="padding:20px 10px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:#ffffff;border-radius:8px;overflow:hidden;">
          <!-- Gold Accent Bar -->
          <tr><td style="height:5px;background-color:${BRAND_GOLD};font-size:1px;line-height:1px;">&nbsp;</td></tr>
          <!-- Header -->
          <tr>
            <td align="center" style="padding:30px 20px 20px;background-color:${BRAND_DARK};">
              <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:28px;color:${BRAND_GOLD};letter-spacing:1px;">ErgoAura</h1>
              <p style="margin:6px 0 0;font-size:12px;color:${BRAND_GOLD};letter-spacing:2px;text-transform:uppercase;">Wellness · Kitchen · Personal Care · Electronics</p>
            </td>
          </tr>
          <!-- Hero -->
          <tr>
            <td align="center" style="padding:40px 20px 20px;">
              <h2 style="margin:0 0 8px;font-family:'Playfair Display',Georgia,serif;font-size:26px;color:${BRAND_DARK};">Payment Didn't Go Through</h2>
              <p style="margin:0;font-size:15px;color:#666666;line-height:22px;">Don't worry — it happens sometimes. Your items are still waiting for you.</p>
            </td>
          </tr>
          <!-- Order Info -->
          <tr>
            <td align="center" style="padding:0 20px 10px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="520" style="background-color:${BRAND_IVORY};border-radius:6px;">
                <tr>
                  <td style="padding:12px 16px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td style="font-size:13px;color:#666666;">Order</td>
                        <td align="right" style="font-size:13px;font-weight:600;color:${BRAND_DARK};">${orderId}</td>
                      </tr>
                      <tr>
                        <td style="font-size:13px;color:#666666;padding-top:4px;">Track ID</td>
                        <td align="right" style="font-size:13px;font-weight:600;color:${BRAND_DARK};padding-top:4px;letter-spacing:1px;">${trackId || "N/A"}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Product Card -->
          <tr>
            <td align="center" style="padding:10px 20px 20px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="520" style="border:1px solid #EAE3D5;border-radius:8px;overflow:hidden;">
                <tr>
                  <td style="padding:0;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="120" style="padding:0;vertical-align:top;">
                          <img src="${productImage}" alt="${productName}" width="120" height="120" style="display:block;width:120px;height:120px;object-fit:cover;border:0;" />
                        </td>
                        <td style="padding:14px 16px;vertical-align:top;">
                          <h3 style="margin:0 0 6px;font-size:15px;font-weight:600;color:${BRAND_DARK};">${productName}</h3>
                          <p style="margin:0;font-size:16px;font-weight:700;color:${BRAND_GOLD};">₹${productPrice}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding:10px 20px 30px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td align="center" style="border-radius:6px;background-color:${BRAND_GOLD};padding:0;">
                    <a href="${checkoutUrl}" target="_blank" style="display:inline-block;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;padding:14px 40px;border-radius:6px;">Complete Your Purchase</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Support -->
          <tr>
            <td align="center" style="padding:20px;background-color:${BRAND_IVORY};">
              <p style="margin:0;font-size:14px;color:#666666;">Need help? Contact us at <a href="mailto:support@ergoaurashop.com" style="color:${BRAND_GOLD};text-decoration:none;font-weight:600;">support@ergoaurashop.com</a></p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px;background-color:${BRAND_DARK};">
              <p style="margin:0;font-size:12px;color:#999999;">&copy; ${new Date().getFullYear()} ErgoAura Shop. All rights reserved.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Main ──────────────────────────────────────────────────────────────
async function main() {
  console.log("🔍 Querying failed payment orders from Supabase...\n");

  // Fetch ALL orders with payment_status = 'failed'
  const { data: orders, error } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_status", "failed")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ Supabase query failed:", error.message);
    process.exit(1);
  }

  if (!orders || orders.length === 0) {
    console.log("✅ No failed payment orders found. Nothing to send.");
    process.exit(0);
  }

  console.log(
    `📧 Found ${orders.length} failed payment order(s). Starting send...\n`,
  );

  let sent = 0;
  let failed = 0;

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const product = order.products?.[0];
    const productName = product?.name || "Product";
    const productImage =
      product?.image || `${SITE_URL}/images/logo/ergoauralogo.webp`;
    const productPrice = product?.price || order.total;

    const checkoutUrl = `${SITE_URL}/checkout?retry_order=${order.order_id}`;

    const html = buildPaymentFailedHtml({
      customerName: order.customer_name || "Valued Customer",
      orderId: order.order_id,
      productName,
      productImage,
      productPrice,
      checkoutUrl,
      trackId: order.track_id,
    });

    const subject = `Complete Your Purchase — ${productName} at ErgoAura`;

    console.log(
      `[${i + 1}/${orders.length}] Sending to ${order.customer_email} (${order.order_id})...`,
    );

    try {
      const result = await sendEmailViaResend({
        to: order.customer_email,
        subject,
        html,
      });
      console.log(`  ✅ Sent successfully (id: ${result.id})`);
      sent++;
    } catch (err) {
      console.error(`  ❌ Failed: ${err.message}`);
      failed++;

      // If it's an auth error, stop the script immediately
      if (err.message?.includes("API key") || err.message?.includes("401")) {
        console.error("\n⚠️  Fatal API error — stopping script.");
        break;
      }
    }

    // 500ms delay between sends to avoid rate limiting
    if (i < orders.length - 1) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  console.log("\n═══════════════════════════════════════");
  console.log("📊 Summary:");
  console.log(`   Total orders:  ${orders.length}`);
  console.log(`   Sent:          ${sent}`);
  console.log(`   Failed:        ${failed}`);
  console.log("═══════════════════════════════════════\n");

  if (failed > 0) {
    console.log("⚠️  Some emails failed. Check the logs above for details.");
    process.exit(1);
  }

  process.exit(0);
}

main();
