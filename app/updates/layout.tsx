import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Updates - Cloudkinshuk",
  description:
    "All updates and news about CloudKinshuk's projects and developments.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={` antialiased`}>{children}</section>;
}
