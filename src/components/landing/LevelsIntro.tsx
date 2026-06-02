import Link from "next/link";
import Container from "../Container";
import Overline from "../Overline";
import FadeUp from "../motion/FadeUp";
import StaggerGroup from "../motion/StaggerGroup";
import StaggerItem from "../motion/StaggerItem";
import { PRICING_TIERS, formatUsd } from "@/lib/pricing";

const subtitles: Record<string, string> = {
  bookkeeping: "The foundation",
  "job-costing": "The clarity",
  cfo: "The command",
};

const anchors: Record<string, string> = {
  bookkeeping: "#level-bookkeeping",
  "job-costing": "#level-job-costing",
  cfo: "#level-cfo",
};

export default function LevelsIntro() {
  return (
    <section id="levels" className="relative py-16 xl:py-[108px] bg-c3-black border-b border-c3-border">
      <Container>
        <FadeUp>
          <Overline>The Done-For-You Ladder</Overline>
          <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
            Three levels.
            <br />
            <span className="text-c3-yellow">Start where you are.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
            Every level is fully done for you &mdash; and every level builds on the
            one below it. Most shops start with clean books, add job costing once
            they want to know which work pays, and bring in the CFO when the
            decisions get bigger than the spreadsheet. Here&rsquo;s exactly what
            each one fixes.
          </p>
        </FadeUp>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-[3px] mt-10 bg-c3-border">
          {PRICING_TIERS.map((t, i) => (
            <StaggerItem key={t.id}>
              <Link
                href={anchors[t.id]}
                className={`group block h-full bg-c3-card p-7 border-t-[3px] transition-all duration-200 ${
                  t.featured
                    ? "border-c3-yellow hover:bg-[rgba(240,190,0,0.04)]"
                    : "border-c3-border hover:border-t-c3-yellow hover:bg-[rgba(240,190,0,0.03)]"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-disp text-[44px] leading-none text-c3-dim group-hover:text-c3-yellow transition-colors duration-200 tracking-[0.02em]">
                    0{i + 1}
                  </span>
                  <span className="font-disp text-[34px] leading-none text-c3-yellow tracking-[0.01em]">
                    ${formatUsd(t.monthly)}
                    <small className="font-mono text-[11px] text-c3-mid"> /mo</small>
                  </span>
                </div>
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mt-4">
                  {subtitles[t.id]}
                </div>
                <h3
                  className={`font-cond font-bold text-[22px] uppercase tracking-[0.02em] mt-1 leading-[1.1] ${
                    t.featured ? "text-c3-yellow" : "text-c3-text"
                  }`}
                >
                  {t.name === "Bookkeeping" ? "Bookkeeping" : t.name}
                </h3>
                <p className="font-body font-light text-[13.5px] text-c3-mid leading-[1.65] mt-3">
                  {t.tagline}
                </p>
                <span className="inline-flex items-center gap-1 font-cond font-bold text-[12px] tracking-[0.10em] uppercase text-c3-yellow mt-5 group-hover:gap-2 transition-all duration-200">
                  See level {i + 1} ↓
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
