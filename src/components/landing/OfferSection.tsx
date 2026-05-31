import Container from "../Container";
import Overline from "../Overline";
import FadeUp from "../motion/FadeUp";
import StaggerGroup from "../motion/StaggerGroup";
import StaggerItem from "../motion/StaggerItem";

const pillars = [
  {
    tag: "Every Month",
    title: "Books, Done Right",
    items: [
      "Full monthly bookkeeping & bank reconciliation",
      "Restoration-specific chart of accounts",
      "Estimate-to-books mapping (Xactimate, Albi, Dash, JobNimbus)",
      "Subcontractor W-9, COI & 1099 management",
      "Monthly close by the 15th — every month, no chasing",
      "CPA-ready financials kept clean all year",
    ],
  },
  {
    tag: "The Reason You're Here",
    title: "Job Costing & Recovery",
    items: [
      "A real P&L on every project — labor, materials, subs, equipment",
      "Margin by job type, carrier, and TPA program",
      "Supplement recovery tracked to the dollar, every month",
      "Equipment days reconciled to billing",
      "Field receipts tagged to the right job before they vanish",
      "Drop the programs that lose money — knowingly",
    ],
  },
  {
    tag: "When You Want A CFO",
    title: "Strategy & Cash",
    items: [
      "13-week rolling cash-flow forecast",
      "CEO dashboard — KPIs, job mix, TPA performance",
      "Budget vs. actual, quarterly reporting package",
      "Bonding & surety financial statement prep",
      "Banking & lending relationship support",
      "Monthly CFO advisory call",
    ],
  },
];

export default function OfferSection() {
  return (
    <section id="services" className="relative py-16 xl:py-[108px] bg-c3-black border-t border-c3-border">
      <Container>
        <FadeUp>
          <Overline>The Offer · Plain English</Overline>
          <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
            One firm. One industry.
            <br />
            <span className="text-c3-yellow">Everything your books need.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
            No menu of confusing add-ons. You hand us the books; we run them the way
            a restoration company actually works. Here&rsquo;s exactly what you get
            &mdash; nothing fluffy, nothing you&rsquo;ll never use.
          </p>
        </FadeUp>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-[3px] mt-9 bg-c3-border">
          {pillars.map((p) => (
            <StaggerItem key={p.title}>
              <div className="bg-c3-card p-7 h-full">
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow mb-2">
                  {p.tag}
                </div>
                <h3 className="font-cond font-bold text-[24px] uppercase tracking-[0.02em] text-c3-text leading-[1.1]">
                  {p.title}
                </h3>
                <ul className="list-none p-0 mt-5 space-y-0">
                  {p.items.map((item) => (
                    <li
                      key={item}
                      className="font-body font-light text-[13.5px] text-c3-mid py-[10px] border-b border-dashed border-c3-border last:border-b-0 leading-[1.55] before:content-['▸_'] before:text-c3-yellow"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <FadeUp delay={0.1}>
          <p className="font-cond font-semibold text-[18px] lg:text-[20px] text-c3-mid mt-7 leading-[1.5] max-w-[820px]">
            Start with the books. Add the CFO work whenever you&rsquo;re ready.{" "}
            <span className="text-c3-text">No annual contract, ever &mdash;</span> if
            we&rsquo;re not earning our keep, you walk.
          </p>
        </FadeUp>
      </Container>
    </section>
  );
}
