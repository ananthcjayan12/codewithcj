"use client"

import { smoothScroll } from "@/lib/client-utils"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

export function SmoothNav() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, {
      threshold: 0.5
    })

    document.querySelectorAll('section').forEach(section => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <ul className="space-y-4">
        {['hero', 'projects', 'about', 'contact'].map((section) => (
          <li key={section}>
            <a
              href={`#${section}`}
              onClick={(e) => smoothScroll(e, `#${section}`)}
              className={cn(
                "w-3 h-3 block rounded-full border-2 border-primary transition-all duration-200",
                activeSection === section ? "bg-primary scale-125" : "bg-transparent hover:scale-125"
              )}
              aria-label={`Scroll to ${section}`}
            />
          </li>
        ))}
      </ul>
    </nav>
  )
} 