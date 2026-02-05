import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Experience with UPPTCL Internship Program - Cloudkinshuk",
  description:
    "Sharing my journey and learnings from the UPPTCL Internship Program, highlighting key experiences and skills gained during the internship.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
