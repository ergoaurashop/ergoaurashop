import { SITE_URL } from "@/lib/constants";
import type { Order } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import {
  wrapEmailLayout,
  buildProductCard,
  BRAND_COLORS,
  FONTS,
} from "../styles";

// =====================================================================
// Order Confirmation Email
// =====================================================================

export interface OrderConfirmationEmailData {
  customerName: string;
  orderId: string;
  trackId: string;
  products: Order["products"];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  address: Order["address"];
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
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td width="72" height="72" style="width:72px;height:72px;background-color:#F0FDF4;border-radius:50%;text-align:center;vertical-align:middle;">
                  <span style="font-size:32px;line-height:72px;">✅</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:8px;">
            <h1 style="margin:0;font-family:${FONTS.heading};font-size:28px;color:${BRAND_COLORS.dark};font-weight:700;line-height:36px;">
              Order Confirmed!
            </h1>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:4px;">
            <p style="margin:0;font-family:${FONTS.body};font-size:16px;color:${BRAND_COLORS.textLight};line-height:24px;">
              Thank you for your purchase. We're getting your order ready.
            </p>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:20px;">
            <span style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textMuted};">Track ID: </span>
            <span style="font-family:${FONTS.body};font-size:14px;font-weight:600;color:${BRAND_COLORS.dark};letter-spacing:1px;">{{TRACK_ID}}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function orderDetailsTable(data: OrderConfirmationEmailData): string {
  return `
<!-- Order Details -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:10px 20px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560" style="border:1px solid ${BRAND_COLORS.ivoryDark};border-radius:6px;">
        <tr>
          <td style="padding:16px 20px;background-color:${BRAND_COLORS.ivory};border-bottom:1px solid ${BRAND_COLORS.ivoryDark};">
            <h3 style="margin:0;font-family:${FONTS.heading};font-size:16px;color:${BRAND_COLORS.dark};font-weight:700;">
              Order Summary
            </h3>
          </td>
        </tr>
        <tr>
          <td style="padding:12px 20px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.textLight};padding:4px 0;">Order</td>
                <td align="right" style="font-family:${FONTS.body};font-size:14px;font-weight:600;color:${BRAND_COLORS.dark};padding:4px 0;">${data.orderId}</td>
              </tr>
              <tr>
                <td style="font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.textLight};padding:4px 0;">Subtotal</td>
                <td align="right" style="font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.dark};padding:4px 0;">${formatPrice(data.subtotal)}</td>
              </tr>
              ${data.discount > 0 ? `<tr><td style="font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.textLight};padding:4px 0;">Discount</td><td align="right" style="font-family:${FONTS.body};font-size:14px;color:#16A34A;padding:4px 0;">-${formatPrice(data.discount)}</td></tr>` : ""}
              <tr>
                <td style="font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.textLight};padding:4px 0;">Shipping</td>
                <td align="right" style="font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.dark};padding:4px 0;">${data.shipping === 0 ? "FREE" : formatPrice(data.shipping)}</td>
              </tr>
              <tr>
                <td style="padding-top:8px;border-top:2px solid ${BRAND_COLORS.ivoryDark};font-family:${FONTS.body};font-size:16px;font-weight:700;color:${BRAND_COLORS.dark};padding:8px 0 0;">Total</td>
                <td align="right" style="padding-top:8px;border-top:2px solid ${BRAND_COLORS.ivoryDark};font-family:${FONTS.body};font-size:18px;font-weight:700;color:${BRAND_COLORS.gold};padding:8px 0 0;">${formatPrice(data.total)}</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function shippingAddress(
  address: OrderConfirmationEmailData["address"],
): string {
  return `
<!-- Shipping Address -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:20px 20px 10px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
        <tr>
          <td>
            <h3 style="margin:0 0 8px;font-family:${FONTS.heading};font-size:15px;color:${BRAND_COLORS.dark};font-weight:700;">Shipping To</h3>
            <p style="margin:0;font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.text};line-height:22px;">
              ${address.line1}${address.line2 ? `, ${address.line2}` : ""}<br>
              ${address.city}, ${address.state} — ${address.pincode}
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function trackCta(trackUrl: string): string {
  return `
<!-- Track CTA -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:20px 20px 30px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
        <tr>
          <td align="center" style="border-radius:6px;background-color:${BRAND_COLORS.dark};padding:0;">
            <a href="${trackUrl}" target="_blank" style="display:inline-block;font-family:${FONTS.body};font-size:15px;font-weight:600;color:${BRAND_COLORS.white};text-decoration:none;padding:13px 32px;border-radius:6px;">
              Track Your Order
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

export function orderConfirmationEmail(
  data: OrderConfirmationEmailData,
): string {
  const body = `
${heroSection().replace("{{TRACK_ID}}", data.trackId)}

${data.products
  .map((p) =>
    buildProductCard({
      imageUrl: p.image,
      name: p.name,
      price: formatPrice(p.price),
      quantity: p.quantity,
      productUrl: `${SITE_URL}/products/${p.product_id}`,
    }),
  )
  .join("")}

${orderDetailsTable(data)}

${shippingAddress(data.address)}

${trackCta(`${SITE_URL}/track-order/${data.trackId}`)}
`;

  return wrapEmailLayout(body, {
    previewText: `Your order ${data.orderId} has been confirmed. Thank you for shopping at ErgoAura!`,
  });
}
