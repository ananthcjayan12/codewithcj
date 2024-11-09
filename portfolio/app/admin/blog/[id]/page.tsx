import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { notFound } from "next/navigation"
import { BlogForm } from "@/components/admin/blog/blog-form"
import { unstable_noStore } from 'next/cache'

interface Props {
  params: {
    id: string
  }
}

export const runtime = 'edge'

export default async function EditBlogPostPage({ params }: Props) {
  // Disable caching for this page
  unstable_noStore()
  
  const supabase = createServerComponentClient({ cookies })
  
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', params.id)
    .single()

  if (error || !post) {
    console.error('Error fetching blog post:', error)
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground">
          Make changes to your blog post
        </p>
      </div>
      <BlogForm initialData={post} />
    </div>
  )
} 