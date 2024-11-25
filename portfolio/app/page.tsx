import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { container, pageWrapper } from '@/lib/utils'
import { createClient } from '@supabase/supabase-js'
import { unstable_noStore } from 'next/cache'
import { 
  ProjectsSection, 
  AboutSection, 
  ContactSection,
  ProjectsLoading,
  AboutLoading,
  ContactLoading 
} from '@/components/sections'

// Create a Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function HomePage() {
  // Disable caching
  unstable_noStore()

  // Fetch home content
  const { data: home, error } = await supabase
    .from('home_content')
    .select('*')
    .single()

  console.log('Home content:', home)
  console.log('Error if any:', error)

  // Add a default content if no data exists
  if (!home) {
    // Insert default content
    const { data: defaultHome, error: insertError } = await supabase
      .from('home_content')
      .insert([
        {
          name: "Your Name",
          role: "Your Role",
          summary: "A brief summary about yourself",
          long_summary: "A longer description about your work and experience",
          social_links: {}
        }
      ])
      .select()
      .single()

    console.log('Created default home:', defaultHome)
    console.log('Insert error if any:', insertError)

    if (defaultHome) {
      return (
        <main className={pageWrapper}>
          <div className={container}>
            <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">
                {defaultHome.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground mb-8">
                {defaultHome.role}
              </h2>
              <div className="flex gap-4">
                <Button size="lg" asChild>
                  <Link href="/admin/home">
                    Set Up Your Profile
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </main>
      )
    }
  }

  return (
    <main className="relative min-h-screen">
      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center">
        <div className={container}>
          <div className="flex flex-col items-center justify-center text-center space-y-8">
            {/* Profile Image */}
            <div className="relative w-48 h-48 mb-8">
              {home.avatar_url && (
                <Image
                  src={home.avatar_url}
                  alt={home.name}
                  fill
                  className="rounded-full object-cover border-4 border-primary/10 shadow-xl"
                  priority
                />
              )}
            </div>

            {/* Name and Role */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                {home.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-muted-foreground">
                {home.role}
              </h2>
            </div>

            {/* Summary */}
            <div className="max-w-2xl space-y-4">
              <p className="text-lg text-muted-foreground leading-relaxed">
                {home.summary}
              </p>
              {home.long_summary && (
                <p className="text-base text-muted-foreground leading-relaxed">
                  {home.long_summary}
                </p>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-4 pt-4">
              <Button size="lg" asChild>
                <Link href="#projects" scroll={false}>
                  View Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#contact" scroll={false}>
                  Get in Touch
                </Link>
              </Button>
            </div>

            {/* Social Links */}
            {home.social_links && Object.keys(home.social_links).length > 0 && (
              <div className="flex gap-6 mt-8">
                {Object.entries(home.social_links).map(([platform, url]) => (
                  <a
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {platform === 'github' && (
                      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                    )}
                    {platform === 'linkedin' && (
                      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                    )}
                    {platform === 'twitter' && (
                      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    )}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen py-20 bg-muted/50">
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsSection />
        </Suspense>
      </section>

      {/* About Section */}
      <section id="about" className="min-h-screen py-20">
        <Suspense fallback={<AboutLoading />}>
          <AboutSection />
        </Suspense>
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen py-20 bg-muted/50">
        <Suspense fallback={<ContactLoading />}>
          <ContactSection />
        </Suspense>
      </section>
    </main>
  )
}

// Force static rendering
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour
