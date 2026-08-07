"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Card from "@/components/ui/Card";
import { SITE_URL } from "@/lib/constants";
import BreadcrumbSchemaClient from "@/components/seo/BreadcrumbSchemaClient";

const SECTIONS = [
  {
    id: "definitions",
    title: "1. Definitions & Interpretation",
    content: `In these Terms & Conditions, "Company", "We", "Us", or "Our" refers to ErgoAura Shop. "Customer", "You", or "Your" refers to the user or purchaser of our products and services. "Products" refers to all items listed for sale on our platform. "Platform" refers to the website ergoaurashop.com and any associated services. "Agreement" refers to these Terms & Conditions as a whole. Headings are for convenience only and do not affect interpretation.`,
  },
  {
    id: "eligibility",
    title: "2. Eligibility & Account Registration",
    content: `By using our Platform, you represent that you are at least 18 years of age or accessing under the supervision of a parent or guardian. You agree to provide accurate, current, and complete information during registration. We reserve the right to suspend or terminate accounts that provide false information or violate these terms. You are responsible for maintaining the confidentiality of your account credentials.`,
  },
  {
    id: "pricing",
    title: "3. Product Listings & Pricing",
    content: `We strive to ensure that all product descriptions, images, and pricing are accurate. However, errors may occur. We reserve the right to correct any pricing errors and modify prices without prior notice. In the event of a pricing error, we may cancel the order and issue a full refund. Product images are for illustrative purposes; actual products may vary slightly. All prices are in Indian Rupees (INR) and inclusive of applicable taxes unless stated otherwise.`,
  },
  {
    id: "orders",
    title: "4. Orders & Acceptance",
    content: `Placing an order constitutes an offer by you to purchase our products. We reserve the right to accept or reject any order for any reason, including but not limited to product availability, pricing errors, or suspected fraud. Order confirmation emails are acknowledgments of receipt, not acceptance of the order. A contract is formed only when we dispatch the ordered products. We may cancel orders even after confirmation and issue a full refund.`,
  },
  {
    id: "payment",
    title: "5. Payment Terms",
    content: `Payments are processed through Razorpay, a secure third-party payment gateway. By submitting payment, you authorize us to charge the applicable amount using your selected payment method. We accept various payment methods including credit/debit cards, UPI, net banking, and wallets, subject to Razorpay's availability. All transactions are processed in Indian Rupees (INR). We do not store your complete payment information on our servers.`,
  },
  {
    id: "shipping",
    title: "6. Shipping & Delivery",
    content: `We aim to process and dispatch orders within 1-3 business days. Estimated delivery timelines are provided as guidelines and are not guaranteed. Delivery times may vary based on location, courier partner availability, and unforeseen circumstances. Risk of loss and title for products pass to you upon dispatch. You are responsible for providing accurate delivery address information. Failed delivery attempts due to incorrect addresses or non-availability may incur additional charges.`,
  },
  {
    id: "cancellation",
    title: "7. Cancellation & Refund Policy",
    content: `You may cancel an order within 24 hours of placement, provided the order has not yet entered "Shipped" status. Once an order is shipped, cancellations are not permitted. Approved refunds are processed within 7-14 business days. However, depending on banking protocols, intermediary verification procedures, and compliance requirements, the total refund cycle may extend up to 180 business days from the date of cancellation approval. A processing or restocking fee of up to 25% may be deducted from the refund amount. Refunds are issued only to the original payment method. Store credit may be issued at our sole discretion. We shall not be held liable for delivery failures due to force majeure events, including but not limited to natural disasters, strikes, governmental actions, courier partner issues, or circumstances beyond our reasonable control.`,
  },
  {
    id: "tracking",
    title: "8. Track & Trace System",
    content: `We provide a Track ID for all orders to monitor shipment status. Track ID accuracy and status updates are estimates only. The tracking system may experience delays in reflecting actual shipment status. We are not liable for any reliance placed on tracking information. The Track ID is for reference purposes and does not constitute a guarantee of delivery timelines.`,
  },
  {
    id: "intellectual-property",
    title: "9. Intellectual Property",
    content: `All content on our Platform, including but not limited to text, graphics, logos, images, product designs, trademarks, and software, is the property of ErgoAura Shop or its licensors and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, create derivative works from, or exploit any content without our prior written consent.`,
  },
  {
    id: "user-conduct",
    title: "10. User Conduct & Reviews",
    content: `You agree not to post false, misleading, or fraudulent reviews. By submitting reviews, comments, or other content, you grant us a non-exclusive, royalty-free, perpetual, irrevocable, and fully sub-licensable right to use, reproduce, modify, adapt, publish, and display such content. We reserve the right to remove or edit any user-generated content at our discretion.`,
  },
  {
    id: "privacy",
    title: "11. Data Protection & Privacy",
    content: `We collect, store, and process your personal information in accordance with our Privacy Policy. By using our Platform, you consent to such collection and processing. We implement reasonable security measures to protect your data. However, no method of transmission over the Internet is completely secure. We may use cookies and similar technologies to enhance your browsing experience.`,
  },
  {
    id: "liability",
    title: "12. Limitation of Liability",
    content: `To the maximum extent permitted by law, our total liability for any claim arising from or relating to these terms, our products, or our Platform is limited to the purchase price of the product giving rise to the claim. Under no circumstances shall we be liable for any consequential, indirect, incidental, special, exemplary, or punitive damages. We shall not be liable for delivery failures due to third-party carriers, natural disasters, strikes, governmental actions, or any force majeure events. Product descriptions are for informational purposes only; actual product may vary.`,
  },
  {
    id: "warranty",
    title: "13. Warranty & Guarantee",
    content: `All products are provided "AS IS" without any express or implied warranty, except as explicitly stated in the product listing. Manufacturer warranties, if any, pass through to the customer. We disclaim all implied warranties, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement.`,
  },
  {
    id: "indemnification",
    title: "14. Indemnification",
    content: `You agree to indemnify, defend, and hold harmless ErgoAura Shop, its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, liabilities, costs, and expenses arising from your use of the Platform, your violation of these terms, or your infringement of any third-party rights.`,
  },
  {
    id: "termination",
    title: "15. Termination",
    content: `We reserve the right to terminate or suspend your account and access to our Platform at any time, without notice, for any reason, including violation of these terms. Upon termination, your right to use the Platform immediately ceases. Provisions relating to intellectual property, limitation of liability, indemnification, and dispute resolution shall survive termination.`,
  },
  {
    id: "dispute-resolution",
    title: "16. Dispute Resolution & Governing Law",
    content: `Any dispute arising from or relating to these terms shall first be attempted to be resolved through good-faith negotiations. If unresolved, disputes shall be settled by binding arbitration in accordance with the Arbitration and Conciliation Act, 1996. The arbitration shall be conducted in English in [City], India. You waive your right to participate in class actions. These terms are governed by the laws of India.`,
  },
  {
    id: "amendments",
    title: "17. Amendments",
    content: `We reserve the right to modify, update, or change these Terms & Conditions at any time without prior notice. Changes will be effective immediately upon posting on our Platform. Your continued use of the Platform after any modifications constitutes acceptance of the updated terms. We encourage you to review these terms periodically.`,
  },
  {
    id: "severability",
    title: "18. Severability & Waiver",
    content: `If any provision of these terms is found to be unenforceable or invalid by a court of competent jurisdiction, the remaining provisions shall continue in full force and effect. Our failure to enforce any right or provision of these terms shall not constitute a waiver of such right or provision.`,
  },
  {
    id: "entire-agreement",
    title: "19. Entire Agreement",
    content: `These Terms & Conditions, together with our Privacy Policy, constitute the entire agreement between you and ErgoAura Shop regarding your use of our Platform and purchase of our products. They supersede all prior or contemporaneous communications, proposals, and agreements, whether oral or written.`,
  },
  {
    id: "contact",
    title: "20. Contact & Grievance Officer",
    content: `If you have any questions, concerns, or grievances regarding these Terms & Conditions, our products, or our services, please contact us:\n\nEmail: info@ergoaurashop.com\nGrievance Officer: support@ergoaurashop.com\n\nWe will endeavor to address your concerns within 30 days of receipt.`,
  },
];

