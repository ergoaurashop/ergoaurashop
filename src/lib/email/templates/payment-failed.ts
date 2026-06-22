import { SITE_URL } from "@/lib/constants";
import type { Order, OrderProduct } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import {
  wrapEmailLayout,
  buildProductCard,
  BRAND_COLORS,
  FONTS,
} from "../styles";

// =====================================================================
// Payment Failed Email — beautifully redesigned for ErgoAura Shop
// =====================================================================

export interface PaymentFailedEmailData {
  customerName: string;
  orderId: string;
  /** Primary product from the failed order */
  product: OrderProduct;
  /** All products in the order (for summary) */
  products: OrderProduct[];
  subtotal: number;
  total: number;
  /** Checkout URL where the customer can retry payment */
  checkoutUrl: string;
  /** Reason for failure, if available */
  failureReason?: string;
  /** Payment ID, if available */
  paymentId?: string;
}

// ─── Hero Section ────────────────────────────────────────────────────
function heroSection(): string {
  return `
<!-- Hero Section -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:40px 20px 20px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
        <!-- Empathetic Icon -->
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
        <!-- Heading -->
        <tr>
          <td align="center" style="padding-bottom:8px;">
            <h1 style="margin:0;font-family:${FONTS.heading};font-size:28px;color:${BRAND_COLORS.dark};font-weight:700;line-height:36px;">
              Payment Didn't Go Through
            </h1>
          </td>
        </tr>
        <!-- Subheading -->
        <tr>
          <td align="center" style="padding-bottom:20px;">
            <p style="margin:0;font-family:${FONTS.body};font-size:16px;color:${BRAND_COLORS.textLight};line-height:24px;">
              Don't worry — it happens sometimes. Your items are still waiting for you.
            </p>
          </td>
        </tr>
        <!-- Divider -->
        <tr>
          <td align="center" style="padding-bottom:20px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="80" align="center">
              <tr>
                <td style="height:3px;background-color:${BRAND_COLORS.gold};font-size:1px;line-height:1px;">&nbsp;</td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

// ─── Order Summary Section ────────────────────────────────────────────
function orderSummarySection(data: PaymentFailedEmailData): string {
  return `
<!-- Order Summary -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:0 20px 10px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
        <tr>
          <td>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.ivory};border-radius:6px;">
              <tr>
                <td style="padding:14px 20px;">
                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                    <tr>
                      <td style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textLight};">
                        Order
                      </td>
                      <td align="right" style="font-family:${FONTS.body};font-size:13px;font-weight:600;color:${BRAND_COLORS.dark};">
                        ${data.orderId}
                      </td>
                    </tr>
                    <tr>
                      <td style="font-family:${FONTS.body};font-size:13px;color:${BRAND_COLORS.textLight};padding-top:4px;">
                        Amount
                      </td>
                      <td align="right" style="font-family:${FONTS.body};font-size:18px;font-weight:700;color:${BRAND_COLORS.gold};padding-top:4px;">
                        ${formatPrice(data.total)}
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

// ─── CTA Button ──────────────────────────────────────────────────────
function ctaButton(url: string, label: string): string {
  return `
<!-- CTA Button -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:16px 20px 24px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" align="center">
        <tr>
          <td align="center" style="border-radius:6px;background-color:${BRAND_COLORS.gold};padding:0;">
            <a href="${url}" target="_blank" style="display:inline-block;font-family:${FONTS.body};font-size:16px;font-weight:700;color:${BRAND_COLORS.white};text-decoration:none;padding:14px 40px;border-radius:6px;letter-spacing:0.5px;">
              ${label}
            </a>
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>`;
}

