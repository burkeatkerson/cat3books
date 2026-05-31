"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "../Container";
import Overline from "../Overline";
import FadeUp from "../motion/FadeUp";

function fmt(n: number): string {
  return n.toLocaleString("en-US");
}

export default function LandingPricing() {
  const [annual, setAnnual] = useState(2_000_000);
  const monthly = annual / 12;
  const t1 = Math.min(3200, Math.max(750, Math.round(monthly * 0.0085)));
  const t2 = Math.min(6800, Math.max(2000, Math.round(monthly * 0.0185)));

  return (
    <section id="pricing" className="relative py-16 xl:py-[108px] bg-c3-dark pricing-grid-bg">
      <Container>
        <FadeUp>
          <Overline>Simple Pricing · No Contracts</Overline>
          <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
            One formula.
            <br />
            <span className="text-c3-yellow">It grows when you grow.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
            No hourly mystery invoices. No flat rate that punishes you for scaling.
            A simple percentage of revenue, with a floor and a hard cap so it never
            runs away from you. Slide your revenue to see your price.
          </p>
        </FadeUp>

        {/* Slider */}
        <FadeUp delay={0.1}>
          <div className="mt-9 bg-c3-card border border-c3-border p-5 sm:p-7 lg:p-10">
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
              Your trailing 12-month revenue
            </div>
            <div className="font-disp text-[52px] sm:text-[70px] xl:text-[88px] text-c3-yellow leading-none mt-[10px] tracking-[0.01em]">
              ${fmt(annual)}
            </div>
            <input
              type="range"
              className="range-slider"
              min={500000}
              max={10000000}
              step={100000}
              value={annual}
              onChange={(e) => setAnnual(Number(e.target.value))}
              aria-label="Annual revenue"
            />
            <div className="flex justify-between font-mono text-[9px] text-c3-dim tracking-[0.16em]">
              <span>$500K</span>
              <span>$2M</span>
              <span>$5M</span>
              <span>$10M</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px] mt-7 bg-c3-border">
              {/* Tier 1 */}
              <div className="bg-c3-card border border-c3-border p-7">
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
                  Core Bookkeeping
                </div>
                <h3 className="font-cond font-bold text-[22px] uppercase tracking-[0.03em] text-c3-text mt-1.5">
                  Books, Done Right
                </h3>
                <div className="font-disp text-[clamp(48px,6vw,68px)] leading-none text-c3-text mt-4 tracking-[0.01em]">
                  ${fmt(t1)}
                  <small className="font-mono text-[15px] text-c3-mid"> / mo</small>
                </div>
                <div className="font-mono text-[10px] text-c3-mid mt-3 tracking-[0.12em] leading-[1.6]">
                  0.85% × monthly revenue
                  <br />
                  $750 floor · $3,200 cap · No contract
                </div>
                <p className="font-body font-light text-[13.5px] text-c3-mid leading-[1.7] mt-4">
                  Full monthly books, restoration job costing, supplement tracking,
                  and CPA-ready financials closed by the 15th.
                </p>
                <Link
                  href="#contact"
                  className="mt-6 inline-flex w-full justify-center items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-[13px] border border-c3-b2 text-c3-mid hover:border-c3-mid hover:text-c3-text transition-all duration-[220ms]"
                >
                  Start With Core →
                </Link>
              </div>

              {/* Tier 2 — featured */}
              <div className="bg-c3-card border border-c3-yellow p-7 relative">
                <span className="absolute top-[-1px] right-[-1px] bg-c3-yellow text-[#111] font-cond font-bold text-[11px] tracking-[0.12em] uppercase py-[7px] px-3">
                  MOST VALUE
                </span>
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow">
                  Books + Fractional CFO
                </div>
                <h3 className="font-cond font-bold text-[22px] uppercase tracking-[0.03em] text-c3-yellow mt-1.5">
                  Run It Like A CFO
                </h3>
                <div className="font-disp text-[clamp(48px,6vw,68px)] leading-none text-c3-yellow mt-4 tracking-[0.01em]">
                  ${fmt(t2)}
                  <small className="font-mono text-[15px] text-c3-mid"> / mo</small>
                </div>
                <div className="font-mono text-[10px] text-c3-mid mt-3 tracking-[0.12em] leading-[1.6]">
                  1.85% × monthly revenue
                  <br />
                  $2,000 floor · $6,800 cap · No contract
                </div>
                <p className="font-body font-light text-[13.5px] text-c3-mid leading-[1.7] mt-4">
                  Everything in Core, plus cash forecasting, a CEO dashboard,
                  budget vs. actual, and a monthly CFO advisory call.
                </p>
                <Link
                  href="#contact"
                  className="mt-6 inline-flex w-full justify-center items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-[13px] bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
                >
                  Start With Full Package →
                </Link>
              </div>
            </div>

            <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-c3-dim mt-5 text-center">
              Optional payroll processing · +$400 / pay cycle · either tier
            </p>
          </div>
        </FadeUp>
      </Container>
    </section>
  );
}
