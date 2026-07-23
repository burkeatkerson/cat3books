import type { Metadata } from "next";
import Link from "next/link";
import type { ItemList, WithContext } from "schema-dts";
import JsonLd from "@/components/JsonLd";
import SchoolContainer from "@/components/school/SchoolContainer";
import SubjectCard from "@/components/school/SubjectCard";
import CourseCard from "@/components/school/CourseCard";
import LessonCard from "@/components/school/LessonCard";
import CompanionBand from "@/components/school/CompanionBand";
import { SUBJECTS, LEVELS, schoolPaths } from "@/lib/school/taxonomy";
import {
  countsBySubject,
  featuredCourses,
  featuredLessons,
  getLessonCount,
  latestLessons,
} from "@/lib/school/lessons";
import { schoolSite } from "@/lib/school/site";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: schoolSite.name,
  description: schoolSite.description,
  alternates: { canonical: schoolSite.url },
  openGraph: {
    title: schoolSite.name,
    description: schoolSite.metaDescription,
    url: schoolSite.url,
    siteName: schoolSite.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: schoolSite.name,
    description: schoolSite.metaDescription,
  },
};

export default function SchoolHomePage() {
  const counts = countsBySubject();
  const total = getLessonCount();
  const courses = featuredCourses();
  const featured = featuredLessons(6);
  // Never show the same lesson in both strips — while the library is small the
  // two lists would otherwise be near-identical.
  const featuredSlugs = new Set(featured.map((l) => l.slug));
  const latest = latestLessons(12)
    .filter((l) => !featuredSlugs.has(l.slug))
    .slice(0, 6);

  const subjectListSchema: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${schoolSite.url}#subjects`,
    name: `${schoolSite.name} — subjects`,
    itemListElement: SUBJECTS.map((s, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: s.label,
      url: `${site.url}${schoolPaths.subject(s.key)}`,
    })),
  };

  return (
    <>
      <JsonLd schema={subjectListSchema} />

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="sc-ruled border-b border-school-line">
        <SchoolContainer className="pt-16 pb-14 lg:pt-24 lg:pb-20">
          <div className="max-w-[760px]">
            <p className="font-mono text-[10px] tracking-[0.24em] uppercase text-school-navy mb-5">
              A free school from Cat3 Books
            </p>
            <h1 className="font-cond font-bold text-[clamp(38px,6vw,68px)] leading-[1.02] tracking-[0.005em] uppercase text-school-ink">
              Small Business
              <br />
              <span className="sc-underline">Bookkeeping School</span>
            </h1>
            <p className="mt-6 font-serif text-[clamp(18px,2.2vw,22px)] leading-[1.62] text-school-body">
              Nobody starts a business because they love debits and credits. But the
              owners who understand their own books make better decisions, faster —
              and get taken advantage of far less often. This is where you learn how,
              in plain English, one lesson at a time.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href={schoolPaths.course(courses[0]?.id ?? "bookkeeping-from-scratch")}
                className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.08em] uppercase px-6 py-4 bg-school-navy text-school-paper hover:bg-school-navy2 transition-colors duration-150"
              >
                Start with the basics →
              </Link>
              <Link
                href={schoolPaths.library}
                className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.08em] uppercase px-6 py-4 border border-school-line2 bg-school-raised text-school-body hover:border-school-navy hover:text-school-navy transition-colors duration-150"
              >
                Browse all {total} lessons
              </Link>
            </div>

            <p className="mt-6 font-body text-[13px] leading-[1.6] text-school-muted max-w-[560px]">
              Free, no signup, no course platform. Every lesson is a page on this site —
              searchable, linkable, and written to be read in ten minutes or less.
            </p>
          </div>
        </SchoolContainer>
      </section>

      {/* ── Levels strip ──────────────────────────────────────────────── */}
      <section className="border-b border-school-line bg-school-raised">
        <SchoolContainer>
          <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-school-line">
            {LEVELS.map((l) => (
              <Link
                key={l.key}
                href={schoolPaths.filtered({ level: l.key })}
                className="group py-6 sm:px-6 first:sm:pl-0 last:sm:pr-0"
              >
                <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-navy group-hover:text-school-navy2">
                  {l.label}
                </p>
                <p className="mt-1.5 font-body text-[13.5px] leading-[1.6] text-school-muted">
                  {l.blurb}
                </p>
              </Link>
            ))}
          </div>
        </SchoolContainer>
      </section>

      {/* ── Subjects ──────────────────────────────────────────────────── */}
      <section className="py-14 lg:py-20 border-b border-school-line">
        <SchoolContainer>
          <div className="flex items-end justify-between gap-6 flex-wrap mb-3">
            <h2 className="font-cond font-bold text-[clamp(28px,4vw,42px)] leading-[1.05] uppercase tracking-[0.01em] text-school-ink">
              The subjects.
            </h2>
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-school-faint">
              {SUBJECTS.length} subjects · {total} lessons
            </span>
          </div>
          <p className="font-serif text-[17px] leading-[1.7] text-school-muted max-w-[640px] mb-9">
            Eight departments, each answering one question an owner actually asks.
            Start wherever your problem is — nothing here assumes you read the rest.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {SUBJECTS.map((s, i) => (
              <SubjectCard key={s.key} subject={s} count={counts[s.key] ?? 0} position={i} />
            ))}
          </div>
        </SchoolContainer>
      </section>

      {/* ── Courses ───────────────────────────────────────────────────── */}
      {courses.length > 0 && (
        <section className="py-14 lg:py-20 border-b border-school-line bg-school-sand">
          <SchoolContainer>
            <div className="flex items-end justify-between gap-6 flex-wrap mb-3">
              <h2 className="font-cond font-bold text-[clamp(28px,4vw,42px)] leading-[1.05] uppercase tracking-[0.01em] text-school-ink">
                Guided courses.
              </h2>
              <Link
                href={schoolPaths.courses}
                className="font-mono text-[10px] tracking-[0.18em] uppercase text-school-navy hover:text-school-navy2 transition-colors duration-150"
              >
                All courses →
              </Link>
            </div>
            <p className="font-serif text-[17px] leading-[1.7] text-school-muted max-w-[640px] mb-9">
              If you would rather be walked through it in order, take a course. Each one
              is a sequence of lessons that builds, with a clear finish line.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          </SchoolContainer>
        </section>
      )}

      {/* ── Start here ────────────────────────────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-14 lg:py-20 border-b border-school-line">
          <SchoolContainer>
            <h2 className="font-cond font-bold text-[clamp(28px,4vw,42px)] leading-[1.05] uppercase tracking-[0.01em] text-school-ink mb-3">
              Start here.
            </h2>
            <p className="font-serif text-[17px] leading-[1.7] text-school-muted max-w-[640px] mb-9">
              The lessons most owners need first — whether you have never opened an
              accounting app or you have a file full of transactions you do not trust.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((l) => (
                <LessonCard key={l.slug} lesson={l} />
              ))}
            </div>
          </SchoolContainer>
        </section>
      )}

      {/* ── Newest ──────────────────────────────────────────────────────
          Hidden until there is a full row of lessons that are not already in
          "Start here" — a strip of one card reads as a mistake. */}
      {latest.length >= 3 && (
        <section className="py-14 lg:py-20">
          <SchoolContainer>
            <div className="flex items-end justify-between gap-6 flex-wrap mb-9">
              <h2 className="font-cond font-bold text-[clamp(28px,4vw,42px)] leading-[1.05] uppercase tracking-[0.01em] text-school-ink">
                Newest lessons.
              </h2>
              <Link
                href={schoolPaths.library}
                className="font-mono text-[10px] tracking-[0.18em] uppercase text-school-navy hover:text-school-navy2 transition-colors duration-150"
              >
                Browse the library →
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {latest.map((l) => (
                <LessonCard key={l.slug} lesson={l} />
              ))}
            </div>
          </SchoolContainer>
        </section>
      )}

      {/* ── Companion publication ─────────────────────────────────────── */}
      <CompanionBand />
    </>
  );
}
