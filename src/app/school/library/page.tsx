import type { Metadata } from "next";
import SchoolContainer from "@/components/school/SchoolContainer";
import Breadcrumbs from "@/components/school/Breadcrumbs";
import LibraryBrowser from "@/components/school/LibraryBrowser";
import { buildSearchIndex, getLessonCount } from "@/lib/school/lessons";
import {
  LESSON_TYPE_BY_KEY,
  LEVEL_BY_KEY,
  SUBJECT_BY_KEY,
  schoolPaths,
} from "@/lib/school/taxonomy";
import { schoolSite } from "@/lib/school/site";

export const metadata: Metadata = {
  title: "All Lessons",
  description:
    "Search every lesson in the Small Business Bookkeeping School — filter by subject, level and format to find the answer to the exact problem in front of you.",
  alternates: { canonical: `${schoolSite.url}/library` },
};

/** The facets arrive as query params so a filtered library view is linkable. */
interface Props {
  searchParams: { q?: string; subject?: string; level?: string; type?: string };
}

export default function LibraryPage({ searchParams }: Props) {
  const records = buildSearchIndex();
  const total = getLessonCount();

  // Ignore unknown facet values rather than rendering an empty, confusing page.
  const initial = {
    q: searchParams.q,
    subject: searchParams.subject && SUBJECT_BY_KEY[searchParams.subject] ? searchParams.subject : undefined,
    level: searchParams.level && LEVEL_BY_KEY[searchParams.level] ? searchParams.level : undefined,
    type: searchParams.type && LESSON_TYPE_BY_KEY[searchParams.type] ? searchParams.type : undefined,
  };

  return (
    <>
      <section className="border-b border-school-line sc-grid">
        <SchoolContainer className="pt-10 pb-10 lg:pt-12 lg:pb-12">
          <Breadcrumbs
            crumbs={[
              { label: "Bookkeeping School", href: schoolPaths.home },
              { label: "All Lessons" },
            ]}
          />
          <h1 className="mt-5 font-cond font-bold text-[clamp(32px,5vw,52px)] leading-[1.03] uppercase tracking-[0.01em] text-school-ink">
            The library.
          </h1>
          <p className="mt-3 font-serif text-[17.5px] leading-[1.68] text-school-body max-w-[620px]">
            All {total} lessons in one place. Search the symptom, the term, or the
            question — then narrow by subject, level or format.
          </p>
        </SchoolContainer>
      </section>

      <section className="py-10 lg:py-14">
        <SchoolContainer>
          <LibraryBrowser records={records} initial={initial} />
        </SchoolContainer>
      </section>
    </>
  );
}
