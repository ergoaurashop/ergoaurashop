import { SITE_URL } from "@/lib/constants";
import type { Order } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { wrapEmailLayout, BRAND_COLORS, FONTS } from "../styles";

// =====================================================================
// Payment Captured Email
// Sent when Razorpay webhook confirms payment.success and the order
// already exists in the system (or was just auto-created).
// =====================================================================

export interface PaymentCapturedEmailData {
  customerName: string;
  orderId: string;
  trackId: string;
  products: Order["products"];
  total: number;
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
                  <span style="font-size:32px;line-height:72px;">💳</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:8px;">
            <h1 style="margin:0;font-family:${FONTS.heading};font-size:28px;color:${BRAND_COLORS.dark};font-weight:700;line-height:36px;">
              Payment Received!
            </h1>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:20px;">
            <p style="margin:0;font-family:${FONTS.body};font-size:16px;color:${BRAND_COLORS.textLight};line-height:24px;">
              We've successfully received your payment of <strong style="color:${BRAND_COLORS.gold};">{{AMOUNT}}</strong>.
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
          <td align="center" style="border-radius:6px;background-color:${BRAND_COLORS.gold};padding:0;">
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

export function paymentCapturedEmail(data: PaymentCapturedEmailData): string {
  const body = `
${heroSection().replace("{{AMOUNT}}", formatPrice(data.total))}

${trackCta(`${SITE_URL}/track-order/${data.trackId}`)}
`;

  return wrapEmailLayout(body, {
    previewText: `Payment of ${formatPrice(data.total)} received for order ${data.orderId}.`,
  });
}
