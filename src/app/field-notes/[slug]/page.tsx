import type { Metadata } from "next";
import type { BlogPosting, BreadcrumbList, Dataset, FAQPage, HowTo, Organization, ScholarlyArticle, Thing, WebPage, WithContext } from "schema-dts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPost } from "@/lib/field-notes";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Container from "@/components/Container";
import AnswerBlock from "@/components/field-notes/AnswerBlock";
import BlogImage from "@/components/field-notes/BlogImage";
import Citation from "@/components/field-notes/Citation";
import Claim from "@/components/field-notes/Claim";
import DecisionMatrix from "@/components/field-notes/DecisionMatrix";
import DefinedTerm from "@/components/field-notes/DefinedTerm";
import GlossaryNav from "@/components/field-notes/GlossaryNav";
import MidPostCTA from "@/components/field-notes/MidPostCTA";
import QuickAnswer from "@/components/field-notes/QuickAnswer";
import ReviewBlock from "@/components/field-notes/ReviewBlock";
import Stat from "@/components/field-notes/Stat";
import TableOfContents from "@/components/field-notes/TableOfContents";

/** MDX component map — available in every Field Notes post */
const mdxComponents = {
  AnswerBlock,
  BlogImage,
  Citation,
  Claim,
  DecisionMatrix,
  DefinedTerm,
  GlossaryNav,
  MidPostCTA,
  QuickAnswer,
  ReviewBlock,
  Stat,
  TableOfContents,
};

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const post = getPost(params.slug);
    const canonical = `${site.url}/field-notes/${post.slug}`;
    const modifiedTime = new Date(post.updatedDate ?? post.date).toISOString();
    return {
      title: `${post.title} | Field Notes · Cat3 Books`,
      description: post.excerpt,
      alternates: { canonical },
      keywords: post.keywords,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: canonical,
        siteName: site.name,
        type: "article",
        publishedTime: new Date(post.date).toISOString(),
        modifiedTime,
        authors: [post.author ?? site.name],
        tags: post.tags,
      },
      twitter: {
        card: "summary_large_image",
        title: post.title,
        description: post.excerpt,
      },
    };
  } catch {
    return { title: "Post Not Found | Cat3 Books" };
  }
}

