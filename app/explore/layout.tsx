import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://cloudkinshuk.in/blogs"),

  title: "Explore | Cloudkinshuk.in",
  description: "Know about kinshuk jain's latest interests",

  icons: {
    icon: [
      { url: "/blogsfavicon.ico", type: "image/x-icon" },
      { url: "/blogslogo.png", type: "image/png" },
    ],
    shortcut: "/blogsfavicon.ico",
    apple: [
      {
        url: "/blogslogo.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },

  openGraph: {
    title: "Explore | Cloudkinshuk.in",
    description: "Explore about  kinshuk jain's latest interest",
    url: "https://cloudkinshuk.in/explore",
    siteName: "Explore || Cloudkinshuk",
    images: [
      {
        url: "/blogslogo.png",
        width: 1200,
        height: 630,
        alt: "Explore cloudkinshuk - Kinshuk Jain",
        type: "image/png",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Explore | Cloudkinshuk.in",
    description: "know about kinshuk jain's thoughts and interests",
    images: ["/blogslogo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ExploreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        min-h-screen bg-white text-[#d6d1c6]
        selection:bg-[#d0a869] selection:text-[#0d0d0c]
      "
    >
      {/*
        Thin pass-through shell. The blog feed and article pages
        define their own inner `max-w` reading columns (680px),
        so this wrapper stays unconstrained to avoid double
        gutters. Padding is only here as a fallback for any page
        that doesn't supply its own.
      */}
      <main className="mx-auto w-full px-0 py-0">{children}</main>
    </div>
  );
}
