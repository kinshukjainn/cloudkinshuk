import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://cloudkinshuk.in/blogs"),

  title: "Blogs | Cloudkinshuk.in",
  description: "Read kinshuk jain's latest blogs and thoughts",

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
    title: "Blogs | Cloudkinshuk.in",
    description: "Read kinshuk jain's latest blogs and thoughts",
    url: "https://cloudkinshuk.in/blogs",
    siteName: "Blogs || Cloudkinshuk",
    images: [
      {
        url: "/blogslogo.png",
        width: 1200,
        height: 630,
        alt: "Blogs cloudkinshuk - Kinshuk Jain",
        type: "image/png",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Blogs | Cloudkinshuk.in",
    description: "Read kinshuk jain's thoughts and blogs.",
    images: ["/blogslogo.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        min-h-screen bg-[#0d0d0c] text-[#d6d1c6]
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
