import type { Metadata } from "next";
import type { Service, WithContext } from "schema-dts";
import { generateMetadata as buildMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import { PRICING_TIERS } from "@/lib/pricing";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import DoneForYouHero from "@/components/landing/DoneForYouHero";
import PainSection from "@/components/landing/PainSection";
import LeakCalculator from "@/components/landing/LeakCalculator";
import LevelsIntro from "@/components/landing/LevelsIntro";
import ServiceLevel, { DFY_LEVELS } from "@/components/landing/ServiceLevel";
import LevelComparison from "@/components/landing/LevelComparison";
import LandingPricing from "@/components/landing/LandingPricing";
import HowItWorks from "@/components/landing/HowItWorks";
import LandingFinalCTA from "@/components/landing/LandingFinalCTA";

export const metadata: Metadata = buildMetadata(
  "Done For You: Restoration Bookkeeping, Job Costing & Fractional CFO — Cat3 Books",
  "Done-for-you finance for restoration contractors, in three flat-rate levels: bookkeeping, job costing, and a fractional CFO. We run the numbers so every job you win actually makes money. No contracts.",
  undefined,
  "/restoration-bookkeeping"
);

const serviceSchema: WithContext<Service> = {
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${site.url}/restoration-bookkeeping/#service`,
  name: "Restoration Bookkeeping",
  serviceType: "Done-for-you bookkeeping, job costing, and fractional CFO for restoration contractors",
  provider: { "@id": `${site.url}/#organization` },
  areaServed: { "@type": "Country", name: "United States" },
  description:
    "Done-for-you finance for restoration and remediation contractors in three flat-rate levels: full bookkeeping, job costing on every project, and a fractional CFO — with 13-week cash forecasting, supplement recovery, and TPA margin tracking. Simple, flat, no-contract monthly pricing.",
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
        <DoneForYouHero />
        <PainSection />
        <LeakCalculator />
        <LevelsIntro />
        {DFY_LEVELS.map((level, index) => (
          <ServiceLevel key={level.id} level={level} index={index} />
        ))}
        <LevelComparison />
        <LandingPricing />
        <HowItWorks />
        <LandingFinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
