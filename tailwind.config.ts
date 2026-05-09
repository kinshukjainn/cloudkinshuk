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
        ptSans: "var(--font-pt-sans) , sans-serif",
        workSans: "var(--font-work-sans) , sans-serif",
        alegreya: "var(--font-alegreya) , serif",
        robotserif: "var(--font-roboto-serif), serif",
        robotoSlab: "var(--font-roboto-slab), serif",
        rubik: "var(--font-rubik) sans-serif",
        roboto: "var(--font-roboto) sans-serif",
        ubuntuSans: "var(--font-ubuntu-sans) sans-serif, ",
        geistMono: "var(--font-geist-mono) , monospace",
        inter: "var(--font-inter) , sans-serif",
        verdana: "var(--font-verdana) , sans-serif",
        publicsans: ["var(--font-public-sans)", "sans-serif"],
        lucidaSans: "var(--font-lucida-sans) , sans-serif",
      },
    },
  },
  plugins: [],
};
export default config;
