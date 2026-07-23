import Link from "next/link";
import type { BreadcrumbList, WithContext } from "schema-dts";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

export interface Crumb {
  label: string;
  /** Omit on the final (current) crumb. */
  href?: string;
}

/**
 * Renders the visible trail and the matching BreadcrumbList JSON-LD from one
 * source, so the two can never disagree — important at School scale, where
 * every lesson is three levels deep.
 */
export default function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const schema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem" as const,
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${site.url}${c.href}` } : {}),
    })),
  };

  return (
    <>
      <JsonLd schema={schema} />
      <nav
        aria-label="Breadcrumb"
        className="flex items-center gap-2 flex-wrap font-mono text-[10px] tracking-[0.16em] uppercase text-school-faint"
      >
        {crumbs.map((c, i) => (
          <span key={`${c.label}-${i}`} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden="true">/</span>}
            {c.href ? (
              <Link href={c.href} className="hover:text-school-navy transition-colors duration-150">
                {c.label}
              </Link>
            ) : (
              <span className="text-school-muted truncate max-w-[280px]">{c.label}</span>
            )}
          </span>
        ))}
      </nav>
    </>
  );
}
