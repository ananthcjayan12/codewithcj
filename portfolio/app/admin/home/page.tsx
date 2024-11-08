import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { HomeForm } from "@/components/admin/home/home-form"
import { unstable_noStore } from 'next/cache'

export default async function HomeEditorPage() {
  // Disable caching
  unstable_noStore()
  
  const supabase = createServerComponentClient({ cookies })
  
  const { data: home, error } = await supabase
    .from('home_content')
    .select('*')
    .single()

  if (error) {
    console.error('Error fetching home content:', error)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Home Page</h1>
        <p className="text-muted-foreground">
          Manage your home page content
        </p>
      </div>
      <HomeForm initialData={home || undefined} />
    </div>
  )
} 