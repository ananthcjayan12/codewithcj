import React, { Suspense } from 'react'
import { Navbar } from "@/components/navigation/navbar"
import { ThemeProvider } from "@/components/theme/theme-provider"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import Loading from './loading'

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="relative min-h-screen">
        <Navbar />
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
        <ScrollToTop />
      </div>
    </ThemeProvider>
  )
}

// Force static rendering
export const dynamic = 'force-static' 