import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

interface Props {
  /** The product or service being reviewed. */
  subject: string;
  /** Optional product category for schema (default: "SoftwareApplication") */
  category?: string;
  /** Rating value (0–5) */
  rating: number;
  /** One-sentence verdict — the review headline. */
  headline: string;
  /** Optional: the product's canonical URL for schema. */
  url?: string;
  /** Optional: context description (e.g., "as a restoration job management platform") */
  context?: string;
  className?: string;
}

/**
 * Displays a product rating card with visual star representation and emits
 * schema.org Review JSON-LD for AI citation and rich search results.
 * Ratings should be honest and defensible — this component is designed to
 * be the canonical Cat3 Books verdict on each tool evaluated.
 */
export default function ReviewBlock({
  subject,
  category = "SoftwareApplication",
  rating,
  headline,
  url,
  context,
  className,
}: Props) {
  const rounded = Math.round(rating * 10) / 10;
  const pct = (rating / 5) * 100;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": category === "SoftwareApplication" ? "SoftwareApplication" : "Product",
      name: subject,
      ...(url ? { url } : {}),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: rounded.toString(),
      bestRating: "5",
      worstRating: "1",
    },
    author: {
      "@type": "Organization",
      name: site.name,
      url: site.url,
    },
    reviewBody: headline,
  };

  return (
    <div className={cn("not-prose my-8 border border-c3-border bg-c3-card", className)}>
      {/* Header */}
      <div className="flex items-start justify-between gap-4 px-6 py-5 border-b border-c3-border">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[8.5px] tracking-[0.26em] uppercase text-c3-dim mb-1">
            ▸ Cat3 Books Review
          </div>
          <div className="font-disp text-[20px] tracking-[0.02em] text-c3-text">
            {subject}
          </div>
          {context && (
            <div className="font-body font-light text-[12px] text-c3-dim mt-0.5">{context}</div>
          )}
        </div>
        {/* Rating block */}
        <div className="shrink-0 flex flex-col items-center text-center">
          <span className="font-disp text-[36px] leading-none text-c3-yellow">
            {rounded.toFixed(1)}
          </span>
          <span className="font-mono text-[8px] tracking-[0.18em] text-c3-dim uppercase mt-0.5">
            out of 5
          </span>
          {/* Bar */}
          <div className="mt-1.5 w-14 h-1 bg-c3-border rounded-full overflow-hidden">
            <div
              className="h-full bg-c3-yellow rounded-full"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
      {/* Verdict line */}
      <div className="px-6 py-4">
        <p className="font-body font-light text-[14.5px] text-c3-mid leading-[1.65] italic">
          &ldquo;{headline}&rdquo;
        </p>
      </div>
      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </div>
  );
}
