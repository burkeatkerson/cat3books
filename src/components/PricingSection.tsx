"use client";

import { useState } from "react";
import Link from "next/link";
import Overline from "./Overline";
import { cn } from "@/lib/cn";

function fmt(n: number): string {
  return n.toLocaleString("en-US");
}

const tier1Features = [
  { text: "Full monthly bookkeeping & reconciliation", bold: true },
  { text: "Restoration-specific chart of accounts" },
  { text: "Job costing — every project, every month" },
  { text: "Estimate-to-books mapping (Xactimate, Albi, Dash, JobNimbus)" },
  { text: "Supplement recovery tracking & monthly report" },
  { text: "TPA channel AR aging by program" },
  { text: "Subcontractor W-9, COI & 1099 management" },
  { text: "Equipment revenue & asset tracking" },
  { text: "Monthly close by the 15th, every month" },
  { text: "CPA-ready financials, year-round" },
  { text: "Monthly review call" },
];

const tier2Features = [
  { text: "Everything in Core, plus —", bold: true },
  { text: "AP management — vendor bills & payment scheduling" },
  { text: "AR management — collections, aging, follow-up" },
  { text: "13-week rolling cash flow forecast" },
  { text: "Quarterly financial reporting package" },
  { text: "CEO dashboard — KPIs, job mix, TPA performance" },
  { text: "Budget vs. actual analysis" },
  { text: "Banking & lending relationship support" },
  { text: "Bonding & surety financial statement prep" },
  { text: "Monthly CFO advisory call (60 min)" },
  { text: "Tax strategy coordination with your CPA" },
];

