import { SITE_URL } from "@/lib/constants";
import type { OrderProduct } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import {
  wrapEmailLayout,
  buildProductCard,
  BRAND_COLORS,
  FONTS,
} from "../styles";

// =====================================================================
// Abandoned Cart Email
// =====================================================================

export interface AbandonedCartEmailData {
  customerName: string;
  customerEmail: string;
  items: OrderProduct[];
  cartTotal: number;
  /** Checkout URL with cart token so they can resume */
  checkoutUrl: string;
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
            <span style="font-size:40px;line-height:1;">🛒</span>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:8px;">
            <h1 style="margin:0;font-family:${FONTS.heading};font-size:28px;color:${BRAND_COLORS.dark};font-weight:700;line-height:36px;">
              You Left Something Behind!
            </h1>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:20px;">
            <p style="margin:0;font-family:${FONTS.body};font-size:16px;color:${BRAND_COLORS.textLight};line-height:24px;">
              Your cart is still waiting. Complete your order before it sells out!
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function cartSummary(total: number): string {
  return `
<!-- Cart Summary -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:0 20px 20px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560" style="background-color:${BRAND_COLORS.ivory};border-radius:6px;">
        <tr>
          <td style="padding:14px 20px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textLight};">Cart Total</td>
                <td align="right" style="font-family:${FONTS.body};font-size:20px;font-weight:700;color:${BRAND_COLORS.gold};">${formatPrice(total)}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function checkoutCta(checkoutUrl: string): string {
  return `
<!-- Checkout CTA -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:10px 20px 30px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
        <tr>
          <td align="center" style="border-radius:6px;background-color:${BRAND_COLORS.gold};padding:0;">
            <a href="${checkoutUrl}" target="_blank" style="display:inline-block;font-family:${FONTS.body};font-size:16px;font-weight:700;color:${BRAND_COLORS.white};text-decoration:none;padding:14px 40px;border-radius:6px;letter-spacing:0.5px;">
              Complete Your Order
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

export function abandonedCartEmail(data: AbandonedCartEmailData): string {
  const body = `
${heroSection()}

${data.items
  .map((item) =>
    buildProductCard({
      imageUrl: item.image,
      name: item.name,
      price: formatPrice(item.price),
      quantity: item.quantity,
      productUrl: data.checkoutUrl,
    }),
  )
  .join("")}

${cartSummary(data.cartTotal)}
${checkoutCta(data.checkoutUrl)}
`;

  return wrapEmailLayout(body, {
    previewText: `Hey ${data.customerName}, you left items in your cart! Complete your purchase now.`,
  });
}
