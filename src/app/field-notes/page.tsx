import type { Metadata } from "next";
import { getAllPosts } from "@/lib/field-notes";
import { site } from "@/lib/site";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import BlogHero from "@/components/field-notes/BlogHero";
import FilteredPostSection from "@/components/field-notes/FilteredPostSection";
import EditorialSection from "@/components/field-notes/EditorialSection";
import SoftwareScorecard from "@/components/field-notes/SoftwareScorecard";
import NewsletterSection from "@/components/field-notes/NewsletterSection";

export const metadata: Metadata = {
  title: "Field Notes | Cat3 Books",
  description:
    "Practical writing on restoration bookkeeping, job costing, supplement recovery, and the financial mechanics of running a profitable restoration company.",
  alternates: { canonical: `${site.url}/field-notes` },
  openGraph: {
    title: "Field Notes | Cat3 Books",
    description:
      "Practical writing on restoration bookkeeping, job costing, supplement recovery, and the financial mechanics of running a profitable restoration company.",
    url: `${site.url}/field-notes`,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Field Notes | Cat3 Books",
    description:
      "Practical writing on restoration bookkeeping, job costing, supplement recovery, and the financial mechanics of running a profitable restoration company.",
  },
};

export default function FieldNotesPage() {
  const posts = getAllPosts();
  const featured = posts.find((p) => p.featured);
  const gridPosts = posts.filter((p) => !p.featured);

  return (
    <>
      <SiteHeader />
      <main id="top" className="bg-c3-black text-c3-text min-h-screen">
        <BlogHero />
        <FilteredPostSection featured={featured} gridPosts={gridPosts} />
        <EditorialSection posts={posts} />
        <SoftwareScorecard />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </>
  );
}
