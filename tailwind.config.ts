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
        grains: {
          black: "#0A0A0C",
          surface: "#121215",
          "surface-elevated": "#1A1A1F",
          "surface-highlight": "#24242B",
          border: "#26262D",
          "border-subtle": "#1B1B22",
          paper: "#F7F6F2",
          "paper-dim": "#D8D6CF",
          muted: "#989791",
          subtle: "#5E5D58",
          red: "#CC0000",
          "red-bright": "#E61B23",
          "red-deep": "#8B0000",
          "red-subtle": "rgba(204, 0, 0, 0.12)",
          "red-border": "rgba(204, 0, 0, 0.35)",
        },
      },
      fontFamily: {
        serif: ["var(--font-editorial)", "Georgia", "Cambria", "Times New Roman", "serif"],
        sans: ["var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        widest: ".2em",
        archival: ".25em",
        cinematic: ".35em",
      },
      lineHeight: {
        cinematic: "1.05",
      },
      borderRadius: {
        none: "0px",
        sm: "2px",
        DEFAULT: "4px",
        md: "6px",
        lg: "8px",
        full: "9999px",
      },
      boxShadow: {
        editorial: "0 1px 1px rgba(0,0,0,0.4), 0 8px 32px rgba(0,0,0,0.6)",
        accent: "0 0 40px -10px rgba(204, 0, 0, 0.25)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in-up": "fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
