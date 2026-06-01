import type { Metadata } from "next";
import type { ItemList, WithContext } from "schema-dts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getPath, LEARNING_PATHS } from "@/lib/learning-paths";
import { getAllPosts } from "@/lib/field-notes";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Container from "@/components/Container";

interface Props {
  params: { id: string };
}

export function generateStaticParams() {
  return LEARNING_PATHS.map((p) => ({ id: p.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const path = getPath(params.id);
  if (!path) return { title: "Path Not Found | Cat3 Books" };
  const canonical = `${site.url}/learn/${path.id}`;
  return {
    title: `${path.title} | Field Notes · Cat3 Books`,
    description: path.promise,
    alternates: { canonical },
    openGraph: {
      title: path.title,
      description: path.promise,
      url: canonical,
      siteName: site.name,
      type: "website",
    },
  };
}

export default function LearningPathPage({ params }: Props) {
  const path = getPath(params.id);
  if (!path) notFound();

  const postMap = Object.fromEntries(getAllPosts().map((p) => [p.slug, p]));
  const steps = path.steps
    .map((s) => ({ ...s, post: postMap[s.slug] }))
    .filter((s) => s.post);

  const itemListSchema: WithContext<ItemList> = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: path.title,
    description: path.promise,
    numberOfItems: steps.length,
    itemListOrder: "https://schema.org/ItemListOrderAscending",
    itemListElement: steps.map((s, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      url: `${site.url}/field-notes/${s.slug}`,
      name: s.post!.title,
    })),
  };

  const firstSlug = steps[0]?.slug;

  return (
    <>
      <JsonLd schema={itemListSchema} />
      <SiteHeader />
      <main className="min-h-screen bg-c3-black text-c3-text">
        {/* Hero */}
        <section className="relative border-b border-c3-border hero-grid-bg py-16 xl:py-24 overflow-hidden">
          <Container>
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-c3-dim mb-10">
              <Link href="/" className="hover:text-c3-yellow transition-colors duration-200">Home</Link>
              <span>/</span>
              <Link href="/field-notes" className="hover:text-c3-yellow transition-colors duration-200">Field Notes</Link>
              <span>/</span>
              <span className="text-c3-mid">Free Course</span>
            </nav>

            <div className="max-w-[820px]">
              <div className="inline-flex items-center gap-3 font-mono text-[10px] tracking-[0.28em] uppercase text-c3-yellow mb-5">
                <span className="w-7 h-px bg-c3-yellow" />
                {path.eyebrow}
              </div>
              <h1 className="font-disp text-[clamp(40px,6vw,80px)] leading-[0.92] tracking-[0.025em]">
                {path.title}
                <span className="text-c3-yellow">.</span>
              </h1>
              <p className="font-cond font-light text-[clamp(17px,2.2vw,22px)] text-c3-mid mt-6 leading-[1.5] max-w-[680px]">
                {path.promise}
              </p>
              {firstSlug && (
                <Link
                  href={`/field-notes/${firstSlug}`}
                  className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] bg-c3-yellow text-[#111] hover:bg-[#FFD000] hover:-translate-y-0.5 hover:shadow-[0_10px_32px_rgba(240,190,0,0.15)] transition-all duration-[220ms] mt-8"
                >
                  Start here →
                </Link>
              )}
            </div>
          </Container>
        </section>

        {/* Steps */}
        <section className="py-14 xl:py-[88px]">
          <Container>
            <div className="max-w-[860px] mx-auto flex flex-col gap-[2px] bg-c3-border">
              {steps.map((s, i) => (
                <Link
                  key={s.slug}
                  href={`/field-notes/${s.slug}`}
                  className="group bg-c3-card hover:bg-[rgba(255,255,255,0.02)] transition-colors duration-200 grid grid-cols-[64px_1fr] sm:grid-cols-[88px_1fr] gap-4 sm:gap-7 p-6 sm:p-8 items-start"
                >
                  <div className="font-disp text-[clamp(40px,6vw,64px)] leading-[0.85] text-c3-yellow tracking-[0.02em]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mb-2">
                      {i === 0 ? "Lesson 1 · Start here" : `Lesson ${i + 1}`}
                      {" · "}
                      {s.post!.categoryLabel}
                      {" · "}
                      {s.post!.readTime}
                    </div>
                    <h2 className="font-cond font-bold text-[clamp(19px,2.6vw,25px)] leading-[1.12] tracking-[0.01em] text-c3-text group-hover:text-c3-yellow transition-colors duration-200">
                      {s.post!.title}
                    </h2>
                    <p className="font-body font-light text-[14px] text-c3-mid leading-[1.7] mt-3 max-w-[620px]">
                      {s.hook}
                    </p>
                    <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.16em] uppercase text-c3-yellow mt-4 group-hover:translate-x-0.5 transition-transform duration-200">
                      {i === 0 ? "Begin →" : "Read this lesson →"}
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {/* Completion CTA */}
            <div className="max-w-[860px] mx-auto mt-10 border border-c3-yellow bg-[rgba(240,190,0,0.04)] px-7 py-7 text-center">
              <p className="font-disp text-[clamp(22px,3vw,32px)] leading-[1.05] tracking-[0.02em] text-c3-text mb-3">
                Rather we just find it for you?
              </p>
              <p className="font-body font-light text-[14.5px] text-c3-mid leading-[1.7] max-w-[620px] mx-auto mb-6">
                Book a free 30-minute Books Audit. We&rsquo;ll run this exact course on your
                real numbers and name three specific leaks before you decide anything.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 font-cond font-bold text-[14px] tracking-[0.10em] uppercase px-[22px] py-[14px] bg-c3-yellow text-[#111] hover:bg-[#FFD000] hover:-translate-y-0.5 transition-all duration-[220ms]"
              >
                Free Books Audit →
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
