import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b0b0f",
        paper: "#fffdf5",
        volt: "#c6ff00",
        hot: "#ff2e93",
        grape: "#7c3aed",
        sky: "#38bdf8",
      },
      fontFamily: {
        display: ["Impact", "Haettenschweiler", "Arial Narrow Bold", "sans-serif"],
      },
      boxShadow: {
        pop: "4px 4px 0 0 currentColor",
        "pop-lg": "8px 8px 0 0 currentColor",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
      },
      animation: { marquee: "marquee 25s linear infinite" },
    },
  },
  plugins: [],
};
export default config;
