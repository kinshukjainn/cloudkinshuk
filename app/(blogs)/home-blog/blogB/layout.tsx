import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Linux is go to `os` for development- Cloudkinshuk",
  description:
    "An overview of why Linux is the preferred operating system for developers, covering its features, flexibility, and community support.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