// ─── Failure Reason Banner ────────────────────────────────────────────
function failureReasonBanner(reason?: string): string {
  if (!reason) return "";

  return `
<!-- Failure Reason -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:0 20px 16px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560" style="background-color:#FEF2F2;border:1px solid #FECACA;border-radius:6px;">
        <tr>
          <td style="padding:12px 16px;">
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td width="24" style="vertical-align:top;font-size:16px;padding-right:8px;">⚠️</td>
                <td style="font-family:${FONTS.body};font-size:13px;color:#991B1B;line-height:20px;">
                  <strong>Reason:</strong> ${reason}
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

// ─── What Happens Next ───────────────────────────────────────────────
function nextStepsSection(): string {
  return `
<!-- Next Steps -->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${BRAND_COLORS.white};">
  <tr>
    <td align="center" style="padding:0 20px 30px;">
      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="560">
        <tr>
          <td>
            <h3 style="margin:0 0 12px;font-family:${FONTS.heading};font-size:18px;color:${BRAND_COLORS.dark};font-weight:700;">
              What Happens Next?
            </h3>
            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
              <tr>
                <td width="28" style="vertical-align:top;padding:0 8px 10px 0;font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.gold};font-weight:700;">1.</td>
                <td style="padding:0 0 10px;font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.text};line-height:22px;">
                  <strong>Click the button above</strong> to return to the checkout page.
                </td>
              </tr>
              <tr>
                <td width="28" style="vertical-align:top;padding:0 8px 10px 0;font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.gold};font-weight:700;">2.</td>
                <td style="padding:0 0 10px;font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.text};line-height:22px;">
                  Review your order and choose a <strong>different payment method</strong> if needed.
                </td>
              </tr>
              <tr>
                <td width="28" style="vertical-align:top;padding:0 8px 0 0;font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.gold};font-weight:700;">3.</td>
                <td style="padding:0;font-family:${FONTS.body};font-size:14px;color:${BRAND_COLORS.text};line-height:22px;">
                  Complete the payment — your order will be processed right away.
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

// ─── Main Template Function ──────────────────────────────────────────

/**
 * Build the full HTML for the Payment Failed email.
 *
 * This is a beautifully designed transactional email inspired by the
 * Wasleen Interior template, adapted for ErgoAura Shop's brand identity.
 *
 * Design elements kept from the original:
 *  - Gold accent bar at top
 *  - Dark header with brand logo + tagline
 *  - Hero section with empathetic heading
 *  - Product card with image, name, price, quantity
 *  - Prominent CTA button → product checkout URL
 *  - Support section with email/phone
 *  - Footer with brand links
 *
 * Design elements removed (not relevant for transactional):
 *  - Services grid, stats counters, YouTube video
 *  - Testimonials, limited-time offers, WhatsApp CTA
 */
export function paymentFailedEmail(data: PaymentFailedEmailData): string {
  const {
    customerName,
    product,
    products,
    subtotal,
    total,
    checkoutUrl,
    failureReason,
  } = data;

  const productUrl = checkoutUrl;

  const body = `
${heroSection()}

${failureReasonBanner(failureReason)}

${orderSummarySection(data)}

${buildProductCard({
  imageUrl: product.image,
  name: product.name,
  price: formatPrice(product.price),
  quantity: product.quantity,
  productUrl,
})}

${ctaButton(checkoutUrl, "Complete Your Purchase")}

${nextStepsSection()}
`;

  return wrapEmailLayout(body, {
    previewText: `Hey ${customerName}, your payment for ${product.name} didn't go through. Complete your purchase now.`,
  });
}

// ─── Helper: Build data from an Order object ─────────────────────────

/**
 * Build `PaymentFailedEmailData` from a stored `Order`.
 *
 * Use this in the webhook handler after querying the order from Supabase.
 */
export function buildPaymentFailedData(
  order: Order,
  options?: { failureReason?: string },
): PaymentFailedEmailData {
  const primaryProduct = order.products[0] ?? {
    product_id: "unknown",
    name: "Product",
    price: 0,
    quantity: 1,
    image: `${SITE_URL}/images/logo/ergoauralogo.webp`,
  };

  const checkoutUrl = `${SITE_URL}/checkout?retry_order=${order.order_id}`;

  return {
    customerName: order.customer_name,
    orderId: order.order_id,
    product: primaryProduct,
    products: order.products,
    subtotal: order.subtotal,
    total: order.total,
    checkoutUrl,
    failureReason: options?.failureReason,
    paymentId: order.payment_id,
  };
}
