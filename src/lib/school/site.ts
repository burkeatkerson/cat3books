import { site } from "@/lib/site";

/**
 * Naming and positioning for the School, kept separate from `site` because the
 * School presents as its own property — different name, different promise,
 * different audience (any small business owner, not just restoration).
 */
export const schoolSite = {
  name: "Small Business Bookkeeping School",
  shortName: "Bookkeeping School",
  url: `${site.url}/school`,
  tagline: "Learn to run your own books — and read what they are telling you.",
  description:
    "A free, plain-English school for small business owners: bookkeeping fundamentals, QuickBooks walkthroughs, fixes for the problems every set of books develops, and how to read your own financial statements.",
  /** Used in og/meta where a shorter line is needed. */
  metaDescription:
    "Free plain-English bookkeeping lessons for small business owners — fundamentals, QuickBooks, common problems and fixes, and how to read your own numbers.",
} as const;
