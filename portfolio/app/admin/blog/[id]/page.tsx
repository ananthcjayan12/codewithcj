import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { BlogForm } from "@/components/admin/blog/blog-form"
import { notFound } from "next/navigation"

interface Props {
  params: {
    id: string
  }
}

export default async function EditBlogPostPage({ params }: Props) {
  const supabase = createServerComponentClient({ cookies })
  
  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', params.id)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <p className="text-muted-foreground">
          Update your blog post content
        </p>
      </div>
      <BlogForm initialData={post} />
    </div>
  )
} 