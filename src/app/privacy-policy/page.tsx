import type { Metadata } from "next";
import Link from "next/link";
import { SITE_METADATA, SITE_URL } from "@/lib/constants";
import BreadcrumbSchema from "@/components/seo/BreadcrumbSchema";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "ErgoAura Shop Privacy Policy — how we collect, use, and protect your personal information.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
  openGraph: {
    title: `Privacy Policy | ${SITE_METADATA.title}`,
    description:
      "ErgoAura Shop Privacy Policy — how we collect, use, and protect your personal information.",
    url: `${SITE_URL}/privacy-policy`,
  },
};

const SECTIONS = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: `Welcome to ErgoAura Shop. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, disclose, and safeguard your information when you visit our website ergoaurashop.com and make purchases from our store.`,
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: `We may collect the following types of information:

• Personal Identification Information: Name, email address, phone number, shipping address, billing address
• Payment Information: Payment details are processed securely through Razorpay. We do not store complete payment card information on our servers
• Order Information: Product orders, order history, preferences, and customer service communications
• Technical Data: IP address, browser type, device information, operating system, and browsing behaviour on our site
• Usage Data: Pages visited, time spent on pages, click patterns, and referral sources`,
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: `We use the collected information for the following purposes:

• To process and fulfil your orders, including shipping and delivery
• To communicate with you about your orders, account, and customer service inquiries
• To send promotional offers, newsletters, and marketing communications (with your consent)
• To improve our website, products, and customer experience
• To comply with legal obligations and prevent fraudulent transactions
• To analyse website usage and trends to optimise our services`,
  },
  {
    id: "sharing",
    title: "4. Information Sharing and Disclosure",
    content: `We may share your information with:

• Service Providers: Third-party vendors who assist us with order fulfilment, payment processing (Razorpay), shipping, and analytics
• Legal Compliance: When required by law or to protect our rights, we may disclose information to regulatory authorities
• Business Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred

We do not sell your personal information to third parties.`,
  },
  {
    id: "data-security",
    title: "5. Data Security",
    content: `We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. This includes SSL encryption, secure payment processing through Razorpay, and restricted access to personal information on a need-to-know basis.`,
  },
  {
    id: "your-rights",
    title: "6. Your Rights",
    content: `You have the following rights regarding your personal data:

• Access: Request a copy of the personal data we hold about you
• Correction: Request correction of inaccurate or incomplete data
• Deletion: Request deletion of your personal data, subject to legal retention requirements
• Restriction: Request restriction of processing your data
• Data Portability: Request transfer of your data to another service provider
• Withdrawal of Consent: Withdraw consent at any time where we rely on consent for processing

To exercise any of these rights, please contact us at the email addresses provided below.`,
  },
  {
    id: "cookies",
    title: "7. Cookies and Tracking Technologies",
    content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience, analyse site traffic, and serve personalised content. We use Google Analytics (GA4) and Google Tag Manager (GTM) for analytics purposes.

You can control cookie preferences through your browser settings. Disabling certain cookies may affect the functionality of our website.

For more details, please refer to our Cookie Policy.`,
  },
  {
    id: "third-party",
    title: "8. Third-Party Services",
    content: `Our website integrates with the following third-party services:

• Razorpay: Secure payment processing
• Google Analytics (GA4): Website analytics and usage tracking
• Google Tag Manager (GTM): Tag management for analytics and marketing
• Supabase: Database hosting and authentication

Each third-party service has its own privacy policy governing the use of your information.`,
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal data, we will take steps to delete such information.`,
  },
  {
    id: "changes",
    title: "10. Changes to This Privacy Policy",
    content: `We may update this privacy policy from time to time. Any changes will be posted on this page with an updated revision date. We encourage you to review this policy periodically to stay informed about how we are protecting your information.`,
  },
  {
    id: "contact",
    title: "11. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:

Email: contact@ergoaurashop.com
Complaint Email: complaint@ergoaurashop.com`,
  },
];

const breadcrumbItems = [
  { name: "Home", url: SITE_URL },
  { name: "Privacy Policy", url: `${SITE_URL}/privacy-policy` },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <BreadcrumbSchema items={breadcrumbItems} />
      <div className="bg-[#F5F1EB] min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-32 pb-12 md:pt-36 md:pb-16 overflow-hidden">
          <div className="section-container">
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
                Privacy Policy
              </span>
            </nav>
            <h1 className="type-h1 text-center">Privacy Policy</h1>
            <p className="text-center text-[#86868B] mt-3 max-w-2xl mx-auto">
              Last updated: June 2026
            </p>
          </div>
        </section>

        {/* Content */}
        <div className="section-container pb-20">
          <div className="max-w-3xl mx-auto space-y-8">
            {SECTIONS.map((section) => (
              <div key={section.id} id={section.id}>
                <h2 className="type-h3 mb-3">{section.title}</h2>
                {section.content.split("\n").map((paragraph, i) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;
                  if (trimmed.startsWith("•")) {
                    return (
                      <li
                        key={i}
                        className="text-sm text-[#1A1614]/80 ml-4 mb-1 list-disc"
                      >
                        {trimmed.slice(2)}
                      </li>
                    );
                  }
                  return (
                    <p
                      key={i}
                      className="text-sm text-[#1A1614]/80 leading-relaxed mb-2"
                    >
                      {trimmed}
                    </p>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
