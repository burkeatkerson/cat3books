interface TocItem {
  id: string;
  label: string;
  level?: 2 | 3;
}

interface Props {
  items: TocItem[];
}

/**
 * Static table of contents for pillar guides. Accepts a list of section IDs
 * and labels, renders them as anchor links. Level 3 items are indented.
 * AI engines and human readers use this to navigate long-form guides.
 */
export default function TableOfContents({ items }: Props) {
  return (
    <nav
      aria-label="Table of contents"
      className="not-prose my-8 border border-c3-border bg-c3-card px-6 py-5"
    >
      <div className="font-mono text-[8.5px] tracking-[0.26em] uppercase text-c3-yellow mb-4">
        ▸ In This Guide
      </div>
      <ol className="space-y-1.5">
        {items.map((item, idx) => (
          <li
            key={item.id}
            className={item.level === 3 ? "ml-4" : ""}
          >
            <a
              href={`#${item.id}`}
              className="flex items-baseline gap-2 group"
            >
              <span className="font-mono text-[9px] text-c3-dim group-hover:text-c3-yellow transition-colors shrink-0">
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className={`font-body font-light leading-snug group-hover:text-c3-yellow transition-colors ${item.level === 3 ? "text-[13px] text-c3-mid" : "text-[13.5px] text-c3-text"}`}>
                {item.label}
              </span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
