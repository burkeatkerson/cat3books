import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Container from "@/components/Container";
import { legal, otherLegalPages } from "@/lib/legal";

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Shared chrome for the three legal pages. Renders the marketing header/footer,
 * a compact hero with the effective date, an optional sticky table of contents,
 * the long-form prose (styled by `.prose-legal`), and cross-links to the other
 * legal pages. Keeping this in one component means every legal page has an
 * identical, predictable structure — which is exactly what a reader (or an
 * auditor, or an app-store reviewer) expects.
 */
export default function LegalShell({
  slug,
  title,
  intro,
  toc,
  children,
}: {
  slug: string;
  title: string;
  /** One or two sentences shown under the title. */
  intro: string;
  toc?: TocItem[];
  children: React.ReactNode;
}) {
  const others = otherLegalPages(slug);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-c3-black text-c3-text">
        {/* Hero */}
        <section className="border-b border-c3-border">
          <Container className="py-14 xl:py-20">
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-c3-dim mb-8"
            >
              <Link href="/" className="hover:text-c3-yellow transition-colors duration-200">
                Home
              </Link>
              <span>/</span>
              <span className="text-c3-mid">Legal</span>
              <span>/</span>
              <span className="text-c3-mid">{title}</span>
            </nav>

            <div className="font-mono text-[10px] tracking-[0.24em] uppercase text-c3-yellow mb-4">
              Legal
            </div>
            <h1 className="font-disp text-[clamp(40px,6vw,76px)] leading-[0.95] tracking-[0.025em]">
              {title}
            </h1>
            <p className="mt-5 font-body font-light text-[17px] leading-[1.7] text-c3-mid max-w-[680px]">
              {intro}
            </p>
            <p className="mt-6 font-mono text-[10px] tracking-[0.18em] uppercase text-c3-dim">
              Effective{" "}
              <time dateTime={legal.effectiveDateISO} className="text-c3-mid">
                {legal.effectiveDate}
              </time>
              {" · "}
              {legal.brand}
            </p>
          </Container>
        </section>

        {/* Body */}
        <Container className="py-14 xl:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-10 xl:gap-16">
            {/* Table of contents */}
            {toc && toc.length > 0 && (
              <aside className="lg:sticky lg:top-[92px] lg:self-start">
                <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-c3-dim mb-4">
                  On this page
                </div>
                <nav aria-label="Table of contents">
                  <ol className="flex flex-col gap-2.5">
                    {toc.map((item, i) => (
                      <li key={item.id} className="flex items-baseline gap-3">
                        <span className="font-mono text-[10px] text-c3-dim tabular-nums shrink-0">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <a
                          href={`#${item.id}`}
                          className="font-body text-[13.5px] leading-[1.5] text-c3-mid hover:text-c3-yellow transition-colors duration-200"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </nav>
              </aside>
            )}

            {/* Prose */}
            <article className="prose-legal max-w-[820px]">{children}</article>
          </div>

          {/* Cross-links */}
          <div className="mt-16 pt-10 border-t border-c3-border">
            <div className="font-mono text-[10px] tracking-[0.22em] uppercase text-c3-dim mb-5">
              More legal
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[2px] bg-c3-border">
              {others.map((p) => (
                <Link
                  key={p.slug}
                  href={`/${p.slug}`}
                  className="group bg-c3-card hover:bg-c3-card2 transition-colors duration-200 p-5"
                >
                  <div className="font-cond font-bold text-[17px] uppercase tracking-[0.02em] text-c3-text group-hover:text-c3-yellow transition-colors duration-200">
                    {p.title}
                  </div>
                  <p className="mt-1.5 font-body text-[13px] leading-[1.6] text-c3-mid">
                    {p.blurb}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}

/** A titled, anchored section within a legal document. */
export function LegalSection({
  id,
  n,
  title,
  children,
}: {
  id: string;
  n: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 mb-12 last:mb-0">
      <h2 className="font-cond font-bold text-[clamp(22px,2.4vw,28px)] uppercase tracking-[0.02em] text-c3-text mb-4 flex items-baseline gap-3">
        <span className="font-mono text-[13px] text-c3-yellow tabular-nums">
          {String(n).padStart(2, "0")}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}
