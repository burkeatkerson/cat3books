import type { Metadata } from "next";
import type { Service, WithContext } from "schema-dts";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { PRICING_TIERS } from "@/lib/pricing";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import LandingHero from "@/components/landing/LandingHero";
import PainSection from "@/components/landing/PainSection";
import LeakCalculator from "@/components/landing/LeakCalculator";
import CostOfWaiting from "@/components/landing/CostOfWaiting";
import CleanBooksBenefits from "@/components/landing/CleanBooksBenefits";
import OfferSection from "@/components/landing/OfferSection";
import LandingPricing from "@/components/landing/LandingPricing";
import HowItWorks from "@/components/landing/HowItWorks";
import LandingFinalCTA from "@/components/landing/LandingFinalCTA";

export const metadata: Metadata = buildMetadata(
  "Restoration Bookkeeping Services | Job Costing, Supplements & Cash Flow — Cat3 Books",
  "Specialist bookkeeping for restoration contractors. Job costing on every project, supplement recovery, TPA margin tracking, and 13-week cash forecasting. Simple flat monthly pricing. No contracts. See what your books are leaking.",
  undefined,
  "/restoration-bookkeeping"
);

const serviceSchema: WithContext<Service> = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${site.url}/restoration-bookkeeping/#service`,
  name: "Restoration Bookkeeping",
  serviceType: "Bookkeeping and accounting for restoration contractors",
  provider: { "@id": `${site.url}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  description:
    "Specialist bookkeeping for restoration and remediation contractors: job costing on every project, approved-supplement recovery, TPA channel margin tracking, equipment billing reconciliation, and 13-week cash-flow forecasting — with simple, flat, no-contract monthly pricing.",
  offers: PRICING_TIERS.map((tier) => ({
    "@type": "Offer",
    name: tier.fullName,
    price: String(tier.monthly),
    priceCurrency: "USD",
    description: `${tier.tagline} Flat $${tier.monthly}/month — the same regardless of revenue or job volume, no annual contract.`,
  })),
};

export default function RestorationBookkeepingPage() {
  return (
    <>
      <JsonLd schema={serviceSchema} />
      <SiteHeader />
      <main id="top">
        <LandingHero />
        <PainSection />
        <LeakCalculator />
        <CostOfWaiting />
        <CleanBooksBenefits />
        <OfferSection />
        <LandingPricing />
        <HowItWorks />
        <LandingFinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
