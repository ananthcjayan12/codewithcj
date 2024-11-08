import { createClient } from '@supabase/supabase-js'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { container, pageWrapper } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { 
  GraduationCap, 
  Trophy, 
  Briefcase,
  Code2,
  Building,
  CalendarDays,
  ScrollText
} from "lucide-react"
import { unstable_noStore } from 'next/cache'

// Create a Supabase client
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

export default async function AboutPage() {
  unstable_noStore()
  
  const { data: about } = await supabase
    .from('about_content')
    .select('*')
    .single()

  if (!about) {
    return null
  }

  return (
    <main className={pageWrapper}>
      <div className={container}>
        <div className="mx-auto max-w-4xl space-y-16 py-16">
          {/* About Section */}
          <section>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
              <p className="text-muted-foreground">Get to know more about my background and expertise</p>
            </div>
            <Separator className="my-8" />
            <div className="prose dark:prose-invert max-w-none">
              {about.bio}
            </div>
          </section>

          {/* Skills Section */}
          <section>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Code2 className="h-5 w-5 text-primary" />
                <h2 className="text-2xl font-semibold tracking-tight">Technical Skills</h2>
              </div>
              <p className="text-muted-foreground">Technologies and tools I work with</p>
            </div>
            <div className="mt-6 grid gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-wrap gap-2">
                    {about.skills.technical.map((skill: string) => (
                      <Badge 
                        key={skill} 
                        variant="secondary"
                        className="px-3 py-1.5 text-sm font-medium"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Experience Section */}
          {about.experience?.length > 0 && (
            <section>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold tracking-tight">Professional Experience</h2>
                </div>
                <p className="text-muted-foreground">My journey in the tech industry</p>
              </div>
              <div className="mt-6 grid gap-6">
                {about.experience.map((exp: any, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            {exp.title}
                          </CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            {exp.company}
                            <span className="text-xs">•</span>
                            <span className="flex items-center gap-1">
                              <CalendarDays className="h-3 w-3" />
                              {exp.duration}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start gap-2">
                        <ScrollText className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {exp.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Education Section */}
          {about.education?.length > 0 && (
            <section>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <GraduationCap className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold tracking-tight">Education</h2>
                </div>
                <p className="text-muted-foreground">Academic background and qualifications</p>
              </div>
              <div className="mt-6 grid gap-6">
                {about.education.map((edu: any, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle>{edu.degree}</CardTitle>
                          <CardDescription className="flex items-center gap-2">
                            {edu.institution}
                            <span className="text-xs">•</span>
                            <span className="flex items-center gap-1">
                              <CalendarDays className="h-3 w-3" />
                              {edu.year}
                            </span>
                          </CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    {edu.description && (
                      <CardContent>
                        <div className="flex items-start gap-2">
                          <ScrollText className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {edu.description}
                          </p>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          )}

          {/* Certifications Section */}
          {about.achievements?.length > 0 && (
            <section>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl font-semibold tracking-tight">Certifications</h2>
                </div>
                <p className="text-muted-foreground">Professional certifications and achievements</p>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {about.achievements.map((achievement: string, index: number) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-start gap-3">
                        <Trophy className="h-4 w-4 text-primary mt-1" />
                        <CardTitle className="text-base font-medium leading-tight">
                          {achievement}
                        </CardTitle>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}

// Force static rendering
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour