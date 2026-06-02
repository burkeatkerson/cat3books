import Container from "../Container";
import Overline from "../Overline";
import FadeUp from "../motion/FadeUp";
import StaggerGroup from "../motion/StaggerGroup";
import StaggerItem from "../motion/StaggerItem";

const steps = [
  {
    num: "01",
    tag: "This Week · Free",
    title: "The Books Audit",
    body: "We look at your real numbers and run the leak finder on them — not a guess. You leave with three specific leaks named and quantified, whether you hire us or not. Thirty minutes. No obligation.",
  },
  {
    num: "02",
    tag: "First 30–60 Days",
    title: "The Rebuild",
    body: "We rebuild your chart of accounts for restoration, clean up the backlog, wire in job costing, and map your estimating software to the books. You keep working; we do the heavy lifting in the background.",
  },
  {
    num: "03",
    tag: "Every Month After",
    title: "You Just Run It",
    body: "Closed by the 15th, supplements tracked, margin by job in your inbox, cash forecast on the wall. You make decisions with certainty. We catch the problems while they're still cheap to fix.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-16 xl:py-[108px] bg-c3-dark border-t border-c3-border">
      <Container>
        <FadeUp>
          <Overline>How It Works · No Surprises</Overline>
          <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
            From shoebox to clarity
            <br />
            <span className="text-c3-yellow">without slowing down the field.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
            Switching bookkeepers feels like a root canal. It isn&rsquo;t here. Three
            steps, most of it on us, and you never have to stop taking jobs.
          </p>
        </FadeUp>

        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-[3px] mt-9 bg-c3-border">
          {steps.map((s) => (
            <StaggerItem key={s.num}>
              <div className="bg-c3-card p-7 h-full flex flex-col">
                <div className="flex items-baseline justify-between">
                  <span className="font-disp text-[clamp(48px,6vw,72px)] leading-[0.85] text-c3-yellow tracking-[0.02em]">
                    {s.num}
                  </span>
                  <span className="font-mono text-[9px] tracking-[0.18em] uppercase text-c3-dim">
                    {s.tag}
                  </span>
                </div>
                <h3 className="font-cond font-bold text-[24px] uppercase tracking-[0.02em] text-c3-text mt-4 leading-[1.1]">
                  {s.title}
                </h3>
                <p className="font-body font-light text-[14px] text-c3-mid leading-[1.8] mt-3">
                  {s.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
