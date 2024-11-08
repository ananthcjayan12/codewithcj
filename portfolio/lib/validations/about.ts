import * as z from "zod"

export const aboutFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(1, "Bio is required"),
  skills: z.object({
    technical: z.array(z.string()),
    soft: z.array(z.string()),
    tools: z.array(z.string())
  }),
  experience: z.array(z.object({
    title: z.string(),
    company: z.string(),
    duration: z.string(),
    description: z.string()
  })),
  education: z.array(z.object({
    degree: z.string(),
    institution: z.string(),
    year: z.string(),
    description: z.string().optional()
  })),
  achievements: z.array(z.string())
})

export type AboutFormValues = z.infer<typeof aboutFormSchema> 