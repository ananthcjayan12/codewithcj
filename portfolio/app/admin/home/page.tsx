import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { HomeForm } from "@/components/admin/home/home-form"

export const runtime = 'edge'

export default async function AdminHomePage() {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: home } = await supabase
    .from('home_content')
    .select('*')
    .single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Home Page Content</h1>
        <p className="text-muted-foreground">
          Manage your home page content and personal information
        </p>
      </div>
      <HomeForm initialData={home} />
    </div>
  )
} 