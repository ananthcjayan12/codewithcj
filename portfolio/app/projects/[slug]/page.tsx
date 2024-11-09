import { notFound } from "next/navigation"
import { ArrowLeft, Code2, Database, Bot, LineChart, MessageSquare, QrCode, FileText, Video, BarChart, Cog, Brain, Building2, Workflow } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { getProject, getProjects } from "@/lib/supabase"
import { container, pageWrapper } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { cache } from 'react'

// Remove edge runtime
// export const runtime = "edge"

// Use static rendering with ISR
export const dynamic = 'force-static'
export const revalidate = 3600 // Cache for 1 hour

// Move iconMap outside component to prevent recreation
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
} as const

// Add proper typing for project data
interface Project {
  id: string
  title: string
  description: string
  long_description: string | null
  icon: string | null
  tags: string[]
  category: string | null
  technical_details: string | null
  key_features: string[] | null
  challenges: string | null
  solutions: string | null
  github_url: string | null
  live_url: string | null
  status: 'draft' | 'published'
}

interface Props {
  params: {
    slug: string
  }
}

// Use React's cache for project data
const getProjectData = cache(async (slug: string) => {
  const project = await getProject(slug)
  if (!project) notFound()
  return project
})

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProjectData(params.slug)
  
  return {
    title: `${project.title} | Portfolio`,
    description: project.description,
  }
}

export default async function ProjectPage({ params }: Props) {
  const project = await getProjectData(params.slug)

  const IconComponent = iconMap[project.icon as keyof typeof iconMap] || Code2

  return (
    <main className={pageWrapper}>
      <div className={container}>
        <div className="mx-auto max-w-4xl space-y-8">
          <Link
            href="/projects"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>

          <div className="space-y-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
              <IconComponent className="h-8 w-8 text-primary" />
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
              <div className="flex flex-wrap gap-2">
                {project.tags?.map((tag: string) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
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
                  {project.key_features.map((feature: string, index: number) => (
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

// Update generateStaticParams to use getProjects
export async function generateStaticParams() {
  const projects = await getProjects()
  
  return projects.map((project) => ({
    slug: project.slug,
  }))
} 