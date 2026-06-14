import type { Metadata } from "next";
import { SITE_METADATA, SITE_URL } from "@/lib/constants";
import ContactUsClient from "./ContactUsClient";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with ErgoAura Shop. Reach our support team via email, social media, or visit our warehouses in Bangalore and Dubai.",
  alternates: {
    canonical: `${SITE_URL}/contact-us`,
  },
  openGraph: {
    title: `Contact Us | ${SITE_METADATA.title}`,
    description:
      "Get in touch with ErgoAura Shop. Reach our support team via email, social media, or visit our locations.",
    url: `${SITE_URL}/contact-us`,
  },
};

export default function ContactUsPage() {
  return <ContactUsClient />;
}
