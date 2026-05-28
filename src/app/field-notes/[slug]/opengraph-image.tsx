import { ImageResponse } from "next/og";
import { fieldNotesMeta } from "@/data/field-notes-metadata";
import { site } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Slugs listed here so generateStaticParams works without fs (edge runtime).
// Add the slug here whenever a new post is added to src/content/field-notes/.
export function generateStaticParams() {
  return Object.keys(fieldNotesMeta).map((slug) => ({ slug }));
}

export default function Image({ params }: { params: { slug: string } }) {
  const meta = fieldNotesMeta[params.slug] ?? {
    title: "Field Notes",
    categoryLabel: "Cat3 Books",
    excerpt: "Restoration bookkeeping insights for restoration owners.",
  };

  const title = meta.title.length > 72 ? meta.title.slice(0, 69) + "…" : meta.title;
  const excerpt = meta.excerpt.length > 130 ? meta.excerpt.slice(0, 127) + "…" : meta.excerpt;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#090908",
        display: "flex",
        flexDirection: "column",
        padding: 0,
        position: "relative",
        overflow: "hidden",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top accent */}
      <div style={{ height: 6, background: "#F0BE00", width: "100%", flexShrink: 0 }} />

      {/* Left yellow stripe */}
      <div style={{ position: "absolute", left: 0, top: 6, bottom: 0, width: 8, background: "#F0BE00" }} />

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 80px 64px 100px" }}>
        {/* Category label */}
        <div style={{ fontFamily: "monospace", fontSize: 16, letterSpacing: "0.28em", color: "#F0BE00", textTransform: "uppercase", marginBottom: 28 }}>
          Field Notes · {meta.categoryLabel}
        </div>

        {/* Title */}
        <div
          style={{
            fontWeight: 800,
            fontSize: title.length > 55 ? 48 : 62,
            color: "#EAE6D8",
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            marginBottom: 28,
            maxWidth: 980,
          }}
        >
          {title}
        </div>

        {/* Excerpt */}
        <div style={{ fontWeight: 300, fontSize: 20, color: "#A09888", lineHeight: 1.55, maxWidth: 860 }}>
          {excerpt}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ height: 56, background: "#101010", borderTop: "1px solid #222220", display: "flex", alignItems: "center", padding: "0 100px", justifyContent: "space-between", flexShrink: 0 }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "0.06em", color: "#EAE6D8", textTransform: "uppercase" }}>CAT</span>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#F0BE00", color: "#111", width: 18, height: 18, fontSize: 13, fontWeight: 900, margin: "0 3px" }}>3</span>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "0.06em", color: "#484640", textTransform: "uppercase" }}>BOOKS</span>
        </div>
        <span style={{ fontFamily: "monospace", fontSize: 13, letterSpacing: "0.18em", color: "#484640", textTransform: "uppercase" }}>
          {site.url.replace("https://", "")}/field-notes
        </span>
      </div>
    </div>,
    { ...size }
  );
}
