"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "../Container";
import Overline from "../Overline";
import FadeUp from "../motion/FadeUp";
import { getTier } from "@/lib/pricing";

function fmt(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

/**
 * Each lever leaks a share of revenue when it is NOT handled. Rates are
 * deliberately conservative and sum to ~9.2% — in line with the 6–11% range
 * we see on real restoration cleanups.
 */
const levers = [
  {
    key: "jobcost",
    label: "We job-cost every single project",
    detail: "Loss-making jobs you can't see until it's too late",
    rate: 0.03,
  },
  {
    key: "supps",
    label: "We chase and recover every approved supplement",
    detail: "Earned, approved money that never gets booked",
    rate: 0.025,
  },
  {
    key: "tpa",
    label: "We know our true margin by TPA program",
    detail: "Channels that lose money on every job",
    rate: 0.015,
  },
  {
    key: "equip",
    label: "We reconcile equipment days to billing",
    detail: "Asset revenue that slips through unbilled",
    rate: 0.012,
  },
  {
    key: "receipts",
    label: "We tag field receipts to jobs the same week",
    detail: "Untraceable material spend hiding bad margin",
    rate: 0.01,
  },
] as const;

type LeverKey = (typeof levers)[number]["key"];

export default function LeakCalculator() {
  const [annual, setAnnual] = useState(2_000_000);
  // true = handled (no leak); default everything to "not handled" — the common reality.
  const [handled, setHandled] = useState<Record<LeverKey, boolean>>({
    jobcost: false,
    supps: false,
    tpa: false,
    equip: false,
    receipts: false,
  });

  const toggle = (k: LeverKey) =>
    setHandled((h) => ({ ...h, [k]: !h[k] }));

  const activeLevers = levers.filter((l) => !handled[l.key]);
  const annualLeak = activeLevers.reduce((sum, l) => sum + annual * l.rate, 0);
  const monthlyLeak = annualLeak / 12;
  const maxLever = Math.max(...levers.map((l) => annual * l.rate), 1);

  // Anchor the ROI comparison to the package that plugs exactly these gaps:
  // flat-rate bookkeeping + job costing, the same price at any revenue.
  const cat3Monthly = getTier("job-costing").monthly;

  return (
    <section
      id="leak"
      className="relative py-16 xl:py-[108px] bg-c3-dark pricing-grid-bg"
    >
      <Container>
        <FadeUp>
          <Overline>The Profit Leak Finder · Live</Overline>
          <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
            What is guessing
            <br />
            <span className="text-c3-yellow">actually costing you?</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
            Set your revenue. Then switch on every habit you have nailed down today.
            Leave the rest as they are. Watch what the gaps add up to &mdash; in your
            own numbers, in real time.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-9 bg-c3-card border border-c3-border p-5 sm:p-7 lg:p-10">
            {/* Revenue slider */}
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
              Your trailing 12-month revenue
            </div>
            <div className="font-disp text-[52px] sm:text-[70px] xl:text-[88px] text-c3-text leading-none mt-[10px] tracking-[0.01em]">
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

            <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-7 lg:gap-10 mt-9">
              {/* Lever toggles */}
              <div>
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mb-4">
                  Which of these do you have handled?
                </div>
                <div className="flex flex-col gap-[3px] bg-c3-border">
                  {levers.map((l) => {
                    const on = handled[l.key];
                    return (
                      <button
                        key={l.key}
                        type="button"
                        onClick={() => toggle(l.key)}
                        aria-pressed={on}
                        className="group flex items-center gap-4 text-left bg-c3-card hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-200 px-4 py-[14px]"
                      >
                        {/* switch */}
                        <span
                          className={`relative w-[42px] h-[22px] shrink-0 border transition-colors duration-200 ${
                            on
                              ? "bg-[rgba(24,122,56,0.25)] border-c3-green"
                              : "bg-[rgba(204,42,0,0.12)] border-[rgba(204,42,0,0.45)]"
                          }`}
                        >
                          <span
                            className={`absolute top-[2px] w-[16px] h-[16px] transition-all duration-200 ${
                              on ? "left-[22px] bg-c3-green" : "left-[2px] bg-[#ff7a55]"
                            }`}
                          />
                        </span>
                        <span className="flex-1">
                          <span
                            className={`block font-cond font-semibold text-[15px] leading-[1.25] tracking-[0.01em] transition-colors duration-200 ${
                              on ? "text-c3-text" : "text-c3-mid"
                            }`}
                          >
                            {l.label}
                          </span>
                          <span className="block font-body font-light text-[12px] text-c3-dim leading-[1.4] mt-0.5">
                            {on ? "Handled — no leak here" : l.detail}
                          </span>
                        </span>
                        <span
                          className={`font-mono text-[9px] tracking-[0.16em] uppercase whitespace-nowrap ${
                            on ? "text-c3-green" : "text-[#ff7a55]"
                          }`}
                        >
                          {on ? "Clean" : `−$${fmt(annual * l.rate)}`}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live result */}
              <div className="bg-[rgba(204,42,0,0.05)] border border-[rgba(204,42,0,0.35)] p-6 flex flex-col">
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#ff7a55]">
                  Estimated profit leaking out per year
                </div>
                <div className="font-disp text-[clamp(48px,7vw,84px)] leading-[0.92] text-c3-red mt-2 tracking-[0.01em]">
                  ${fmt(annualLeak)}
                </div>
                <div className="font-mono text-[11px] tracking-[0.14em] text-c3-mid mt-1">
                  ≈ ${fmt(monthlyLeak)} / month walking out the door
                </div>

                {/* Breakdown bars */}
                <div className="mt-6 flex flex-col gap-[10px]">
                  {levers.map((l) => {
                    const on = handled[l.key];
                    const dollars = annual * l.rate;
                    const pct = (dollars / maxLever) * 100;
                    return (
                      <div key={l.key}>
                        <div className="flex justify-between font-mono text-[9px] tracking-[0.1em] uppercase text-c3-dim mb-1">
                          <span className={on ? "line-through opacity-40" : ""}>
                            {l.detail}
                          </span>
                          <span className={on ? "text-c3-green" : "text-[#ff7a55]"}>
                            {on ? "fixed" : `$${fmt(dollars)}`}
                          </span>
                        </div>
                        <div className="h-[6px] bg-[rgba(255,255,255,0.04)] overflow-hidden">
                          <div
                            className={`h-full transition-all duration-500 ease-out ${
                              on ? "bg-c3-green/30" : "bg-c3-red"
                            }`}
                            style={{ width: on ? "4%" : `${Math.max(pct, 4)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-auto pt-6">
                  {annualLeak > 0 ? (
                    <p className="font-body font-light text-[13.5px] text-c3-text leading-[1.7]">
                      You&rsquo;re leaking about{" "}
                      <strong className="text-c3-yellow font-medium">
                        ${fmt(monthlyLeak)}/mo.
                      </strong>{" "}
                      Cat3 bookkeeping with full job costing &mdash; the package
                      built to plug exactly these gaps &mdash; is a flat{" "}
                      <strong className="text-c3-text font-medium">
                        ${fmt(cat3Monthly)}/mo,
                      </strong>{" "}
                      whatever your revenue.{" "}
                      {monthlyLeak > cat3Monthly
                        ? "Plugging even part of this more than pays for us."
                        : "And we go looking for leaks you haven't even listed here."}
                    </p>
                  ) : (
                    <p className="font-body font-light text-[13.5px] text-c3-text leading-[1.7]">
                      Every lever handled &mdash; impressive. If that&rsquo;s really
                      true across every job, every month, you&rsquo;re in rare air.
                      We&rsquo;ll prove it (or find the gaps) in a free audit.
                    </p>
                  )}
                  <Link
                    href="#contact"
                    className="mt-4 inline-flex w-full justify-center items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-3 bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
                  >
                    Find My Real Number →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-c3-dim mt-5 max-w-[720px] leading-[1.7]">
            Estimate only — based on margin recovery across real restoration
            cleanups. Your actual number comes from your actual books, in the audit.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
