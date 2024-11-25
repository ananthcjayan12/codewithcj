import { getProject } from '@/lib/supabase'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Badge } from "@/components/ui/badge"
import { container, pageWrapper } from "@/lib/utils"
import { notFound } from 'next/navigation'

interface Props {
  params: {
    slug: string
  }
}

export default async function ProjectPage({ params }: Props) {
  try {
    const project = await getProject(params.slug)

    return (
      <main className={pageWrapper}>
        <div className={container}>
          <div className="mx-auto max-w-4xl space-y-8">
            <Link
              href="/projects"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>

            <div className="space-y-6">              
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  {project.title}
                </h1>
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <p className="text-xl text-gray-600 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {project.long_description && (
                <div className="prose prose-lg max-w-none">
                  <p>{project.long_description}</p>
                </div>
              )}

              {/* Project Links */}
              {(project.live_url || project.github_url) && (
                <div className="flex gap-4">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      View Live Site
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-secondary"
                    >
                      View Source
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    )
  } catch (error) {
    notFound()
  }
} 