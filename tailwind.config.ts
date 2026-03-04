// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add your custom font here
        inter: "var(--font-inter) , sans-serif",
        ptSans: "var(--font-pt-sans) , sans-serif",
        workSans: "var(--font-work-sans) , sans-serif",
        alegreya: "var(--font-alegreya) , serif",
        lucidaSans: "var(--font-lucida) , sans-serif",
      },
    },
  },
  plugins: [],
};
export default config;
