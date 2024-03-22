import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        Asia: "rgba(96, 71, 236, 1)",
        Europe: "rgba(166, 109, 232, 1)",
        Africa: "rgba(185, 90, 111, 1)",
        Oceania: "rgba(224, 128, 44, 1)",
        Americas: "rgba(253, 205, 70, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
