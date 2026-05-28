import FadeUp from "@/components/motion/FadeUp";
import Container from "@/components/Container";

const metaRows = [
  { k: "Published",   v: "Weekly",       y: false },
  { k: "In Archive",  v: "128+ posts",   y: false },
  { k: "Read by",     v: "3,400 owners", y: false },
  { k: "Avg read",    v: "7 min",        y: false },
  { k: "Focus",       v: "Restoration only", y: true },
];

export default function BlogHero() {
  return (
    <section className="relative py-24 overflow-hidden border-b border-c3-border hero-grid-bg">
      {/* Ghost watermark */}
      <div
        className="absolute right-[-4%] top-[-12%] font-disp text-[380px] leading-[0.8] text-c3-yellow opacity-[0.04] pointer-events-none select-none tracking-[.02em]"
        aria-hidden
      >
        FN
      </div>

      <Container>
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12 items-end">
          {/* Left: headline */}
          <div>
            <FadeUp load delay={0.06}>
              <div className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase text-c3-yellow mb-5">
                <span className="w-7 h-px bg-c3-yellow" />
                <span className="w-1.5 h-1.5 rounded-full bg-c3-yellow animate-blink" />
                Updated Weekly · Restoration-Only Reading
              </div>
            </FadeUp>

            <FadeUp load delay={0.18}>
              <h1 className="font-disp text-[clamp(64px,9vw,124px)] leading-[0.88] tracking-[0.025em] mt-5">
                FIELD
                <br />
                <span className="text-c3-yellow animate-glowPulse">NOTES</span>
                <br />
                <span className="[color:transparent] [-webkit-text-stroke:1.5px_#2A2A28]">FROM THE</span>
                <br />
                BOOKS.
              </h1>
            </FadeUp>

            <FadeUp load delay={0.30}>
              <p className="font-cond font-light text-[clamp(18px,2.2vw,22px)] text-c3-mid mt-6 max-w-[540px] leading-[1.45]">
                The job-costing, P&amp;L, supplements, software, and money-mechanics writing your generalist bookkeeper isn&rsquo;t doing.{" "}
                <strong className="text-c3-text font-semibold">Built for restoration owners and the finance people behind them.</strong>
              </p>
            </FadeUp>
          </div>

          {/* Right: meta strip */}
          <FadeUp load delay={0.44}>
            <div className="flex flex-col gap-0 p-6 bg-[rgba(255,255,255,0.018)] border border-c3-border">
              {metaRows.map(({ k, v, y }) => (
                <div
                  key={k}
                  className="flex justify-between items-baseline gap-4 py-[10px] border-b border-dashed border-c3-border last:border-b-0"
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-c3-dim">{k}</span>
                  <span className={`font-cond font-semibold text-[18px] tracking-[0.04em] uppercase ${y ? "text-c3-yellow" : "text-c3-text"}`}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </Container>
    </section>
  );
}
