"use client"

import { useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

interface ProjectFormProps {
  initialData?: {
    id?: string
    title: string
    description: string
    long_description: string
    icon: string
    tags: string[]
    category: string
    slug: string
    status: 'draft' | 'published'
  }
}

export function ProjectForm({ initialData }: ProjectFormProps) {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    long_description: initialData?.long_description || "",
    icon: initialData?.icon || "code",
    tags: initialData?.tags || [""],
    category: initialData?.category || "Automation",
    slug: initialData?.slug || "",
    status: initialData?.status || "draft" as const
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const { error } = await supabase
        .from('projects')
        .upsert({
          id: initialData?.id,
          ...formData,
          updated_at: new Date().toISOString()
        })

      if (error) throw error

      router.push('/admin/projects')
      router.refresh()
    } catch (error) {
      console.error('Error saving project:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              className="w-full rounded-md border bg-background px-4 py-2"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="slug" className="text-sm font-medium">
              Slug
            </label>
            <input
              id="slug"
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              className="w-full rounded-md border bg-background px-4 py-2"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium">
            Short Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="w-full rounded-md border bg-background px-4 py-2"
            rows={2}
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="long_description" className="text-sm font-medium">
            Full Description
          </label>
          <textarea
            id="long_description"
            value={formData.long_description}
            onChange={(e) => setFormData(prev => ({ ...prev, long_description: e.target.value }))}
            className="w-full rounded-md border bg-background px-4 py-2"
            rows={6}
            required
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="category" className="text-sm font-medium">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
              className="w-full rounded-md border bg-background px-4 py-2"
              required
            >
              <option value="Automation">Automation</option>
              <option value="AI">AI</option>
              <option value="Business">Business</option>
              <option value="Finance">Finance</option>
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <select
              id="status"
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value as 'draft' | 'published' }))}
              className="w-full rounded-md border bg-background px-4 py-2"
              required
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        {isLoading ? "Saving..." : "Save Project"}
      </button>
    </form>
  )
} 