import { ProjectsSection } from "@/components/sections/projects/projects"
import { Metadata } from "next"
import { pageWrapper } from "@/lib/utils"

export const runtime = "edge"

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "Check out my latest projects and work",
}

export default function ProjectsPage() {
  return (
    <main className={pageWrapper}>
      <ProjectsSection />
    </main>
  )
} 