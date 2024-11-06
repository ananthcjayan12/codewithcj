import { BlogForm } from "@/components/admin/blog/blog-form"

export default function NewBlogPostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Blog Post</h1>
        <p className="text-muted-foreground">
          Create a new blog post
        </p>
      </div>
      <BlogForm />
    </div>
  )
} 