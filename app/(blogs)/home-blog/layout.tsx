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
    <section className={` antialiased bg-[#1c1c1c]`}>
      <Blogheader />
      {children}
    </section>
  );
}
