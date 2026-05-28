import Link from "next/link";
import Container from "./Container";
import Overline from "./Overline";
import FadeUp from "./motion/FadeUp";
import StaggerGroup from "./motion/StaggerGroup";
import StaggerItem from "./motion/StaggerItem";

const pains = [
  {
    num: "PAIN // 01",
    title: "You don't know which jobs made money",
    body: (
      <>
        You finished a $220K water and rebuild job last month. Did you make
        money on it?{" "}
        <strong className="text-c3-yellow font-medium">
          You genuinely don&rsquo;t know.
        </strong>{" "}
        Your books show revenue. They don&rsquo;t show margin. Without job
        costing, every estimate you write for the next job is a guess.
      </>
    ),
  },
  {
    num: "PAIN // 02",
    title: "Supplements evaporate between Xactimate and QuickBooks",
    body: (
      <>
        The adjuster approved an extra $18K. Your crew did the work. But
        somewhere between the estimate platform and your books,{" "}
        <strong className="text-c3-yellow font-medium">
          the revenue disappeared.
        </strong>{" "}
        It happens on nearly every job. It adds up to tens of thousands a year.
      </>
    ),
  },
  {
    num: "PAIN // 03",
    title: "TPA programs are eating your margin invisibly",
    body: (
      <>
        Contractor Connection sends you leads. They also keep 10–18% of every
        job. If that&rsquo;s not coded as a separate cost line, your P&L thinks
        you have better margins than you do.{" "}
        <strong className="text-c3-yellow font-medium">
          You&rsquo;re making pricing decisions on the wrong numbers.
        </strong>
      </>
    ),
  },
  {
    num: "PAIN // 04",
    title: "Your equipment is a daily revenue line nobody's tracking",
    body: (
      <>
        Every air mover, every dehumidifier — billed daily per the Xactimate
        price list. Most restoration companies bill it once and walk away.{" "}
        <strong className="text-c3-yellow font-medium">
          Equipment revenue is the most consistently under-billed line in the
          industry.
        </strong>
      </>
    ),
  },
  {
    num: "PAIN // 05",
    title: "Your CPA tells you the year was fine. You're not sure they're right.",
    body: (
      <>
        Tax returns get filed. Numbers look okay. But you can&rsquo;t explain
        why it felt tight all year when revenue was up. Bad monthly books make
        it impossible to connect the dots.{" "}
        <strong className="text-c3-yellow font-medium">
          You find out what happened a year after it did.
        </strong>
      </>
    ),
  },
];

export default function ProblemSection() {
  return (
    <section className="relative py-16 xl:py-[108px]">
      <Container>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 xl:gap-16">
        <div>
          <FadeUp>
            <Overline>The Problem Nobody Talks About</Overline>
            <h2 className="font-cond font-bold text-[clamp(34px,4.2vw,56px)] leading-[1.06] tracking-[0.005em]">
              Restoration companies don&rsquo;t close because of a lack of{" "}
              <em className="text-c3-yellow italic">work.</em>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-body font-medium text-[17px] text-c3-text mt-4 leading-[1.85]">
              They close because of cashflow. Because they had a great revenue
              year and still couldn&rsquo;t make payroll in March. Because they
              took on more jobs than ever and somehow had less money. Because they
              were growing fast — and growing broke.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-body font-light text-[15px] text-c3-mid mt-4 leading-[1.85]">
              The work is there. The insurance claims keep coming. The crews stay
              busy. But the money — the actual money — doesn&rsquo;t behave the
              way it should. Because the financial picture in your books
              doesn&rsquo;t match the financial reality of your business.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p className="font-body font-light text-[15px] text-c3-mid mt-4 leading-[1.85]">
              Restoration bookkeeping isn&rsquo;t regular bookkeeping with a few
              extra steps. It&rsquo;s a completely different discipline.
              Insurance-driven revenue, 60–90 day AR cycles, TPA billing programs,
              supplement negotiations, equipment-as-revenue — none of this maps to
              a standard QuickBooks setup. And when it&rsquo;s set up wrong, every
              decision you make about hiring, equipment, capacity, and growth is
              built on a foundation of sand.
            </p>
          </FadeUp>

          <FadeUp delay={0.15}>
            <blockquote className="mt-8 py-[22px] px-6 bg-c3-card border-l-[3px] border-c3-yellow">
              <p className="font-cond font-semibold italic text-[20px] text-c3-text leading-[1.45]">
                &ldquo;Running your business without accurate job costing is like
                driving at night with no headlights. You might stay on the road
                for a while. But eventually you won&rsquo;t see what&rsquo;s
                coming.&rdquo;
              </p>
            </blockquote>
          </FadeUp>

          <FadeUp delay={0.2}>
            <Link
              href="#jobcosting"
              className="inline-flex items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-3 bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms] mt-7"
            >
              See How Job Costing Changes Everything →
            </Link>
          </FadeUp>
        </div>

        <StaggerGroup className="flex flex-col gap-[14px]">
          {pains.map(({ num, title, body }) => (
            <StaggerItem key={num}>
              <div className="bg-c3-card border-l-[3px] border-c3-border hover:border-l-c3-yellow hover:bg-[rgba(240,190,0,0.03)] transition-all duration-200 py-[22px] px-6">
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
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
      </Container>
    </section>
  );
}
