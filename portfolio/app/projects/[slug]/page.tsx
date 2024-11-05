import { notFound } from "next/navigation"
import Image from "next/image"
import { Github, Globe, ArrowLeft } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"
import { projects } from "@/data/portfolio-data"

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

  return (
    <main className="container py-6 md:py-12">
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

        <div className="space-y-4">
          <h1 className="text-4xl font-bold">{project.title}</h1>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-secondary px-3 py-1 text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          <p className="text-xl text-muted-foreground">{project.description}</p>
        </div>

        <div className="aspect-video overflow-hidden rounded-lg border">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={675}
            className="object-cover"
            priority
          />
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <h2>Project Overview</h2>
          <p>{project.longDescription}</p>

          <h2>Key Features</h2>
          <ul>
            {project.tags.map((tag) => (
              <li key={tag}>
                <strong>{tag}:</strong> Implementation and usage in the project
              </li>
            ))}
          </ul>

          <h2>Technical Details</h2>
          <p>
            This project was built using {project.tags.join(", ")}, 
            demonstrating the practical application of these technologies in a real-world scenario.
          </p>

          <h2>Challenges & Solutions</h2>
          <p>
            During the development of this project, various technical challenges were encountered
            and overcome through innovative solutions and best practices.
          </p>
        </div>

        <div className="flex gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Discuss This Project
            <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
          </Link>
        </div>
      </div>
    </main>
  )
} 