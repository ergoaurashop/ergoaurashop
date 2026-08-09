/**
 * scripts/send-s23-batch3-recovery-emails.mjs
 *
 * ONE-TIME script to send payment-failed / recovery emails for
 * "Samsung Galaxy S23 Ultra" to the 47 customers from the batch-3
 * failed/dropped payment list.
 *
 * Uses the SAME proven high-conversion template as
 * scripts/send-s23-batch2-failed-payment-emails.mjs, but the primary CTA
 * button points directly to the customer's PAYMENT LINK (provided by the
 * store owner) so they can complete payment immediately.
 *
 * SAFETY WORKFLOW (as requested):
 *   1. TEST SEND FIRST (verify quality):
 *        node scripts/send-s23-batch3-recovery-emails.mjs --test
 *      This sends ONE email to shopergoaura@gmail.com only.
 *
 *   2. After the owner confirms quality, BULK SEND:
 *        node scripts/send-s23-batch3-recovery-emails.mjs
 *
 *   Optional: preview recipients without sending:
 *        node scripts/send-s23-batch3-recovery-emails.mjs --dry-run
 *
 * Requirements:
 *   - .env.local must have:
 *        RESEND_API_KEY=re_...
 *        RESEND_FROM_EMAIL=ErgoAura <support@ergoaurashop.com>
 *        NEXT_PUBLIC_SITE_URL=https://ergoaurashop.com
 *
 * Safety:
 *   - 500ms delay between sends (respect rate limits)
 *   - Logs every send attempt to stdout
 *   - Never modifies the database
 *   - Fatal errors (invalid API key, etc.) stop the script immediately
 */

// ── Load .env.local manually (no external dependencies) ─────────────
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env.local");

try {
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    let value = trimmed.slice(eqIdx + 1).trim();
    // Remove surrounding quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    process.env[key] = process.env[key] || value;
  }
} catch (err) {
  console.error("❌ Could not load .env.local:", err.message);
  process.exit(1);
}

// ── CLI flags ────────────────────────────────────────────────────────
const DRY_RUN = process.argv.includes("--dry-run");
const TEST_MODE = process.argv.includes("--test");

// ⚠️ TEST email — the owner verifies email quality here before bulk send.
//    Override with: --test-to=someone@example.com
function getCliArg(name) {
  const prefix = `--${name}=`;
  const arg = process.argv.find((a) => a.startsWith(prefix));
  return arg ? arg.slice(prefix.length) : null;
}
const TEST_EMAIL =
  getCliArg("test-to") || process.env.S23_TEST_EMAIL || "shopergoaura@gmail.com";

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ergoaurashop.com";

const MISSING = [];
if (!RESEND_API_KEY) MISSING.push("RESEND_API_KEY");
if (!RESEND_FROM_EMAIL) MISSING.push("RESEND_FROM_EMAIL");

if (MISSING.length > 0) {
  console.error(
    `❌ Missing required environment variables:\n  ${MISSING.join("\n  ")}`,
  );
  process.exit(1);
}

// ═════════════════════════════════════════════════════════════════════
// ⚙️  CONFIG — EDIT HERE
// ═════════════════════════════════════════════════════════════════════

// 🔗 THE PAYMENT LINK — the primary CTA button in the email.
//    Provided by the store owner (Aug 2026 recovery campaign).
const PAYMENT_LINK = process.env.S23_PAYMENT_LINK || "https://rzp.io/rzp/x4ENt51";

// ── Brand Colours ─────────────────────────────────────────────────────
const BRAND_GOLD = "#C9A962";
const BRAND_DARK = "#1A1A1A";
const BRAND_IVORY = "#F5F1EB";
const BRAND_WHITE = "#FFFFFF";
const BRAND_TEXT = "#333333";
const BRAND_TEXT_LIGHT = "#666666";
const BRAND_TEXT_MUTED = "#999999";

// ── Product Info ──────────────────────────────────────────────────────
const PRODUCT_NAME = "Samsung Galaxy S23 Ultra";
const PRODUCT_PRICE = "₹24,990";
const PRODUCT_ORIGINAL_PRICE = "₹1,24,999";
const PRODUCT_PAGE_URL = `${SITE_URL}/products/samsung-galaxy-s23-ultra`;