const breadcrumbItems = [
  { name: "Home", url: SITE_URL },
  { name: "Terms & Conditions", url: `${SITE_URL}/terms` },
];

export default function TermsPage() {
  return (
    <>
      <BreadcrumbSchemaClient items={breadcrumbItems} />
      <div className="pt-28 sm:pt-32 pb-16">
        <div className="section-container">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-[#86868B] mb-6">
              <Link
                href="/"
                className="hover:text-apple-black transition-colors"
              >
                Home
              </Link>
              <span>/</span>
              <span className="text-apple-black font-medium">
                Terms & Conditions
              </span>
            </nav>
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12 text-center"
            >
              <h1 className="heading-xl mb-4">Terms & Conditions</h1>
              <p className="text-apple-text-secondary">
                Last updated: June 2026
              </p>
            </motion.div>

            {/* Navigation sidebar (desktop) */}
            <div className="lg:grid lg:grid-cols-4 lg:gap-10">
              <nav className="hidden lg:block lg:col-span-1">
                <div className="sticky top-28 space-y-1">
                  {SECTIONS.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-xs text-apple-text-secondary hover:text-apple-text-primary transition-colors py-1.5 leading-snug"
                    >
                      {section.title}
                    </a>
                  ))}
                </div>
              </nav>

              {/* Content */}
              <div className="lg:col-span-3 space-y-8">
                {SECTIONS.map((section, index) => (
                  <motion.div
                    key={section.id}
                    id={section.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card padding="lg">
                      <h2 className="text-lg font-semibold mb-3">
                        {section.title}
                      </h2>
                      <div className="text-sm text-apple-text-secondary leading-relaxed whitespace-pre-line">
                        {section.content}
                      </div>
                    </Card>
                  </motion.div>
                ))}

                {/* Footer note */}
                <Card padding="lg" className="bg-apple-black text-apple-white">
                  <p className="text-sm leading-relaxed">
                    By using ErgoAura Shop, you acknowledge that you have read,
                    understood, and agree to be bound by these Terms &
                    Conditions. If you do not agree with any part of these
                    terms, please discontinue use of our Platform immediately.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
