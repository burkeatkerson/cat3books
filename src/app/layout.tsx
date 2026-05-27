import type { Metadata } from "next";
import {
  Bebas_Neue,
  Barlow_Condensed,
  Barlow,
  Share_Tech_Mono,
} from "next/font/google";
import type { WebSite, WithContext } from "schema-dts";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://cat3books.com";
const SITE_NAME = "Cat3 Books";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  weight: ["300", "400", "600", "700", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-barlow-condensed",
  display: "swap",
});

const barlow = Barlow({
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
});

const shareTechMono = Share_Tech_Mono({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-share-tech-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: `%s | ${SITE_NAME}`,
    default: SITE_NAME,
  },
  description:
    "The only bookkeeping firm built exclusively for restoration contractors. Job costing, supplement recovery, expense management, fractional CFO — restoration only, always.",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    title: SITE_NAME,
    description:
      "The only bookkeeping firm built exclusively for restoration contractors.",
    url: BASE_URL,
    siteName: SITE_NAME,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description:
      "The only bookkeeping firm built exclusively for restoration contractors.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const websiteSchema: WithContext<WebSite> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: BASE_URL,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
    },
    // @ts-expect-error schema-dts doesn't model query-input as a string literal
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body
        className={`${bebasNeue.variable} ${barlowCondensed.variable} ${barlow.variable} ${shareTechMono.variable} bg-c3-black text-c3-text font-body font-light leading-relaxed min-h-screen overflow-x-hidden`}
      >
        <JsonLd schema={websiteSchema} />
        {children}
      </body>
    </html>
  );
}
