import React from "react";
import { Metadata } from "next";
import { getCollectionPage } from "@/lib/shopify/collections";
import { DealsPageClient } from "@/components/deals/DealsPageClient";

export const metadata: Metadata = {
  title: "Today's Deals | ErgoAuraShop.com",
  description: "Shop the best deals, flash sales and clearance offers. Updated daily.",
  openGraph: {
    title: "Today's Deals | ErgoAuraShop.com",
    description: "Shop the best deals, flash sales and clearance offers. Updated daily.",
    type: "website",
  },
};

export default async function DealsPage() {
  const collection = await getCollectionPage("deals");

  if (!collection) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <h1 className="text-2xl font-bold text-[#0a0f1e]">Deals Collection Not Found</h1>
        <p className="text-gray-500">Please create a collection with the handle "deals" in your Shopify admin.</p>
      </div>
    );
  }

  return <DealsPageClient initialCollection={collection} />;
}
