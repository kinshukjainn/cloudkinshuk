import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dev Tools - Cloudkinshuk",
  description: "A little overview of the development tools and stack I use.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
