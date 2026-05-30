import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src/content/field-notes");

export interface HowToStep {
  name: string;
  text: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

/** Metadata for schema.org Dataset markup — used on industry-report posts. */
export interface DatasetMeta {
  name: string;
  description: string;
  /** ISO 8601 temporal coverage — e.g. "2025" or "2020/2025" */
  temporalCoverage?: string;
  spatialCoverage?: string;
  /** Short strings describing what is being measured */
  variableMeasured?: string[];
  /** SPDX or Creative Commons license URL */
  license?: string;
}

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  updatedDate?: string;
  excerpt: string;
  tags: string[];
  author?: string;
  category: string;
  categoryLabel: string;
  coverStyle: string;
  coverGlyph: string;
  coverSub: string;
  issueNumber: string;
  readTime: string;
  featured?: boolean;
  howToSteps?: HowToStep[];
  faqItems?: FaqItem[];
  keywords?: string[];
  contentType?: string;
  priority?: number;
  /** Present on industry-report posts; drives Dataset schema generation. */
  dataset?: DatasetMeta;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

export function getAllPosts(): PostMeta[] {
  return getAllPostSlugs()
    .map((slug) => {
      const { data } = matter(
        fs.readFileSync(path.join(POSTS_DIR, `${slug}.mdx`), "utf-8")
      );
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        tags: (data.tags as string[]) ?? [],
        author: data.author as string | undefined,
        category: (data.category as string) ?? "general",
        categoryLabel: (data.categoryLabel as string) ?? "",
        coverStyle: (data.coverStyle as string) ?? "cv-grid",
        coverGlyph: (data.coverGlyph as string) ?? "",
        coverSub: (data.coverSub as string) ?? "",
        issueNumber: (data.issueNumber as string) ?? "",
        readTime: (data.readTime as string) ?? "5 min",
        featured: (data.featured as boolean) ?? false,
        updatedDate: data.updatedDate as string | undefined,
        howToSteps: data.howToSteps as HowToStep[] | undefined,
        faqItems: data.faqItems as FaqItem[] | undefined,
        keywords: data.keywords as string[] | undefined,
        contentType: data.contentType as string | undefined,
        priority: data.priority as number | undefined,
        dataset: data.dataset as DatasetMeta | undefined,
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post {
  const raw = fs.readFileSync(
    path.join(POSTS_DIR, `${slug}.mdx`),
    "utf-8"
  );
  const { data, content: rawContent } = matter(raw);
  // MDX treats {…} as JSX expressions, so {#anchor-id} in headings fails the
  // acorn parser. Convert ## Heading {#id} → <hN id="id">Heading</hN> before
  // the content reaches MDXRemote.
  const content = rawContent.replace(
    /^(#{1,6})\s+(.+?)\s*\{#([\w-]+)\}\s*$/gm,
    (_, hashes: string, text: string, id: string) =>
      `<h${hashes.length} id="${id}">${text}</h${hashes.length}>`
  );
  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) ?? [],
    author: data.author as string | undefined,
    category: (data.category as string) ?? "general",
    categoryLabel: (data.categoryLabel as string) ?? "",
    coverStyle: (data.coverStyle as string) ?? "cv-grid",
    coverGlyph: (data.coverGlyph as string) ?? "",
    coverSub: (data.coverSub as string) ?? "",
    issueNumber: (data.issueNumber as string) ?? "",
    readTime: (data.readTime as string) ?? "5 min",
    featured: (data.featured as boolean) ?? false,
    updatedDate: data.updatedDate as string | undefined,
    howToSteps: data.howToSteps as HowToStep[] | undefined,
    faqItems: data.faqItems as FaqItem[] | undefined,
    keywords: data.keywords as string[] | undefined,
    contentType: data.contentType as string | undefined,
    priority: data.priority as number | undefined,
    dataset: data.dataset as DatasetMeta | undefined,
    content,
  };
}
