import type { Metadata } from "next";
import {
  Inter,
  Alegreya,
  IBM_Plex_Serif,
  PT_Sans,
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

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-pt-sans",
});

export const lucideSans = localFont({
  src: "../public/fonts/lucida-sans-unicode.woff2",
  variable: "--font-lucida",
  weight: "400",
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

const ibmplex_serif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-ibmplexserif",
  display: "swap",
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
        className={`${inter.variable} ${lucideSans.variable} ${ptSans.variable} ${workSans.variable} ${alegreya.variable}  ${ibmplex_serif.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
