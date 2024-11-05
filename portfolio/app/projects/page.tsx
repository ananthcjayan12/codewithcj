import { ProjectsSection } from "@/components/sections/projects/projects"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Projects | Portfolio",
  description: "Check out my latest projects and work",
}

export default function ProjectsPage() {
  return (
    <main className="container py-6 md:py-12">
      <ProjectsSection />
    </main>
  )
} 