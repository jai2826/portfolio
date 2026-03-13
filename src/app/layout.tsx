import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../provider/theme-provider"; // [!code ++]
import { Navbar } from "@/app/_components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jai Lakhmani | Full Stack Developer", // [!code ++]
  description: "Portfolio of a Full Stack React Developer", // [!code ++]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-200 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-200 h-full w-full max-w-9xl mx-auto items-start  flex flex-col`}>
        <ThemeProvider
          
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
          <Navbar />
          <div className="w-full h-full">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}
