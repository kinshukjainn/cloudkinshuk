import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How AWS Lambda scales seamlessly- Cloudkinshuk",
  description:
    "An overview of how AWS Lambda scales seamlessly, covering its architecture, performance, and best practices for handling high traffic loads.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
