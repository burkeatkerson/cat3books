/**
 * Small Business Bookkeeping School — content loader.
 *
 * Reads every lesson in `src/content/school/*.mdx`, validates its frontmatter
 * against the taxonomy, and exposes typed queries for the School routes.
 *
 * Built for scale. The directory is read and parsed exactly once per process
 * and memoised (`cache`), so a build with 500 lessons parses 500 files once
 * rather than once per page. Every query below reads from that in-memory index.
 * Only `getLesson()` returns MDX body text — list pages carry metadata only.
 *
 * Authoring rules enforced here (build fails loudly, never silently):
 *   • `subject`, `level` and `type` must exist in ./taxonomy
 *   • `title` and `excerpt` are required
 *   • the slug may not collide with a static /school route
 *   • duplicate slugs are impossible (filenames are the slugs)
 */

import fs from "fs";
import path from "path";
import { cache } from "react";
import matter from "gray-matter";
import {
  LESSON_TYPE_BY_KEY,
  LEVEL_BY_KEY,
  RESERVED_SLUGS,
  SUBJECTS,
  SUBJECT_BY_KEY,
} from "./taxonomy";
import { COURSES, type CourseDef, type CourseLessonRef } from "./courses";

const LESSONS_DIR = path.join(process.cwd(), "src/content/school");

/** Average adult reading speed for instructional prose, words per minute. */
const WORDS_PER_MINUTE = 220;

export interface FaqItem {
  question: string;
  answer: string;
}

export interface LessonStep {
  name: string;
  text: string;
  /** Optional anchor (e.g. "#step-1") deep-linking to the rendered step. */
  url?: string;
}

export interface LessonMeta {
  slug: string;
  title: string;
  /** Subject key from SUBJECTS. */
  subject: string;
  /** Level key from LEVELS. */
  level: string;
  /** Lesson type key from LESSON_TYPES. */
  type: string;
  /** One- or two-sentence summary. Used on cards, in metadata and in search. */
  excerpt: string;
  /**
   * The plain-language question this lesson answers, phrased the way an owner
   * would ask it. Powers search matching and the AI-citable answer block.
   */
  question?: string;
  date: string;
  updatedDate?: string;
  /** Auto-computed from word count when omitted in frontmatter. */
  readTime: string;
  tags: string[];
  keywords?: string[];
  /** Slugs a reader should understand first. Rendered as prerequisite links. */
  prerequisites?: string[];
  /** Hand-picked related slugs; supplemented automatically when short. */
  related?: string[];
  /** Terms this lesson defines — feeds DefinedTerm schema and the glossary. */
  defines?: string[];
  faqItems?: FaqItem[];
  /** Numbered steps for walkthrough/checklist lessons; drives HowTo schema. */
  steps?: LessonStep[];
  /** Surface on the School home page. */
  featured?: boolean;
  /** Sort weight within a subject (higher first). Defaults to 0.5. */
  priority?: number;
  /** Draft lessons are excluded from every listing, route and the sitemap. */
  draft?: boolean;
  /** Word count of the MDX body — used for readTime and content reporting. */
  wordCount: number;
}

export interface Lesson extends LessonMeta {
  content: string;
}

// ── Parsing ────────────────────────────────────────────────────────────────

function fail(slug: string, message: string): never {
  throw new Error(`[school] ${slug}.mdx — ${message}`);
}

function countWords(body: string): number {
  return body.split(/\s+/).filter(Boolean).length;
}

function parseMeta(slug: string, data: Record<string, unknown>, body: string): LessonMeta {
  if (RESERVED_SLUGS.has(slug)) {
    fail(slug, `"${slug}" is a reserved route under /school. Rename the file.`);
  }
  if (typeof data.title !== "string" || !data.title.trim()) {
    fail(slug, "frontmatter is missing a `title`.");
  }
  if (typeof data.excerpt !== "string" || !data.excerpt.trim()) {
    fail(slug, "frontmatter is missing an `excerpt`.");
  }

  const subject = (data.subject as string) ?? "";
  if (!SUBJECT_BY_KEY[subject]) {
    fail(
      slug,
      `unknown subject "${subject}". Valid subjects: ${SUBJECTS.map((s) => s.key).join(", ")}.`
    );
  }

  const level = (data.level as string) ?? "beginner";
  if (!LEVEL_BY_KEY[level]) {
    fail(slug, `unknown level "${level}". Valid levels: ${Object.keys(LEVEL_BY_KEY).join(", ")}.`);
  }

  const type = (data.type as string) ?? "concept";
  if (!LESSON_TYPE_BY_KEY[type]) {
    fail(slug, `unknown type "${type}". Valid types: ${Object.keys(LESSON_TYPE_BY_KEY).join(", ")}.`);
  }

  const wordCount = countWords(body);

  return {
    slug,
    title: data.title as string,
    subject,
    level,
    type,
    excerpt: data.excerpt as string,
    question: data.question as string | undefined,
    date: (data.date as string) ?? "1970-01-01",
    updatedDate: data.updatedDate as string | undefined,
    readTime:
      (data.readTime as string) ??
      `${Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE))} min`,
    tags: (data.tags as string[]) ?? [],
    keywords: data.keywords as string[] | undefined,
    prerequisites: data.prerequisites as string[] | undefined,
    related: data.related as string[] | undefined,
    defines: data.defines as string[] | undefined,
    faqItems: data.faqItems as FaqItem[] | undefined,
    steps: data.steps as LessonStep[] | undefined,
    featured: (data.featured as boolean) ?? false,
    priority: (data.priority as number) ?? 0.5,
    draft: (data.draft as boolean) ?? false,
    wordCount,
  };
}

