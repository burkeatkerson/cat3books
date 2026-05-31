import Container from "../Container";
import Overline from "../Overline";
import FadeUp from "../motion/FadeUp";
import StaggerGroup from "../motion/StaggerGroup";
import StaggerItem from "../motion/StaggerItem";

const benefits = [
  {
    num: "01",
    title: "You bid the next job with confidence",
    body: "Every estimate is built on what near-identical jobs actually cost you — not gut feel. You stop leaving margin on the table and stop winning jobs you'll lose money on.",
  },
  {
    num: "02",
    title: "You know which work to chase and which to fire",
    body: "Margin by job type, carrier, and TPA program — in black and white. Double down on the profitable lanes, renegotiate the marginal ones, and walk away from the rest.",
  },
  {
    num: "03",
    title: "You see payroll coming from 13 weeks out",
    body: "A rolling cash forecast built on real AR aging by carrier and job stage. No more February surprises, no more drawing on the line of credit to cover a profitable month.",
  },
  {
    num: "04",
    title: "You collect money you already earned",
    body: "Every approved supplement tracked to recovery. Every depreciation holdback chased. The 2–4% of revenue most shops quietly forfeit shows up in your account instead.",
  },
  {
    num: "05",
    title: "You sleep — and your CPA stops calling in a panic",
    body: "CPA-ready financials all year, closed by the 15th every month. Tax time becomes a non-event. Audits, bonding, and lending conversations stop being fire drills.",
  },
  {
    num: "06",
    title: "You build a company that's actually worth selling",
    body: "Clean, defensible, job-costed books are what a buyer or bank underwrites. The difference between a business that commands a multiple and a job that ends when you stop.",
  },
];

export default function CleanBooksBenefits() {
  return (
    <section className="relative py-16 xl:py-[108px] bg-c3-dark">
      <Container>
        <FadeUp>
          <Overline>What Clean Books Actually Buy You</Overline>
          <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
            This isn&rsquo;t about tidy spreadsheets.
            <br />
            <span className="text-c3-yellow">It&rsquo;s about how you run the place.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
            &ldquo;Good books&rdquo; sounds like a chore. Here&rsquo;s what it really
            means once your numbers are clean and restoration-specific &mdash; the
            decisions you can finally make with certainty instead of a knot in your
            stomach.
          </p>
        </FadeUp>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[3px] mt-9 bg-c3-border">
          {benefits.map((b) => (
            <StaggerItem key={b.num}>
              <div className="group bg-c3-card border-t-[3px] border-c3-border hover:border-t-c3-yellow hover:bg-[rgba(240,190,0,0.03)] transition-all duration-200 p-7 h-full">
                <div className="font-disp text-[40px] leading-none text-c3-dim group-hover:text-c3-yellow transition-colors duration-200 tracking-[0.02em]">
                  {b.num}
                </div>
                <h3 className="font-cond font-bold text-[20px] tracking-[0.01em] uppercase text-c3-text mt-3 leading-[1.2]">
                  {b.title}
                </h3>
                <p className="font-body font-light text-[14px] text-c3-mid leading-[1.8] mt-3">
                  {b.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
