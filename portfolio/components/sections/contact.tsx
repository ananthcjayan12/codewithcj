"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSubmitStatus("success")
      setFormState({ name: "", email: "", message: "" })
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold">Get in Touch</h1>
        <p className="text-muted-foreground">
          Have a question or want to work together? Feel free to reach out!
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="name"
            type="text"
            required
            value={formState.name}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full rounded-md border bg-background px-4 py-2 text-foreground"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={formState.email}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full rounded-md border bg-background px-4 py-2 text-foreground"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            required
            value={formState.message}
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, message: e.target.value }))
            }
            rows={5}
            className="w-full rounded-md border bg-background px-4 py-2 text-foreground"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
        >
          {isSubmitting ? (
            "Sending..."
          ) : (
            <>
              Send Message
              <Send className="ml-2 h-4 w-4" />
            </>
          )}
        </button>

        {submitStatus === "success" && (
          <p className="text-center text-sm text-green-500">
            Message sent successfully!
          </p>
        )}
        {submitStatus === "error" && (
          <p className="text-center text-sm text-red-500">
            Something went wrong. Please try again.
          </p>
        )}
      </motion.form>
    </div>
  )
} 