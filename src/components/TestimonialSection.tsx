import Overline from "./Overline";

const stats = [
  { num: "$94K", label: "Avg supplements recovered · first 90 days" },
  { num: "8pt", label: "Avg gross margin improvement post-cleanup" },
  { num: "14d", label: "Average full onboarding time" },
  { num: "0", label: "Annual contracts · Cancel anytime" },
];

export default function TestimonialSection() {
  return (
    <section className="relative px-[52px] py-[108px] radial-yellow-top md:px-5 md:py-16">
      <div className="max-w-[920px] mx-auto text-center">
        <Overline center>From the Field</Overline>
        <blockquote className="font-cond font-semibold italic text-[clamp(24px,2.6vw,34px)] text-c3-text leading-[1.4] mt-[18px]">
          &ldquo;Three years of QuickBooks that looked like a{" "}
          <span className="text-c3-yellow">Category 3 bathroom.</span> They came
          in, assessed it, and had us cleaned up in six weeks. We found{" "}
          <strong className="text-c3-yellow font-bold not-italic">$94,000</strong>{" "}
          in uncollected supplements — money my previous bookkeeper didn&rsquo;t
          even know existed. The books we have now are unrecognizable compared to
          what we had before.&rdquo;
        </blockquote>
        <cite className="font-mono text-[10px] tracking-[0.22em] text-c3-yellow mt-6 inline-block uppercase not-italic">
          — Mike R. · Owner · $3.2M Restoration Company · Dallas, TX
        </cite>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-[2px] bg-c3-border mt-14">
        {stats.map(({ num, label }) => (
          <div key={num} className="bg-c3-card p-7">
            <div className="font-disp text-[52px] text-c3-yellow leading-none tracking-[0.02em]">
              {num}
            </div>
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mt-[14px]">
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
