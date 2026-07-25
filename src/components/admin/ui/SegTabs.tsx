import { cn } from "@/lib/cn";

export type SegTab = { key: string; label: string; count: number };

export function SegTabs({
  tabs,
  active,
  onChange,
  className,
}: {
  tabs: SegTab[];
  active: string;
  onChange: (key: string) => void;
  className?: string;
}) {
  return (
    <div className={cn("flex gap-px bg-c3-border w-fit", className)}>
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={cn(
              "px-5 py-[11px] font-cond font-semibold text-[14px] tracking-[0.04em] uppercase flex items-center gap-2.5 transition-colors border-b-2",
              isActive
                ? "text-c3-yellow border-c3-yellow bg-c3-card2"
                : "text-c3-mid border-transparent bg-c3-card hover:text-c3-text",
            )}
          >
            {t.label}
            <span
              className={cn(
                "font-mono text-[10px] px-1.5 py-px border",
                isActive
                  ? "text-c3-yellow border-c3-yellow-dim"
                  : "text-c3-dim border-c3-border",
              )}
            >
              {t.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
