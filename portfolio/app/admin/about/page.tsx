import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { AboutForm } from "@/components/admin/about/about-form"
import { unstable_noStore } from 'next/cache'

export const runtime = 'edge'

export default async function AboutEditorPage() {
  // Disable caching
  unstable_noStore()
  
  const supabase = createServerComponentClient({ cookies })
  
  const { data: about, error } = await supabase
    .from('about_content')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching about content:', error)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">About Page</h1>
        <p className="text-muted-foreground">
          Manage your about page content
        </p>
      </div>
      <AboutForm initialData={about || undefined} />
    </div>
  )
} 