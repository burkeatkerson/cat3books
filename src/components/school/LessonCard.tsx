import Link from "next/link";
import { cn } from "@/lib/cn";
import type { LessonMeta } from "@/lib/school/lessons";
import { SUBJECT_BY_KEY, schoolPaths } from "@/lib/school/taxonomy";
import { LevelBadge, TypeBadge } from "./Badges";

interface Props {
  lesson: LessonMeta;
  /** Show the subject line. Off on subject pages where it is redundant. */
  showSubject?: boolean;
  /** Ordinal shown as a lesson number, e.g. inside a course outline. */
  index?: number;
  className?: string;
}

/**
 * The School's one card. Used on the home page, subject pages, the library and
 * related-lesson strips — a single card keeps a 500-lesson library visually
 * consistent no matter which route surfaces it.
 */
export default function LessonCard({ lesson, showSubject = true, index, className }: Props) {
  const subject = SUBJECT_BY_KEY[lesson.subject];

  return (
    <article
      className={cn(
        "group relative bg-school-raised border border-school-line hover:border-school-navy/40 transition-colors duration-200",
        className
      )}
    >
      <Link href={schoolPaths.lesson(lesson.slug)} className="flex flex-col h-full p-5">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          {typeof index === "number" && (
            <span className="inline-flex items-center justify-center w-6 h-6 border border-school-line2 bg-school-sand font-mono text-[11px] text-school-navy tabular-nums">
              {index + 1}
            </span>
          )}
          <TypeBadge type={lesson.type} />
          <LevelBadge level={lesson.level} />
        </div>

        <h3 className="font-cond font-semibold text-[19px] leading-[1.2] tracking-[0.01em] text-school-ink group-hover:text-school-navy transition-colors duration-200">
          {lesson.title}
        </h3>

        <p className="mt-2 font-body text-[13.5px] leading-[1.6] text-school-muted flex-1">
          {lesson.excerpt}
        </p>

        <div className="mt-4 pt-3 border-t border-school-line flex items-center justify-between gap-3">
          {showSubject && subject ? (
            <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-school-faint">
              {subject.code} · {subject.short}
            </span>
          ) : (
            <span />
          )}
          <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-school-faint whitespace-nowrap">
            {lesson.readTime}
          </span>
        </div>
      </Link>
    </article>
  );
}

/** Dense one-line variant for long lists (library results, subject syllabus). */
export function LessonRow({ lesson, index }: { lesson: LessonMeta; index?: number }) {
  return (
    <Link
      href={schoolPaths.lesson(lesson.slug)}
      className="group flex items-baseline gap-4 py-3.5 border-b border-school-line last:border-b-0"
    >
      {typeof index === "number" && (
        <span className="font-mono text-[11px] text-school-faint tabular-nums w-6 shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}
      <div className="min-w-0 flex-1">
        <span className="font-cond font-semibold text-[16.5px] leading-[1.25] text-school-ink group-hover:text-school-navy transition-colors duration-150">
          {lesson.title}
        </span>
        <p className="mt-0.5 font-body text-[13px] leading-[1.55] text-school-muted line-clamp-2">
          {lesson.excerpt}
        </p>
      </div>
      <span className="hidden sm:block font-mono text-[9.5px] tracking-[0.14em] uppercase text-school-faint whitespace-nowrap shrink-0">
        {lesson.readTime}
      </span>
    </Link>
  );
}
