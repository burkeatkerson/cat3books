import type { Metadata } from "next";
import type { EducationalOrganization, WithContext } from "schema-dts";
import JsonLd from "@/components/JsonLd";
import SchoolHeader from "@/components/school/SchoolHeader";
import SchoolFooter from "@/components/school/SchoolFooter";
import { site } from "@/lib/site";
import { schoolSite } from "@/lib/school/site";

/**
 * The School's shell. `.school-root` flips the light "paper" mode in globals.css
 * — the root <body> is locked to the dark marketing palette, so this class is
 * what repaints the page background, grain and selection colour for the whole
 * section without touching the rest of the site.
 */
export const metadata: Metadata = {
  title: {
    template: `%s | ${schoolSite.name}`,
    default: schoolSite.name,
  },
  description: schoolSite.description,
};

// `audience` and `teaches` are valid on EducationalOrganization in schema.org
// but are not modelled on the leaf type in schema-dts, hence the cast.
const schoolSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  "@id": `${site.url}/school#school`,
  name: schoolSite.name,
  alternateName: "Cat3 Books Bookkeeping School",
  url: `${site.url}/school`,
  description: schoolSite.description,
  parentOrganization: { "@id": `${site.url}/#organization` },
  audience: {
    "@type": "EducationalAudience",
    educationalRole: "student",
    audienceType: "Small business owners and self-taught bookkeepers",
  },
  teaches: [
    "double-entry bookkeeping",
    "chart of accounts design",
    "cash vs. accrual accounting",
    "QuickBooks Online",
    "bank reconciliation",
    "reading a profit and loss statement",
    "reading a balance sheet",
    "cash flow management",
    "accounts receivable and collections",
    "payroll and 1099 basics",
    "sales tax",
    "month-end close",
  ],
} as unknown as WithContext<EducationalOrganization>;

export default function SchoolLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="school-root min-h-screen bg-school-paper text-school-ink font-body antialiased">
      <JsonLd schema={schoolSchema} />
      <SchoolHeader />
      <main>{children}</main>
      <SchoolFooter />
    </div>
  );
}
