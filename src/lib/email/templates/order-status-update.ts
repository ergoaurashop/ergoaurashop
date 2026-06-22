import { SITE_URL } from "@/lib/constants";
import type { Order } from "@/lib/types";
import { wrapEmailLayout, BRAND_COLORS, FONTS } from "../styles";

// =====================================================================
// Order Status Update Email
// =====================================================================

export interface OrderStatusUpdateEmailData {
  customerName: string;
  orderId: string;
  trackId: string;
  oldStatus: string;
  newStatus: string;
  /** Human-readable status label */
  newStatusLabel: string;
}

const STATUS_ICONS: Record<string, string> = {
  confirmed: "📦",
  shipped: "🚚",
  out_for_delivery: "📍",
  delivered: "✅",
  cancelled: "❌",
};

function statusTimeline(currentStatus: string): string {
  const statuses = [
    { key: "confirmed", label: "Confirmed" },
    { key: "shipped", label: "Shipped" },
    { key: "out_for_delivery", label: "Out for Delivery" },
    { key: "delivered", label: "Delivered" },
  ];

  const currentIndex = statuses.findIndex((s) => s.key === currentStatus);

  let timelineHtml = `
<!-- Status Timeline -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:20px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="480">`;

  statuses.forEach((status, i) => {
    const isCompleted = i <= currentIndex;
    const isCurrent = i === currentIndex;
    const icon = isCompleted ? "✓" : "○";
    const dotColor = isCompleted ? BRAND_COLORS.gold : BRAND_COLORS.ivoryDark;
    const labelColor = isCurrent ? BRAND_COLORS.dark : BRAND_COLORS.textMuted;
    const fontWeight = isCurrent ? "700" : "400";

    timelineHtml += `
        <tr>
          <td width="40" style="vertical-align:middle;text-align:center;padding:4px 0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td width="28" height="28" style="width:28px;height:28px;border-radius:50%;background-color:${dotColor};text-align:center;vertical-align:middle;">
                  <span style="font-size:13px;color:${BRAND_COLORS.white};font-weight:700;line-height:28px;">${icon}</span>
                </td>
              </tr>
            </table>
          </td>
          <td style="padding:4px 0;vertical-align:middle;">
            <span style="font-family:${FONTS.body};font-size:15px;color:${labelColor};font-weight:${fontWeight};">${status.label}</span>
            ${isCurrent ? '<span style="font-family:' + FONTS.body + ";font-size:11px;color:" + BRAND_COLORS.gold + ';margin-left:8px;text-transform:uppercase;letter-spacing:1px;">Current</span>' : ""}
          </td>
        </tr>`;

    if (i < statuses.length - 1) {
      timelineHtml += `
        <tr>
          <td style="text-align:center;padding:0;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
              <tr>
                <td width="2" height="24" style="width:2px;height:24px;background-color:${isCompleted ? BRAND_COLORS.gold : BRAND_COLORS.ivoryDark};font-size:1px;line-height:1px;">&nbsp;</td>
              </tr>
            </table>
          </td>
          <td style="padding:0;"></td>
        </tr>`;
    }
  });

  timelineHtml += `
      </table>
    </td>
  </tr>
</table>`;

  return timelineHtml;
}

function heroSection(data: OrderStatusUpdateEmailData): string {
  const icon = STATUS_ICONS[data.newStatus] ?? "📦";

  return `
<!-- Hero -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:40px 20px 10px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
        <tr>
          <td align="center" style="padding-bottom:12px;">
            <span style="font-size:40px;line-height:1;">${icon}</span>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:4px;">
            <h1 style="margin:0;font-family:${FONTS.heading};font-size:26px;color:${BRAND_COLORS.dark};font-weight:700;line-height:34px;">
              Order ${data.newStatusLabel}
            </h1>
          </td>
        </tr>
        <tr>
          <td align="center" style="padding-bottom:4px;">
            <p style="margin:0;font-family:${FONTS.body};font-size:15px;color:${BRAND_COLORS.textLight};line-height:22px;">
              Your order <strong>${data.orderId}</strong> has been updated.
            </p>
          </td>
        </tr>
        <tr>
          <td align="center">
            <span style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textMuted};">Track ID: </span>
            <span style="font-family:${FONTS.body};font-size:14px;font-weight:600;color:${BRAND_COLORS.dark};letter-spacing:1px;">${data.trackId}</span>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

export function orderStatusUpdateEmail(
  data: OrderStatusUpdateEmailData,
): string {
  const body = `
${heroSection(data)}
${statusTimeline(data.newStatus)}
`;

  return wrapEmailLayout(body, {
    previewText: `Your order ${data.orderId} is now ${data.newStatusLabel}.`,
  });
}
