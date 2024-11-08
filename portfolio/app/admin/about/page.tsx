import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { AboutForm } from "@/components/admin/about/about-form"

export default async function AboutEditorPage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: about } = await supabase
    .from('about_content')
    .select('*')
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Page</h1>
        <p className="text-muted-foreground">
          Manage your about page content
        </p>
      </div>
      <AboutForm initialData={about} />
    </div>
  )
} 