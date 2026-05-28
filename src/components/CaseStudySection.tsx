import Container from "./Container";
import Overline from "./Overline";
import FadeUp from "./motion/FadeUp";
import StaggerGroup from "./motion/StaggerGroup";
import StaggerItem from "./motion/StaggerItem";

const beforeStats = [
  { label: "Monthly close", value: "Day 48", bad: false },
  { label: "Job-level P&L", value: "None", bad: true },
  { label: "Supplements tracked", value: '"In a tab"', bad: true },
  { label: "TPA program P&L", value: "Unknown", bad: true },
  { label: "13-wk cash forecast", value: "No", bad: true },
  { label: "Blended margin", value: "~14%", bad: false },
];

const afterStats = [
  { label: "Monthly close", value: "Day 14" },
  { label: "Job-level P&L", value: "Every job" },
  { label: "Supplements tracked", value: "11 open" },
  { label: "TPA program P&L", value: "4 lines" },
  { label: "13-wk cash forecast", value: "Live" },
  { label: "Blended margin", value: "22.8%" },
];

const outcomes = [
  { v: "+8.8pt", label: "Blended margin lift in 90 days" },
  { v: "$38K", label: "Recovered supplements" },
  { v: "34d", label: "Close cycle reduction" },
  { v: "2", label: "TPA programs renegotiated" },
];

export default function CaseStudySection() {
  return (
    <section className="relative py-16 xl:py-[108px]">
      <Container>
      <FadeUp>
        <Overline>A 90-Day Engagement · With Permission</Overline>
        <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
          What an actual
          <br />
          <span className="text-c3-yellow">Cat3 cleanup</span> looks like.
        </h2>
      </FadeUp>

      <FadeUp delay={0.1}>
        <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
          $1.8M water &amp; mitigation contractor, Southeast region. Three years
          of QuickBooks built by a generalist bookkeeper. No job costing.
          Supplements tracked in a spreadsheet nobody updated.
        </p>
      </FadeUp>

      <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-[3px] mt-10 bg-c3-border">
        {/* Before */}
        <StaggerItem>
        <div className="bg-c3-card p-8 border-t-[3px] border-c3-red h-full">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#ff7a55]">
            Day 0 · Before
          </div>
          <div className="grid grid-cols-2 gap-[18px] mt-[22px]">
            {beforeStats.map(({ label, value, bad }) => (
              <div key={label}>
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
                  {label}
                </div>
                <div
                  className={`font-disp text-[34px] leading-none mt-1.5 tracking-[0.02em] ${
                    bad ? "text-c3-red" : "text-c3-text"
                  }`}
                >
                  {value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[26px] pt-[18px] border-t border-dashed border-c3-border">
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#ff7a55]">
              Diagnosis
            </div>
            <p className="font-body font-light text-[13.5px] text-c3-mid mt-[10px] leading-[1.75]">
              Owner couldn&rsquo;t answer the question &ldquo;did we make money
              last month?&rdquo; without two days of digging. Margin sliding for
              three quarters running. CPA asked twice for the same backup.
            </p>
          </div>
        </div>
        </StaggerItem>

        {/* After */}
        <StaggerItem>
        <div className="bg-c3-card p-8 border-t-[3px] border-c3-yellow h-full">
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow">
            Day 90 · After
          </div>
          <div className="grid grid-cols-2 gap-[18px] mt-[22px]">
            {afterStats.map(({ label, value }) => (
              <div key={label}>
                <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
                  {label}
                </div>
                <div className="font-disp text-[34px] text-c3-yellow leading-none mt-1.5 tracking-[0.02em]">
                  {value}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-[26px] pt-[18px] border-t border-dashed border-c3-border">
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-yellow">
              Result
            </div>
            <p className="font-body font-light text-[13.5px] text-c3-text mt-[10px] leading-[1.75]">
              $38K in previously-written-off supplements recovered. Two TPA
              programs renegotiated. Owner now bids from real cost data, not
              memory. Bank renewed the line of credit at a tighter rate.
            </p>
          </div>
        </div>
        </StaggerItem>
      </StaggerGroup>

      {/* Outcome stats */}
      <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-c3-border mt-8">
        {outcomes.map(({ v, label }) => (
          <StaggerItem key={v}>
          <div className="bg-c3-card p-6 h-full">
            <div className="font-disp text-[46px] text-c3-yellow leading-none tracking-[0.02em]">
              {v}
            </div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mt-3">
              {label}
            </div>
          </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <FadeUp>
      <div className="mt-8 py-6 px-7 bg-c3-card border-l-[3px] border-c3-yellow">
        <p className="font-cond font-semibold italic text-[21px] text-c3-text leading-[1.45]">
          &ldquo;For the first time, I can answer the question &lsquo;did we
          make money this month&rsquo; without making something up.&rdquo;
        </p>
        <cite className="block font-mono text-[10px] tracking-[0.22em] text-c3-yellow mt-[14px] uppercase not-italic">
          — Owner · $1.8M Restoration Co. · Southeast US · Name on request
        </cite>
      </div>
      </FadeUp>
      </Container>
    </section>
  );
}
