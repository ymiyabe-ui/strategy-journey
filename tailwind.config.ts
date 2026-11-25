import type { Config } from "tailwindcss";

/**
 * 世界観：夜の港町〈ノースハーバー〉と、灯台のあかり。
 * night = 夜空 / paper = 羊皮紙のページ / lantern = 灯台のあかり（主役の差し色）
 * sea・coral・sky = ステージごとの差し色
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        night: {
          950: "#060a17",
          900: "#0a1124",
          800: "#101a38",
          700: "#172450",
          600: "#213270",
          500: "#2e4390",
        },
        paper: {
          50: "#fffbf1",
          100: "#fbf4e2",
          200: "#f3e6c6",
          300: "#e8d4a4",
          400: "#d6bb7e",
        },
        ink: {
          900: "#1b1928",
          800: "#2a2739",
          700: "#3b3752",
          600: "#55506d",
          500: "#726d8a",
        },
        lantern: {
          200: "#ffe8b0",
          300: "#ffd67c",
          400: "#ffc247",
          500: "#f5a524",
          600: "#d78608",
        },
        sea: { 300: "#79e1d1", 400: "#3cc9b6", 500: "#1fae9d", 600: "#168a7d" },
        coral: { 300: "#ffb4a8", 400: "#ff8c7c", 500: "#f2695a", 600: "#d6483a" },
        sky: { 300: "#a3cfff", 400: "#74b3ff", 500: "#4a93f0" },
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "Hiragino Sans",
          "Hiragino Kaku Gothic ProN",
          "Yu Gothic UI",
          "Meiryo",
          "sans-serif",
        ],
        serif: [
          "var(--font-serif)",
          "Hiragino Mincho ProN",
          "Yu Mincho",
          "serif",
        ],
      },
      boxShadow: {
        glow: "0 0 28px rgba(255, 194, 71, 0.45)",
        "glow-sm": "0 0 14px rgba(255, 194, 71, 0.35)",
        paper:
          "0 18px 40px -18px rgba(0, 0, 0, 0.65), inset 0 0 0 1px rgba(122, 92, 30, 0.14)",
        card: "0 10px 28px -14px rgba(0, 0, 0, 0.6)",
      },
      keyframes: {
        twinkle: {
          "0%, 100%": { opacity: "0.15", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.15)" },
        },
        floaty: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.9)", opacity: "0.7" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        beam: {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.8" },
        },
      },
      animation: {
        twinkle: "twinkle 3.2s ease-in-out infinite",
        floaty: "floaty 4.5s ease-in-out infinite",
        pulseRing: "pulseRing 2.2s ease-out infinite",
        shimmer: "shimmer 3.5s linear infinite",
        beam: "beam 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
