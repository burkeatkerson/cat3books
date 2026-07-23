import Link from "next/link";
import SchoolContainer from "./SchoolContainer";
import { SUBJECTS, LEVELS, LESSON_TYPES, schoolPaths } from "@/lib/school/taxonomy";
import { countsBySubject, getCourses, getLessonCount } from "@/lib/school/lessons";
import { carryforward } from "@/lib/companion";
import { site } from "@/lib/site";

/**
 * School footer. Doubles as the section's site map — every subject, level and
 * lesson type is one click away, which is how a library of several hundred
 * lessons stays crawlable and navigable without a mega-menu.
 */
export default function SchoolFooter() {
  const counts = countsBySubject();
  const courses = getCourses();
  const total = getLessonCount();

  const linkBase =
    "block font-body text-[13.5px] leading-[1.5] text-school-body hover:text-school-navy transition-colors duration-150";

  return (
    <footer className="bg-school-sand border-t border-school-line">
      <SchoolContainer className="py-14 lg:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10">
          {/* Subjects */}
          <div className="col-span-2">
            <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-school-navy mb-4">
              Subjects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
              {SUBJECTS.map((s) => (
                <Link key={s.key} href={schoolPaths.subject(s.key)} className={linkBase}>
                  {s.label}
                  <span className="ml-1.5 font-mono text-[10px] text-school-faint tabular-nums">
                    {counts[s.key] ?? 0}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Courses */}
          <div>
            <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-school-navy mb-4">
              Free Courses
            </h2>
            <div className="flex flex-col gap-2">
              {courses.map((c) => (
                <Link key={c.id} href={schoolPaths.course(c.id)} className={linkBase}>
                  {c.title}
                  <span className="ml-1.5 font-mono text-[10px] text-school-faint tabular-nums">
                    {c.lessons.length}
                  </span>
                </Link>
              ))}
              <Link href={schoolPaths.courses} className={`${linkBase} mt-1 text-school-navy`}>
                All courses →
              </Link>
            </div>
          </div>

          {/* Browse by */}
          <div>
            <h2 className="font-mono text-[10px] tracking-[0.22em] uppercase text-school-navy mb-4">
              Browse By
            </h2>
            <div className="flex flex-col gap-2">
              {LEVELS.map((l) => (
                <Link key={l.key} href={schoolPaths.filtered({ level: l.key })} className={linkBase}>
                  {l.label}
                </Link>
              ))}
              {LESSON_TYPES.map((t) => (
                <Link key={t.key} href={schoolPaths.filtered({ type: t.key })} className={linkBase}>
                  {t.label}s
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bridge back to the firm */}
        <div className="mt-14 pt-8 border-t border-school-line2 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-[520px]">
            <p className="font-cond font-semibold text-[19px] leading-[1.25] text-school-ink">
              The School is free. The bookkeeping is not.
            </p>
            <p className="mt-2 font-body text-[14px] leading-[1.6] text-school-muted">
              Cat3 Books is a bookkeeping firm. We publish the School so owners can
              understand their own numbers — and we do the work for the ones who would
              rather not.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 font-cond font-bold text-[12px] tracking-[0.08em] uppercase px-4 py-3 bg-school-navy text-school-paper hover:bg-school-navy2 transition-colors duration-150"
            >
              See what we do →
            </Link>
            <Link
              href="/field-notes"
              className="inline-flex items-center gap-2 font-cond font-bold text-[12px] tracking-[0.08em] uppercase px-4 py-3 border border-school-line2 text-school-body hover:border-school-navy hover:text-school-navy transition-colors duration-150"
            >
              Field Notes
            </Link>
          </div>
        </div>

        {/* Companion publication — a standing, sitewide mention. The shared
            "independent educational reference" framing is the credibility tie. */}
        <div className="mt-10 pt-6 border-t border-school-line2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-school-navy">
            {carryforward.relationship}
          </span>
          <a
            href={carryforward.url}
            target="_blank"
            rel="noopener"
            className="font-cond font-semibold text-[15px] text-school-ink hover:text-school-navy transition-colors duration-150"
          >
            {carryforward.name} ↗
          </a>
          <span className="font-body text-[13px] text-school-muted">
            — {carryforward.tagline} An independent reference for tax professionals and investors.
          </span>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] tracking-[0.14em] uppercase text-school-faint">
          <span>
            © {new Date().getFullYear()} {site.name} · {total} lessons
          </span>
          <span>
            Educational content only — not tax, legal or accounting advice.
          </span>
        </div>
      </SchoolContainer>
    </footer>
  );
}
