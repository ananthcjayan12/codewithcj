"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Loader2, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { RichTextEditor } from "./rich-text-editor"
import { Textarea } from "@/components/ui/textarea"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { ImageUpload } from "./image-upload"
import { blogFormSchema, type BlogFormValues } from "@/lib/validations/blog"
import { BlogPreview } from "./blog-preview"

interface BlogFormProps {
  initialData?: BlogFormValues & { id?: string }
}

export function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [newTag, setNewTag] = useState("")

  // Generate initial slug from title if it exists
  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      excerpt: initialData?.excerpt || "",
      content: initialData?.content || "",
      featured_image: initialData?.featured_image || "",
      tags: initialData?.tags || [],
      status: initialData?.status || "draft",
      slug: initialData?.slug || "",
    },
  })

  const onSubmit = async (data: BlogFormValues) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/blog', {
        method: initialData?.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify(initialData?.id ? { ...data, id: initialData.id } : data),
      })

      if (!response.ok) {
        throw new Error('Failed to save post')
      }

      toast.success(initialData ? 'Post updated successfully' : 'Post created successfully')
      router.push('/admin/blog')
      router.refresh()
    } catch (error) {
      console.error('Error saving post:', error)
      toast.error('Failed to save post. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const addTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault()
      const currentTags = form.getValues('tags')
      if (!currentTags.includes(newTag.trim())) {
        form.setValue('tags', [...currentTags, newTag.trim()])
      }
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues('tags')
    form.setValue('tags', currentTags.filter(tag => tag !== tagToRemove))
  }

  // Update slug when title changes
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value
    form.setValue('title', newTitle)
    // Only update slug if it's empty or was auto-generated
    if (!form.getValues('slug') || form.getValues('slug') === generateSlug(form.getValues('title'))) {
      form.setValue('slug', generateSlug(newTitle))
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardContent className="pt-6 space-y-4">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      onChange={handleTitleChange}
                      placeholder="Enter post title"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Slug */}
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL Slug</FormLabel>
                  <FormControl>
                    <Input 
                      {...field}
                      placeholder="url-friendly-slug"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Excerpt */}
            <FormField
              control={form.control}
              name="excerpt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Excerpt</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Brief description of the post" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Content */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <RichTextEditor content={field.value} onChange={field.onChange} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {field.value.map(tag => (
                      <Badge key={tag} variant="secondary" className="gap-1">
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <FormControl>
                    <Input
                      value={newTag}
                      onChange={e => setNewTag(e.target.value)}
                      onKeyDown={addTag}
                      placeholder="Type a tag and press Enter"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Featured Image */}
            <FormField
              control={form.control}
              name="featured_image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      currentImage={field.value}
                      onUploadComplete={field.onChange}
                      label="Featured Image"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormControl>
                      <Switch
                        checked={field.value === 'published'}
                        onCheckedChange={checked => field.onChange(checked ? 'published' : 'draft')}
                      />
                    </FormControl>
                    <FormLabel>Publish post</FormLabel>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex gap-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="flex-1 md:flex-none"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Update Post' : 'Create Post'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(true)}
            className="flex-1 md:flex-none"
          >
            Preview
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/blog')}
            className="flex-1 md:flex-none"
          >
            Cancel
          </Button>
        </div>

        {/* Preview Dialog */}
        <BlogPreview
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          title={form.getValues('title')}
          excerpt={form.getValues('excerpt')}
          content={form.getValues('content')}
          tags={form.getValues('tags')}
          featuredImage={form.getValues('featured_image')}
        />
      </form>
    </Form>
  )
} 