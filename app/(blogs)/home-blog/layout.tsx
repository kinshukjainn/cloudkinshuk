import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import Blogheader from "../../components/Blogheader";

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

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
    <section className={`${firaSans.className} antialiased`}>
      <Blogheader />
      {children}
    </section>
  );
}
