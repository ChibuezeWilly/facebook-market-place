import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"], // No need for index.html in Next.js
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
      },
      screens: {
        sm: "500px",
        md: "800px",
        lg: "980px",
        xl: "1200px",
        "2xl": "1400px",
        "3xl": "1600px",
      },
    },
  },
  plugins: [],
};

export default config;
