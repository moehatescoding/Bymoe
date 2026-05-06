import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Zenith Commerce palette from bymoe.stitchflow
        "on-secondary-fixed": "#002109",
        "secondary-container": "#5dfd8a",
        "inverse-surface": "#313030",
        "on-primary-fixed": "#1b1b1d",
        "on-primary-container": "#868587",
        "surface-variant": "#e5e2e1",
        "inverse-primary": "#c8c6c8",
        tertiary: "#060200",
        primary: "#030304",
        "on-error": "#ffffff",
        "primary-fixed-dim": "#c8c6c8",
        outline: "#77767b",
        "inverse-on-surface": "#f4f0ef",
        "surface-bright": "#fdf8f8",
        secondary: "#006d2f",
        "secondary-fixed": "#66ff8e",
        "on-surface": "#1c1b1b",
        "surface-container-lowest": "#ffffff",
        "error-container": "#ffdad6",
        "surface-container-highest": "#e5e2e1",
        "surface-dim": "#ddd9d9",
        "on-surface-variant": "#46464a",
        "on-error-container": "#93000a",
        "on-secondary": "#ffffff",
        "on-primary": "#ffffff",
        "surface-tint": "#5f5e60",
        surface: "#fdf8f8",
        "primary-container": "#1d1d1f",
        "surface-container-low": "#f7f3f2",
        "primary-fixed": "#e4e2e4",
        "on-secondary-fixed-variant": "#005322",
        "on-tertiary-fixed": "#2d1600",
        "on-background": "#1c1b1b",
        "surface-container": "#f1edec",
        "outline-variant": "#c7c6ca",
        error: "#ba1a1a",
        "on-tertiary": "#ffffff",
        "tertiary-container": "#2f1700",
        "tertiary-fixed-dim": "#ffb874",
        "on-tertiary-fixed-variant": "#6a3b00",
        "on-primary-fixed-variant": "#474649",
        "tertiary-fixed": "#ffdcbf",
        "on-tertiary-container": "#c37100",
        "secondary-fixed-dim": "#3de273",
        "surface-container-high": "#ebe7e7",
        "on-secondary-container": "#007232",
        background: "#fdf8f8",
        // Brand specific
        "wa-green": "#25D366",
        "wa-green-dark": "#20bd5a",
        "sale-orange": "#FF9500",
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        full: "9999px",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-xl": [
          "56px",
          { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "600" },
        ],
        "headline-lg": [
          "32px",
          { lineHeight: "1.2", letterSpacing: "-0.01em", fontWeight: "600" },
        ],
        "headline-md": [
          "24px",
          { lineHeight: "1.3", letterSpacing: "0", fontWeight: "600" },
        ],
        "body-lg": [
          "19px",
          { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "400" },
        ],
        "body-md": [
          "16px",
          { lineHeight: "1.5", letterSpacing: "0.01em", fontWeight: "400" },
        ],
        "label-sm": [
          "12px",
          { lineHeight: "1.0", letterSpacing: "0.05em", fontWeight: "500" },
        ],
      },
      maxWidth: {
        "container-max": "1200px",
      },
      spacing: {
        "section-padding": "120px",
        "margin-desktop": "64px",
        "card-gap": "32px",
        gutter: "24px",
        base: "8px",
      },
      boxShadow: {
        card: "0px 10px 30px rgba(0,0,0,0.04)",
        "card-hover": "0px 20px 40px rgba(0,0,0,0.08)",
        modal: "0px 24px 80px rgba(0,0,0,0.12)",
        sticky: "0px 12px 40px rgba(0,0,0,0.06)",
      },
      backdropBlur: {
        nav: "24px",
      },
      keyframes: {
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "slide-up": {
          from: { transform: "translateY(20px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        "slide-in-right": "slide-in-right 0.3s cubic-bezier(0.4,0,0.2,1)",
        "fade-in": "fade-in 0.2s ease",
        "slide-up": "slide-up 0.4s cubic-bezier(0.4,0,0.2,1)",
      },
    },
  },
  plugins: [],
};

export default config;
