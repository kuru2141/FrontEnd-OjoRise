import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
        suit: ["SUIT", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
