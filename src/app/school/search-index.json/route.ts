import { buildSearchIndex } from "@/lib/school/lessons";

/**
 * Static, cacheable search index for the whole School.
 *
 * The library page already receives this index as a prop, so nothing on the
 * site fetches this route today. It exists because it is the seam that keeps
 * the School scalable: when the library grows past the point where shipping
 * the index inside the page payload is sensible, LibraryBrowser fetches this
 * URL on first keystroke instead — no other change. It is also a clean,
 * machine-readable manifest of every lesson for external tooling.
 */
export const dynamic = "force-static";

export function GET() {
  const records = buildSearchIndex();
  return Response.json(
    { count: records.length, records },
    { headers: { "Cache-Control": "public, max-age=0, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
