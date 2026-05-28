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
      {/* Top accent bar */}
      <div style={{ height: 6, background: "#F0BE00", width: "100%", flexShrink: 0 }} />

      {/* Ghost "3" */}
      <div
        style={{
          position: "absolute",
          right: -60,
          bottom: -80,
          fontSize: 520,
          color: "#F0BE00",
          opacity: 0.04,
          fontWeight: 900,
          lineHeight: 0.8,
        }}
      >
        3
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "64px 80px" }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: 40 }}>
          <span style={{ fontWeight: 700, fontSize: 28, letterSpacing: "0.06em", color: "#EAE6D8", textTransform: "uppercase" }}>CAT</span>
          <span style={{ display: "flex", alignItems: "center", justifyContent: "center", background: "#F0BE00", color: "#111", width: 28, height: 28, fontSize: 22, fontWeight: 900, margin: "0 4px" }}>3</span>
          <span style={{ fontWeight: 700, fontSize: 28, letterSpacing: "0.06em", color: "#484640", textTransform: "uppercase" }}>BOOKS</span>
        </div>

        {/* Headline */}
        <div style={{ fontWeight: 900, fontSize: 76, color: "#EAE6D8", lineHeight: 0.9, letterSpacing: "-0.01em", marginBottom: 32, maxWidth: 900 }}>
          Restoration Bookkeeping.
          <br />
          <span style={{ color: "#F0BE00" }}>Restoration only.</span>
        </div>

        {/* Description */}
        <div style={{ fontWeight: 300, fontSize: 22, color: "#A09888", lineHeight: 1.5, maxWidth: 700, marginBottom: 40 }}>
          Job costing, supplement recovery, TPA channel AR, fractional CFO — built exclusively for restoration contractors.
        </div>

        {/* URL */}
        <div style={{ fontFamily: "monospace", fontSize: 18, letterSpacing: "0.14em", color: "#F0BE00", textTransform: "uppercase" }}>
          {site.url.replace("https://", "")}
        </div>
      </div>
    </div>,
    { ...size }
  );
}
