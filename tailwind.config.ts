import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: "#f7f5ef",
        graphite: "#13233a",
        ink: "#27456d",
        cyan: "#6f88b8",
        platinum: "#13233a",
        gold: "#9c7a2b"
      },
      boxShadow: {
        glow: "0 24px 80px rgba(0, 0, 0, 0.35)",
        panel: "0 18px 60px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
