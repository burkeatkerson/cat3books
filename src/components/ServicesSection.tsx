import Link from "next/link";
import Overline from "./Overline";
import FadeUp from "./motion/FadeUp";
import StaggerGroup from "./motion/StaggerGroup";
import StaggerItem from "./motion/StaggerItem";
import { STAGGER_TIGHT } from "@/lib/motion-config";

const services = [
  { num: "SVC // 01", title: "Job Costing ★ CORE", body: "Every project gets a complete P&L — labor, materials, equipment, subcontractors, TPA fees, and overhead. Every month, without exception.", tag: "Core Differentiator", core: true },
  { num: "SVC // 02", title: "Supplement Tracking ★ CORE", body: "Every supplement tracked from submission through carrier approval to final payment. Monthly recovery report showing what was collected and what's still outstanding.", tag: "Industry Exclusive", core: true },
  { num: "SVC // 03", title: "Estimate-to-Books Mapping", body: "We bridge the gap between your estimating platform and your accounting software. Xactimate, Albi, Dash, JobNimbus — all mapped correctly into your books.", tag: null, core: false },
  { num: "SVC // 04", title: "TPA Channel AR", body: "Contractor Connection, Alacrity, Sedgwick, Code Blue — each tracked on its own aging schedule. Know exactly who owes what, by program, and for how long.", tag: null, core: false },
  { num: "SVC // 05", title: "Sub & 1099 Management", body: "W-9 collection, COI tracking, sub costs coded to jobs, and 1099 filing handled. Full audit trail from dispatch to payment, year-round — not just in January.", tag: null, core: false },
  { num: "SVC // 06", title: "Equipment Revenue & Asset Tracking", body: "Drying equipment is a daily billable line item. We reconcile equipment-day logs against invoices so no billable day disappears. Depreciation schedules maintained separately.", tag: null, core: false },
  { num: "SVC // 07", title: "Monthly Close & Reporting", body: "Clean close by the 15th, every month. P&L, balance sheet, job profitability summary, supplement recovery report. CPA-ready. Always.", tag: null, core: false },
  { num: "SVC // 08", title: "Historical Cleanup", body: "If your books are a Category 3 situation — and most are when we start — we remediate first. Full chart-of-accounts rebuild, transaction reclassification, missed supplement recovery.", tag: null, core: false },
  { num: "SVC // 09", title: "QBO + ERP Setup & Migration", body: "QuickBooks Online and Desktop, Sage 100, Acumatica, Foundation. We set up, migrate, and maintain your accounting platform — properly configured for restoration job costing from day one.", tag: null, core: false },
];

