"use client";

import { useAdmin } from "@/lib/admin/store";
import { money } from "@/lib/admin/seed";

const STAGES = ["New lead", "Discovery call", "Assessment booked", "Proposal sent"];

export function PipelinePanel() {
  const { db } = useAdmin();
  const prospects = db.companies.filter((c) => c.segment === "prospect");
  const pipeline = prospects.reduce((s, c) => s + (c.value || 0), 0);

  const stages = STAGES.map((nm) => ({
    nm,
    count: prospects.filter((c) => c.stage === nm).length,
  }));
  const maxStage = Math.max(1, ...stages.map((s) => s.count));

  return (
    <div>
      <div className="flex flex-col gap-3.5">
        {stages.map((s) => (
          <div
            key={s.nm}
            className="grid grid-cols-[140px_1fr_60px] gap-3.5 items-center"
          >
            <div className="font-cond font-semibold text-[14px] uppercase tracking-[0.03em] text-c3-text">
              {s.nm}
              <small className="block font-mono text-[9px] text-c3-dim tracking-[0.1em] mt-0.5">
                {s.count} {s.count === 1 ? "company" : "companies"}
              </small>
            </div>
            <div className="h-[22px] bg-c3-card2 relative overflow-hidden">
              <i
                className="block h-full bg-c3-yellow opacity-[0.85]"
                style={{ width: `${Math.max(6, (s.count / maxStage) * 100)}%` }}
              />
            </div>
            <div className="font-disp text-[24px] text-c3-text text-right">
              {s.count}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-[22px] pt-[18px] border-t border-dashed border-c3-border flex gap-7">
        <div>
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
            Weighted pipeline
          </div>
          <div className="font-disp text-[34px] text-c3-yellow mt-1.5">
            {money(Math.round(pipeline * 0.42))}
            <span className="font-mono text-[12px] text-c3-mid">/mo</span>
          </div>
        </div>
        <div>
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
            Avg. close rate
          </div>
          <div className="font-disp text-[34px] text-c3-text mt-1.5">31%</div>
        </div>
        <div>
          <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim">
            Avg. days to close
          </div>
          <div className="font-disp text-[34px] text-c3-text mt-1.5">24</div>
        </div>
      </div>
    </div>
  );
}
