"use client";

import { useState } from "react";
import Link from "next/link";
import FadeUp from "../motion/FadeUp";
import { PRICING_TIERS, formatUsd } from "@/lib/pricing";

/** Per-level preview shown in the interactive hero panel. Order matches PRICING_TIERS. */
const previews: Record<
  string,
  { promise: string; rows: string[] }
> = {
  bookkeeping: {
    promise: "Books you can finally trust.",
    rows: [
      "Closed by the 15th — every month",
      "Supplements booked, not lost",
      "CPA-ready all year long",
    ],
  },
  "job-costing": {
    promise: "Real margin on every single job.",
    rows: [
      "A true P&L on every project",
      "Winners and losers, in black and white",
      "Bid the next job from data, not gut",
    ],
  },
  cfo: {
    promise: "A fractional CFO in your corner.",
    rows: [
      "See payroll coming 13 weeks out",
      "Big calls made with certainty",
      "A company that's actually worth selling",
    ],
  },
};

export default function DoneForYouHero() {
  const [active, setActive] = useState(1); // default to the featured tier
  const tier = PRICING_TIERS[active];
  const preview = previews[tier.id];

  return (
    <section className="relative overflow-hidden border-b border-c3-border" aria-label="Hero">
      <div className="absolute inset-0 pointer-events-none z-0 hero-grid-bg" aria-hidden />
      {/* Ghost watermark */}
      <div
        className="hidden md:block absolute right-[-4%] bottom-[-26%] z-0 font-disp text-[clamp(280px,32vw,560px)] leading-[0.8] text-c3-yellow opacity-[0.035] pointer-events-none select-none"
        aria-hidden
      >
        DFY
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1660px] grid grid-cols-1 md:grid-cols-[54fr_46fr]">
        {/* Left — the promise */}
        <div className="px-5 sm:px-8 lg:px-[52px] xl:px-20 py-14 lg:py-24 flex flex-col justify-center">
          <FadeUp load delay={0.06} className="mb-6">
            <span className="inline-flex items-center gap-2 w-fit font-mono text-[10px] tracking-[0.08em] sm:tracking-[0.18em] uppercase px-[10px] py-[6px] border border-c3-yellow-dim text-c3-yellow bg-[rgba(240,190,0,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-blink" />
              Bookkeeping · Job Costing · Fractional CFO
            </span>
          </FadeUp>

          <FadeUp load delay={0.18}>
            <h1 className="font-disp text-[clamp(64px,9vw,128px)] leading-[0.88] tracking-[0.025em]">
              DONE
              <br />
              FOR{" "}
              <span className="text-c3-yellow animate-glowPulse">YOU.</span>
            </h1>
          </FadeUp>

          <FadeUp load delay={0.3}>
            <p className="font-cond font-light text-[clamp(18px,2.2vw,26px)] text-c3-mid mt-[26px] leading-[1.4] max-w-[560px]">
              You run the trucks. We run the numbers &mdash; restoration
              bookkeeping, job costing, and a fractional CFO,{" "}
              <strong className="text-c3-text font-semibold">
                handled entirely for you.
              </strong>
            </p>
          </FadeUp>

          <FadeUp load delay={0.44}>
            <p className="font-body font-light text-base text-c3-mid mt-[22px] leading-[1.9] max-w-[540px]">
              No software to learn. No month-end scramble. No generalist guessing
              at supplements and TPA fees. You hand it over once, and three
              levels of done-for-you finance go to work &mdash; start at the
              bottom, climb when you&rsquo;re ready.
            </p>
          </FadeUp>

          <FadeUp load delay={0.58}>
            <div className="mt-8 flex gap-3 flex-wrap">
              <Link
                href="#contact"
                className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
              >
                Get Your Free Books Audit →
              </Link>
              <Link
                href="#levels"
                className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] border border-c3-b2 text-c3-mid hover:border-c3-mid hover:text-c3-text transition-all duration-[220ms]"
              >
                See the three levels ↓
              </Link>
            </div>
          </FadeUp>
        </div>

        {/* Right — interactive level preview */}
        <div className="px-5 sm:px-8 lg:px-[52px] xl:px-20 py-14 lg:py-24 border-t md:border-t-0 md:border-l border-c3-border flex flex-col justify-center">
          <FadeUp load delay={0.3}>
            <div className="p-5 sm:p-7 bg-[rgba(255,255,255,0.015)] border border-c3-border max-w-[520px] w-full">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-c3-dim pb-[14px] border-b border-c3-border">
                What &ldquo;done for you&rdquo; looks like
              </div>

              {/* Level selector */}
              <div className="mt-4 flex items-center gap-1 p-1 bg-[rgba(255,255,255,0.02)] border border-c3-border">
                {PRICING_TIERS.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={active === i}
                    className={`flex-1 font-cond font-bold text-[11px] sm:text-[12px] tracking-[0.06em] uppercase py-[11px] px-1 transition-colors duration-200 ${
                      active === i
                        ? "bg-c3-yellow text-[#111]"
                        : "text-c3-dim hover:text-c3-mid"
                    }`}
                  >
                    {i === 0 ? "Books" : i === 1 ? "+ Job Costing" : "+ CFO"}
                  </button>
                ))}
              </div>

              {/* Price + promise */}
              <div className="mt-5 flex items-end justify-between gap-4">
                <div>
                  <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow">
                    {tier.kicker}
                  </div>
                  <div className="font-cond font-bold text-[19px] uppercase tracking-[0.02em] text-c3-text leading-tight mt-1">
                    {preview.promise}
                  </div>
                </div>
                <div className="font-disp text-[44px] leading-none text-c3-yellow tracking-[0.01em] shrink-0">
                  ${formatUsd(tier.monthly)}
                  <small className="font-mono text-[12px] text-c3-mid"> /mo</small>
                </div>
              </div>

              {/* Outcome rows */}
              <div className="mt-5">
                {preview.rows.map((r) => (
                  <div
                    key={r}
                    className="flex items-center gap-3 py-[11px] border-b border-dashed border-c3-border last:border-b-0"
                  >
                    <span className="font-mono text-[13px] text-c3-green" aria-hidden>
                      ✓
                    </span>
                    <span className="font-body text-[13.5px] text-c3-text leading-[1.4]">
                      {r}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                href="#levels"
                className="mt-5 flex justify-center items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-3 bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
              >
                Walk me through it ↓
              </Link>
              <p className="mt-3 font-mono text-[10px] tracking-[0.14em] uppercase text-c3-dim text-center">
                Flat monthly · no contract · restoration only
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
