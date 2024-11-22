"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2, Github, Twitter, Linkedin } from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { homeFormSchema, type HomeFormValues } from "@/lib/validations/home"
import { ImageUpload } from "@/components/admin/projects/image-upload"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface HomeFormProps {
  initialData?: HomeFormValues
}

export function HomeForm({ initialData }: HomeFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const supabase = createClientComponentClient()

  const form = useForm<HomeFormValues>({
    resolver: zodResolver(homeFormSchema),
    defaultValues: {
      id: initialData?.id,
      name: initialData?.name || "",
      role: initialData?.role || "",
      summary: initialData?.summary || "",
      long_summary: initialData?.long_summary || "",
      avatar_url: initialData?.avatar_url || "",
      social_links: {
        github: initialData?.social_links?.github || "",
        twitter: initialData?.social_links?.twitter || "",
        linkedin: initialData?.social_links?.linkedin || ""
      }
    }
  })

  const onSubmit = async (values: HomeFormValues) => {
    try {
      setIsLoading(true)
      console.log('Submitting values:', values)

      // First, check if a record exists
      const { data: existingRecord, error: fetchError } = await supabase
        .from('home_content')
        .select('id')
        .single()

      if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        throw fetchError
      }

      const { data, error } = await supabase
        .from('home_content')
        .upsert({
          id: existingRecord?.id || initialData?.id, // Use existing ID if available
          name: values.name,
          role: values.role,
          summary: values.summary,
          long_summary: values.long_summary,
          avatar_url: values.avatar_url,
          social_links: values.social_links,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'id'
        })
        .select()
        .single()

      if (error) {
        console.error('Supabase error:', error)
        throw error
      }

      console.log('Successfully updated data:', data)
      toast.success('Changes saved successfully')
      
      // Force a cache revalidation and refresh
      router.refresh()
      window.location.reload()
    } catch (error) {
      console.error('Error in onSubmit:', error)
      toast.error('Failed to save changes')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Profile Section */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              This information will be displayed on your home page.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Avatar */}
            <FormField
              control={form.control}
              name="avatar_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
                  <FormDescription>
                    Upload a profile picture to be displayed on your home page.
                  </FormDescription>
                  <FormControl>
                    <ImageUpload
                      currentImage={field.value}
                      onUploadComplete={(url) => field.onChange(url)}
                      label="Profile Picture"
                      bucket="avatars"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator />

            {/* Basic Info */}
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your full name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your professional role" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Summary Fields */}
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brief Summary</FormLabel>
                    <FormDescription>
                      A short introduction that appears below your name.
                    </FormDescription>
                    <FormControl>
                      <Textarea {...field} placeholder="Brief summary about yourself" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="long_summary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Detailed Summary</FormLabel>
                    <FormDescription>
                      A more detailed description about your work and experience.
                    </FormDescription>
                    <FormControl>
                      <Textarea {...field} placeholder="More detailed description" rows={5} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Social Links Section */}
        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>
              Add your social media profiles (optional).
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="social_links.github"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Github className="h-4 w-4" />
                      GitHub
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="https://github.com/yourusername" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="social_links.twitter"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Twitter className="h-4 w-4" />
                      Twitter
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="https://twitter.com/yourusername" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="social_links.linkedin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4" />
                      LinkedIn
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="url" placeholder="https://linkedin.com/in/yourusername" />
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