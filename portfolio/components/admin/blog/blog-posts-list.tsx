"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { Edit, Trash2, Eye } from "lucide-react"
import { DeleteDialog } from "./delete-dialog"

interface BlogPost {
  id: string
  title: string
  excerpt: string
  status: 'draft' | 'published'
  created_at: string
}

interface BlogPostsListProps {
  posts: BlogPost[]
}

export function BlogPostsList({ posts }: BlogPostsListProps) {
  const router = useRouter()
  const [deletePost, setDeletePost] = useState<{ id: string; title: string } | null>(null)

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  return (
    <>
      <div className="rounded-md border">
        <div className="grid grid-cols-12 gap-4 p-4 font-medium border-b">
          <div className="col-span-4">Title</div>
          <div className="col-span-4">Excerpt</div>
          <div className="col-span-2">Status</div>
          <div className="col-span-1">Date</div>
          <div className="col-span-1">Actions</div>
        </div>
        <div className="divide-y">
          {posts.map((post) => (
            <div key={post.id} className="grid grid-cols-12 gap-4 p-4 items-center">
              <div className="col-span-4">
                <span className="font-medium">{post.title}</span>
              </div>
              <div className="col-span-4 truncate text-muted-foreground">
                {post.excerpt}
              </div>
              <div className="col-span-2">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                  post.status === 'published' 
                    ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                    : 'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                }`}>
                  {post.status}
                </span>
              </div>
              <div className="col-span-1 text-sm text-muted-foreground">
                {formatDate(post.created_at)}
              </div>
              <div className="col-span-1 flex items-center gap-1">
                <button
                  onClick={() => router.push(`/admin/blog/${post.id}`)}
                  className="p-2 hover:bg-accent rounded-md"
                  title="Edit"
                >
                  <Edit className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setDeletePost({ id: post.id, title: post.title })}
                  className="p-2 hover:bg-destructive/10 text-destructive rounded-md"
                  title="Delete"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => router.push(`/blog/${post.id}`)}
                  className="p-2 hover:bg-accent rounded-md"
                  title="View"
                >
                  <Eye className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <div className="p-4 text-center text-muted-foreground">
              No blog posts found
            </div>
          )}
        </div>
      </div>

      {deletePost && (
        <DeleteDialog
          postId={deletePost.id}
          postTitle={deletePost.title}
          isOpen={true}
          onClose={() => setDeletePost(null)}
        />
      )}
    </>
  )
} 