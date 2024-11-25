import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Navbar } from "@/components/navigation/navbar";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ScrollToTop } from "@/components/ui/scroll-to-top";
import { defaultMetadata } from "@/config/metadata";
import { Toaster } from "sonner";
import { SmoothNav } from "@/components/smooth-nav"
import { Header } from "@/components/layout/header"
import { cn } from "@/lib/utils"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  ...defaultMetadata,
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <SmoothNav />
          <div className="relative min-h-screen">
            {children}
            <ScrollToTop />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

// Force static rendering at the root
export const dynamic = 'force-static'
export const revalidate = 3600
