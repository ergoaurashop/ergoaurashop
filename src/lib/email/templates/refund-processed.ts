import { SITE_URL } from "@/lib/constants";
import type { Order } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { wrapEmailLayout, BRAND_COLORS, FONTS } from "../styles";

// =====================================================================
// Refund Processed Email
// =====================================================================

export interface RefundProcessedEmailData {
  customerName: string;
  orderId: string;
  refundAmount: number;
  refundReason?: string;
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
                <td width="72" height="72" style="width:72px;height:72px;background-color:#EFF6FF;border-radius:50%;text-align:center;vertical-align:middle;">
                  <span style="font-size:32px;line-height:72px;">💳</span>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:8px;">
            <h1 style="margin:0;font-family:${FONTS.heading};font-size:28px;color:${BRAND_COLORS.dark};font-weight:700;line-height:36px;">
              Refund Processed
            </h1>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:20px;">
            <p style="margin:0;font-family:${FONTS.body};font-size:16px;color:${BRAND_COLORS.textLight};line-height:24px;">
              We've processed a refund of <strong style="color:${BRAND_COLORS.gold};">{{AMOUNT}}</strong> for your order.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function refundBanner(data: RefundProcessedEmailData): string {
  return `
<!-- Refund Banner -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:10px 20px 20px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560" style="background-color:#EFF6FF;border:1px solid #BFDBFE;border-radius:6px;">
        <tr>
          <td style="padding:16px 20px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td style="font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.textLight};padding-bottom:4px;">Order</td>
                <td align="right" style="font-family:${FONTS.body};font-size:14px;font-weight:600;color:${BRAND_COLORS.dark};padding-bottom:4px;">${data.orderId}</td>
              </tr>
              <tr>
                <td style="font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.textLight};">Refund Amount</td>
                <td align="right" style="font-family:${FONTS.body};font-size:20px;font-weight:700;color:${BRAND_COLORS.gold};">${formatPrice(data.refundAmount)}</td>
              </tr>
              ${data.refundReason ? `<tr><td style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textLight};padding-top:8px;">Reason</td><td align="right" style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.text};padding-top:8px;">${data.refundReason}</td></tr>` : ""}
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

function infoSection(): string {
  return `
<!-- Info -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:0 20px 30px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
        <tr>
          <td style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textLight};line-height:20px;">
            The refund may take 5–10 business days to appear in your account, depending on your bank or payment provider.
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

export function refundProcessedEmail(data: RefundProcessedEmailData): string {
  const body = `
${heroSection().replace("{{AMOUNT}}", formatPrice(data.refundAmount))}
${refundBanner(data)}
${infoSection()}
`;

  return wrapEmailLayout(body, {
    previewText: `Refund of ${formatPrice(data.refundAmount)} processed for order ${data.orderId}.`,
  });
}
