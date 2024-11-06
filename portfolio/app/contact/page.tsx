import { ContactSection } from "@/components/sections/contact/contact"
import { Metadata } from "next"
import { pageWrapper } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Contact | Portfolio",
  description: "Get in touch with me",
}

export default function ContactPage() {
  return (
    <main className={pageWrapper}>
      <ContactSection />
    </main>
  )
} 