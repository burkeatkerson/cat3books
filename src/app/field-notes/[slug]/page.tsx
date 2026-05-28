import type { Metadata } from "next";
import type { BlogPosting, WithContext } from "schema-dts";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPostSlugs, getPost } from "@/lib/field-notes";
import { site } from "@/lib/site";
import JsonLd from "@/components/JsonLd";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import Container from "@/components/Container";

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
    return {
      title: `${post.title} | Field Notes · Cat3 Books`,
      description: post.excerpt,
      alternates: { canonical },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: canonical,
        siteName: site.name,
        type: "article",
        publishedTime: new Date(post.date).toISOString(),
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

  const schema: WithContext<BlogPosting> = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(post.date).toISOString(),
    author: {
      "@type": "Organization",
      name: post.author ?? site.name,
      url: site.url,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    url: `${site.url}/field-notes/${post.slug}`,
    keywords: post.tags.join(", "),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${site.url}/field-notes/${post.slug}`,
    },
  };

  return (
    <>
      <JsonLd schema={schema} />
      <SiteHeader />
      <main className="min-h-screen bg-c3-black text-c3-text">
        <Container className="py-16 xl:py-[108px]">
          {/* Back link */}
          <Link
            href="/field-notes"
            className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase text-c3-dim hover:text-c3-yellow transition-colors duration-200 mb-12"
          >
            ← Field Notes
          </Link>

          {/* Header */}
          <header className="max-w-[860px]">
            <div className="font-mono text-[9px] tracking-[0.22em] uppercase text-c3-dim mb-4">
              {new Date(post.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
              {post.tags.length > 0 && (
                <span className="ml-4 text-c3-yellow">
                  {post.tags.join(" · ")}
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
            <MDXRemote source={post.content} />
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
              href="#contact"
              className="inline-flex items-center gap-2 font-cond font-bold text-[13px] tracking-[0.10em] uppercase px-[18px] py-3 bg-c3-yellow text-[#111] hover:bg-c3-yellow-2 hover:-translate-y-0.5 transition-all duration-[220ms]"
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
