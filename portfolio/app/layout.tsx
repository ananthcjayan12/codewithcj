import { Inter } from 'next/font/google'
import { Navbar } from '@/components/navigation/navbar'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative">
          <Navbar />
          {children}
          <ScrollToTop />
          <Toaster position="bottom-right" />
        </div>
      </body>
    </html>
  )
}
