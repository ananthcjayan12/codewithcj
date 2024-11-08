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
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { homeFormSchema, type HomeFormValues, uploadAvatar } from "@/lib/validations/home"
import { ImageUpload } from "@/components/admin/projects/image-upload"

interface HomeFormProps {
  initialData?: HomeFormValues
}

export function HomeForm({ initialData }: HomeFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<HomeFormValues>({
    resolver: zodResolver(homeFormSchema),
    defaultValues: initialData || {
      name: "",
      role: "",
      summary: "",
      long_summary: "",
      avatar_url: "",
      social_links: {}
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

  const handleImageUpload = async (file: File) => {
    const result = await uploadAvatar(file)
    if (result.error) {
      toast.error(result.error)
    } else {
      form.setValue('avatar_url', result.url)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardContent className="pt-6 space-y-6">
            {/* Avatar */}
            <FormField
              control={form.control}
              name="avatar_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Profile Picture</FormLabel>
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

            {/* Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Role */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Your role" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Summary */}
            <FormField
              control={form.control}
              name="summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Summary</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="Brief summary about yourself" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Long Summary */}
            <FormField
              control={form.control}
              name="long_summary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Summary</FormLabel>
                  <FormControl>
                    <Textarea {...field} placeholder="More detailed description about yourself" rows={5} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Social Links */}
            <div className="space-y-4">
              <FormLabel>Social Links</FormLabel>
              <div className="grid gap-4">
                {['github', 'linkedin', 'twitter'].map((platform) => (
                  <FormField
                    key={platform}
                    control={form.control}
                    name={`social_links.${platform}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="capitalize">{platform}</FormLabel>
                        <FormControl>
                          <Input 
                            {...field} 
                            type="url" 
                            placeholder={`Your ${platform} URL`}
                            value={field.value || ''}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </div>
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