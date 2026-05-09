import type { Metadata } from "next";
import {
  Inter,
  Alegreya,
  Roboto_Serif,
  IBM_Plex_Serif,
  Roboto_Slab,
  PT_Sans,
  Geist_Mono,
  Roboto,
  Ubuntu_Sans,
  Public_Sans,
  Rubik,
  Work_Sans,
} from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import localFont from "next/font/local";

export const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
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

export const robotoSerif = Roboto_Serif({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-roboto-serif",
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

export const metadata: Metadata = {
  title: "Home | Cloudkinshuk",
  description: "Kinshuk Jain's personal portfolio and blog site.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-google-analytics-opt-out="">
      <body
        className={`${inter.variable} ${rubik.variable} ${verdana.variable} ${publicSans.variable} ${geistMono.variable} ${robotoSerif.variable} ${roboto.variable} ${lucideSans.variable} ${ubuntuSans.variable} ${ptSans.variable} ${workSans.variable} ${robotoSlab.variable} ${alegreya.variable}  ${ibmplex_serif.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
