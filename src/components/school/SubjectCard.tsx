import Link from "next/link";
import type { SubjectDef } from "@/lib/school/taxonomy";
import { schoolPaths } from "@/lib/school/taxonomy";

/** Background texture per subject, cycled so the grid reads as a shelf. */
const TEXTURES = ["sc-ruled", "sc-grid", "sc-dots"];

export default function SubjectCard({
  subject,
  count,
  position = 0,
}: {
  subject: SubjectDef;
  count: number;
  position?: number;
}) {
  return (
    <Link
      href={schoolPaths.subject(subject.key)}
      className="group relative flex flex-col bg-school-raised border border-school-line hover:border-school-navy/45 transition-colors duration-200 overflow-hidden"
    >
      <div className={`relative h-[86px] border-b border-school-line ${TEXTURES[position % TEXTURES.length]}`}>
        <span className="absolute left-5 bottom-3 font-disp text-[46px] leading-none text-school-navy/25 group-hover:text-school-navy/40 transition-colors duration-300">
          {subject.code}
        </span>
        <span className="absolute right-4 top-3 font-mono text-[10px] tracking-[0.16em] uppercase text-school-faint tabular-nums">
          {count} {count === 1 ? "lesson" : "lessons"}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-cond font-bold text-[20px] leading-[1.15] uppercase tracking-[0.02em] text-school-ink group-hover:text-school-navy transition-colors duration-200">
          {subject.label}
        </h3>
        <p className="mt-2 font-body text-[13.5px] leading-[1.6] text-school-muted flex-1">
          {subject.blurb}
        </p>
        <span className="mt-4 font-mono text-[9.5px] tracking-[0.18em] uppercase text-school-navy group-hover:translate-x-0.5 transition-transform duration-200">
          Enter subject →
        </span>
      </div>
    </Link>
  );
}
