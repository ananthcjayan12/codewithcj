import { container, sectionHeading } from '@/lib/utils'
import { getAbout } from '@/lib/supabase'

interface Skill {
  [category: string]: string[]
}

interface AboutContent {
  summary?: string
  skills?: Skill
}

export async function AboutSection() {
  const about = await getAbout() as AboutContent

  return (
    <div className={container}>
      <div className="space-y-8">
        <div className="max-w-2xl">
          <h2 className={sectionHeading}>About Me</h2>
          <p className="text-muted-foreground text-lg">
            {about?.summary}
          </p>
        </div>

        {about?.skills && (
          <div className="grid gap-6 md:grid-cols-3">
            {Object.entries(about.skills).map(([category, skills]) => (
              <div key={category} className="space-y-2">
                <h3 className="font-semibold capitalize">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill: string) => (
                    <span
                      key={skill}
                      className="rounded-full bg-muted px-3 py-1 text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 