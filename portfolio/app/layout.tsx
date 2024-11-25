import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/navigation/navbar'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { Toaster } from 'sonner'
import './globals.css'
import { FloatingSocial } from '@/components/ui/floating-social'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jakarta',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable} scroll-smooth`}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="modern-grid-bg fixed inset-0 z-0" />
        <div className="bg-shapes">
          <div className="bg-shape" />
          <div className="bg-shape" />
          <div className="bg-shape" />
        </div>

        <div className="relative z-1">
          <Navbar />
          <main className="flex-1">{children}</main>
          <ScrollToTop />
          <FloatingSocial />
          <Toaster position="bottom-right" />
        </div>
      </body>
    </html>
  )
}
