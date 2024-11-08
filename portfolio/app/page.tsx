import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { container, pageWrapper } from "@/lib/utils"

// Create a Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

export default async function HomePage() {
  // Fetch home content and featured projects
  const { data: home } = await supabase
    .from('home_content')
    .select('*')
    .single()

  const { data: featuredProjects } = await supabase
    .from('projects')
    .select('*')
    .in('id', home?.featured_project_ids || [])
    .eq('status', 'published')
    .order('display_order', { ascending: true })

  return (
    <main className={pageWrapper}>
      <div className={container}>
        {/* Hero Section */}
        <section className="py-20 text-center space-y-8">
          <h1 className="text-4xl md:text-6xl font-bold max-w-3xl mx-auto">
            {home?.hero_title}
          </h1>
          {home?.hero_subtitle && (
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              {home.hero_subtitle}
            </p>
          )}
          {home?.cta_text && home?.cta_link && (
            <Button size="lg" asChild>
              <Link href={home.cta_link}>
                {home.cta_text}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          )}
        </section>

        {/* Featured Projects */}
        {featuredProjects && featuredProjects.length > 0 && (
          <section className="py-20">
            <div className="space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold">Featured Projects</h2>
                <p className="text-muted-foreground">
                  Some of my notable works
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project) => (
                  <Card key={project.id} className="flex flex-col">
                    <CardContent className="pt-6 flex-grow">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex flex-wrap gap-2">
                            {project.tags?.map((tag: string) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <h3 className="font-semibold text-xl">
                            {project.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-3">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4">
                      <Button variant="outline" className="w-full" asChild>
                        <Link href={`/projects/${project.slug}`}>
                          Learn More
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <Button variant="outline" size="lg" asChild>
                  <Link href="/projects">
                    View All Projects
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

// Force static rendering
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour
