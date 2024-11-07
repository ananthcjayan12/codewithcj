import { getProjects } from "@/lib/supabase"
import Projects from "@/components/sections/projects/projects"
import { Metadata } from "next"
import { pageWrapper } from "@/lib/utils"

export const runtime = "edge"

export const revalidate = 0

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "Check out my latest projects and work",
}

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  console.log('ProjectsPage: Rendering with projects:', projects?.length)

  return (
    <main className={pageWrapper}>
      <Projects initialProjects={projects} />
    </main>
  )
} 