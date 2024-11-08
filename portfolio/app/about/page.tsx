import { createClient } from '@supabase/supabase-js'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { container, pageWrapper } from "@/lib/utils"
import { Briefcase, GraduationCap, Trophy } from "lucide-react"

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

export default async function AboutPage() {
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
        <div className="mx-auto max-w-4xl space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{about.title}</h1>
            <p className="text-lg text-muted-foreground whitespace-pre-wrap">
              {about.bio}
            </p>
          </div>

          {/* Skills */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Skills</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {/* Technical Skills */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Technical Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {about.skills.technical.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Soft Skills */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Soft Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {about.skills.soft.map((skill: string) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Tools */}
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {about.skills.tools.map((tool: string) => (
                      <Badge key={tool} variant="secondary">
                        {tool}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <Briefcase className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Experience</h2>
            </div>
            <div className="grid gap-6">
              {about.experience.map((exp: any, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{exp.title}</h3>
                          <p className="text-muted-foreground">{exp.company}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {exp.duration}
                        </span>
                      </div>
                      <p className="text-sm whitespace-pre-wrap">
                        {exp.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Education</h2>
            </div>
            <div className="grid gap-6">
              {about.education.map((edu: any, index: number) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{edu.degree}</h3>
                          <p className="text-muted-foreground">{edu.institution}</p>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {edu.year}
                        </span>
                      </div>
                      {edu.description && (
                        <p className="text-sm whitespace-pre-wrap">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Achievements */}
          {about.achievements.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                <h2 className="text-2xl font-semibold">Achievements</h2>
              </div>
              <Card>
                <CardContent className="pt-6">
                  <ul className="list-disc list-inside space-y-2">
                    {about.achievements.map((achievement: string, index: number) => (
                      <li key={index} className="text-muted-foreground">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

// Force static rendering
export const dynamic = 'force-static'
export const revalidate = 3600 // Revalidate every hour 