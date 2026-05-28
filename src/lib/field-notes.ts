import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src/content/field-notes");

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
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
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx"))
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
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(slug: string): Post {
  const raw = fs.readFileSync(
    path.join(POSTS_DIR, `${slug}.mdx`),
    "utf-8"
  );
  const { data, content } = matter(raw);
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
    content,
  };
}
