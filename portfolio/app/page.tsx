import { Suspense } from 'react'
import { HeroSection } from '@/components/sections/hero-section'
import { 
  ProjectsSection, 
  AboutSection, 
  ContactSection,
  ProjectsLoading,
  AboutLoading,
  ContactLoading 
} from '@/components/sections'
import { unstable_noStore } from 'next/cache'
import { createClient } from '@supabase/supabase-js'

// Create a Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function HomePage() {
  unstable_noStore()
  const { data: home } = await supabase.from('home_content').select('*').single()

  return (
    <main className="relative">
      {/* Hero Section with Modern Background */}
      <section className="relative min-h-screen">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Modern Gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-50 via-white to-purple-50" />
          
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 -left-10 w-[500px] h-[500px] bg-blue-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
            <div className="absolute bottom-1/4 -right-10 w-[500px] h-[500px] bg-purple-200/30 rounded-full mix-blend-multiply filter blur-3xl animate-float2" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-200/20 rounded-full mix-blend-multiply filter blur-3xl animate-float3" />
          </div>

          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        </div>

        <HeroSection data={home} />
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/30 to-white" />
        <Suspense fallback={<ProjectsLoading />}>
          <ProjectsSection />
        </Suspense>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-20">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-white to-blue-50/50" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        </div>
        <Suspense fallback={<AboutLoading />}>
          <AboutSection />
        </Suspense>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-indigo-50/20 to-white" />
        <Suspense fallback={<ContactLoading />}>
          <ContactSection />
        </Suspense>
      </section>

      {/* Decorative Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </main>
  )
}