export default function FieldNotePost({ params }: Props) {
  let post;
  try {
    post = getPost(params.slug);
  } catch {
    notFound();
  }

  const postUrl = `${site.url}/field-notes/${post.slug}`;
  const datePublished = new Date(post.date).toISOString();
  const dateModified = new Date(post.updatedDate ?? post.date).toISOString();

  // ── BlogPosting ──────────────────────────────────────────────────────────
  const blogPostingSchema: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": postUrl,
    headline: post.title,
    description: post.excerpt,
    datePublished,
    dateModified,
    author: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: post.author ?? site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${site.url}/#organization`,
      name: site.name,
      url: site.url,
    } as Organization,
    url: postUrl,
    keywords: post.keywords?.join(", ") ?? post.tags.join(", "),
    articleSection: post.categoryLabel,
    isPartOf: { "@id": `${site.url}/field-notes#blog` } as BlogPosting,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": postUrl,
      // Speakable: point at the .speakable-answer element so AI engines can
      // identify the canonical citable answer for this post.
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".speakable-answer"],
      } as WebPage["speakable"],
    },
  };

  // ── BreadcrumbList ───────────────────────────────────────────────────────
  const breadcrumbSchema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: site.url },
      { "@type": "ListItem", position: 2, name: "Field Notes", item: `${site.url}/field-notes` },
      { "@type": "ListItem", position: 3, name: post.title, item: postUrl },
    ],
  };

  // ── HowTo (decision criteria as steps) ──────────────────────────────────
  const howToSchema: WithContext<HowTo> | null =
    post.howToSteps && post.howToSteps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: post.title,
          description: post.excerpt,
          step: post.howToSteps.map((s, i) => ({
            "@type": "HowToStep" as const,
            position: i + 1,
            name: s.name,
            text: s.text,
          })),
        }
      : null;

  // ── FAQPage ──────────────────────────────────────────────────────────────
  const faqSchema: WithContext<FAQPage> | null =
    post.faqItems && post.faqItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: post.faqItems.map(({ question, answer }) => ({
            "@type": "Question" as const,
            name: question,
            acceptedAnswer: {
              "@type": "Answer" as const,
              text: answer,
            },
          })),
        }
      : null;

  // ── Dataset (industry-report posts only) ─────────────────────────────────
  const datasetSchema: WithContext<Dataset> | null =
    post.dataset
      ? {
          "@context": "https://schema.org",
          "@type": "Dataset",
          name: post.dataset.name,
          description: post.dataset.description,
          url: postUrl,
          creator: {
            "@type": "Organization",
            "@id": `${site.url}/#organization`,
            name: site.name,
            url: site.url,
          } as Organization,
          datePublished,
          dateModified,
          keywords: post.keywords?.join(", ") ?? post.tags.join(", "),
          ...(post.dataset.license && { license: post.dataset.license }),
          ...(post.dataset.spatialCoverage && { spatialCoverage: post.dataset.spatialCoverage }),
          ...(post.dataset.temporalCoverage && { temporalCoverage: post.dataset.temporalCoverage }),
          ...(post.dataset.variableMeasured && {
            variableMeasured: post.dataset.variableMeasured.map((v) => ({
              "@type": "PropertyValue" as const,
              name: v,
            })),
          }),
        }
      : null;

  // ── ScholarlyArticle (industry-report posts only) ────────────────────────
  const scholarlySchema: WithContext<ScholarlyArticle> | null =
    post.dataset
      ? {
          "@context": "https://schema.org",
          "@type": "ScholarlyArticle",
          "@id": `${postUrl}#article`,
          headline: post.title,
          description: post.excerpt,
          datePublished,
          dateModified,
          author: {
            "@type": "Organization",
            "@id": `${site.url}/#organization`,
            name: post.author ?? site.name,
            url: site.url,
          },
          publisher: {
            "@type": "Organization",
            "@id": `${site.url}/#organization`,
            name: site.name,
            url: site.url,
          } as Organization,
          about: post.dataset.name,
          url: postUrl,
        }
      : null;

  // ── DefinedTermSet (glossary posts only) ─────────────────────────────────
  // Each <DefinedTerm> component emits its own inline JSON-LD. This block
  // provides the container DefinedTermSet that AI engines use to understand
  // the glossary as a whole. Triggered by contentType: "glossary".
  const definedTermSetSchema: WithContext<Thing> | null =
    post.contentType === "glossary"
      ? ({
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          "@id": `${postUrl}#termset`,
          name: post.title,
          description: post.excerpt,
          url: postUrl,
          creator: {
            "@type": "Organization",
            "@id": `${site.url}/#organization`,
            name: site.name,
            url: site.url,
          },
          datePublished,
          dateModified,
        } as unknown as WithContext<Thing>)
      : null;

  return (
    <>
      <JsonLd schema={blogPostingSchema} />
      <JsonLd schema={breadcrumbSchema} />
      {howToSchema && <JsonLd schema={howToSchema} />}
      {faqSchema && <JsonLd schema={faqSchema} />}
      {datasetSchema && <JsonLd schema={datasetSchema} />}
      {scholarlySchema && <JsonLd schema={scholarlySchema} />}
      {definedTermSetSchema && <JsonLd schema={definedTermSetSchema} />}
      <SiteHeader />
      <main className="min-h-screen bg-c3-black text-c3-text">
        <Container className="py-16 xl:py-[108px]">
          {/* Breadcrumb nav */}
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-c3-dim mb-12">
            <Link href="/" className="hover:text-c3-yellow transition-colors duration-200">Home</Link>
            <span>/</span>
            <Link href="/field-notes" className="hover:text-c3-yellow transition-colors duration-200">Field Notes</Link>
            <span>/</span>
            <span className="text-c3-mid truncate max-w-[260px]">{post.categoryLabel}</span>
          </nav>

          {/* Header */}
          <header className="max-w-[860px]">
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mb-4">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {" · "}
              {post.readTime} read
              {post.tags.length > 0 && (
                <span className="ml-4 text-c3-yellow">
                  {post.tags.slice(0, 3).join(" · ")}
                </span>
              )}
            </div>
            <h1 className="font-disp text-[clamp(36px,5vw,68px)] tracking-[0.025em] leading-[0.95] mb-6">
              {post.title}
            </h1>
            <p className="font-body font-light text-[18px] text-c3-mid leading-[1.7] border-l-[3px] border-c3-yellow pl-5">
              {post.excerpt}
            </p>
          </header>

          <hr className="border-c3-border my-12" />

          {/* Body */}
          <article className="prose-field-notes max-w-[780px]">
            {/* blockJS: false allows JSX attribute expressions (e.g. items={[...]} on
                TableOfContents) while the dangerous-calls plugin still blocks eval /
                process / require. Our MDX is authored content in git, not user input. */}
            <MDXRemote source={post.content} components={mdxComponents} options={{ blockJS: false }} />
          </article>

          <hr className="border-c3-border mt-16 mb-10" />

          {/* Footer CTA */}
          <div className="flex items-center justify-between gap-6 flex-wrap">
            <Link
              href="/field-notes"
              className="font-mono text-[10px] tracking-[0.18em] uppercase text-c3-dim hover:text-c3-yellow transition-colors duration-200"
            >
              ← All Field Notes
            </Link>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-3 bg-c3-yellow text-[#111] hover:bg-[#FFD000] hover:-translate-y-0.5 transition-all duration-[220ms]"
            >
              Free Assessment →
            </Link>
          </div>
        </Container>
      </main>
      <SiteFooter />
    </>
  );
}
