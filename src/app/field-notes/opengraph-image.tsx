import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
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

      {/* Diagonal tape pattern overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          background: "repeating-linear-gradient(135deg, transparent 0 18px, #F0BE00 18px 19px, transparent 19px 38px)",
        }}
      />

      {/* Ghost letters */}
      <div
        style={{
          position: "absolute",
          right: -30,
          top: -60,
          fontSize: 480,
          fontWeight: 900,
          color: "#F0BE00",
          opacity: 0.04,
          lineHeight: 0.8,
          letterSpacing: "0.02em",
        }}
      >
        FN
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 80px", position: "relative", zIndex: 1 }}>
        {/* Overline */}
        <div style={{ fontFamily: "monospace", fontSize: 16, letterSpacing: "0.28em", color: "#F0BE00", textTransform: "uppercase", marginBottom: 28, display: "flex", alignItems: "center", gap: 16 }}>
          <span style={{ width: 28, height: 1, background: "#F0BE00" }} />
          Cat3 Books · Field Notes
        </div>

        {/* Headline */}
        <div style={{ fontWeight: 900, fontSize: 100, color: "#EAE6D8", lineHeight: 0.88, letterSpacing: "0.025em", marginBottom: 36 }}>
          FIELD
          <br />
          <span style={{ color: "#F0BE00" }}>NOTES</span>
          <br />
          <span style={{ color: "#2A2A28" }}>FROM THE</span>
          <br />
          BOOKS.
        </div>

        {/* Tagline */}
        <div style={{ fontWeight: 300, fontSize: 22, color: "#A09888", lineHeight: 1.5, maxWidth: 600 }}>
          Practical writing on restoration bookkeeping, job costing, supplement recovery, and the financial mechanics of the industry.
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ height: 56, background: "#101010", borderTop: "1px solid #222220", display: "flex", alignItems: "center", padding: "0 80px", justifyContent: "space-between", flexShrink: 0, position: "relative", zIndex: 1 }}>
        <span style={{ fontFamily: "monospace", fontSize: 14, letterSpacing: "0.18em", color: "#484640", textTransform: "uppercase" }}>
          {site.url.replace("https://", "")}/field-notes
        </span>
        <span style={{ fontFamily: "monospace", fontSize: 14, letterSpacing: "0.18em", color: "#484640", textTransform: "uppercase" }}>
          Restoration only. Always.
        </span>
      </div>
    </div>,
    { ...size }
  );
}
