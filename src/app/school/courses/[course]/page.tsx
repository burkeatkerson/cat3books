import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Course, WithContext } from "schema-dts";
import JsonLd from "@/components/JsonLd";
import SchoolContainer from "@/components/school/SchoolContainer";
import Breadcrumbs from "@/components/school/Breadcrumbs";
import { LevelBadge } from "@/components/school/Badges";
import { COURSES } from "@/lib/school/courses";
import { getCourse } from "@/lib/school/lessons";
import { SUBJECT_BY_KEY, schoolPaths } from "@/lib/school/taxonomy";
import { schoolSite } from "@/lib/school/site";
import { site } from "@/lib/site";

interface Props {
  params: { course: string };
}

export function generateStaticParams() {
  return COURSES.map((c) => ({ course: c.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const course = getCourse(params.course);
  if (!course) return { title: "Course not found" };
  const url = `${site.url}${schoolPaths.course(course.id)}`;
  return {
    title: course.title,
    description: course.summary,
    alternates: { canonical: url },
    openGraph: {
      title: `${course.title} | ${schoolSite.name}`,
      description: course.summary,
      url,
      siteName: schoolSite.name,
      type: "website",
    },
  };
}

export default function CoursePage({ params }: Props) {
  const course = getCourse(params.course);
  if (!course) notFound();

  const subject = SUBJECT_BY_KEY[course.subject];
  const url = `${site.url}${schoolPaths.course(course.id)}`;

  const courseSchema: WithContext<Course> = {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name: course.title,
    description: course.promise,
    url,
    provider: { "@id": `${site.url}/school#school` },
    isAccessibleForFree: true,
    inLanguage: "en-US",
    educationalLevel: course.level,
    teaches: course.outcomes,
    numberOfCredits: course.lessons.length,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${Math.max(1, course.totalMinutes)}M`,
    },
    syllabusSections: course.lessons.map((l, i) => ({
      "@type": "Syllabus" as const,
      position: i + 1,
      name: l.meta.title,
      description: l.meta.excerpt,
      url: `${site.url}${schoolPaths.lesson(l.meta.slug)}`,
    })),
  };

  const first = course.lessons[0];

  return (
    <>
      <JsonLd schema={courseSchema} />

      {/* ── Header ────────────────────────────────────────────────────── */}
      <section className="border-b border-school-line sc-ruled">
        <SchoolContainer className="pt-10 pb-12 lg:pt-12 lg:pb-16">
          <Breadcrumbs
            crumbs={[
              { label: "Bookkeeping School", href: schoolPaths.home },
              { label: "Courses", href: schoolPaths.courses },
              { label: course.title },
            ]}
          />

          <div className="mt-6 max-w-[760px]">
            <div className="flex items-center gap-2 flex-wrap mb-4">
              <span className="inline-flex items-center border border-school-sun/50 bg-school-sun/[0.14] px-2 py-1 font-mono text-[9.5px] tracking-[0.18em] uppercase text-[#8a6d00]">
                {course.eyebrow}
              </span>
              <LevelBadge level={course.level} />
            </div>

            <h1 className="font-cond font-bold text-[clamp(32px,5vw,56px)] leading-[1.02] uppercase tracking-[0.01em] text-school-ink">
              {course.title}
            </h1>

            <p className="mt-5 font-serif text-[18.5px] leading-[1.7] text-school-body">
              {course.promise}
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              {first && (
                <Link
                  href={schoolPaths.lesson(first.meta.slug)}
                  className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.08em] uppercase px-6 py-4 bg-school-navy text-school-paper hover:bg-school-navy2 transition-colors duration-150"
                >
                  Start lesson 1 →
                </Link>
              )}
              {subject && (
                <Link
                  href={schoolPaths.subject(subject.key)}
                  className="font-mono text-[10px] tracking-[0.16em] uppercase text-school-muted hover:text-school-navy transition-colors duration-150"
                >
                  More in {subject.label} →
                </Link>
              )}
            </div>

            <p className="mt-5 font-mono text-[10px] tracking-[0.18em] uppercase text-school-faint">
              {course.lessons.length} lessons
              {course.totalMinutes > 0 && ` · about ${course.totalMinutes} minutes total`}
            </p>
          </div>
        </SchoolContainer>
      </section>

      {/* ── Outcomes ──────────────────────────────────────────────────── */}
      <section className="border-b border-school-line bg-school-raised">
        <SchoolContainer className="py-10">
          <h2 className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-navy mb-4">
            By the end you can
          </h2>
          <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
            {course.outcomes.map((o) => (
              <li key={o} className="flex items-start gap-3">
                <span className="mt-[7px] w-[7px] h-[7px] shrink-0 bg-school-sun border border-[#c79c00]" aria-hidden="true" />
                <span className="font-body text-[15.5px] leading-[1.6] text-school-body">{o}</span>
              </li>
            ))}
          </ul>
        </SchoolContainer>
      </section>

      {/* ── Syllabus ──────────────────────────────────────────────────── */}
      <section className="py-12 lg:py-16">
        <SchoolContainer>
          <h2 className="font-cond font-bold text-[clamp(26px,3.5vw,36px)] uppercase tracking-[0.015em] text-school-ink mb-8">
            The syllabus.
          </h2>

          <ol className="border-t border-school-line">
            {course.lessons.map((l, i) => (
              <li key={l.meta.slug} className="border-b border-school-line">
                <Link href={schoolPaths.lesson(l.meta.slug)} className="group flex gap-5 py-6">
                  <span className="shrink-0 flex items-start">
                    <span className="flex items-center justify-center w-10 h-10 border border-school-line2 bg-school-raised font-cond font-bold text-[17px] text-school-navy group-hover:bg-school-navy group-hover:text-school-paper group-hover:border-school-navy transition-colors duration-200">
                      {i + 1}
                    </span>
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-cond font-semibold text-[20px] leading-[1.2] text-school-ink group-hover:text-school-navy transition-colors duration-150">
                      {l.meta.title}
                    </h3>
                    <p className="mt-2 font-serif text-[16px] leading-[1.65] text-school-muted max-w-[720px]">
                      {l.hook}
                    </p>
                    <p className="mt-2.5 font-mono text-[9.5px] tracking-[0.16em] uppercase text-school-faint">
                      {l.meta.readTime} read
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ol>

          {course.pending.length > 0 && (
            <p className="mt-6 font-mono text-[10px] tracking-[0.16em] uppercase text-school-faint">
              + {course.pending.length} more {course.pending.length === 1 ? "lesson" : "lessons"} in
              this course being written now
            </p>
          )}
        </SchoolContainer>
      </section>
    </>
  );
}
