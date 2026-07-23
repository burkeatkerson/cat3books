import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import type { FAQPage, HowTo, LearningResource, WebPage, WithContext } from "schema-dts";
import JsonLd from "@/components/JsonLd";
import SchoolContainer from "@/components/school/SchoolContainer";
import Breadcrumbs from "@/components/school/Breadcrumbs";
import LessonCard from "@/components/school/LessonCard";
import { LevelBadge, TypeBadge } from "@/components/school/Badges";
import { CourseBanner, CourseFooterNav } from "@/components/school/CourseNav";
import { schoolMdxComponents } from "@/components/school/mdx";
import {
  courseContextFor,
  getAllLessonSlugs,
  getLesson,
  getLessonMetas,
  relatedLessons,
} from "@/lib/school/lessons";
import { SUBJECT_BY_KEY, schoolPaths } from "@/lib/school/taxonomy";
import { schoolSite } from "@/lib/school/site";
import { site } from "@/lib/site";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllLessonSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const lesson = getLesson(params.slug);
  if (!lesson) return { title: "Lesson not found" };

  const url = `${site.url}${schoolPaths.lesson(lesson.slug)}`;
  return {
    title: lesson.title,
    description: lesson.excerpt,
    alternates: { canonical: url },
    keywords: lesson.keywords,
    openGraph: {
      title: lesson.title,
      description: lesson.excerpt,
      url,
      siteName: schoolSite.name,
      type: "article",
      publishedTime: new Date(lesson.date).toISOString(),
      modifiedTime: new Date(lesson.updatedDate ?? lesson.date).toISOString(),
      tags: lesson.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: lesson.title,
      description: lesson.excerpt,
    },
  };
}

