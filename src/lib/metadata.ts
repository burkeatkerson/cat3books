import type { Metadata } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cat3books.com";
const SITE_NAME = "Cat3 Books";
const DEFAULT_OG_IMAGE = "/og-default.png";

export function generateMetadata(
  title: string,
  description: string,
  ogImagePath?: string
): Metadata {
  const image = `${BASE_URL}${ogImagePath ?? DEFAULT_OG_IMAGE}`;

  return {
    title,
    description,
    alternates: {
      canonical: BASE_URL,
    },
    openGraph: {
      title,
      description,
      url: BASE_URL,
      siteName: SITE_NAME,
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
