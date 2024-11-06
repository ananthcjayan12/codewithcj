import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { ProjectForm } from "@/components/admin/projects/project-form"
import { notFound } from "next/navigation"

interface Props {
  params: {
    id: string
  }
}

export default async function EditProjectPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!project) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground">
          Update your project information
        </p>
      </div>
      <ProjectForm initialData={project} />
    </div>
  )
} 