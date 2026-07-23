import Link from "next/link";
import type { ResolvedCourse } from "@/lib/school/lessons";
import { SUBJECT_BY_KEY, schoolPaths } from "@/lib/school/taxonomy";
import { LevelBadge } from "./Badges";

export default function CourseCard({ course }: { course: ResolvedCourse }) {
  const subject = SUBJECT_BY_KEY[course.subject];

  return (
    <Link
      href={schoolPaths.course(course.id)}
      className="group flex flex-col bg-school-raised border border-school-line hover:border-school-navy/45 transition-colors duration-200"
    >
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center gap-2 flex-wrap mb-3">
          <span className="inline-flex items-center border border-school-sun/50 bg-school-sun/[0.12] px-[7px] py-[3px] font-mono text-[9px] tracking-[0.16em] uppercase text-[#8a6d00]">
            Course
          </span>
          <LevelBadge level={course.level} />
        </div>

        <h3 className="font-cond font-bold text-[23px] leading-[1.12] uppercase tracking-[0.015em] text-school-ink group-hover:text-school-navy transition-colors duration-200">
          {course.title}
        </h3>

        <p className="mt-2.5 font-body text-[14px] leading-[1.65] text-school-muted flex-1">
          {course.summary}
        </p>

        {/* Syllabus preview */}
        <ol className="mt-4 flex flex-col gap-1.5">
          {course.lessons.slice(0, 3).map((l, i) => (
            <li key={l.meta.slug} className="flex items-baseline gap-2.5">
              <span className="font-mono text-[10px] text-school-faint tabular-nums shrink-0">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-body text-[13px] leading-[1.45] text-school-body line-clamp-1">
                {l.meta.title}
              </span>
            </li>
          ))}
          {course.lessons.length > 3 && (
            <li className="font-mono text-[10px] tracking-[0.14em] uppercase text-school-faint pl-[26px]">
              + {course.lessons.length - 3} more
            </li>
          )}
        </ol>

        <div className="mt-5 pt-3.5 border-t border-school-line flex items-center justify-between gap-3 font-mono text-[9.5px] tracking-[0.14em] uppercase text-school-faint">
          <span>{subject?.short ?? course.subject}</span>
          <span>
            {course.lessons.length} lessons
            {course.totalMinutes > 0 && ` · ~${course.totalMinutes} min`}
          </span>
        </div>
      </div>
    </Link>
  );
}
