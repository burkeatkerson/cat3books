import { cn } from "@/lib/cn";

const plRows = [
  { job: "Smith Residence", rev: "$38.4K", margin: "+34%", type: "g" },
  { job: "Riverside Hotel", rev: "$214K",  margin: "+28%", type: "g" },
  { job: "Garcia Rebuild",  rev: "$91.5K", margin: "−4%",  type: "r" },
  { job: "Anderson Loss",   rev: "$22.8K", margin: "+41%", type: "g" },
  { job: "Code Blue × 6",  rev: "$58.2K", margin: "−11%", type: "r" },
  { job: "Quarter ∑",      rev: "$425K",  margin: "+18%", type: "t" },
];

interface PostCoverProps {
  coverStyle: string;
  coverGlyph: string;
  coverSub: string;
  issueNumber: string;
  categoryLabel: string;
  /** Extra height class — defaults to h-[200px] for cards, override for featured */
  className?: string;
}

export default function PostCover({
  coverStyle,
  coverGlyph,
  coverSub,
  issueNumber,
  categoryLabel,
  className,
}: PostCoverProps) {
  if (coverStyle === "cv-pl") {
    return (
      <div className={cn("cv-pl relative w-full overflow-hidden flex flex-col justify-center px-7 py-6 gap-0", className)}>
        <span className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.22em] text-c3-dim uppercase z-10 leading-none">
          {"// FIG. 04 — REAL CLIENT, ANONYMIZED"}
        </span>

        {/* Table header */}
        <div className="grid grid-cols-[1fr_72px_60px] font-mono text-[9px] tracking-[0.2em] text-c3-dim uppercase border-b border-c3-b2 pb-[9px] mt-6">
          <div>Job</div>
          <div className="text-right">Rev</div>
          <div className="text-right">GM</div>
        </div>

        {plRows.map(({ job, rev, margin, type }) => (
          <div
            key={job}
            className={cn(
              "grid grid-cols-[1fr_72px_60px] items-center py-[8px] border-b border-dashed border-c3-border font-mono text-[11px] last:border-b-0",
              type === "r" && "bg-[rgba(204,42,0,0.05)] -mx-7 px-7",
              type === "t" && "border-b-0 pt-[12px]"
            )}
          >
            <div className={cn(
              "font-cond font-semibold text-[13px] tracking-[0.04em] uppercase",
              type === "r" ? "text-[#ff7a55]" : type === "t" ? "text-c3-yellow" : "text-c3-text"
            )}>
              {job}
            </div>
            <div className={cn("text-right font-disp text-[16px] leading-none", type === "t" ? "text-c3-yellow" : "text-c3-text")}>
              {rev}
            </div>
            <div className={cn(
              "text-right font-disp text-[16px] leading-none",
              type === "g" ? "text-c3-green" : type === "r" ? "text-c3-red" : "text-c3-yellow"
            )}>
              {margin}
            </div>
          </div>
        ))}

        <span className="absolute bottom-3 right-3 font-mono text-[9px] tracking-[0.22em] text-c3-dim uppercase">
          CAT3 / FIELD NOTES
        </span>
      </div>
    );
  }

  const lines = coverGlyph.split("\\n");

  return (
    <div className={cn("relative w-full overflow-hidden", coverStyle, className)}>
      {/* Top-left label */}
      <span className="absolute top-3 left-3 font-mono text-[9px] tracking-[0.22em] text-c3-dim uppercase z-10 leading-none">
        {"// "}{categoryLabel.toUpperCase()}
      </span>

      {/* Centre glyph */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="text-center">
          <div
            className="font-disp text-c3-yellow leading-[0.85] tracking-[0.02em] opacity-85"
            style={{ fontSize: lines.length > 2 ? "54px" : lines.length > 1 ? "72px" : "96px" }}
          >
            {lines.map((line, i) => (
              <span key={i} className="block">{line}</span>
            ))}
          </div>
          {coverSub && (
            <span className="block font-mono text-[10px] tracking-[0.24em] text-c3-text mt-2 opacity-60 uppercase">
              {coverSub}
            </span>
          )}
        </div>
      </div>

      {/* Bottom-left issue number */}
      {issueNumber && (
        <span className="absolute bottom-3 left-3 font-mono text-[9px] tracking-[0.22em] text-c3-dim uppercase z-10">
          {issueNumber}
        </span>
      )}
    </div>
  );
}