// S23 product images (stored in public/images/products/Part-2/...)
const S23_FOLDER = encodeURIComponent(
  "Part-2/Samsung Galaxy S23 Ultra Dual SIM Smartphone 12GB RAM 512GB Storage - Internationa Version",
);
const IMG_BASE = `${SITE_URL}/images/products/${S23_FOLDER}`;

const PRODUCT_IMAGES = [
  {
    src: "galaxy-s23-ultra-highlights-kv-1.jpg",
    alt: "Samsung Galaxy S23 Ultra - Front View",
  },
  {
    src: "galaxy-s23-ultra-highlights-camera-1.jpg",
    alt: "Samsung Galaxy S23 Ultra - 200MP Camera System",
  },
  {
    src: "galaxy-s23-ultra-highlights-display-1.jpg",
    alt: "Samsung Galaxy S23 Ultra - Dynamic AMOLED Display",
  },
  {
    src: "galaxy-s23-ultra-highlights-nightography-1.jpg",
    alt: "Samsung Galaxy S23 Ultra - Nightography",
  },
];

// ── Customer Data ─────────────────────────────────────────────────────
// Batch-3 failed/dropped payment list — Samsung Galaxy S23 Ultra @ ₹24,990.
// No customer names were provided except row 1 (known from batch-2 data);
// everyone else falls back to "there" in the greeting.
const CUSTOMERS = [
  { name: "Rohit Sharma", email: "rohitsharma1409@gmail.com" },
  { name: "", email: "sarwantokbi@gmail.com" },
  { name: "", email: "sanaulla8732@gmail.com" },
  { name: "", email: "mt6273919@gmail.com" },
  { name: "", email: "parjapatipannalal8@gmail.com" },
  { name: "", email: "sonarganesh51@gmail.com" },
  { name: "", email: "ramchandra@24international.net" },
  { name: "", email: "lalangupta9341891766@gmail.com" },
  { name: "", email: "mohitgupta3134@gmail.com" },
  { name: "", email: "roopeshtekam2@gmail.com" },
  { name: "", email: "bakshilucky6@gmail.com" },
  { name: "", email: "balendra101chadel@gmail.com" },
  { name: "", email: "dsprajiv8@gmail.com" },
  { name: "", email: "s67836939@gmail.com" },
  { name: "", email: "raviraghuwanshi8900@gmail.com" },
  { name: "", email: "mr.patel@gmail.com" },
  { name: "", email: "gullasaini@359gmail.com" },
  { name: "", email: "sumitwadhani1983@gmail.com" },
  { name: "", email: "6chayanbiswasi.b.g.iti.c@gmail.com" },
  { name: "", email: "seng95055@gmail.com" },
  { name: "", email: "bhoyarsachin0105@gmail.com" },
  { name: "", email: "dy5155849@gmail.com" },
  { name: "", email: "dayalbkp111@gmail.com" },
  { name: "", email: "sahilshah31672@gmail.com" },
  { name: "", email: "rb4944179@gemail.com" },
  { name: "", email: "rranjith@gmail.com" },
  { name: "", email: "yogeshkumarsaket3@gmail.com" },
  { name: "", email: "kumarbk54024@gmail.com" },
  { name: "", email: "pm7640160@gmail.com" },
  { name: "", email: "sujeetpatil@59gmail.com" },
  { name: "", email: "surajk8480@gmail.com" },
  { name: "", email: "tusharb231990@gmail.com" },
  { name: "", email: "sitaldakua339@gmail.com" },
  { name: "", email: "rizwanqureshi78616@gmail.com" },
  { name: "", email: "sikandaransaritea15@gmail.com" },
  { name: "", email: "nurulislammallick2@gmail.com" },
  { name: "", email: "rg0488314@gmail.com" },
  { name: "", email: "amzadamzadkhan4@gmail.com" },
  { name: "", email: "navalshakya189@gmail.com" },
  { name: "", email: "rohitsharma64202@gmail.com" },
  { name: "", email: "akshayrajrathod77@gmail.com" },
  { name: "", email: "rsarboche@gmail.com" },
  { name: "", email: "chrisalr7@gmail.com" },
  { name: "", email: "alamafroj4176@gmail.com" },
  { name: "", email: "narayanborah.borah7@gmail.com" },
  { name: "", email: "fazankhatana12@gmail.com" },
  { name: "", email: "nair996.kavya@gmail.com" },
];

