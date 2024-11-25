import { Suspense } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Github, Linkedin, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { container } from '@/lib/utils'
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
import { MotionDiv, MotionSpan, MotionA } from '@/components/motion-wrapper'

// Create a Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function HomePage() {
  unstable_noStore()
  const { data: home } = await supabase.from('home_content').select('*').single()

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
        <main className="relative">
          {/* Hero Section */}
          <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-subtle bg-noise">
            <div className="absolute inset-0 bg-dot-pattern opacity-[0.3]" />
            <div className={`${container} relative z-10`}>
              <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto pt-20 pb-32 animate-fadeInUp">
                {/* Profile Image with Glow Effect */}
                <div className="relative mb-12">
                  <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-30" />
                  <div className="relative w-40 h-40">
                    {defaultHome.avatar_url && (
                      <Image
                        src={defaultHome.avatar_url}
                        alt={defaultHome.name}
                        fill
                        className="rounded-full object-cover border-4 border-white shadow-2xl"
                        priority
                      />
                    )}
                  </div>
                </div>

                {/* Name and Role with Modern Typography */}
                <div className="space-y-6 mb-12">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900">
                    {defaultHome.name}
                  </h1>
                  <h2 className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500">
                    {defaultHome.role}
                  </h2>
                </div>

                {/* Summary with Improved Typography */}
                <div className="max-w-3xl space-y-8 mb-16">
                  <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                    {defaultHome.summary}
                  </p>
                  {defaultHome.long_summary && (
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {defaultHome.long_summary}
                    </p>
                  )}
                </div>

                {/* Modern CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-16">
                  <Button
                    size="lg"
                    className="group relative px-8 py-6 text-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    asChild
                  >
                    <Link href="/admin/home">
                      Set Up Your Profile
                      <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </div>

                {/* Social Links with Modern Icons */}
                {defaultHome.social_links && Object.keys(defaultHome.social_links).length > 0 && (
                  <div className="flex items-center gap-8">
                    {Object.entries(defaultHome.social_links).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url as string}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group p-3 rounded-xl hover:bg-gray-100 transition-all duration-300"
                      >
                        {platform === 'github' && (
                          <Github className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                        )}
                        {platform === 'linkedin' && (
                          <Linkedin className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                        )}
                        {platform === 'twitter' && (
                          <Twitter className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                        )}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-white" />
          </section>

          {/* Projects Section with Modern Styling */}
          <section id="projects" className="relative py-20 bg-white">
            <div className="absolute inset-0 bg-grid-light opacity-50" />
            <div className="relative">
              <Suspense fallback={<ProjectsLoading />}>
                <ProjectsSection />
              </Suspense>
            </div>
          </section>

          {/* About Section with Gradient Background */}
          <section id="about" className="relative py-20 bg-mesh-gradient">
            <div className="absolute inset-0 bg-noise opacity-[0.15]" />
            <div className="relative">
              <Suspense fallback={<AboutLoading />}>
                <AboutSection />
              </Suspense>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="relative py-20 bg-gradient-subtle">
            <div className="absolute inset-0 bg-dot-pattern opacity-[0.2]" />
            <div className="relative">
              <Suspense fallback={<ContactLoading />}>
                <ContactSection />
              </Suspense>
            </div>
          </section>
        </main>
      )
    }
  }

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.1]" />
          <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-white/80" />
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {['</', '{}', '/>', '()', '[]', '=>'].map((symbol, index) => (
              <div
                key={index}
                className="absolute text-gray-200/30 font-mono animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${index * 0.5}s`,
                  fontSize: `${Math.random() * 20 + 20}px`,
                }}
              >
                {symbol}
              </div>
            ))}
          </div>
        </div>

        <div className={`${container} relative z-10`}>
          <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto pt-20 pb-32">
            {/* Profile Image with Enhanced Glow Effect */}
            <MotionDiv 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="relative mb-12 group"
            >
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-violet-600 rounded-full blur opacity-30 group-hover:opacity-40 transition duration-500" />
              <div className="relative">
                <div className="w-40 h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden">
                  {home.avatar_url && (
                    <Image
                      src={home.avatar_url}
                      alt={home.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                      priority
                    />
                  )}
                </div>
                {/* Orbit Animation */}
                <div className="absolute -inset-8 border-2 border-dashed border-gray-200/30 rounded-full animate-spin-slow" />
              </div>
            </MotionDiv>

            {/* Name with Animated Gradient */}
            <MotionSpan 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6 mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                <span className="inline-block animate-gradient bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-blue-600 to-violet-600 bg-300% pb-2">
                  {home.name}
                </span>
              </h1>
              <div className="flex items-center justify-center gap-2 text-xl md:text-2xl font-medium text-gray-600">
                {home.role.split('|').map((role: string, index: number) => (
                  <span key={index} className="inline-flex items-center">
                    {index > 0 && <span className="mx-2 text-blue-600">•</span>}
                    <MotionSpan
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                    >
                      {role.trim()}
                    </MotionSpan>
                  </span>
                ))}
              </div>
            </MotionSpan>

            {/* Summary with Staggered Animation */}
            <MotionSpan 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-3xl space-y-8 mb-16"
            >
              <p className="text-xl md:text-2xl text-gray-700 leading-relaxed font-medium">
                {home.summary}
              </p>
              {home.long_summary && (
                <p className="text-lg text-gray-600 leading-relaxed">
                  {home.long_summary}
                </p>
              )}
            </MotionSpan>

            {/* CTA Buttons with Hover Effects */}
            <MotionSpan 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 mb-16"
            >
              <Button
                size="lg"
                className="group relative px-8 py-6 text-lg overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                asChild
              >
                <Link href="#projects">
                  <span className="relative z-10 flex items-center">
                    View My Work
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="group px-8 py-6 text-lg border-2 rounded-2xl hover:bg-gray-50/50 transition-all duration-300 hover:scale-105"
                asChild
              >
                <Link href="#contact">
                  Let's Talk
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </MotionSpan>

            {/* Social Links with Enhanced Hover Effects */}
            {home.social_links && Object.keys(home.social_links).length > 0 && (
              <MotionDiv 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex items-center gap-8"
              >
                {Object.entries(home.social_links).map(([platform, url], index) => (
                  <MotionA
                    key={platform}
                    href={url as string}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 rounded-xl hover:bg-gray-50 transition-all duration-300"
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    {platform === 'github' && (
                      <Github className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                    )}
                    {platform === 'linkedin' && (
                      <Linkedin className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                    )}
                    {platform === 'twitter' && (
                      <Twitter className="h-6 w-6 text-gray-700 group-hover:text-blue-600 transition-colors" />
                    )}
                  </MotionA>
                ))}
              </MotionDiv>
            )}
          </div>
        </div>
      </section>

      {/* Projects Section with Modern Styling */}
      <section id="projects" className="relative py-20 bg-white">
        <div className="absolute inset-0 bg-grid-light opacity-50" />
        <div className="relative">
          <Suspense fallback={<ProjectsLoading />}>
            <ProjectsSection />
          </Suspense>
        </div>
      </section>

      {/* About Section with Gradient Background */}
      <section id="about" className="relative py-20 bg-mesh-gradient">
        <div className="absolute inset-0 bg-noise opacity-[0.15]" />
        <div className="relative">
          <Suspense fallback={<AboutLoading />}>
            <AboutSection />
          </Suspense>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20 bg-gradient-subtle">
        <div className="absolute inset-0 bg-dot-pattern opacity-[0.2]" />
        <div className="relative">
          <Suspense fallback={<ContactLoading />}>
            <ContactSection />
          </Suspense>
        </div>
      </section>
    </main>
  )
}
