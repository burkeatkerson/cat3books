import type { Metadata } from "next";
import type { AccountingService, WithContext } from "schema-dts";
import { generateMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Hero from "@/components/Hero";
import Ticker from "@/components/Ticker";
import ProblemSection from "@/components/ProblemSection";
import CashflowSection from "@/components/CashflowSection";
import AutopsySection from "@/components/AutopsySection";
import JobCostingSection from "@/components/JobCostingSection";
import ServicesSection from "@/components/ServicesSection";
import PricingSection from "@/components/PricingSection";
import TestimonialSection from "@/components/TestimonialSection";
import ReviewsSection from "@/components/ReviewsSection";
import CaseStudySection from "@/components/CaseStudySection";
import AboutSection from "@/components/AboutSection";
import FinalCTA from "@/components/FinalCTA";

export const metadata: Metadata = generateMetadata(
  "Cat3 Books — Restoration Bookkeeping. Restoration only.",
  "The only bookkeeping firm built exclusively for restoration contractors. Job costing, supplement recovery, expense management, fractional CFO — restoration only, always."
);

const businessSchema: WithContext<AccountingService> = {
  "@context": "https://schema.org",
  "@type": "AccountingService",
  name: "Cat3 Books",
  description:
    "The only bookkeeping firm built exclusively for restoration contractors. Job costing, supplement recovery, TPA channel AR, fractional CFO — restoration only, always.",
  url: site.url,
  email: site.email,
  areaServed: { "@type": "Country", name: "United States" },
  knowsAbout: [
    "restoration bookkeeping",
    "job costing",
    "supplement recovery",
    "TPA billing programs",
    "QuickBooks",
    "fractional CFO",
    "insurance restoration",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Restoration Bookkeeping Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Core Bookkeeping",
          description:
            "Full monthly bookkeeping at 0.85% of revenue, $750 floor, $3,200 cap. No annual contract.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Books + Fractional CFO",
          description:
            "Full bookkeeping plus fractional CFO services at 1.85% of revenue, $2,000 floor, $6,800 cap. No annual contract.",
        },
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd schema={businessSchema} />
      <SiteHeader />
      <main id="top">
        <Hero />
        <Ticker />
        <ProblemSection />
        <CashflowSection />
        <AutopsySection />
        <JobCostingSection />
        <ServicesSection />
        <PricingSection />
        <TestimonialSection />
        <ReviewsSection />
        <CaseStudySection />
        <AboutSection />
        <FinalCTA />
      </main>
      <SiteFooter />
    </>
  );
}
