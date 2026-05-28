import Container from "./Container";
import Overline from "./Overline";
import FadeUp from "./motion/FadeUp";
import StaggerGroup from "./motion/StaggerGroup";
import StaggerItem from "./motion/StaggerItem";
import { STAGGER_TIGHT } from "@/lib/motion-config";

const timelineRows = [
  {
    mo: "OCT",
    evt: "Job billed. Crew paid. Subs paid.",
    sub: "You push out $42K",
    tag: "CASH OUT",
    tagClass:
      "text-[#ff7a55] border border-[rgba(204,42,0,0.4)] bg-[rgba(204,42,0,0.06)]",
  },
  {
    mo: "NOV",
    evt: "Equipment vendor paid. Supplements submitted for review.",
    sub: "Still nothing coming in",
    tag: "CASH OUT",
    tagClass:
      "text-[#ff7a55] border border-[rgba(204,42,0,0.4)] bg-[rgba(204,42,0,0.06)]",
  },
  {
    mo: "DEC",
    evt: "Carrier approves. TPA fee taken. Depreciation holdback set aside.",
    sub: "Approved — not paid",
    tag: "PENDING",
    tagClass:
      "text-[#dd8800] border border-[rgba(221,136,0,0.4)] bg-[rgba(221,136,0,0.06)]",
  },
  {
    mo: "JAN",
    evt: "ACV portion finally collected.",
    sub: "First dollar arrives — 3 months later",
    tag: "CASH IN",
    tagClass: "text-c3-yellow border border-c3-yellow-dim bg-[rgba(240,190,0,0.06)]",
  },
  {
    mo: "FEB",
    evt: "Line of credit drawn to make payroll.",
    sub: "Profitable on paper · broke in practice",
    tag: "CASH OUT",
    tagClass:
      "text-[#ff7a55] border border-[rgba(204,42,0,0.4)] bg-[rgba(204,42,0,0.06)]",
  },
  {
    mo: "MAR",
    evt: "RCV holdback finally released. Net positive — at last.",
    sub: "Job closes 5 months after you invoiced it",
    tag: "CASH IN",
    tagClass: "text-c3-yellow border border-c3-yellow-dim bg-[rgba(240,190,0,0.06)]",
  },
];

export default function CashflowSection() {
  return (
    <section className="relative py-16 xl:py-[108px] bg-c3-dark">
      <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16">
        <div>
          <FadeUp>
            <Overline>The Real Risk</Overline>
            <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
              GREAT
              <br />
              <span className="text-c3-yellow">REVENUE.</span>
              <br />
              <span className="[color:transparent] [-webkit-text-stroke:1.5px_#2A2A28]">NO</span>
              <br />
              CASH.
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-body font-medium text-[17px] text-c3-text mt-4 leading-[1.85]">
              This is the most common story in restoration. A $3M year. A $4M
              year. And somehow, you&rsquo;re borrowing from your line of credit
              in February.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <p className="font-body font-light text-[15px] text-c3-mid mt-4 leading-[1.85]">
              Restoration has the most deceptive cashflow structure of any trade.
              You bill a job in October. The carrier approves it — minus the
              deductible, minus the depreciation holdback, minus the TPA fee — in
              December. You collect the ACV portion in January. The RCV holdback
              comes in March. Meanwhile, you paid your crew in October, your subs
              in November, and your equipment vendor in December.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <p className="font-cond font-semibold text-[24px] text-c3-text mt-7 leading-[1.35] max-w-[480px] border-l-[3px] border-c3-yellow pl-5">
              You were profitable the whole time. But you were also broke for four
              months.
            </p>
          </FadeUp>
        </div>

        <div>
          <FadeUp>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow mb-[14px]">
              Six-month money mechanics · one job
            </div>
          </FadeUp>

          <StaggerGroup stagger={STAGGER_TIGHT} className="bg-c3-card border border-c3-border">
            {timelineRows.map(({ mo, evt, sub, tag, tagClass }) => (
              <StaggerItem key={mo + tag}>
                <div className="grid grid-cols-[52px_1fr] lg:grid-cols-[78px_1fr_110px] gap-x-[14px] lg:gap-x-[18px] items-center px-4 lg:px-[22px] py-4 border-b border-dashed border-c3-border last:border-b-0 hover:bg-[rgba(255,255,255,0.015)] transition-colors duration-200">
                  <div className="font-disp text-[20px] lg:text-[24px] text-c3-mid tracking-[0.04em] leading-none">
                    {mo}
                  </div>
                  <div>
                    <div className="font-body text-[13.5px] lg:text-[14px] text-c3-text leading-[1.45]">
                      {evt}
                    </div>
                    <div className="flex items-center justify-between mt-1 gap-2">
                      <small className="block font-mono text-[10px] text-c3-mid tracking-[0.14em] uppercase">
                        {sub}
                      </small>
                      <span
                        className={`lg:hidden shrink-0 font-mono text-[8px] tracking-[0.14em] text-center py-[5px] px-[8px] uppercase ${tagClass}`}
                      >
                        {tag}
                      </span>
                    </div>
                  </div>
                  <div
                    className={`hidden lg:block font-mono text-[9px] tracking-[0.18em] text-center py-[7px] px-[10px] uppercase ${tagClass}`}
                  >
                    {tag}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>

          <FadeUp delay={0.1}>
            <p className="font-body font-light text-[15px] text-c3-mid mt-[22px] leading-[1.85]">
              The only way to manage this without getting caught is with a real
              13-week cash forecast — built on accurate AR aging, broken down by
              carrier, by TPA program, by job stage. That&rsquo;s not something a
              generalist bookkeeper builds.{" "}
              <strong className="text-c3-text font-medium">
                It&rsquo;s what we build for every single client.
              </strong>
            </p>
          </FadeUp>
        </div>
      </div>
      </Container>
    </section>
  );
}
