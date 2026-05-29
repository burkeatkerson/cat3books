import type { ReactNode } from "react";

interface StatProps {
  /** The headline value — e.g. "$12,514" or "4.8%" */
  value: string;
  /** What the value measures — e.g. "Average water damage claim, homeowner insurance" */
  label: string;
  /** Citation — e.g. "Triple-I, 2024" */
  source: string;
  /** Optional HTML id for deep-link anchoring — e.g. "stat-water-damage-claim" */
  id?: string;
  /** Optional extra context rendered below the label */
  note?: ReactNode;
}

/**
 * Visual data card for a single citable statistic in an industry-report post.
 * Renders a dark card with a large yellow value, a descriptive label, and a
 * source attribution line. An optional `id` prop enables deep linking to the
 * stat directly (e.g. /field-notes/report-slug#stat-water-damage-claim).
 */
export default function Stat({ value, label, source, id, note }: StatProps) {
  return (
    <div
      id={id}
      className="not-prose bg-c3-card border border-c3-border rounded-sm px-6 py-5 my-6 scroll-mt-24"
    >
      <div className="font-disp text-[clamp(32px,4vw,52px)] text-c3-yellow leading-none tracking-tight mb-2">
        {value}
      </div>
      <div className="font-body font-light text-[15px] text-c3-text leading-snug mb-3">
        {label}
      </div>
      {note && (
        <div className="font-body font-light text-[13px] text-c3-mid leading-snug mb-2">
          {note}
        </div>
      )}
      <div className="font-mono text-[9px] tracking-[0.18em] uppercase text-c3-dim border-t border-c3-border pt-2 mt-1">
        Source: {source}
      </div>
    </div>
  );
}
