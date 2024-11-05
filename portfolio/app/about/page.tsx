import { AboutSection } from "@/components/sections/about/about"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | Portfolio",
  description: "Learn more about my background, skills, and experience",
}

export default function AboutPage() {
  return (
    <main className="container py-6 md:py-12">
      <AboutSection />
    </main>
  )
} 