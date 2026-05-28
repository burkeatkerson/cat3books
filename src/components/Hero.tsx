import Link from "next/link";
import FadeUp from "./motion/FadeUp";

const diagRows = [
  { q: "Do you know your margin on last month's jobs?", ans: "NO", color: "text-c3-red" },
  { q: "Are all approved supplements booked as income?", ans: "NO", color: "text-c3-red" },
  { q: "Is TPA referral revenue tracked separately?", ans: "NO", color: "text-c3-red" },
  { q: "Are equipment days reconciled to billing?", ans: "NO", color: "text-c3-red" },
  { q: "Can you forecast cash 8 weeks out?", ans: "SOMETIMES", color: "text-[#dd8800]" },
  { q: "Are field expenses tied directly to jobs?", ans: "PARTIALLY", color: "text-[#dd8800]" },
  { q: "Is your CPA happy with your monthly books?", ans: "PROBABLY NOT", color: "text-[#dd8800]" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-60px)] overflow-hidden"
      aria-label="Hero"
    >
      {/* Diagonal grid pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 hero-grid-bg" aria-hidden />

      {/* Ghost watermark */}
      <div
        className="hidden md:block absolute right-[-8%] bottom-[-22%] z-0 font-disp text-[520px] leading-[0.8] text-c3-yellow opacity-[0.04] pointer-events-none select-none"
        aria-hidden
      >
        3
      </div>

      {/* Animated rings */}
      <div
        className="hidden md:block absolute right-[8%] top-1/2 w-0 h-0 z-0 pointer-events-none"
        aria-hidden
      >
        {(["animate-ringPing1", "animate-ringPing2", "animate-ringPing3", "animate-ringPing4"] as const).map(
          (anim, i) => (
            <span
              key={i}
              className={`absolute left-0 top-0 w-[60px] h-[60px] border border-c3-yellow rounded-full opacity-0 ${anim}`}
            />
          )
        )}
      </div>

      {/* Constrained grid — decorative elements above remain full-width via absolute positioning */}
      <div className="relative z-10 mx-auto w-full max-w-[1660px] grid grid-cols-1 md:grid-cols-[55fr_45fr] min-h-[calc(100vh-60px)]">
      {/* Left column */}
      <div className="px-5 sm:px-8 lg:px-[52px] xl:px-20 py-12 lg:py-20 flex flex-col justify-center">
        <FadeUp load delay={0.06} className="mb-6">
          <span className="inline-flex items-center gap-2 w-fit font-mono text-[10px] tracking-[0.08em] sm:tracking-[0.18em] uppercase px-[10px] py-[6px] border border-[rgba(204,42,0,0.4)] text-[#ff7a55] bg-[rgba(204,42,0,0.08)]">
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-blink" />
            Restoration Bookkeeping · Industry Exclusive
          </span>
        </FadeUp>

        <FadeUp load delay={0.18}>
          <h1 className="font-disp text-[clamp(68px,9vw,124px)] leading-[0.9] tracking-[0.025em] mt-6">
            YOUR BOOKS
            <br />
            ARE A
            <br />
            <span className="text-c3-yellow animate-glowPulse">CATEGORY</span>
            <br />
            <span className="text-c3-red">3</span>{" "}
            <span className="[color:transparent] [-webkit-text-stroke:1.5px_#2A2A28]">
              LOSS.
            </span>
          </h1>
        </FadeUp>

        <FadeUp load delay={0.30}>
          <p className="font-cond font-light text-[clamp(18px,2.2vw,26px)] text-c3-mid mt-[26px] leading-[1.4]">
            And you&rsquo;re running your business like{" "}
            <strong className="text-c3-text font-semibold">nothing&rsquo;s wrong.</strong>
          </p>
        </FadeUp>

        <FadeUp load delay={0.44}>
          <p className="font-body font-light text-base text-c3-mid mt-[22px] leading-[1.9] max-w-[540px]">
            A Category 3 water loss is total contamination — the worst of the
            worst. When your books are in that condition, every decision you make
            is based on bad data. You think you&rsquo;re profitable. You think
            that job went well. You think cash will be fine next month.
            You&rsquo;re guessing. And in restoration, guessing eventually closes
            the doors.
          </p>
        </FadeUp>

        <FadeUp load delay={0.58}>
          <div className="mt-8 flex gap-3 flex-wrap">
            <Link
              href="#contact"
              className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
            >
              Get Free Assessment →
            </Link>
            <Link
              href="#pricing"
              className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] border border-c3-b2 text-c3-mid hover:border-c3-mid hover:text-c3-text transition-all duration-[220ms]"
            >
              See Pricing
            </Link>
          </div>
        </FadeUp>
      </div>

      {/* Right column — diagnostic panel */}
      <div className="px-5 sm:px-8 lg:px-[52px] xl:px-20 py-12 lg:py-20 border-t md:border-t-0 md:border-l border-c3-border flex flex-col justify-center">
        <FadeUp load delay={0.30}>
          <div className="p-5 sm:p-7 bg-[rgba(255,255,255,0.015)] border border-c3-border max-w-[520px] w-full">
            <div className="flex justify-between items-center pb-[14px] border-b border-c3-border gap-[18px]">
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-c3-dim">
                Financial Diagnostic Scan
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase px-[10px] py-[6px] border border-c3-yellow-dim text-c3-yellow bg-[rgba(240,190,0,0.04)]">
                <span className="w-1.5 h-1.5 rounded-full bg-c3-yellow animate-blink" />
                Scanning Now
              </span>
            </div>

            {diagRows.map(({ q, ans, color }) => (
              <div
                key={q}
                className="flex justify-between items-center gap-[18px] py-[13px] border-b border-dashed border-c3-border font-body text-[13.5px] leading-[1.4] last:border-b-0"
              >
                <span className="text-c3-text flex-1">{q}</span>
                <span className={`font-mono text-[10.5px] tracking-[0.2em] whitespace-nowrap ${color}`}>
                  {ans}
                </span>
              </div>
            ))}

            <div className="mt-5 px-[18px] py-4 border border-[rgba(204,42,0,0.4)] bg-[rgba(204,42,0,0.07)]">
              <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-[#ff7a55] mb-2">
                Damage Classification
              </div>
              <p className="font-body font-light text-[13.5px] leading-[1.7]">
                This is a{" "}
                <strong className="text-c3-yellow font-medium">
                  Category 3 financial situation.
                </strong>{" "}
                Not because you&rsquo;re doing anything wrong — but because nobody
                built your books for a restoration company. We fix that.
              </p>
            </div>

            <Link
              href="#contact"
              className="mt-[18px] flex justify-center items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-3 bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms]"
            >
              Schedule Your Free Assessment →
            </Link>
          </div>
        </FadeUp>
      </div>
      </div>
    </section>
  );
}