export default function PricingSection() {
  const [annual, setAnnual] = useState(2000000);

  const monthly = annual / 12;
  const t1 = Math.min(3200, Math.max(750, Math.round(monthly * 0.0085)));
  const t2 = Math.min(6800, Math.max(2000, Math.round(monthly * 0.0185)));

  return (
    <section
      id="pricing"
      className="relative px-[52px] py-[108px] bg-c3-dark pricing-grid-bg md:px-5 md:py-16"
    >
      <Overline>Transparent Pricing</Overline>
      <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
        Pricing that
        <br />
        <span className="text-c3-yellow">grows with you.</span>
      </h2>
      <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
        One simple formula. You grow, we grow with you. You have a slow quarter,
        so do we. No flat rates that punish you at scale and no contracts that
        trap you.
      </p>

      {/* Calculator */}
      <div className="mt-9 bg-c3-card border border-c3-border p-10 relative md:p-6">
        <div className="grid grid-cols-[1fr_auto] gap-6 items-end md:grid-cols-1">
          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
              Your trailing 12-month revenue
            </div>
            <div className="font-disp text-[88px] text-c3-yellow leading-none mt-[10px] tracking-[0.01em]">
              ${fmt(annual)}
            </div>
          </div>
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim text-right max-w-[220px] md:hidden">
            Slide the bar to estimate →
          </div>
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[18px] mt-7">
          <div className="bg-[rgba(255,255,255,0.02)] border border-c3-border p-[22px]">
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mb-[10px]">
              Tier 1 — Core Bookkeeping
            </div>
            <div className="font-disp text-[52px] leading-none text-c3-text tracking-[0.01em]">
              ${fmt(t1)}
              <small className="font-mono text-[15px] text-c3-mid"> / mo</small>
            </div>
            <div className="font-mono text-[10px] text-c3-mid mt-[10px] tracking-[0.14em]">
              0.85% × monthly revenue · $750 floor · $3,200 cap · No contract
            </div>
          </div>
          <div className="bg-[rgba(255,255,255,0.02)] border border-c3-yellow p-[22px]">
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow mb-[10px]">
              Tier 2 — Books + Fractional CFO
            </div>
            <div className="font-disp text-[52px] leading-none text-c3-yellow tracking-[0.01em]">
              ${fmt(t2)}
              <small className="font-mono text-[15px] text-c3-mid"> / mo</small>
            </div>
            <div className="font-mono text-[10px] text-c3-mid mt-[10px] tracking-[0.14em]">
              1.85% × monthly revenue · $2,000 floor · $6,800 cap · No contract
            </div>
          </div>
        </div>
      </div>

      {/* Tier cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px] mt-10 bg-c3-border">
        {/* Tier 1 */}
        <div className="bg-c3-card p-9 border border-c3-border relative">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
            Tier One
          </div>
          <h3 className="font-cond font-bold text-[26px] uppercase tracking-[0.04em] mt-1.5">
            Core Bookkeeping
          </h3>
          <p className="font-body font-light text-[14px] text-c3-mid mt-2">
            The complete bookkeeping stack. Nothing more.
          </p>
          <div className="font-disp text-[56px] leading-none mt-5 tracking-[0.01em]">
            0.85%
            <small className="block font-mono text-[11px] text-c3-mid tracking-[0.18em] mt-2">
              × monthly revenue · capped at $3,200/mo
            </small>
          </div>
          <ul className="list-none p-0 mt-5 space-y-0">
            {tier1Features.map(({ text, bold }) => (
              <li
                key={text}
                className={cn("font-body font-light text-[13.5px] py-[9px] border-b border-dashed border-c3-border last:border-b-0 leading-[1.5] before:content-['▸_'] before:text-c3-yellow", bold ? "font-medium text-c3-text" : "text-c3-mid")}
              >
                {text}
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] border border-c3-b2 text-c3-mid hover:border-c3-mid hover:text-c3-text transition-all duration-[220ms] mt-6"
          >
            Start with Core Bookkeeping →
          </Link>
        </div>

        {/* Tier 2 — featured */}
        <div className="bg-c3-card p-9 border border-c3-yellow relative">
          <span className="absolute top-[-1px] right-[-1px] bg-c3-yellow text-[#111] font-cond font-bold text-[11px] tracking-[0.12em] uppercase py-[7px] px-3">
            MOST VALUE
          </span>
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
            Tier Two
          </div>
          <h3 className="font-cond font-bold text-[26px] uppercase tracking-[0.04em] mt-1.5 text-c3-yellow">
            Books + Fractional CFO
          </h3>
          <p className="font-body font-light text-[14px] text-c3-mid mt-2">
            Full financial oversight. Real strategic clarity.
          </p>
          <div className="font-disp text-[56px] leading-none mt-5 tracking-[0.01em]">
            1.85%
            <small className="block font-mono text-[11px] text-c3-mid tracking-[0.18em] mt-2">
              × monthly revenue · capped at $6,800/mo
            </small>
          </div>
          <ul className="list-none p-0 mt-5 space-y-0">
            {tier2Features.map(({ text, bold }) => (
              <li
                key={text}
                className={cn("font-body font-light text-[13.5px] py-[9px] border-b border-dashed border-c3-border last:border-b-0 leading-[1.5] before:content-['▸_'] before:text-c3-yellow", bold ? "font-medium text-c3-text" : "text-c3-mid")}
              >
                {text}
              </li>
            ))}
          </ul>
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms] mt-6"
          >
            Start with Full Package →
          </Link>
        </div>
      </div>

      {/* Payroll add-on */}
      <div className="mt-[26px] bg-c3-card border-t border-c3-yellow-dim py-6 px-7 flex items-center gap-6 flex-wrap">
        <div className="flex flex-col gap-1">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow">
            Optional Add-On · Either Tier
          </div>
          <div className="font-cond font-bold text-[20px] uppercase tracking-[0.04em]">
            Payroll Processing
          </div>
        </div>
        <div className="font-disp text-[38px] text-c3-yellow leading-none flex-1 text-right">
          +$400{" "}
          <small className="font-mono text-[11px] text-c3-mid">/ pay cycle</small>
        </div>
        <Link
          href="#contact"
          className="inline-flex items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-3 border border-c3-b2 text-c3-mid hover:border-c3-mid hover:text-c3-text transition-all duration-[220ms]"
        >
          Add Payroll
        </Link>
      </div>
    </section>
  );
}
