import Projects from "./projects"
import { getProjects } from "@/lib/supabase"

export default async function ProjectsSection() {
  console.log('ProjectsSection: Starting to fetch projects')
  
  try {
    const projects = await getProjects()
    console.log('ProjectsSection: Projects fetched:', projects?.length)

    return <Projects initialProjects={projects} />
  } catch (error) {
    console.error('ProjectsSection: Error:', error)
    return <Projects initialProjects={[]} />
  }
} 