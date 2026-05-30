interface Props {
  source: string;
  url?: string;
  year?: string;
}

/**
 * Maps known authoritative source names to canonical URLs.
 * When a Citation uses one of these sources and no explicit url= is provided,
 * the source label auto-links. Outbound links to authoritative sources are a
 * positive SEO quality signal — they show the content is grounded in real data.
 */
const SOURCE_URLS: Record<string, string> = {
  "RIA Cost of Doing Business Report": "https://www.restorationindustry.org",
  "IBISWorld": "https://www.ibisworld.com",
  "NCCI": "https://www.ncci.com",
  "Peak Business Valuation": "https://peakbusinessvaluation.com",
  "Insurance Information Institute": "https://www.iii.org",
  "Triple-I": "https://www.iii.org",
  "Verisk Analytics": "https://www.verisk.com/insurance/products/xactimate/",
  "Xactimate/Verisk": "https://www.verisk.com/insurance/products/xactimate/",
  "Xactimate": "https://www.verisk.com/insurance/products/xactimate/",
  "IICRC": "https://www.iicrc.org",
  "NOAA NCEI": "https://www.ncei.noaa.gov/access/billions/",
  "BLS OEWS": "https://www.bls.gov/oes/",
  "Bureau of Labor Statistics": "https://www.bls.gov",
  "BLS": "https://www.bls.gov",
  "Cleanfax State of the Industry": "https://www.cleanfax.com",
  "Cleanfax": "https://www.cleanfax.com",
  "FEMA NFIP data": "https://www.fema.gov/flood-insurance",
  "FEMA": "https://www.fema.gov",
  "Swiss Re sigma": "https://www.swissre.com/institute/research/sigma-research.html",
  "Swiss Re": "https://www.swissre.com/institute/research/sigma-research.html",
  "R&R Magazine": "https://www.randrmagonline.com",
  "Restoration & Remediation Magazine": "https://www.randrmagonline.com",
  "Intuit pricing": "https://quickbooks.intuit.com/pricing/",
  "IRS MACRS schedule": "https://www.irs.gov/publications/p946",
  "RIA": "https://www.restorationindustry.org",
  "Restoration Industry Association": "https://www.restorationindustry.org",
};

/**
 * Inline citation component. Renders the source name (and year if provided)
 * as a small tagged reference. Known sources auto-link to their canonical URL
 * unless overridden with an explicit url= prop. AI engines use these to assess
 * source authority; outbound links to authoritative sources are a positive SEO
 * quality signal.
 */
export default function Citation({ source, url, year }: Props) {
  const resolvedUrl = url ?? SOURCE_URLS[source];
  const label = year ? `${source}, ${year}` : source;

  return (
    <span className="inline-flex items-center gap-1 mx-1 align-middle">
      <span className="font-mono text-[9px] tracking-[0.12em] text-c3-dim border border-c3-border px-[5px] py-[2px] leading-none">
        {resolvedUrl ? (
          <a
            href={resolvedUrl}
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
