"use client";

import { useState } from "react";
import Container from "../Container";
import Overline from "../Overline";
import FadeUp from "../motion/FadeUp";

/** Restoration-specific pains. Click to reveal the hidden cost — the empathy payoff. */
const pains = [
  {
    head: "Your estimate says one thing, your books say another.",
    cost: "Xactimate, Albi, or Dash builds the job. QuickBooks never hears about half of it. Line items get lumped, supplements vanish, and your &ldquo;profit&rdquo; is fiction. We map the estimate to the books, line by line.",
  },
  {
    head: "Approved supplements that never made it into income.",
    cost: "The carrier said yes. The money was earned. But nobody booked it, nobody chased it, and it quietly aged out. The average restoration shop leaves 2&ndash;4% of revenue on the table here. We track every supplement to recovery.",
  },
  {
    head: "A pile of Home Depot receipts and no idea which job they belong to.",
    cost: "Field spend hits the card before the receipt hits anyone&rsquo;s hand. Untagged, it becomes a blob of &ldquo;materials&rdquo; that hides which jobs are actually bleeding. We tie every dollar to a project before it disappears.",
  },
  {
    head: "You took the TPA work because “it pays fast.”",
    cost: "Fast isn&rsquo;t the same as profitable. After the program fee, the scope caps, and the cycle time, some channels lose money on every job &mdash; and you can&rsquo;t tell which. We show margin by program so you keep the good ones and drop the rest.",
  },
  {
    head: "Profitable on paper, borrowing from the line of credit in February.",
    cost: "ACV now, RCV holdback later, depreciation released whenever. Restoration has the most deceptive cash cycle of any trade. Without a real 13-week forecast, you&rsquo;re always one slow month from a scramble. We build that forecast.",
  },
  {
    head: "Your CPA only sees the damage at tax time.",
    cost: "Once a year, a shoebox shows up and a stranger guesses what happened. No strategy, no clean trail, no warning. We hand your CPA clean, year-round books &mdash; and catch the problems while you can still fix them.",
  },
];

export default function PainSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="relative py-16 xl:py-[108px] bg-c3-black border-b border-c3-border">
      <Container>
        <FadeUp>
          <Overline>We Get It · We Only Do Restoration</Overline>
          <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95] max-w-[16ch]">
            We already know
            <br />
            <span className="text-c3-yellow">what your Monday looks like.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
            A generalist bookkeeper has never heard of a depreciation holdback. We
            speak restoration fluently &mdash; because it&rsquo;s the only industry
            we serve. Tap any one of these. Be honest about how many feel familiar.
          </p>
        </FadeUp>

        <div className="mt-9 flex flex-col gap-[3px] bg-c3-border">
          {pains.map((p, i) => {
            const isOpen = open === i;
            return (
              <button
                key={p.head}
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="group text-left bg-c3-card hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-200 px-5 sm:px-7 py-6"
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  <span className="font-mono text-[11px] text-c3-dim tracking-[0.18em] pt-1 shrink-0">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className="font-cond font-semibold text-[clamp(18px,2.3vw,23px)] leading-[1.25] tracking-[0.01em] text-c3-text group-hover:text-c3-yellow transition-colors duration-200 block">
                      {p.head}
                    </span>
                    <span
                      className="grid transition-all duration-300 ease-out"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <span className="overflow-hidden">
                        <span
                          className="block font-body font-light text-[14.5px] text-c3-mid leading-[1.8] mt-3 max-w-[760px]"
                          // eslint-disable-next-line react/no-danger
                          dangerouslySetInnerHTML={{ __html: p.cost }}
                        />
                      </span>
                    </span>
                  </span>
                  <span
                    className={`font-disp text-[28px] leading-none text-c3-yellow shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                    aria-hidden
                  >
                    +
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        <FadeUp delay={0.1}>
          <p className="font-cond font-semibold text-[20px] lg:text-[24px] text-c3-text mt-10 leading-[1.4] max-w-[820px] border-l-[3px] border-c3-yellow pl-5">
            If three or more of those landed, your books aren&rsquo;t broken because
            you&rsquo;re careless.{" "}
            <span className="text-c3-yellow">
              They&rsquo;re broken because nobody built them for restoration.
            </span>{" "}
            Let&rsquo;s put a number on it. ↓
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
