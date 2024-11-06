import { notFound } from "next/navigation"
import { ArrowLeft, Code2, Database, Bot, LineChart, MessageSquare, QrCode, FileText, Video, BarChart, Cog, Brain, Building2, Workflow } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { projects } from "@/data/portfolio-data"
import { container, pageWrapper } from "@/lib/utils"

export const runtime = "edge"

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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = projects.find((p) => p.slug === params.slug)

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

export default function ProjectPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug)

  if (!project) {
    notFound()
  }

  const IconComponent = iconMap[project.icon] || Code2

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
                {project.tags.map((tag) => (
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
            <p className="leading-relaxed">{project.longDescription}</p>

            <h2>Key Features</h2>
            <ul className="space-y-2">
              {project.tags.map((tag) => (
                <li key={tag} className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary/50 flex-shrink-0" />
                  <span>
                    <strong>{tag}:</strong> Implementation and usage in the project
                  </span>
                </li>
              ))}
            </ul>

            <h2>Technical Details</h2>
            <p className="leading-relaxed">
              This project was built using {project.tags.join(", ")}, 
              demonstrating the practical application of these technologies in a real-world scenario.
            </p>

            <h2>Challenges & Solutions</h2>
            <p className="leading-relaxed">
              During the development of this project, various technical challenges were encountered
              and overcome through innovative solutions and best practices.
            </p>
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