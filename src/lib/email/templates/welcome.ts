import { SITE_URL } from "@/lib/constants";
import { wrapEmailLayout, BRAND_COLORS, FONTS } from "../styles";

// =====================================================================
// Welcome Email
// Sent when a customer signs up or places their first order.
// =====================================================================

export interface WelcomeEmailData {
  customerName: string;
}

function heroSection(): string {
  return `
<!-- Hero -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:40px 20px 20px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
        <tr>
          <td align="center" style="padding-bottom:16px;">
            <span style="font-size:48px;line-height:1;">👋</span>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:8px;">
            <h1 style="margin:0;font-family:${FONTS.heading};font-size:28px;color:${BRAND_COLORS.dark};font-weight:700;line-height:36px;">
              Welcome to ErgoAura!
            </h1>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:20px;">
            <p style="margin:0;font-family:${FONTS.body};font-size:16px;color:${BRAND_COLORS.textLight};line-height:24px;">
              We're thrilled to have you on board. Discover hand-picked products at unbeatable prices.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function categoriesGrid(): string {
  const categories = [
    { name: "Wellness", url: `${SITE_URL}/categories/wellness`, icon: "🧘" },
    { name: "Kitchen", url: `${SITE_URL}/categories/kitchen`, icon: "🍳" },
    {
      name: "Personal Care",
      url: `${SITE_URL}/categories/personal-care`,
      icon: "✨",
    },
    {
      name: "Electronics",
      url: `${SITE_URL}/categories/electronics`,
      icon: "🔌",
    },
  ];

  let gridHtml = `
<!-- Categories Grid -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:10px 20px 20px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
        <tr>
          <td style="padding-bottom:14px;">
            <h3 style="margin:0;font-family:${FONTS.heading};font-size:18px;color:${BRAND_COLORS.dark};font-weight:700;text-align:center;">
              Explore Our Collections
            </h3>
          </td>
        </tr>
        <tr>`;

  categories.forEach((cat) => {
    gridHtml += `
          <td width="25%" style="padding:4px;text-align:center;vertical-align:top;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td align="center" style="padding:12px;">
                  <a href="${cat.url}" target="_blank" style="text-decoration:none;">
                    <span style="font-size:28px;display:block;margin-bottom:6px;">${cat.icon}</span>
                    <span style="font-family:${FONTS.body};font-size:12px;font-weight:600;color:${BRAND_COLORS.dark};text-decoration:none;">${cat.name}</span>
                  </a>
                </td>
              </tr>
            </table>
          </td>`;
  });

  gridHtml += `
        </tr>
      </table>
    </td>
  </tr>
</table>`;

  return gridHtml;
}

function shopCta(): string {
  return `
<!-- Shop CTA -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:10px 20px 30px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
        <tr>
          <td align="center" style="border-radius:6px;background-color:${BRAND_COLORS.gold};padding:0;">
            <a href="${SITE_URL}/products" target="_blank" style="display:inline-block;font-family:${FONTS.body};font-size:15px;font-weight:600;color:${BRAND_COLORS.white};text-decoration:none;padding:13px 36px;border-radius:6px;">
              Shop Now
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

export function welcomeEmail(data: WelcomeEmailData): string {
  const body = `
${heroSection()}
${categoriesGrid()}
${shopCta()}
`;

  return wrapEmailLayout(body, {
    previewText: `Welcome to ErgoAura, ${data.customerName}! Discover amazing products.`,
  });
}
