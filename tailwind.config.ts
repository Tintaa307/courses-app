import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: "#DC143C",
        orange: "#ff8200",
        transparent: "transparent",
        black: "#000",
        white: "#f2f2f2",
        bg_color: "#0e0b13",
        input_color: "#26232a",
        input_color_dark: "#1e1c22",
        error_color: "#e5484d",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "main-gradient": "linear-gradient(82deg,#DC143C 19%,#ff8200);",
      },
    },
  },
  plugins: [],
}
export default config
