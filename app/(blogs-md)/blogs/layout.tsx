import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Read our latest thoughts and articles.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white text-[#1f1f1f] selection:bg-[#d3e3fd] selection:text-[#0842a0] dark:bg-[#1f1f1f] dark:text-[#e3e3e3] dark:selection:bg-[#004a77] dark:selection:text-[#d3e3fd]">
      {/* 
        Material 3 reading column — centered, comfortable line length,
        generous vertical rhythm matching Google's content spacing.
      */}
      <main className="mx-auto max-w-[768px] px-6 py-12 md:py-20 lg:px-8">
        {children}
      </main>
    </div>
  );
}
