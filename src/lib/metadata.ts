import type { Metadata } from "next";
import { site } from "./site";

const DEFAULT_OG_IMAGE = "/og-default.png";

export function generateMetadata(
  title: string,
  description: string,
  ogImagePath?: string,
  canonicalPath = "/"
): Metadata {
  const image = `${site.url}${ogImagePath ?? DEFAULT_OG_IMAGE}`;
  const canonical = `${site.url}${canonicalPath}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
