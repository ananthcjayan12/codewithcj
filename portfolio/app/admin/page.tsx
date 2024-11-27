import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

export const runtime = 'edge'

export default async function AdminDashboard() {
  const supabase = createServerComponentClient({ cookies })
  
  // Get project stats
  const { count: projectCount } = await supabase
    .from('projects')
    .select('*', { count: 'exact', head: true })

  // Get blog post stats
  const { count: postCount } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })

  const stats = {
    projects: projectCount || 0,
    posts: postCount || 0,
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome to your admin dashboard</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border p-6 space-y-2">
          <h3 className="text-lg font-medium">Total Projects</h3>
          <p className="text-3xl font-bold">{stats.projects}</p>
        </div>
        <div className="rounded-lg border p-6 space-y-2">
          <h3 className="text-lg font-medium">Blog Posts</h3>
          <p className="text-3xl font-bold">{stats.posts}</p>
        </div>
      </div>
    </div>
  )
} 