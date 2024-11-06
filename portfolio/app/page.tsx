import { HeroSection } from "@/components/sections/hero"

export const runtime = "edge"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <HeroSection />
    </main>
  )
}
