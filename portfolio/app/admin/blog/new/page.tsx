import { BlogForm } from "@/components/admin/blog/blog-form"

export const runtime = 'edge'

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        <p className="text-muted-foreground">
          Create a new blog post for your portfolio
        </p>
      </div>
      <BlogForm />
    </div>
  )
} 