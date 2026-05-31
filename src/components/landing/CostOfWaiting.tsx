"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "../Container";
import Overline from "../Overline";
import FadeUp from "../motion/FadeUp";

function fmt(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

/** Representative leak for a ~$3M restoration shop running on guesswork. */
const MONTHLY_LEAK = 8500;

/** Things that money quietly turns into — unlocked as the total crosses them. */
const milestones = [
  { at: 12000, label: "A full dehumidifier + air-mover refresh" },
  { at: 34000, label: "The down payment on a new box truck" },
  { at: 62000, label: "A year of a sharp project manager" },
  { at: 102000, label: "An entire second mitigation crew" },
  { at: 170000, label: "The cushion that gets you through a slow Q1 without the LOC" },
];

export default function CostOfWaiting() {
  const [months, setMonths] = useState(6);
  const total = months * MONTHLY_LEAK;

  return (
    <section className="relative py-16 xl:py-[108px] bg-c3-black border-y border-c3-border overflow-hidden">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16 items-start">
          <div>
            <FadeUp>
              <Overline>The Cost Of &ldquo;We&rsquo;ll Deal With It Later&rdquo;</Overline>
              <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
                The leak doesn&rsquo;t
                <br />
                wait.{" "}
                <span className="text-c3-red">Why are you?</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.1}>
              <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] leading-[1.8] max-w-[540px]">
                Here&rsquo;s the part nobody says out loud: the money isn&rsquo;t
                leaking once. It leaks every month you leave it alone &mdash; while
                the busy season buries the evidence and the supplements age past
                recovery. &ldquo;After the next big job&rdquo; is how three years go
                by.
              </p>
            </FadeUp>

            <FadeUp delay={0.15}>
              <p className="font-cond font-semibold text-[22px] text-c3-text mt-7 leading-[1.4] max-w-[480px] border-l-[3px] border-c3-red pl-5">
                The cheapest day to fix your books was a year ago. The second
                cheapest is today.
              </p>
            </FadeUp>

            <FadeUp delay={0.2}>
              <Link
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
              >
                Stop The Bleed →
              </Link>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <div className="bg-c3-card border border-c3-border p-5 sm:p-7 lg:p-8">
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
                If you wait this many months…
              </div>
              <div className="flex items-end gap-3 mt-2">
                <span className="font-disp text-[64px] sm:text-[80px] leading-none text-c3-yellow tracking-[0.01em]">
                  {months}
                </span>
                <span className="font-cond font-light text-[18px] text-c3-mid pb-3">
                  {months === 1 ? "month" : "months"}
                </span>
              </div>

              <input
                type="range"
                className="range-slider"
                min={1}
                max={24}
                step={1}
                value={months}
                onChange={(e) => setMonths(Number(e.target.value))}
                aria-label="Months you wait"
              />
              <div className="flex justify-between font-mono text-[9px] text-c3-dim tracking-[0.16em]">
                <span>1 mo</span>
                <span>1 yr</span>
                <span>2 yrs</span>
              </div>

              {/* Month stack */}
              <div className="flex flex-wrap gap-[3px] mt-6">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-6 flex-1 min-w-[8px] transition-colors duration-200 ${
                      i < months ? "bg-c3-red" : "bg-[rgba(255,255,255,0.05)]"
                    }`}
                  />
                ))}
              </div>

              {/* Running total */}
              <div className="mt-7 pt-6 border-t border-c3-border">
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#ff7a55]">
                  …gone, at roughly ${fmt(MONTHLY_LEAK)}/mo
                </div>
                <div className="font-disp text-[clamp(44px,6vw,72px)] leading-[0.95] text-c3-red mt-1 tracking-[0.01em]">
                  ${fmt(total)}
                </div>

                {/* Equivalence chips */}
                <div className="flex flex-col gap-2 mt-5">
                  {milestones.map((m) => {
                    const reached = total >= m.at;
                    return (
                      <div
                        key={m.at}
                        className={`flex items-center gap-3 font-body text-[13px] leading-[1.4] transition-opacity duration-300 ${
                          reached ? "opacity-100" : "opacity-30"
                        }`}
                      >
                        <span
                          className={`font-mono text-[11px] ${
                            reached ? "text-c3-red" : "text-c3-dim"
                          }`}
                          aria-hidden
                        >
                          {reached ? "✕" : "○"}
                        </span>
                        <span className={reached ? "text-c3-text" : "text-c3-dim"}>
                          {m.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
