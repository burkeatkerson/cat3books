import Link from "next/link";
import Container from "../Container";
import Overline from "../Overline";
import FadeUp from "../motion/FadeUp";
import PricingTierCards from "../PricingTierCards";
import { PAYROLL_ADDON, formatUsd } from "@/lib/pricing";

export default function LandingPricing() {
  return (
    <section id="pricing" className="relative py-16 xl:py-[108px] bg-c3-dark pricing-grid-bg">
      <Container>
        <FadeUp>
          <Overline>Simple Pricing · No Contracts</Overline>
          <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
            One flat price.
            <br />
            <span className="text-c3-yellow">Whatever your volume.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
            No hourly mystery invoices. No percentage of revenue that climbs as you
            grow. Just three done-for-you packages at a flat monthly rate &mdash; the
            same whether you run 40 jobs a year or 400. Start with the books and add
            what you need, when you need it.
          </p>
        </FadeUp>

        <div className="mt-9">
          <PricingTierCards />
        </div>

        <FadeUp delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-c3-dim mt-6 text-center">
            Optional payroll processing · +${formatUsd(PAYROLL_ADDON.amount)} / {PAYROLL_ADDON.unit} · any package
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-cond font-semibold text-[20px] lg:text-[24px] text-c3-text mt-10 leading-[1.4] max-w-[760px] mx-auto text-center">
            Only one question left: how hard is it to switch? Almost not at all.{" "}
            <Link
              href="#how-it-works"
              className="text-c3-yellow border-b border-c3-yellow-dim hover:border-c3-yellow transition-colors duration-200"
            >
              See how onboarding works ↓
            </Link>
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
