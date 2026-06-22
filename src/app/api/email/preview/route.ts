// =====================================================================
// Email Template Preview API
// Visit /api/email/preview to see a gallery of all templates.
// Visit /api/email/preview?template=payment-failed to see one template.
// =====================================================================

import { NextResponse } from "next/server";
import { SITE_URL } from "@/lib/constants";

import {
  paymentFailedEmail,
  orderConfirmationEmail,
  paymentCapturedEmail,
  refundProcessedEmail,
  orderStatusUpdateEmail,
  welcomeEmail,
  abandonedCartEmail,
} from "@/lib/email/templates";
import type {
  PaymentFailedEmailData,
  OrderConfirmationEmailData,
  PaymentCapturedEmailData,
  RefundProcessedEmailData,
  OrderStatusUpdateEmailData,
  WelcomeEmailData,
  AbandonedCartEmailData,
} from "@/lib/email/templates";
import type { OrderProduct } from "@/lib/types";

// ── Sample Data ─────────────────────────────────────────────────────
const SAMPLE_IMAGE =
  "https://ergoaurashop.com/images/products/Anti-snoring%20chin%20strap/71Uhi%2BrYZNL._AC_SX679_.jpg";

const SAMPLE_PRODUCTS: OrderProduct[] = [
  {
    product_id: "anti-snoring-chin-strap",
    name: "Anti-Snoring Chin Strap – Adjustable Sleep Aid for Better Breathing",
    price: 999,
    quantity: 1,
    image: SAMPLE_IMAGE,
  },
  {
    product_id: "magnetic-usb-cable",
    name: "Magnetic USB Cable 3-in-1 – Fast Charging Braided Cord",
    price: 599,
    quantity: 2,
    image:
      "https://ergoaurashop.com/images/products/Magnetic%20USB%20cable/61LhXA9czEL._AC_SL1000_.jpg",
  },
];

const SAMPLE_ADDRESS = {
  line1: "123 Wellness Avenue",
  line2: "Apartment 4B",
  city: "Dubai",
  state: "Dubai",
  pincode: "000000",
};

// ── Template Config ──────────────────────────────────────────────────
const TEMPLATES: Record<
  string,
  {
    name: string;
    description: string;
    render: () => string;
  }
> = {
  "payment-failed": {
    name: "Payment Failed",
    description:
      "Sent when a Razorpay transaction fails. Includes product card + checkout CTA.",
    render: () => {
      const data: PaymentFailedEmailData = {
        customerName: "Ahmed",
        orderId: "ORD-TESTABC123",
        product: SAMPLE_PRODUCTS[0],
        products: SAMPLE_PRODUCTS,
        subtotal: 1598,
        total: 1598,
        checkoutUrl: `${SITE_URL}/checkout?retry_order=ORD-TESTABC123`,
        failureReason:
          "Your card could not be authenticated. Please try a different payment method.",
        paymentId: "pay_test_failed_001",
      };
      return paymentFailedEmail(data);
    },
  },
  "order-confirmation": {
    name: "Order Confirmation",
    description:
      "Sent immediately after a successful order is created. Includes product cards, summary, and tracking link.",
    render: () => {
      const data: OrderConfirmationEmailData = {
        customerName: "Ahmed",
        orderId: "ORD-CONFIRM456",
        trackId: "TRKABC123XYZ",
        products: SAMPLE_PRODUCTS,
        subtotal: 1598,
        discount: 200,
        shipping: 0,
        total: 1398,
        address: SAMPLE_ADDRESS,
      };
      return orderConfirmationEmail(data);
    },
  },
  "payment-captured": {
    name: "Payment Captured",
    description:
      "Sent when Razorpay confirms payment.success via webhook (reassurance email).",
    render: () => {
      const data: PaymentCapturedEmailData = {
        customerName: "Ahmed",
        orderId: "ORD-CAPTURE789",
        trackId: "TRKABC123XYZ",
        products: SAMPLE_PRODUCTS,
        total: 1398,
      };
      return paymentCapturedEmail(data);
    },
  },
  "refund-processed": {
    name: "Refund Processed",
    description: "Sent when a refund has been processed for an order.",
    render: () => {
      const data: RefundProcessedEmailData = {
        customerName: "Ahmed",
        orderId: "ORD-REFUND321",
        refundAmount: 1398,
        refundReason: "Item returned by customer",
      };
      return refundProcessedEmail(data);
    },
  },
  "order-status-update": {
    name: "Order Status Update",
    description:
      "Sent when an order status changes. Shows timeline with current status highlighted.",
    render: () => {
      const data: OrderStatusUpdateEmailData = {
        customerName: "Ahmed",
        orderId: "ORD-SHIP654",
        trackId: "TRKABC123XYZ",
        oldStatus: "confirmed",
        newStatus: "shipped",
        newStatusLabel: "Shipped",
      };
      return orderStatusUpdateEmail(data);
    },
  },
  welcome: {
    name: "Welcome",
    description:
      "Sent to new customers. Includes category exploration grid + shop CTA.",
    render: () => {
      const data: WelcomeEmailData = {
        customerName: "Ahmed",
      };
      return welcomeEmail(data);
    },
  },
  "abandoned-cart": {
    name: "Abandoned Cart",
    description:
      "Sent when a customer leaves items in their cart without completing the purchase.",
    render: () => {
      const data: AbandonedCartEmailData = {
        customerName: "Ahmed",
        customerEmail: "ahmed@example.com",
        items: SAMPLE_PRODUCTS,
        cartTotal: 1598,
        checkoutUrl: `${SITE_URL}/checkout?retry_cart=abc123`,
      };
      return abandonedCartEmail(data);
    },
  },
};

