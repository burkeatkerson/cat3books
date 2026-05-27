"use client";

import { useEffect, useRef } from "react";
import Overline from "./Overline";

export default function AutopsySection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const els = Array.from(container.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));

    const timer = setTimeout(() => {
      els.forEach((el) => {
        if (!el.classList.contains("is-visible")) {
          const r = el.getBoundingClientRect();
          if (r.top < window.innerHeight && r.bottom > 0) {
            el.classList.add("is-visible");
          }
        }
      });
    }, 2500);

    return () => {
      io.disconnect();
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <section className="relative px-[52px] py-[108px] md:px-5 md:py-16">
        <Overline>Exhibit A · Last Quarter · Anonymized Client</Overline>
        <h2 className="font-disp text-[clamp(40px,5vw,68px)] tracking-[0.025em] leading-[0.95]">
          The jobs that made you money.
          <br />
          <span className="text-c3-red">And the ones that bled you.</span>
        </h2>
        <p className="font-body font-light text-[17px] text-c3-mid mt-[18px] max-w-[720px] leading-[1.7]">
          This is what a real monthly job-level P&L looks like once we&rsquo;ve
          done a Cat3 cleanup. Scroll through. Notice how few rows it takes to
          find a six-figure problem.
        </p>
      </section>

      <div ref={containerRef} className="px-[52px] pb-[60px] md:px-5 md:pb-10">
        {/* Table header */}
        <div className="grid grid-cols-[48px_1fr_150px_130px] items-center py-[22px] px-[26px] border-b border-c3-b2 font-mono text-[10px] tracking-[0.22em] text-c3-dim uppercase">
          <div>#</div>
          <div>Job</div>
          <div className="text-right">Revenue</div>
          <div className="text-right">Gross Margin</div>
        </div>

        {/* Green row 01 */}
        <div
          data-reveal
          className="grid grid-cols-[48px_1fr_150px_130px] items-center py-[22px] px-[26px] border-b border-c3-border hover:bg-[rgba(255,255,255,0.015)] transition-colors duration-200"
        >
          <div className="font-mono text-[9px] text-c3-dim tracking-[0.2em]">01</div>
          <div>
            <div className="font-cond font-semibold text-[16px] text-c3-text tracking-[0.04em] uppercase">
              Smith Residence
            </div>
            <span className="block font-body font-light text-[12px] text-c3-mid mt-1">
              Water · Cat 2 · 14-day mitigation · Geico
            </span>
          </div>
          <div className="font-disp text-[26px] text-c3-text text-right tracking-[0.02em]">
            $38,400
          </div>
          <div className="font-disp text-[26px] text-c3-green text-right tracking-[0.02em]">
            +34%
          </div>
        </div>

        {/* Green row 02 */}
        <div
          data-reveal
          className="grid grid-cols-[48px_1fr_150px_130px] items-center py-[22px] px-[26px] border-b border-c3-border hover:bg-[rgba(255,255,255,0.015)] transition-colors duration-200"
        >
          <div className="font-mono text-[9px] text-c3-dim tracking-[0.2em]">02</div>
          <div>
            <div className="font-cond font-semibold text-[16px] text-c3-text tracking-[0.04em] uppercase">
              Riverside Hotel
            </div>
            <span className="block font-body font-light text-[12px] text-c3-mid mt-1">
              Fire &amp; smoke · 8-week reconstruction · State Farm
            </span>
          </div>
          <div className="font-disp text-[26px] text-c3-text text-right tracking-[0.02em]">
            $214,000
          </div>
          <div className="font-disp text-[26px] text-c3-green text-right tracking-[0.02em]">
            +28%
          </div>
        </div>

        {/* Red row 03 */}
        <div
          data-reveal
          className="grid grid-cols-[48px_1fr_150px_130px] items-center py-[22px] px-[26px] border-b border-c3-border bg-[rgba(204,42,0,0.05)] hover:bg-[rgba(204,42,0,0.07)] transition-colors duration-200"
        >
          <div className="font-mono text-[9px] text-c3-dim tracking-[0.2em]">03</div>
          <div>
            <div className="font-cond font-semibold text-[16px] text-[#ff7a55] tracking-[0.04em] uppercase">
              Garcia Rebuild
            </div>
            <span className="block font-body font-light text-[12px] text-c3-mid mt-1">
              Reconstruction · 12 weeks · Allstate ·{" "}
              <strong className="text-[#ff7a55] font-medium">
                3 missed supplements
              </strong>
            </span>
          </div>
          <div className="font-disp text-[26px] text-c3-text text-right tracking-[0.02em]">
            $91,500
          </div>
          <div className="font-disp text-[26px] text-c3-red text-right tracking-[0.02em]">
            −4%
          </div>
        </div>

        {/* Callout 01 */}
        <div
          data-reveal
          className="grid grid-cols-[48px_1fr] items-start gap-6 py-[18px] px-[26px] pb-6 border-b border-c3-border"
        >
          <div className="font-disp text-[32px] text-c3-yellow leading-none">↑</div>
          <p className="font-cond font-normal text-[19px] leading-[1.5] text-c3-text">
            This job <em>looked</em> profitable. It wasn&rsquo;t. Three approved
            supplements never made it into the books — that&rsquo;s a{" "}
            <strong className="text-c3-yellow font-semibold">
              $13,200 leak on a single rebuild.
            </strong>
          </p>
        </div>

        {/* Green row 04 */}
        <div
          data-reveal
          className="grid grid-cols-[48px_1fr_150px_130px] items-center py-[22px] px-[26px] border-b border-c3-border hover:bg-[rgba(255,255,255,0.015)] transition-colors duration-200"
        >
          <div className="font-mono text-[9px] text-c3-dim tracking-[0.2em]">04</div>
          <div>
            <div className="font-cond font-semibold text-[16px] text-c3-text tracking-[0.04em] uppercase">
              Anderson Loss
            </div>
            <span className="block font-body font-light text-[12px] text-c3-mid mt-1">
              Mold + contents · Cat 3 bathroom · Travelers
            </span>
          </div>
          <div className="font-disp text-[26px] text-c3-text text-right tracking-[0.02em]">
            $22,800
          </div>
          <div className="font-disp text-[26px] text-c3-green text-right tracking-[0.02em]">
            +41%
          </div>
        </div>

        {/* Red row 05 */}
        <div
          data-reveal
          className="grid grid-cols-[48px_1fr_150px_130px] items-center py-[22px] px-[26px] border-b border-c3-border bg-[rgba(204,42,0,0.05)] hover:bg-[rgba(204,42,0,0.07)] transition-colors duration-200"
        >
          <div className="font-mono text-[9px] text-c3-dim tracking-[0.2em]">05</div>
          <div>
            <div className="font-cond font-semibold text-[16px] text-[#ff7a55] tracking-[0.04em] uppercase">
              TPA Program · Code Blue × 6
            </div>
            <span className="block font-body font-light text-[12px] text-c3-mid mt-1">
              Six small water jobs routed by program · 17% takedown
            </span>
          </div>
          <div className="font-disp text-[26px] text-c3-text text-right tracking-[0.02em]">
            $58,200
          </div>
          <div className="font-disp text-[26px] text-c3-red text-right tracking-[0.02em]">
            −11%
          </div>
        </div>

        {/* Callout 02 — red */}
        <div
          data-reveal
          className="grid grid-cols-[48px_1fr] items-start gap-6 py-[18px] px-[26px] pb-6 border-b border-c3-border"
        >
          <div className="font-disp text-[32px] text-c3-red leading-none">↑</div>
          <p className="font-cond font-normal text-[19px] leading-[1.5] text-c3-text">
            The whole Code Blue program is unprofitable. Six jobs, $58K of
            revenue,{" "}
            <strong className="text-c3-red font-semibold">losing $6,402.</strong>{" "}
            You&rsquo;d never see this without job-level P&L. The owner kept
            taking these jobs because &ldquo;they pay fast.&rdquo;
          </p>
        </div>

        {/* Green row 06 */}
        <div
          data-reveal
          className="grid grid-cols-[48px_1fr_150px_130px] items-center py-[22px] px-[26px] border-b border-c3-border hover:bg-[rgba(255,255,255,0.015)] transition-colors duration-200"
        >
          <div className="font-mono text-[9px] text-c3-dim tracking-[0.2em]">06</div>
          <div>
            <div className="font-cond font-semibold text-[16px] text-c3-text tracking-[0.04em] uppercase">
              Crestwood Apts.
            </div>
            <span className="block font-body font-light text-[12px] text-c3-mid mt-1">
              Storm · large-loss · 22-day mitigation · Liberty Mutual
            </span>
          </div>
          <div className="font-disp text-[26px] text-c3-text text-right tracking-[0.02em]">
            $184,600
          </div>
          <div className="font-disp text-[26px] text-c3-green text-right tracking-[0.02em]">
            +19%
          </div>
        </div>

        {/* Total row */}
        <div
          data-reveal
          className="grid grid-cols-[48px_1fr_150px_130px] items-center py-[22px] px-[26px] border-t border-c3-yellow-dim bg-[rgba(240,190,0,0.05)]"
        >
          <div className="font-mono text-[9px] text-c3-yellow tracking-[0.2em]">∑</div>
          <div>
            <div className="font-cond font-semibold text-[16px] text-c3-yellow tracking-[0.04em] uppercase">
              Quarter Total
            </div>
            <span className="block font-body font-light text-[12px] text-c3-mid mt-1">
              Blended margin · all jobs · before remediation
            </span>
          </div>
          <div className="font-disp text-[26px] text-c3-yellow text-right tracking-[0.02em]">
            $609,500
          </div>
          <div className="font-disp text-[26px] text-c3-yellow text-right tracking-[0.02em]">
            +18.2%
          </div>
        </div>

        {/* Found grid */}
        <div className="grid grid-cols-3 gap-[18px] mt-9 md:grid-cols-1">
          <div className="bg-c3-card border-l-[3px] border-c3-red py-[22px] px-6">
            <div className="font-mono text-[9px] text-c3-dim tracking-[0.2em]">
              FOUND // 01
            </div>
            <h4 className="font-cond font-bold text-[18px] tracking-[0.02em] uppercase text-c3-red mt-2 leading-[1.2]">
              $13,200 missed supplements
            </h4>
            <p className="font-body font-light text-[13.5px] text-c3-mid leading-[1.75] mt-[10px]">
              Approved by carrier. Never booked. Single rebuild job. Found
              inside week 2 of cleanup.
            </p>
          </div>
          <div className="bg-c3-card border-l-[3px] border-c3-red py-[22px] px-6">
            <div className="font-mono text-[9px] text-c3-dim tracking-[0.2em]">
              FOUND // 02
            </div>
            <h4 className="font-cond font-bold text-[18px] tracking-[0.02em] uppercase text-c3-red mt-2 leading-[1.2]">
              $6,402 TPA program loss
            </h4>
            <p className="font-body font-light text-[13.5px] text-c3-mid leading-[1.75] mt-[10px]">
              Code Blue program is below margin. Drop it, renegotiate it, or
              absorb it knowingly.
            </p>
          </div>
          <div className="bg-c3-card border-l-[3px] border-c3-yellow py-[22px] px-6">
            <div className="font-mono text-[9px] text-c3-dim tracking-[0.2em]">
              FOUND // 03
            </div>
            <h4 className="font-cond font-bold text-[18px] tracking-[0.02em] uppercase text-c3-yellow mt-2 leading-[1.2]">
              8 points of margin recovered
            </h4>
            <p className="font-body font-light text-[13.5px] text-c3-mid leading-[1.75] mt-[10px]">
              Average uplift Cat3 Books clients see in the first 90 days after
              cleanup.
            </p>
          </div>
        </div>

        <p className="font-cond font-semibold text-[24px] text-c3-text mt-10 leading-[1.4] max-w-[780px]">
          Two of six jobs were losing money. You can&rsquo;t see that without
          job costing.{" "}
          <span className="text-c3-yellow">
            We make it impossible not to see.
          </span>
        </p>
      </div>
    </>
  );
}
