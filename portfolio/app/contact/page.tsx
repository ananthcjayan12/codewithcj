import { ContactSection } from "@/components/sections/contact/contact"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact | Portfolio",
  description: "Get in touch with me",
}

export default function ContactPage() {
  return (
    <main className="container py-6 md:py-12">
      <ContactSection />
    </main>
  )
} 