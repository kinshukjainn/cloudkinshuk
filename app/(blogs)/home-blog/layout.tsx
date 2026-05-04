import type { Metadata } from "next";
import Blogheader from "../../components/Blogheader";

export const metadata: Metadata = {
  title: "Blogs - Subject Matter",
  description:
    "A collection of technical blogs on software development, cloud computing, and more.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Added pt-16 (64px) or pt-20 (80px) to push the content down.
    // Adjust this number to exactly match the height of your main header.
    <section className="antialiased bg-[#1e1e1e] pt-32 min-h-screen">
      <Blogheader />
      <main>{children}</main>
    </section>
  );
}
