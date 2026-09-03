// tailwind.config.ts
import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
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
        alegreya: "var(--font-alegreya) , serif",
        dmSans: "var(--font-dm-sans) , sans-serif",
        workSans: "var(--font-work-sans) , sans-serif",
        geistMono: "var(--font-geist-mono) , monospace",
        rubik: "var(--font-rubik) sans-serif",
        cabinSketch: "var(--font-cabin-sketch) , cursive",
        openSans: "var(--font-open-sans) , cursive",
        sourceSerif: "var(--font-source-serif) , serif",
        ubuntuSans: "var(--font-ubuntu-sans) sans-serif, ",
        robotoSlab: "var(--font-roboto-slab), serif",
        verdana: "var(--font-verdana) , sans-serif",
        publicsans: ["var(--font-public-sans)", "sans-serif"],
        inter: "var(--font-inter), sans-serif",
        robotoserif: "var(--font-roboto-serif), serif",
        ibmPlexSans: "var(--font-ibm-plex-sans) , sans-serif",
        roboto: "var(--font-roboto) sans-serif",
        lucidaSans: "var(--font-lucida-sans) , sans-serif",
      },
    },
  },
  plugins: [typography],
};
export default config;