/**
 * MDX treats `{…}` as a JSX expression, so `## Heading {#anchor}` fails the
 * parser. Rewrite those headings to raw HTML before MDXRemote sees them —
 * same transform Field Notes uses.
 */
function normalizeContent(raw: string): string {
  return raw.replace(
    /^(#{1,6})\s+(.+?)\s*\{#([\w-]+)\}\s*$/gm,
    (_, hashes: string, text: string, id: string) =>
      `<h${hashes.length} id="${id}">${text}</h${hashes.length}>`
  );
}

// ── The index (parsed once, reused everywhere) ─────────────────────────────

interface Entry {
  meta: LessonMeta;
  content: string;
}

/**
 * The parsed content directory: a flat list for scanning and a slug lookup for
 * direct access. Both are built in the same pass. (The list exists because the
 * project targets ES5 output, where iterating a Map directly is not allowed.)
 */
interface Index {
  all: Entry[];
  bySlug: Map<string, Entry>;
}

/**
 * Parse the whole content directory. Wrapped in React's `cache` so it runs once
 * per request/render pass, and additionally memoised in module scope so it runs
 * once per build process across all statically generated pages.
 */
let indexCache: Index | null = null;

const readIndex = cache((): Index => {
  if (indexCache) return indexCache;

  const index: Index = { all: [], bySlug: new Map() };
  if (!fs.existsSync(LESSONS_DIR)) {
    indexCache = index;
    return index;
  }

  const files = fs
    .readdirSync(LESSONS_DIR)
    .filter((f) => f.endsWith(".mdx") && !f.startsWith("_"));

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, "");
    const raw = fs.readFileSync(path.join(LESSONS_DIR, file), "utf-8");
    const { data, content } = matter(raw);
    const meta = parseMeta(slug, data as Record<string, unknown>, content);
    if (meta.draft && process.env.NODE_ENV === "production") continue;
    const entry: Entry = { meta, content: normalizeContent(content) };
    index.all.push(entry);
    index.bySlug.set(slug, entry);
  }

  indexCache = index;
  return index;
});

// ── Sorting ────────────────────────────────────────────────────────────────

const LEVEL_ORDER: Record<string, number> = { beginner: 0, intermediate: 1, advanced: 2 };

/** Editorial default: highest priority first, then newest. */
export function byPriorityThenDate(a: LessonMeta, b: LessonMeta): number {
  return (
    (b.priority ?? 0.5) - (a.priority ?? 0.5) ||
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/** Curriculum order: beginner → advanced, then by priority. */
export function byCurriculum(a: LessonMeta, b: LessonMeta): number {
  return (
    (LEVEL_ORDER[a.level] ?? 9) - (LEVEL_ORDER[b.level] ?? 9) || byPriorityThenDate(a, b)
  );
}

// ── Queries ────────────────────────────────────────────────────────────────

export function getAllLessonSlugs(): string[] {
  return readIndex().all.map((e) => e.meta.slug);
}

/** Every published lesson's metadata, in editorial order. */
export function getAllLessons(): LessonMeta[] {
  return readIndex().all.map((e) => e.meta).sort(byPriorityThenDate);
}

export function getLessonCount(): number {
  return readIndex().all.length;
}

/** Full lesson including MDX body. Returns null when the slug does not exist. */
export function getLesson(slug: string): Lesson | null {
  const entry = readIndex().bySlug.get(slug);
  if (!entry) return null;
  return { ...entry.meta, content: entry.content };
}

export function getLessonMeta(slug: string): LessonMeta | null {
  return readIndex().bySlug.get(slug)?.meta ?? null;
}

/** Resolve a list of slugs to metadata, dropping any that do not exist. */
export function getLessonMetas(slugs: string[]): LessonMeta[] {
  return slugs.map(getLessonMeta).filter((m): m is LessonMeta => m !== null);
}

export function lessonsBySubject(subject: string): LessonMeta[] {
  return getAllLessons()
    .filter((l) => l.subject === subject)
    .sort(byCurriculum);
}

/** Lesson count per subject key. Cheap enough to call on every page. */
export function countsBySubject(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const { meta } of readIndex().all) {
    counts[meta.subject] = (counts[meta.subject] ?? 0) + 1;
  }
  return counts;
}

export function countsByLevel(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const { meta } of readIndex().all) {
    counts[meta.level] = (counts[meta.level] ?? 0) + 1;
  }
  return counts;
}

