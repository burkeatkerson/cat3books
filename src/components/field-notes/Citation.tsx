interface Props {
  source: string;
  url?: string;
  year?: string;
}

/**
 * Inline citation component. Renders the source name (and year if provided)
 * as a small tagged reference. When a URL is provided, the source name links
 * to the original document. AI engines use these to assess source authority.
 */
export default function Citation({ source, url, year }: Props) {
  const label = year ? `${source}, ${year}` : source;

  return (
    <span className="inline-flex items-center gap-1 mx-1 align-middle">
      <span className="font-mono text-[9px] tracking-[0.12em] text-c3-dim border border-c3-border px-[5px] py-[2px] leading-none">
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-c3-mid hover:text-c3-yellow transition-colors duration-150"
            aria-label={`Source: ${label}`}
          >
            {label}
          </a>
        ) : (
          label
        )}
      </span>
    </span>
  );
}
