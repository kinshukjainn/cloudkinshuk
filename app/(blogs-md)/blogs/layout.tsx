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
    <div className="min-h-screen bg-white dark:bg-[#1e1e1e] text-neutral-800 dark:text-neutral-300 selection:bg-blue-200 dark:selection:bg-blue-900/50 selection:text-blue-900 dark:selection:text-blue-100">
      {/* 
        A clean, Medium-style centered column layout 
        Max-width keeps line lengths comfortable for reading
      */}
      <main className="mx-auto max-w-[768px] px-6 py-12 md:py-20 lg:px-8">
        {children}
      </main>
    </div>
  );
}
