import { createClient } from '@supabase/supabase-js'
import { notFound } from "next/navigation"
import { ProjectForm } from "@/components/admin/projects/project-form"
import { unstable_noStore } from 'next/cache'

export const runtime = 'edge'

// Create a Supabase client with service role
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

interface Props {
  params: {
    id: string
  }
}

export default async function EditProjectPage({ params }: Props) {
  // Disable caching for this page
  unstable_noStore()
  
  const { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !project) {
    console.error('Error fetching project:', error)
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Project</h1>
        <p className="text-muted-foreground">
          Make changes to your project
        </p>
      </div>
      <ProjectForm initialData={project} />
    </div>
  )
} 