const expenseSteps = [
  { n: "01", t: "Issue company cards — physical or virtual — to field crews, PMs, and estimators", final: false },
  { n: "02", t: "Card is swiped at Home Depot, equipment supplier, or any vendor", final: false },
  { n: "03", t: "Receipt captured on phone in 30 seconds with job number tagged", final: false },
  { n: "04", t: "Routes to the correct job cost code automatically — no data entry required", final: false },
  { n: "05", t: (<>Job P&L reflects actual costs <strong className="text-c3-yellow font-medium">daily</strong> — margin visibility all month long</>), final: true },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative px-5 md:px-8 lg:px-[52px] xl:px-20 py-16 xl:py-[108px]"
    >
      <FadeUp>
        <Overline>What&rsquo;s Included</Overline>
        <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
          Everything your books need.
          <br />
          <span className="text-c3-yellow">Nothing they don&rsquo;t.</span>
        </h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
          Cat3 Books handles the complete bookkeeping stack for restoration
          companies — built around the way your money actually moves. We speak
          your language because we only work in your industry. No restaurants. No
          retail. No e-commerce. Restoration only.
        </p>
      </FadeUp>

      {/* Service cards — tighter stagger since there are 9 */}
      <StaggerGroup stagger={STAGGER_TIGHT} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[2px] bg-c3-border mt-10">
        {services.map(({ num, title, body, tag, core }) => (
          <StaggerItem key={num}>
            <div
              className={`bg-c3-card border-t-[2px] p-7 transition-all duration-[220ms] h-full ${
                core
                  ? "border-c3-yellow hover:bg-[rgba(240,190,0,0.03)]"
                  : "border-c3-border hover:border-t-c3-yellow hover:bg-[rgba(240,190,0,0.03)]"
              }`}
            >
              <div className="font-mono text-[9px] text-c3-dim tracking-[0.2em]">{num}</div>
              <h4 className={`font-cond font-bold text-[18px] uppercase tracking-[0.04em] mt-[10px] leading-[1.2] ${core ? "text-c3-yellow" : "text-c3-text"}`}>
                {title}
              </h4>
              <p className="font-body font-light text-[13px] text-c3-mid leading-[1.7] mt-[10px]">{body}</p>
              {tag && (
                <span className={`inline-block mt-[14px] font-mono text-[9px] tracking-[0.2em] border py-1 px-[7px] uppercase ${core ? "border-c3-yellow-dim text-c3-yellow" : "border-c3-b2 text-c3-dim"}`}>
                  {tag}
                </span>
              )}
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Expense spotlight */}
      <FadeUp>
        <div
          id="expense"
          className="mt-12 bg-c3-dark border-l-[3px] border-c3-yellow p-5 sm:p-7 lg:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow">Add-On Service</div>
            <h3 className="font-cond font-bold text-[32px] uppercase tracking-[0.02em] mt-[10px] leading-[1.1]">
              Expense Management with Job-Coded Cards
            </h3>
            <p className="font-body font-light text-[14px] text-c3-mid mt-[14px] leading-[1.85]">
              Stop losing receipts. Stop reconstructing expenses at month-end.
              Stop asking your crew what that Home Depot run was for.
            </p>
            <p className="font-body font-light text-[14px] text-c3-mid mt-[14px] leading-[1.85]">
              We implement a complete expense management system — physical or
              virtual cards for your team, with every purchase automatically
              categorized and every receipt captured in the field via phone. Each
              transaction routes directly to the correct job cost code in real time.
            </p>
            <p className="font-body font-light text-[14px] text-c3-mid mt-[14px] leading-[1.85]">
              Your project manager swipes the card on site. The receipt hits the
              system in 30 seconds. By the time the monthly close comes, the
              job-level cost data is already there — no manual entry, no missing
              receipts, no end-of-month scramble.
            </p>
          </div>
          <StaggerGroup stagger={STAGGER_TIGHT} className="flex flex-col gap-[10px]">
            {expenseSteps.map(({ n, t, final: isFinal }) => (
              <StaggerItem key={n}>
                <div className={`bg-c3-card border-l-[2px] py-[14px] px-[18px] flex gap-[14px] items-center transition-colors duration-200 hover:border-l-c3-yellow ${isFinal ? "border-c3-yellow" : "border-c3-yellow-dim"}`}>
                  <div className="font-mono text-[10px] text-c3-yellow tracking-[0.2em] shrink-0">{n}</div>
                  <div className={`font-body text-[13.5px] leading-[1.5] ${isFinal ? "text-c3-text" : "text-c3-mid"}`}>{t}</div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </FadeUp>

      {/* Not included */}
      <FadeUp>
        <div className="mt-9 py-5 px-6 border border-c3-border bg-[rgba(255,255,255,0.018)] grid grid-cols-[24px_1fr] gap-[18px] items-start">
          <div className="font-disp text-[20px] text-c3-yellow leading-none">ⓘ</div>
          <div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">Not Included in Core Bookkeeping</div>
            <p className="font-body font-light text-[13.5px] text-c3-mid leading-[1.8] mt-2">
              AP management, AR management, cash flow planning, quarterly
              reporting, CEO dashboard, and payroll are not part of the standard
              bookkeeping package. These require strategic financial oversight that
              goes beyond bookkeeping. All of them are included in our{" "}
              <Link href="#pricing" className="text-c3-yellow border-b border-c3-yellow-dim hover:border-c3-yellow transition-colors duration-200">
                Fractional CFO Package
              </Link>
              . Payroll processing can be added to either package for{" "}
              <strong className="text-c3-yellow font-medium">$400 per pay cycle.</strong>
            </p>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}
