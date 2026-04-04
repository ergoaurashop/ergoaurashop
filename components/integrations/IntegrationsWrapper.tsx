"use client";

import dynamic from "next/dynamic";

import { SocialProduct } from "../popups/SocialProof";

const TidioChat = dynamic(() => import("./TidioChat"), { ssr: false });
const SocialProof = dynamic(() => import("../popups/SocialProof"), { ssr: false });

interface IntegrationsWrapperProps {
  recentProducts: SocialProduct[];
}

export default function IntegrationsWrapper({ recentProducts }: IntegrationsWrapperProps) {
  return (
    <>
      <TidioChat />
      <SocialProof products={recentProducts} />
    </>
  );
}
