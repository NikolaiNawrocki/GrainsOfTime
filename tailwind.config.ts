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
          // Primary Black & Deep Dark Accents
          black: "#111111",
          "black-deep": "#080808",
          "black-light": "#1C1C1C",
          "black-muted": "#2C2C2C",

          // Sophisticated Red Accents
          red: "#B4232F",
          "red-bright": "#D63442",
          "red-deep": "#821822",
          "red-subtle": "rgba(180, 35, 47, 0.08)",
          "red-border": "rgba(180, 35, 47, 0.22)",

          // Warm Light Surfaces & Neutrals
          white: "#FAF9F6",
          cream: "#F3F0EA",
          "cream-dark": "#E9E5DD",
          "gray-light": "#F0EFEA",

          // Body Text & Secondary Text
          text: "#121212",
          muted: "#595959",
          subtle: "#8C8C8C",

          // Structural Elements
          border: "#E2E0D8",
          "border-subtle": "#EBE8E1",
          surface: "#FFFFFF",
          "surface-cream": "#F3F0EA",
          "surface-muted": "#F5F3ED",

          // Compatibility aliases (mapped to black so any lingering navy classes render black)
          navy: "#111111",
          "navy-deep": "#080808",
          "navy-light": "#1C1C1C",
          "navy-muted": "#2C2C2C",
          paper: "#FAF9F6",
          "paper-dim": "#F3F0EA",
          "surface-elevated": "#FFFFFF",
          "surface-highlight": "#F0EFEA",
        },
      },
      fontFamily: {
        sans: ["'Urbanist'", "var(--font-sans)", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        serif: ["'Urbanist'", "var(--font-editorial)", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        urbanist: ["'Urbanist'", "sans-serif"],
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
        editorial: "0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)",
        subtle: "0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)",
        accent: "0 8px 30px -4px rgba(180, 35, 47, 0.15)",
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
