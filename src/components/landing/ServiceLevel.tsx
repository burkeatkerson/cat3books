import Link from "next/link";
import Container from "../Container";
import FadeUp from "../motion/FadeUp";
import StaggerGroup from "../motion/StaggerGroup";
import StaggerItem from "../motion/StaggerItem";
import { cn } from "@/lib/cn";
import { getTier, formatUsd, type PricingTierId } from "@/lib/pricing";

interface LevelContent {
  id: PricingTierId;
  anchor: string;
  subtitle: string;
  headLead: string;
  headAccent: string;
  intro: string;
  problems: string[];
  mechanism: string[];
  benefits: string[];
}

/** Page-specific marketing narrative. Price, name, and CTA come from pricing.ts. */
export const DFY_LEVELS: LevelContent[] = [
  {
    id: "bookkeeping",
    anchor: "level-bookkeeping",
    subtitle: "The Foundation",
    headLead: "Clean books, closed on time,",
    headAccent: "without you lifting a finger.",
    intro:
      "This is the ground everything else stands on: accurate, restoration-specific books, reconciled and closed every month — so the number you're staring at is actually real.",
    problems: [
      "Your P&L is a guess — you can't say if last month truly made money.",
      "Approved supplements get earned, then never booked as income.",
      "TPA fees and equipment days land in the wrong place, or nowhere.",
      "Tax time is a shoebox scramble, and your CPA keeps re-asking for backup.",
    ],
    mechanism: [
      "A restoration-specific chart of accounts, built right from day one",
      "Every account reconciled and the month closed by the 15th",
      "Supplements tracked from approval all the way to payment",
      "TPA channel AR aged by program; 1099s and equipment handled",
      "CPA-ready financials, kept clean all year",
    ],
    benefits: [
      "You trust your own numbers — and so do your bank and your CPA.",
      "Tax season turns into a non-event.",
      "Money you already earned actually shows up in the account.",
    ],
  },
  {
    id: "job-costing",
    anchor: "level-job-costing",
    subtitle: "The Clarity",
    headLead: "Know which jobs make money —",
    headAccent: "before you ever send the invoice.",
    intro:
      "Bookkeeping tells you what you made. Job costing tells you where, why, and on which jobs — the difference between growing on purpose and growing yourself broke.",
    problems: [
      "Revenue is one big number — no idea which jobs actually paid.",
      "You can't tell mitigation from reconstruction from a losing TPA program.",
      "Field receipts pile up untagged; bad jobs hide in a 'materials' blob.",
      "You bid the next job on gut, then learn too late that it lost money.",
    ],
    mechanism: [
      "A real P&L on every project — labor, materials, subs, equipment, overhead",
      "Your estimate mapped to the books line by line (Xactimate, Albi, Dash, JobNimbus)",
      "Margin broken out by job type, carrier, and TPA program",
      "Every receipt tagged to its job before it disappears",
    ],
    benefits: [
      "You know a job's true margin before the invoice goes out.",
      "You double down on profitable lanes and drop the ones that bleed.",
      "You bid the next job from data, not hope.",
    ],
  },
  {
    id: "cfo",
    anchor: "level-cfo",
    subtitle: "The Command",
    headLead: "A CFO who sees the cash",
    headAccent: "coming before it does.",
    intro:
      "Once the books are clean and every job is costed, the last gap is forward vision: cash, strategy, and a steady hand on the numbers when the decisions get expensive.",
    problems: [
      "Profitable on paper, but borrowing from the line of credit in February.",
      "No forecast — payroll surprises you instead of the other way around.",
      "Nobody's steering cash, pricing, or strategy with the actual numbers.",
      "Big calls — hires, trucks, programs — get made on gut feel.",
    ],
    mechanism: [
      "A 13-week rolling cash flow forecast you can see payroll coming on",
      "A monthly CEO dashboard — KPIs, job mix, TPA performance",
      "Budget vs. actual and a quarterly reporting package",
      "Automated AP intake into QuickBooks plus biweekly cash-flow recommendations (we advise — you still pay the bills)",
      "AR & cash-position reporting, banking/bonding support, and tax strategy with your CPA",
      "A monthly CFO advisory call",
    ],
    benefits: [
      "You see payroll coming from 13 weeks out — no February scramble.",
      "You make hiring, pricing, and growth calls with certainty.",
      "You build a company that's actually worth selling.",
    ],
  },
];

