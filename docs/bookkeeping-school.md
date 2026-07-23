# Small Business Bookkeeping School

A free educational section at `/school`, built to hold hundreds of lessons on
bookkeeping, QuickBooks, common problems, and reading your own numbers.

It is deliberately a **separate property** from the marketing site: its own light
"paper" theme, its own header and footer, its own audience (any small business
owner, not just restoration contractors). Field Notes remains the
restoration-specialist blog; the School is the wide net that feeds it.

---

## Adding a lesson

```bash
npm run school:new -- "Why my bank feed missed a transaction" troubleshooting fix intermediate
```

That writes `src/content/school/<slug>.mdx` as a draft. Fill it in, delete
`draft: true`, done — the lesson appears in the library, its subject page,
search, the sitemap and the JSON index automatically. Nothing else to register.

To write one by hand, copy `src/content/school/_TEMPLATE.mdx`. Files starting
with `_` are ignored by the loader.

### The filename is the URL

`src/content/school/how-to-reconcile-bank-account.mdx` → `/school/how-to-reconcile-bank-account`.

A handful of slugs are reserved because they collide with static routes
(`library`, `courses`, `subjects`, `search-index.json`); the build fails loudly
if a lesson uses one.

---

## Frontmatter

| Field | Required | Notes |
| --- | --- | --- |
| `title` | yes | |
| `subject` | yes | One of the eight keys in `src/lib/school/taxonomy.ts` |
| `level` | yes | `beginner` · `intermediate` · `advanced` |
| `type` | yes | `concept` · `walkthrough` · `fix` · `checklist` · `reference` · `example` |
| `excerpt` | yes | Cards, search results, meta description |
| `question` | recommended | The question an owner would type. Drives search matching and AI citation |
| `date` | recommended | Defaults to epoch, which sorts it last |
| `tags`, `keywords` | recommended | `tags` are user-facing; `keywords` are for search engines |
| `readTime` | no | Computed from word count when omitted |
| `priority` | no | 0–1, sorts within a subject. Default 0.5 |
| `featured` | no | Surfaces on the School home page |
| `draft` | no | Hidden from every listing, route and the sitemap in production |
| `prerequisites` | no | Slugs rendered as "Read first" links |
| `related` | no | Hand-picked; otherwise chosen by subject + tag overlap |
| `steps` | no | Numbered steps → HowTo schema. `url` anchors must match `<Step id="…">` |
| `faqItems` | no | Rendered at the foot of the lesson **and** emitted as FAQPage schema |

Invalid `subject`, `level` or `type` values fail the build with the file name and
the valid options — a typo in one of hundreds of files surfaces immediately
rather than silently orphaning a lesson.

---

## MDX components

Available in every lesson without an import (see `src/components/school/mdx.tsx`):

| Component | Use |
| --- | --- |
| `<QuickAnswer question="…">` | The short quotable answer. Marked `.speakable-answer` for AI engines |
| `<KeyTerm term="…" also="…">` | Defines a term, emits DefinedTerm schema |
| `<Callout variant="note\|tip\|warning\|mistake\|rule">` | Asides |
| `<Step n={1} title="…" id="step-1">` | A walkthrough step, anchored for HowTo schema |
| `<Example title="…">` | Worked example box |
| `<JournalEntry entries={[["Account","1,000",""]]}>` | Debit/credit table |
| `<Formula name="…" expression="…">` | Named formula with plain-English reading |
| `<Checklist items={[…]}>` | Tickable routine |
| `<Compare left={…} right={…}>` | Two-column contrast |
| `<Takeaways items={[…]}>` | Closing summary |
| `<NextUp slug="…">` | Internal link primitive |
| `<ServiceNote>` | Bridge to the firm. Use sparingly — the School teaches first |
| `<Contents items={[{ id, label }]}>` | In-lesson table of contents |
| `<TableScroll>` | Wrap a wide markdown table so it scrolls |

Headings support `## Heading {#anchor}` — the loader rewrites those to raw HTML
before MDX sees them, since MDX would otherwise parse `{…}` as JSX.

---

## Courses

Courses are ordered reading paths defined in `src/lib/school/courses.ts`, not in
frontmatter. A lesson can appear in several courses, and re-sequencing is a
one-file edit.

Courses may reference lessons that do not exist yet — unresolved slugs are
dropped from the outline and counted in `course.pending`, so a course can be
planned in full and fill in as lessons land.

---

## Architecture

```
src/lib/school/
  taxonomy.ts   subjects, levels, lesson types, route helpers, reserved slugs
  courses.ts    ordered course definitions
  lessons.ts    MDX loader, validation, all queries, search index
  site.ts       School naming and positioning

src/components/school/
  SchoolHeader / SchoolFooter / SchoolContainer   the section's own shell
  LessonCard / SubjectCard / CourseCard / Badges  cards and chips
  LibraryBrowser                                  client search + facets
  CourseNav / Breadcrumbs                         navigation
  mdx.tsx                                         the lesson component kit

src/app/school/
  layout.tsx                 light "paper" mode via .school-root
  page.tsx                   home
  library/                   search + faceted browse over everything
  subjects/[subject]/        one page per subject, syllabus by level
  courses/ + courses/[course]
  [slug]/                    the lesson
  search-index.json/         static machine-readable index of every lesson
```

### Scale notes

- The content directory is parsed **once per build process** and memoised, so
  500 lessons parse 500 files once, not once per generated page.
- List pages carry metadata only; MDX bodies load solely on lesson routes.
- The library ships the compact `SearchRecord` shape (~150 bytes/lesson) and
  renders 24 results at a time. When the index outgrows the page payload, point
  `LibraryBrowser` at `/school/search-index.json` — same shape, no other change.

### Theming

The root `<body>` is locked to the dark marketing palette. `src/app/school/layout.tsx`
marks itself `.school-root`, and `:has()` rules in `globals.css` repaint the
shell: paper background, lighter grain, ink-on-paper selection. All School colour
tokens are namespaced `school-*` in `tailwind.config.ts`, and lesson prose lives
under `.prose-school` — nothing can leak into the rest of the site.

### Structured data

- `EducationalOrganization` on the School shell
- `Course` on each subject and each course page
- `LearningResource` on every lesson — plus `HowTo` when `steps` is present and
  `FAQPage` when `faqItems` is
- `BreadcrumbList` from the same source as the visible trail
- `DefinedTerm` from each `<KeyTerm>`
