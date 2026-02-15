import type { Metadata } from "next";
import { Inter, Alegreya, Google_Sans, IBM_Plex_Serif } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

// 👇 1. Configure Google Sans
export const googleSans = Google_Sans({
  weight: ["400", "500", "600", "700"],
  variable: "--font-google-sans",
  subsets: ["latin"],
  display: "swap", // Recommended for better loading performance
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
    <html lang="en">
      <body
        className={`${inter.variable} ${alegreya.variable} ${googleSans.variable} ${ibmplex_serif.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
