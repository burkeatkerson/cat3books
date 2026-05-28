import type { Metadata } from "next";
import {
  Bebas_Neue,
  Barlow_Condensed,
  Barlow,
  Share_Tech_Mono,
} from "next/font/google";
import type { WebSite, WithContext } from "schema-dts";
import JsonLd from "@/components/JsonLd";
import MotionProvider from "@/components/motion/MotionProvider";
import { site } from "@/lib/site";
import "./globals.css";

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
    template: `%s | ${site.name}`,
    default: site.name,
  },
  description: site.description,
  metadataBase: new URL(site.url),
  alternates: { canonical: "/" },
  openGraph: {
    title: site.name,
    description:
      "The only bookkeeping firm built exclusively for restoration contractors.",
    url: site.url,
    siteName: site.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: site.name,
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
  name: site.name,
  url: site.url,
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${site.url}/search?q={search_term_string}`,
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
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
