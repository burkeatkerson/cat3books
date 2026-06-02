import Image from "next/image";
import Container from "./Container";
import Overline from "./Overline";
import FadeUp from "./motion/FadeUp";
import StaggerGroup from "./motion/StaggerGroup";
import StaggerItem from "./motion/StaggerItem";

// Career ledger — the proof that earns the right to guide, kept terse and scannable
const ledger = [
  {
    tag: "Across industries",
    role: "Founder & operator · 2 exits",
    note: "Built and sold businesses in several industries. I know the books behind most kinds of enterprise.",
  },
  {
    tag: "Construction",
    role: "Owner · 100+ projects",
    note: "Ran aggressive job costing on over 100 projects — where project margin really lives once the field gets involved.",
  },
  {
    tag: "Restoration",
    role: "Financial Controller / CFO · 400+ jobs/yr",
    note: "Walked in with no costs tied to jobs and no view of profit. Built the job-costing system that showed true margin before invoices went out — and cut the tax bill while net profit climbed.",
  },
  {
    tag: "Today",
    role: "Fractional CFO · Cat3 Books",
    note: "Tight team, heavy lifting done myself, DBA in Financial Management underway — for restoration operators who need a numbers person in their corner.",
  },
];

const stats = [
  { num: "2", label: "Businesses built & exited" },
  { num: "400+", label: "Restoration jobs/yr, as CFO" },
  { num: "100+", label: "Construction jobs job-costed" },
  { num: "DBA", label: "Financial Management · in progress" },
];

export default function FounderSection() {
  return (
    <section id="founder" className="relative py-16 xl:py-[108px] border-t border-c3-border">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-[40fr_60fr] gap-10 xl:gap-16 items-start">
          {/* Portrait */}
          <FadeUp>
            <div className="relative">
              <div className="relative aspect-[4/5] overflow-hidden border border-c3-border bg-c3-card">
                <Image
                  src="/images/burke-latkerson.jpg"
                  alt="Burke Latkerson, founder of Cat3 Books and fractional CFO"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top"
                />
                {/* Name plate */}
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-[rgba(9,9,8,0.95)] via-[rgba(9,9,8,0.6)] to-transparent">
                  <div className="font-disp text-[30px] tracking-[0.03em] leading-none text-c3-text">
                    Burke Latkerson
                  </div>
                  <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow mt-[10px]">
                    Founder · Fractional CFO · DBA (in progress)
                  </div>
                </div>
              </div>
              {/* Corner accent */}
              <div
                className="absolute -top-px -left-px w-10 h-10 border-t-[3px] border-l-[3px] border-c3-yellow"
                aria-hidden
              />
            </div>
          </FadeUp>

          {/* Story + ledger */}
          <div>
            <FadeUp>
              <Overline>Who&rsquo;s In Your Corner</Overline>
              <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
                I&rsquo;m not the hero
                <br />
                of your story.
                <br />
                <span className="text-c3-yellow">You are.</span>
              </h2>
            </FadeUp>

            <FadeUp delay={0.08}>
              <p className="font-body font-light text-[15px] text-c3-mid mt-5 leading-[1.85]">
                I&rsquo;m Burke. I&rsquo;ve built and sold businesses across
                several industries, job-costed 100+ construction projects, and
                most recently sat in the Financial Controller and CFO seat of a
                restoration company running 400+ jobs a year. I&rsquo;ve stood
                where you&rsquo;re standing.
              </p>
            </FadeUp>

            <FadeUp delay={0.12}>
              <p className="font-body font-light text-[15px] text-c3-mid mt-4 leading-[1.85]">
                My job isn&rsquo;t to take the wheel. It&rsquo;s to hand you the
                numbers — real job margin, real cash, real tax position — so the
                calls you make are the right ones. You don&rsquo;t have to become
                a numbers person.{" "}
                <strong className="text-c3-text font-medium">
                  You just need one on your side of the table.
                </strong>
              </p>
            </FadeUp>

            <StaggerGroup className="mt-7 bg-c3-card py-1.5">
              {ledger.map(({ tag, role, note }) => (
                <StaggerItem key={tag}>
                  <div className="py-[15px] px-5 mx-[22px] border-b border-dashed border-c3-border last:border-b-0 border-l-[2px] border-l-c3-yellow [border-left-style:solid]">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <span className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow">
                        {tag}
                      </span>
                      <span className="font-cond font-semibold text-[15px] text-c3-text leading-tight">
                        {role}
                      </span>
                    </div>
                    <p className="font-body font-light text-[13px] text-c3-mid mt-1.5 leading-[1.7]">
                      {note}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </div>

        {/* Track-record stat strip */}
        <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-c3-border mt-8">
          {stats.map(({ num, label }) => (
            <StaggerItem key={label}>
              <div className="bg-c3-card p-6 h-full">
                <div className="font-disp text-[46px] text-c3-yellow leading-none tracking-[0.02em]">
                  {num}
                </div>
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mt-3">
                  {label}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
