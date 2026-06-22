// ── Payment Failed ──────────────────────────────────────────────────
export { paymentFailedEmail, buildPaymentFailedData } from "./payment-failed";
export type { PaymentFailedEmailData } from "./payment-failed";

// ── Order Confirmation ─────────────────────────────────────────────
export { orderConfirmationEmail } from "./order-confirmation";
export type { OrderConfirmationEmailData } from "./order-confirmation";

// ── Payment Captured ───────────────────────────────────────────────
export { paymentCapturedEmail } from "./payment-captured";
export type { PaymentCapturedEmailData } from "./payment-captured";

// ── Refund Processed ───────────────────────────────────────────────
export { refundProcessedEmail } from "./refund-processed";
export type { RefundProcessedEmailData } from "./refund-processed";

// ── Order Status Update ────────────────────────────────────────────
export { orderStatusUpdateEmail } from "./order-status-update";
export type { OrderStatusUpdateEmailData } from "./order-status-update";

// ── Welcome ────────────────────────────────────────────────────────
export { welcomeEmail } from "./welcome";
export type { WelcomeEmailData } from "./welcome";

// ── Abandoned Cart ─────────────────────────────────────────────────
export { abandonedCartEmail } from "./abandoned-cart";
export type { AbandonedCartEmailData } from "./abandoned-cart";
