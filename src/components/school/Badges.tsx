import Link from "next/link";
import { cn } from "@/lib/cn";
import {
  LESSON_TYPE_BY_KEY,
  LEVEL_BY_KEY,
  SUBJECT_BY_KEY,
  schoolPaths,
} from "@/lib/school/taxonomy";

/** Small uppercase meta label — the School's equivalent of an eyebrow. */
export function Eyebrow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] tracking-[0.22em] uppercase text-school-muted",
        className
      )}
    >
      {children}
    </span>
  );
}

const LEVEL_STYLE: Record<string, string> = {
  beginner: "border-school-green/30 text-school-green bg-school-green/[0.06]",
  intermediate: "border-school-navy/30 text-school-navy bg-school-navy/[0.05]",
  advanced: "border-school-red/30 text-school-red bg-school-red/[0.05]",
};

export function LevelBadge({ level, className }: { level: string; className?: string }) {
  const def = LEVEL_BY_KEY[level];
  if (!def) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center border px-[7px] py-[3px] font-mono text-[9px] tracking-[0.16em] uppercase",
        LEVEL_STYLE[level] ?? LEVEL_STYLE.beginner,
        className
      )}
    >
      {def.label}
    </span>
  );
}

export function TypeBadge({ type, className }: { type: string; className?: string }) {
  const def = LESSON_TYPE_BY_KEY[type];
  if (!def) return null;
  return (
    <span
      className={cn(
        "inline-flex items-center border border-school-line2 bg-school-sand px-[7px] py-[3px] font-mono text-[9px] tracking-[0.16em] uppercase text-school-muted",
        className
      )}
    >
      {def.label}
    </span>
  );
}

/** Subject chip that links into the library pre-filtered to that subject. */
export function SubjectChip({
  subject,
  className,
}: {
  subject: string;
  className?: string;
}) {
  const def = SUBJECT_BY_KEY[subject];
  if (!def) return null;
  return (
    <Link
      href={schoolPaths.subject(subject)}
      className={cn(
        "inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.14em] uppercase text-school-navy hover:text-school-navy2 transition-colors duration-150",
        className
      )}
    >
      <span className="text-school-faint">{def.code}</span>
      {def.short}
    </Link>
  );
}
