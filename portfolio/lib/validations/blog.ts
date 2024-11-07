import * as z from "zod"

export const blogFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  excerpt: z.string().min(1, "Excerpt is required").max(300, "Excerpt is too long"),
  content: z.string().min(1, "Content is required"),
  featured_image: z.string().optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  status: z.enum(["draft", "published"]),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase letters, numbers, and hyphens only",
  }),
})

export type BlogFormValues = z.infer<typeof blogFormSchema> 