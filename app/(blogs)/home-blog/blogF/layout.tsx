import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Understand AWS Shared Responsibility Model - Cloudkinshuk",
  description:
    "An overview of AWS's Shared Responsibility Model, explaining the division of security and compliance responsibilities between AWS and its customers.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
