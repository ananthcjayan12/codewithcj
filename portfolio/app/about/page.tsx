import { AboutSection } from "@/components/sections/about/about"
import { Metadata } from "next"
import { pageWrapper } from "@/lib/utils"

export const runtime = "edge"

export const metadata: Metadata = {
  title: "About | Portfolio",
  description: "Learn more about my skills, experience, and background",
}

export default function AboutPage() {
  return (
    <main className={pageWrapper}>
      <AboutSection />
    </main>
  )
} 