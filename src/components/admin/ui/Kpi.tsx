import { cn } from "@/lib/cn";
import { Lbl } from "@/components/admin/ui/Lbl";
import type { ReactNode } from "react";

type DeltaTone = "up" | "down" | "flat";

const DELTA_TONE: Record<DeltaTone, string> = {
  up: "text-c3-greensoft",
  down: "text-c3-redsoft",
  flat: "text-c3-dim",
};

export function Kpi({
  label,
  value,
  valueYellow = false,
  delta,
  deltaTone = "flat",
}: {
  label: string;
  value: ReactNode;
  valueYellow?: boolean;
  delta?: ReactNode;
  deltaTone?: DeltaTone;
}) {
  return (
    <div className="bg-c3-card px-6 py-[22px]">
      <div className="mb-3">
        <Lbl>{label}</Lbl>
      </div>
      <div
        className={cn(
          "font-disp text-[50px] leading-[0.95] tracking-[0.01em]",
          valueYellow ? "text-c3-yellow" : "text-c3-text",
        )}
      >
        {value}
      </div>
      {delta != null && (
        <div
          className={cn(
            "font-mono text-[10px] tracking-[0.08em] mt-2.5 flex items-center gap-1.5",
            DELTA_TONE[deltaTone],
          )}
        >
          {delta}
        </div>
      )}
    </div>
  );
}

/** Grid wrapper that gives the 1px hairline-gap look (bg shows through gaps). */
export function KpiGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-c3-border">
      {children}
    </div>
  );
}
