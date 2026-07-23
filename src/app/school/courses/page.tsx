import type { Metadata } from "next";
import SchoolContainer from "@/components/school/SchoolContainer";
import Breadcrumbs from "@/components/school/Breadcrumbs";
import CourseCard from "@/components/school/CourseCard";
import { getCourses } from "@/lib/school/lessons";
import { schoolPaths } from "@/lib/school/taxonomy";
import { schoolSite } from "@/lib/school/site";

export const metadata: Metadata = {
  title: "Free Courses",
  description:
    "Guided, ordered courses from the Small Business Bookkeeping School — bookkeeping from scratch, QuickBooks setup, and reading your own financial statements.",
  alternates: { canonical: `${schoolSite.url}/courses` },
};

export default function CoursesPage() {
  const courses = getCourses();

  return (
    <>
      <section className="border-b border-school-line sc-dots">
        <SchoolContainer className="pt-10 pb-12 lg:pt-12 lg:pb-16">
          <Breadcrumbs
            crumbs={[
              { label: "Bookkeeping School", href: schoolPaths.home },
              { label: "Courses" },
            ]}
          />
          <h1 className="mt-5 font-cond font-bold text-[clamp(32px,5vw,52px)] leading-[1.03] uppercase tracking-[0.01em] text-school-ink">
            Guided courses.
          </h1>
          <p className="mt-3 font-serif text-[17.5px] leading-[1.7] text-school-body max-w-[640px]">
            Individual lessons answer a question. A course builds an ability. Each one
            below is an ordered sequence with a clear finish line — free, no signup,
            work through it at whatever pace the business allows.
          </p>
        </SchoolContainer>
      </section>

      <section className="py-12 lg:py-16">
        <SchoolContainer>
          {courses.length === 0 ? (
            <p className="font-serif text-[17px] text-school-muted">
              The first courses are being assembled now.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {courses.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
        </SchoolContainer>
      </section>
    </>
  );
}
