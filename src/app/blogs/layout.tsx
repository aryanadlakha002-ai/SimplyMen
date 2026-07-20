import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Men's Sexual Health Blog | SimplyMen",
  description:
    "Expert articles on erectile dysfunction, premature ejaculation, testosterone, and male sexual wellness. Evidence-based guidance from certified specialists.",
  keywords: [
    "erectile dysfunction",
    "premature ejaculation",
    "men's sexual health",
    "testosterone",
    "ED treatment",
    "PE treatment",
    "male wellness",
    "sexual health tips",
  ],
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
