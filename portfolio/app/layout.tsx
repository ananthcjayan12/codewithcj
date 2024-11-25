import { Inter, Plus_Jakarta_Sans } from 'next/font/google'
import { Navbar } from '@/components/navigation/navbar'
import { ScrollToTop } from '@/components/ui/scroll-to-top'
import { Toaster } from 'sonner'
import './globals.css'
import { FloatingSocial } from '@/components/ui/floating-social'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Fetch contact data
  const { data: home } = await supabase
    .from('home_content')
    .select('social_links, contact_email, contact_phone')
    .single()

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
          <FloatingSocial data={home || {}} />
          <Toaster position="bottom-right" />
        </div>
      </body>
    </html>
  )
}
