import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Course, ItemList, WithContext } from "schema-dts";
import JsonLd from "@/components/JsonLd";
import SchoolContainer from "@/components/school/SchoolContainer";
import Breadcrumbs from "@/components/school/Breadcrumbs";
import LessonCard from "@/components/school/LessonCard";
import CompanionBand from "@/components/school/CompanionBand";
import { SUBJECTS, LEVELS, getSubject, schoolPaths } from "@/lib/school/taxonomy";
import { getCourses, lessonsBySubject } from "@/lib/school/lessons";
import { schoolSite } from "@/lib/school/site";
import { site } from "@/lib/site";

interface Props {
  params: { subject: string };
}

export function generateStaticParams() {
  return SUBJECTS.map((s) => ({ subject: s.key }));
}

export function generateMetadata({ params }: Props): Metadata {
  const subject = getSubject(params.subject);
  if (!subject) return { title: "Subject not found" };
  const url = `${site.url}${schoolPaths.subject(subject.key)}`;
  return {
    title: subject.label,
    description: subject.description,
    alternates: { canonical: url },
    openGraph: {
      title: `${subject.label} | ${schoolSite.name}`,
      description: subject.description,
      url,
      siteName: schoolSite.name,
      type: "website",
    },
  };
}

export default function SubjectPage({ params }: Props) {
  const subject = getSubject(params.subject);
  if (!subject) notFound();

  const lessons = lessonsBySubject(subject.key);
  const courses = getCourses().filter((c) => c.subject === subject.key);
  const url = `${site.url}${schoolPaths.subject(subject.key)}`;

  // Lessons grouped into a syllabus, beginner → advanced.
  const byLevel = LEVELS.map((level) => ({
    level,
    lessons: lessons.filter((l) => l.level === level.key),
  })).filter((group) => group.lessons.length > 0);

  /**
   * A subject is a course of study in schema.org terms — this is what makes the
   * School legible to search and AI engines as education rather than a blog.
   */
  const courseSchema: WithContext<Course> = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name: subject.label,
    description: subject.description,
    url,
    provider: { "@id": `${site.url}/school#school` },
    isAccessibleForFree: true,
    educationalLevel: "Beginner to advanced",
    inLanguage: "en-US",
    about: subject.question,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${Math.max(1, lessons.length * 8)}M`,
    },
  };

  const lessonListSchema: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${url}#lessons`,
    name: `${subject.label} — lessons`,
    numberOfItems: lessons.length,
    itemListElement: lessons.map((l, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: l.title,
      url: `${site.url}${schoolPaths.lesson(l.slug)}`,
    })),
  };

  return (
    <>
      <JsonLd schema={courseSchema} />
      {lessons.length > 0 && <JsonLd schema={lessonListSchema} />}

      {/* ── Subject header ────────────────────────────────────────────── */}
      <section className="border-b border-school-line sc-ruled">
        <SchoolContainer className="pt-10 pb-12 lg:pt-12 lg:pb-16">
          <Breadcrumbs
            crumbs={[
              { label: "Bookkeeping School", href: schoolPaths.home },
              { label: "Subjects", href: schoolPaths.library },
              { label: subject.short },
            ]}
          />

          <div className="mt-6 flex items-start gap-6">
            <span className="hidden sm:block font-disp text-[86px] leading-[0.8] text-school-navy/25 shrink-0">
              {subject.code}
            </span>
            <div className="max-w-[720px]">
              <h1 className="font-cond font-bold text-[clamp(32px,5vw,54px)] leading-[1.02] uppercase tracking-[0.01em] text-school-ink">
                {subject.label}
              </h1>
              <p className="mt-3 font-serif italic text-[17px] leading-[1.6] text-school-navy">
                “{subject.question}”
              </p>
              <p className="mt-4 font-serif text-[17.5px] leading-[1.7] text-school-body">
                {subject.description}
              </p>
              <p className="mt-5 font-mono text-[10px] tracking-[0.18em] uppercase text-school-faint">
                {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"}
                {courses.length > 0 && ` · ${courses.length} course${courses.length === 1 ? "" : "s"}`}
              </p>
            </div>
          </div>
        </SchoolContainer>
      </section>

      {/* ── Courses in this subject ───────────────────────────────────── */}
      {courses.length > 0 && (
        <section className="border-b border-school-line bg-school-sand">
          <SchoolContainer className="py-8">
            <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-navy mb-4">
              Guided courses in this subject
            </p>
            <div className="flex flex-wrap gap-3">
              {courses.map((c) => (
                <Link
                  key={c.id}
                  href={schoolPaths.course(c.id)}
                  className="group inline-flex items-center gap-3 border border-school-line2 bg-school-raised px-4 py-3 hover:border-school-navy transition-colors duration-150"
                >
                  <span className="font-cond font-semibold text-[15.5px] text-school-ink group-hover:text-school-navy transition-colors duration-150">
                    {c.title}
                  </span>
                  <span className="font-mono text-[9.5px] tracking-[0.14em] uppercase text-school-faint">
                    {c.lessons.length} lessons →
                  </span>
                </Link>
              ))}
            </div>
          </SchoolContainer>
        </section>
      )}

      {/* ── Syllabus ──────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16">
        <SchoolContainer>
          {lessons.length === 0 ? (
            <div className="border border-dashed border-school-line2 bg-school-raised py-16 text-center">
              <p className="font-cond font-semibold text-[19px] text-school-ink">
                This subject is being written now.
              </p>
              <p className="mt-2 font-body text-[14.5px] text-school-muted max-w-[440px] mx-auto">
                The syllabus is set and the lessons are on the way. In the meantime,
                the rest of the School is open.
              </p>
              <Link
                href={schoolPaths.library}
                className="mt-6 inline-flex items-center gap-2 font-cond font-bold text-[13px] tracking-[0.08em] uppercase px-5 py-3 bg-school-navy text-school-paper hover:bg-school-navy2 transition-colors duration-150"
              >
                Browse the library →
              </Link>
            </div>
          ) : (
            byLevel.map(({ level, lessons: group }) => (
              <div key={level.key} className="mb-12 last:mb-0">
                <div className="flex items-baseline gap-4 pb-3 mb-6 border-b border-school-line">
                  <h2 className="font-cond font-bold text-[22px] uppercase tracking-[0.02em] text-school-ink">
                    {level.label}
                  </h2>
                  <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-school-faint">
                    {group.length} {group.length === 1 ? "lesson" : "lessons"}
                  </span>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {group.map((l) => (
                    <LessonCard key={l.slug} lesson={l} showSubject={false} />
                  ))}
                </div>
              </div>
            ))
          )}
        </SchoolContainer>
      </section>

      {/* ── Companion pointer, only where tax is genuinely adjacent ─────── */}
      {(subject.key === "payroll-taxes" || subject.key === "business-decisions") && (
        <section className="border-t border-school-line">
          <SchoolContainer className="py-10">
            <CompanionBand variant="slim" />
          </SchoolContainer>
        </section>
      )}

      {/* ── Other subjects ────────────────────────────────────────────── */}
      <section className="border-t border-school-line bg-school-sand">
        <SchoolContainer className="py-10">
          <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-navy mb-4">
            Other subjects
          </p>
          <div className="flex flex-wrap gap-2">
            {SUBJECTS.filter((s) => s.key !== subject.key).map((s) => (
              <Link
                key={s.key}
                href={schoolPaths.subject(s.key)}
                className="inline-flex items-center gap-2 border border-school-line2 bg-school-raised px-3 py-2 font-body text-[13.5px] text-school-body hover:border-school-navy hover:text-school-navy transition-colors duration-150"
              >
                <span className="font-mono text-[10px] text-school-faint">{s.code}</span>
                {s.label}
              </Link>
            ))}
          </div>
        </SchoolContainer>
      </section>
    </>
  );
}
