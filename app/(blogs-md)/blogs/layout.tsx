import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blogs , Article | Cloudkinshuk",
  description: "Read our latest thoughts and articles.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        min-h-screen bg-[#F7F9FC] text-[#1F1F1F]
        selection:bg-[#D3E3FD] selection:text-[#041E49]
        dark:bg-[#141414] dark:text-[#E3E3E3]
        dark:selection:bg-[#0842A0] dark:selection:text-[#D3E3FD]
      "
    >
      {/* 
        Material 3 Expressive reading column — centred, comfortable
        line length, generous vertical rhythm matching the homepage
        and header surface tokens.
      */}
      <main className="mx-auto max-w-[768px] px-6 py-12 md:py-20 lg:px-8">
        {children}
      </main>
    </div>
  );
}
