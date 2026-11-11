import type { Metadata } from "next";
import {
  Inter,
  IBM_Plex_Serif,
  Roboto_Slab,
  PT_Sans,
  Varela_Round,
  Source_Serif_4,
  Roboto,
  IBM_Plex_Sans,
  DM_Sans,
  Cabin_Sketch,
  Ubuntu_Sans,
  Public_Sans,
  Rubik,
  Work_Sans,
  Alegreya,
  Open_Sans,
  Geist,
} from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const segoeui = localFont({
  src: [
    {
      path: "../public/fonts/segoeui.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-segoe-ui",
  display: "swap",
});

const cabinSketch = Cabin_Sketch({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-cabin-sketch", // optional
});

export const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-ibm-plex-sans",
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-public-sans",
});
const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-pt-sans",
});

export const lucideSans = localFont({
  src: "../public/fonts/lucida-sans-unicode.woff2",
  variable: "--font-lucida-sans",
  weight: "400",
  display: "swap",
});
export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  variable: "--font-open-sans",
});
export const verdana = localFont({
  src: "../public/fonts/Verdana.woff2",
  variable: "--font-verdana",
  weight: "400",
  style: "normal",
  display: "swap",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-work-sans", // optional (for CSS variables)
  display: "swap",
});

const alegreya = Alegreya({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-alegreya",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
});

export const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-roboto-slab", // optional for CSS variable usage
});

const ibmplex_serif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibmplexserif",
  display: "swap",
});

const varelaRound = Varela_Round({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-varela-round",
});

const ubuntuSans = Ubuntu_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"], // choose what you need
  variable: "--font-ubuntu-sans", // optional CSS variable
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "700"],
  variable: "--font-roboto",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-dm-sans",
  display: "swap",
});
export const metadata: Metadata = {
  title: "Blogs | Cloudkinshuk.in",
  description: "Kinshuk Jain's portfolio and blog.",

  icons: {
    icon: [
      {
        url: "/homfavicon.ico",
        type: "image/x-icon",
      },
      {
        url: "/homelogo.png",
        type: "image/png",
      },
    ],
    shortcut: "/homfavicon.ico",
    apple: [
      {
        url: "/homelogo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    title: "Home | Cloudkinshuk.in",
    description: "Kinshuk Jain's portfolio and blog",
    url: "https://cloudkinshuk.in/blogs",
    siteName: "Cloudkinshuk",
    images: [
      {
        url: "/homelogo.png",
        width: 1200,
        height: 630,
        alt: "Cloudkinshuk Homepage",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-google-analytics-opt-out="" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${openSans.variable} ${sourceSerif.variable} ${ibmPlexSans.variable} ${varelaRound.variable} ${rubik.variable} ${dmSans.variable} ${verdana.variable} ${cabinSketch.variable} ${publicSans.variable} ${geistSans.variable}  ${roboto.variable} ${lucideSans.variable} ${ubuntuSans.variable} ${ptSans.variable} ${workSans.variable} ${robotoSlab.variable} ${alegreya.variable}  ${ibmplex_serif.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
