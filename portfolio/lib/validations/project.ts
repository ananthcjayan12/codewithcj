import * as z from "zod"

export const projectFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title is too long"),
  description: z.string().min(1, "Description is required").max(300, "Description is too long"),
  long_description: z.string().optional(),
  icon: z.string().min(1, "Icon is required"),
  featured_image: z.string().optional(),
  tags: z.array(z.string()).min(1, "At least one tag is required"),
  category: z.string().min(1, "Category is required"),
  status: z.enum(["draft", "published"]),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: "Slug must be lowercase letters, numbers, and hyphens only",
  }),
  technical_details: z.string().optional(),
  key_features: z.array(z.string()).optional(),
  challenges: z.string().optional(),
  solutions: z.string().optional(),
  github_url: z.string().url().optional().or(z.literal("")),
  live_url: z.string().url().optional().or(z.literal("")),
  display_order: z.number().optional(),
})

export type ProjectFormValues = z.infer<typeof projectFormSchema> 