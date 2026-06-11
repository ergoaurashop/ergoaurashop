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
        // Desert Luxury palette
        primary: {
          DEFAULT: "#1A1614",
          light: "#2E2825",
          dark: "#0D0B0A",
        },
        gold: {
          DEFAULT: "#C9A962",
          light: "#DFC48A",
          dark: "#A88A42",
          muted: "#C9A96233",
        },
        sand: {
          DEFAULT: "#F5F1EB",
          dark: "#EAE3D5",
          darker: "#D8CFBF",
        },
        white: "#FFFFFF",
        "off-white": "#FDFBF8",
        error: "#EF4444",
        success: "#059669",
        amber: "#D97706",
        blue: "#1E40AF",
        // Keep legacy apple mapping for backward compat during migration
        apple: {
          black: "#1A1614",
          white: "#FFFFFF",
          bg: "#F5F1EB",
          "text-primary": "#1A1614",
          "text-secondary": "#86868B",
          accent: "#C9A962",
          border: "#D8CFBF",
          success: "#059669",
          error: "#EF4444",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        playfair: ["Playfair Display", "Georgia", "serif"],
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        full: "9999px",
        // Legacy Apple mapping
        apple: "16px",
        "apple-sm": "8px",
        "apple-input": "10px",
        "apple-modal": "16px",
      },
      boxShadow: {
        base: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
        md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
        xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
        gold: "0 4px 24px 0 rgb(201 169 98 / 0.25)",
        "gold-lg": "0 8px 40px 0 rgb(201 169 98 / 0.35)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "slide-right": "slideRight 0.3s ease-out",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        shimmer: "shimmer 1.8s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideRight: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
