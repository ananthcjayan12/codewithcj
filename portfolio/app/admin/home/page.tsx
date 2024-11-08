import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { HomeForm } from "@/components/admin/home/home-form"

export default async function HomeEditorPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: home } = await supabase
    .from('home_content')
    .select('*')
    .single()

  const { data: projects } = await supabase
    .from('projects')
    .select('id, title, status')
    .order('display_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Home Page</h1>
        <p className="text-muted-foreground">
          Manage your home page content
        </p>
      </div>
      <HomeForm initialData={home} projects={projects || []} />
    </div>
  )
} 