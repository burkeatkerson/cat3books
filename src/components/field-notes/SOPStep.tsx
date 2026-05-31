import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface Props {
  /** Step number — e.g. 1, 14, or "14a". */
  n: number | string;
  /** Action-verb step name — e.g. "Reconcile the operating bank account". */
  name: string;
  /** Optional time estimate — e.g. "15 min". */
  time?: string;
  /** Optional anchor id for deep linking — e.g. "step-1". Defaults to step-{n}. */
  id?: string;
  /** The detailed instruction (2–4 sentences). */
  children: ReactNode;
  /** For finance SOPs: the exact software path — e.g. "Banking > Reconcile". */
  where?: ReactNode;
  /** What to check / verify before moving on. */
  check?: ReactNode;
  /** What to escalate or flag. */
  escalate?: ReactNode;
  className?: string;
}

/**
 * Visual step card for Standard Operating Procedure (SOP) posts.
 *
 * Renders a numbered, scannable step with an action-verb name, detailed
 * instruction, an optional software/location path, a "check for" line, and an
 * "escalate" line. Carries an `id` anchor so individual steps can be deep-linked.
 *
 * Schema note: this component is intentionally VISUAL-ONLY and emits no JSON-LD.
 * The canonical HowTo schema for an SOP post is generated once, from the post's
 * frontmatter `howToSteps` (+ `howTo` meta), in the Field Notes [slug] route.
 * That produces a single valid HowTo node with the full step array, rather than
 * fragmented HowToStep markup scattered across the page. Keep the frontmatter
 * `howToSteps` in sync with the steps rendered here.
 */
export default function SOPStep({
  n,
  name,
  time,
  id,
  children,
  where,
  check,
  escalate,
  className,
}: Props) {
  const anchor = id ?? `step-${n}`;
  return (
    <div
      id={anchor}
      className={cn(
        "not-prose scroll-mt-24 my-5 border border-c3-border bg-c3-card",
        "border-l-[3px] border-l-c3-yellow",
        className
      )}
    >
      <div className="flex items-start gap-4 px-5 pt-4">
        <span className="shrink-0 font-disp text-[22px] leading-none text-c3-yellow tabular-nums mt-[2px]">
          {typeof n === "number" ? String(n).padStart(2, "0") : n}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <h4 className="font-cond font-bold text-[16px] tracking-[0.01em] text-c3-text leading-snug m-0">
              {name}
            </h4>
            {time && (
              <span className="shrink-0 font-mono text-[9px] tracking-[0.16em] uppercase text-c3-dim border border-c3-border px-2 py-[3px] leading-none">
                {time}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="pl-[52px] pr-5 pb-4 pt-2">
        <div className="font-body font-light text-[14.5px] text-c3-mid leading-[1.7] [&_p]:mb-2 [&_strong]:text-c3-text [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-c3-yellow">
          {children}
        </div>

        {where && (
          <div className="mt-3 font-mono text-[11px] tracking-[0.04em] text-c3-mid bg-[rgba(255,255,255,0.02)] border border-c3-border px-3 py-2">
            <span className="text-c3-dim uppercase tracking-[0.16em] text-[8.5px] mr-2">Where</span>
            {where}
          </div>
        )}

        {check && (
          <div className="mt-3 flex gap-2 text-[13.5px] font-body font-light leading-[1.6]">
            <span className="shrink-0 font-mono text-[8.5px] tracking-[0.16em] uppercase text-c3-yellow mt-[3px]">✓ Check</span>
            <span className="text-c3-mid">{check}</span>
          </div>
        )}

        {escalate && (
          <div className="mt-2 flex gap-2 text-[13.5px] font-body font-light leading-[1.6]">
            <span className="shrink-0 font-mono text-[8.5px] tracking-[0.16em] uppercase text-[#E5484D] mt-[3px]">▲ Escalate</span>
            <span className="text-c3-mid">{escalate}</span>
          </div>
        )}
      </div>
    </div>
  );
}
