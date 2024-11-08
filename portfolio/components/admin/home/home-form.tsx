"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner"
import { homeFormSchema, type HomeFormValues } from "@/lib/validations/home"

interface Project {
  id: string
  title: string
  status: 'draft' | 'published'
}

interface HomeFormProps {
  initialData?: HomeFormValues
  projects: Project[]
}

export function HomeForm({ initialData, projects }: HomeFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<HomeFormValues>({
    resolver: zodResolver(homeFormSchema),
    defaultValues: initialData || {
      hero_title: "",
      hero_subtitle: "",
      featured_project_ids: [],
      cta_text: "",
      cta_link: "",
    }
  })

  const onSubmit = async (data: HomeFormValues) => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/home', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error('Failed to save home content')
      }

      toast.success('Home content updated successfully')
      router.refresh()
    } catch (error) {
      console.error('Error saving home content:', error)
      toast.error('Failed to save home content')
    } finally {
      setIsLoading(false)
    }
  }

  const publishedProjects = projects.filter(project => project.status === 'published')

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Hero Title */}
            <FormField
              control={form.control}
              name="hero_title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter hero title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hero Subtitle */}
            <FormField
              control={form.control}
              name="hero_subtitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hero Subtitle</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter hero subtitle" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Featured Projects */}
            <FormField
              control={form.control}
              name="featured_project_ids"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Featured Projects</FormLabel>
                  <Select
                    value={field.value.join(',')}
                    onValueChange={(value) => field.onChange(value ? value.split(',') : [])}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select featured projects" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {publishedProjects.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          {project.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CTA Text */}
            <FormField
              control={form.control}
              name="cta_text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Call to Action Text</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter CTA text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CTA Link */}
            <FormField
              control={form.control}
              name="cta_link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Call to Action Link</FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="Enter CTA link" />
                  </FormControl>
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
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Form>
  )
} 