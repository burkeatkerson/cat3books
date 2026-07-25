import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getAllPosts } from "@/lib/field-notes";
import { getAllLessons, getCourses } from "@/lib/school/lessons";
import { SUBJECTS, schoolPaths } from "@/lib/school/taxonomy";
import { LEGAL_PAGES, legal } from "@/lib/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const lessons = getAllLessons();
  const courses = getCourses();

  return [
    {
      url: site.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${site.url}/restoration-bookkeeping`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${site.url}/field-notes`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${site.url}/field-notes/${post.slug}`,
      lastModified: new Date(post.updatedDate ?? post.date),
      changeFrequency: "monthly" as const,
      priority: post.priority ?? 0.7,
    })),

    // ── Small Business Bookkeeping School ──────────────────────────────────
    {
      url: `${site.url}${schoolPaths.home}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
    {
      url: `${site.url}${schoolPaths.library}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    {
      url: `${site.url}${schoolPaths.courses}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    ...SUBJECTS.map((subject) => ({
      url: `${site.url}${schoolPaths.subject(subject.key)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...courses.map((course) => ({
      url: `${site.url}${schoolPaths.course(course.id)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...lessons.map((lesson) => ({
      url: `${site.url}${schoolPaths.lesson(lesson.slug)}`,
      lastModified: new Date(lesson.updatedDate ?? lesson.date),
      changeFrequency: "monthly" as const,
      priority: lesson.priority ?? 0.6,
    })),

    // ── Legal ──────────────────────────────────────────────────────────────
    ...LEGAL_PAGES.map((page) => ({
      url: `${site.url}/${page.slug}`,
      lastModified: new Date(legal.effectiveDateISO),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
