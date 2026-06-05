import type { Metadata } from "next";
import { Syne, Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import EasterEgg from "@/components/EasterEgg";
import { ObsidianShader } from "@/components/ObsidianShader";
import { SignalTrace } from "@/components/SignalTrace";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-bricolage",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohneesh — Full Stack Developer",
  description:
    "23-year-old software developer building innovative web solutions. Full Stack Developer & Founder @ Cythical Labs, India.",
  keywords: ["Mohneesh", "Cyth", "Full Stack Developer", "Cythical Labs", "Next.js"],
  authors: [{ name: "Mohneesh Naidu", url: "https://cyth.dev" }],
  openGraph: {
    title: "Mohneesh — Full Stack Developer",
    description: "Full Stack Developer & Founder @ Cythical Labs",
    url: "https://cyth.dev",
    siteName: "cyth.dev",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohneesh — Full Stack Developer",
    description: "Full Stack Developer & Founder @ Cythical Labs",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${bricolage.variable}`}>
      <head>
        <script
          async
          crossOrigin="anonymous"
          src="https://tweakcn.com/live-preview.min.js"
        />
      </head>
      <body>
        <ObsidianShader />
        <SignalTrace />
        <Nav />
        <main style={{ paddingTop: "60px" }}>{children}</main>
        <EasterEgg />
      </body>
    </html>
  );
}
