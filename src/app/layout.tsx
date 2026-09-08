import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jai Lakhmani — Full Stack AI Engineer",
  description: "Full Stack AI Engineer shipping real-time SaaS and RAG-powered AI products with Next.js, real-time systems, and AI integrations.",
  keywords: [
    "Jai Lakhmani",
    "Full Stack AI Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "TypeScript",
    "RAG",
    "AI SDK",
    "SaaS",
    "Software Engineer",
  ],
  authors: [{ name: "Jai Lakhmani" }],
  creator: "Jai Lakhmani",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jailakhmani.com",
    title: "Jai Lakhmani — Full-Stack Developer",
    description: "Full-stack developer shipping real-time SaaS and RAG-powered AI products.",
    siteName: "Jai Lakhmani Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jai Lakhmani — Full-Stack Developer",
    description: "Full-stack developer shipping real-time SaaS and RAG-powered AI products.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${geistSans.variable} ${geistMono.variable} scroll-smooth`}>
      <body className="min-h-screen bg-[#0a0a0a] text-zinc-50 font-sans antialiased selection:bg-neon/20 selection:text-neon">
        {children}
      </body>
    </html>
  );
}