// ── Routes ──────────────────────────────────────────────────────────

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const templateKey = searchParams.get("template");

  // ── Single template view ─────────────────────────────────────────
  if (templateKey) {
    const template = TEMPLATES[templateKey];
    if (!template) {
      return new NextResponse(
        `<html><body><h1>Template "${templateKey}" not found</h1>
         <p>Available: ${Object.keys(TEMPLATES).join(", ")}</p></body></html>`,
        { headers: { "content-type": "text/html;charset=utf-8" } },
      );
    }

    const html = template.render();
    return new NextResponse(html, {
      headers: { "content-type": "text/html;charset=utf-8" },
    });
  }

  // ── Gallery view ────────────────────────────────────────────────
  let galleryHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ErgoAura — Email Template Preview</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, sans-serif;
      background: #F5F1EB;
      color: #1A1A1A;
      padding: 40px 20px;
    }
    .container { max-width: 900px; margin: 0 auto; }
    h1 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 32px;
      color: #1A1A1A;
      text-align: center;
      margin-bottom: 8px;
    }
    .subtitle {
      text-align: center;
      color: #666;
      font-size: 15px;
      margin-bottom: 36px;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }
    .card {
      background: #fff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
      transition: box-shadow 0.2s;
    }
    .card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.12); }
    .card-header {
      background: #1A1A1A;
      padding: 20px;
    }
    .card-header h2 {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 20px;
      color: #C9A962;
      margin-bottom: 4px;
    }
    .card-body {
      padding: 16px 20px 20px;
    }
    .card-body p {
      font-size: 14px;
      color: #666;
      line-height: 1.5;
      margin-bottom: 16px;
    }
    .card-body .links {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }
    .btn {
      display: inline-block;
      padding: 10px 20px;
      border-radius: 6px;
      font-size: 14px;
      font-weight: 600;
      text-decoration: none;
      transition: opacity 0.2s;
    }
    .btn:hover { opacity: 0.85; }
    .btn-primary {
      background: #C9A962;
      color: #fff;
    }
    .btn-secondary {
      background: #EAE3D5;
      color: #1A1A1A;
    }
    .btn-outline {
      border: 2px solid #C9A962;
      color: #C9A962;
      background: transparent;
    }
    .badge {
      display: inline-block;
      background: #F0FDF4;
      color: #16A34A;
      font-size: 12px;
      font-weight: 600;
      padding: 3px 10px;
      border-radius: 20px;
      margin-bottom: 10px;
    }
    hr {
      border: none;
      border-top: 1px solid #EAE3D5;
      margin: 40px 0;
    }
    .quick-links {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
      justify-content: center;
      margin-bottom: 36px;
    }
    .quick-links a {
      padding: 8px 16px;
      background: #fff;
      border: 1px solid #EAE3D5;
      border-radius: 6px;
      font-size: 13px;
      font-weight: 500;
      color: #1A1A1A;
      text-decoration: none;
      transition: border-color 0.2s;
    }
    .quick-links a:hover {
      border-color: #C9A962;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📧 Email Template Preview</h1>
    <p class="subtitle">ErgoAura Shop — All 7 transactional email templates with sample data</p>

    <div class="quick-links">
      ${Object.entries(TEMPLATES)
        .map(([key, tpl]) => `<a href="?template=${key}">${tpl.name}</a>`)
        .join("")}
    </div>

    <div class="grid">`;

  for (const [key, tpl] of Object.entries(TEMPLATES)) {
    galleryHtml += `
      <div class="card">
        <div class="card-header">
          <h2>${tpl.name}</h2>
        </div>
        <div class="card-body">
          <span class="badge">${key}</span>
          <p>${tpl.description}</p>
          <div class="links">
            <a href="?template=${key}" class="btn btn-primary" target="_blank">View Template</a>
            <a href="https://resend.com/emails" class="btn btn-outline" target="_blank">Resend Dashboard</a>
          </div>
        </div>
      </div>`;
  }

  galleryHtml += `
    </div>

    <hr>

    <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;color:#1A1A1A;text-align:center;margin-bottom:16px;">
      Source Files
    </h2>
    <div class="quick-links">
      <a href="/api/email/preview?template=payment-failed" target="_blank">payment-failed.ts</a>
      <a href="/api/email/preview?template=order-confirmation" target="_blank">order-confirmation.ts</a>
      <a href="/api/email/preview?template=payment-captured" target="_blank">payment-captured.ts</a>
      <a href="/api/email/preview?template=refund-processed" target="_blank">refund-processed.ts</a>
      <a href="/api/email/preview?template=order-status-update" target="_blank">order-status-update.ts</a>
      <a href="/api/email/preview?template=welcome" target="_blank">welcome.ts</a>
      <a href="/api/email/preview?template=abandoned-cart" target="_blank">abandoned-cart.ts</a>
    </div>

    <hr>

    <div style="text-align:center;font-size:13px;color:#999;">
      <p>Generated from ErgoAura Shop · Template preview uses sample data · Emails are not actually sent</p>
    </div>
  </div>
</body>
</html>`;

  return new NextResponse(galleryHtml, {
    headers: { "content-type": "text/html;charset=utf-8" },
  });
}
