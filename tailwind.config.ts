import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // jemdoc blues: #527bbd headings, #224b8d links, #022b6d current item.
        brand: {
          50: "#f1f5fb",
          100: "#e1e9f5",
          200: "#c5d4ec",
          300: "#9db6dd",
          400: "#7397cd",
          500: "#527bbd",
          600: "#3f66a8",
          700: "#224b8d",
          800: "#1a3c74",
          900: "#022b6d",
          950: "#011a44",
        },
        // Same scale as brand so brand→accent gradients render flat.
        accent: {
          50: "#f1f5fb",
          100: "#e1e9f5",
          200: "#c5d4ec",
          300: "#9db6dd",
          400: "#7397cd",
          500: "#527bbd",
          600: "#3f66a8",
          700: "#224b8d",
          800: "#1a3c74",
          900: "#022b6d",
          950: "#011a44",
        },
        ink: {
          DEFAULT: "#0b1220",
          soft: "#334155",
          faint: "#64748b",
        },
        editor: {
          bg: "#0d1117",
          panel: "#161b22",
          border: "#21262d",
        },
      },
      fontFamily: {
        sans: ["Georgia", "Times New Roman", "serif"],
        display: ["Georgia", "Times New Roman", "serif"],
        ui: ["system-ui", "-apple-system", "Segoe UI", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      // Flat, square-cornered surfaces — the reference has no cards or shadows.
      borderRadius: {
        md: "2px",
        lg: "2px",
        xl: "3px",
        "2xl": "3px",
        "3xl": "3px",
      },
      boxShadow: {
        card: "none",
        lift: "none",
        glow: "none",
        "glow-lg": "none",
        "inner-line": "inset 0 1px 0 0 rgba(255,255,255,0.06)",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        shimmer: {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "pulse-ring": {
          "0%": { boxShadow: "0 0 0 0 rgba(44,153,206,0.35)" },
          "70%": { boxShadow: "0 0 0 10px rgba(44,153,206,0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(44,153,206,0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        float: "float 6s ease-in-out infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
