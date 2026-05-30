interface Props {
  name: string;
  description: string;
  temporalCoverage?: string;
  spatialCoverage?: string;
  variableMeasured?: string[];
  publisher?: string;
}

/**
 * Renders an inline Schema.org Dataset JSON-LD block for specific benchmark
 * tables inside MDX posts. Complements the post-level dataset: frontmatter
 * (which generates a head-level script via JsonLd). Use this component to
 * annotate individual tables when a post contains multiple distinct datasets.
 * AI engines and structured-data crawlers read inline script tags as well.
 */
export default function DatasetSchema({
  name,
  description,
  temporalCoverage,
  spatialCoverage,
  variableMeasured,
  publisher = "Cat3 Books",
}: Props) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name,
    description,
    publisher: {
      "@type": "Organization",
      name: publisher,
      url: "https://cat3books.com",
    },
    ...(temporalCoverage && { temporalCoverage }),
    ...(spatialCoverage && {
      spatialCoverage: { "@type": "Place", name: spatialCoverage },
    }),
    ...(variableMeasured?.length && {
      variableMeasured: variableMeasured.map((v) => ({
        "@type": "PropertyValue",
        name: v,
      })),
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
