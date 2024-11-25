import { getProject } from '@/lib/supabase'
import { ArrowLeft, Globe, Github } from 'lucide-react'
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
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-white to-orange-50" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        </div>

        {/* Content */}
        <div className={`${container} relative z-10 py-24`}>
          <div className="mx-auto max-w-4xl">
            {/* Back Button */}
            <Link
              href="/#projects"
              className="inline-flex items-center text-sm bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 hover:border-yellow-500/50 transition-all duration-300 text-gray-600 hover:text-gray-900 mb-8 shadow-sm"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Projects
            </Link>

            {/* Main Content Card */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-sm p-8 space-y-8">
              {/* Header */}
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tags?.map((tag: string) => (
                    <Badge 
                      key={tag} 
                      className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  {project.title}
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Main Content */}
              {project.long_description && (
                <div className="prose prose-lg max-w-none">
                  <div className="text-gray-700 leading-relaxed space-y-6">
                    {project.long_description.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Links */}
              {(project.live_url || project.github_url) && (
                <div className="flex flex-wrap gap-4 pt-4">
                  {project.live_url && (
                    <a
                      href={project.live_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/25 transition-all duration-300"
                    >
                      <Globe className="mr-2 h-5 w-5" />
                      View Live Site
                    </a>
                  )}
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-white ring-1 ring-gray-200 hover:ring-gray-300 text-gray-900 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                    >
                      <Github className="mr-2 h-5 w-5" />
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