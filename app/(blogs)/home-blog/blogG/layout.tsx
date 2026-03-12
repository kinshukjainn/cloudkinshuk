import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Challanges i faced while building m-scada",
  description:
    "An detailed blog on which i am going to explain what kind of challanges i faced while building my college project of final yr",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className={`antialiased`}>{children}</section>;
}
