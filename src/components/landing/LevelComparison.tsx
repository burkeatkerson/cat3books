"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "../Container";
import Overline from "../Overline";
import FadeUp from "../motion/FadeUp";
import { cn } from "@/lib/cn";
import { PRICING_TIERS } from "@/lib/pricing";

/** Capability groups, in ladder order. A row in group `g` is included in any column with index >= g. */
const groups: { title: string; rows: string[] }[] = [
  {
    title: "Bookkeeping",
    rows: [
      "Monthly close by the 15th",
      "Restoration chart of accounts",
      "Supplement recovery tracking",
      "TPA channel AR aging",
      "1099 & equipment tracking",
      "CPA-ready financials",
    ],
  },
  {
    title: "Job Costing",
    rows: [
      "Job-level P&L on every project",
      "Estimate-to-books mapping",
      "Margin by job, carrier & TPA",
      "Receipts tagged to jobs",
      "True margin before invoicing",
    ],
  },
  {
    title: "Fractional CFO",
    rows: [
      "13-week cash flow forecast",
      "CEO dashboard & KPIs",
      "Budget vs. actual + reporting",
      "AP intake + cash-flow advice",
      "AR & cash-position reporting",
      "Banking, lending & bonding",
      "Monthly CFO advisory call",
      "Tax strategy coordination",
    ],
  },
];

const shortNames = ["Books", "+ Job Cost", "+ CFO"];

export default function LevelComparison() {
  const [active, setActive] = useState(1); // featured tier

  const cell = (groupIndex: number, colIndex: number) => {
    const included = colIndex >= groupIndex;
    const isActive = colIndex === active;
    return (
      <div
        key={colIndex}
        className={cn(
          "flex items-center justify-center py-[11px] transition-colors duration-200",
          isActive && "bg-[rgba(240,190,0,0.05)]"
        )}
      >
        {included ? (
          <span
            className={cn(
              "font-mono text-[14px]",
              isActive ? "text-c3-yellow" : "text-[#2bb45c]"
            )}
            aria-label="included"
          >
            ✓
          </span>
        ) : (
          <span className="font-mono text-[13px] text-c3-dim" aria-label="not included">
            —
          </span>
        )}
      </div>
    );
  };

  return (
    <section
      id="compare"
      className="relative py-16 xl:py-[108px] bg-c3-black border-b border-c3-border"
    >
      <Container>
        <FadeUp>
          <Overline>Compare The Levels</Overline>
          <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
            Every level adds to
            <br />
            <span className="text-c3-yellow">the one below it.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
            Nothing is taken away as you climb &mdash; each level is everything
            under it, plus more. Tap a column to see exactly what&rsquo;s done for
            you at that level.
          </p>
        </FadeUp>

        <FadeUp delay={0.1}>
          <div className="mt-10 border border-c3-border bg-c3-card overflow-hidden">
            {/* Column headers */}
            <div className="grid grid-cols-[minmax(0,1fr)_58px_58px_58px] sm:grid-cols-[minmax(0,1fr)_120px_120px_120px] border-b border-c3-border">
              <div className="hidden sm:flex items-end px-5 py-4 font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
                What&rsquo;s done for you
              </div>
              <div className="sm:hidden" />
              {PRICING_TIERS.map((t, i) => {
                const isActive = i === active;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setActive(i)}
                    aria-pressed={isActive}
                    className={cn(
                      "px-1 sm:px-3 py-4 text-center transition-colors duration-200 border-l border-c3-border relative",
                      isActive ? "bg-c3-yellow" : "bg-c3-card hover:bg-[rgba(240,190,0,0.04)]"
                    )}
                  >
                    {t.featured && (
                      <span
                        className={cn(
                          "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[7px] sm:text-[8px] tracking-[0.16em] uppercase px-2 py-[2px] whitespace-nowrap",
                          isActive ? "bg-[#111] text-c3-yellow" : "bg-c3-yellow text-[#111]"
                        )}
                      >
                        Most Popular
                      </span>
                    )}
                    <span
                      className={cn(
                        "block font-cond font-bold text-[12px] sm:text-[15px] uppercase tracking-[0.03em] leading-tight",
                        isActive ? "text-[#111]" : "text-c3-text"
                      )}
                    >
                      <span className="sm:hidden">{shortNames[i]}</span>
                      <span className="hidden sm:inline">{t.name}</span>
                    </span>
                    <span
                      className={cn(
                        "block font-mono text-[8px] sm:text-[9px] tracking-[0.16em] uppercase mt-1.5",
                        isActive ? "text-[#111]/70" : "text-c3-dim"
                      )}
                    >
                      Level 0{i + 1}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Rows by group */}
            {groups.map((g, gi) => (
              <div key={g.title}>
                <div className="grid grid-cols-[minmax(0,1fr)_58px_58px_58px] sm:grid-cols-[minmax(0,1fr)_120px_120px_120px] bg-[rgba(255,255,255,0.02)] border-b border-c3-border">
                  <div className="px-4 sm:px-5 py-[10px] font-mono text-[9px] tracking-[0.2em] uppercase text-c3-yellow">
                    {g.title}
                  </div>
                  {[0, 1, 2].map((ci) => (
                    <div
                      key={ci}
                      className={cn(
                        "border-l border-c3-border",
                        ci === active && "bg-[rgba(240,190,0,0.05)]"
                      )}
                    />
                  ))}
                </div>
                {g.rows.map((row) => (
                  <div
                    key={row}
                    className="grid grid-cols-[minmax(0,1fr)_58px_58px_58px] sm:grid-cols-[minmax(0,1fr)_120px_120px_120px] border-b border-c3-border last:border-b-0"
                  >
                    <div className="px-4 sm:px-5 py-[11px] font-body font-light text-[12.5px] sm:text-[13.5px] text-c3-mid leading-[1.35] flex items-center">
                      {row}
                    </div>
                    {[0, 1, 2].map((ci) => (
                      <div key={ci} className="border-l border-c3-border">
                        {cell(gi, ci)}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}

            {/* CTA footer */}
            <div className="grid grid-cols-[minmax(0,1fr)_58px_58px_58px] sm:grid-cols-[minmax(0,1fr)_120px_120px_120px] border-t border-c3-border bg-[rgba(255,255,255,0.02)]">
              <div className="hidden sm:flex items-center px-5 py-4 font-mono text-[9px] tracking-[0.18em] uppercase text-c3-dim">
                Flat monthly · no annual contract
              </div>
              <div className="sm:hidden" />
              {PRICING_TIERS.map((t, i) => (
                <Link
                  key={t.id}
                  href="#contact"
                  className={cn(
                    "flex items-center justify-center px-1 py-3 border-l border-c3-border font-cond font-bold text-[10px] sm:text-[12px] tracking-[0.08em] uppercase transition-colors duration-200",
                    i === active
                      ? "bg-c3-yellow text-[#111] hover:bg-c3-yellow-2"
                      : "text-c3-mid hover:text-c3-yellow"
                  )}
                >
                  Choose →
                </Link>
              ))}
            </div>
          </div>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-mono text-[10px] tracking-[0.16em] uppercase text-c3-dim mt-5 text-center">
            Not sure which level? The free books audit tells you exactly where to start.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
