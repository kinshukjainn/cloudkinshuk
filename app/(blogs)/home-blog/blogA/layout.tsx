import type { Metadata } from "next";

export const metadata: Metadata = {
  title: " How Instagram Is Engineered Under The Hood - Cloudkinshuk",
  description:
    "An in-depth look at Instagram's architecture, scalability, and the technologies that power one of the world's largest social media platforms.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
