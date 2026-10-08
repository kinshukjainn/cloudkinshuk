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
        ptSans: "var(--font-pt-sans) , sans-serif",
        alegreya: "var(--font-alegreya) , serif",
        workSans: "var(--font-work-sans) , sans-serif",
        geistMono: "var(--font-geist-mono) , monospace",
        dmSans: "var(--font-dm-sans) , sans-serif",
        rubik: "var(--font-rubik) sans-serif",
        cabinSketch: "var(--font-cabin-sketch) , cursive",
        inter: "var(--font-inter), sans-serif",
        openSans: "var(--font-open-sans) , cursive",
        roboto: "var(--font-roboto) sans-serif",
        sourceSerif: "var(--font-source-serif) , serif",
        ubuntuSans: "var(--font-ubuntu-sans) sans-serif, ",
        robotoSlab: "var(--font-roboto-slab), serif",
        VarelaRound: "var(--font-varela-round) , sans-serif",
        verdana: "var(--font-verdana) , sans-serif",
        publicsans: ["var(--font-public-sans)", "sans-serif"],
        robotoserif: "var(--font-roboto-serif), serif",
        ibmPlexSans: "var(--font-ibm-plex-sans) , sans-serif",
        lucidaSans: "var(--font-lucida-sans) , sans-serif",
      },
    },
  },
  plugins: [typography],
};
export default config;
