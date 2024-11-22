"use client"

import Link from "next/link"

interface ProjectCardProps {
  project: {
    id: string
    title: string
    description: string
    category: string
    tags: string[]
    slug?: string
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  if (!project) {
    return null; // Return early if project is undefined
  }

  const href = project?.slug ? `/projects/${project.slug}` : `/projects/${project.id}`

  return (
    <Link href={href}>
      <div className="group rounded-lg border p-6 hover:border-primary transition-colors">
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground">{project.category}</p>
          </div>
          <p className="text-muted-foreground">{project.description}</p>
          <div className="flex flex-wrap gap-2">
            {project.tags?.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  )
} 