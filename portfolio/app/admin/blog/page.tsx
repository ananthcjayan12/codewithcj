import { createClient } from '@supabase/supabase-js'
import { BlogPostsList } from "@/components/admin/blog/blog-posts-list"
import Link from "next/link"
import { unstable_noStore } from 'next/cache'

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

export default async function BlogPage() {
  // Disable caching for this page
  unstable_noStore()
  
  // Remove any status filter to show all posts in admin
  const { data: posts, error } = await supabase
    .from('blog_posts')
    .select('id, title, excerpt, status, created_at, slug')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts:', error)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Blog Posts</h1>
          <p className="text-muted-foreground">
            Manage your blog posts
          </p>
        </div>
        <Link
          href="/admin/blog/new"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          New Post
        </Link>
      </div>
      <BlogPostsList posts={posts || []} />
    </div>
  )
} 