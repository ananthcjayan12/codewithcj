import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { ProjectsList } from "@/components/admin/projects/projects-list"
import Link from "next/link"

export default async function ProjectsPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: projects } = await supabase
    .from('projects')
    .select('*')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Manage your portfolio projects
          </p>
        </div>
        <Link
          href="/admin/projects/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Add Project
        </Link>
      </div>
      <ProjectsList projects={projects || []} />
    </div>
  )
} 