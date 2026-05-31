"use client";

import { useState } from "react";
import Link from "next/link";
import FadeUp from "../motion/FadeUp";

/** Two snapshots of the same month's P&L — one as kept by a generalist, one by Cat3. */
const messyRows = [
  { label: "Total revenue", val: "$412,000", tone: "text-c3-text" },
  { label: "Job costing", val: "— none —", tone: "text-c3-red" },
  { label: "Supplements booked", val: "??? unclear", tone: "text-c3-red" },
  { label: "Margin by job", val: "unknown", tone: "text-c3-red" },
  { label: "Cash 8 weeks out", val: "a guess", tone: "text-c3-red" },
  { label: "Profit this month", val: "we think so?", tone: "text-[#dd8800]" },
];

const cleanRows = [
  { label: "Total revenue", val: "$412,000", tone: "text-c3-text" },
  { label: "Job costing", val: "every project", tone: "text-c3-green" },
  { label: "Supplements booked", val: "$31,400 ✓", tone: "text-c3-green" },
  { label: "Margin by job", val: "21.4% avg", tone: "text-c3-green" },
  { label: "Cash 8 weeks out", val: "+$96K forecast", tone: "text-c3-green" },
  { label: "Profit this month", val: "$74,180 net", tone: "text-c3-yellow" },
];

export default function LandingHero() {
  const [clean, setClean] = useState(false);
  const rows = clean ? cleanRows : messyRows;

  return (
    <section
      className="relative overflow-hidden border-b border-c3-border"
      aria-label="Hero"
    >
      <div className="absolute inset-0 pointer-events-none z-0 hero-grid-bg" aria-hidden />

      <div className="relative z-10 mx-auto w-full max-w-[1660px] grid grid-cols-1 md:grid-cols-[54fr_46fr]">
        {/* Left column — the reader is the hero */}
        <div className="px-5 sm:px-8 lg:px-[52px] xl:px-20 py-14 lg:py-24 flex flex-col justify-center">
          <FadeUp load delay={0.06} className="mb-6">
            <span className="inline-flex items-center gap-2 w-fit font-mono text-[10px] tracking-[0.08em] sm:tracking-[0.18em] uppercase px-[10px] py-[6px] border border-c3-yellow-dim text-c3-yellow bg-[rgba(240,190,0,0.05)]">
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-blink" />
              Bookkeeping for Restoration Contractors
            </span>
          </FadeUp>

          <FadeUp load delay={0.18}>
            <h1 className="font-disp text-[clamp(54px,7.5vw,104px)] leading-[0.9] tracking-[0.025em]">
              YOU SAVE
              <br />
              THE PROPERTY.
              <br />
              <span className="text-c3-yellow animate-glowPulse">WE SAVE</span>
              <br />
              <span className="text-c3-yellow">THE PROFIT.</span>
            </h1>
          </FadeUp>

          <FadeUp load delay={0.3}>
            <p className="font-cond font-light text-[clamp(18px,2.2vw,26px)] text-c3-mid mt-[26px] leading-[1.4] max-w-[560px]">
              Specialist bookkeeping for restoration contractors — job costing,
              supplement recovery, TPA margins, and cash you can actually see.{" "}
              <strong className="text-c3-text font-semibold">
                So every job you win actually makes you money.
              </strong>
            </p>
          </FadeUp>

          <FadeUp load delay={0.44}>
            <p className="font-body font-light text-base text-c3-mid mt-[22px] leading-[1.9] max-w-[540px]">
              You didn&rsquo;t get into this trade to reconcile a bank feed at 11pm.
              But right now your books can&rsquo;t tell you which jobs made money,
              which supplements never got booked, or whether you can make payroll in
              February. We can &mdash; because restoration is the only thing we do.
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
                href="#leak"
                className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] border border-c3-b2 text-c3-mid hover:border-c3-mid hover:text-c3-text transition-all duration-[220ms]"
              >
                See What You&rsquo;re Leaking ↓
              </Link>
            </div>
          </FadeUp>
        </div>

        {/* Right column — interactive before/after P&L */}
        <div className="px-5 sm:px-8 lg:px-[52px] xl:px-20 py-14 lg:py-24 border-t md:border-t-0 md:border-l border-c3-border flex flex-col justify-center">
          <FadeUp load delay={0.3}>
            <div className="p-5 sm:p-7 bg-[rgba(255,255,255,0.015)] border border-c3-border max-w-[520px] w-full">
              <div className="flex justify-between items-center pb-[14px] border-b border-c3-border gap-4">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-c3-dim">
                  Same Month · Same Jobs
                </span>
                <span
                  className={`inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase px-[10px] py-[6px] border transition-colors duration-300 ${
                    clean
                      ? "border-c3-yellow-dim text-c3-yellow bg-[rgba(240,190,0,0.05)]"
                      : "border-[rgba(204,42,0,0.4)] text-[#ff7a55] bg-[rgba(204,42,0,0.06)]"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current animate-blink" />
                  {clean ? "On Cat3 Books" : "Books Today"}
                </span>
              </div>

              {rows.map((r) => (
                <div
                  key={r.label}
                  className="flex justify-between items-center gap-4 py-[13px] border-b border-dashed border-c3-border font-body text-[13.5px] leading-[1.4] last:border-b-0"
                >
                  <span className="text-c3-mid flex-1">{r.label}</span>
                  <span
                    className={`font-mono text-[12px] tracking-[0.06em] whitespace-nowrap transition-colors duration-300 ${r.tone}`}
                  >
                    {r.val}
                  </span>
                </div>
              ))}

              {/* Toggle */}
              <div className="mt-5 flex items-center gap-1 p-1 bg-[rgba(255,255,255,0.02)] border border-c3-border">
                <button
                  type="button"
                  onClick={() => setClean(false)}
                  aria-pressed={!clean}
                  className={`flex-1 font-cond font-bold text-[12px] tracking-[0.10em] uppercase py-[11px] transition-colors duration-200 ${
                    !clean ? "bg-[rgba(204,42,0,0.12)] text-[#ff7a55]" : "text-c3-dim hover:text-c3-mid"
                  }`}
                >
                  Your Books Today
                </button>
                <button
                  type="button"
                  onClick={() => setClean(true)}
                  aria-pressed={clean}
                  className={`flex-1 font-cond font-bold text-[12px] tracking-[0.10em] uppercase py-[11px] transition-colors duration-200 ${
                    clean ? "bg-c3-yellow text-[#111]" : "text-c3-dim hover:text-c3-mid"
                  }`}
                >
                  On Cat3 Books
                </button>
              </div>

              <p className="mt-3 font-mono text-[10px] tracking-[0.14em] uppercase text-c3-dim text-center">
                {clean
                  ? "Same revenue. Now you can actually run it. →"
                  : "← Tap to see the same month with clean books"}
              </p>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
