import { notFound } from "next/navigation"
import { ArrowLeft, Code2, Database, Bot, LineChart, MessageSquare, QrCode, FileText, Video, BarChart, Cog, Brain, Building2, Workflow } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { container, pageWrapper } from "@/lib/utils"

export const runtime = "edge"
export const revalidate = 0

const iconMap = {
  code: Code2,
  database: Database,
  bot: Bot,
  chart: LineChart,
  message: MessageSquare,
  qr: QrCode,
  file: FileText,
  video: Video,
  bar: BarChart,
  automation: Cog,
  ai: Brain,
  erp: Building2,
  workflow: Workflow,
}

interface Props {
  params: {
    slug: string
  }
}

async function getProject(slug: string) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error || !project) {
    return null
  }

  return project
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Code2

  return (
    <main className={pageWrapper}>
      <div className={container}>
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="flex items-center gap-4">
            <Link
              href="/projects"
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>
          </div>

          <div className="space-y-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-secondary px-3 py-1 text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {project.description}
              </p>
            </div>
          </div>

          <div className="prose dark:prose-invert max-w-none">
            <h2>Project Overview</h2>
            <p className="leading-relaxed">{project.long_description}</p>

            {project.technical_details && (
              <>
                <h2>Technical Details</h2>
                <p className="leading-relaxed">{project.technical_details}</p>
              </>
            )}

            {project.key_features && project.key_features.length > 0 && (
              <>
                <h2>Key Features</h2>
                <ul className="space-y-2">
                  {project.key_features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {(project.challenges || project.solutions) && (
              <>
                <h2>Challenges & Solutions</h2>
                {project.challenges && (
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold">Challenges</h3>
                    <p className="leading-relaxed">{project.challenges}</p>
                  </div>
                )}
                {project.solutions && (
                  <div>
                    <h3 className="text-lg font-semibold">Solutions</h3>
                    <p className="leading-relaxed">{project.solutions}</p>
                  </div>
                )}
              </>
            )}

            {(project.github_url || project.live_url) && (
              <>
                <h2>Project Links</h2>
                <div className="flex gap-4">
                  {project.github_url && (
                    <a 
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <span>GitHub Repository</span>
                    </a>
                  )}
                  {project.live_url && (
                    <a 
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex gap-4 pt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-8 py-3 text-base font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Discuss This Project
              <ArrowLeft className="ml-2 h-5 w-5 rotate-180" />
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
} 