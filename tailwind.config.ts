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
          border: "#222220",
          b2: "#2A2A28",
          yellow: { DEFAULT: "#F0BE00", "2": "#FFD000", dim: "#5A4500" },
          red: "#CC2A00",
          green: "#187A38",
          text: "#EAE6D8",
          mid: "#A09888",
          dim: "#484640",
        },
      },
      fontFamily: {
        mono: ["var(--font-share-tech-mono)", "monospace"],
        cond: ["var(--font-barlow-condensed)", "sans-serif"],
        body: ["var(--font-barlow)", "sans-serif"],
        disp: ["var(--font-bebas-neue)", "sans-serif"],
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.1" },
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