// ── Email Builder ─────────────────────────────────────────────────────

function buildEmailHtml({ customerName, paymentId }) {
  // Fallback greeting for customers without a name
  const displayName = customerName ? customerName : "there";

  // Build image gallery rows (2 images per row)
  const imageCells = PRODUCT_IMAGES.map(
    (img) => `
              <td style="padding:4px;width:50%;vertical-align:top;">
                <a href="${PRODUCT_PAGE_URL}" target="_blank" style="text-decoration:none;display:block;">
                  <img
                    src="${IMG_BASE}/${img.src}"
                    alt="${img.alt}"
                    width="260"
                    style="display:block;width:100%;max-width:260px;height:auto;border-radius:6px;border:1px solid #EAE3D5;"
                  />
                </a>
              </td>`,
  );

  const imageRows = [];
  for (let i = 0; i < imageCells.length; i += 2) {
    imageRows.push(`            <tr>
              ${imageCells[i]}
              ${imageCells[i + 1] || ""}
            </tr>`);
  }

  // Payment ID banner — only shown when a paymentId is available
  const paymentBanner = paymentId
    ? `<!-- Payment ID Banner -->
          <tr>
            <td align="center" style="padding:0 20px 16px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560" style="background-color:#FEF2F2;border:1px solid #FECACA;border-radius:6px;">
                <tr>
                  <td style="padding:10px 16px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="24" style="vertical-align:middle;font-size:16px;padding-right:8px;">⚠️</td>
                        <td style="font-family:'Inter',sans-serif;font-size:13px;color:#991B1B;line-height:20px;">
                          Payment ID: <strong>${paymentId}</strong> &mdash; No amount has been charged.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>Complete Your Purchase — ErgoAura</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <!--[if mso]>
  <style>
    table, td { border-collapse: collapse; }
    td { font-family: 'Segoe UI', sans-serif; }
  </style>
  <![endif]-->
</head>
<body style="margin:0;padding:0;background-color:${BRAND_IVORY};font-family:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">

  <!-- Preview Text (hidden) -->
  <div style="display:none;font-size:1px;color:${BRAND_IVORY};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    Hey ${displayName}, your payment for ${PRODUCT_NAME} didn't go through. Complete your purchase now &mdash; your phone is still reserved for you!
  </div>

  <!-- Full-width container -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_IVORY};">
    <tr>
      <td align="center" style="padding:12px 10px;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:${BRAND_WHITE};border-radius:8px;overflow:hidden;">

          <!-- Gold Accent Bar -->
          <tr><td style="height:5px;background-color:${BRAND_GOLD};font-size:1px;line-height:1px;">&nbsp;</td></tr>

          <!-- Dark Header -->
          <tr>
            <td align="center" style="padding:30px 20px 20px;background-color:${BRAND_DARK};">
              <a href="${SITE_URL}" target="_blank" style="text-decoration:none;">
                <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:28px;color:${BRAND_GOLD};letter-spacing:1px;">ErgoAura</h1>
              </a>
              <p style="margin:6px 0 0;font-family:'Inter',sans-serif;font-size:12px;color:${BRAND_GOLD};letter-spacing:2px;text-transform:uppercase;">
                Wellness · Kitchen · Personal Care · Electronics
              </p>
            </td>
          </tr>

          <!-- Hero Section -->
          <tr>
            <td align="center" style="padding:40px 20px 10px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                      <tr>
                        <td width="72" height="72" style="width:72px;height:72px;background-color:#FEF2F2;border-radius:50%;text-align:center;vertical-align:middle;">
                          <span style="font-size:32px;line-height:72px;">💳</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <h1 style="margin:0;font-family:'Playfair Display',Georgia,serif;font-size:28px;color:${BRAND_DARK};font-weight:700;line-height:36px;">
                      Payment Didn't Go Through
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:8px;">
                    <p style="margin:0;font-family:'Inter',sans-serif;font-size:16px;color:${BRAND_TEXT_LIGHT};line-height:24px;">
                      Don't worry <strong>${displayName}</strong> &mdash; it happens sometimes.<br>
                      Your <strong>${PRODUCT_NAME}</strong> is still reserved for you!
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:10px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="80" align="center">
                      <tr>
                        <td style="height:3px;background-color:${BRAND_GOLD};font-size:1px;line-height:1px;">&nbsp;</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

${paymentBanner}
          <!-- Product Details Card -->
          <tr>
            <td align="center" style="padding:0 20px 20px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560" style="border:1px solid #EAE3D5;border-radius:8px;overflow:hidden;background-color:${BRAND_WHITE};">
                <tr>
                  <td style="padding:20px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="center">
                          <h2 style="margin:0 0 4px;font-family:'Playfair Display',Georgia,serif;font-size:20px;color:${BRAND_DARK};font-weight:700;">
                            ${PRODUCT_NAME}
                          </h2>
                          <p style="margin:0 0 12px;font-family:'Inter',sans-serif;font-size:14px;color:${BRAND_TEXT_LIGHT};">
                            12GB RAM | Dual SIM | International Version
                          </p>
                          <p style="margin:0 0 6px;font-family:'Inter',sans-serif;font-size:24px;font-weight:700;color:${BRAND_GOLD};">
                            ${PRODUCT_PRICE}
                          </p>
                          <p style="margin:0 0 16px;font-family:'Inter',sans-serif;font-size:14px;color:${BRAND_TEXT_MUTED};">
                            <span style="text-decoration:line-through;">${PRODUCT_ORIGINAL_PRICE}</span>
                            <span style="color:#16A34A;font-weight:600;margin-left:6px;">Save 80%</span>
                          </p>
                        </td>
                      </tr>
                    </table>

                    <!-- Product Image Gallery (2 × 2 grid) -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      ${imageRows.join("\n")}
                    </table>

                    <!-- Key Features -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-top:16px;">
                      <tr>
                        <td style="padding:4px 0;font-family:'Inter',sans-serif;font-size:13px;color:${BRAND_TEXT};">
                          ✅ 200MP Quad Camera with Space Zoom &mdash; capture the moon
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-family:'Inter',sans-serif;font-size:13px;color:${BRAND_TEXT};">
                          ✅ S Pen Included &mdash; take notes, sketch, control your phone
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-family:'Inter',sans-serif;font-size:13px;color:${BRAND_TEXT};">
                          ✅ Snapdragon 8 Gen 2 for Galaxy &mdash; fastest Android processor
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-family:'Inter',sans-serif;font-size:13px;color:${BRAND_TEXT};">
                          ✅ 5000mAh Battery with 45W Fast Charging &mdash; all-day power
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:4px 0;font-family:'Inter',sans-serif;font-size:13px;color:${BRAND_TEXT};">
                          ✅ 6.8" Dynamic AMOLED 2X 120Hz Display &mdash; stunning visuals
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 🔗 PRIMARY CTA → PAYMENT LINK (as requested by store owner) -->
          <tr>
            <td align="center" style="padding:0 20px 10px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td align="center" style="border-radius:6px;background-color:${BRAND_GOLD};padding:0;">
                    <a href="${PAYMENT_LINK}" target="_blank" style="display:inline-block;font-family:'Inter',sans-serif;font-size:16px;font-weight:700;color:${BRAND_WHITE};text-decoration:none;padding:16px 44px;border-radius:6px;letter-spacing:0.5px;">
                      🔒 Complete Your Purchase Securely
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- View Product (secondary) -->
          <tr>
            <td align="center" style="padding:0 20px 24px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                <tr>
                  <td align="center" style="border-radius:6px;background-color:${BRAND_DARK};padding:0;">
                    <a href="${PRODUCT_PAGE_URL}" target="_blank" style="display:inline-block;font-family:'Inter',sans-serif;font-size:15px;font-weight:600;color:${BRAND_WHITE};text-decoration:none;padding:14px 36px;border-radius:6px;letter-spacing:0.3px;">
                      👁 View Product Details
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Next Steps -->
          <tr>
            <td align="center" style="padding:0 20px 30px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
                <tr>
                  <td>
                    <h3 style="margin:0 0 12px;font-family:'Playfair Display',Georgia,serif;font-size:18px;color:${BRAND_DARK};font-weight:700;">
                      What Happens Next?
                    </h3>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="28" style="vertical-align:top;padding:0 8px 10px 0;font-family:'Inter',sans-serif;font-size:14px;color:${BRAND_GOLD};font-weight:700;">1.</td>
                        <td style="padding:0 0 10px;font-family:'Inter',sans-serif;font-size:14px;color:${BRAND_TEXT};line-height:22px;">
                          <strong>Click the button above</strong> to complete your payment securely.
                        </td>
                      </tr>
                      <tr>
                        <td width="28" style="vertical-align:top;padding:0 8px 10px 0;font-family:'Inter',sans-serif;font-size:14px;color:${BRAND_GOLD};font-weight:700;">2.</td>
                        <td style="padding:0 0 10px;font-family:'Inter',sans-serif;font-size:14px;color:${BRAND_TEXT};line-height:22px;">
                          Choose your preferred payment method (UPI / Card / Net Banking).
                        </td>
                      </tr>
                      <tr>
                        <td width="28" style="vertical-align:top;padding:0 8px 0 0;font-family:'Inter',sans-serif;font-size:14px;color:${BRAND_GOLD};font-weight:700;">3.</td>
                        <td style="padding:0;font-family:'Inter',sans-serif;font-size:14px;color:${BRAND_TEXT};line-height:22px;">
                          Complete the payment &mdash; your phone will be shipped right away!
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Support Section -->
          <tr>
            <td align="center" style="padding:35px 20px;background-color:${BRAND_IVORY};">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
                <tr>
                  <td align="center">
                    <h3 style="margin:0 0 6px;font-family:'Playfair Display',Georgia,serif;font-size:20px;color:${BRAND_DARK};font-weight:700;">
                      Need Help?
                    </h3>
                    <p style="margin:0 0 14px;font-family:'Inter',sans-serif;font-size:14px;color:${BRAND_TEXT_LIGHT};line-height:22px;">
                      Our support team is here to help you. Reach out anytime.
                    </p>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
                      <tr>
                        <td align="center" style="padding:0 12px;">
                          <a href="mailto:support@ergoaurashop.com" style="font-family:'Inter',sans-serif;font-size:14px;color:${BRAND_GOLD};text-decoration:none;font-weight:600;">
                            ✉ support@ergoaurashop.com
                          </a>
                        </td>
                        <td align="center" style="padding:0 12px;border-left:1px solid #EAE3D5;">
                          <a href="tel:+919496090395" style="font-family:'Inter',sans-serif;font-size:14px;color:${BRAND_GOLD};text-decoration:none;font-weight:600;">
                            📞 +919496090395
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:30px 20px;background-color:${BRAND_DARK};">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
                <tr>
                  <td align="center" style="padding-bottom:16px;">
                    <a href="${SITE_URL}" target="_blank" style="font-family:'Playfair Display',Georgia,serif;font-size:22px;color:${BRAND_GOLD};text-decoration:none;font-weight:700;letter-spacing:1px;">ErgoAura</a>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-bottom:14px;">
                    <a href="${SITE_URL}/products" style="font-family:'Inter',sans-serif;font-size:13px;color:${BRAND_TEXT_MUTED};text-decoration:none;margin:0 10px;">Shop All</a>
                    <span style="font-family:'Inter',sans-serif;font-size:13px;color:${BRAND_TEXT_MUTED};">|</span>
                    <a href="${SITE_URL}/track-order" style="font-family:'Inter',sans-serif;font-size:13px;color:${BRAND_TEXT_MUTED};text-decoration:none;margin:0 10px;">Track Order</a>
                    <span style="font-family:'Inter',sans-serif;font-size:13px;color:${BRAND_TEXT_MUTED};">|</span>
                    <a href="mailto:support@ergoaurashop.com" style="font-family:'Inter',sans-serif;font-size:13px;color:${BRAND_TEXT_MUTED};text-decoration:none;margin:0 10px;">Contact</a>
                  </td>
                </tr>
                <tr>
                  <td align="center">
                    <p style="margin:0;font-family:'Inter',sans-serif;font-size:12px;color:${BRAND_TEXT_MUTED};line-height:18px;">
                      &copy; ${new Date().getFullYear()} ErgoAura Shop. All rights reserved.<br>
                      <span style="font-size:11px;">You received this email because you attempted to purchase on ErgoAura Shop.</span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

// ── Send Function ─────────────────────────────────────────────────────

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

// ── Data-quality warnings (typos / suspicious addresses) ──────────────
const FLAGS = {
  "gullasaini@359gmail.com": "Likely typo — did you mean gullasaini359@gmail.com?",
  "rb4944179@gemail.com": "Likely typo — did you mean rb4944179@gmail.com?",
  "sujeetpatil@59gmail.com": "Likely typo — did you mean sujeetpatil59@gmail.com?",
  "mr.patel@gmail.com": "Very generic address — confirm this is a real customer before sending.",
  "6chayanbiswasi.b.g.iti.c@gmail.com": "Unusual format — confirm this is a real address.",
};

function printWarnings() {
  console.log("📋 Data-quality review (before bulk send):");
  let found = 0;
  for (const c of CUSTOMERS) {
    if (FLAGS[c.email]) {
      console.log(`   ⚠️  ${c.email}`);
      console.log(`       → ${FLAGS[c.email]}`);
      found++;
    }
  }
  if (found === 0) console.log("   ✅ No flags detected.");
  console.log("");
}

// ── Main ──────────────────────────────────────────────────────────────

async function main() {
  const subject = `Complete Your Purchase — ${PRODUCT_NAME} at ErgoAura`;

  if (PAYMENT_LINK === "PAYMENT_LINK_PENDING") {
    console.error(
      "\n❌ PAYMENT_LINK is not set. Set S23_PAYMENT_LINK in .env.local or edit the\n   PAYMENT_LINK constant in this script before sending.\n",
    );
    process.exit(1);
  }

  printWarnings();

  if (DRY_RUN) {
    console.log("🔍 DRY-RUN — no emails will be sent.\n");
    console.log(`Subject: ${subject}`);
    console.log(`From:    ${RESEND_FROM_EMAIL}`);
    console.log(`Product: ${PRODUCT_NAME} (${PRODUCT_PRICE})`);
    console.log(`Payment Link (CTA): ${PAYMENT_LINK}\n`);
    console.log("Would send to:");
    CUSTOMERS.forEach((c, i) => {
      const name = c.name ? c.name : "(no name → greeting uses 'there')";
      console.log(`  ${i + 1}. ${name} <${c.email}>`);
    });
    console.log(
      `\nTotal recipients: ${CUSTOMERS.length} (DRY-RUN, nothing sent)`,
    );
    process.exitCode = 0;
    return;
  }

  if (TEST_MODE) {
    console.log(`🧪 TEST MODE — sending ONE email to ${TEST_EMAIL} only.\n`);
    const testHtml = buildEmailHtml({
      customerName: "Rohit Sharma",
    });
    console.log(`Subject: ${subject}`);
    console.log(`To:      ${TEST_EMAIL}\n`);
    try {
      const result = await sendEmailViaResend({
        to: TEST_EMAIL,
        subject,
        html: testHtml,
      });
      console.log(`  ✅ Test email sent successfully (id: ${result.id})`);
      console.log(
        "\nPlease check the email at " + TEST_EMAIL + " and confirm quality.",
      );
      console.log("Once confirmed, run the bulk send WITHOUT --test.");
      process.exitCode = 0;
      return;
    } catch (err) {
      console.error(`  ❌ Test send failed: ${err.message}`);
      process.exit(1);
    }
  }

  console.log(
    `📧 Sending payment-failed recovery emails to ${CUSTOMERS.length} customers...\n`,
  );

  let sent = 0;
  let failed = 0;

  for (let i = 0; i < CUSTOMERS.length; i++) {
    const { name, email } = CUSTOMERS[i];

    const html = buildEmailHtml({
      customerName: name,
    });

    console.log(
      `[${i + 1}/${CUSTOMERS.length}] Sending to ${name || "(no name)"} <${email}>...`,
    );

    try {
      const result = await sendEmailViaResend({
        to: email,
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

    // 500ms delay between sends to respect rate limits
    if (i < CUSTOMERS.length - 1) {
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  console.log("\n═══════════════════════════════════════");
  console.log("📊 Summary:");
  console.log(`   Total customers: ${CUSTOMERS.length}`);
  console.log(`   Sent:            ${sent}`);
  console.log(`   Failed:          ${failed}`);
  console.log("═══════════════════════════════════════\n");

  if (failed > 0) {
    console.log("⚠️  Some emails failed. Check the logs above for details.");
    process.exit(1);
  }

  console.log("✅ All emails sent successfully!");
  process.exitCode = 0;
  return;
}

main();
