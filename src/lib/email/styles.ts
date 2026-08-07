// =====================================================================
// Shared email styles and HTML wrapper for all ErgoAura Shop emails
// =====================================================================

export const BRAND_COLORS = {
  gold: "#C9A962",
  goldLight: "#D4B96E",
  dark: "#1A1A1A",
  darkSecondary: "#2A2A2A",
  ivory: "#F5F1EB",
  ivoryDark: "#EAE3D5",
  white: "#FFFFFF",
  text: "#333333",
  textLight: "#666666",
  textMuted: "#999999",
  error: "#DC2626",
} as const;

export const FONTS = {
  heading: "'Playfair Display', Georgia, 'Times New Roman', serif",
  body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
} as const;

const GOLD_ACCENT_BAR = `
<!-- Gold Accent Bar -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.gold};height:5px;">
  <tr><td style="height:5px;font-size:1px;line-height:1px;">&nbsp;</td></tr>
</table>`;

const DARK_HEADER = (brandLogoUrl: string) => `
<!-- Header -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.dark};">
  <tr>
    <td align="center" style="padding:30px 20px 20px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
        <tr>
          <td align="center">
           <a href="https://ergoaurashop.com" target="_blank" style="text-decoration:none;">
              <img src="${brandLogoUrl}" alt="ErgoAura" width="140" height="auto" style="display:block;border:0;outline:none;max-width:140px;height:auto;" />
            </a>
            <p style="margin:8px 0 0;font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.gold};letter-spacing:2px;text-transform:uppercase;mso-line-height-alt:18px;line-height:18px;">
              Wellness &bull; Kitchen &bull; Personal Care &bull; Electronics
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

const SUPPORT_SECTION = `
<!-- Support Section -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.ivory};">
  <tr>
    <td align="center" style="padding:35px 20px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
        <tr>
          <td align="center">
            <h3 style="margin:0 0 6px;font-family:${FONTS.heading};font-size:20px;color:${BRAND_COLORS.dark};font-weight:700;">
              Need Help?
            </h3>
            <p style="margin:0 0 14px;font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.textLight};line-height:22px;">
              Our support team is here to help you. Reach out anytime.
            </p>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td align="center" style="padding:0 12px;">
                  <a href="mailto:support@ergoaurashop.com" style="font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.gold};text-decoration:none;font-weight:600;">
                    ✉ support@ergoaurashop.com
                  </a>
                </td>
                <td align="center" style="padding:0 12px;border-left:1px solid ${BRAND_COLORS.ivoryDark};">
                  <a href="tel:+919496090395" style="font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.gold};text-decoration:none;font-weight:600;">
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
</table>`;

const FOOTER = ` 
<!-- Footer -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.dark};">
  <tr>
    <td align="center" style="padding:30px 20px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
        <tr>
          <td align="center" style="padding-bottom:16px;">
            <a href="https://ergoaurashop.com" target="_blank" style="font-family:${FONTS.heading};font-size:22px;color:${BRAND_COLORS.gold};text-decoration:none;font-weight:700;letter-spacing:1px;">ErgoAura</a>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:14px;">
            <a href="{{SITE_URL}}/products" style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textMuted};text-decoration:none;margin:0 10px;">Shop All</a>
            <span style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textMuted};">|</span>
            <a href="{{SITE_URL}}/track-order" style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textMuted};text-decoration:none;margin:0 10px;">Track Order</a>
            <span style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textMuted};">|</span>
            <a href="mailto:support@ergoaurashop.com" style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textMuted};text-decoration:none;margin:0 10px;">Contact</a>
          </td>
        </tr>
        <tr>
          <td align="center">
            <p style="margin:0;font-family:${FONTS.body};font-size:12px;color:${BRAND_COLORS.textMuted};line-height:18px;">
              &copy; ${new Date().getFullYear()} ErgoAura Shop. All rights reserved.<br>
              <span style="font-size:11px;">You received this email because you placed an order on ErgoAura Shop.</span>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;

const GLOBAL_STYLES = `
body{margin:0;padding:0;background-color:${BRAND_COLORS.ivory};font-family:${FONTS.body};}
table{border-collapse:collapse;}
img{border:0;outline:none;}
a img{border:0;}
`;

/**
 * Wraps inner HTML content in the full ErgoAura email layout.
 *
 * @param htmlBody  The inner content (without <html>/<body> tags)
 * @param options   Optional overrides
 * @returns         Complete HTML document string
 */
export function wrapEmailLayout(
  htmlBody: string,
  options?: { brandLogoUrl?: string; previewText?: string },
): string {
  const brandLogoUrl =
    options?.brandLogoUrl ??
    "https://ergoaurashop.com/images/logo/ergoauralogo.webp";
  const previewText =
    options?.previewText ?? "Thank you for choosing ErgoAura Shop.";

  return `<!DOCTYPE html>
<html lang="en" xmlns="https://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="x-apple-disable-message-reformatting">
  <title>ErgoAura Shop</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <style>
    table, td { border-collapse: collapse; }
    td { font-family: 'Segoe UI', sans-serif; }
  </style>
  <![endif]-->
  <!--[if !mso]><!-->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <!--<![endif]-->
  <style type="text/css">
${GLOBAL_STYLES}
  </style>
</head>
<body style="margin:0;padding:0;background-color:${BRAND_COLORS.ivory};">
  <!-- Preview Text (hidden) -->
  <div style="display:none;font-size:1px;color:${BRAND_COLORS.ivory};line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">
    ${previewText}
  </div>

  <!-- Full-width email container -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.ivory};">
    <tr>
      <td align="center" style="padding:12px 0;">
        <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600" style="background-color:${BRAND_COLORS.white};border-radius:8px;overflow:hidden;">

${GOLD_ACCENT_BAR}
${DARK_HEADER(brandLogoUrl)}

${htmlBody}

${SUPPORT_SECTION}
${FOOTER}

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Build an email-safe product card (used by multiple templates).
 */
export function buildProductCard(options: {
  imageUrl: string;
  name: string;
  price: string;
  quantity: number;
  productUrl: string;
}): string {
  const { imageUrl, name, price, quantity, productUrl } = options;

  return `
<!-- Product Card -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:10px 20px 20px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="520" style="border:1px solid ${BRAND_COLORS.ivoryDark};border-radius:8px;overflow:hidden;">
        <tr>
          <td style="padding:0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <!-- Product Image -->
                <td width="140" style="padding:0;vertical-align:top;">
                  <a href="${productUrl}" target="_blank">
                    <img src="${imageUrl}" alt="${name}" width="140" height="140" style="display:block;width:140px;height:140px;object-fit:cover;border:0;outline:none;" />
                  </a>
                </td>
                <!-- Product Details -->
                <td style="padding:16px 20px;vertical-align:top;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td>
                        <a href="${productUrl}" target="_blank" style="font-family:${FONTS.body};font-size:15px;font-weight:600;color:${BRAND_COLORS.dark};text-decoration:none;line-height:22px;">
                          ${name}
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:6px;">
                        <span style="font-family:${FONTS.body};font-size:16px;font-weight:700;color:${BRAND_COLORS.gold};">
                          ${price}
                        </span>
                        <span style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textLight};margin-left:8px;">
                          × ${quantity}
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding-top:12px;">
                        <a href="${productUrl}" target="_blank" style="display:inline-block;font-family:${FONTS.body};font-size:13px;font-weight:600;color:${BRAND_COLORS.white};background-color:${BRAND_COLORS.gold};padding:8px 18px;border-radius:4px;text-decoration:none;">
                          View Product
                        </a>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}