function LedgerRow({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: string;
}) {
  return (
    <div className="flex justify-between items-center gap-4 py-[9px] border-b border-dashed border-c3-border last:border-b-0 font-body text-[13px] leading-[1.4]">
      <span className="text-c3-mid">{label}</span>
      <span className={cn("font-mono text-[12px] tracking-[0.04em] whitespace-nowrap", tone)}>
        {value}
      </span>
    </div>
  );
}

/** Distinct signature visual per level — animated in on scroll via the shared motion primitives. */
function LevelVisual({ id }: { id: PricingTierId }) {
  if (id === "bookkeeping") {
    const closeSteps = [
      "Bank & credit-card reconciliation",
      "Supplements logged to payment",
      "TPA fees coded to cost of revenue",
      "Equipment days reconciled to billing",
      "Job & service-line P&L reviewed",
      "Owner package delivered",
    ];
    return (
      <div className="bg-c3-card border border-c3-border p-6">
        <div className="flex justify-between items-center pb-[14px] border-b border-c3-border">
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-c3-dim">
            The Monthly Close
          </span>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase text-c3-green">
            <span className="w-1.5 h-1.5 rounded-full bg-c3-green" />
            Closed · Day 12
          </span>
        </div>
        <StaggerGroup className="mt-4">
          {closeSteps.map((s) => (
            <StaggerItem key={s}>
              <div className="flex items-center gap-3 py-[10px] border-b border-dashed border-c3-border last:border-b-0">
                <span className="font-mono text-[13px] text-c3-green" aria-hidden>
                  ✓
                </span>
                <span className="font-body text-[13.5px] text-c3-text leading-[1.4]">{s}</span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    );
  }

  if (id === "job-costing") {
    return (
      <div className="bg-c3-card border border-c3-border p-6">
        <div className="flex justify-between items-center pb-[14px] border-b border-c3-border">
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-c3-dim">
            Job #1043 · Water
          </span>
          <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-c3-mid">
            Contractor Connection
          </span>
        </div>
        <div className="mt-4">
          <LedgerRow label="Revenue (incl. supplement)" value="$48,200" tone="text-c3-text" />
          <LedgerRow label="Labor" value="−$15,900" tone="text-c3-mid" />
          <LedgerRow label="Materials" value="−$9,400" tone="text-c3-mid" />
          <LedgerRow label="Subcontractors" value="−$6,100" tone="text-c3-mid" />
          <LedgerRow label="Equipment" value="−$3,250" tone="text-c3-mid" />
          <LedgerRow label="Allocated overhead" value="−$2,460" tone="text-c3-mid" />
        </div>
        <div className="mt-4 pt-4 border-t border-c3-border flex justify-between items-end">
          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
              Gross margin
            </div>
            <div className="font-body text-[12px] text-c3-mid mt-1">$11,090 net</div>
          </div>
          <div className="font-disp text-[46px] leading-none text-c3-yellow tracking-[0.01em]">
            23.0%
          </div>
        </div>
        <div className="mt-4 font-mono text-[9px] tracking-[0.14em] uppercase text-c3-green text-right">
          Known before the invoice went out ✓
        </div>
      </div>
    );
  }

  // cfo — 13-week cash forecast mini chart
  const bars = [38, 30, 44, 52, 41, 60, 72, 64, 80, 70, 88, 96];
  const max = Math.max(...bars);
  return (
    <div className="bg-c3-card border border-c3-border p-6">
      <div className="flex justify-between items-center pb-[14px] border-b border-c3-border">
        <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-c3-dim">
          13-Week Cash Forecast
        </span>
        <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-c3-yellow">
          +$96K · wk 13
        </span>
      </div>

      <StaggerGroup stagger={0.05} className="mt-5 flex items-end gap-[5px] h-[150px]">
        {bars.map((b, i) => (
          <StaggerItem key={i} className="flex-1 flex items-end h-full">
            <span
              className="block w-full bg-c3-yellow/80"
              style={{ height: `${(b / max) * 100}%` }}
              aria-hidden
            />
          </StaggerItem>
        ))}
      </StaggerGroup>
      <div className="flex justify-between font-mono text-[9px] text-c3-dim tracking-[0.16em] mt-2">
        <span>This week</span>
        <span>Week 13</span>
      </div>

      <div className="grid grid-cols-2 gap-[2px] bg-c3-border mt-5">
        <div className="bg-c3-card p-4">
          <div className="font-disp text-[34px] leading-none text-c3-yellow tracking-[0.01em]">
            21.4%
          </div>
          <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-c3-dim mt-2">
            Blended net margin
          </div>
        </div>
        <div className="bg-c3-card p-4">
          <div className="font-disp text-[34px] leading-none text-c3-text tracking-[0.01em]">
            0
          </div>
          <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-c3-dim mt-2">
            Payroll surprises
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockList({
  label,
  labelTone,
  marker,
  markerTone,
  items,
  itemTone,
}: {
  label: string;
  labelTone: string;
  marker: string;
  markerTone: string;
  items: string[];
  itemTone: string;
}) {
  return (
    <div>
      <div className={cn("font-mono text-[9px] tracking-[0.22em] uppercase mb-3", labelTone)}>
        {label}
      </div>
      <StaggerGroup className="flex flex-col">
        {items.map((it) => (
          <StaggerItem key={it}>
            <div className="flex gap-3 py-[7px] border-b border-dashed border-c3-border last:border-b-0">
              <span className={cn("font-mono text-[13px] leading-[1.5] shrink-0", markerTone)} aria-hidden>
                {marker}
              </span>
              <span className={cn("font-body font-light text-[14px] leading-[1.55]", itemTone)}>
                {it}
              </span>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

export default function ServiceLevel({
  level,
  index,
}: {
  level: LevelContent;
  index: number;
}) {
  const tier = getTier(level.id);
  const flip = index % 2 === 1; // alternate the visual side for rhythm
  const dark = index % 2 === 1;

  return (
    <section
      id={level.anchor}
      className={cn(
        "relative py-16 xl:py-[108px] border-b border-c3-border",
        dark ? "bg-c3-dark" : "bg-c3-black"
      )}
    >
      <Container>
        {/* Header */}
        <FadeUp>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="font-disp text-[44px] leading-none text-c3-yellow tracking-[0.02em]">
              0{index + 1}
            </span>
            <span className="font-mono text-[10px] tracking-[0.28em] uppercase text-c3-yellow">
              {level.subtitle} · {tier.fullName}
            </span>
          </div>
          <h2 className="font-disp text-[clamp(36px,4.6vw,62px)] tracking-[0.025em] leading-[0.96] mt-4 max-w-[20ch]">
            {level.headLead}{" "}
            <span className="text-c3-yellow">{level.headAccent}</span>
          </h2>
          <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
            {level.intro}
          </p>
        </FadeUp>

        {/* Body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-14 mt-12 items-start">
          {/* Narrative */}
          <div className={cn("flex flex-col gap-9", flip ? "lg:order-2" : "lg:order-1")}>
            <BlockList
              label="⚠ Where you are now"
              labelTone="text-[#ff7a55]"
              marker="—"
              markerTone="text-c3-red"
              items={level.problems}
              itemTone="text-c3-mid"
            />
            <BlockList
              label="◆ What we take off your plate"
              labelTone="text-c3-yellow"
              marker="▸"
              markerTone="text-c3-yellow"
              items={level.mechanism}
              itemTone="text-c3-text"
            />
            <BlockList
              label="✓ What changes for you"
              labelTone="text-[#2bb45c]"
              marker="✓"
              markerTone="text-c3-green"
              items={level.benefits}
              itemTone="text-c3-text"
            />
          </div>

          {/* Visual + price + CTA */}
          <div className={cn(flip ? "lg:order-1" : "lg:order-2")}>
            <div className="lg:sticky lg:top-[88px] flex flex-col gap-5">
              <FadeUp>
                <LevelVisual id={level.id} />
              </FadeUp>

              <FadeUp delay={0.08}>
                <div
                  className={cn(
                    "p-6 flex items-center justify-between gap-4 flex-wrap border",
                    tier.featured ? "border-c3-yellow bg-[rgba(240,190,0,0.04)]" : "border-c3-border bg-c3-card"
                  )}
                >
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
                      Flat · no contract
                    </div>
                    <div className="font-disp text-[44px] leading-none text-c3-yellow tracking-[0.01em] mt-1">
                      ${formatUsd(tier.monthly)}
                      <small className="font-mono text-[13px] text-c3-mid"> / mo</small>
                    </div>
                  </div>
                  <Link
                    href="#contact"
                    className="inline-flex items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[20px] py-[13px] bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
                  >
                    {tier.cta} →
                  </Link>
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
