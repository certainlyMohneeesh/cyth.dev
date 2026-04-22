import type { Metadata } from "next";
import { Cormorant_Garamond, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import EasterEgg from "@/components/EasterEgg";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-jetbrains",
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
    <html lang="en" className={`${cormorant.variable} ${jetbrains.variable}`}>
      <body>
        <Nav />
        <main style={{ paddingTop: "60px" }}>{children}</main>
        <EasterEgg />
      </body>
    </html>
  );
}
