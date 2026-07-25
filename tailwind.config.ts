import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        c3: {
          black: "#090908",
          dark: "#101010",
          card: "#161615",
          card2: "#1c1c1a",
          border: "#222220",
          b2: "#2A2A28",
          yellow: { DEFAULT: "#F0BE00", "2": "#FFD000", dim: "#5A4500" },
          red: "#CC2A00",
          redsoft: "#ff7a55",
          green: "#187A38",
          greensoft: "#2bb45c",
          blue: "#3A6EA5",
          bluesoft: "#6f9fd4",
          paused: "#dd8800",
          text: "#EAE6D8",
          mid: "#A09888",
          dim: "#484640",
        },
        /**
         * Bookkeeping School palette. The School is a deliberately separate
         * property: ink-on-paper, calm, textbook-like — the inverse of the dark
         * marketing site. `sun` is the one Cat3 yellow tie-back.
         */
        school: {
          paper: "#FAF8F3",
          raised: "#FFFFFF",
          sand: "#F2EFE6",
          ink: "#14161A",
          body: "#454B55",
          muted: "#767C87",
          faint: "#9BA1AC",
          line: "#E4DFD3",
          line2: "#CFC8B7",
          navy: "#2C4A6E",
          navy2: "#1E3652",
          wash: "#EDF1F6",
          green: "#2F6B4F",
          red: "#A8391E",
          sun: "#F0BE00",
        },
      },
      fontFamily: {
        mono: ["var(--font-share-tech-mono)", "monospace"],
        cond: ["var(--font-barlow-condensed)", "sans-serif"],
        body: ["var(--font-barlow)", "sans-serif"],
        disp: ["var(--font-bebas-neue)", "sans-serif"],
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.1" },
        },
        fadeUp: {
          from: { opacity: "0", transform: "translateY(12px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        ticker: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        glowPulse: {
          "0%, 100%": { textShadow: "0 0 0 transparent" },
          "50%": {
            textShadow:
              "0 0 40px rgba(240,190,0,0.35), 0 0 80px rgba(240,190,0,0.15)",
          },
        },
        ringPing: {
          "0%": { transform: "translate(-50%,-50%) scale(0.1)", opacity: "0.7" },
          "100%": { transform: "translate(-50%,-50%) scale(3.5)", opacity: "0" },
        },
      },
      animation: {
        blink: "blink 0.9s infinite",
        "fade-up": "fadeUp .35s ease both",
        ticker: "ticker 36s linear infinite",
        glowPulse: "glowPulse 4s ease-in-out infinite",
        ringPing1: "ringPing 4s ease-out infinite",
        ringPing2: "ringPing 4s ease-out 1s infinite",
        ringPing3: "ringPing 4s ease-out 2s infinite",
        ringPing4: "ringPing 4s ease-out 3s infinite",
      },
    },
  },
  plugins: [],
};

export default config;
