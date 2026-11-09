import type { Metadata } from "next";

export const metadata: Metadata = {
  title: " Blogs | Cloudkinshuk",
  description: "Read our latest thoughts and articles.",
  icons: {
    icon: [
      {
        url: "/blogslogo.png",
        type: "image/png",
      },
    ],
  },
  openGraph: {
    title: " Blogs | Cloudkinshuk.in",
    description: "Kinshuk Jain's portfolio and blog.",
    images: ["/blogslogo.png"],
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
