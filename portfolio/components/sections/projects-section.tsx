import { Suspense } from 'react'
import { container, sectionHeading } from '@/lib/utils'
import { ProjectCard } from '@/components/ui/project-card'
import { getProjects } from '@/lib/supabase'
import { ProjectsLoading } from './loading'

export async function ProjectsSection() {
  const projects = await getProjects()

  return (
    <div className={container}>
      <div className="space-y-8">
        <div className="max-w-2xl">
          <h2 className={sectionHeading}>Featured Projects</h2>
          <p className="text-muted-foreground text-lg">
            A collection of projects I've worked on, from web applications to automation tools.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects?.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
} 