export function countsByType(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const { meta } of readIndex().all) {
    counts[meta.type] = (counts[meta.type] ?? 0) + 1;
  }
  return counts;
}

/** All tags in use, most-used first. Powers the tag cloud on the library page. */
export function allTags(): { tag: string; count: number }[] {
  const counts: Record<string, number> = {};
  for (const { meta } of readIndex().all) {
    for (const tag of meta.tags) counts[tag] = (counts[tag] ?? 0) + 1;
  }
  return Object.entries(counts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function featuredLessons(limit = 6): LessonMeta[] {
  const all = getAllLessons();
  const flagged = all.filter((l) => l.featured);
  return (flagged.length >= limit ? flagged : [...flagged, ...all.filter((l) => !l.featured)]).slice(
    0,
    limit
  );
}

export function latestLessons(limit = 8): LessonMeta[] {
  return [...getAllLessons()]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}

/**
 * Related lessons for the end of a lesson page: hand-picked `related` slugs
 * first, then same-subject lessons sharing the most tags. Deterministic, so
 * static output stays stable between builds.
 */
export function relatedLessons(slug: string, limit = 4): LessonMeta[] {
  const self = getLessonMeta(slug);
  if (!self) return [];

  const picked = getLessonMetas(self.related ?? []).filter((l) => l.slug !== slug);
  if (picked.length >= limit) return picked.slice(0, limit);

  const seen = new Set([slug, ...picked.map((l) => l.slug)]);
  const selfTags = new Set(self.tags);

  const scored = getAllLessons()
    .filter((l) => !seen.has(l.slug))
    .map((l) => ({
      lesson: l,
      score:
        (l.subject === self.subject ? 3 : 0) +
        l.tags.filter((t) => selfTags.has(t)).length * 2 +
        (l.level === self.level ? 1 : 0),
    }))
    .filter((s) => s.score > 0)
    .sort(
      (a, b) => b.score - a.score || byPriorityThenDate(a.lesson, b.lesson)
    );

  return [...picked, ...scored.map((s) => s.lesson)].slice(0, limit);
}

// ── Courses ────────────────────────────────────────────────────────────────

export interface ResolvedCourseLesson extends CourseLessonRef {
  meta: LessonMeta;
}

export interface ResolvedCourse extends Omit<CourseDef, "lessons"> {
  lessons: ResolvedCourseLesson[];
  /** Slugs listed in the course that have not been written yet. */
  pending: string[];
  totalMinutes: number;
}

function resolveCourse(def: CourseDef): ResolvedCourse {
  const lessons: ResolvedCourseLesson[] = [];
  const pending: string[] = [];

  for (const ref of def.lessons) {
    const meta = getLessonMeta(ref.slug);
    if (meta) lessons.push({ ...ref, meta });
    else pending.push(ref.slug);
  }

  const totalMinutes = lessons.reduce(
    (n, l) => n + (parseInt(l.meta.readTime, 10) || 0),
    0
  );

  return { ...def, lessons, pending, totalMinutes };
}

/** Courses with at least one written lesson, in declaration order. */
export function getCourses(): ResolvedCourse[] {
  return COURSES.map(resolveCourse).filter((c) => c.lessons.length > 0);
}

export function getCourse(id: string): ResolvedCourse | null {
  const def = COURSES.find((c) => c.id === id);
  if (!def) return null;
  const resolved = resolveCourse(def);
  return resolved.lessons.length > 0 ? resolved : null;
}

export function featuredCourses(): ResolvedCourse[] {
  const courses = getCourses();
  const flagged = courses.filter((c) => c.featured);
  return flagged.length > 0 ? flagged : courses;
}

/**
 * Where this lesson sits in each course that contains it — drives the in-lesson
 * "Lesson 3 of 5" banner and the next-lesson card.
 */
export function courseContextFor(
  slug: string
): { course: ResolvedCourse; index: number }[] {
  const out: { course: ResolvedCourse; index: number }[] = [];
  for (const course of getCourses()) {
    const index = course.lessons.findIndex((l) => l.meta.slug === slug);
    if (index >= 0) out.push({ course, index });
  }
  return out;
}

// ── Search index ───────────────────────────────────────────────────────────

/**
 * Compact record shipped to the browser for client-side search. Deliberately
 * small — at 500 lessons the whole index is a few hundred KB, served as a
 * static JSON file and fetched only when the reader actually searches.
 */
export interface SearchRecord {
  s: string; // slug
  t: string; // title
  e: string; // excerpt
  q?: string; // question
  u: string; // subject
  l: string; // level
  y: string; // type
  g: string[]; // tags
  r: string; // readTime
}

export function buildSearchIndex(): SearchRecord[] {
  return getAllLessons().map((l) => ({
    s: l.slug,
    t: l.title,
    e: l.excerpt,
    ...(l.question ? { q: l.question } : {}),
    u: l.subject,
    l: l.level,
    y: l.type,
    g: l.tags,
    r: l.readTime,
  }));
}
