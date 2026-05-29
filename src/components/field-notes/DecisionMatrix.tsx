import { cn } from "@/lib/cn";

interface Props {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

/**
 * Styled wrapper for the decision matrix table in decision-framework posts.
 * Usage in MDX:
 *
 * <DecisionMatrix title="The Bookkeeping Decision Matrix">
 *
 * | Criterion | Under Threshold | At Threshold | Over Threshold |
 * |-----------|-----------------|--------------|----------------|
 * | ...       | ...             | ...          | ...            |
 *
 * </DecisionMatrix>
 *
 * The markdown table inside renders as a styled HTML table via prose-field-notes.
 */
export default function DecisionMatrix({ children, title, className }: Props) {
  return (
    <div className={cn("my-10 bg-c3-card border border-c3-border overflow-hidden", className)}>
      {title && (
        <div className="px-6 py-4 border-b border-c3-border bg-[rgba(240,190,0,0.04)] flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-c3-yellow shrink-0" />
          <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-c3-yellow">
            {title}
          </span>
        </div>
      )}
      <div className="decision-matrix-body overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
