import Link from "next/link";
import Container from "./Container";
import Overline from "./Overline";
import FadeUp from "./motion/FadeUp";
import PricingTierCards from "./PricingTierCards";
import { PAYROLL_ADDON, formatUsd } from "@/lib/pricing";

export default function PricingSection() {
  return (
    <section
      id="pricing"
      className="relative py-16 xl:py-[108px] bg-c3-dark pricing-grid-bg"
    >
      <Container>
        <FadeUp>
          <Overline>Flat Monthly Pricing</Overline>
          <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
            Flat monthly pricing.
            <br />
            <span className="text-c3-yellow">No matter the volume.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
            Three packages, three prices. You&rsquo;re never billed on your
            revenue, your job count, or our hours &mdash; every package is fully
            done-for-you for one flat monthly fee. Forty jobs a year or four
            hundred, the price is the price. No annual contract, cancel anytime.
          </p>
        </FadeUp>

        <div className="mt-10">
          <PricingTierCards />
        </div>

        {/* Payroll add-on */}
        <FadeUp>
          <div className="mt-[26px] bg-c3-card border-t border-c3-yellow-dim py-6 px-7 flex items-center gap-6 flex-wrap">
            <div className="flex flex-col gap-1">
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow">
                Optional Add-On · Any Package
              </div>
              <div className="font-cond font-bold text-[20px] uppercase tracking-[0.04em]">
                Payroll Processing
              </div>
            </div>
            <div className="font-disp text-[38px] text-c3-yellow leading-none lg:flex-1 lg:text-right">
              +${formatUsd(PAYROLL_ADDON.amount)}{" "}
              <small className="font-mono text-[11px] text-c3-mid">
                / {PAYROLL_ADDON.unit}
              </small>
            </div>
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-3 border border-c3-b2 text-c3-mid hover:border-c3-mid hover:text-c3-text transition-all duration-[220ms]"
            >
              Add Payroll
            </Link>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
