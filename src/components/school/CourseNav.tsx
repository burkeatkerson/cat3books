import Link from "next/link";
import type { ResolvedCourse } from "@/lib/school/lessons";
import { schoolPaths } from "@/lib/school/taxonomy";

/** "Lesson 3 of 7" banner shown at the top of a lesson that belongs to a course. */
export function CourseBanner({ course, index }: { course: ResolvedCourse; index: number }) {
  const total = course.lessons.length;
  const pct = Math.round(((index + 1) / total) * 100);

  return (
    <div className="my-8 border border-school-line bg-school-raised">
      <div className="flex items-center justify-between gap-4 px-5 py-3.5 flex-wrap">
        <div>
          <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-navy">
            Lesson {index + 1} of {total}
          </span>
          <Link
            href={schoolPaths.course(course.id)}
            className="block font-cond font-semibold text-[16px] leading-[1.25] text-school-ink hover:text-school-navy transition-colors duration-150"
          >
            {course.title}
          </Link>
        </div>
        <Link
          href={schoolPaths.course(course.id)}
          className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-school-muted hover:text-school-navy transition-colors duration-150"
        >
          Course outline →
        </Link>
      </div>
      <div className="h-[3px] bg-school-line" role="presentation">
        <div className="h-full bg-school-sun" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

/** Prev / next pair at the foot of a lesson inside a course. */
export function CourseFooterNav({ course, index }: { course: ResolvedCourse; index: number }) {
  const prev = index > 0 ? course.lessons[index - 1] : null;
  const next = index < course.lessons.length - 1 ? course.lessons[index + 1] : null;

  if (!prev && !next) return null;

  return (
    <div className="mt-12 grid sm:grid-cols-2 gap-4">
      {prev ? (
        <Link
          href={schoolPaths.lesson(prev.meta.slug)}
          className="group border border-school-line bg-school-raised p-5 hover:border-school-navy/45 transition-colors duration-200"
        >
          <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-faint">
            ← Previous lesson
          </span>
          <p className="mt-1.5 font-cond font-semibold text-[17px] leading-[1.25] text-school-ink group-hover:text-school-navy transition-colors duration-150">
            {prev.meta.title}
          </p>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}

      {next && (
        <Link
          href={schoolPaths.lesson(next.meta.slug)}
          className="group border border-school-navy bg-school-navy text-school-paper p-5 hover:bg-school-navy2 transition-colors duration-200"
        >
          <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-sun">
            Next lesson →
          </span>
          <p className="mt-1.5 font-cond font-semibold text-[17px] leading-[1.25]">
            {next.meta.title}
          </p>
          <p className="mt-2 font-body text-[13px] leading-[1.6] text-school-paper/75">
            {next.hook}
          </p>
        </Link>
      )}
    </div>
  );
}