export default function LessonPage({ params }: Props) {
  const lesson = getLesson(params.slug);
  if (!lesson) notFound();

  const subject = SUBJECT_BY_KEY[lesson.subject];
  const url = `${site.url}${schoolPaths.lesson(lesson.slug)}`;
  const datePublished = new Date(lesson.date).toISOString();
  const dateModified = new Date(lesson.updatedDate ?? lesson.date).toISOString();

  const prerequisites = getLessonMetas(lesson.prerequisites ?? []);
  const related = relatedLessons(lesson.slug, 3);
  // A lesson can sit in several courses; the first is the one we frame it with.
  const [courseContext] = courseContextFor(lesson.slug);

  /**
   * LearningResource rather than BlogPosting — this is the schema that tells
   * search and AI engines the School is instructional material, and it is what
   * makes individual lessons eligible to be cited as answers.
   */
  const learningResourceSchema: WithContext<LearningResource> = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    "@id": `${url}#lesson`,
    name: lesson.title,
    headline: lesson.title,
    description: lesson.excerpt,
    url,
    datePublished,
    dateModified,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    learningResourceType: lesson.type,
    educationalLevel: lesson.level,
    educationalUse: "self-study",
    about: subject?.label ?? lesson.subject,
    keywords: (lesson.keywords ?? lesson.tags).join(", "),
    teaches: lesson.question ?? lesson.excerpt,
    author: { "@id": `${site.url}/#organization` },
    publisher: { "@id": `${site.url}/#organization` },
    provider: { "@id": `${site.url}/school#school` },
    isPartOf: { "@id": `${site.url}/school#school` },
    audience: {
      "@type": "EducationalAudience",
      educationalRole: "student",
      audienceType: "Small business owners",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".speakable-answer"],
      } as WebPage["speakable"],
    },
    ...(prerequisites.length > 0 && {
      coursePrerequisites: prerequisites.map((p) => p.title),
    }),
  };

  const howToSchema: WithContext<HowTo> | null =
    lesson.steps && lesson.steps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: lesson.title,
          description: lesson.excerpt,
          step: lesson.steps.map((s, i) => ({
            "@type": "HowToStep" as const,
            position: i + 1,
            name: s.name,
            text: s.text,
            ...(s.url && { url: `${url}${s.url.startsWith("#") ? "" : "#"}${s.url}` }),
          })),
        }
      : null;

  const faqSchema: WithContext<FAQPage> | null =
    lesson.faqItems && lesson.faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: lesson.faqItems.map(({ question, answer }) => ({
            "@type": "Question" as const,
            name: question,
            acceptedAnswer: { "@type": "Answer" as const, text: answer },
          })),
        }
      : null;

  return (
    <>
      <JsonLd schema={learningResourceSchema} />
      {howToSchema && <JsonLd schema={howToSchema} />}
      {faqSchema && <JsonLd schema={faqSchema} />}

      <article>
        {/* ── Lesson header ───────────────────────────────────────────── */}
        <header className="border-b border-school-line bg-school-raised">
          <SchoolContainer width="reading" className="pt-8 pb-10 lg:pt-10 lg:pb-12">
            <Breadcrumbs
              crumbs={[
                { label: "School", href: schoolPaths.home },
                ...(subject
                  ? [{ label: subject.short, href: schoolPaths.subject(subject.key) }]
                  : []),
                { label: lesson.title },
              ]}
            />

            <div className="mt-6 flex items-center gap-2 flex-wrap">
              <TypeBadge type={lesson.type} />
              <LevelBadge level={lesson.level} />
              <span className="font-mono text-[9.5px] tracking-[0.16em] uppercase text-school-faint">
                {lesson.readTime} read
              </span>
            </div>

            <h1 className="mt-4 font-cond font-bold text-[clamp(30px,4.6vw,48px)] leading-[1.06] tracking-[0.005em] text-school-ink">
              {lesson.title}
            </h1>

            <p className="mt-4 font-serif text-[19px] leading-[1.65] text-school-body">
              {lesson.excerpt}
            </p>

            {prerequisites.length > 0 && (
              <div className="mt-7 border-l-2 border-school-line2 pl-4">
                <p className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-faint mb-1.5">
                  Read first
                </p>
                <div className="flex flex-col gap-1">
                  {prerequisites.map((p) => (
                    <Link
                      key={p.slug}
                      href={schoolPaths.lesson(p.slug)}
                      className="font-body text-[14px] text-school-navy hover:text-school-navy2 transition-colors duration-150"
                    >
                      {p.title} →
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </SchoolContainer>
        </header>

        {/* ── Body ────────────────────────────────────────────────────── */}
        <SchoolContainer width="reading" className="py-10 lg:py-14">
          {courseContext && (
            <CourseBanner course={courseContext.course} index={courseContext.index} />
          )}

          <div className="prose-school">
            {/* blockJS: false permits JSX attribute expressions (items={[…]} on
                Checklist, JournalEntry, Contents) while the dangerous-calls
                plugin still blocks eval/process/require. Lessons are authored
                content in git, never user input. */}
            <MDXRemote
              source={lesson.content}
              components={schoolMdxComponents}
              options={{ blockJS: false }}
            />
          </div>

          {/* FAQ — rendered from frontmatter so the visible copy and the
              FAQPage schema can never drift apart. */}
          {lesson.faqItems && lesson.faqItems.length > 0 && (
            <section className="mt-14 pt-8 border-t border-school-line">
              <h2 className="font-cond font-bold text-[24px] uppercase tracking-[0.02em] text-school-ink mb-6">
                Common questions
              </h2>
              <dl className="flex flex-col gap-6">
                {lesson.faqItems.map((f) => (
                  <div key={f.question}>
                    <dt className="font-cond font-semibold text-[17.5px] leading-[1.3] text-school-ink">
                      {f.question}
                    </dt>
                    <dd className="mt-1.5 font-serif text-[16.5px] leading-[1.7] text-school-body">
                      {f.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {courseContext && (
            <CourseFooterNav course={courseContext.course} index={courseContext.index} />
          )}

          {/* Tags */}
          {lesson.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-school-line flex flex-wrap items-center gap-2">
              <span className="font-mono text-[9.5px] tracking-[0.2em] uppercase text-school-faint mr-1">
                Filed under
              </span>
              {lesson.tags.map((tag) => (
                <Link
                  key={tag}
                  href={schoolPaths.filtered({ q: tag })}
                  className="border border-school-line2 bg-school-raised px-2.5 py-1 font-body text-[12.5px] text-school-muted hover:border-school-navy hover:text-school-navy transition-colors duration-150"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </SchoolContainer>
      </article>

      {/* ── Keep going ──────────────────────────────────────────────── */}
      {related.length > 0 && (
        <section className="border-t border-school-line bg-school-sand">
          <SchoolContainer className="py-12 lg:py-16">
            <div className="flex items-end justify-between gap-6 flex-wrap mb-7">
              <h2 className="font-cond font-bold text-[clamp(24px,3vw,32px)] uppercase tracking-[0.02em] text-school-ink">
                Keep going.
              </h2>
              {subject && (
                <Link
                  href={schoolPaths.subject(subject.key)}
                  className="font-mono text-[10px] tracking-[0.16em] uppercase text-school-navy hover:text-school-navy2 transition-colors duration-150"
                >
                  All {subject.label} lessons →
                </Link>
              )}
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              {related.map((l) => (
                <LessonCard key={l.slug} lesson={l} />
              ))}
            </div>
          </SchoolContainer>
        </section>
      )}
    </>
  );
}
