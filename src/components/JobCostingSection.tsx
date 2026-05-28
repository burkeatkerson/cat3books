import Overline from "./Overline";

const withoutItems = [
  "Revenue is a total number with no job-level breakdown",
  "You don’t know if mitigation or reconstruction is more profitable",
  "TPA programs all look the same — you can’t tell which ones to drop",
  "Labor costs exist, but not by job — just a total payroll line",
  "Material purchases are expenses, not job-level costs",
  "Subcontractor costs aren’t tied to the jobs they came from",
  "Estimating the next job is based on gut, not data",
];

const withItems = [
  "Every job has a real P&L — labor, materials, subs, equipment, overhead",
  "Margin by job type, job size, carrier, and TPA program",
  "Instantly see which programs are worth staying on",
  "Labor costs allocated to jobs in real time via expense management",
  "Every Home Depot run tagged to a project before the receipt disappears",
  "Subcontractor invoices coded to jobs the moment they come in",
  "Next estimate is built on what the last job actually cost",
];

const unlocks = [
  {
    num: "UNLOCK // 01",
    title: "Better Estimates",
    body: "Price future jobs based on what identical past jobs actually cost — not what you hoped they would cost.",
  },
  {
    num: "UNLOCK // 02",
    title: "Margin Clarity",
    body: "Know your gross margin by job type, crew, carrier, and TPA program. See exactly where the money is going.",
  },
  {
    num: "UNLOCK // 03",
    title: "Smarter Growth",
    body: "Hire the right crew, drop the wrong programs, focus on the job types that actually make you money.",
  },
];

export default function JobCostingSection() {
  return (
    <section
      id="jobcosting"
      className="relative px-5 md:px-8 lg:px-[52px] xl:px-20 py-16 xl:py-[108px] bg-c3-dark"
    >
      <Overline>Core Service</Overline>
      <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
        Job costing isn&rsquo;t a feature.
        <br />
        <span className="text-c3-yellow">It&rsquo;s the whole point.</span>
      </h2>
      <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
        Without job-level P&L, your financials tell you what you made in total.
        They don&rsquo;t tell you why, where, or on which jobs. That distinction
        is the difference between a restoration business that scales
        intentionally and one that grows itself into insolvency.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-[3px] mt-9 bg-c3-border">
        <div className="bg-c3-card p-[26px] border-t-[3px] border-c3-red">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#ff7a55] mb-4">
            Without Job Costing
          </div>
          <ul className="list-none p-0 mt-4 space-y-0">
            {withoutItems.map((item) => (
              <li
                key={item}
                className="font-body text-[14px] text-c3-mid py-[10px] border-b border-dashed border-c3-border last:border-b-0 leading-[1.5] before:content-['—_'] before:text-c3-red"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-c3-card p-[26px] border-t-[3px] border-c3-green">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#2bb45c] mb-4">
            With Cat3 Books Job Costing
          </div>
          <ul className="list-none p-0 mt-4 space-y-0">
            {withItems.map((item) => (
              <li
                key={item}
                className="font-body text-[14px] text-c3-text py-[10px] border-b border-dashed border-c3-border last:border-b-0 leading-[1.5] before:content-['+_'] before:text-c3-green"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] mt-8">
        {unlocks.map(({ num, title, body }) => (
          <div
            key={num}
            className="bg-c3-card border-l-[3px] border-c3-border hover:border-l-c3-yellow hover:bg-[rgba(240,190,0,0.03)] transition-all duration-200 py-[22px] px-6"
          >
            <div className="font-mono text-[9px] text-c3-dim tracking-[0.2em]">
              {num}
            </div>
            <h4 className="font-cond font-bold text-[18px] tracking-[0.02em] uppercase text-c3-text mt-2 leading-[1.2]">
              {title}
            </h4>
            <p className="font-body font-light text-[13.5px] text-c3-mid leading-[1.75] mt-[10px]">
              {body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
