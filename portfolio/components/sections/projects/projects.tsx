"use client"

import { ProjectCard } from "@/components/ui/project-card"

interface Project {
  id: string
  title: string
  description: string
  long_description: string
  icon: string
  tags: string[]
  category: string
  slug?: string
  status: 'draft' | 'published'
}

interface ProjectsProps {
  initialProjects: Project[]
}

export default function Projects({ initialProjects }: ProjectsProps) {
  console.log('Projects: Rendering with initialProjects:', initialProjects?.length)

  if (!initialProjects || initialProjects.length === 0) {
    return (
      <section id="projects" className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
          <p className="text-muted-foreground">No projects available at the moment.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-16">
      <div className="container">
        <h2 className="text-3xl font-bold mb-8">Featured Projects</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {initialProjects.map((project) => {
            console.log('Projects: Rendering project:', project.title)
            if (!project) return null;
            
            return (
              <ProjectCard 
                key={project.id} 
                project={{
                  id: project.id,
                  title: project.title || '',
                  description: project.description || '',
                  category: project.category || '',
                  tags: project.tags || [],
                  slug: project.slug
                }} 
              />
            );
          })}
        </div>
      </div>
    </section>
  )
} 