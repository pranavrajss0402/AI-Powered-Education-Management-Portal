/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neutral canvas — cool paper, not the AI-cliché warm cream
        canvas: "#F5F6F8",
        surface: "#FFFFFF",
        ink: {
          900: "#1C2130",
          700: "#3A4152",
          500: "#6B7280",
          300: "#A0A6B1",
        },
        line: "#E7E9EE",
        // Primary — deep academic teal, calm and confident (not SaaS blue)
        teal: {
          50: "#EAF3F2",
          100: "#CFE3E1",
          400: "#3E7C79",
          500: "#2A6664",
          600: "#215250",
          700: "#183C3B",
        },
        // Accent — warm ochre for "needs attention", never alarming
        amber: {
          50: "#FBF2E5",
          100: "#F3DFB8",
          400: "#D79A45",
          500: "#C08636",
          600: "#9C6B29",
        },
        // Positive — soft sage for progress and good news
        sage: {
          50: "#EDF3EC",
          100: "#D3E3D0",
          400: "#6F9A6C",
          500: "#557F53",
        },
        // Alert — muted clay-red, only for things that truly need it
        clay: {
          50: "#FBEEEC",
          400: "#C06355",
          500: "#A54E42",
        },
      },
      fontFamily: {
        display: ["Lora", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "monospace"],
      },
      borderRadius: {
        xl: "14px",
        "2xl": "18px",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(28, 33, 48, 0.04), 0 4px 12px rgba(28, 33, 48, 0.04)",
        card: "0 1px 3px rgba(28, 33, 48, 0.06), 0 8px 24px rgba(28, 33, 48, 0.05)",
      },
    },
  },
  plugins: [],
}

