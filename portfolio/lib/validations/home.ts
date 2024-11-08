import * as z from "zod"

export const homeFormSchema = z.object({
  hero_title: z.string().min(1, "Hero title is required"),
  hero_subtitle: z.string().optional(),
  featured_project_ids: z.array(z.string()),
  cta_text: z.string().optional(),
  cta_link: z.string().url().optional().or(z.literal("")),
})

export type HomeFormValues = z.infer<typeof homeFormSchema> 