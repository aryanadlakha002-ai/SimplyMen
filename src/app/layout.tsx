import type { Metadata } from "next";
import { DM_Serif_Display, Manrope } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

const dmSerif = DM_Serif_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SimplyMen — Simple care for what matters most",
  description:
    "Clinically validated assessments and doctor-backed treatments for erectile dysfunction and premature ejaculation. Confidential, discreet, and effective.",
  keywords: [
    "erectile dysfunction",
    "premature ejaculation",
    "men's sexual health",
    "ED treatment",
    "PE treatment",
    "online consultation",
    "SimplyMen",
  ],
  openGraph: {
    title: "SimplyMen — Simple care for what matters most",
    description:
      "Take a free clinically validated assessment and get personalized treatment recommendations.",
    url: "https://simplymen.care",
    siteName: "SimplyMen",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${dmSerif.variable} ${manrope.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col font-body">{children}</body>
      </html>
    </ClerkProvider>
  );
}
